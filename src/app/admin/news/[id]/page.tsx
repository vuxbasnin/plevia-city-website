"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import { getNewsArticleById, updateNewsArticle } from "@/lib/firestoreService";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function EditNewsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getNewsArticleById(id as string);
      setArticle(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (article && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        data: article.content,
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const url = await uploadFileToCloudinary(file, "news_images");
                  return { success: 1, file: { url } };
                },
              },
            },
          },
          quote: Quote,
          code: Code,
        },
        placeholder: "Chỉnh sửa nội dung bài viết...",
      });
    }
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [article]);

  const handleUpdate = async () => {
    if (editorRef.current && article) {
      setIsSaving(true);
      const editorData = await editorRef.current.save();
      const safeEditorData = {
        time: editorData.time ?? Date.now(),
        version: editorData.version ?? "2.28.2",
        blocks: (editorData.blocks || []).map(block => ({
          id: block.id,
          type: block.type,
          data: block.data ? block.data : {},
        })),
      };
      await updateNewsArticle(id as string, {
        ...article,
        content: safeEditorData as any,
      });
      toast({ title: "Cập nhật thành công!", description: "Bài viết đã được cập nhật." });
      router.push("/admin/news");
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Đang tải dữ liệu bài viết...</div>;
  if (!article) return <div className="p-8 text-center text-destructive">Không tìm thấy bài viết!</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold text-foreground mb-4">Chỉnh sửa bài viết</h1>
      {/* Có thể bổ sung các trường chỉnh sửa title, summary, tags, ... ở đây nếu muốn */}
      <div className="border rounded-md mt-2">
        <div id="editorjs" className="min-h-[400px] p-4" />
      </div>
      <Button onClick={handleUpdate} disabled={isSaving} className="mt-4">
        {isSaving ? "Đang lưu..." : "Lưu bài viết"}
      </Button>
    </div>
  );
} 