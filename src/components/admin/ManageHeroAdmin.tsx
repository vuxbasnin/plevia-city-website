
"use client";

import { useEffect, useState, type ChangeEvent, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getHeroSectionData, updateHeroSection } from "@/lib/firestoreService";
import { type HeroSectionData, heroFormSchema, defaultHeroSectionData } from "@/types/landingPageAdmin";
import { Loader2, Save, Image as ImageIcon, XCircle } from "lucide-react";
import NextImage from "next/image";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { CLOUDINARY } from "@/lib/cloudinary";

export default function ManageHeroAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<HeroSectionData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: defaultHeroSectionData,
  });

  // Hàm tải dữ liệu banner từ Firestore và cập nhật state.
  useEffect(() => {
    async function loadHeroData() {
      setIsLoading(true);
      try {
        const data = await getHeroSectionData();
        if (data) {
          form.reset(data);
          setCurrentPreviewUrl(data.imageUrl);
        } else {
          form.reset(defaultHeroSectionData);
          setCurrentPreviewUrl(defaultHeroSectionData.imageUrl);
        }
      } catch (error) {
        console.error("Error loading hero data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải dữ liệu banner. Sử dụng dữ liệu mặc định.",
          variant: "destructive",
        });
        form.reset(defaultHeroSectionData);
        setCurrentPreviewUrl(defaultHeroSectionData.imageUrl);
      }
      setIsLoading(false);
    }
    loadHeroData();
  }, [form, toast]);

  // Hàm xử lý khi chọn file ảnh mới cho banner.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPendingImageFile(file);
      const localPreview = URL.createObjectURL(file);
      setCurrentPreviewUrl(localPreview);
      form.setValue("imageUrl", ""); 
    } else {
      // This case might not be hit often if a file is selected then dialog cancelled
      // but good for completeness.
      if (!pendingImageFile) { // only revert if no file is currently pending
          setCurrentPreviewUrl(form.getValues("imageUrl") || defaultHeroSectionData.imageUrl);
      }
    }
  };

  // Hàm xóa file ảnh đang chọn (nếu có).
  const clearPendingImage = () => {
    setPendingImageFile(null);
    if (heroImageInputRef.current) {
      heroImageInputRef.current.value = ""; // Reset the file input
    }
    // Revert preview to the URL in the form (if any) or default
    setCurrentPreviewUrl(form.getValues("imageUrl") || defaultHeroSectionData.imageUrl);
  };

  // Hàm xử lý khi nhập/chỉnh sửa URL ảnh thủ công.
  const handleManualImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    form.setValue("imageUrl", newUrl);
    if (pendingImageFile) { // If user types a URL, clear any pending file
        setPendingImageFile(null);
        if (heroImageInputRef.current) {
          heroImageInputRef.current.value = "";
        }
    }
    if (heroFormSchema.shape.imageUrl.safeParse(newUrl).success || newUrl === "") {
      setCurrentPreviewUrl(newUrl);
    } else {
      setCurrentPreviewUrl(null); 
    }
  };

  // Hàm submit form, lưu dữ liệu banner và upload ảnh nếu có.
  const onSubmit: SubmitHandler<HeroSectionData> = async (formData) => {
    setIsSaving(true);
    let dataToSave = { ...formData };

    if (pendingImageFile) {
      if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
        toast({ title: "Cấu hình Cloudinary bị thiếu", description: "Vui lòng kiểm tra file .env và src/lib/cloudinary.ts.", variant: "destructive" });
        setIsSaving(false);
        return;
      }
      setIsUploading(true);
      try {
        const uploadedUrl = await uploadFileToCloudinary(pendingImageFile, "landingpage_images/hero");
        dataToSave.imageUrl = uploadedUrl;
        setPendingImageFile(null);
        if (heroImageInputRef.current) {
            heroImageInputRef.current.value = "";
        }
      } catch (err: any) {
        toast({ title: "Upload thất bại", description: err.message || "Không thể upload ảnh.", variant: "destructive" });
        setIsSaving(false);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const success = await updateHeroSection(dataToSave);
    if (success) {
      toast({
        title: "Đã lưu thành công!",
        description: "Nội dung Banner giới thiệu đã được cập nhật.",
        variant: "default",
      });
      form.reset(dataToSave); 
      setCurrentPreviewUrl(dataToSave.imageUrl); 
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể lưu nội dung. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <ImageIcon className="w-6 h-6 mr-2" /> Quản Lý Banner Giới Thiệu
        </CardTitle>
        <CardDescription>Chỉnh sửa nội dung cho section banner. Hình ảnh sẽ được upload khi bạn nhấn "Lưu Tất Cả Thay Đổi".</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="headline" className="font-semibold">Tiêu đề chính (Headline)</Label>
              <Input id="headline" {...form.register("headline")} placeholder="Không Gian Làm Việc Lý Tưởng Của Bạn" />
              {form.formState.errors.headline && <p className="text-sm text-destructive">{form.formState.errors.headline.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subheadline" className="font-semibold">Mô tả phụ (Subheadline)</Label>
              <Textarea id="subheadline" {...form.register("subheadline")} placeholder="Khám phá môi trường làm việc chung đầy cảm hứng..." />
              {form.formState.errors.subheadline && <p className="text-sm text-destructive">{form.formState.errors.subheadline.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ctaText" className="font-semibold">Chữ trên nút CTA</Label>
              <Input id="ctaText" {...form.register("ctaText")} placeholder="Tìm Hiểu Ngay" />
              {form.formState.errors.ctaText && <p className="text-sm text-destructive">{form.formState.errors.ctaText.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink" className="font-semibold">Link cho nút CTA</Label>
              <Input id="ctaLink" {...form.register("ctaLink")} placeholder="https://example.com/more-info" type="url" />
              {form.formState.errors.ctaLink && <p className="text-sm text-destructive">{form.formState.errors.ctaLink.message}</p>}
            </div>
          </div>

          <div className="space-y-4 border p-4 rounded-md shadow-sm bg-secondary/20">
            <Label className="font-semibold text-lg text-foreground block mb-2">Quản Lý Hình Ảnh Banner</Label>
            <div className="space-y-2">
              <Label htmlFor="imageFileHero">Chọn ảnh mới (nếu muốn thay đổi)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="imageFileHero"
                  type="file"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  onChange={handleFileChange}
                  className="flex-grow"
                  ref={heroImageInputRef}
                />
                {pendingImageFile && (
                  <Button variant="ghost" size="icon" onClick={clearPendingImage} aria-label="Xóa file đã chọn" className="text-destructive hover:text-destructive/80">
                    <XCircle className="w-5 h-5" />
                  </Button>
                )}
              </div>
              {pendingImageFile && <p className="text-xs text-muted-foreground mt-1">Đã chọn file: {pendingImageFile.name}. Ảnh sẽ được upload khi lưu.</p>}
            </div>

            <div className="relative flex items-center my-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">Hoặc</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="font-semibold">Nhập URL Hình Ảnh Banner (nếu không chọn file mới)</Label>
              <Input
                id="imageUrl"
                {...form.register("imageUrl")}
                placeholder="https://placehold.co/1200x600.png"
                type="url"
                onChange={handleManualImageUrlChange}
                disabled={!!pendingImageFile} 
              />
              {form.formState.errors.imageUrl && !pendingImageFile && <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>}
            </div>
          </div>

          {(currentPreviewUrl || defaultHeroSectionData.imageUrl) && (
            <div className="mt-4 space-y-2">
              <Label className="font-semibold">Xem trước hình ảnh banner:</Label>
              <div className="border rounded-md p-2 bg-muted/30 max-w-md mx-auto">
                <NextImage
                  src={currentPreviewUrl || defaultHeroSectionData.imageUrl}
                  alt="Xem trước hình ảnh banner"
                  width={600}
                  height={300}
                  className="rounded-md object-contain max-h-[300px] w-auto mx-auto"
                  data-ai-hint="hero banner office"
                  onError={() => {
                    setCurrentPreviewUrl(defaultHeroSectionData.imageUrl + "?text=Lỗi+tải+ảnh");
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving || isLoading || isUploading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSaving || isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? (isUploading ? "Đang upload & lưu..." : "Đang lưu...") : "Lưu Tất Cả Thay Đổi"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

    