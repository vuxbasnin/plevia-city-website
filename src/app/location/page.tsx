"use client";

import PageLayout from '@/components/layout/PageLayout';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import LibImage from '@/components/sections/LibImage/LibImage';
import Map from '@/components/sections/Map/Map';
import MapExtension from '@/components/sections/MapExtension/MapExtension';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';

export default function LocationPage() {
  return (
    <PageLayout>
      <Map />
      <MapExtension />
      <LibImage />
    </PageLayout>
  );
} 