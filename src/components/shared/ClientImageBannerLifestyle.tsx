"use client";

import ImageBannerHeader from '@/components/sections/ImageBannerHeader';

export default function ClientImageBannerLifestyle() {
  return (
    <ImageBannerHeader 
      bannerType="banner_lifestyle"
      fallbackImageUrl="/assets/home/banner_home.png"
    />
  );
}


