'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { getSectionData } from '@/lib/firestoreService';
import type { HeroSectionData } from '@/types/landingPageAdmin';
import { defaultHeroSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import './ImageHeader.css';

// Định nghĩa các loại banner có sẵn
export type BannerType = 'banner_home' | 'banner_storyline' | 'banner_location' | 'banner_lifestyle' | 'banner_news';

interface ImageBannerHeaderProps {
  bannerType?: BannerType;
  fallbackImageUrl?: string;
  className?: string;
}

export default function ImageBannerHeader({ 
  bannerType = 'banner_home', 
  fallbackImageUrl = "/assets/home/banner_home.png",
  className = ""
}: ImageBannerHeaderProps) {
  const [heroData, setHeroData] = useState<HeroSectionData>(defaultHeroSectionData);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [imageVersion, setImageVersion] = useState(0); // For cache busting

  const ref = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setImageError(false);
      try {
        // Sử dụng bannerType để fetch data tương ứng
        const data = await getSectionData<HeroSectionData>(bannerType);
        setHeroData(data || defaultHeroSectionData);
        // Increment image version to force reload
        setImageVersion(prev => prev + 1);
      } catch (error) {
        console.error(`Error loading ${bannerType} data:`, error);
        setHeroData(defaultHeroSectionData);
      }
      setIsLoading(false);
    }
    loadData();
  }, [bannerType]);

  // Detect scroll direction and trigger animation
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      const isScrollingUp = latest < lastScrollY;
      const isNearTop = latest < 100;
      
      if (isScrollingUp && isNearTop && !hasAnimated) {
        setHasAnimated(true);
      } else if (latest > 200) {
        setHasAnimated(false);
      }
      
      setLastScrollY(latest);
    });

    return () => unsubscribe();
  }, [scrollY, lastScrollY, hasAnimated]);

  // Trigger animation on first load
  useEffect(() => {
    if (!isLoading && !imageLoading && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, imageLoading, hasAnimated]);

  // Sử dụng imageUrl từ Firestore thay vì prop
  const currentImageUrl = imageError
    ? `https://placehold.co/1200x800.png?text=Hero+Image+Error`
    : heroData.imageUrl || fallbackImageUrl;

  // Debug logs
  console.log(`[${bannerType}] Debug:`, {
    heroDataImageUrl: heroData.imageUrl,
    fallbackImageUrl,
    currentImageUrl,
    imageError,
    imageLoading,
    isLoading
  });

  if (isLoading) {
    return (
      <section className={`relative h-[50vh] flex items-center justify-center bg-background px-6 overflow-hidden ${className}`}>
        <Skeleton className="absolute inset-0 z-0" />
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative h-[50vh] flex items-center justify-center px-6 sm:px-10 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.3 }}
        animate={hasAnimated ? { scale: 1 } : { scale: 1.3 }}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
      >
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <div className="text-gray-600">Đang tải ảnh...</div>
          </div>
        )}
        
        <Image
          src={`${currentImageUrl}?v=${imageVersion}`} // Cache busting with version
          alt="Hero Image"
          fill
          className="object-cover object-center"
          priority
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          data-ai-hint="office workspace team"
        />
        
        {imageError && (
          <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
            <div className="text-red-600 text-center">
              <div>Lỗi tải ảnh</div>
              <div className="text-sm mt-2">{currentImageUrl}</div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-black/30 z-10" />
    </section>
  );
}
