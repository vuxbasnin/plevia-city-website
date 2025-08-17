import type { Metadata } from 'next';
import PageLayout from "@/components/layout/PageLayout";
import StorylineContent from '@/components/pages/StorylinePage/StorylineContent';

// Force dynamic rendering for high CSR page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Static SEO data for Storyline page
const STORYLINE_SEO_DATA = {
  title: 'Plevia City - Câu Chuyện Kiến Tạo Khu Đô Thị Thông Minh Gia Lai',
  description: 'Khám phá câu chuyện kiến tạo Plevia City, khu đô thị thông minh đầu tiên tại Gia Lai. Tìm hiểu về quá trình phát triển, tầm nhìn và giá trị của dự án đô thị hiện đại này.',
  keywords: [
    'Plevia City câu chuyện kiến tạo',
    'khu đô thị thông minh Gia Lai',
    'câu chuyện kiến tạo đô thị',
    'đô thị hóa Gia Lai',
    'không gian sống hiện đại',
    'cộng đồng văn minh',
    'tiện ích đô thị',
    'dự án bất động sản Gia Lai',
    'khu đô thị cao cấp',
    'đô thị xanh thông minh',
    'Pleiku Gia Lai',
    'tầm nhìn đô thị tương lai'
  ],
  content: {
    heading: 'Câu Chuyện Kiến Tạo Plevia City',
    intro: 'Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết.',
    features: [
      'Tầm nhìn đô thị thông minh',
      'Quá trình phát triển bền vững',
      'Công nghệ tích hợp hiện đại',
      'Cộng đồng văn minh và thân thiện',
      'Môi trường sống xanh và bền vững',
      'Tiềm năng phát triển tương lai'
    ]
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: STORYLINE_SEO_DATA.title,
    description: STORYLINE_SEO_DATA.description,
    keywords: STORYLINE_SEO_DATA.keywords,
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
      title: STORYLINE_SEO_DATA.title,
      description: STORYLINE_SEO_DATA.description,
      url: '/storyline',
      type: 'website',
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: '/assets/storyline/banner_storyline.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Câu chuyện kiến tạo khu đô thị thông minh',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: STORYLINE_SEO_DATA.title,
      description: STORYLINE_SEO_DATA.description,
      images: [
        {
          url: '/assets/storyline/banner_storyline.png',
          alt: 'Plevia City - Câu chuyện kiến tạo khu đô thị thông minh',
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
        <h1>{STORYLINE_SEO_DATA.content.heading}</h1>
        <p>{STORYLINE_SEO_DATA.content.intro}</p>
        
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
        
        <section>
          <h2>Cộng Đồng Văn Minh Và Thân Thiện</h2>
          <p>Plevia City không chỉ là nơi để ở mà còn là cộng đồng văn minh, thân thiện nơi mọi người có thể kết nối, chia sẻ và phát triển cùng nhau. Văn hóa sống cao cấp được thể hiện qua từng chi tiết thiết kế và quản lý.</p>
        </section>
        
        <section>
          <h2>Môi Trường Xanh Và Bền Vững</h2>
          <p>Với tầm nhìn bền vững, Plevia City tích hợp không gian xanh và các giải pháp thân thiện môi trường. Không gian sống không chỉ hiện đại mà còn gần gũi với thiên nhiên, tạo nên môi trường sống lý tưởng cho cư dân.</p>
        </section>
        
        <section>
          <h2>Tương Lai Của Đô Thị Thông Minh</h2>
          <p>Plevia City không chỉ là dự án hiện tại mà còn là tầm nhìn về tương lai của đô thị thông minh tại Việt Nam. Với công nghệ thông minh và thiết kế đô thị tiên tiến, chúng tôi đang kiến tạo nên không gian sống của tương lai ngay tại Gia Lai.</p>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: STORYLINE_SEO_DATA.title,
            description: STORYLINE_SEO_DATA.description,
            url: 'https://pleviacity.com/storyline',
            mainEntity: {
              '@type': 'Article',
              headline: STORYLINE_SEO_DATA.content.heading,
              description: STORYLINE_SEO_DATA.content.intro,
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
                url: 'https://pleviacity.com/assets/storyline/banner_storyline.png',
                alt: 'Plevia City - Câu chuyện kiến tạo khu đô thị thông minh'
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
