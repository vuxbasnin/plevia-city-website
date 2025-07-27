"use client";

import PageLayout from '@/components/layout/PageLayout';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import LibImage from '@/components/sections/LibImage/LibImage';
import Map from '@/components/sections/Map/Map';
import MapExtension, { MapExtensionMainTitle } from '@/components/sections/MapExtension/MapExtension';
import SeatingOptionsSection from '@/components/sections/SeatingOptionsSection';
import ScrollReveal from '@/components/shared/ScrollReveal';
import ImageHeaderStatic from "@/components/sections/ImageHeaderStatic";
import TextBlock from '@/components/ui/TextBlock';
import ImageWithDoubleCaption from "@/components/ui/ImageWithDoubleCaption";

export default function LocationPage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <Map />
      </ScrollReveal>
      <ScrollReveal>
        <MapExtensionMainTitle />
      </ScrollReveal>
      <ScrollReveal>
        <TextBlock
          content="Tọa lạc tại <b>63-65 Lý Nam Đế, Phường Hội Phú, Gia Lai</b>, Plevia City nắm giữ vị trí đắt giá hiếm có khi được đặt tại điểm giao thoa giữa khu trung tâm hành chính – nơi hội tụ các hoạt động chính trị, kinh tế – và các cụm tiện ích lớn. Trong tương lai gần, khi mà cao tốc Pleiku – Quy Nhơn đang được đẩy mạnh đầu tư và kế hoạch mở rộng khai thác thêm các tuyến bay quốc tế tại sân bay Pleiku sẽ là những bước chuyển lớn, đưa khu vực này trở thành một trung tâm giao thương mới của Tây Nguyên." />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="/assets/location/map.png" fullImage={true} />
      </ScrollReveal>
      <ScrollReveal>
        <TextBlock
          content="Với hạ tầng đô thị đang phát triển mạnh mẽ tại Gia Lai, đặc biệt khu vực phía Đông – nơi tập trung loạt dự án nâng cấp và mở rộng đường, bến xe, sân bay – vị trí của Plevia không chỉ mang lại trải nghiệm sống tiện nghi mà còn mở ra <b>cơ hội đầu tư sinh lời bền vững</b> theo thời gian.Đây chính là yếu tố khiến Plevia trở nên thực sự khác biệt - một nơi sống lý tưởng để tận hưởng từng khoảnh khắc vừa là một cơ hội đầu tư đáng giá để sinh lời theo thời gian." />
      </ScrollReveal>
      <ScrollReveal>
        <ImageWithDoubleCaption
          imageUrl="/assets/location/local_relation.png"
          caption1="Từ điểm kết nối – Đến trung tâm giá trị sống & đầu tư"
          caption2="Hưởng lợi từ làn sóng hạ tầng bứt phá mạnh mẽ" />
      </ScrollReveal>
    </PageLayout>
  );
} 