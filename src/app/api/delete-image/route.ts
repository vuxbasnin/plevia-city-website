import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';

function parseBucketAndKeyFromUrl(url: string): { bucket: string, key: string } | null {
  try {
    // Expected: https://<proj>.supabase.co/storage/v1/object/public/<bucket>/<key>
    const u = new URL(url);
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'public');
    if (idx === -1 || idx + 2 >= parts.length) return null;
    const bucket = parts[idx + 1];
    const key = parts.slice(idx + 2).join('/');
    return { bucket, key };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const inputUrl = (body?.url as string) || '';
    const inputBucket = (body?.bucket as string) || '';
    const inputKey = (body?.path as string) || body?.key || '';

    let bucket = inputBucket;
    let key = inputKey;

    if ((!bucket || !key) && inputUrl) {
      const parsed = parseBucketAndKeyFromUrl(inputUrl);
      if (parsed) {
        bucket = parsed.bucket;
        key = decodeURIComponent(parsed.key);
      }
    }

    if (!bucket || !key) {
      return NextResponse.json({ error: 'Missing bucket/key or url' }, { status: 400 });
    }

    const S3_ENDPOINT = process.env.SUPABASE_S3_ENDPOINT || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`;
    const S3_ACCESS_KEY_ID = process.env.SUPABASE_S3_ACCESS_KEY_ID || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const S3_SECRET_ACCESS_KEY = process.env.SUPABASE_S3_SECRET_ACCESS_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
      return NextResponse.json({ error: 'S3/Supabase storage configuration missing' }, { status: 500 });
    }

    const s3 = new S3Client({
      region: 'us-east-1',
      forcePathStyle: true,
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID as string,
        secretAccessKey: S3_SECRET_ACCESS_KEY as string,
      },
    });

    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


