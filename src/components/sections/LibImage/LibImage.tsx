'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Title from '@/components/ui/Title/Title';
import './LibImage.css';
import { getGalleryImages } from '@/lib/firestoreService';

interface ImageItem {
  id: string;
  url: string;
  caption?: string;
}

interface LibImageProps {
  isHideTitle?: boolean;
  is169?: boolean; // Thêm prop mới
  images?: ImageItem[]; // Thêm prop images
}

const LibImage: React.FC<LibImageProps> = ({ isHideTitle = false, is169 = false, images: propImages }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [animating, setAnimating] = useState(false);

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

  const goTo = (newIndex: number, dir: number) => {
    if (animating || newIndex < 0 || newIndex >= images.length) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimating(false);
    }, 350); // animation duration
  };

  const nextImage = () => goTo(currentIndex + 1, 1);
  const prevImage = () => goTo(currentIndex - 1, -1);

  // Animation classes
  const getSlideClass = () => {
    if (!animating) return 'libimage-slide-active';
    if (direction === 1) return 'libimage-slide-to-left';
    if (direction === -1) return 'libimage-slide-to-right';
    return 'libimage-slide-active';
  };

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (animating) return;
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    // Không xử lý move ở đây để tránh lag, chỉ xử lý khi end
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (animating || startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;
    if (diff < -dragThreshold && currentIndex < images.length - 1) {
      nextImage();
    } else if (diff > dragThreshold && currentIndex > 0) {
      prevImage();
    }
    startX.current = null;
  };

  // Mouse drag events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (animating) return;
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    // Không xử lý move ở đây để tránh lag, chỉ xử lý khi mouse up
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || animating || startX.current === null) return;
    const endX = e.clientX;
    const diff = endX - startX.current;
    if (diff < -dragThreshold && currentIndex < images.length - 1) {
      nextImage();
    } else if (diff > dragThreshold && currentIndex > 0) {
      prevImage();
    }
    isDragging.current = false;
    startX.current = null;
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    isDragging.current = false;
    startX.current = null;
  };

  return (
    <section className={`lib-image libimage-slider-root ${is169 ? 'libimage-169' : ''}`}>
      {!isHideTitle && (
        <div className="lib-image-header">
          <Title variant="large" align="center">
            CÁC MẪU NHÀ
          </Title>
        </div>
      )}
      <div className="libimage-slider-container">
        <button 
          className="libimage-slider-btn libimage-slider-btn-left" 
          onClick={prevImage} 
          disabled={currentIndex === 0 || animating}
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
            <div className={`libimage-slider-image-inner ${getSlideClass()}`} key={images[currentIndex]?.id}>
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].caption || 'Ảnh thư viện'}
                width={1920}
                height={1080}
                className={`libimage-slider-image ${is169 ? 'libimage-169-img' : ''}`}
                style={{ 
                  width: '100vw', 
                  maxWidth: '100vw', 
                  height: '100%', 
                  objectFit: 'cover',
                  aspectRatio: '16/9'
                }}
                priority
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop';
                }}
              />
              {images[currentIndex].caption && (
                <div className="libimage-slider-caption">
                  {images[currentIndex].caption}
                </div>
              )}
            </div>
          )}
          {loading && (
            <div className="libimage-slider-loading">Đang tải ảnh...</div>
          )}
        </div>
        <button 
          className="libimage-slider-btn libimage-slider-btn-right" 
          onClick={nextImage} 
          disabled={currentIndex === images.length - 1 || animating}
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
