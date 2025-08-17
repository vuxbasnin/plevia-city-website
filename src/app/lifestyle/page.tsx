import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import LifestyleContent from './LifestyleContent';

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

      {/* Visible SEO Content for better Vercel compatibility */}
      <div className="seo-visible-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {LIFESTYLE_SEO_DATA.content.heading}
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
              {LIFESTYLE_SEO_DATA.content.intro}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Phong Cách Sống Hiện Đại Tại Plevia City Gia Lai
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Plevia City mang đến phong cách sống hiện đại và thông minh cho cư dân tại Gia Lai. Với thiết kế đô thị tiên tiến và công nghệ thông minh tích hợp, chúng tôi tạo nên không gian sống chuẩn mực của thời đại số.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Đặc Điểm Nổi Bật Của Phong Cách Sống
                </h2>
                <ul className="space-y-2">
                  {LIFESTYLE_SEO_DATA.content.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Tiện Ích Đô Thị Hoàn Hảo
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tại Plevia City, mọi tiện ích đô thị đều được thiết kế để phục vụ cuộc sống hiện đại. Từ trung tâm thương mại, trường học, bệnh viện đến công viên và khu vui chơi giải trí, tất cả đều được bố trí hợp lý và dễ tiếp cận.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
    </>
  );
} 