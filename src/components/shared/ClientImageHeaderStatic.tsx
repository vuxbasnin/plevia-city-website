"use client";

import ImageHeaderStatic from '@/components/sections/ImageHeaderStatic';

interface ClientImageHeaderStaticProps {
  imageUrl?: string;
  fullImage?: boolean;
}

export default function ClientImageHeaderStatic({ imageUrl, fullImage }: ClientImageHeaderStaticProps) {
  return <ImageHeaderStatic imageUrl={imageUrl} fullImage={fullImage} />;
}
