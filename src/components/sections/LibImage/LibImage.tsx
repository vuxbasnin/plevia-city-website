'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Title from '@/components/ui/Title/Title';
import './LibImage.css';
import { getGalleryImages } from '@/lib/firestoreService';
import { color } from 'framer-motion';

interface ImageItem {
  id: string;
  url: string;
  caption?: string;
}

interface LibImageProps {
  isHideTitle?: boolean;
  is169?: boolean; // Thêm prop mới
  images?: ImageItem[]; // Thêm prop images
  autoScrollInterval?: number; // Thêm prop cho auto scroll interval
}

const LibImage: React.FC<LibImageProps> = ({ 
  isHideTitle = false, 
  is169 = false, 
  images: propImages,
  autoScrollInterval = 5000 // Mặc định 5 giây
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true); // Thêm state cho auto scroll

  // For touch/drag
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragThreshold = 60; // px

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
        return nextIndex >= images.length ? 0 : nextIndex; // Loop back to first image
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [images.length, isAutoScrolling, autoScrollInterval]);

  const goTo = (newIndex: number) => {
    if (isTransitioning || newIndex < 0 || newIndex >= images.length) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match CSS transition duration
  };

  const nextImage = () => {
    // Tạm dừng auto scroll khi user tương tác
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000); // Resume auto scroll after 10 seconds
    
    const nextIndex = currentIndex + 1;
    goTo(nextIndex >= images.length ? 0 : nextIndex); // Loop back to first image
  };
  
  const prevImage = () => {
    // Tạm dừng auto scroll khi user tương tác
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000); // Resume auto scroll after 10 seconds
    
    const prevIndex = currentIndex - 1;
    goTo(prevIndex < 0 ? images.length - 1 : prevIndex); // Loop to last image
  };

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    startX.current = e.touches[0].clientX;
    // Tạm dừng auto scroll khi user touch
    setIsAutoScrolling(false);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    // Không xử lý move ở đây để tránh lag, chỉ xử lý khi end
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioning || startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;
    if (diff < -dragThreshold) {
      nextImage();
    } else if (diff > dragThreshold) {
      prevImage();
    }
    startX.current = null;
    // Resume auto scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  // Mouse drag events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    isDragging.current = true;
    startX.current = e.clientX;
    // Tạm dừng auto scroll khi user drag
    setIsAutoScrolling(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    // Không xử lý move ở đây để tránh lag, chỉ xử lý khi mouse up
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || isTransitioning || startX.current === null) return;
    const endX = e.clientX;
    const diff = endX - startX.current;
    if (diff < -dragThreshold) {
      nextImage();
    } else if (diff > dragThreshold) {
      prevImage();
    }
    isDragging.current = false;
    startX.current = null;
    // Resume auto scroll after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    isDragging.current = false;
    startX.current = null;
  };

  return (
    <section className={`lib-image libimage-slider-root ${is169 ? 'libimage-169' : ''}`}>
      {!isHideTitle && (
        <div className="lib-image-header">
          <Title variant="large" align="center" isColorWhite={true}>
            CÁC MẪU NHÀ
          </Title>
        </div>
      )}
      <div className="libimage-slider-container">
        <button 
          className="libimage-slider-btn libimage-slider-btn-left" 
          onClick={prevImage} 
          disabled={isTransitioning}
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={36} />
        </button>
        <div
          className="libimage-slider-image-wrapper"
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
              className="libimage-slider-image-inner"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 1000ms ease-in-out'
              }}
            >
              {images.map((image, index) => (
                <div 
                  key={image.id} 
                  className="libimage-slider-image-container"
                  style={{ width: '100%', flexShrink: 0 }}
                >
                  <Image
                    src={image.url}
                    alt={image.caption || 'Ảnh thư viện'}
                    width={1920}
                    height={1080}
                    className={`libimage-slider-image ${is169 ? 'libimage-169-img' : ''}`}
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
                    <div className="libimage-slider-caption">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {loading && (
            <div className="libimage-slider-loading">Đang tải ảnh...</div>
          )}
        </div>
        <button 
          className="libimage-slider-btn libimage-slider-btn-right" 
          onClick={nextImage} 
          disabled={isTransitioning}
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight size={36} />
        </button>
      </div>
      <div className="libimage-slider-indicator">
        {images.map((img, idx) => (
          <span key={img.id} className={idx === currentIndex ? 'active' : ''} />
        ))}
      </div>
    </section>
  );
};

export default LibImage;
