
"use client";

import { useEffect, useState, type ChangeEvent, useRef } from "react";
import { useForm, type SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getSiteSettingsData, updateSiteSettings } from "@/lib/firestoreService";
import { type SiteSettingsData, siteSettingsFormSchema, defaultSiteSettingsData, socialLinkItemSchema, type SocialLinkItem } from "@/types/landingPageAdmin";
import { Loader2, Save, Settings, Image as ImageIcon, XCircle, PlusCircle, Edit, Trash2, Link as LinkIcon } from "lucide-react";
import NextImage from "next/image";
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';
import { uploadFileViaAPI } from "@/lib/uploadHelper";
import { CLOUDINARY } from "@/lib/cloudinary";


export default function ManageSiteSettingsAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);

  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);
  const [previewLogoUrl, setPreviewLogoUrl] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [pendingFaviconFile, setPendingFaviconFile] = useState<File | null>(null);
  const [previewFaviconUrl, setPreviewFaviconUrl] = useState<string | null>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const [isSocialLinkDialogOpen, setIsSocialLinkDialogOpen] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLinkItem | null>(null);
  const [editingSocialLinkIndex, setEditingSocialLinkIndex] = useState<number | null>(null);

  const mainForm = useForm<SiteSettingsData>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues: defaultSiteSettingsData,
  });
  
  const { control: mainFormControl, register: mainFormRegister, handleSubmit: mainFormHandleSubmit, reset: mainFormReset, setValue: mainFormSetValue, getValues: mainFormGetValues, formState: { errors: mainFormErrors } } = mainForm;

  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink, update: updateSocialLink } = useFieldArray({
    control: mainFormControl,
    name: "socialLinks",
  });
  
  const socialLinkForm = useForm<SocialLinkItem>({
    resolver: zodResolver(socialLinkItemSchema),
    defaultValues: { id: "", platformName: "", iconName: "Link", url: "" },
  });


  const watchedLogoUrl = mainForm.watch("logoUrl");
  const watchedFaviconUrl = mainForm.watch("faviconUrl");

  // Hàm cập nhật preview logo khi thay đổi file hoặc URL.
  useEffect(() => {
    if (!pendingLogoFile && watchedLogoUrl && siteSettingsFormSchema.shape.logoUrl.safeParse(watchedLogoUrl).success) {
      setPreviewLogoUrl(watchedLogoUrl);
    } else if (!pendingLogoFile && !watchedLogoUrl) {
      setPreviewLogoUrl(null);
    }
  }, [watchedLogoUrl, pendingLogoFile]);

  // Hàm cập nhật preview favicon khi thay đổi file hoặc URL.
  useEffect(() => {
    if (!pendingFaviconFile && watchedFaviconUrl && siteSettingsFormSchema.shape.faviconUrl.safeParse(watchedFaviconUrl).success) {
      setPreviewFaviconUrl(watchedFaviconUrl);
    } else if (!pendingFaviconFile && !watchedFaviconUrl) {
      setPreviewFaviconUrl(null);
    }
  }, [watchedFaviconUrl, pendingFaviconFile]);


  // Hàm tải dữ liệu cài đặt website từ Firestore và cập nhật state.
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getSiteSettingsData();
        const loadedData = data || defaultSiteSettingsData;
        mainFormReset(loadedData);
        setPreviewLogoUrl(loadedData.logoUrl || null);
        setPreviewFaviconUrl(loadedData.faviconUrl || null);
      } catch (error) {
        console.error("Error loading Site Settings data:", error);
        toast({
          title: "Lỗi tải dữ liệu",
          description: "Không thể tải cài đặt chung của trang.",
          variant: "destructive",
        });
        mainFormReset(defaultSiteSettingsData);
      }
      setIsLoading(false);
    }
    loadData();
  }, [mainFormReset, toast]);

  // Hàm xử lý khi chọn file logo mới.
  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPendingLogoFile(file);
      setPreviewLogoUrl(URL.createObjectURL(file));
      mainFormSetValue("logoUrl", "");
    } else {
      if (!pendingLogoFile) {
         setPreviewLogoUrl(mainFormGetValues("logoUrl") || defaultSiteSettingsData.logoUrl);
      }
    }
  };

  // Hàm xóa file logo đang chọn (nếu có).
  const clearPendingLogoFile = () => {
    setPendingLogoFile(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
    setPreviewLogoUrl(mainFormGetValues("logoUrl") || defaultSiteSettingsData.logoUrl);
  };

  // Hàm xử lý khi nhập/chỉnh sửa URL logo thủ công.
  const handleManualLogoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    mainFormSetValue("logoUrl", newUrl);
    if (newUrl) {
        setPendingLogoFile(null);
        if (logoInputRef.current) logoInputRef.current.value = "";
    }
    if (siteSettingsFormSchema.shape.logoUrl.safeParse(newUrl).success || newUrl === "") {
      setPreviewLogoUrl(newUrl);
    } else {
      setPreviewLogoUrl(null);
    }
  };

  // Hàm xử lý khi chọn file favicon mới.
  const handleFaviconFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPendingFaviconFile(file);
      setPreviewFaviconUrl(URL.createObjectURL(file));
      mainFormSetValue("faviconUrl", "");
    } else {
      if(!pendingFaviconFile) {
         setPreviewFaviconUrl(mainFormGetValues("faviconUrl") || defaultSiteSettingsData.faviconUrl);
      }
    }
  };

  // Hàm xóa file favicon đang chọn (nếu có).
  const clearPendingFaviconFile = () => {
    setPendingFaviconFile(null);
    if (faviconInputRef.current) {
      faviconInputRef.current.value = "";
    }
    setPreviewFaviconUrl(mainFormGetValues("faviconUrl") || defaultSiteSettingsData.faviconUrl);
  };

  // Hàm xử lý khi nhập/chỉnh sửa URL favicon thủ công.
  const handleManualFaviconUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    mainFormSetValue("faviconUrl", newUrl);
     if (newUrl) {
        setPendingFaviconFile(null);
        if (faviconInputRef.current) faviconInputRef.current.value = "";
    }
    if (siteSettingsFormSchema.shape.faviconUrl.safeParse(newUrl).success || newUrl === "") {
      setPreviewFaviconUrl(newUrl);
    } else {
      setPreviewFaviconUrl(null);
    }
  };

  // Hàm mở dialog thêm liên kết mạng xã hội mới.
  const handleAddNewSocialLink = () => {
    setEditingSocialLink(null);
    setEditingSocialLinkIndex(null);
    socialLinkForm.reset({ id: "", platformName: "", iconName: "Link", url: "" });
    setIsSocialLinkDialogOpen(true);
  };

  // Hàm mở dialog chỉnh sửa liên kết mạng xã hội.
  const handleEditSocialLink = (link: SocialLinkItem, index: number) => {
    setEditingSocialLink(link);
    setEditingSocialLinkIndex(index);
    socialLinkForm.reset(link);
    setIsSocialLinkDialogOpen(true);
  };

  // Hàm submit form dialog liên kết mạng xã hội, thêm hoặc cập nhật liên kết.
  const onSocialLinkSubmit: SubmitHandler<SocialLinkItem> = (data) => {
    if (editingSocialLink && editingSocialLinkIndex !== null) {
      updateSocialLink(editingSocialLinkIndex, { ...data, id: editingSocialLink.id });
    } else {
      appendSocialLink({ ...data, id: Date.now().toString() });
    }
    setIsSocialLinkDialogOpen(false);
  };


  // Hàm submit form, lưu dữ liệu cài đặt website và upload logo/favicon nếu có.
  const onSubmit: SubmitHandler<SiteSettingsData> = async (formData) => {
    setIsSaving(true);
    let dataToSave = { ...formData };

    if (pendingLogoFile || pendingFaviconFile) {
        if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV") {
            toast({ title: "Cấu hình Cloudinary bị thiếu", description: "Vui lòng kiểm tra file .env và src/lib/cloudinary.ts.", variant: "destructive" });
            setIsSaving(false);
            return;
        }
    }

    if (pendingLogoFile) {
      setIsUploadingLogo(true);
      try {
        const uploadedLogoUrl = await uploadFileViaAPI(pendingLogoFile, "site_assets/logo");
        dataToSave.logoUrl = uploadedLogoUrl;
        setPendingLogoFile(null);
        if(logoInputRef.current) logoInputRef.current.value = "";
      } catch (err: any) {
        toast({ title: "Upload Logo thất bại", description: err.message || "Không thể upload logo.", variant: "destructive" });
        setIsSaving(false);
        setIsUploadingLogo(false);
        return;
      }
      setIsUploadingLogo(false);
    }

    if (pendingFaviconFile) {
      setIsUploadingFavicon(true);
      try {
        const uploadedFaviconUrl = await uploadFileViaAPI(pendingFaviconFile, "site_assets/favicon");
        dataToSave.faviconUrl = uploadedFaviconUrl;
        setPendingFaviconFile(null);
        if(faviconInputRef.current) faviconInputRef.current.value = "";
      } catch (err: any) {
        toast({ title: "Upload Favicon thất bại", description: err.message || "Không thể upload favicon.", variant: "destructive" });
        setIsSaving(false);
        setIsUploadingFavicon(false);
        return;
      }
      setIsUploadingFavicon(false);
    }

    const success = await updateSiteSettings(dataToSave);
    if (success) {
      toast({
        title: "Đã lưu thành công!",
        description: "Cài đặt chung của trang đã được cập nhật.",
        variant: "default",
      });
      mainFormReset(dataToSave);
      setPreviewLogoUrl(dataToSave.logoUrl);
      setPreviewFaviconUrl(dataToSave.faviconUrl);
    } else {
      toast({
        title: "Lỗi!",
        description: "Không thể lưu cài đặt. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  const isCurrentlyUploading = isUploadingLogo || isUploadingFavicon;

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary flex items-center">
            <Settings className="w-6 h-6 mr-2" /> Cài Đặt Chung Website
          </CardTitle>
          <CardDescription>Quản lý thông tin cơ bản và liên hệ của website.</CardDescription>
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
          <Settings className="w-7 h-7 mr-2" /> Cài Đặt Chung Website
        </CardTitle>
        <CardDescription>Quản lý thông tin cơ bản như logo, favicon, tiêu đề, mô tả, chi tiết liên hệ và mạng xã hội của website.</CardDescription>
      </CardHeader>
      <form onSubmit={mainFormHandleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {/* Site Info & Branding */}
          <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-secondary/20">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2 mb-4">Thông Tin Trang & Thương Hiệu</h3>
            <div className="space-y-2">
                <Label htmlFor="companyName" className="font-semibold">Tên Công Ty/Website</Label>
                <Input id="companyName" {...mainFormRegister("companyName")} placeholder="Plevia City" />
                {mainFormErrors.companyName && <p className="text-sm text-destructive">{mainFormErrors.companyName.message}</p>}
            </div>

            {/* Logo Management */}
            <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
                <Label className="font-semibold text-md text-foreground block mb-1">Quản Lý Logo</Label>
                <div className="space-y-2">
                    <Label htmlFor="logoFileSiteSettings">Chọn file Logo (nếu muốn thay đổi)</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="logoFileSiteSettings"
                            type="file"
                            accept="image/png, image/jpeg, image/gif, image/svg+xml, image/webp"
                            onChange={handleLogoFileChange}
                            className="flex-grow"
                            ref={logoInputRef}
                        />
                        {pendingLogoFile && (
                            <Button variant="ghost" size="icon" onClick={clearPendingLogoFile} aria-label="Xóa file logo đã chọn" className="text-destructive hover:text-destructive/80">
                                <XCircle className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                    {pendingLogoFile && <p className="text-xs text-muted-foreground mt-1">Đã chọn: {pendingLogoFile.name}. Logo sẽ được upload khi lưu.</p>}
                </div>
                <div className="relative flex items-center my-2">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">Hoặc</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="logoUrl" className="font-semibold">Nhập URL Logo (nếu không chọn file)</Label>
                    <Input
                        id="logoUrl"
                        type="url"
                        {...mainFormRegister("logoUrl")}
                        placeholder="https://example.com/logo.png"
                        disabled={!!pendingLogoFile}
                        onChange={handleManualLogoUrlChange}
                    />
                    {mainFormErrors.logoUrl && !pendingLogoFile && <p className="text-sm text-destructive">{mainFormErrors.logoUrl.message}</p>}
                </div>
                 {(previewLogoUrl || defaultSiteSettingsData.logoUrl) && (
                    <div className="mt-2 space-y-1">
                        <Label className="text-sm font-semibold">Xem trước logo:</Label>
                        <div className="border rounded-md p-2 bg-muted/30 max-w-[150px]">
                        <NextImage
                            src={previewLogoUrl || defaultSiteSettingsData.logoUrl || "https://placehold.co/150x75.png?text=Logo"}
                            alt="Xem trước logo"
                            width={150}
                            height={75}
                            className="rounded-md object-contain max-h-[75px] w-auto"
                            data-ai-hint="website logo"
                            onError={() => {
                                setPreviewLogoUrl("https://placehold.co/150x75.png?text=Lỗi+URL");
                            }}
                        />
                        </div>
                    </div>
                )}
            </div>


            {/* Favicon Management */}
            <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
                <Label className="font-semibold text-md text-foreground block mb-1">Quản Lý Favicon</Label>
                <div className="space-y-2">
                    <Label htmlFor="faviconFileSiteSettings">Chọn file Favicon (nếu muốn thay đổi)</Label>
                     <div className="flex items-center gap-2">
                        <Input
                            id="faviconFileSiteSettings"
                            type="file"
                            accept="image/x-icon, image/png, image/svg+xml, image/gif"
                            onChange={handleFaviconFileChange}
                            className="flex-grow"
                            ref={faviconInputRef}
                        />
                        {pendingFaviconFile && (
                            <Button variant="ghost" size="icon" onClick={clearPendingFaviconFile} aria-label="Xóa file favicon đã chọn" className="text-destructive hover:text-destructive/80">
                                <XCircle className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                    {pendingFaviconFile && <p className="text-xs text-muted-foreground mt-1">Đã chọn: {pendingFaviconFile.name}. Favicon sẽ được upload khi lưu.</p>}
                </div>
                 <div className="relative flex items-center my-2">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">Hoặc</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="faviconUrl" className="font-semibold">Nhập URL Favicon (nếu không chọn file)</Label>
                    <Input
                        id="faviconUrl"
                        type="url"
                        {...mainFormRegister("faviconUrl")}
                        placeholder="https://example.com/favicon.ico"
                        disabled={!!pendingFaviconFile}
                        onChange={handleManualFaviconUrlChange}
                    />
                    {mainFormErrors.faviconUrl && !pendingFaviconFile && <p className="text-sm text-destructive">{mainFormErrors.faviconUrl.message}</p>}
                </div>
                {(previewFaviconUrl || defaultSiteSettingsData.faviconUrl) && (
                    <div className="mt-2 space-y-1">
                        <Label className="text-sm font-semibold">Xem trước favicon:</Label>
                        <div className="border rounded-md p-1 bg-muted/30 w-10 h-10 flex items-center justify-center">
                        <NextImage
                            src={previewFaviconUrl || defaultSiteSettingsData.faviconUrl || "https://placehold.co/32x32.png?text=Fav"}
                            alt="Xem trước favicon"
                            width={32}
                            height={32}
                            className="object-contain"
                            data-ai-hint="website favicon"
                            onError={() => {
                                setPreviewFaviconUrl("https://placehold.co/32x32.png?text=Lỗi");
                            }}
                        />
                        </div>
                    </div>
                )}
            </div>


            <div className="space-y-2">
              <Label htmlFor="siteTitle" className="font-semibold">Tiêu Đề Trang (SEO)</Label>
              <Input id="siteTitle" {...mainFormRegister("siteTitle")} placeholder="Tiêu đề hiển thị trên tab trình duyệt và kết quả tìm kiếm" />
              {mainFormErrors.siteTitle && <p className="text-sm text-destructive">{mainFormErrors.siteTitle.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="font-semibold">Mô Tả Trang (SEO)</Label>
              <Textarea id="siteDescription" {...mainFormRegister("siteDescription")} placeholder="Mô tả ngắn gọn về website cho SEO" rows={3}/>
              {mainFormErrors.siteDescription && <p className="text-sm text-destructive">{mainFormErrors.siteDescription.message}</p>}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-secondary/20">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2 mb-4">Thông Tin Liên Hệ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="font-semibold">Số Điện Thoại</Label>
                <Input id="contactPhone" type="tel" {...mainFormRegister("contactPhone")} placeholder="(+84) 123 456 789" />
                {mainFormErrors.contactPhone && <p className="text-sm text-destructive">{mainFormErrors.contactPhone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="font-semibold">Email Liên Hệ</Label>
                <Input id="contactEmail" type="email" {...mainFormRegister("contactEmail")} placeholder="info@example.com" />
                {mainFormErrors.contactEmail && <p className="text-sm text-destructive">{mainFormErrors.contactEmail.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactAddress" className="font-semibold">Địa Chỉ</Label>
              <Textarea id="contactAddress" {...mainFormRegister("contactAddress")} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" rows={3}/>
              {mainFormErrors.contactAddress && <p className="text-sm text-destructive">{mainFormErrors.contactAddress.message}</p>}
            </div>
          </div>

           {/* Social Links Management */}
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center">
                <LinkIcon className="w-5 h-5 mr-2 text-primary" />
                <CardTitle className="text-lg font-semibold text-foreground">Quản Lý Mạng Xã Hội</CardTitle>
              </div>
              <Button type="button" onClick={handleAddNewSocialLink} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm MXH
              </Button>
            </CardHeader>
            <CardContent>
              {socialLinkFields.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Chưa có liên kết mạng xã hội nào.</p>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <ShadTableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Icon</TableHead>
                        <TableHead>Tên Nền Tảng</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="text-right w-[120px]">Hành Động</TableHead>
                      </TableRow>
                    </ShadTableHeader>
                    <TableBody>
                      {socialLinkFields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell className="align-top">
                            <DynamicLucideIcon name={field.iconName} className="w-6 h-6 text-primary" />
                          </TableCell>
                          <TableCell className="font-medium align-top">{field.platformName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-xs truncate align-top">
                            <a href={field.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{field.url}</a>
                          </TableCell>
                          <TableCell className="text-right align-top">
                            <Button type="button" variant="ghost" size="icon" onClick={() => handleEditSocialLink(field, index)} className="mr-2 hover:text-primary">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)} className="hover:text-destructive">
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
          </Card>


        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving || isLoading || isCurrentlyUploading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSaving || isCurrentlyUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? (isCurrentlyUploading ? "Đang upload & lưu..." : "Đang lưu...") : "Lưu Tất Cả Thay Đổi"}
          </Button>
        </CardFooter>
      </form>

      {/* Social Link Dialog */}
      <Dialog open={isSocialLinkDialogOpen} onOpenChange={setIsSocialLinkDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingSocialLink ? "Chỉnh Sửa Liên Kết Mạng Xã Hội" : "Thêm Liên Kết Mạng Xã Hội Mới"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={socialLinkForm.handleSubmit(onSocialLinkSubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div>
                <Label htmlFor="platformNameSocial">Tên Nền Tảng</Label>
                <Input id="platformNameSocial" {...socialLinkForm.register("platformName")} placeholder="Ví dụ: Facebook, Zalo" />
                {socialLinkForm.formState.errors.platformName && <p className="text-sm text-destructive mt-1">{socialLinkForm.formState.errors.platformName.message}</p>}
              </div>
              <div>
                <Label htmlFor="iconNameSocial">Tên Icon (Lucide) hoặc URL Ảnh</Label>
                <Input id="iconNameSocial" {...socialLinkForm.register("iconName")} placeholder="Ví dụ: Facebook HOẶC https://example.com/icon.svg" />
                {socialLinkForm.formState.errors.iconName && <p className="text-sm text-destructive mt-1">{socialLinkForm.formState.errors.iconName.message}</p>}
                 <p className="text-xs text-muted-foreground mt-1">
                  Nhập tên icon từ thư viện{' '}
                  <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    Lucide Icons
                  </a> (ví dụ: "Facebook", "Instagram") hoặc nhập một URL đầy đủ đến file ảnh (ví dụ: https://...).
                </p>
              </div>
              <div>
                <Label htmlFor="urlSocial">URL</Label>
                <Input id="urlSocial" type="url" {...socialLinkForm.register("url")} placeholder="https://www.facebook.com/yourpage" />
                {socialLinkForm.formState.errors.url && <p className="text-sm text-destructive mt-1">{socialLinkForm.formState.errors.url.message}</p>}
              </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">Hủy</Button>
              </DialogClose>
              <Button type="submit" disabled={socialLinkForm.formState.isSubmitting} className="bg-primary hover:bg-primary/90">
                {socialLinkForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingSocialLink ? "Lưu Thay Đổi" : "Thêm Liên Kết"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </Card>
  );
}


