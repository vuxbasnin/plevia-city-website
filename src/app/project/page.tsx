"use client";

import PageLayout from '@/components/layout/PageLayout';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import Overview from '@/components/sections/Overview/OverviewSection';
import ImageHeader from '@/components/sections/ImageHeader';
import StorySectionExample from '@/components/sections/Story/StorySectionExample';
import DevelopmentVision from '@/components/sections/DevelopmentVision/DevelopmentVision';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ProjectPage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader />
      </ScrollReveal>
      <ScrollReveal>
        <StorySectionExample />
      </ScrollReveal>
      <ScrollReveal>
        <DevelopmentVision />
      </ScrollReveal>
      <ScrollReveal>
        <Overview />
      </ScrollReveal>
    </PageLayout>
  );
} 