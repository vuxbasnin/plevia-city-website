"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getNewsArticles, updateNewsArticle } from "@/lib/firestoreService";
import { NewsArticle } from "@/types/landingPageAdmin";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";

const EditorJS = dynamic(() => import("@editorjs/editorjs"), { ssr: false });

export default function EditNewsArticlePage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getNewsArticles()
      .then((articles) => {
        const found = articles.find((a) => a.slug === slug);
        setArticle(found || null);
      })
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  // ... giữ nguyên các logic cũ về EditorJS, form, update, ...
  // Nếu cần, có thể copy toàn bộ phần logic cũ từ file [id]/page.tsx vào đây, chỉ đổi lấy bài viết theo slug

  if (loading) return <div>Đang tải...</div>;
  if (!article) return <div>Không tìm thấy bài viết.</div>;

  return (
    <div>
      {/* Render form chỉnh sửa bài viết như cũ, dùng article */}
      {/* ... */}
    </div>
  );
} 