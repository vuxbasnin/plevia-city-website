"use client";

import PageLayout from '@/components/layout/PageLayout';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import Overview from '@/components/sections/Overview/OverviewSection';
import ImageHeader from '@/components/sections/ImageHeader';
import StorySectionExample from '@/components/sections/Story/StorySectionExample';
import DevelopmentVision from '@/components/sections/DevelopmentVision/DevelopmentVision';

export default function ProjectPage() {
  return (
    <PageLayout>
      <ImageHeader />
      <StorySectionExample />
      <DevelopmentVision />
      <Overview />
    </PageLayout>
  );
} 