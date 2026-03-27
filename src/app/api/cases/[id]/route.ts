import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const supabase = await createClient();

    const { data: consultingCase, error: caseError } = await supabase
      .from('consulting_cases')
      .select(`
        *,
        case_outputs (
          diagnosis_json,
          strategy_json,
          deliverables_json
        )
      `)
      .eq('id', id)
      .single();

    if (caseError) throw caseError;
    if (!consultingCase) return NextResponse.json({ error: 'Case not found' }, { status: 404 });

    // case_outputs may come as array (PostgREST one-to-one) — normalize to single object
    const raw = consultingCase as any;
    const caseOutputs = Array.isArray(raw.case_outputs)
      ? raw.case_outputs[0] ?? null
      : raw.case_outputs ?? null;

    return NextResponse.json({ ...raw, case_outputs: caseOutputs }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
