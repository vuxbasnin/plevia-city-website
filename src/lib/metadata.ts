import type { Metadata } from 'next';

export const defaultIcons = {
  icon: [
    { url: '/favicon.ico', type: 'image/x-icon' },
    { url: '/logo_seo_home_page.png', sizes: '32x32', type: 'image/png' },
    { url: '/logo_seo_home_page.png', sizes: '16x16', type: 'image/png' },
    { url: '/logo_seo_home_page.png', sizes: '192x192', type: 'image/png' },
    { url: '/logo_seo_home_page.png', sizes: '512x512', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
  apple: [
    { url: '/logo_seo_home_page.png', sizes: '180x180', type: 'image/png' },
    { url: '/logo_seo_home_page.png', sizes: '152x152', type: 'image/png' },
    { url: '/logo_seo_home_page.png', sizes: '120x120', type: 'image/png' },
  ],
};

export const defaultKeywords = [
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
  'đầu tư bất động sản Gia Lai'
];

export const defaultRobots = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
};

export const defaultAuthors = [{ name: 'Plevia City' }];

export const defaultFormatDetection = {
  email: false,
  address: false,
  telephone: false,
};

export const defaultMetadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pleviacity.vn');

export const defaultOther = {
  'googlebot-news': 'nosnippet',
  'googlebot': 'index, follow',
  'bingbot': 'index, follow',
  'msapplication-TileColor': '#00a651',
  'theme-color': '#00a651',
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'default',
  'application-name': 'Plevia City',
  'msapplication-config': '/browserconfig.xml',
};

export function createBaseMetadata(metadata: Partial<Metadata>): Metadata {
  return {
    ...metadata,
    keywords: metadata.keywords || defaultKeywords,
    authors: metadata.authors || defaultAuthors,
    creator: metadata.creator || 'Plevia City',
    publisher: metadata.publisher || 'Plevia City',
    formatDetection: metadata.formatDetection || defaultFormatDetection,
    metadataBase: metadata.metadataBase || defaultMetadataBase,
    robots: metadata.robots || defaultRobots,
    icons: metadata.icons || defaultIcons,
    other: metadata.other || defaultOther,
  };
}

export function createPageMetadata(
  title: string,
  description: string,
  url: string,
  imageUrl?: string,
  additionalMetadata?: Partial<Metadata>
): Metadata {
  const baseMetadata = createBaseMetadata({
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'vi_VN',
      siteName: 'Plevia City',
      images: [
        {
          url: imageUrl || '/logo_seo_home_page.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl || '/logo_seo_home_page.png',
          alt: title,
        },
      ],
    },
    ...additionalMetadata,
  });

  return baseMetadata;
}