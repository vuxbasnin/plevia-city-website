import { NextRequest, NextResponse } from 'next/server';
import { CLOUDINARY } from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.UPLOAD_PRESET) {
      return NextResponse.json({ error: 'Cloudinary configuration missing' }, { status: 500 });
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', CLOUDINARY.UPLOAD_PRESET);
    if (folder) {
      uploadFormData.append('folder', folder);
    }

    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`;

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload failed:', errorData);
      return NextResponse.json({ error: errorData.error?.message || 'Upload failed' }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 