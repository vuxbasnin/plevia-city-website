import type { Metadata } from 'next';
import PageLayout from "@/components/layout/PageLayout";
import ImageHeader from "@/components/sections/ImageHeader";
import ScrollReveal from "@/components/shared/ScrollReveal";
import "./page.css"
import SectionOneStoryLine from "@/components/sections/SectionOneHome/SectionOneStoryLine";
import SectionTwoStoryLine from "@/components/sections/SectionOneHome/SectionTwoStoryLine";
import SectionThreeStoryLine from "@/components/sections/SectionOneHome/SectionThreeStoryLine";
import SectionFourStoryLine from "@/components/sections/SectionOneHome/SectionFourStoryLine";
import SectionFiveStoryLine from "@/components/sections/SectionOneHome/SectionFiveStoryLine";
import FormInfo from "@/components/sections/FormInfo/FormInfo";
import { storylineBanner } from '@/data/storyline';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Plevia City - Câu chuyện kiến tạo';
  const description = 'Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết. Không chỉ là nơi để ở, người dân còn đang mong muốn tìm kiếm một không gian sống hội tụ cả công nghệ, tiện ích, thiên nhiên và cộng đồng.';
  return {
    title,
    description,
    alternates: { canonical: '/storyline' },
    openGraph: {
      title,
      description,
      url: '/storyline',
      type: 'website',
      images: [
        {
          url: '/assets/storyline/banner_storyline.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Câu chuyện kiến tạo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/assets/storyline/banner_storyline.png',
          alt: 'Plevia City - Câu chuyện kiến tạo',
        },
      ],
    },
  };
}

export default function ProjectPage() {
  return (
    <PageLayout>
      <div className="fullWidth">
        <ScrollReveal>
          <ImageHeader imageUrl={storylineBanner}/>
        </ScrollReveal>
      </div>

      <div className={"wrapper"}>
        <div className={"content"}>
          <ScrollReveal>
            <SectionOneStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionTwoStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionThreeStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionFourStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <SectionFiveStoryLine />
          </ScrollReveal>
          <ScrollReveal>
            <FormInfo />
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
