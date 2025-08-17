import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import IoTPage from "./IoT";

// Force dynamic rendering for high CSR page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Static SEO data for IoT page
const IOT_SEO_DATA = {
  title: 'Plevia City - Công Nghệ IoT & AI Vận Hành Khu Đô Thị Thông Minh Gia Lai',
  description: 'Khám phá công nghệ IoT và AI tiên tiến tại Plevia City Gia Lai. Hệ thống quản lý thông minh, tự động hóa toàn diện, và kết nối vạn vật cho khu đô thị hiện đại nhất Tây Nguyên.',
  keywords: [
    'Plevia City IoT',
    'khu đô thị thông minh Gia Lai',
    'công nghệ AI Gia Lai',
    'IoT đô thị thông minh',
    'hệ thống quản lý thông minh',
    'tự động hóa đô thị',
    'kết nối vạn vật Gia Lai',
    'công nghệ 4.0 Tây Nguyên',
    'đô thị số hóa',
    'smart city Gia Lai',
    'AI quản lý đô thị',
    'hạ tầng thông minh'
  ],
  content: {
    heading: 'Công Nghệ IoT & AI Vận Hành Plevia City',
    intro: 'Plevia City là khu đô thị thông minh đầu tiên tại Gia Lai tích hợp công nghệ IoT và AI tiên tiến để tạo nên không gian sống hiện đại, an toàn và tiện nghi.',
    features: [
      'Hệ thống quản lý thông minh toàn diện',
      'Tự động hóa các tiện ích đô thị',
      'Kết nối vạn vật (IoT) tích hợp',
      'AI phân tích và dự đoán',
      'Bảo mật và an ninh thông minh',
      'Tiết kiệm năng lượng tối ưu'
    ]
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: IOT_SEO_DATA.title,
    description: IOT_SEO_DATA.description,
    keywords: IOT_SEO_DATA.keywords,
    alternates: { canonical: "/iot" },
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
      title: IOT_SEO_DATA.title,
      description: IOT_SEO_DATA.description,
      url: "/iot",
      type: "website",
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          width: 1200,
          height: 630,
          alt: "Plevia City - Công nghệ IoT & AI vận hành",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: IOT_SEO_DATA.title,
      description: IOT_SEO_DATA.description,
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          alt: "Plevia City - Công nghệ IoT & AI vận hành",
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

export default function IoTPageComponent() {
  return (
    <>
      {/* Static SEO Content for Googlebot */}
      <div className="seo-content" style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>{IOT_SEO_DATA.content.heading}</h1>
        <p>{IOT_SEO_DATA.content.intro}</p>
        
        <section>
          <h2>Hệ Thống IoT & AI Tại Plevia City Gia Lai</h2>
          <p>Plevia City áp dụng công nghệ IoT và AI tiên tiến nhất để tạo nên khu đô thị thông minh hàng đầu tại Tây Nguyên. Hệ thống này không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái đô thị.</p>
        </section>
        
        <section>
          <h2>Tính Năng Công Nghệ Thông Minh</h2>
          <ul>
            {IOT_SEO_DATA.content.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
        
        <section>
          <h2>Lợi Ích Của Công Nghệ IoT & AI</h2>
          <p>Với việc tích hợp công nghệ IoT và AI, Plevia City mang đến cho cư dân trải nghiệm sống hiện đại, an toàn và tiện nghi. Hệ thống tự động hóa giúp tiết kiệm năng lượng, tăng cường an ninh và tối ưu hóa quản lý đô thị.</p>
        </section>
        
        <section>
          <h2>Vị Trí Chiến Lược Tại Gia Lai</h2>
          <p>Plevia City được xây dựng tại vị trí đắc địa của tỉnh Gia Lai, thuận tiện kết nối với các trung tâm kinh tế, văn hóa và giao thông chính. Công nghệ thông minh được tích hợp hoàn hảo với môi trường tự nhiên và văn hóa đặc trưng của Tây Nguyên.</p>
        </section>
        
        <section>
          <h2>Tương Lai Của Đô Thị Thông Minh</h2>
          <p>Plevia City không chỉ là dự án hiện tại mà còn là tầm nhìn về tương lai của đô thị thông minh tại Việt Nam. Với công nghệ IoT và AI, chúng tôi đang kiến tạo nên không gian sống của tương lai ngay tại Gia Lai.</p>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: IOT_SEO_DATA.title,
            description: IOT_SEO_DATA.description,
            url: 'https://pleviacity.com/iot',
            mainEntity: {
              '@type': 'Article',
              headline: IOT_SEO_DATA.content.heading,
              description: IOT_SEO_DATA.content.intro,
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
                url: 'https://pleviacity.com/assets/home/plevia_city.jpg',
                alt: 'Plevia City - Công nghệ IoT & AI vận hành'
              },
              about: [
                {
                  '@type': 'Thing',
                  name: 'Công nghệ IoT'
                },
                {
                  '@type': 'Thing',
                  name: 'AI vận hành đô thị'
                },
                {
                  '@type': 'Thing',
                  name: 'Khu đô thị thông minh'
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
                  name: 'Công nghệ IoT & AI',
                  item: 'https://pleviacity.com/iot'
                }
              ]
            }
          }),
        }}
      />

      {/* Main Content - Keep existing dynamic content */}
      <PageLayout>
        <IoTPage />
      </PageLayout>
    </>
  );
}
