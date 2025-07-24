"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import TabExample2 from '@/components/ui/Tab/TabExample2';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function StyleLifePage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader/>
      </ScrollReveal>
      <ScrollReveal>
        <TabExample2 />
      </ScrollReveal>
      {/*todo: anh mat bang phan khu*/}
      <ScrollReveal>
        <ImageHeader />
      </ScrollReveal>
      <ScrollReveal>
        <AutoScrollSmall
          mainTitle="GIỚI THIỆU DỰ ÁN"
          projects={[
            {
              id: "1",
              title: "Plevia City",
              imageUrl: "/images/thanh-xuan-valley.jpg",
              alt: "Plevia City - Dự án bất động sản với hồ nước và nhà ở"
            },
            {
              id: "2",
              title: "Grandbay Halong Villas",
              imageUrl: "/images/grandbay-halong-villas.jpg",
              alt: "Grandbay Halong Villas - Dự án biệt thự ven biển"
            },
            {
              id: "3",
              title: "InterContinental Residences Halong Bay",
              imageUrl: "/images/intercontinental-halong-bay.jpg",
              alt: "InterContinental Residences Halong Bay - Dự án khách sạn cao cấp"
            }
          ]}
        />
      </ScrollReveal>
    </PageLayout>
  );
} 