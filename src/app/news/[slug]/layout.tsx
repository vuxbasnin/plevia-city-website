import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/metadata';
import { getNewsArticleBySlug } from "@/lib/firestoreService";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getNewsArticleBySlug(params.slug);
    if (article) {
      return createPageMetadata(
        `${article.title} - Plevia City`,
        article.summary || 'Bài viết từ Plevia City',
        `/news/${params.slug}`,
        article.coverImageUrl
      );
    }
  } catch (error) {
    console.error('Error generating metadata for news article:', error);
  }

  return createPageMetadata(
    'Bài viết - Plevia City',
    'Bài viết từ Plevia City',
    `/news/${params.slug}`
  );
}

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
