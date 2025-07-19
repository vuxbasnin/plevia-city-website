'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { getHeroSectionData } from '@/lib/firestoreService';
import type { HeroSectionData } from '@/types/landingPageAdmin';
import { defaultHeroSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageHeader() {
  const [heroData, setHeroData] = useState<HeroSectionData>(defaultHeroSectionData);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const ref = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setImageError(false);
      try {
        const data = await getHeroSectionData();
        setHeroData(data || defaultHeroSectionData);
      } catch (error) {
        console.error("Error loading hero section data:", error);
        setHeroData(defaultHeroSectionData);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

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

  //todo: hardcode link image to test, fix again
  // const currentImageUrl = imageError
  //   ? `https://placehold.co/1200x800.png?text=${encodeURIComponent(heroData.headline || 'Hero+Image+Error')}`
  //   : heroData.imageUrl || defaultHeroSectionData.imageUrl;


  const currentImageUrl = "https://thanhxuanvalley.com/Upload/catalog/2025/4/b953705c-e985-41ae-b420-51760da6706f.jpg";

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden">
        <Skeleton className="absolute inset-0 z-0" />
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 overflow-hidden"
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
          alt={heroData.headline || "Hero Image"}
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
