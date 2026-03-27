import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { buildConsultingSystemPrompt, normalizeConsultingType } from './prompts';

const consultSchema = z.object({
  diagnosis: z.object({
    problem_definition: z.string().min(1),
    root_causes: z.array(z.string().min(1)).min(2).max(4),
    priority: z.array(z.string().min(1)).min(2).max(4),
  }),
  strategy: z.object({
    direction: z.string().min(1),
    positioning: z.string().min(1),
    scope: z.string().min(1),
  }),
  deliverables: z.object({
    summary: z.string().min(1),
    action_plan: z.array(z.string().min(1)).min(3).max(5),
    marketing_message: z.string().min(1),
  }),
});

const requestSchema = z.object({
  input: z.string().min(1, 'Input is required'),
  type: z.string().optional().nullable(),
  designBrief: z.any().optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = requestSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: parsedBody.error.flatten(),
        },
        { status: 400 }
      );
    }

    const input = parsedBody.data.input.trim();
    const consultingType = normalizeConsultingType(parsedBody.data.type);
    const designBrief = parsedBody.data.designBrief ?? null;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // getUser() is the trusted server-side way to verify the current user/session. :contentReference[oaicite:1]{index=1}
    const systemPrompt = buildConsultingSystemPrompt(consultingType);

    let generatedObject: z.infer<typeof consultSchema> | null = null;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await generateObject({
          model: openai('gpt-4o-mini'),
          schema: consultSchema,
          temperature: 0.7,
          system: systemPrompt,
          prompt: `Client input:\n${input}`,
        });

        generatedObject = result.object;
        break;
      } catch (error) {
        lastError = error;
        console.warn(`[consult] generateObject attempt ${attempt} failed:`, error);
      }
    }

    if (!generatedObject) {
      throw new Error(
        lastError instanceof Error
          ? lastError.message
          : 'Failed to generate valid consulting output.'
      );
    }

    // Insert case first, then output row linked by case_id.
    // Supabase insert does not return rows unless chained with .select(). :contentReference[oaicite:2]{index=2}
    const { data: caseData, error: caseError } = await supabase
      .from('consulting_cases')
      .insert({
        user_id: user?.id ?? null,
        input_text: input,
        consulting_type: consultingType,
        design_brief_json: designBrief,
      })
      .select('id')
      .single();

    if (caseError) {
      console.error('Supabase Insert Error (consulting_cases):', caseError);
      throw new Error(caseError.message);
    }

    const { error: outputError } = await supabase.from('case_outputs').insert({
      case_id: caseData.id,
      diagnosis_json: generatedObject.diagnosis,
      strategy_json: generatedObject.strategy,
      deliverables_json: generatedObject.deliverables,
    });

    if (outputError) {
      console.error('Supabase Insert Error (case_outputs):', outputError);
      throw new Error(outputError.message);
    }

    return NextResponse.json(
      {
        caseId: caseData.id,
        outputs: generatedObject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}