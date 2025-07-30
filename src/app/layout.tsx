
import type { Metadata } from 'next';
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
    // In case of error, siteSettings remains null, fallbacks below will apply
  }

  // Use fetched faviconUrl if available and not an empty string
  const faviconUrlToUse = siteSettings?.faviconUrl ? siteSettings.faviconUrl : undefined;
  
  // Use fetched siteTitle or default
  const title = siteSettings?.siteTitle || defaultSiteSettingsData.siteTitle;
  // Use fetched siteDescription or default
  const description = siteSettings?.siteDescription || defaultSiteSettingsData.siteDescription;

  const metadataResult: Metadata = {
    title: title,
    description: description,
  };

  if (faviconUrlToUse) {
    metadataResult.icons = { icon: faviconUrlToUse };
  }
  // If faviconUrlToUse is undefined (because it was empty in settings or settings failed to load),
  // the icons property will not be set. The browser may then attempt to load /favicon.ico by convention.

  return metadataResult;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Favicon links are now handled by generateMetadata's icons property */}
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

    