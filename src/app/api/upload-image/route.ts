import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

export const runtime = 'nodejs';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '32mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = (formData.get('type') as string) || 'general';
    const createdBy = (formData.get('createdBy') as string) || 'admin';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Convert to WebP with optimized compression for base64
    const webpBuffer = await sharp(inputBuffer)
      .webp({ 
        quality: 60,  // Reduced quality for smaller base64
        effort: 6     // Higher compression
      })
      .toBuffer();

    // Convert to base64
    const base64Image = `data:image/webp;base64,${webpBuffer.toString('base64')}`;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // For banner types, delete existing image first (only one banner per type)
    if (type.startsWith('banner_') || type === 'hero') {
      const { error: deleteError } = await supabase
        .from('image')
        .delete()
        .eq('type', type);
      
      if (deleteError) {
        console.error('Error deleting old banner image:', deleteError);
      }
    }

    // Insert new image
    const { data, error } = await supabase
      .from('image')
      .insert({
        link_image: base64Image,
        type: type,
        created_by: createdBy,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      data: data,
      url: base64Image,
      id: data.id 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}