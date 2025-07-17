
"use client";

import { useEffect, useState, type ChangeEvent, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getMemberBenefitsSectionData, updateMemberBenefitsSectionData } from "@/lib/firestoreService";
import { type MemberBenefitsSectionData, type BenefitItem as BenefitItemType, benefitItemSchema } from "@/types/landingPageAdmin";
import { Loader2, Save, PlusCircle, Edit, Trash2, Award, XCircle } from "lucide-react";
import NextImage from "next/image";
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { CLOUDINARY } from "@/lib/cloudinary";


interface ManagedBenefitItem extends BenefitItemType {
  _tempFile?: File;
  _tempPreviewUrl?: string;
}

export default function ManageBenefitsAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [benefitsList, setBenefitsList] = useState<ManagedBenefitItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<ManagedBenefitItem | null>(null);

  const [dialogPendingFile, setDialogPendingFile] = useState<File | null>(null);
  const [dialogLocalPreview, setDialogLocalPreview] = useState<string | null>(null);
  const dialogImageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BenefitItemType>({
    resolver: zodResolver(benefitItemSchema),
    defaultValues: {
      id: "",
      icon: "Award",
      title: "",
      shortDescription: "",
      detailedDescription: "",
      imageUrl: "",
    },
  });
  const { watch, setValue, reset: formReset, handleSubmit: formHandleSubmit, formState: { errors: formErrors, isSubmitting: formIsSubmitting }, getValues: formGetValues } = form;
  const currentDialogFormImageUrl = watch("imageUrl");

  useEffect(() => {
    async function loadBenefitsData() {
      setIsLoading(true);
      try {
        const data = await getMemberBenefitsSectionData();
        setBenefitsList((data?.items || []).map(item => ({ ...item })) as ManagedBenefitItem[]);
      } catch (error) {
        console.error("Error loading benefits data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải dữ liệu quyền lợi thành viên.",
          variant: "destructive",
        });
        setBenefitsList([]);
      }
      setIsLoading(false);
    }
    loadBenefitsData();
  }, [toast]);

  const handleSaveAll = async () => {
    if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
      toast({ title: "Cấu hình Cloudinary bị thiếu", description: "Vui lòng kiểm tra file .env và src/lib/cloudinary.ts.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const uploadPromises: Promise<ManagedBenefitItem>[] = benefitsList.map(async (benefit, index) => {
        if (benefit._tempFile) {
          try {
            const newImageUrl = await uploadFileToCloudinary(benefit._tempFile, "landingpage_images/benefits");
            return { ...benefit, imageUrl: newImageUrl, _tempFile: undefined, _tempPreviewUrl: undefined };
          } catch (uploadError: any) {
            toast({
              title: `Lỗi Upload Ảnh "${benefit.title || `Quyền lợi ${index + 1}`}"`,
              description: uploadError.message || "Không thể upload ảnh lên Cloudinary.",
              variant: "destructive"
            });
            const { _tempFile, _tempPreviewUrl, ...rest } = benefit;
            return { ...rest, imageUrl: benefit.imageUrl || "https://placehold.co/400x300.png?text=Upload+Failed" };
          }
        }
        return benefit;
      });

      const uploadedBenefits = await Promise.all(uploadPromises);
      const finalBenefitsToSave = uploadedBenefits.map(({ _tempFile, _tempPreviewUrl, ...rest }) => rest);

      const success = await updateMemberBenefitsSectionData({ items: finalBenefitsToSave });
      if (success) {
        toast({
          title: "Đã lưu thành công!",
          description: "Danh sách quyền lợi đã được cập nhật.",
          variant: "default",
        });
        setBenefitsList(uploadedBenefits.map(opt => ({ ...opt, _tempFile: undefined, _tempPreviewUrl: undefined })));
      } else {
        toast({
          title: "Lỗi!",
          description: "Không thể lưu danh sách. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({ title: "Lỗi Xử Lý Lưu", description: error.message || "Đã có lỗi xảy ra trong quá trình lưu.", variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleAddNewBenefit = () => {
    setEditingBenefit(null);
    formReset({ id: "", icon: "Award", title: "", shortDescription: "", detailedDescription: "", imageUrl: "" });
    setDialogPendingFile(null);
    setDialogLocalPreview(null);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
    setIsDialogOpen(true);
  };

  const handleEditBenefit = (benefit: ManagedBenefitItem) => {
    setEditingBenefit(benefit);
    formReset({
      id: benefit.id,
      icon: benefit.icon,
      title: benefit.title,
      shortDescription: benefit.shortDescription,
      detailedDescription: benefit.detailedDescription,
      imageUrl: benefit._tempPreviewUrl ? "" : benefit.imageUrl
    });
    setDialogPendingFile(benefit._tempFile || null);
    setDialogLocalPreview(benefit._tempPreviewUrl || benefit.imageUrl);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
    setIsDialogOpen(true);
  };

  const handleDeleteBenefit = (id: string) => {
    setBenefitsList(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Đã xóa (chưa lưu)",
      description: "Nhấn 'Lưu Tất Cả Thay Đổi' để xác nhận việc xóa.",
      variant: "default"
    });
  };

  const handleDialogFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setDialogPendingFile(file);
      setDialogLocalPreview(URL.createObjectURL(file));
      setValue("imageUrl", "");
    } else {
      if (!dialogPendingFile) {
        setDialogLocalPreview(formGetValues("imageUrl"));
      }
    }
  };

  const clearDialogPendingFile = () => {
    setDialogPendingFile(null);
    setDialogLocalPreview(formGetValues("imageUrl"));
    if (dialogImageInputRef.current) {
      dialogImageInputRef.current.value = "";
    }
  };

  const handleDialogManualImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setValue("imageUrl", newUrl);
    if (newUrl) {
      setDialogPendingFile(null);
      if (dialogImageInputRef.current) {
        dialogImageInputRef.current.value = "";
      }
      setDialogLocalPreview(newUrl);
    } else if (dialogPendingFile) {
      setDialogLocalPreview(URL.createObjectURL(dialogPendingFile));
    } else {
      setDialogLocalPreview(null);
    }
  };

  const onBenefitSubmit: SubmitHandler<BenefitItemType> = (formDataFromDialog) => {
    let newBenefit: ManagedBenefitItem = {
      ...formDataFromDialog,
      id: editingBenefit ? editingBenefit.id : Date.now().toString(),
      imageUrl: formDataFromDialog.imageUrl,
    };

    if (dialogPendingFile) {
      newBenefit._tempFile = dialogPendingFile;
      newBenefit._tempPreviewUrl = dialogLocalPreview || undefined;
      newBenefit.imageUrl = "";
    } else if (!formDataFromDialog.imageUrl && editingBenefit && !editingBenefit._tempFile) {
      newBenefit.imageUrl = editingBenefit.imageUrl;
    } else if (!formDataFromDialog.imageUrl && !dialogPendingFile) {
      newBenefit.imageUrl = ""; // Ensure it's empty if no URL and no file
    }

    if (editingBenefit) {
      setBenefitsList(prev => prev.map(item => item.id === newBenefit.id ? newBenefit : item));
    } else {
      setBenefitsList(prev => [...prev, newBenefit]);
    }
    setIsDialogOpen(false);
    setEditingBenefit(null);
    setDialogPendingFile(null);
    setDialogLocalPreview(null);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
  };

  const previewSrcForDialog = dialogLocalPreview || currentDialogFormImageUrl || "https://placehold.co/400x300.png?text=Chưa+có+ảnh";

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Award className="w-6 h-6 mr-2" /> Quản Lý Quyền Lợi Thành Viên
          </CardTitle>
          <CardDescription>Thêm, sửa, xóa các quyền lợi nổi bật.</CardDescription>
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Award className="w-7 h-7 mr-2" /> Quản Lý Quyền Lợi Thành Viên
          </CardTitle>
          <CardDescription>Thêm, sửa, xóa các quyền lợi hiển thị trên trang chủ và trang chi tiết quyền lợi. Ảnh sẽ được upload khi nhấn "Lưu Tất Cả Thay Đổi".</CardDescription>
        </div>
        <Button onClick={handleAddNewBenefit} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm Quyền Lợi Mới
        </Button>
      </CardHeader>
      <CardContent>
        {benefitsList.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Chưa có quyền lợi nào. Hãy thêm mới!</p>
        ) : (
          <div className="border rounded-md max-h-[59vh] overflow-auto">
            <Table>
              <ShadTableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Icon</TableHead>
                  <TableHead className="w-[100px]">Ảnh</TableHead>
                  <TableHead>Tiêu Đề Quyền Lợi</TableHead>
                  <TableHead>Mô Tả Ngắn</TableHead>
                  <TableHead className="text-right w-[120px]">Hành Động</TableHead>
                </TableRow>
              </ShadTableHeader>
              <TableBody>
                {benefitsList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="align-top">
                      <div className="flex items-center space-x-2">
                        <DynamicLucideIcon name={item.icon} className="w-6 h-6 text-primary object-contain" />
                        <span className="text-xs text-muted-foreground truncate w-12 block md:hidden">({item.icon.startsWith('http') ? 'URL' : item.icon})</span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <NextImage
                        src={item._tempPreviewUrl || item.imageUrl || "https://placehold.co/100x75.png?text=No+Img"}
                        alt={item.title}
                        width={80}
                        height={60}
                        className="rounded object-cover aspect-[4/3]"
                        data-ai-hint="benefit illustration"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x75.png?text=Lỗi"; }}
                      />
                    </TableCell>
                    <TableCell className="font-medium align-top">{item.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate align-top">{item.shortDescription}</TableCell>
                    <TableCell className="text-right align-top">
                      <Button variant="ghost" size="icon" onClick={() => handleEditBenefit(item)} className="mr-2 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteBenefit(item.id)} className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveAll} disabled={isSaving || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving ? "Đang xử lý..." : "Lưu Tất Cả Thay Đổi"}
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingBenefit ? "Chỉnh Sửa Quyền Lợi" : "Thêm Quyền Lợi Mới"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formHandleSubmit(onBenefitSubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div>
                <Label htmlFor="iconBenefit">Icon (Tên Lucide hoặc URL Ảnh)</Label>
                <Input id="iconBenefit" {...form.register("icon")} placeholder="Ví dụ: Zap HOẶC https://example.com/icon.png" />
                {formErrors.icon && <p className="text-sm text-destructive mt-1">{formErrors.icon.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Nhập tên icon từ thư viện{' '}
                  <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    Lucide Icons
                  </a> (ví dụ: "Award", "Users") hoặc nhập URL đầy đủ đến file ảnh.
                </p>
              </div>
              <div>
                <Label htmlFor="titleBenefit">Tiêu đề quyền lợi</Label>
                <Input id="titleBenefit" {...form.register("title")} />
                {formErrors.title && <p className="text-sm text-destructive mt-1">{formErrors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="shortDescriptionBenefit">Mô tả ngắn</Label>
                <Textarea id="shortDescriptionBenefit" {...form.register("shortDescription")} rows={2} />
                {formErrors.shortDescription && <p className="text-sm text-destructive mt-1">{formErrors.shortDescription.message}</p>}
              </div>
              <div>
                <Label htmlFor="detailedDescriptionBenefit">Mô tả chi tiết</Label>
                <Textarea id="detailedDescriptionBenefit" {...form.register("detailedDescription")} rows={4} />
                {formErrors.detailedDescription && <p className="text-sm text-destructive mt-1">{formErrors.detailedDescription.message}</p>}
              </div>

              <div className="space-y-2 border p-3 rounded-md bg-secondary/20">
                <Label className="font-semibold text-foreground">Hình ảnh minh họa (Tùy chọn)</Label>
                <div className="space-y-1">
                  <Label htmlFor="dialogImageFileBenefit">Chọn ảnh mới từ máy tính</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dialogImageFileBenefit"
                      type="file"
                      accept="image/png, image/jpeg, image/gif, image/webp"
                      onChange={handleDialogFileChange}
                      className="flex-grow"
                      ref={dialogImageInputRef}
                    />
                    {dialogPendingFile && (
                      <Button variant="ghost" size="icon" onClick={clearDialogPendingFile} aria-label="Xóa file đã chọn" className="text-destructive hover:text-destructive/80">
                        <XCircle className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                  {dialogPendingFile && <p className="text-xs text-muted-foreground mt-1">Đã chọn: {dialogPendingFile.name}.<br /> Ảnh sẽ được upload khi lưu toàn bộ section.</p>}
                </div>
                <div className="relative flex items-center my-1">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink mx-2 text-xs text-muted-foreground uppercase">Hoặc</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>
                <div>
                  <Label htmlFor="imageUrlBenefit">Nhập URL Hình Ảnh (nếu không chọn file)</Label>
                  <Input
                    id="imageUrlBenefit"
                    {...form.register("imageUrl")}
                    type="url"
                    disabled={!!dialogPendingFile}
                    placeholder="https://..."
                    onChange={handleDialogManualImageUrlChange}
                  />
                  {formErrors.imageUrl && !dialogPendingFile && <p className="text-sm text-destructive mt-1">{formErrors.imageUrl.message}</p>}
                </div>
              </div>

              {(previewSrcForDialog !== "https://placehold.co/400x300.png?text=Chưa+có+ảnh" || dialogPendingFile) && (
                <div className="mt-2 space-y-1">
                  <Label className="text-sm font-semibold">Xem trước:</Label>
                  <div className="border rounded-md p-2 bg-muted/30 max-w-[200px] mx-auto">
                    <NextImage
                      src={previewSrcForDialog}
                      alt="Xem trước hình ảnh quyền lợi"
                      width={200}
                      height={150}
                      className="rounded-md object-contain max-h-[150px] w-auto mx-auto aspect-[4/3]"
                      data-ai-hint="benefit example"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x150.png?text=Lỗi"; }}
                    />
                  </div>
                </div>
              )}

            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">Hủy</Button>
              </DialogClose>
              <Button type="submit" disabled={formIsSubmitting || isSaving} className="bg-primary hover:bg-primary/90">
                {(formIsSubmitting || isSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingBenefit ? "Cập Nhật trong DS" : "Thêm vào DS"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}


