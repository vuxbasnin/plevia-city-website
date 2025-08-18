"use client";

import ImageBannerHeader from '@/components/sections/ImageBannerHeader';

export default function ClientImageBannerLifestyle() {
  return (
    <ImageBannerHeader 
      bannerType="banner_lifestyle"
      fallbackImageUrl="/assets/lifestyle/banner_lifestyle.png"
    />
  );
}
