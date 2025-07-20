"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import TabExample2 from '@/components/ui/Tab/TabExample2';

export default function StyleLifePage() {
  return (
    <PageLayout>
      <ImageHeader/>
      <TabExample2 />
      {/*todo: anh mat bang phan khu*/}
      <ImageHeader />
      <AutoScrollSmall
        mainTitle="GIỚI THIỆU DỰ ÁN"
        projects={[
          {
            id: "1",
            title: "Thanh Xuan Valley",
            imageUrl: "/images/thanh-xuan-valley.jpg",
            alt: "Thanh Xuan Valley - Dự án bất động sản với hồ nước và nhà ở"
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
    </PageLayout>
  );
} 