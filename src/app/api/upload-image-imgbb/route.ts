import { NextRequest, NextResponse } from 'next/server';

// Optional: bump body size if needed
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.IMAGEBB_CLIENT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'IMAGEBB_CLIENT_API_KEY is not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const expiration = formData.get('expiration')?.toString(); // seconds, optional

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create FormData for imgbb API with file directly
    const uploadForm = new FormData();
    uploadForm.append('image', file); // Send file directly, not base64

    const url = new URL('https://api.imgbb.com/1/upload');
    url.searchParams.set('key', apiKey);
    if (expiration) url.searchParams.set('expiration', expiration);

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: uploadForm,
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('imgbb upload failed:', err);
      return NextResponse.json({ error: 'imgbb upload failed', details: err }, { status: 500 });
    }

    const result = await response.json();
    // imgbb success shape: { data: { url, display_url, delete_url, ... }, success: true, status: 200 }
    const data = (result as any)?.data;
    return NextResponse.json({
      url: data?.url || data?.display_url,
      display_url: data?.display_url,
      delete_url: data?.delete_url,
      width: data?.width,
      height: data?.height,
      size: data?.size,
    });
  } catch (error) {
    console.error('Upload error (imgbb):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


