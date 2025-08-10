import { MetadataRoute } from 'next';

export default async function sitemapNews(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pleviacity.vn';
  const currentDate = new Date();
  
  // Sitemap cho tin tức
  const newsPages = [
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Thêm các bài viết tin tức cụ thể nếu có
    {
      url: `${baseUrl}/news/plevia-city-khu-do-thi-thong-minh`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/du-an-bat-dong-san-gia-lai`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  return newsPages;
} 