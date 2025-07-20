
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
import { getMemberBenefitsPageSettingsData, updateMemberBenefitsPageSettingsData } from "@/lib/firestoreService";
import { type MemberBenefitsPageSettingsData, memberBenefitsPageSettingsSchema, defaultMemberBenefitsPageSettingsData } from "@/types/landingPageAdmin";
import { Loader2, Save, FileText } from "lucide-react";

export default function ManageMemberBenefitsPageAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<MemberBenefitsPageSettingsData>({
    resolver: zodResolver(memberBenefitsPageSettingsSchema),
    defaultValues: defaultMemberBenefitsPageSettingsData,
  });

  // Hàm tải dữ liệu cài đặt trang Quyền Lợi từ Firestore và cập nhật state.
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getMemberBenefitsPageSettingsData();
        form.reset(data || defaultMemberBenefitsPageSettingsData);
      } catch (error) {
        console.error("Error loading Member Benefits Page Settings data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải nội dung trang Quyền Lợi.",
          variant: "destructive",
        });
        form.reset(defaultMemberBenefitsPageSettingsData);
      }
      setIsLoading(false);
    }
    loadData();
  }, [form, toast]);

  // Hàm submit form, lưu dữ liệu cài đặt trang Quyền Lợi.
  const onSubmit: SubmitHandler<MemberBenefitsPageSettingsData> = async (data) => {
    setIsSaving(true);
    const success = await updateMemberBenefitsPageSettingsData(data);
    if (success) {
      toast({
        title: "Đã lưu thành công!",
        description: "Nội dung trang Quyền Lợi đã được cập nhật.",
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
            <FileText className="w-6 h-6 mr-2" /> Quản Lý Nội Dung Trang Quyền Lợi
          </CardTitle>
          <CardDescription>Chỉnh sửa tiêu đề, mô tả và CTA cho trang Quyền Lợi Thành Viên.</CardDescription>
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
          <FileText className="w-7 h-7 mr-2" /> Quản Lý Nội Dung Trang Quyền Lợi
        </CardTitle>
        <CardDescription>Chỉnh sửa các đoạn văn bản tĩnh trên trang chi tiết Quyền Lợi Thành Viên.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {/* Hero Section of Member Benefits Page */}
          <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-secondary/20">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2 mb-4">Phần Hero (Đầu Trang Quyền Lợi)</h3>
            <div className="space-y-2">
              <Label htmlFor="heroTitle" className="font-semibold">Tiêu đề Hero</Label>
              <Input id="heroTitle" {...form.register("heroTitle")} placeholder="Đặc Quyền Độc Quyền..." />
              {form.formState.errors.heroTitle && <p className="text-sm text-destructive">{form.formState.errors.heroTitle.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription" className="font-semibold">Mô tả Hero</Label>
              <Textarea id="heroDescription" {...form.register("heroDescription")} rows={3} placeholder="Khám phá những lợi ích..." />
              {form.formState.errors.heroDescription && <p className="text-sm text-destructive">{form.formState.errors.heroDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroCtaButtonText" className="font-semibold">Chữ trên nút CTA Hero</Label>
              <Input id="heroCtaButtonText" {...form.register("heroCtaButtonText")} placeholder="Đăng Ký Dùng Thử Miễn Phí" />
              {form.formState.errors.heroCtaButtonText && <p className="text-sm text-destructive">{form.formState.errors.heroCtaButtonText.message}</p>}
            </div>
          </div>

          {/* Final CTA Section of Member Benefits Page */}
          <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-secondary/20">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2 mb-4">Phần CTA Cuối Trang (Trang Quyền Lợi)</h3>
            <div className="space-y-2">
              <Label htmlFor="finalCtaHeadline" className="font-semibold">Tiêu đề CTA cuối trang</Label>
              <Input id="finalCtaHeadline" {...form.register("finalCtaHeadline")} placeholder="Sẵn Sàng Khai Phóng..." />
              {form.formState.errors.finalCtaHeadline && <p className="text-sm text-destructive">{form.formState.errors.finalCtaHeadline.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalCtaDescription" className="font-semibold">Mô tả CTA cuối trang</Label>
              <Textarea id="finalCtaDescription" {...form.register("finalCtaDescription")} rows={3} placeholder="Tham gia cộng đồng..." />
              {form.formState.errors.finalCtaDescription && <p className="text-sm text-destructive">{form.formState.errors.finalCtaDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalCtaButtonText" className="font-semibold">Chữ trên nút CTA cuối trang</Label>
              <Input id="finalCtaButtonText" {...form.register("finalCtaButtonText")} placeholder="Đăng Ký Dùng Thử Ngay" />
              {form.formState.errors.finalCtaButtonText && <p className="text-sm text-destructive">{form.formState.errors.finalCtaButtonText.message}</p>}
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
