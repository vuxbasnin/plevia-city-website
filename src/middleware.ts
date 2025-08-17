import { NextRequest, NextResponse } from 'next/server';

// Pages that need special handling
const SPECIAL_PAGES = [
  '/iot',
  '/storyline',
  '/lifestyle',
  '/location',
  '/news'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Only process special pages
  if (!SPECIAL_PAGES.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Detect search engine crawlers
  const isSearchBot = /bot|googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora|slackbot|vkshare|w3c_validator/i.test(userAgent);
  const isGooglebot = /googlebot|google-bot|googlebot-image|googlebot-news|googlebot-video|adsbot-google|adsbot-google-mobile|apis-google|mediapartners-google/i.test(userAgent);
  
  const response = NextResponse.next();
  
  // Set SEO-friendly headers for all special pages
  response.headers.set('X-Page-Type', 'seo-optimized');
  response.headers.set('X-SEO-Strategy', 'visible-content');
  
  if (isSearchBot) {
    // For search bots, ensure proper indexing
    response.headers.set('X-Robots-Tag', 'index, follow');
    response.headers.set('X-Search-Bot-Detected', 'true');
    
    if (isGooglebot) {
      response.headers.set('X-Googlebot-Detected', 'true');
      response.headers.set('X-Googlebot-Indexing', 'enabled');
    }
  }
  
  // Allow caching for better performance
  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
