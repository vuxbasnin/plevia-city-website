
"use client";

import Navbar from '@/components/layout/Navbar/Navbar';
import ImageHeader from '@/components/sections/ImageHeader';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import MemberBenefitsSection from '@/components/sections/MemberBenefitsSection';
import CommunityCultureSection from '@/components/sections/CommunityCultureSection';
import FinalCallToActionSection from '@/components/sections/FinalCallToActionSection';
import Footer from '@/components/layout/Footer/Footer';
import BackToTopButton from '@/components/shared/BackToTopButton';
import FloatingActionButtons from '@/components/shared/FloatingActionButtons';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import Overview from '@/components/sections/Overview/OverviewSection';
import TabExample from '@/components/ui/Tab/TabExample';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import FormInfo from '@/components/sections/FormInfo/FormInfo';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ImageHeader />
          //todo: hardcode data, fix later
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
        </main>
        <Footer />
        <FloatingActionButtons />
        <BackToTopButton />
      </div>
    </div>
  );
}

