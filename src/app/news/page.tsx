import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ListNews from '@/components/sections/ListNews/ListNews';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { getPublishedNewsArticles } from '@/lib/firestoreService';
import { defaultNewsHeaderImage, defaultNewsDescription } from '@/data/news';
import FormInfo from '@/components/sections/FormInfo/FormInfo';

// Static SEO data for News page
const NEWS_SEO_DATA = {
  title: 'Plevia City - Tin Tức & Cập Nhật Dự Án Khu Đô Thị Thông Minh Gia Lai',
  description: 'Cập nhật tin tức mới nhất về dự án Plevia City Gia Lai. Khám phá tiến độ xây dựng, tiện ích mới, và các sự kiện quan trọng của khu đô thị thông minh hàng đầu Tây Nguyên.',
  keywords: [
    'Plevia City tin tức',
    'tin tức dự án Gia Lai',
    'khu đô thị thông minh Gia Lai',
    'tiến độ xây dựng Plevia City',
    'tin tức bất động sản Gia Lai',
    'dự án đô thị Tây Nguyên',
    'tin tức Pleiku',
    'đô thị thông minh Việt Nam',
    'tin tức đầu tư Gia Lai',
    'khu đô thị Plevia City',
    'tin tức xây dựng',
    'tiện ích đô thị mới'
  ],
  content: {
    heading: 'Tin Tức & Cập Nhật Dự Án Plevia City',
    intro: 'Cập nhật tin tức mới nhất về dự án Plevia City Gia Lai - khu đô thị thông minh hàng đầu tại Tây Nguyên.',
    features: [
      'Tin tức tiến độ xây dựng dự án',
      'Cập nhật tiện ích đô thị mới',
      'Sự kiện và hoạt động quan trọng',
      'Thông tin đầu tư và phát triển',
      'Tin tức về cộng đồng cư dân',
      'Cập nhật công nghệ thông minh'
    ]
  }
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const articles = await getPublishedNewsArticles();
    const latest = articles[0];
    const title = NEWS_SEO_DATA.title;
    const description = latest?.summary || NEWS_SEO_DATA.description;
    return {
      title,
      description,
      keywords: NEWS_SEO_DATA.keywords,
      alternates: { canonical: '/news' },
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
        title,
        description,
        url: '/news',
        type: 'website',
        locale: 'vi_VN',
        siteName: 'Plevia City',
        images: [
          {
            url: latest?.coverImageUrl || defaultNewsHeaderImage,
            width: 1200,
            height: 630,
            alt: latest?.title || 'Plevia City - Tin tức & cập nhật dự án',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [
          {
            url: latest?.coverImageUrl || defaultNewsHeaderImage,
            alt: latest?.title || 'Plevia City - Tin tức & cập nhật dự án',
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
  } catch {
    return {
      title: NEWS_SEO_DATA.title,
      description: NEWS_SEO_DATA.description,
      keywords: NEWS_SEO_DATA.keywords,
      alternates: { canonical: '/news' },
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
    };
  }
}

export default async function NewsPage() {
  let newsItems: any[] = [];
  try {
    const articles = await getPublishedNewsArticles();
    newsItems = articles.map(article => ({
      id: article.id,
      imageUrl: article.coverImageUrl || '/assets/home/plevia_city.jpg',
      imageAlt: article.title,
      title: article.title,
      description: article.summary || 'Không có mô tả',
      slug: (article as any).slug,
    }));
  } catch {
    newsItems = [];
  }

  return (
    <>
      {/* Static SEO Content for Googlebot */}
      <div className="seo-content" style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>{NEWS_SEO_DATA.content.heading}</h1>
        <p>{NEWS_SEO_DATA.content.intro}</p>
        
        <section>
          <h2>Tin Tức Mới Nhất Về Dự Án Plevia City Gia Lai</h2>
          <p>Plevia City là dự án khu đô thị thông minh hàng đầu tại Tây Nguyên, được theo dõi và quan tâm bởi cộng đồng đầu tư và cư dân trong khu vực. Trang tin tức này cập nhật mọi thông tin quan trọng về dự án.</p>
        </section>
        
        <section>
          <h2>Nội Dung Tin Tức Chính</h2>
          <ul>
            {NEWS_SEO_DATA.content.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
        
        <section>
          <h2>Tiến Độ Xây Dựng Dự Án</h2>
          <p>Theo dõi tiến độ xây dựng của Plevia City từ giai đoạn khởi công đến hoàn thành. Cập nhật thường xuyên về các hạng mục công trình, tiện ích đô thị và kế hoạch phát triển trong tương lai.</p>
        </section>
        
        <section>
          <h2>Tiện Ích Đô Thị Mới</h2>
          <p>Khám phá các tiện ích đô thị mới được bổ sung vào dự án Plevia City. Từ trung tâm thương mại, trường học, bệnh viện đến công viên và khu vui chơi giải trí, mọi thông tin đều được cập nhật chi tiết.</p>
        </section>
        
        <section>
          <h2>Sự Kiện Và Hoạt Động Quan Trọng</h2>
          <p>Tham gia các sự kiện và hoạt động quan trọng của Plevia City. Từ lễ khởi công, lễ khánh thành đến các sự kiện cộng đồng, tất cả đều được thông báo và mời gọi sự tham gia của cư dân.</p>
        </section>
        
        <section>
          <h2>Thông Tin Đầu Tư Và Phát Triển</h2>
          <p>Cập nhật thông tin về cơ hội đầu tư và tiềm năng phát triển của dự án Plevia City. Với vị trí chiến lược tại Gia Lai, dự án mang lại nhiều cơ hội đầu tư sinh lời bền vững.</p>
        </section>
        
        <section>
          <h2>Cộng Đồng Cư Dân Plevia City</h2>
          <p>Xây dựng cộng đồng cư dân văn minh và thân thiện tại Plevia City. Tin tức về các hoạt động cộng đồng, sự kiện văn hóa và các hoạt động kết nối giữa cư dân.</p>
        </section>
        
        <section>
          <h2>Công Nghệ Thông Minh Tích Hợp</h2>
          <p>Cập nhật về các công nghệ thông minh mới được tích hợp vào dự án Plevia City. Từ hệ thống IoT, AI quản lý đến các giải pháp công nghệ tiên tiến khác.</p>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: NEWS_SEO_DATA.title,
            description: NEWS_SEO_DATA.description,
            url: 'https://pleviacity.com/news',
            mainEntity: {
              '@type': 'Article',
              headline: NEWS_SEO_DATA.content.heading,
              description: NEWS_SEO_DATA.content.intro,
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
                alt: 'Plevia City - Tin tức & cập nhật dự án'
              },
              about: [
                {
                  '@type': 'Thing',
                  name: 'Tin tức dự án Gia Lai'
                },
                {
                  '@type': 'Thing',
                  name: 'Khu đô thị thông minh'
                },
                {
                  '@type': 'Thing',
                  name: 'Bất động sản Tây Nguyên'
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
                  name: 'Tin tức',
                  item: 'https://pleviacity.com/news'
                }
              ]
            }
          }),
        }}
      />

      {/* Main Content - Keep existing dynamic content */}
      <PageLayout>
        <ScrollReveal>
          <ImageHeader/>
        </ScrollReveal>
        <ScrollReveal>
          <ListNews newsItems={newsItems} />
        </ScrollReveal>
        <ScrollReveal>
          <FormInfo />
        </ScrollReveal>
      </PageLayout>
    </>
  );
}