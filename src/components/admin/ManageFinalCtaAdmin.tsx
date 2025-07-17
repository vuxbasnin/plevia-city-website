
"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getFinalCtaSectionData, updateFinalCtaSectionData } from "@/lib/firestoreService"; 
import { type FinalCtaSectionData, finalCtaFormSchema, defaultFinalCtaSectionData } from "@/types/landingPageAdmin";
import { Loader2, Save, Send } from "lucide-react";

export default function ManageFinalCtaAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FinalCtaSectionData>({
    resolver: zodResolver(finalCtaFormSchema),
    defaultValues: defaultFinalCtaSectionData,
  });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getFinalCtaSectionData();
        form.reset(data || defaultFinalCtaSectionData);
      } catch (error) {
        console.error("Error loading Final CTA data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải dữ liệu CTA cuối trang.",
          variant: "destructive",
        });
        form.reset(defaultFinalCtaSectionData);
      }
      setIsLoading(false);
    }
    loadData();
  }, [form, toast]);

  const onSubmit: SubmitHandler<FinalCtaSectionData> = async (data) => {
    setIsSaving(true);
    const success = await updateFinalCtaSectionData(data);
    if (success) {
      toast({
        title: "Đã lưu thành công!",
        description: "Nội dung CTA cuối trang đã được cập nhật.",
        variant: "default",
      });
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
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Send className="w-6 h-6 mr-2" /> Quản Lý CTA Cuối Trang
          </CardTitle>
          <CardDescription>Chỉnh sửa nội dung cho khu vực kêu gọi hành động cuối trang.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Đang tải dữ liệu...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <Send className="w-7 h-7 mr-2" /> Quản Lý CTA Cuối Trang
        </CardTitle>
        <CardDescription>Chỉnh sửa nội dung cho khu vực kêu gọi hành động mạnh mẽ ở cuối trang chủ của bạn.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline" className="font-semibold">Tiêu đề chính</Label>
            <Input id="headline" {...form.register("headline")} placeholder="Sẵn Sàng Khám Phá Không Gian Lý Tưởng?" />
            {form.formState.errors.headline && <p className="text-sm text-destructive">{form.formState.errors.headline.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-semibold">Mô tả</Label>
            <Textarea id="description" {...form.register("description")} placeholder="Mô tả ngắn gọn, kêu gọi hành động..." />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cta1Text" className="font-semibold">Chữ trên nút CTA 1</Label>
              <Input id="cta1Text" {...form.register("cta1Text")} placeholder="Đăng Ký Dùng Thử" />
              {form.formState.errors.cta1Text && <p className="text-sm text-destructive">{form.formState.errors.cta1Text.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta1Link" className="font-semibold">Link cho nút CTA 1</Label>
              <Input id="cta1Link" {...form.register("cta1Link")} placeholder="https://example.com/register" type="url" />
              {form.formState.errors.cta1Link && <p className="text-sm text-destructive">{form.formState.errors.cta1Link.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cta2Text" className="font-semibold">Chữ trên nút CTA 2</Label>
              <Input id="cta2Text" {...form.register("cta2Text")} placeholder="Đặt Lịch Tham Quan" />
              {form.formState.errors.cta2Text && <p className="text-sm text-destructive">{form.formState.errors.cta2Text.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta2Link" className="font-semibold">Link cho nút CTA 2</Label>
              <Input id="cta2Link" {...form.register("cta2Link")} placeholder="https://example.com/book-tour" type="url" />
              {form.formState.errors.cta2Link && <p className="text-sm text-destructive">{form.formState.errors.cta2Link.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Đang lưu..." : "Lưu Thay Đổi"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
