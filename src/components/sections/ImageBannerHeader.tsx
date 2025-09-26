'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { getSectionData, getBannerImage } from '@/lib/firestoreService';
import type { HeroSectionData } from '@/types/landingPageAdmin';
import { defaultHeroSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import './ImageHeader.css';

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
  const [bannerImage, setBannerImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [imageVersion, setImageVersion] = useState(0);

  const ref = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setImageError(false);
      try {
        const data = await getSectionData<HeroSectionData>(bannerType);
        setHeroData(data || defaultHeroSectionData);
        
        const imageData = await getBannerImage(bannerType);
        setBannerImage(imageData);
        
        setImageVersion(prev => prev + 1);
      } catch (error) {
        setHeroData(defaultHeroSectionData);
        setBannerImage(null);
      }
      setIsLoading(false);
    }
    loadData();
  }, [bannerType]);

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

  useEffect(() => {
    if (!isLoading && !imageLoading && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, imageLoading, hasAnimated]);

  const currentImageUrl = bannerImage?.url || fallbackImageUrl;

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
          src={currentImageUrl}
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
