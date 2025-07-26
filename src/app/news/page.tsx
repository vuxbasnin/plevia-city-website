"use client";

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ListNews from '@/components/sections/ListNews/ListNews';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { getPublishedNewsArticles } from '@/lib/firestoreService';
import { NewsArticle } from '@/types/landingPageAdmin';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        console.log('Loading published news articles...');
        const articles = await getPublishedNewsArticles();
        console.log('Raw articles from Firestore:', articles);
        
        // Transform NewsArticle to ListNews format
        const transformedNews = articles.map(article => ({
          id: article.id,
          imageUrl: article.coverImageUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop', // fallback image
          imageAlt: article.title,
          title: article.title,
          description: article.summary || 'Không có mô tả'
        }));
        
        console.log('Transformed news items:', transformedNews);
        setNewsItems(transformedNews);
      } catch (error) {
        console.error('Error loading news:', error);
        // Fallback to empty array if error
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <ScrollReveal>
          <ImageHeader/>
        </ScrollReveal>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Đang tải tin tức...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader/>
      </ScrollReveal>
      <ScrollReveal>
        <ListNews newsItems={newsItems} />
      </ScrollReveal>
    </PageLayout>
  );
} 