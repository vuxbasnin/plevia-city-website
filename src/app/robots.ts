import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/test/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/test/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/assets/',
          '/public/',
          '/Logo_',
          '/background/',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://pleviacity.vn/sitemap.xml',
    host: 'https://pleviacity.vn',
  };
} 