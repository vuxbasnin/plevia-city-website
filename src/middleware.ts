import { NextRequest, NextResponse } from 'next/server';

// Pages with high CSR that need middleware intervention
const HIGH_CSR_PAGES = [
  '/iot',
  '/storyline',
  '/lifestyle'
];

// Pages with low CSR that can be SEO'd directly
const LOW_CSR_PAGES = [
  '/location',
  '/news'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detect Googlebot and other search engine crawlers
  const isSearchBot = /bot|googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora|slackbot|vkshare|w3c_validator/i.test(userAgent);
  const isGooglebot = /googlebot|google-bot|googlebot-image|googlebot-news|googlebot-video|adsbot-google|adsbot-google-mobile|apis-google|mediapartners-google/i.test(userAgent);
  
  // Check if this is a high CSR page that needs middleware intervention
  if (HIGH_CSR_PAGES.includes(pathname)) {
    if (isSearchBot || isGooglebot) {
      // For search bots on high CSR pages, force dynamic rendering
      const response = NextResponse.next();
      
      response.headers.set('X-Robots-Tag', 'index, follow');
      response.headers.set('X-Dynamic-Rendering', 'true');
      response.headers.set('X-Page-Type', 'high-csr');
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      
      if (isGooglebot) {
        response.headers.set('X-Googlebot-Detected', 'true');
        response.headers.set('X-Googlebot-Indexing', 'enabled');
      }
      
      return response;
    }
    
    // For regular users on high CSR pages, allow normal rendering
    const response = NextResponse.next();
    response.headers.set('X-Dynamic-Rendering', 'false');
    response.headers.set('X-Page-Type', 'high-csr');
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    
    return response;
  }
  
  // For low CSR pages, let them handle SEO directly
  if (LOW_CSR_PAGES.includes(pathname)) {
    const response = NextResponse.next();
    response.headers.set('X-Page-Type', 'low-csr');
    response.headers.set('X-SEO-Strategy', 'direct-html');
    
    return response;
  }
  
  // For other routes, continue normally
  return NextResponse.next();
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
