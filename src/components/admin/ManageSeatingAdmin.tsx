
"use client";

import { useEffect, useState, type ChangeEvent, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getSeatingSectionData, updateSeatingSectionData } from "@/lib/firestoreService";
import { type SeatingOptionItem as SeatingOptionItemType, seatingOptionItemSchema, defaultSeatingSectionData } from "@/types/landingPageAdmin";
import { Loader2, Save, PlusCircle, Edit, Trash2, Sofa, XCircle } from "lucide-react";
import NextImage from "next/image";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { CLOUDINARY } from "@/lib/cloudinary";

interface ManagedSeatingOptionItem extends SeatingOptionItemType {
  _tempFile?: File;
  _tempPreviewUrl?: string;
}

export default function ManageSeatingAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [seatingOptions, setSeatingOptions] = useState<ManagedSeatingOptionItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<ManagedSeatingOptionItem | null>(null);

  const [dialogPendingFile, setDialogPendingFile] = useState<File | null>(null);
  const [dialogLocalPreview, setDialogLocalPreview] = useState<string | null>(null);
  const dialogImageInputRef = useRef<HTMLInputElement>(null);


  const form = useForm<SeatingOptionItemType>({
    resolver: zodResolver(seatingOptionItemSchema),
    defaultValues: { id: "", title: "", description: "", imageUrl: "" },
  });
  const { watch, setValue, reset: formReset, handleSubmit: formHandleSubmit, formState: { errors: formErrors, isSubmitting: formIsSubmitting }, getValues: formGetValues } = form;
  const currentDialogFormImageUrl = watch("imageUrl");


  useEffect(() => {
    async function loadSeatingData() {
      setIsLoading(true);
      try {
        const data = await getSeatingSectionData();
        setSeatingOptions((data?.options || []).map(opt => ({ ...opt })) as ManagedSeatingOptionItem[]);
      } catch (error) {
        console.error("Error loading seating options data:", error);
        toast({ title: "Lỗi tải dữ liệu", description: "Không thể tải dữ liệu vị trí ngồi.", variant: "destructive" });
        setSeatingOptions([]);
      }
      setIsLoading(false);
    }
    loadSeatingData();
  }, [toast]);

  const handleSaveAll = async () => {
    if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
      toast({ title: "Cấu hình Cloudinary bị thiếu", description: "Vui lòng kiểm tra file .env.local và src/lib/cloudinary.ts.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const uploadPromises: Promise<ManagedSeatingOptionItem>[] = seatingOptions.map(async (option, index) => {
        if (option._tempFile) {
          try {
            const newImageUrl = await uploadFileToCloudinary(option._tempFile, "landingpage_images/seating");
            return { ...option, imageUrl: newImageUrl, _tempFile: undefined, _tempPreviewUrl: undefined };
          } catch (uploadError: any) {
            toast({
              title: `Lỗi Upload Ảnh "${option.title || `Vị trí ${index + 1}`}"`,
              description: uploadError.message || "Không thể upload ảnh lên Cloudinary.",
              variant: "destructive"
            });
            const { _tempFile, _tempPreviewUrl, ...rest } = option;
            return { ...rest, imageUrl: option.imageUrl || "https://placehold.co/400x300.png?text=Upload+Failed" };
          }
        }
        return option;
      });

      const uploadedOptions = await Promise.all(uploadPromises);
      const finalOptionsToSave = uploadedOptions.map(({ _tempFile, _tempPreviewUrl, ...rest }) => rest);

      const success = await updateSeatingSectionData({ options: finalOptionsToSave });
      if (success) {
        toast({ title: "Đã lưu thành công!", description: "Danh sách vị trí ngồi đã được cập nhật.", variant: "default" });
        setSeatingOptions(uploadedOptions.map(opt => ({ ...opt, _tempFile: undefined, _tempPreviewUrl: undefined })));
      } else {
        toast({ title: "Lỗi!", description: "Không thể lưu danh sách. Vui lòng thử lại.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Lỗi Xử Lý Lưu", description: error.message || "Đã có lỗi xảy ra trong quá trình lưu.", variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleAddNewOption = () => {
    setEditingOption(null);
    formReset({ id: "", title: "", description: "", imageUrl: "" });
    setDialogPendingFile(null);
    setDialogLocalPreview(null);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
    setIsDialogOpen(true);
  };

  const handleEditOption = (option: ManagedSeatingOptionItem) => {
    setEditingOption(option);
    formReset({
      id: option.id,
      title: option.title,
      description: option.description,
      imageUrl: option._tempPreviewUrl ? "" : option.imageUrl // If temp preview exists, means file was chosen, so URL field should be clearable
    });
    setDialogPendingFile(option._tempFile || null);
    setDialogLocalPreview(option._tempPreviewUrl || option.imageUrl);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
    setIsDialogOpen(true);
  };

  const handleDeleteOption = (id: string) => {
    setSeatingOptions(prev => prev.filter(opt => opt.id !== id));
    toast({ title: "Đã xóa (chưa lưu)", description: "Nhấn 'Lưu Tất Cả Thay Đổi' để xác nhận.", variant: "default" });
  };

  const handleDialogFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setDialogPendingFile(file);
      setDialogLocalPreview(URL.createObjectURL(file));
      setValue("imageUrl", ""); // Clear manual URL if file is chosen
    } else {
        // Only revert if no file is currently pending
        if (!dialogPendingFile) {
            setDialogLocalPreview(formGetValues("imageUrl"));
        }
    }
  };

  const clearDialogPendingFile = () => {
    setDialogPendingFile(null);
    setDialogLocalPreview(formGetValues("imageUrl")); // Revert to manual URL if any
    if (dialogImageInputRef.current) {
      dialogImageInputRef.current.value = ""; // Reset the file input
    }
  };
  
  const handleDialogManualImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setValue("imageUrl", newUrl);
    if (newUrl) { // If user types a URL, clear any pending file
        setDialogPendingFile(null);
        if (dialogImageInputRef.current) {
            dialogImageInputRef.current.value = "";
        }
        setDialogLocalPreview(newUrl);
    } else if (dialogPendingFile) { // If URL is cleared but a file was pending, show file preview
        setDialogLocalPreview(URL.createObjectURL(dialogPendingFile));
    } else { // No URL, no file
        setDialogLocalPreview(null);
    }
  };


  const onOptionSubmit: SubmitHandler<SeatingOptionItemType> = (formDataFromDialog) => {
    let newOption: ManagedSeatingOptionItem = {
      ...formDataFromDialog,
      id: editingOption ? editingOption.id : Date.now().toString(),
      imageUrl: formDataFromDialog.imageUrl, 
    };

    if (dialogPendingFile) {
      newOption._tempFile = dialogPendingFile;
      newOption._tempPreviewUrl = dialogLocalPreview || undefined;
      newOption.imageUrl = ""; 
    } else if (!formDataFromDialog.imageUrl && editingOption && !editingOption._tempFile) {
      newOption.imageUrl = editingOption.imageUrl;
    } else if (!formDataFromDialog.imageUrl && !dialogPendingFile) {
      newOption.imageUrl = "https://placehold.co/400x300.png?text=Chưa+có+ảnh";
    }


    if (editingOption) {
      setSeatingOptions(prev => prev.map(opt => opt.id === newOption.id ? newOption : opt));
    } else {
      setSeatingOptions(prev => [...prev, newOption]);
    }
    setIsDialogOpen(false);
    setEditingOption(null);
    setDialogPendingFile(null);
    setDialogLocalPreview(null);
    if (dialogImageInputRef.current) dialogImageInputRef.current.value = "";
  };

  const previewSrcForDialog = dialogLocalPreview || currentDialogFormImageUrl || "https://placehold.co/400x300.png?text=Chưa+có+ảnh";


  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center"><Sofa className="w-6 h-6 mr-2" />Quản Lý Vị Trí Ngồi</CardTitle>
          <CardDescription>Thêm, sửa, xóa các loại vị trí ngồi.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Đang tải...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-headline text-primary flex items-center"><Sofa className="w-7 h-7 mr-2" />Quản Lý Vị Trí Ngồi</CardTitle>
          <CardDescription>Thêm, sửa, xóa các loại vị trí ngồi. Ảnh sẽ được upload khi nhấn "Lưu Tất Cả Thay Đổi".</CardDescription>
        </div>
        <Button onClick={handleAddNewOption} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm Vị Trí Mới
        </Button>
      </CardHeader>
      <CardContent>
        {seatingOptions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Chưa có vị trí ngồi nào.</p>
        ) : (
          <div className="border rounded-md">
            <Table>
              <ShadTableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Hình Ảnh</TableHead>
                  <TableHead>Tên Loại Chỗ</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead className="text-right w-[120px]">Hành Động</TableHead>
                </TableRow>
              </ShadTableHeader>
              <TableBody>
                {seatingOptions.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>
                      <NextImage
                        src={option._tempPreviewUrl || option.imageUrl || "https://placehold.co/100x75.png?text=Chưa+có+ảnh"}
                        alt={option.title}
                        width={100}
                        height={75}
                        className="rounded object-cover aspect-[4/3]"
                        data-ai-hint="desk office"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x75.png?text=Lỗi"; }}
                      />
                    </TableCell>
                    <TableCell className="font-medium align-top">{option.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate align-top">{option.description}</TableCell>
                    <TableCell className="text-right align-top">
                      <Button variant="ghost" size="icon" onClick={() => handleEditOption(option)} className="mr-2 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteOption(option.id)} className="hover:text-destructive">
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
        <DialogContent className="sm:max-w-[625px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingOption ? "Chỉnh Sửa Vị Trí Ngồi" : "Thêm Vị Trí Ngồi Mới"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formHandleSubmit(onOptionSubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div>
                <Label htmlFor="title">Tên loại chỗ ngồi</Label>
                <Input id="title" {...form.register("title")} />
                {formErrors.title && <p className="text-sm text-destructive mt-1">{formErrors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" {...form.register("description")} />
                {formErrors.description && <p className="text-sm text-destructive mt-1">{formErrors.description.message}</p>}
              </div>

              <div className="space-y-2 border p-3 rounded-md bg-secondary/20">
                <Label className="font-semibold text-foreground">Quản lý hình ảnh</Label>
                <div className="space-y-1">
                  <Label htmlFor="dialogImageFileSeating">Chọn ảnh mới từ máy tính</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="dialogImageFileSeating"
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
                  <Label htmlFor="imageUrl">Nhập URL Hình Ảnh (nếu không chọn file)</Label>
                  <Input 
                    id="imageUrl" 
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
                      alt="Xem trước hình ảnh"
                      width={200}
                      height={150}
                      className="rounded-md object-contain max-h-[150px] w-auto mx-auto aspect-[4/3]"
                      data-ai-hint="desk office"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x150.png?text=Lỗi"; }}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild><Button type="button" variant="outline">Hủy</Button></DialogClose>
              <Button type="submit" disabled={formIsSubmitting || isSaving} className="bg-primary hover:bg-primary/90">
                {(formIsSubmitting || isSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingOption ? "Cập Nhật trong DS" : "Thêm vào DS"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

    