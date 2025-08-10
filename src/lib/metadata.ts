import type { Metadata } from 'next';

export const siteMetadata = {
  title: 'Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai | pleviacity.vn',
  description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.',
  siteUrl: 'https://pleviacity.vn',
  siteName: 'Plevia City',
  locale: 'vi_VN',
  type: 'website' as const,
  keywords: [
    'Plevia City',
    'pleviacity',
    'khu đô thị thông minh Gia Lai',
    'dự án bất động sản Pleiku',
    'căn hộ Gia Lai',
    'biệt thự Pleiku',
    'shophouse Gia Lai',
    'đô thị thông minh',
    'AI Gia Lai',
    'bất động sản cao cấp',
    'pleviacity.vn',
    'dự án Plevia',
    'đầu tư bất động sản Gia Lai',
    'Pleiku real estate',
    'Gia Lai property',
    'smart city Vietnam'
  ],
  authors: [{ name: 'Plevia City' }],
  creator: 'Plevia City',
  publisher: 'Plevia City',
  images: {
    og: 'https://pleviacity.vn/social_media.png',
    logo: 'https://pleviacity.vn/Logo_green_3.png',
    favicon: 'https://pleviacity.vn/Logo_green_3.png'
  },
  contact: {
    email: 'info@pleviacity.vn',
    phone: '+84 123 456 789',
    address: {
      street: 'Phường Hội Phú',
      city: 'Pleiku',
      region: 'Gia Lai',
      country: 'VN',
      postalCode: '60000'
    },
    coordinates: {
      latitude: '13.9833',
      longitude: '108.0000'
    }
  },
  social: {
    facebook: 'https://facebook.com/pleviacity',
    instagram: 'https://instagram.com/pleviacity',
    youtube: 'https://youtube.com/@pleviacity'
  }
};

export const generateMetadata = (customTitle?: string, customDescription?: string): Metadata => {
  return {
    title: customTitle || siteMetadata.title,
    description: customDescription || siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: {
      canonical: siteMetadata.siteUrl,
    },
    openGraph: {
      title: customTitle || siteMetadata.title,
      description: customDescription || siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: siteMetadata.type,
      images: [
        {
          url: siteMetadata.images.og,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
          type: 'image/png',
        },
      ],
      countryName: 'Vietnam',
      emails: [siteMetadata.contact.email],
      phoneNumbers: [siteMetadata.contact.phone],
    },
    twitter: {
      card: 'summary_large_image',
      title: customTitle || siteMetadata.title,
      description: customDescription || siteMetadata.description,
      images: [siteMetadata.images.og],
      creator: '@pleviacity',
      site: '@pleviacity',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    icons: {
      icon: siteMetadata.images.favicon,
      shortcut: siteMetadata.images.favicon,
      apple: siteMetadata.images.favicon,
    },
  };
}; 