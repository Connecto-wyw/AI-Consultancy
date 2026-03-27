import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { case_id, company_or_name, phone, email } = await request.json();

    if (!company_or_name || !phone || !email) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('lead_contacts')
      .insert({ case_id: case_id || null, company_or_name, phone, email });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
