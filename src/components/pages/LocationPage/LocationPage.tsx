import ClientImageBannerLocation from "@/components/shared/ClientImageBannerLocation";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ImageHeaderStatic from "@/components/sections/ImageHeaderStatic";
import TextBlock from "@/components/ui/TextBlock";
import FormInfo from "@/components/sections/FormInfo/FormInfo";
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import { locationHeroTitle, locationIntro, locationDetail, locationTech, locationImage } from '@/data/location';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Content - Always rendered on server for search engines */}
      <div className="sr-only">
        <h1>Plevia City - Vị Trí Đắc Địa & Kết Nối Tiện Ích Gia Lai</h1>
        <p>Khám phá vị trí chiến lược của Plevia City tại Gia Lai. Tọa lạc tại cửa ngõ trung tâm Pleiku, kết nối thuận tiện với các tiện ích quan trọng như bệnh viện, trường học, trung tâm thương mại và các điểm du lịch nổi tiếng.</p>
      </div>

      {/* SEO Fallback Content - Visible content for crawlers */}
      <noscript>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Plevia City - Vị Trí Đắc Địa & Kết Nối Tiện Ích Gia Lai
          </h1>
          <p className="text-lg mb-12 text-center max-w-4xl mx-auto text-gray-600">
            Khám phá vị trí chiến lược của Plevia City tại Gia Lai. Tọa lạc tại cửa ngõ trung tâm Pleiku, 
            kết nối thuận tiện với các tiện ích quan trọng như bệnh viện, trường học, trung tâm thương mại và các điểm du lịch nổi tiếng.
          </p>
        </div>
      </noscript>
      
      {/* Interactive Components */}
      <ScrollReveal>
        <ClientImageBannerLocation />
      </ScrollReveal>
      <ScrollReveal>
        <TitleLifestyle title={locationHeroTitle}/>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ marginBottom: '1rem' }}>
          <TextBlock content={locationIntro}/>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ marginBottom: '1rem' }}>
          <TextBlock content={locationDetail}/>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <div style={{ marginBottom: '3rem' }}>
          <TextBlock content={locationTech}/>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl={locationImage} fullImage={true}/>
      </ScrollReveal>
      <ScrollReveal>
        <FormInfo/>
      </ScrollReveal>
    </div>
  );
}
