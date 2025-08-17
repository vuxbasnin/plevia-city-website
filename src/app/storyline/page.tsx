import type { Metadata } from 'next';
import PageLayout from "@/components/layout/PageLayout";
import StorylineContent from '@/components/pages/StorylinePage/StorylineContent';

// Static data for SEO optimization
const STATIC_SEO_DATA = {
  title: 'Plevia City - Câu Chuyện Kiến Tạo Khu Đô Thị Thông Minh Gia Lai',
  description: 'Khám phá câu chuyện kiến tạo Plevia City, khu đô thị thông minh đầu tiên tại Gia Lai. Tìm hiểu về quá trình phát triển, tầm nhìn và giá trị của dự án đô thị hiện đại này.',
  keywords: [
    'Plevia City',
    'khu đô thị Gia Lai', 
    'đô thị thông minh',
    'câu chuyện kiến tạo',
    'đô thị hóa Gia Lai',
    'không gian sống hiện đại',
    'cộng đồng văn minh',
    'tiện ích đô thị',
    'dự án bất động sản Gia Lai',
    'khu đô thị cao cấp',
    'đô thị xanh thông minh',
    'Pleiku Gia Lai'
  ],
  content: {
    heading: 'Câu Chuyện Kiến Tạo Plevia City',
    body: 'Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết. Không chỉ là nơi để ở, người dân còn đang mong muốn tìm kiếm một không gian sống hội tụ cả công nghệ, tiện ích, thiên nhiên và cộng đồng.',
    image: '/assets/storyline/banner_storyline.png',
    imageAlt: 'Câu chuyện kiến tạo Plevia City - Khu đô thị thông minh Gia Lai'
  }
};

// Force static generation for better SEO
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: STATIC_SEO_DATA.title,
    description: STATIC_SEO_DATA.description,
    keywords: STATIC_SEO_DATA.keywords,
    alternates: { 
      canonical: '/storyline' 
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: STATIC_SEO_DATA.title,
      description: STATIC_SEO_DATA.description,
      url: '/storyline',
      type: 'website',
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: STATIC_SEO_DATA.content.image,
          width: 1200,
          height: 630,
          alt: STATIC_SEO_DATA.content.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: STATIC_SEO_DATA.title,
      description: STATIC_SEO_DATA.description,
      images: [
        {
          url: STATIC_SEO_DATA.content.image,
          alt: STATIC_SEO_DATA.content.imageAlt,
        },
      ],
    },
    authors: [{ name: 'Plevia City' }],
    creator: 'Plevia City',
    publisher: 'Plevia City',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://pleviacity.com'),
    other: {
      'google-site-verification': 'your-verification-code',
      'googlebot-news': 'nosnippet',
    },
  };
}

export default function StorylinePage() {
  return (
    <>
      {/* Static SEO Content for Googlebot */}
      <div className="seo-content" style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>{STATIC_SEO_DATA.content.heading}</h1>
        <p>{STATIC_SEO_DATA.content.body}</p>
        <img 
          src={STATIC_SEO_DATA.content.image} 
          alt={STATIC_SEO_DATA.content.imageAlt}
          style={{ display: 'none' }}
        />
        
        {/* Additional SEO content */}
        <section>
          <h2>Plevia City - Dự Án Đô Thị Thông Minh Tại Gia Lai</h2>
          <p>Plevia City là dự án khu đô thị thông minh đầu tiên tại Gia Lai, được thiết kế với tầm nhìn trở thành không gian sống hiện đại, văn minh và thông minh. Dự án mang đến giải pháp toàn diện cho nhu cầu nhà ở và phát triển cộng đồng tại khu vực Tây Nguyên.</p>
        </section>
        
        <section>
          <h2>Tầm Nhìn Phát Triển Plevia City</h2>
          <p>Với định hướng phát triển bền vững, Plevia City tích hợp công nghệ thông minh, tiện ích đô thị hiện đại và không gian xanh để tạo nên môi trường sống lý tưởng cho cư dân. Dự án không chỉ đáp ứng nhu cầu nhà ở mà còn thúc đẩy sự phát triển kinh tế - xã hội của tỉnh Gia Lai.</p>
        </section>
        
        <section>
          <h2>Vị Trí Chiến Lược Tại Gia Lai</h2>
          <p>Plevia City được xây dựng tại vị trí đắc địa của tỉnh Gia Lai, thuận tiện kết nối với các trung tâm kinh tế, văn hóa và giao thông chính. Vị trí này mang lại lợi thế về giao thông thuận tiện, tiện ích xung quanh và tiềm năng phát triển trong tương lai.</p>
        </section>
        
        <section>
          <h2>Tiện Ích Đô Thị Hiện Đại</h2>
          <p>Dự án Plevia City được thiết kế với hệ thống tiện ích đô thị hiện đại bao gồm: trung tâm thương mại, trường học, bệnh viện, công viên, khu vui chơi giải trí và các dịch vụ tiện ích khác. Tất cả được bố trí hợp lý để phục vụ nhu cầu sinh hoạt hàng ngày của cư dân.</p>
        </section>
        
        <section>
          <h2>Công Nghệ Thông Minh Tích Hợp</h2>
          <p>Plevia City áp dụng công nghệ thông minh trong quản lý và vận hành, bao gồm hệ thống an ninh thông minh, quản lý năng lượng hiệu quả, và các giải pháp công nghệ tiên tiến khác để mang đến trải nghiệm sống hiện đại và tiện nghi cho cư dân.</p>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: STATIC_SEO_DATA.title,
            description: STATIC_SEO_DATA.description,
            url: 'https://pleviacity.com/storyline',
            mainEntity: {
              '@type': 'Article',
              headline: STATIC_SEO_DATA.content.heading,
              description: STATIC_SEO_DATA.content.body,
              author: {
                '@type': 'Organization',
                name: 'Plevia City',
                url: 'https://pleviacity.com'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Plevia City',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://pleviacity.com/Logo_Standard_Final-1.svg'
                }
              },
              datePublished: '2024-01-01T00:00:00Z',
              dateModified: new Date().toISOString(),
              image: {
                '@type': 'ImageObject',
                url: `https://pleviacity.com${STATIC_SEO_DATA.content.image}`,
                alt: STATIC_SEO_DATA.content.imageAlt
              },
              about: [
                {
                  '@type': 'Thing',
                  name: 'Khu đô thị thông minh'
                },
                {
                  '@type': 'Thing', 
                  name: 'Plevia City Gia Lai'
                },
                {
                  '@type': 'Thing',
                  name: 'Đô thị hóa bền vững'
                }
              ]
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Trang chủ',
                  item: 'https://pleviacity.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Câu chuyện kiến tạo',
                  item: 'https://pleviacity.com/storyline'
                }
              ]
            }
          }),
        }}
      />

      {/* Main Content - Keep existing dynamic content */}
      <PageLayout>
        <StorylineContent />
      </PageLayout>
    </>
  );
}
