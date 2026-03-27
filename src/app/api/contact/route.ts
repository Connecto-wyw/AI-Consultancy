import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, company, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('contact_inquiries')
      .insert({ name, company: company || null, email, message });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving contact inquiry:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
