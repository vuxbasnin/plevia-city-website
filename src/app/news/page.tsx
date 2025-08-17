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
      {/* Visible SEO Content for better Vercel compatibility */}
      <div className="seo-visible-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {NEWS_SEO_DATA.content.heading}
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
              {NEWS_SEO_DATA.content.intro}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Tin Tức Mới Nhất Về Dự Án Plevia City Gia Lai
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Plevia City là dự án khu đô thị thông minh hàng đầu tại Tây Nguyên, được theo dõi và quan tâm bởi cộng đồng đầu tư và cư dân trong khu vực. Trang tin tức này cập nhật mọi thông tin quan trọng về dự án.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Nội Dung Tin Tức Chính
                </h2>
                <ul className="space-y-2">
                  {NEWS_SEO_DATA.content.features.map((feature, index) => (
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
                Tiến Độ Xây Dựng Và Tiện Ích Mới
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Theo dõi tiến độ xây dựng của Plevia City từ giai đoạn khởi công đến hoàn thành. Khám phá các tiện ích đô thị mới được bổ sung vào dự án, từ trung tâm thương mại, trường học, bệnh viện đến công viên và khu vui chơi giải trí.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
    </>
  );
}