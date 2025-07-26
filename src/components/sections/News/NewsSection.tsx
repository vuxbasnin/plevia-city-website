import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './NewsSection.css';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
  scrollInterval?: number;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  newsItems,
  scrollInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTranslateX, setStartTranslateX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderElementRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const currentTranslateXRef = useRef<number>(0);

  // Auto scroll effect
  useEffect(() => {
    if (!isDragging) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          return newIndex;
        });
      }, scrollInterval);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [scrollInterval, isDragging]);

  // Update translateX when currentIndex changes
  useEffect(() => {
    if (!isDragging) {
      // Tính toán pixel dựa trên container width và số items visible
      const containerWidth = sliderRef.current?.offsetWidth || 1200;
      const isMobile = window.innerWidth <= 767;
      const itemsVisible = isMobile ? 1 : 3; // 1 item trên mobile, 3 items trên desktop
      const itemWidth = containerWidth / itemsVisible;
      const newTranslateX = -currentIndex * itemWidth;
      
      setTranslateX(newTranslateX);
      currentTranslateXRef.current = newTranslateX;
    }
  }, [currentIndex, isDragging]);

  // Reset drag state when auto scroll changes
  useEffect(() => {
    if (!isDragging) {
      setStartTranslateX(translateX);
    }
  }, [translateX, isDragging]);

  // Mouse/Touch event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartTranslateX(translateX);
    
    // Tắt auto scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest item
    const containerWidth = sliderRef.current?.offsetWidth || 1200;
    const isMobile = window.innerWidth <= 767;
    const itemsVisible = isMobile ? 1 : 3;
    const itemWidth = containerWidth / itemsVisible;
    const nearestIndex = Math.round(-translateX / itemWidth);
    const targetTranslateX = -nearestIndex * itemWidth;
    
    setTranslateX(targetTranslateX);
    currentTranslateXRef.current = targetTranslateX;
    setCurrentIndex(Math.max(0, nearestIndex));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.pageX;
    const diff = currentX - startX;
    const newTranslateX = startTranslateX + diff;
    
    setTranslateX(newTranslateX);
    currentTranslateXRef.current = newTranslateX;
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start detected'); // Debug
    e.preventDefault(); // Ngăn chặn default touch behavior
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setStartTranslateX(translateX);
    
    // Tắt auto scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log('Touch end detected'); // Debug
    e.preventDefault(); // Ngăn chặn default touch behavior
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest item
    const containerWidth = sliderRef.current?.offsetWidth || 1200;
    const isMobile = window.innerWidth <= 767;
    const itemsVisible = isMobile ? 1 : 3;
    const itemWidth = containerWidth / itemsVisible;
    const nearestIndex = Math.round(-translateX / itemWidth);
    const targetTranslateX = -nearestIndex * itemWidth;
    
    setTranslateX(targetTranslateX);
    currentTranslateXRef.current = targetTranslateX;
    setCurrentIndex(Math.max(0, nearestIndex));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Ngăn chặn default touch behavior
    
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    const newTranslateX = startTranslateX + diff;
    
    console.log('Touch move:', { currentX, diff, newTranslateX }); // Debug
    
    setTranslateX(newTranslateX);
    currentTranslateXRef.current = newTranslateX;
  };

  return (
    <section className="news-section">
      {/* Background với pattern lá */}
      <div className="news-background">
        <div className="leaf-pattern left"></div>
        <div className="leaf-pattern right"></div>
      </div>

      {/* Container chính */}
      <div className="news-container">
        {/* Tiêu đề */}
        <div className="news-title">
          <h2>TIN TỨC</h2>
        </div>

        {/* Auto Scroll Container */}
        <div 
          className="news-scroll-wrapper"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <div 
            ref={sliderElementRef}
            className="news-scroll-slider"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 1000ms ease-in-out'
            }}
          >
            {/* Lặp vô hạn các items */}
            {Array.from({ length: 100 }, (_, groupIndex) => 
              newsItems.map((item, itemIndex) => (
                <div key={`${groupIndex}-${item.id}`} className="news-item">
                  <div className="news-item-content">
                    {/* Image Container */}
                    <div className="news-image-container">
                      <div className="news-image-wrapper">
                        <Image
                          src={item.imageUrl}
                          alt={item.alt}
                          fill
                          className="news-image"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    {/* News Content */}
                    <div className="news-content">
                      <h3 className="news-item-title">{item.title}</h3>
                      <p className="news-item-description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ).flat()}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="news-cta">
          <button className="explore-button">
            <span className="button-text">KHÁM PHÁ NGAY</span>
            <span className="button-arrow">→</span>
            <div className="wave-effect"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
