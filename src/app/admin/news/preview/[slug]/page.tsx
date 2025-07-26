"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNewsArticles } from "@/lib/firestoreService";
import { NewsArticle } from "@/types/landingPageAdmin";
import dynamic from "next/dynamic";
import Image from "next/image";

const EditorJSRenderer = dynamic(() => import("@/components/shared/EditorJSRenderer"), { ssr: false });

export default function PreviewNewsArticlePage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getNewsArticles()
      .then((articles) => {
        const found = articles.find((a) => a.slug === slug);
        if (!found) setError("Không tìm thấy bài viết.");
        setArticle(found || null);
      })
      .catch(() => setError("Lỗi khi tải bài viết."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return null;

  return (
    <div style={{ maxWidth: "85vw", margin: "0 auto", padding: "24px 0", fontFamily: "Roboto, sans-serif" }}>
      {article.coverImageUrl && (
        <div style={{ width: "100%", maxWidth: "100vw", marginBottom: 32 }}>
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            width={1200}
            height={500}
            style={{ width: "100%", maxWidth: "100vw", height: "auto", borderRadius: 12, objectFit: "cover" }}
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop";
            }}
          />
        </div>
      )}
      <h1 style={{ fontSize: "2.5rem", fontWeight: 600, color: "#166534", textTransform: "uppercase", marginBottom: 12, textAlign: "center", fontFamily: "Roboto, sans-serif" }}>{article.title}</h1>
      <div style={{ textAlign: "center", marginBottom: 16, color: "#666", fontSize: "1.1rem" }}>
        <span>{article.author}</span>
      </div>
      {article.summary && (
        <div style={{ fontSize: "1.15rem", color: "#219653", fontWeight: 500, textAlign: "center", marginBottom: 24 }}>{article.summary}</div>
      )}
      <div style={{ fontSize: "1.15rem", color: "#222", lineHeight: 1.7 }}>
        {article.content && <EditorJSRenderer data={article.content} />}
      </div>
    </div>
  );
} 