import type { Metadata } from 'next';

export function generatePageMetadata(pageTitle: string, customDescription?: string): Metadata {
  const baseTitle = "Plevia City";
  const fullTitle = `${baseTitle} - ${pageTitle}`;
  const description = customDescription || `Khám phá ${pageTitle.toLowerCase()} tại ${baseTitle} - Dự án bất động sản cao cấp tại Gia Lai`;
  
  // Keywords tối ưu cho SEO
  const keywords = [
    'Plevia City',
    'bất động sản Gia Lai',
    'dự án cao cấp Pleiku',
    'căn hộ Gia Lai',
    'biệt thự Pleiku',
    'shophouse Gia Lai',
    'đất nền Gia Lai',
    'đầu tư bất động sản',
    'real estate Gia Lai',
    'dự án đô thị',
    'khu đô thị cao cấp',
    'tiện ích đẳng cấp',
    'vị trí đắc địa'
  ];
  
  return {
    title: fullTitle,
    description: description,
    keywords: keywords,
    authors: [{ name: 'Plevia City' }],
    creator: 'Plevia City',
    publisher: 'Plevia City',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://pleviacity.vn'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: 'https://pleviacity.vn',
      siteName: 'Plevia City',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/Logo_green_3.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Dự án bất động sản cao cấp tại Gia Lai',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: ['/Logo_green_3.png'],
      creator: '@pleviacity',
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
    icons: {
      icon: '/Logo_green_3.png',
      shortcut: '/Logo_green_3.png',
      apple: '/Logo_green_3.png',
    },
  };
} 