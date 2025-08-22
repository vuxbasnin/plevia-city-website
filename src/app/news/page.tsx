import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import NewsPage from "@/components/pages/NewsPage";
import { createPageMetadata } from '@/lib/metadata';
import { getPublishedNewsArticles } from '@/lib/firestoreService';
import { defaultNewsHeaderImage, defaultNewsDescription } from '@/data/news';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const articles = await getPublishedNewsArticles();
    const latest = articles[0];
    const title = 'Plevia City - Tin tức';
    const description = latest?.summary || defaultNewsDescription;
    return createPageMetadata(
      title,
      description,
      '/news',
      latest?.coverImageUrl || defaultNewsHeaderImage
    );
  } catch {
    return createPageMetadata(
      'Plevia City - Tin tức',
      defaultNewsDescription,
      '/news'
    );
  }
}

export default function NewsPageComponent() {
  return (
    <PageLayout>
      <NewsPage />
    </PageLayout>
  );
}