import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pleviacity.vn';
  const currentDate = new Date();
  
  // Tất cả các trang quan trọng
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/lifestyle`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/storyline`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/member-benefits`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/furniture-demo`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iot`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Add news articles if available
  try {
    // You can fetch news articles from your CMS or database here
    // const newsArticles = await fetchNewsArticles();
    // const newsUrls = newsArticles.map(article => ({
    //   url: `${baseUrl}/news/${article.slug}`,
    //   lastModified: new Date(article.updatedAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // }));
    // staticPages.push(...newsUrls);
  } catch (error) {
    console.error('Error fetching news articles for sitemap:', error);
  }

  // Add property listings if available
  try {
    // You can fetch property listings from your CMS or database here
    // const properties = await fetchProperties();
    // const propertyUrls = properties.map(property => ({
    //   url: `${baseUrl}/properties/${property.slug}`,
    //   lastModified: new Date(property.updatedAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // }));
    // staticPages.push(...propertyUrls);
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error);
  }

  return staticPages;
} 