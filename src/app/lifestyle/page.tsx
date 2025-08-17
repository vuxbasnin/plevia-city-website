import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import LifestyleContent from './LifestyleContent';

// Force dynamic rendering for high CSR page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Static SEO data for Lifestyle page
const LIFESTYLE_SEO_DATA = {
  title: 'Plevia City - Phong Cách Sống Hiện Đại & Thông Minh Tại Khu Đô Thị Gia Lai',
  description: 'Khám phá phong cách sống hiện đại và thông minh tại Plevia City Gia Lai. Nơi công nghệ trở thành nền tảng kiến tạo không gian sống chuẩn mực thời đại số với tiện ích đô thị hoàn hảo.',
  keywords: [
    'Plevia City lifestyle',
    'phong cách sống hiện đại Gia Lai',
    'khu đô thị thông minh Gia Lai',
    'tiện ích đô thị Gia Lai',
    'không gian sống hiện đại',
    'đô thị văn minh Tây Nguyên',
    'cộng đồng thông minh',
    'tiện ích sống cao cấp',
    'đô thị xanh thông minh',
    'lifestyle Gia Lai',
    'không gian sống chuẩn mực',
    'đô thị thời đại số'
  ],
  content: {
    heading: 'Phong Cách Sống Hiện Đại & Thông Minh Tại Plevia City',
    intro: 'Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số.',
    features: [
      'Không gian sống hiện đại và tiện nghi',
      'Tiện ích đô thị hoàn hảo',
      'Cộng đồng văn minh và thân thiện',
      'Công nghệ thông minh tích hợp',
      'Môi trường xanh và bền vững',
      'Văn hóa sống cao cấp'
    ]
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: LIFESTYLE_SEO_DATA.title,
    description: LIFESTYLE_SEO_DATA.description,
    keywords: LIFESTYLE_SEO_DATA.keywords,
    alternates: { canonical: '/lifestyle' },
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
      title: LIFESTYLE_SEO_DATA.title,
      description: LIFESTYLE_SEO_DATA.description,
      url: '/lifestyle',
      type: 'website',
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: '/assets/lifestyle/banner_lifestyle.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Phong cách sống hiện đại & thông minh',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: LIFESTYLE_SEO_DATA.title,
      description: LIFESTYLE_SEO_DATA.description,
      images: [
        {
          url: '/assets/lifestyle/banner_lifestyle.png',
          alt: 'Plevia City - Phong cách sống hiện đại & thông minh',
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

export default function LifeStylePage() {
  return (
    <>
      {/* Static SEO Content for Googlebot */}
      <div className="seo-content" style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>{LIFESTYLE_SEO_DATA.content.heading}</h1>
        <p>{LIFESTYLE_SEO_DATA.content.intro}</p>
        
        <section>
          <h2>Phong Cách Sống Hiện Đại Tại Plevia City Gia Lai</h2>
          <p>Plevia City mang đến phong cách sống hiện đại và thông minh cho cư dân tại Gia Lai. Với thiết kế đô thị tiên tiến và công nghệ thông minh tích hợp, chúng tôi tạo nên không gian sống chuẩn mực của thời đại số.</p>
        </section>
        
        <section>
          <h2>Đặc Điểm Nổi Bật Của Phong Cách Sống</h2>
          <ul>
            {LIFESTYLE_SEO_DATA.content.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
        
        <section>
          <h2>Tiện Ích Đô Thị Hoàn Hảo</h2>
          <p>Tại Plevia City, mọi tiện ích đô thị đều được thiết kế để phục vụ cuộc sống hiện đại. Từ trung tâm thương mại, trường học, bệnh viện đến công viên và khu vui chơi giải trí, tất cả đều được bố trí hợp lý và dễ tiếp cận.</p>
        </section>
        
        <section>
          <h2>Cộng Đồng Văn Minh Và Thân Thiện</h2>
          <p>Plevia City không chỉ là nơi để ở mà còn là cộng đồng văn minh, thân thiện nơi mọi người có thể kết nối, chia sẻ và phát triển cùng nhau. Văn hóa sống cao cấp được thể hiện qua từng chi tiết thiết kế và quản lý.</p>
        </section>
        
        <section>
          <h2>Công Nghệ Thông Minh Tích Hợp</h2>
          <p>Với việc tích hợp công nghệ thông minh vào mọi khía cạnh của cuộc sống, Plevia City mang đến trải nghiệm sống tiện nghi và hiện đại. Từ hệ thống an ninh thông minh đến quản lý năng lượng hiệu quả, mọi thứ đều được tối ưu hóa.</p>
        </section>
        
        <section>
          <h2>Môi Trường Xanh Và Bền Vững</h2>
          <p>Plevia City được thiết kế với tầm nhìn bền vững, tích hợp không gian xanh và các giải pháp thân thiện môi trường. Không gian sống không chỉ hiện đại mà còn gần gũi với thiên nhiên, tạo nên môi trường sống lý tưởng cho cư dân.</p>
        </section>
        
        <section>
          <h2>Vị Trí Chiến Lược Tại Gia Lai</h2>
          <p>Được xây dựng tại vị trí đắc địa của tỉnh Gia Lai, Plevia City mang đến sự thuận tiện tối đa cho cuộc sống hiện đại. Vị trí này không chỉ mang lại tiện ích xung quanh mà còn mở ra cơ hội phát triển và đầu tư trong tương lai.</p>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: LIFESTYLE_SEO_DATA.title,
            description: LIFESTYLE_SEO_DATA.description,
            url: 'https://pleviacity.com/lifestyle',
            mainEntity: {
              '@type': 'Article',
              headline: LIFESTYLE_SEO_DATA.content.heading,
              description: LIFESTYLE_SEO_DATA.content.intro,
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
                url: 'https://pleviacity.com/assets/lifestyle/banner_lifestyle.png',
                alt: 'Plevia City - Phong cách sống hiện đại & thông minh'
              },
              about: [
                {
                  '@type': 'Thing',
                  name: 'Phong cách sống hiện đại'
                },
                {
                  '@type': 'Thing',
                  name: 'Đô thị thông minh'
                },
                {
                  '@type': 'Thing',
                  name: 'Tiện ích đô thị'
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
                  name: 'Phong cách sống',
                  item: 'https://pleviacity.com/lifestyle'
                }
              ]
            }
          }),
        }}
      />

      {/* Main Content - Keep existing dynamic content */}
      <PageLayout>
        <LifestyleContent />
      </PageLayout>
    </>
  );
} 