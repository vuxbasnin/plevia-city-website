
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import ClientOnly from '@/components/shared/ClientOnly';
import { getSiteSettingsData } from '@/lib/firestoreService'; 
import { defaultSiteSettingsData, type SiteSettingsData } from '@/types/landingPageAdmin'; 

// Function to generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  let siteSettings: SiteSettingsData | null = null;
  try {
    siteSettings = await getSiteSettingsData();
  } catch (error) {
    console.error("Error fetching site settings for metadata:", error);
  }

  const faviconUrlToUse = siteSettings?.faviconUrl ? siteSettings.faviconUrl : undefined;
  
  // Sử dụng title và description cố định để đảm bảo SEO
  const title = 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp | Khu Đô Thị Thông Minh Gia Lai';
  const description = 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.';

  const metadataResult: Metadata = {
    title: title,
    description: description,
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
      'đầu tư bất động sản Gia Lai'
    ],
    authors: [{ name: 'Plevia City' }],
    creator: 'Plevia City',
    publisher: 'Plevia City',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pleviacity.vn'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp',
      description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.',
      url: '/',
      siteName: 'Plevia City',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/logo_seo_home_page.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Logo chính thức',
          type: 'image/png',
        },
        {
          url: '/assets/home/plevia_city.jpg',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai',
          type: 'image/jpeg',
        },
      ],
      countryName: 'Vietnam',
      emails: ['info@pleviacity.vn'],
      phoneNumbers: ['+84 123 456 789'],
      faxNumbers: ['+84 123 456 790'],
      determiner: 'the',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Plevia City - Tổ Hợp Liền Kề & Shophouse Đẳng Cấp',
      description: 'Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.',
      images: [
        {
          url: '/logo_seo_home_page.png',
          alt: 'Plevia City - Logo chính thức',
          width: 1200,
          height: 630,
        },
        {
          url: '/assets/home/plevia_city.jpg',
          alt: 'Plevia City - Khu đô thị thông minh',
          width: 1200,
          height: 630,
        }
      ],
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
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/logo_seo_home_page.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo_seo_home_page.png', sizes: '16x16', type: 'image/png' },
        { url: '/logo_seo_home_page.png', sizes: '192x192', type: 'image/png' },
        { url: '/logo_seo_home_page.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/logo_seo_home_page.png',
      apple: [
        { url: '/logo_seo_home_page.png', sizes: '180x180', type: 'image/png' },
        { url: '/logo_seo_home_page.png', sizes: '152x152', type: 'image/png' },
        { url: '/logo_seo_home_page.png', sizes: '120x120', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/logo_seo_home_page.png', color: '#1A7A57' },
      ],
    },
  };

  // Không cho phép Firebase ghi đè icons
  // if (faviconUrlToUse) {
  //   metadataResult.icons = { icon: faviconUrlToUse };
  // }

  return metadataResult;
}

// Export viewport configuration separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Theme and Mobile Meta Tags */}
        <meta name="theme-color" content="#1A7A57" />
        <meta name="msapplication-TileColor" content="#1A7A57" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Plevia City" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="Plevia City" />
        <meta name="copyright" content="Plevia City" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Logo and Brand Meta Tags */}
        <meta name="image" content="/logo_seo_home_page.png" />
        <meta name="logo" content="/logo_seo_home_page.png" />
        <meta property="og:image:alt" content="Plevia City - Logo chính thức" />
        <meta property="twitter:image:alt" content="Plevia City - Logo chính thức" />
        
        {/* Additional Logo Meta Tags for Better Social Media Display */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://pleviacity.vn/logo_seo_home_page.png" />
        
        {/* Twitter Card Image Meta Tags */}
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:alt" content="Plevia City - Logo chính thức" />
        
        {/* Brand and Logo Schema.org Meta Tags */}
        <meta property="og:brand" content="Plevia City" />
        <meta property="og:brand:logo" content="https://pleviacity.vn/logo_seo_home_page.png" />
        
        {/* Facebook App ID */}
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
        
        {/* LinkedIn specific */}
        <meta property="linkedin:owner" content="pleviacity" />
        <meta property="linkedin:company" content="Plevia City" />
        
        {/* Preconnect and DNS Prefetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Logo Schema for Search Engines */}
        <link rel="alternate" type="application/json" href="/logo-schema.json" />
        
        {/* Additional Favicon and Logo Links for Better Cross-Platform Support */}
        <link rel="icon" type="image/png" sizes="16x16" href="/logo_seo_home_page.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo_seo_home_page.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/logo_seo_home_page.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo_seo_home_page.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo_seo_home_page.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo_seo_home_page.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo_seo_home_page.png" />
        
        {/* Windows Tiles */}
        <meta name="msapplication-TileImage" content="/logo_seo_home_page.png" />
        <meta name="msapplication-TileColor" content="#1A7A57" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Plevia City",
              "alternateName": "PleviaCity",
              "description": "Plevia City là khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.",
              "url": "/",
              "logo": "/logo_seo_home_page.png",
              "image": "/logo_seo_home_page.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Phường Hội Phú",
                "addressLocality": "Pleiku",
                "addressRegion": "Gia Lai",
                "addressCountry": "VN",
                "postalCode": "60000"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "13.9833",
                "longitude": "108.0000"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Vietnamese",
                "areaServed": "VN"
              },
              "areaServed": {
                "@type": "City",
                "name": "Pleiku"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Sản phẩm đô thị thông minh Plevia City",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Căn hộ thông minh Plevia City" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Biệt thự thông minh Plevia City" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Shophouse thông minh Plevia City" } }
                ]
              },
              "sameAs": [
                "https://facebook.com/pleviacity",
                "https://instagram.com/pleviacity",
                "https://youtube.com/@pleviacity"
              ],
              "keywords": "Plevia City, pleviacity, khu đô thị thông minh Gia Lai, dự án bất động sản Pleiku, căn hộ Gia Lai, biệt thự Pleiku, shophouse Gia Lai, đô thị thông minh, AI Gia Lai, bất động sản cao cấp"
            })
          }}
        />
      </head>
      <body className="antialiased">
        {/* <ClientOnly>
          <AuthProvider>
            <SiteSettingsProvider> */}
              {children}
            {/* </SiteSettingsProvider>
          </AuthProvider>
        </ClientOnly> */}
        <ClientOnly>
          <Toaster />
        </ClientOnly>
      </body>
    </html>
  );
}

    