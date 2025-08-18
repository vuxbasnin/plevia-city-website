"use client";

import PageLayout from '@/components/layout/PageLayout';
import dynamic from 'next/dynamic';
import React from "react";
import ClientImageHeader from '@/components/shared/ClientImageHeader';
import ClientImageHeaderStatic from '@/components/shared/ClientImageHeaderStatic';
import ClientParaImageVertical from '@/components/shared/ClientParaImageVertical';
import ScrollReveal from './ScrollReveal';
import ClientImageBannerHeader from "@/components/shared/ClientImageBannerHeader";

// Lazy load components để giảm memory usage
const TabExample = dynamic(() => import('@/components/ui/Tab/TabExample'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const NewsSectionExample = dynamic(() => import('@/components/sections/News/NewsSectionExample'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const FormInfo = dynamic(() => import('@/components/sections/FormInfo/FormInfo'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const LibImageHome = dynamic(() => import('@/components/sections/LibImageHome/LibImageHome'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const LibImageFurnitureHome = dynamic(() => import('@/components/sections/LibImageFurnitureHome/LibImageFurnitureHome'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const SectionOneHomeExample = dynamic(() => import('@/components/sections/SectionOneHome/SectionOneHomeExample'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});

const SectionTwoHomeExample = dynamic(() => import('@/components/sections/SectionOneHome/SectionTwoHomeExample'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const TabProject = dynamic(() => import("@/components/sections/TabProject/TabProject"), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const StructuredData = dynamic(() => import('@/components/shared/StructuredData'), {
  ssr: true,
  loading: () => null
});
const TitleLifestyle = dynamic(() => import("@/components/sections/TitleLifestyle"), {
  ssr: true,
  loading: () => <div className="h-8 bg-gray-100 animate-pulse rounded" />
});

export default function ClientHomePage() {
  return (
    <>
      <StructuredData type="home" />
      <PageLayout>
        <ScrollReveal>
          <ClientImageBannerHeader/>
        </ScrollReveal>
        <ScrollReveal>
          <SectionOneHomeExample />
        </ScrollReveal>
        <ScrollReveal>
          <SectionTwoHomeExample />
        </ScrollReveal>
        <ScrollReveal>
          <ClientParaImageVertical
            title="Tâm điểm giao thương – Một chạm ngàn tiện ích"
            description1={`Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện. Tọa lạc tại giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14, dự án liền kề hàng loạt trục huyết mạch như Lê Duẩn, Hùng Vương, Hàn Mặc Tử… giúp cư dân di chuyển nhanh chóng tới bệnh viện, trường học, trung tâm thương mại, khu du lịch và các tiện ích hiện hữu chỉ trong vài phút. Từ Plevia City, bạn dễ dàng tiếp cận mọi nhu cầu sống, từ y tế, giáo dục, vui chơi giải trí đến mua sắm và thương mại. Tất cả chỉ cách 1–10 phút di chuyển.`}
            description2={``}
            bullets={[]}
            subDescription=""
            imageUrl="https://res.cloudinary.com/dytm93eoj/image/upload/v1753845487/home-assets/gn3glzslmrkope10iufp.png"
            imageAlt="Vị trí dự án Plevia City"
          >
          </ClientParaImageVertical>
        </ScrollReveal>
        <ScrollReveal>
          <TitleLifestyle title="Mặt bằng dự án" />
        </ScrollReveal>
        <ScrollReveal>
          <ClientImageHeaderStatic
            imageUrl="/assets/home/mat_bang.png"
            fullImage={true} />
        </ScrollReveal>
        <ScrollReveal>
          <TabProject />
        </ScrollReveal>
        <ScrollReveal>
          <LibImageHome />
        </ScrollReveal>

        {/* Khoảng cách giữa 2 section */}
        <div className="py-8 bg-transparent"></div>

        <ScrollReveal>
          <LibImageFurnitureHome />
        </ScrollReveal>
        <ScrollReveal>
          <TabExample />
        </ScrollReveal>
        {/*<ScrollReveal>*/}
        {/*    <ParaManyImage*/}
        {/*        title="TIẾN ĐỘ XÂY DỰNG DỰ ÁN"*/}
        {/*        paragraph="Đang cập nhật"*/}
        {/*        // bullets={[*/}
        {/*        //   "Hạ tầng dự án đã hoàn thiện.",*/}
        {/*        //   "Chủ đầu tư đang trồng và chăm sóc cây xanh của dự án.",*/}
        {/*        //   "Đã hoàn thiện nhà Mẫu và nhà điều hành",*/}
        {/*        //   "Biệt thự Đơn Lập, Song Lập Tứ Lập, Nhà phố liên kế đang hoàn thiện",*/}
        {/*        //   "Tiện ích, nhà điều hành, công viên hàng hoàn thiện"*/}
        {/*        // ]}*/}
        {/*        // footer="Chủ đầu tư Khang Điền – Keppel Land dự kiến hoàn thiện tiện ích, nhà mẫu và sản phẩm vào Quý 3/2025."*/}
        {/*        images={[*/}
        {/*            "/assets/home/tien_do_1.png",*/}
        {/*            "/assets/home/tien_do_2.png",*/}
        {/*            "/assets/home/tien_do_3.png",*/}
        {/*        ]}*/}
        {/*    />*/}
        {/*</ScrollReveal>*/}
        <ScrollReveal>
          <NewsSectionExample />
        </ScrollReveal>
        <ScrollReveal>
          <FormInfo />
        </ScrollReveal>
      </PageLayout>
    </>
  );
}
