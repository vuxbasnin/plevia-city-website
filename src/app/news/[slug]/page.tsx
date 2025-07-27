"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNewsArticles } from "@/lib/firestoreService";
import { NewsArticle } from "@/types/landingPageAdmin";
import { formatDateForDisplay } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import ImageHeader from '@/components/sections/ImageHeader';
import PageLayout from '@/components/layout/PageLayout';
import ScrollReveal from '@/components/shared/ScrollReveal';

const EditorJSRenderer = dynamic(() => import("@/components/shared/EditorJSRenderer"), { ssr: false });

export default function NewsDetailPage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getNewsArticles()
      .then((articles) => {
        // Kiểm tra xem slug có phải là ID không (ID thường không có dấu gạch ngang)
        const isSlugAnId = !slug.includes('-');

        let foundArticle;
        if (isSlugAnId) {
          // Nếu slug là ID, tìm theo ID
          foundArticle = articles.find(article => article.id === slug);
        } else {
          // Nếu slug có dấu gạch ngang, tìm theo slug
          foundArticle = articles.find(article => article.slug === slug);
        }

        if (!foundArticle) {
          setError("Không tìm thấy bài viết.");
        } else {
          setArticle(foundArticle);
        }
      })
      .catch(() => setError("Lỗi khi tải bài viết."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px] text-lg">Đang tải...</div>
      </PageLayout>
    );
  }
  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[400px] text-lg text-red-600">{error}</div>
      </PageLayout>
    );
  }
  if (!article) return null;

  return (
    <PageLayout className="relative bg-white overflow-hidden">
      <ScrollReveal>
        <ImageHeader imageUrl={article.coverImageUrl} />
      </ScrollReveal>
      <ScrollReveal>
                 <div
           className="mx-auto font-roboto sm:max-w-[91.5vw] sm:w-[91.5vw] max-w-[97.5vw] w-[97.5vw] sm:px-2 px-1 py-6"
         >
          <h1 style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "#166534",
            textTransform: "uppercase",
            marginBottom: "1rem",
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            lineHeight: 1.2
          }}>{article.title}</h1>

                     <div style={{
             textAlign: "center",
             marginBottom: "1.5rem",
             color: "#666",
             fontSize: "clamp(0.9rem, 2vw, 1.1rem)"
           }}
           className="sm:px-2 px-1"
           >
             <span>{article.author}</span> &nbsp;|&nbsp; <span>{formatDateForDisplay(article.createdAt)}</span>
           </div>

           {article.summary && (
             <div style={{
               fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
               color: "#219653",
               fontWeight: 500,
               textAlign: "center",
               marginBottom: "2rem",
               lineHeight: 1.5
             }}
             className="sm:px-2 px-1"
             >{article.summary}</div>
           )}

                     <div style={{
             fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
             color: "#222",
             lineHeight: 1.7,
             textAlign: "justify"
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
      </ScrollReveal>
    </PageLayout>
  );
} 