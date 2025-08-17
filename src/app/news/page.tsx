import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ListNews from '@/components/sections/ListNews/ListNews';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { getPublishedNewsArticles } from '@/lib/firestoreService';
import { defaultNewsHeaderImage, defaultNewsDescription } from '@/data/news';
import FormInfo from '@/components/sections/FormInfo/FormInfo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const articles = await getPublishedNewsArticles();
    const latest = articles[0];
    const title = 'Plevia City - Tin tức';
    const description = latest?.summary || defaultNewsDescription;
    return {
      title,
      description,
      alternates: { canonical: '/news' },
      openGraph: {
        title,
        description,
        url: '/news',
        type: 'website',
        images: [
          {
            url: latest?.coverImageUrl || defaultNewsHeaderImage,
            width: 1200,
            height: 630,
            alt: latest?.title || 'Plevia City - Tin tức',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [
          {
            url: latest?.coverImageUrl || defaultNewsHeaderImage,
            alt: latest?.title || 'Plevia City - Tin tức',
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Plevia City - Tin tức',
      description: defaultNewsDescription,
      alternates: { canonical: '/news' },
    };
  }
}

export default async function NewsPage() {
  let newsItems: any[] = [];
  try {
    const articles = await getPublishedNewsArticles();
    newsItems = articles.map(article => ({
      id: article.id,
      imageUrl: article.coverImageUrl || '/assets/home/plevia_city.jpg',
      imageAlt: article.title,
      title: article.title,
      description: article.summary || 'Không có mô tả',
      slug: (article as any).slug,
    }));
  } catch {
    newsItems = [];
  }

  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader/>
      </ScrollReveal>
      <ScrollReveal>
        <ListNews newsItems={newsItems} />
      </ScrollReveal>
      <ScrollReveal>
        <FormInfo />
      </ScrollReveal>
    </PageLayout>
  );
}