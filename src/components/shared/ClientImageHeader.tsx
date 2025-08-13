"use client";

import ImageHeader from '@/components/sections/ImageHeader';

interface ClientImageHeaderProps {
  imageUrl?: string;
}

export default function ClientImageHeader({ imageUrl }: ClientImageHeaderProps) {
  return <ImageHeader imageUrl={imageUrl} />;
}
