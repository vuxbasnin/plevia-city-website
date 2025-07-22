"use client";

import PageLayout from '@/components/layout/PageLayout';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import LibImage from '@/components/sections/LibImage/LibImage';
import Map from '@/components/sections/Map/Map';
import MapExtension from '@/components/sections/MapExtension/MapExtension';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function LocationPage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <Map />
      </ScrollReveal>
      <ScrollReveal>
        <MapExtension />
      </ScrollReveal>
      <ScrollReveal>
        <LibImage />
      </ScrollReveal>
    </PageLayout>
  );
} 