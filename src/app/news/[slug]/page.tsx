import { getNewsArticles, getNewsArticleBySlug } from "@/lib/firestoreService";
import { NewsArticle } from "@/types/landingPageAdmin";
import { formatDateForDisplay } from "@/lib/utils";
import EditorJSRenderer from "@/components/shared/EditorJSRenderer";
import Image from "next/image";
import ImageHeader from '@/components/sections/ImageHeader';
import PageLayout from '@/components/layout/PageLayout';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { notFound } from 'next/navigation';
export async function generateStaticParams() {
  try {
    const articles = await getNewsArticles();
    
    return articles
      .filter(article => article.isPublished && article.slug)
      .map((article) => ({
        slug: article.slug!,
      }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const article = await getNewsArticleBySlug(params.slug);
    
    if (!article) {
      return {
        title: 'Không tìm thấy bài viết',
        description: 'Bài viết không tồn tại hoặc đã bị xóa.',
      };
    }

    return {
      title: `${article.title} | Plevia City`,
      description: article.summary || `Đọc bài viết ${article.title} trên Plevia City`,
      openGraph: {
        title: article.title,
        description: article.summary || `Đọc bài viết ${article.title} trên Plevia City`,
        images: article.coverImageUrl ? [article.coverImageUrl] : [],
        type: 'article',
        publishedTime: article.createdAt instanceof Date ? article.createdAt.toISOString() : (article.createdAt as any).toDate ? (article.createdAt as any).toDate().toISOString() : new Date().toISOString(),
        authors: [article.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.summary || `Đọc bài viết ${article.title} trên Plevia City`,
        images: article.coverImageUrl ? [article.coverImageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Lỗi tải bài viết',
      description: 'Có lỗi xảy ra khi tải bài viết.',
    };
  }
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = await getNewsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <PageLayout className="relative bg-white">
      <ImageHeader imageUrl={article.coverImageUrl} />
      <div
        className="mx-auto w-[78vw] sm:w-[78vw] max-w-[78vw] sm:px-2 px-1 py-6"
        style={{ fontFamily: "'Quicksand', Arial, sans-serif" }}
      >
        <h1 style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "hsl(var(--primary))",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "20px",
                textAlign: "center",
                fontFamily: "'Opaline', 'Times New Roman', serif"
              }}>{article.title}</h1>

        <div style={{
             textAlign: "center",
             marginBottom: "1.5rem",
             color: "#000000",
             fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
             fontFamily: "'Quicksand', Arial, sans-serif"
           }}
           className="sm:px-2 px-1"
           >
             <span>{article.author}</span> &nbsp;|&nbsp; <span>{formatDateForDisplay(article.createdAt)}</span>
           </div           >

        {article.summary && (
             <div style={{
               fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
               color: "#000000",
               fontWeight: 500,
               textAlign: "center",
               marginBottom: "2rem",
               lineHeight: 1.5,
               fontFamily: "'Quicksand', Arial, sans-serif"
             }}
             className="sm:px-2 px-1"
             >{article.summary}</div>
           )}

                     <div style={{
             fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
             color: "#000000",
             lineHeight: 1.7,
             textAlign: "justify",
             fontFamily: "'Quicksand', Arial, sans-serif"
           }}
           className="sm:px-2 px-1"
           >
                                                       {article.content && (
                 <div className="w-full">
                   <EditorJSRenderer data={article.content} />
                 </div>
               )}
           </div>
        </div>
    </PageLayout>
  );
} 