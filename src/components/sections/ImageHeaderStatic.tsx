import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageHeaderStatic({ imageUrl }: { imageUrl?: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImageUrl = "https://thanhxuanvalley.com/Upload/catalog/2025/4/b953705c-e985-41ae-b420-51760da6706f.jpg";
  const currentImageUrl = imageUrl || fallbackImageUrl;

  return (
    <section
      id="hero-static"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 }}
    >
      <div className="relative w-full flex justify-center items-center" style={{ background: '#fff' }}>
        {imageLoading && (
          <div className="absolute inset-0">
            <Skeleton className="w-full h-full absolute inset-0 z-0" />
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center z-10">
              <div className="text-gray-600">Đang tải ảnh...</div>
            </div>
          </div>
        )}
        <div style={{ position: 'relative', width: '100%' }}>
          <Image
            src={currentImageUrl}
            alt="Hero Image"
            width={1920}
            height={800}
            className="object-cover object-center rounded-[8px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] mx-auto"
            priority
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            style={{ visibility: imageLoading ? 'hidden' : 'visible', maxWidth: '100%', width: 'calc(100vw - 48px)', marginLeft: 'auto', marginRight: 'auto' }}
          />
          {/* Overlay đen mờ chỉ phủ lên ảnh */}
          <div className="absolute inset-0 rounded-[8px] z-10 pointer-events-none" style={{ background: 'rgba(0,0,0,0.3)' }} />
        </div>
        {imageError && (
          <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
            <div className="text-red-600 text-center">
              <div>Lỗi tải ảnh</div>
              <div className="text-sm mt-2">{currentImageUrl}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 