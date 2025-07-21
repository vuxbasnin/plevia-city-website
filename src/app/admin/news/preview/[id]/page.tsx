"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNewsArticleById, updateNewsArticle } from "@/lib/firestoreService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

// Import editorjs-html để render nội dung Editor.js
import dynamic from "next/dynamic";
let EditorJsHtml: any = null;
if (typeof window !== "undefined") {
  EditorJsHtml = require("editorjs-html");
}

export default function NewsPreviewPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getNewsArticleById(id as string);
      setArticle(data);
      setLoading(false);
      // Log content để debug
      if (data && data.content) {
        // eslint-disable-next-line no-console
        console.log('TuanHM DEBUG - article.content:', data.content);
      }
    }
    fetchData();
  }, [id]);

  const handlePublish = async () => {
    if (!article) return;
    setPublishing(true);
    try {
      await updateNewsArticle(id as string, { isPublished: true });
      toast({ title: "Đã xuất bản bài viết!" });
      router.refresh();
    } catch (e) {
      toast({ title: "Lỗi", description: "Không thể xuất bản!", variant: "destructive" });
    }
    setPublishing(false);
  };

  const handleEdit = () => {
    router.push(`/admin/news/${id}`);
  };

  if (loading) return <div className="p-8 text-center">Đang tải dữ liệu bài viết...</div>;
  if (!article) return <div className="p-8 text-center text-destructive">Không tìm thấy bài viết!</div>;

  // Render Editor.js content
  let htmlContent = null;
  try {
    if (
      EditorJsHtml &&
      article.content &&
      typeof article.content === 'object' &&
      Array.isArray(article.content.blocks) &&
      article.content.blocks.length > 0
    ) {
      const edjsParser = EditorJsHtml();
      htmlContent = edjsParser.parse(article.content);
    } else {
      htmlContent = '<div class="text-destructive">Bài viết chưa có nội dung hợp lệ.</div>';
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('TuanHM DEBUG - Lỗi khi parse Editor.js:', e, article.content);
    htmlContent = '<div class="text-destructive">Lỗi khi render nội dung bài viết.</div>';
  }


  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <Badge variant={article.isPublished ? "default" : "secondary"}>
          {article.isPublished ? "Đã xuất bản" : "Bản nháp"}
        </Badge>
      </div>
      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
        <span>Tác giả: {article.author}</span>
        <span>Ngày tạo: {
          (() => {
            const val = article.createdAt;
            if (!val) return 'Không xác định';
            let dateObj = null;
            if (typeof val === 'number') {
              dateObj = new Date(val);
            } else if (val.toDate && typeof val.toDate === 'function') {
              dateObj = val.toDate();
            } else if (typeof val === 'string' || val instanceof Date) {
              dateObj = new Date(val);
            }
            if (!dateObj || isNaN(dateObj.getTime())) return 'Không xác định';
            return format(dateObj, "dd/MM/yyyy HH:mm", { locale: vi });
          })()
        }</span>
      </div>
      {article.coverImageUrl && (
        <img src={article.coverImageUrl} alt="cover" className="w-full rounded mb-4 max-h-96 object-cover" />
      )}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent || '' }} />
      <div className="flex gap-2 mt-8">
        <Button variant="outline" onClick={handleEdit}>Quay lại chỉnh sửa</Button>
        {!article.isPublished && (
          <Button onClick={handlePublish} disabled={publishing}>
            {publishing ? "Đang xuất bản..." : "Xuất bản"}
          </Button>
        )}
      </div>
    </div>
  );
} 