
"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import Overview from '@/components/sections/Overview/OverviewSection';
import TabExample from '@/components/ui/Tab/TabExample';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import FormInfo from '@/components/sections/FormInfo/FormInfo';

export default function HomePage() {
  return (
    <PageLayout>
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
          },
          {
            id: "4",
            title: "Sunshine City",
            imageUrl: "/images/sunshine-city.jpg",
            alt: "Sunshine City - Dự án đô thị hiện đại"
          },
          {
            id: "5",
            title: "Ocean View Residences",
            imageUrl: "/images/ocean-view-residences.jpg",
            alt: "Ocean View Residences - Dự án căn hộ cao cấp"
          },
          {
            id: "6",
            title: "Green Valley Estate",
            imageUrl: "/images/green-valley-estate.jpg",
            alt: "Green Valley Estate - Dự án biệt thự xanh"
          }
        ]}
      />
      <Overview />
      <TabExample />
      <NewsSectionExample />
      <FormInfo />
    </PageLayout>
  );
}