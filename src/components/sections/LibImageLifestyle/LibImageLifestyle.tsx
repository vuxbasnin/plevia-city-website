'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './LibImageLifestyle.css';
import { getGalleryImages } from '@/lib/firestoreService';

interface ImageItem {
  id: string;
  url: string;
  caption?: string;
}

interface LibImageLifestyleProps {
  isHideTitle?: boolean;
  is169?: boolean;
  images?: ImageItem[];
  autoScrollInterval?: number;
}

const LibImageLifestyle: React.FC<LibImageLifestyleProps> = ({ 
  isHideTitle = false, 
  is169 = false, 
  images: propImages,
  autoScrollInterval = 5000
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // For touch/drag
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragThreshold = 60;

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        // Nếu có images từ props, sử dụng luôn
        if (propImages && propImages.length > 0) {
          setImages(propImages);
          setLoading(false);
          return;
        }

        // Nếu không có, fetch từ remote
        const imgs = await getGalleryImages();
        console.log('Fetched images:', imgs);
        setImages(
          imgs
            .filter((img: any) => !!img.url)
            .map((img: any) => ({
              id: img.id,
              url: img.url,
              caption: img.caption || '',
            }))
        );
      } catch (e) {
        setImages([]);
      }
      setLoading(false);
    }
    fetchImages();
  }, [propImages]); // Thêm propImages vào dependency

  // Auto scroll effect
  useEffect(() => {
    if (images.length <= 1 || !isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= images.length ? 0 : nextIndex;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [images.length, isAutoScrolling, autoScrollInterval]);

  const goTo = (newIndex: number) => {
    if (isTransitioning || newIndex < 0 || newIndex >= images.length) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const nextImage = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
    goTo(currentIndex + 1 >= images.length ? 0 : currentIndex + 1);
  };

  const prevImage = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
    goTo(currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX.current) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;
    if (Math.abs(diff) > dragThreshold) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current || !isDragging.current) {
      startX.current = null;
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    startX.current = null;
    isDragging.current = false;
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startX.current) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > dragThreshold) {
      isDragging.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!startX.current || !isDragging.current) {
      startX.current = null;
      return;
    }

    const diff = startX.current - e.clientX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    startX.current = null;
    isDragging.current = false;
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    startX.current = null;
  };

  return (
    <section className={`lib-image-lifestyle libimage-lifestyle-slider-root ${is169 ? 'libimage-lifestyle-169' : ''}`}>
      {!isHideTitle && (
        <div className="lib-image-lifestyle-header">
          <div className="title title-large title-center">
            <h2 style={{ color: 'hsl(var(--primary))' }}>CÁC MẪU NHÀ</h2>
          </div>
        </div>
      )}
      <div className="libimage-lifestyle-slider-container">
        <button 
          className="libimage-lifestyle-slider-btn libimage-lifestyle-slider-btn-left" 
          onClick={prevImage} 
          disabled={isTransitioning}
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={36} />
        </button>
        <div
          className="libimage-lifestyle-slider-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'grab', userSelect: 'none' }}
        >
          {images.length > 0 && (
            <div 
              className="libimage-lifestyle-slider-image-inner"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 1000ms ease-in-out'
              }}
            >
              {images.map((image, index) => (
                <div 
                  key={image.id} 
                  className="libimage-lifestyle-slider-image-container"
                  style={{ width: '100%', flexShrink: 0 }}
                >
                  <Image
                    src={image.url}
                    alt={image.caption || 'Ảnh thư viện'}
                    width={1920}
                    height={1080}
                    className={`libimage-lifestyle-slider-image ${is169 ? 'libimage-lifestyle-169-img' : ''}`}
                    style={{ 
                      width: '100%', 
                      maxWidth: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      aspectRatio: '16/9'
                    }}
                    priority={index === 0}
                    draggable={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop';
                    }}
                  />
                  {image.caption && (
                    <div className="libimage-lifestyle-slider-caption">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {loading && (
            <div className="libimage-lifestyle-slider-loading">Đang tải ảnh...</div>
          )}
        </div>
        <button 
          className="libimage-lifestyle-slider-btn libimage-lifestyle-slider-btn-right" 
          onClick={nextImage} 
          disabled={isTransitioning}
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight size={36} />
        </button>
      </div>
      <div className="libimage-lifestyle-slider-indicator">
        {images.map((img, idx) => (
          <span key={img.id} className={idx === currentIndex ? 'active' : ''} />
        ))}
      </div>
    </section>
  );
};

export default LibImageLifestyle; 