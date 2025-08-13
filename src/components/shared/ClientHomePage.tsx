"use client";

import PageLayout from '@/components/layout/PageLayout';
import dynamic from 'next/dynamic';
import React from "react";
import ClientImageHeader from '@/components/shared/ClientImageHeader';
import ClientImageHeaderStatic from '@/components/shared/ClientImageHeaderStatic';
import ClientParaImageVertical from '@/components/shared/ClientParaImageVertical';

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
        <ClientImageHeader
          imageUrl="https://res.cloudinary.com/dytm93eoj/image/upload/v1753845485/home-assets/ssknbjvtcnhrl9woana1.jpg" />
        <SectionOneHomeExample />
        <SectionTwoHomeExample />
        <ClientParaImageVertical
          title="VỊ TRÍ ĐẮC ĐỊA – KẾT NỐI HOÀN HẢO"
          description1={`Plevia City sở hữu vị trí đắc địa khi nằm trên trục đường chính nội đô phường Hội Phú cách trung tâm hành chính thành phố chưa đầy 2km. Trong bối cảnh quy hoạch đến năm 2030 chỉ khoảng 7% diện tích đô thị là đất bằng phẳng thuận lợi cho việc phát triển khu đô thị cao cấp, việc Plevia City phát triển trên vùng đất phẳng rộng lớn là một lợi thế cực kỳ hiếm có, lý tưởng để hình thành một đô thị hiện đại và đồng bộ.`}
          description2={`Về lâu dài, Plevia City sẽ được hưởng lợi trực tiếp từ các dự án hạ tầng quy hoạch trọng điểm của tỉnh trong vài năm tới, cụ thể:`}
          bullets={["- Sân bay Pleiku đang khai thác và có kế hoạch mở thêm đường bay quốc tế", "- Sân bay dự phòng đang nghiên cứu phương án dân dụng", "- Cao tốc Pleiku – Quy Nhơn đang đẩy mạnh đầu tư, kết hợp các tuyến QL 14, QL 19 tạo thành mạng giao thông liên kết xuyên vùng", "- Phát triển khu công nghiệp Nam Pleiku ",]}
          subDescription="Gladia by the Waters dễ dàng tiếp cận đến các cơ sở Giáo dục, Giải trí, Mua sắm và Y tế chất lượng cao như: Trường American School, Trường Quốc tế Việt Úc (VAS), Bệnh viện Quốc tế Mỹ (AIH), Bệnh viện FV, Esttela Heights, Thiso Mall, Vietnam Country Gofl Club"
          imageUrl="https://res.cloudinary.com/dytm93eoj/image/upload/v1753845487/home-assets/gn3glzslmrkope10iufp.png"
          imageAlt="Vị trí dự án Plevia City"
        >
        </ClientParaImageVertical>
        <TitleLifestyle title="Mặt bằng dự án" />

        <ClientImageHeaderStatic
          imageUrl="/assets/home/mat_bang.png"
          fullImage={true} />
        <TabProject />
        <LibImageHome />

        
        {/* Khoảng cách giữa 2 section */}
        <div className="py-8 bg-transparent"></div>

        <LibImageFurnitureHome />

        <TabExample />

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
        <NewsSectionExample />
        <FormInfo />
      </PageLayout>
    </>
  );
}
