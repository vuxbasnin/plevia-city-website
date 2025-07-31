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
import { ArrowLeft, Save, Eye, EyeOff, X, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CreateNewsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [newTag, setNewTag] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
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
    // Only initialize EditorJS on client-side
    if (typeof window !== 'undefined' && !editorRef.current) {
      const initEditor = async () => {
        try {
          const [
            EditorJSModule,
            HeaderModule,
            ListModule,
            ImageToolModule,
            QuoteModule,
            CodeModule
          ] = await Promise.all([
            import("@editorjs/editorjs"),
            import("@editorjs/header"),
            import("@editorjs/list"),
            import("@editorjs/image"),
            import("@editorjs/quote"),
            import("@editorjs/code")
          ]);

          const EditorJS = EditorJSModule.default;
          const Header = HeaderModule.default;
          const List = ListModule.default;
          const ImageTool = ImageToolModule.default;
          const Quote = QuoteModule.default;
          const Code = CodeModule.default;

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
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('folder', 'news_images');

                        const response = await fetch('/api/upload-image', {
                          method: 'POST',
                          body: formData,
                        });

                        if (!response.ok) {
                          const errorData = await response.json();
                          throw new Error(errorData.error || 'Upload failed');
                        }

                        const result = await response.json();
                        return { success: 1, file: { url: result.url } };
                      } catch (error) {
                        console.error('EditorJS upload error:', error);
                        return { success: 0, error: error instanceof Error ? error.message : 'Upload failed' };
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
        } catch (error) {
          console.error('Failed to initialize EditorJS:', error);
        }
      };

      initEditor();
    }

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [setValue]);

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", watchedTags.filter(tag => tag !== tagToRemove));
  };

  // Function để generate slug từ tiêu đề
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD') // Tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
      .replace(/[đĐ]/g, 'd') // Thay đ/Đ thành d
      .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ chữ cái, số, khoảng trắng và dấu gạch ngang
      .replace(/\s+/g, '-') // Thay khoảng trắng thành dấu gạch ngang
      .replace(/-+/g, '-') // Gộp nhiều dấu gạch ngang liên tiếp
      .replace(/^-|-$/g, ''); // Xóa dấu gạch ngang ở đầu và cuối
  };

  // Auto-generate slug khi tiêu đề thay đổi
  const watchedTitle = watch("title");
  useEffect(() => {
    if (watchedTitle && !watch("slug")) {
      const generatedSlug = generateSlug(watchedTitle);
      setValue("slug", generatedSlug);
    }
  }, [watchedTitle, setValue, watch]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadCoverImage = async (): Promise<string> => {
    if (!coverImageFile) {
      throw new Error("Không có file ảnh để upload");
    }
    
    setIsUploadingCover(true);
    try {
      console.log("Bắt đầu upload ảnh bìa...");
      
      const formData = new FormData();
      formData.append('file', coverImageFile);
      formData.append('folder', 'news_cover_images');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      console.log("Upload ảnh bìa thành công:", result.url);
      return result.url;
    } catch (error) {
      console.error("Lỗi upload ảnh bìa:", error);
      throw new Error(`Không thể upload ảnh bìa: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const onSubmit = async (data: NewsArticleFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Bắt đầu tạo bài viết...");
      
      // Upload cover image if selected
      let coverImageUrl = data.coverImageUrl || "";
      if (coverImageFile) {
        console.log("Có ảnh bìa cần upload...");
        coverImageUrl = await uploadCoverImage();
      }
      
      // Get editor content
      if (editorRef.current) {
        const editorData = await editorRef.current.save();
        const safeEditorData = {
          time: editorData.time ?? Date.now(),
          version: editorData.version ?? "2.28.2",
          blocks: (editorData.blocks || []).map(block => ({
            id: block.id,
            type: block.type,
            data: block.data || {},
          })),
        };
        data.content = safeEditorData;
      }

      console.log("Dữ liệu bài viết:", {
        title: data.title,
        author: data.author,
        summary: data.summary,
        coverImageUrl: coverImageUrl,
        isPublished: data.isPublished
      });

      // Create the article
      const articleId = await createNewsArticle({
        title: data.title,
        content: data.content,
        author: data.author,
        summary: data.summary,
        tags: data.tags,
        isPublished: data.isPublished,
        coverImageUrl: coverImageUrl,
        slug: data.slug || "",
      });

      console.log("Tạo bài viết thành công, ID:", articleId);

      toast({
        title: "Thành công",
        description: "Đã tạo tin tức thành công.",
      });

      router.push("/admin/news");
    } catch (error) {
      console.error("Lỗi tạo bài viết:", error);
      
      let errorMessage = "Không thể tạo tin tức. Vui lòng thử lại.";
      
      if (error instanceof Error) {
        if (error.message.includes("Cloudinary")) {
          errorMessage = "Lỗi upload ảnh: " + error.message;
        } else if (error.message.includes("Firestore")) {
          errorMessage = "Lỗi lưu dữ liệu: " + error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Lỗi",
        description: errorMessage,
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
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id="coverImageFile"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                      <label htmlFor="coverImageFile" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Chọn ảnh từ máy tính</p>
                        <p className="text-xs text-gray-400">JPG, PNG, GIF (tối đa 10MB)</p>
                      </label>
                    </div>

                    {/* URL Input */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Hoặc nhập URL ảnh:</p>
                      <Input
                        id="coverImageUrl"
                        {...register("coverImageUrl")}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    {/* Preview */}
                    {(coverImagePreview || watch("coverImageUrl")) && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                        <div className="relative">
                          <img
                            src={coverImagePreview || watch("coverImageUrl")}
                            alt="Cover preview"
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          {coverImagePreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setCoverImageFile(null);
                                setCoverImagePreview("");
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="slug">Slug (tùy chọn)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      {...register("slug")}
                      placeholder="tin-tuc-moi..."
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (watchedTitle) {
                          const generatedSlug = generateSlug(watchedTitle);
                          setValue("slug", generatedSlug);
                        }
                      }}
                      disabled={!watchedTitle}
                    >
                      Tạo slug
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    URL thân thiện cho bài viết. Tự động tạo từ tiêu đề hoặc nhập thủ công.
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
                    disabled={isSubmitting || isUploadingCover}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang tạo...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Tạo tin tức
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