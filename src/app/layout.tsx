
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
  const title = siteSettings?.siteTitle || defaultSiteSettingsData.siteTitle;
  const description = siteSettings?.siteDescription || defaultSiteSettingsData.siteDescription;

  const metadataResult: Metadata = {
    title: title, // Cho Google Search
    description: description, // Cho Google Search
    keywords: ['Plevia City', 'khu đô thị thông minh', 'Gia Lai', 'trí tuệ nhân tạo', 'công nghệ 4.0', 'đô thị hiện đại', 'môi trường sống xanh', 'smart city', 'AI', 'IoT'],
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
      title: 'Plevia City', // Cho Social Media
      description: 'Nơi thể hiện đẳng cấp', // Cho Social Media
      url: 'https://pleviacity.vn',
      siteName: 'Plevia City',
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/social_media.png',
          width: 1200,
          height: 630,
          alt: 'Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai',
          type: 'image/png',
        },
      ],
      countryName: 'Vietnam',
      emails: ['info@pleviacity.vn'],
      phoneNumbers: ['+84 123 456 789'],
      faxNumbers: ['+84 123 456 790'],
      // Additional OG properties for better social media display
      determiner: 'the',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Plevia City', // Cho Social Media
      description: 'Nơi thể hiện đẳng cấp', // Cho Social Media
      images: ['/social_media.png'],
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
    manifest: '/manifest.json',
  };

  if (faviconUrlToUse) {
    metadataResult.icons = { icon: faviconUrlToUse };
  }

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
        <meta name="theme-color" content="#1A7A57" />
        <meta name="msapplication-TileColor" content="#1A7A57" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Plevia City" />
        
        {/* Additional Social Media Meta Tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai" />
        
        {/* Facebook specific */}
        <meta property="fb:app_id" content="" />
        <meta property="fb:pages" content="" />
        
        {/* LinkedIn specific */}
        <meta property="linkedin:owner" content="pleviacity" />
        <meta property="linkedin:company" content="Plevia City" />
        
        {/* WhatsApp specific */}
        <meta property="og:image:secure_url" content="/social_media.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/Logo_green_3.png" />
        <link rel="apple-touch-icon" href="/Logo_green_3.png" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Plevia City",
              "description": "Khu đô thị thông minh đầu tiên có ứng dụng Trí tuệ nhân tạo tại Gia Lai",
              "url": "https://pleviacity.vn",
              "logo": "https://pleviacity.vn/Logo_green_3.png",
              "image": "https://pleviacity.vn/Logo_green_3.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pleiku",
                "addressRegion": "Gia Lai",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "13.9833",
                "longitude": "108.0000"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Vietnamese"
              },
              "areaServed": {
                "@type": "City",
                "name": "Pleiku"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Sản phẩm đô thị thông minh",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Căn hộ thông minh" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Biệt thự thông minh" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Shophouse thông minh" } }
                ]
              },
              "sameAs": [
                "https://facebook.com/pleviacity",
                "https://instagram.com/pleviacity"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ClientOnly>
          <AuthProvider>
            <SiteSettingsProvider>
              {children}
              <Toaster />
            </SiteSettingsProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}

    