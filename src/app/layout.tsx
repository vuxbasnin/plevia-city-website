
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import ClientOnly from '@/components/shared/ClientOnly';
import { getSiteSettingsData } from '@/lib/firestoreService'; 
import { defaultSiteSettingsData, type SiteSettingsData } from '@/types/landingPageAdmin'; 
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata';

// Function to generate dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  let siteSettings: SiteSettingsData | null = null;
  try {
    siteSettings = await getSiteSettingsData();
  } catch (error) {
    console.error("Error fetching site settings for metadata:", error);
  }

  const faviconUrlToUse = siteSettings?.faviconUrl ? siteSettings.faviconUrl : undefined;
  
  // Sử dụng metadata từ file tập trung
  const metadataResult = generateSiteMetadata();
  
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
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="Plevia City" />
        <meta name="copyright" content="Plevia City" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Vietnamese" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Gia Lai, Vietnam" />
        <meta name="geo.position" content="13.9833;108.0000" />
        <meta name="ICBM" content="13.9833, 108.0000" />
        <link rel="canonical" href="https://pleviacity.vn" />
        
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
              "url": "https://pleviacity.vn",
              "logo": "https://pleviacity.vn/Logo_green_3.png",
              "image": "https://pleviacity.vn/social_media.png",
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

    