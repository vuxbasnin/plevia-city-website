import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Map from '@/components/sections/Map/Map';
import ScrollReveal from '@/components/shared/ScrollReveal';
import ImageHeaderStatic from "@/components/sections/ImageHeaderStatic";
import TextBlock from '@/components/ui/TextBlock';
import FormInfo from "@/components/sections/FormInfo/FormInfo";
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import React from "react";
import { locationHeroTitle, locationIntro, locationDetail, locationTech, locationImage } from '@/data/location';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Plevia City - Kết nối & tiện ích';
  const description = 'Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện. Tọa lạc tại giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14, dự án liền kề hàng loạt trục huyết mạch như Lê Duẩn, Hùng Vương, Hàn Mặc Tử… giúp cư dân di chuyển nhanh chóng tới bệnh viện, trường học, trung tâm thương mại, khu du lịch và các tiện ích hiện hữu chỉ trong vài phút. Từ Plevia City, bạn dễ dàng tiếp cận mọi nhu cầu sống, từ y tế, giáo dục, vui chơi giải trí đến mua sắm và thương mại. Tất cả chỉ cách 1–10 phút di chuyển.';
  return {
    title,
    description,
    alternates: { canonical: '/location' },
    openGraph: {
      title,
      description,
      url: '/location',
      type: 'website',
      images: [
        {
          url: '/assets/location/banner_location.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Kết nối & tiện ích',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/assets/location/banner_location.png',
          alt: 'Plevia City - Kết nối & tiện ích',
        },
      ],
    },
  };
}

export default function LocationPage() {
    return (<PageLayout>
            <ScrollReveal>
                <Map/>
            </ScrollReveal>
            <ScrollReveal>
                <TitleLifestyle title={locationHeroTitle}/>
            </ScrollReveal>
            <ScrollReveal>
                <div style={{ marginBottom: '1rem' }}>
                <TextBlock
                    content={locationIntro}/>
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div style={{ marginBottom: '1rem' }}>
                <TextBlock
                    content={locationDetail}/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <div style={{ marginBottom: '3rem' }}>
                <TextBlock
                    content={locationTech}/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <ImageHeaderStatic imageUrl={locationImage} fullImage={true}/>
            </ScrollReveal>
            {/*<ScrollReveal>*/}
            {/*  <TextBlock*/}
            {/*    content="Với hạ tầng đô thị đang phát triển mạnh mẽ tại Gia Lai, đặc biệt khu vực phía Đông – nơi tập trung loạt dự án nâng cấp và mở rộng đường, bến xe, sân bay – vị trí của Plevia không chỉ mang lại trải nghiệm sống tiện nghi mà còn mở ra <b>cơ hội đầu tư sinh lời bền vững</b> theo thời gian. Đây chính là yếu tố khiến Plevia trở nên thực sự khác biệt - một nơi sống lý tưởng để tận hưởng từng khoảnh khắc vừa là một cơ hội đầu tư đáng giá để sinh lời theo thời gian." />*/}
            {/*</ScrollReveal>*/}
            {/*  <ScrollReveal>*/}
            {/*      <TitleLifestyle title={"Liên kết vùng"}/>*/}
            {/*  </ScrollReveal>*/}
            {/*<ScrollReveal>*/}
            {/*  <ImageWithDoubleCaption*/}
            {/*      imageUrl="/assets/location/local_relation.svg" caption1={''} caption2={''}/>*/}
            {/*</ScrollReveal>*/}
            <ScrollReveal>
                <FormInfo/>
            </ScrollReveal>
        </PageLayout>);
} 