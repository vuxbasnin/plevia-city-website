'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getHeroSectionData } from '@/lib/firestoreService';
import type { HeroSectionData } from '@/types/landingPageAdmin';
import { defaultHeroSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroSectionData>(defaultHeroSectionData);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setImageError(false); // Reset image error state on new data load
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

  const currentImageUrl = imageError 
    ? `https://placehold.co/1200x800.png?text=${encodeURIComponent(heroData.headline || 'Hero+Image+Error')}` 
    : heroData.imageUrl || defaultHeroSectionData.imageUrl;


  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden">
        {/* Background Image Skeleton */}
        <Skeleton className="absolute inset-0 z-0" />
        {/* Content Skeleton */}
        <div className="relative z-20 max-w-4xl w-full text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-gray-400/50" />
          <Skeleton className="h-8 w-full mx-auto mb-4 bg-gray-400/30" />
          <Skeleton className="h-8 w-5/6 mx-auto mb-8 bg-gray-400/30" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 text-center overflow-hidden"
    >
      {/* Background image container for hover effect */}
      <motion.div
        className="absolute inset-0 z-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Image
          src={currentImageUrl}
          alt={heroData.headline}
          fill
          className="object-cover object-center"
          priority
          onError={() => setImageError(true)}
          data-ai-hint="office workspace team"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
          {heroData.headline.split(' ').map((word, index) =>
            word.toLowerCase() === 'lý' || word.toLowerCase() === 'tưởng' ? (
              <span key={index} className="text-primary">
                {word}{' '}
              </span>
            ) : (
              `${word} `
            )
          )}
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-slate-200 max-w-xl mx-auto drop-shadow-md">
          {heroData.subheadline}
        </p>
      </motion.div>
    </section>
  );
}
