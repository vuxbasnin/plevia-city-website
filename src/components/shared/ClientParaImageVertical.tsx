"use client";

import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';

interface ClientParaImageVerticalProps {
  title: string;
  description1: string;
  description2: string;
  bullets?: string[];
  subDescription?: string;
  imageUrl: string;
  imageAlt?: string;
  children?: React.ReactNode;
  isLibImage?: boolean;
}

export default function ClientParaImageVertical(props: ClientParaImageVerticalProps) {
  return <ParaImageVertical {...props} />;
}
