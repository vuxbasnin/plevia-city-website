import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Map from '@/components/sections/Map/Map';
import ScrollReveal from '@/components/shared/ScrollReveal';
import ImageHeaderStatic from "@/components/sections/ImageHeaderStatic";
import TextBlock from '@/components/ui/TextBlock';
import FormInfo from "@/components/sections/FormInfo/FormInfo";
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import React from "react";
import { locationHeroTitle, locationIntro, locationDetail, locationTech, locationImage } from '@/data/location';

// Static SEO data for Location page
const LOCATION_SEO_DATA = {
  title: 'Plevia City - Vị Trí Chiến Lược & Tiện Ích Kết Nối Tại Gia Lai',
  description: 'Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện. Tọa lạc tại giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14.',
  keywords: [
    'Plevia City vị trí',
    'khu đô thị Gia Lai',
    'vị trí đắc địa Pleiku',
    'đường Lý Nam Đế Gia Lai',
    'Quốc lộ 14 Gia Lai',
    'tiện ích xung quanh Plevia City',
    'kết nối giao thông Gia Lai',
    'đô thị trung tâm Pleiku',
    'vị trí chiến lược Tây Nguyên',
    'tiện ích đô thị Gia Lai',
    'giao thông thuận tiện',
    'đầu tư bất động sản Gia Lai'
  ],
  content: {
    heading: 'Vị Trí Chiến Lược & Tiện Ích Kết Nối Plevia City',
    intro: 'Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện.',
    features: [
      'Vị trí đắc địa cửa ngõ trung tâm Pleiku',
      'Giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14',
      'Liền kề các trục huyết mạch Lê Duẩn, Hùng Vương, Hàn Mặc Tử',
      'Tiện ích xung quanh chỉ 1-10 phút di chuyển',
      'Kết nối thuận tiện với bệnh viện, trường học, trung tâm thương mại',
      'Tiềm năng phát triển và đầu tư bền vững'
    ]
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: LOCATION_SEO_DATA.title,
    description: LOCATION_SEO_DATA.description,
    keywords: LOCATION_SEO_DATA.keywords,
    alternates: { canonical: '/location' },
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
      title: LOCATION_SEO_DATA.title,
      description: LOCATION_SEO_DATA.description,
      url: '/location',
      type: 'website',
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: '/assets/location/banner_location.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Vị trí chiến lược & tiện ích kết nối',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: LOCATION_SEO_DATA.title,
      description: LOCATION_SEO_DATA.description,
      images: [
        {
          url: '/assets/location/banner_location.png',
          alt: 'Plevia City - Vị trí chiến lược & tiện ích kết nối',
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

export default function LocationPage() {
    return (
        <>
            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: LOCATION_SEO_DATA.title,
                        description: LOCATION_SEO_DATA.description,
                        url: 'https://pleviacity.com/location',
                        mainEntity: {
                            '@type': 'Article',
                            headline: LOCATION_SEO_DATA.content.heading,
                            description: LOCATION_SEO_DATA.content.intro,
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
                                url: 'https://pleviacity.com/assets/location/banner_location.png',
                                alt: 'Plevia City - Vị trí chiến lược & tiện ích kết nối'
                            },
                            about: [
                                {
                                    '@type': 'Thing',
                                    name: 'Vị trí đắc địa Gia Lai'
                                },
                                {
                                    '@type': 'Thing',
                                    name: 'Giao thông thuận tiện'
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
                                    name: 'Vị trí & tiện ích',
                                    item: 'https://pleviacity.com/location'
                                }
                            ]
                        }
                    }),
                }}
            />

            {/* Main Content - Keep existing dynamic content */}
            <PageLayout>
                <ScrollReveal>
                    <Map/>
                </ScrollReveal>
                <ScrollReveal>
                    <TitleLifestyle title={locationHeroTitle}/>
                </ScrollReveal>
                <ScrollReveal>
                    <div style={{ marginBottom: '1rem' }}>
                    <TextBlock
                        content={locationIntro}/>
                    </div>
                </ScrollReveal>
                <ScrollReveal>
                    <div style={{ marginBottom: '1rem' }}>
                    <TextBlock
                        content={locationDetail}/>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div style={{ marginBottom: '3rem' }}>
                    <TextBlock
                        content={locationTech}/>
                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <ImageHeaderStatic imageUrl={locationImage} fullImage={true}/>
                </ScrollReveal>
                <ScrollReveal>
                    <FormInfo/>
                </ScrollReveal>
            </PageLayout>

            {/* Visible SEO Content for better Vercel compatibility */}
            <div className="seo-visible-content">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            {LOCATION_SEO_DATA.content.heading}
                        </h1>
                        <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                            {LOCATION_SEO_DATA.content.intro}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Vị Trí Đắc Địa Tại Trung Tâm Pleiku Gia Lai
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Plevia City được xây dựng tại vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, tỉnh Gia Lai. Vị trí này mang lại lợi thế vượt trội về giao thông, tiện ích và tiềm năng phát triển trong tương lai.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Giao Điểm Chiến Lược Giao Thông
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Dự án tọa lạc tại giao điểm chiến lược giữa đường Lý Nam Đế và Quốc lộ 14 - hai trục giao thông quan trọng nhất của khu vực Tây Nguyên. Vị trí này đảm bảo sự kết nối thuận tiện với mọi điểm đến.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Tiện Ích Xung Quanh Chỉ 1-10 Phút
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Từ Plevia City, bạn dễ dàng tiếp cận mọi nhu cầu sống chỉ trong vài phút di chuyển. Bệnh viện, trường học, trung tâm thương mại, khu du lịch và các tiện ích hiện hữu đều rất gần gũi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Data for SEO */}
        </>
    );
} 