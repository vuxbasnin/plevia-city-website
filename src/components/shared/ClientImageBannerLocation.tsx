"use client";

import ImageBannerHeader from '@/components/sections/ImageBannerHeader';

export default function ClientImageBannerLocation() {
  return (
    <ImageBannerHeader 
      bannerType="banner_location"
      fallbackImageUrl="/assets/location/banner_location.png"
    />
  );
}


