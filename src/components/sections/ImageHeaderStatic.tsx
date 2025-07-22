import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageHeaderStaticProps {
  imageUrl?: string;
  fullImage?: boolean;
}

export default function ImageHeaderStatic({ imageUrl, fullImage = true }: ImageHeaderStaticProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImageUrl = "https://thanhxuanvalley.com/Upload/catalog/2025/4/b953705c-e985-41ae-b420-51760da6706f.jpg";
  const currentImageUrl = imageUrl || fallbackImageUrl;

  return (
    <section
      id="hero-static"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      style={fullImage ? { marginTop: 8, marginBottom: 8 } : { width: '85vw', margin: '0 auto', marginTop: 8, marginBottom: 8 }}
    >
      <div className="relative w-full flex justify-center items-center">
        {imageLoading && (
          <div className="absolute inset-0">
            <Skeleton className="w-full h-full absolute inset-0 z-0" />
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center z-10">
              <div className="text-gray-600">Đang tải ảnh...</div>
            </div>
          </div>
        )}
        <div style={{ position: 'relative', width: fullImage ? '100vw' : '85vw' }}>
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
            style={fullImage
              ? { visibility: imageLoading ? 'hidden' : 'visible', maxWidth: '100vw', width: '100vw', marginLeft: 'auto', marginRight: 'auto' }
              : { visibility: imageLoading ? 'hidden' : 'visible', maxWidth: '85vw', width: '85vw', marginLeft: 'auto', marginRight: 'auto' }
            }
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