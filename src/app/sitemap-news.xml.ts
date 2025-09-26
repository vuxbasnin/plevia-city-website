import { MetadataRoute } from 'next';
import { getNewsArticles } from '@/lib/firestoreService';

export default async function sitemapNews(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pleviacity.vn';
  const currentDate = new Date();
  
  try {
    // Get all published news articles
    const articles = await getNewsArticles();
    
    // Base news page
    const newsPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/news`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];

    // Add individual news articles
    const publishedArticles = articles.filter(article => article.isPublished && article.slug);
    
    publishedArticles.forEach(article => {
      const lastModified = article.updatedAt instanceof Date 
        ? article.updatedAt 
        : new Date(article.updatedAt);
        
      newsPages.push({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    });

    return newsPages;
  } catch (error) {
    // Fallback to basic sitemap
    return [
      {
        url: `${baseUrl}/news`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];
  }
} 