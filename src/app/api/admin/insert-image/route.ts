import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { link_image, created_by, type } = await request.json();

    if (!link_image || !created_by || !type) {
      return NextResponse.json({ 
        error: 'Missing required fields: link_image, created_by, type' 
      }, { status: 400 });
    }

    // Create admin client with service role key (server-side only)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    const { data, error } = await supabase
      .from('image')
      .insert({
        link_image,
        created_by,
        type,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Insert image error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
