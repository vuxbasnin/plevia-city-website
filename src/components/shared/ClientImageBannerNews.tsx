"use client";

import ImageBannerHeader from '@/components/sections/ImageBannerHeader';

export default function ClientImageBannerNews() {
  return (
    <ImageBannerHeader 
      bannerType="banner_news"
      fallbackImageUrl="/assets/news/banner_news.png"
    />
  );
}
