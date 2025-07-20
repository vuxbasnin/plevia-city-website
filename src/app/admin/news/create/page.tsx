"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { createNewsArticle } from "@/lib/firestoreService";
import { NewsArticleFormData, newsArticleFormSchema, defaultNewsArticleData } from "@/types/landingPageAdmin";
import { ArrowLeft, Save, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import { useEffect, useRef } from "react";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";

export default function CreateNewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsArticleFormData>({
    resolver: zodResolver(newsArticleFormSchema),
    defaultValues: defaultNewsArticleData,
  });

  const watchedTags = watch("tags");
  const watchedIsPublished = watch("isPublished");

  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Bắt đầu viết bài viết của bạn...",
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  try {
                    const url = await uploadFileToCloudinary(file, "news_images");
                    return { success: 1, file: { url } };
                  } catch (error) {
                    return { success: 0, error: "Upload failed" };
                  }
                },
              },
            },
          },
          quote: Quote,
          code: Code,
        },
        data: defaultNewsArticleData.content,
        onChange: async () => {
          if (editorRef.current) {
            const outputData = await editorRef.current.save();
            setValue("content", outputData);
          }
        },
      });
    }
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", watchedTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: NewsArticleFormData) => {
    try {
      setIsSubmitting(true);
      
      // Get editor content
      if (editorRef.current) {
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
        data.content = safeEditorData as any;
      }

      // Create the article
      const articleId = await createNewsArticle({
        title: data.title,
        content: data.content,
        author: data.author,
        summary: data.summary,
        tags: data.tags,
        isPublished: data.isPublished,
        coverImageUrl: data.coverImageUrl || "",
        slug: data.slug || "",
      });

      toast({
        title: "Thành công",
        description: "Đã tạo tin tức thành công.",
      });

      router.push("/admin/news");
    } catch (error) {
      console.error("Error creating article:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo tin tức. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/news">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Tạo Tin Tức Mới</h1>
          <p className="text-muted-foreground mt-1">
            Tạo bài viết tin tức mới cho workspace
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nội dung bài viết</CardTitle>
                <CardDescription>
                  Viết nội dung chính của bài viết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề bài viết *</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Nhập tiêu đề bài viết..."
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="summary">Tóm tắt *</Label>
                    <Textarea
                      id="summary"
                      {...register("summary")}
                      placeholder="Viết tóm tắt ngắn gọn về bài viết..."
                      rows={3}
                      className={errors.summary ? "border-destructive" : ""}
                    />
                    {errors.summary && (
                      <p className="text-sm text-destructive mt-1">{errors.summary.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Nội dung chính *</Label>
                    <div className="border rounded-md mt-2">
                      <div id="editorjs" className="min-h-[400px] p-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin bài viết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Tác giả *</Label>
                  <Input
                    id="author"
                    {...register("author")}
                    placeholder="Tên tác giả..."
                    className={errors.author ? "border-destructive" : ""}
                  />
                  {errors.author && (
                    <p className="text-sm text-destructive mt-1">{errors.author.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="coverImageUrl">Ảnh bìa</Label>
                  <Input
                    id="coverImageUrl"
                    {...register("coverImageUrl")}
                    placeholder="URL ảnh bìa..."
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (tùy chọn)</Label>
                  <Input
                    id="slug"
                    {...register("slug")}
                    placeholder="tin-tuc-moi..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL thân thiện cho bài viết
                  </p>
                </div>

                <div>
                  <Label>Thẻ</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Thêm thẻ..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Thêm
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {watchedTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublished">Xuất bản ngay</Label>
                  <Switch
                    id="isPublished"
                    checked={watchedIsPublished}
                    onCheckedChange={(checked) => setValue("isPublished", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thao tác</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Tạo tin tức TuanHM
                      </>
                    )}
                  </Button>
                  <Link href="/admin/news">
                    <Button variant="outline" className="w-full">
                      Hủy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 