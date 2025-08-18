/**
 * Utility functions for managing URLs and domains
 */

// Get the base URL from environment or fallback to default
export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://pleviacity.vn';
  };
  
  // Get the domain from base URL
  export const getDomain = (): string => {
    const baseUrl = getBaseUrl();
    try {
      return new URL(baseUrl).hostname;
    } catch {
      return 'pleviacity.vn';
    }
  };
  
  // Create absolute URL from relative path
  export const createAbsoluteUrl = (path: string): string => {
    const baseUrl = getBaseUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };
  
  // Create relative URL (always starts with /)
  export const createRelativeUrl = (path: string): string => {
    return path.startsWith('/') ? path : `/${path}`;
  };
  
  // Common URL paths
  export const URLS = {
    HOME: '/',
    LIFESTYLE: '/lifestyle',
    LOCATION: '/location',
    STORYLINE: '/storyline',
    MEMBER_BENEFITS: '/member-benefits',
    NEWS: '/news',
    FURNITURE_DEMO: '/furniture-demo',
    IOT: '/iot',
    ADMIN: '/admin',
  } as const;
  
  // Common asset paths
  export const ASSETS = {
    LOGO_SEO: '/logo_seo_home_page.png',
    LOGO_GREEN: '/Logo_green_3.png',
    PLEVIA_CITY: '/assets/home/plevia_city.jpg',
    BANNER_HOME: '/assets/home/banner_home.png',
    SOCIAL_MEDIA: '/social_media.png',
    MANIFEST: '/manifest.json',
    SITEMAP: '/sitemap.xml',
    SITEMAP_IMAGES: '/sitemap-images.xml',
  } as const;
  
  // Create absolute asset URLs
  export const getAssetUrl = (assetPath: string): string => {
    return createAbsoluteUrl(assetPath);
  };
  
  // Create relative asset URLs
  export const getRelativeAssetUrl = (assetPath: string): string => {
    return createRelativeUrl(assetPath);
  };