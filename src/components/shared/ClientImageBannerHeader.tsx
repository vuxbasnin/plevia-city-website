"use client";

import ImageBannerHeader from '@/components/sections/ImageBannerHeader';

export default function ClientImageBannerHeader() {
  return (
    <ImageBannerHeader 
      bannerType="banner_home"
      fallbackImageUrl="/assets/home/banner_home.png"
    />
  );
}
