
"use client";

import { useEffect, useState, type ChangeEvent, useRef } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader as ShadTableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getCommunityCultureSectionData, updateCommunityCultureSectionData } from "@/lib/firestoreService";
import {
  type CommunityCultureSectionData,
  type CultureImageItem as CultureImageItemType,
  type CultureFeatureItem,
  communityCultureFormSchema,
  cultureImageSchema,
  cultureFeatureSchema,
} from "@/types/landingPageAdmin";
import { Loader2, Save, PlusCircle, Edit, Trash2, Image as ImageIconLucide, Users, Palette, Video, XCircle } from "lucide-react";
import NextImage from "next/image";
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { CLOUDINARY } from "@/lib/cloudinary";
import SmartVideoPlayer from "@/components/shared/SmartVideoPlayer";

const VIDEO_MAX_SIZE_MB = 50;
const VIDEO_MAX_SIZE_BYTES = VIDEO_MAX_SIZE_MB * 1024 * 1024;

const defaultCultureData: CommunityCultureSectionData = {
  mainText: "",
  quote: "",
  quoteAuthor: "",
  gallery: [],
  features: [],
  videoUrl: "",
};

interface ManagedCultureImageItem extends CultureImageItemType {
  _tempFile?: File;
  _tempPreviewUrl?: string;
}


export default function ManageCultureAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [dialogImagePendingFile, setDialogImagePendingFile] = useState<File | null>(null);
  const [dialogImageLocalPreview, setDialogImageLocalPreview] = useState<string | null>(null);
  const dialogGalleryImageInputRef = useRef<HTMLInputElement>(null);


  const imageForm = useForm<CultureImageItemType>({
    resolver: zodResolver(cultureImageSchema),
    defaultValues: { id: '', imageUrl: '', description: '' }
  });
  const currentDialogImageFormUrl = imageForm.watch("imageUrl");

  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [editingFeatureIndex, setEditingFeatureIndex] = useState<number | null>(null);
  const featureForm = useForm<CultureFeatureItem>({
    resolver: zodResolver(cultureFeatureSchema),
    defaultValues: { id: '', icon: 'Users', title: '', description: '' }
  });

  const mainForm = useForm<CommunityCultureSectionData>({
    resolver: zodResolver(communityCultureFormSchema),
    defaultValues: defaultCultureData,
  });

  const { control, register, handleSubmit, reset, setValue: mainFormSetValue, getValues: mainFormGetValues } = mainForm;

  const { fields: galleryFields, append: appendImage, remove: removeImage, update: updateImage } = useFieldArray({
    control,
    name: "gallery",
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature, update: updateFeature } = useFieldArray({
    control,
    name: "features",
  });
  
  const [pendingVideoFile, setPendingVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const cultureVideoInputRef = useRef<HTMLInputElement>(null);
  const watchedVideoUrl = mainForm.watch("videoUrl");


  useEffect(() => {
    async function loadCultureData() {
      setIsLoading(true);
      try {
        const data = await getCommunityCultureSectionData();
        const loadedData = data || defaultCultureData;
        reset(loadedData);
        setVideoPreviewUrl(loadedData.videoUrl || null);
      } catch (error) {
        console.error("Error loading culture data:", error);
        toast({ title: "Lỗi tải dữ liệu", description: "Không thể tải dữ liệu Văn Hóa Cộng Đồng.", variant: "destructive" });
        reset(defaultCultureData);
        setVideoPreviewUrl(null);
      }
      setIsLoading(false);
    }
    loadCultureData();
  }, [reset, toast]);
  

  // Hàm xử lý khi chọn file video mới cho phần Văn hóa Cộng đồng
  const handleVideoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > VIDEO_MAX_SIZE_BYTES) {
        toast({
          title: "File quá lớn",
          description: `Video không được vượt quá ${VIDEO_MAX_SIZE_MB}MB.`,
          variant: "destructive",
        });
        if (cultureVideoInputRef.current) cultureVideoInputRef.current.value = ""; 
        return;
      }
      setPendingVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
      mainFormSetValue("videoUrl", ""); 
    } else { 
        if(!pendingVideoFile) { // Only revert if no file is currently pending
            setVideoPreviewUrl(mainFormGetValues("videoUrl") || null);
        }
    }
  };

  // Hàm xóa file video đang chọn (nếu có)
  const clearPendingVideoFile = () => {
    setPendingVideoFile(null);
    if (cultureVideoInputRef.current) {
        cultureVideoInputRef.current.value = "";
    }
    setVideoPreviewUrl(mainFormGetValues("videoUrl") || null);
  };
  
  // Hàm xử lý khi nhập/chỉnh sửa URL video thủ công
  const handleManualVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    mainFormSetValue("videoUrl", newUrl); 

    if (newUrl) {
        setPendingVideoFile(null); 
        if (cultureVideoInputRef.current) cultureVideoInputRef.current.value = "";
        setVideoPreviewUrl(newUrl); 
    } else {
        if (pendingVideoFile) {
            setVideoPreviewUrl(URL.createObjectURL(pendingVideoFile));
        } else {
            setVideoPreviewUrl(null);
        }
    }
  };


  // Handles the main form submission for saving all Community Culture data, including uploading video and gallery images to Cloudinary, then saving to Firestore.
  const onMainSubmit: SubmitHandler<CommunityCultureSectionData> = async (data) => {
    if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
      toast({ title: "Cấu hình Cloudinary bị thiếu", description: "Vui lòng kiểm tra file .env và src/lib/cloudinary.ts.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    let dataToSave = { ...data };

    try {
      // 1. Handle Video Upload
      if (pendingVideoFile) {
        try {
          const uploadedVideoUrl = await uploadFileToCloudinary(pendingVideoFile, "landingpage_images/culture_video");
          dataToSave.videoUrl = uploadedVideoUrl;
          setPendingVideoFile(null); 
          if(cultureVideoInputRef.current) cultureVideoInputRef.current.value = "";
        } catch (uploadError: any) {
          toast({
            title: "Lỗi Upload Video",
            description: uploadError.message || "Không thể upload video lên Cloudinary.",
            variant: "destructive"
          });
        }
      }

      // 2. Handle Gallery Image Uploads
      const currentGallery = mainFormGetValues("gallery") as ManagedCultureImageItem[];
      const uploadedGalleryItemsPromises = currentGallery.map(async (imageItem, index) => {
        if (imageItem._tempFile) {
          try {
            const newImageUrl = await uploadFileToCloudinary(imageItem._tempFile, "landingpage_images/culture_gallery");
            const { _tempFile, _tempPreviewUrl, ...rest } = imageItem;
            return { ...rest, imageUrl: newImageUrl };
          } catch (uploadError: any) {
            toast({
              title: `Lỗi Upload Ảnh "${imageItem.description || `Ảnh ${index + 1}`}"`,
              description: uploadError.message || "Không thể upload ảnh lên Cloudinary.",
              variant: "destructive"
            });
            const { _tempFile, _tempPreviewUrl, ...rest } = imageItem;
            return { ...rest, imageUrl: imageItem.imageUrl || "https://placehold.co/400x300.png?text=Upload+Failed" };
          }
        }
        const { _tempFile, _tempPreviewUrl, ...rest } = imageItem; 
        return rest;
      });

      const finalGalleryToSave = await Promise.all(uploadedGalleryItemsPromises);
      dataToSave.gallery = finalGalleryToSave;

      // 3. Save all data to Firestore
      const success = await updateCommunityCultureSectionData(dataToSave);
      if (success) {
        toast({ title: "Đã lưu thành công!", description: "Nội dung Văn Hóa Cộng Đồng đã được cập nhật.", variant: "default" });
        reset(dataToSave); 
        setVideoPreviewUrl(dataToSave.videoUrl || null); 
      } else {
        toast({ title: "Lỗi Lưu Dữ Liệu!", description: "Không thể lưu nội dung. Vui lòng thử lại.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Lỗi Xử Lý Lưu", description: error.message || "Đã có lỗi xảy ra trong quá trình lưu.", variant: "destructive" });
    }
    setIsSaving(false);
  };

  // Hàm mở dialog thêm ảnh mới vào thư viện ảnh
  const handleAddNewImage = () => {
    setEditingImageIndex(null);
    imageForm.reset({ id: '', imageUrl: '', description: '' });
    setDialogImagePendingFile(null);
    setDialogImageLocalPreview(null);
    if (dialogGalleryImageInputRef.current) dialogGalleryImageInputRef.current.value = "";
    setIsImageDialogOpen(true);
  };

  // Hàm mở dialog chỉnh sửa ảnh trong thư viện theo index
  const handleEditImage = (index: number) => {
    const imageToEdit = galleryFields[index] as ManagedCultureImageItem;
    setEditingImageIndex(index);
    imageForm.reset({
      id: imageToEdit.id,
      imageUrl: imageToEdit._tempFile ? '' : (imageToEdit.imageUrl || ''), 
      description: imageToEdit.description
    });
    setDialogImagePendingFile(imageToEdit._tempFile || null);
    setDialogImageLocalPreview(imageToEdit._tempPreviewUrl || imageToEdit.imageUrl || null);
    if (dialogGalleryImageInputRef.current) dialogGalleryImageInputRef.current.value = "";
    setIsImageDialogOpen(true);
  };

  // Hàm xử lý khi chọn file ảnh mới trong dialog ảnh
  const handleImageDialogFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setDialogImagePendingFile(file);
      setDialogImageLocalPreview(URL.createObjectURL(file));
      imageForm.setValue("imageUrl", ""); 
    } else {
        if(!dialogImagePendingFile) {
             setDialogImageLocalPreview(imageForm.getValues("imageUrl") || null);
        }
    }
  };

  // Hàm xóa file ảnh đang chọn trong dialog ảnh
  const clearDialogImagePendingFile = () => {
    setDialogImagePendingFile(null);
    if (dialogGalleryImageInputRef.current) {
      dialogGalleryImageInputRef.current.value = "";
    }
    setDialogImageLocalPreview(imageForm.getValues("imageUrl") || null);
  };
  
  // Hàm xử lý khi nhập/chỉnh sửa URL ảnh thủ công trong dialog ảnh
  const handleManualImageUrlChangeDialog = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    imageForm.setValue("imageUrl", newUrl);
    if (newUrl) {
        setDialogImagePendingFile(null); 
        if (dialogGalleryImageInputRef.current) dialogGalleryImageInputRef.current.value = "";
        setDialogImageLocalPreview(newUrl); 
    } else if (dialogImagePendingFile) {
        setDialogImageLocalPreview(URL.createObjectURL(dialogImagePendingFile));
    } else {
        setDialogImageLocalPreview(null);
    }
  };


  // Hàm submit form dialog ảnh, thêm hoặc cập nhật ảnh trong gallery
  const onImageSubmit: SubmitHandler<CultureImageItemType> = (formDataFromDialog) => {
    let managedItem: ManagedCultureImageItem = {
      id: editingImageIndex !== null ? galleryFields[editingImageIndex].id : Date.now().toString(),
      imageUrl: formDataFromDialog.imageUrl,
      description: formDataFromDialog.description,
    };

    if (dialogImagePendingFile) {
      managedItem._tempFile = dialogImagePendingFile;
      managedItem._tempPreviewUrl = dialogImageLocalPreview || undefined;
      managedItem.imageUrl = ""; 
    } else if (!formDataFromDialog.imageUrl && editingImageIndex !== null && (galleryFields[editingImageIndex] as ManagedCultureImageItem)._tempFile) {
      const originalItem = galleryFields[editingImageIndex] as ManagedCultureImageItem;
      managedItem._tempFile = originalItem._tempFile;
      managedItem._tempPreviewUrl = originalItem._tempPreviewUrl;
      managedItem.imageUrl = ""; 
    } else if (!formDataFromDialog.imageUrl && !dialogImagePendingFile) {
       managedItem.imageUrl = "";
    }


    if (editingImageIndex !== null) {
      updateImage(editingImageIndex, managedItem);
    } else {
      appendImage(managedItem);
    }
    setIsImageDialogOpen(false);
    setDialogImagePendingFile(null);
    setDialogImageLocalPreview(null);
    if (dialogGalleryImageInputRef.current) dialogGalleryImageInputRef.current.value = "";
  };

  // Returns the preview image source for the image dialog, prioritizing local preview, then URL, then placeholder.
  const previewSrcForImageDialog = dialogImageLocalPreview || currentDialogImageFormUrl || "https://placehold.co/400x300.png?text=Chưa+có+ảnh";

  // Hàm mở dialog thêm đặc điểm mới cho phần Văn hóa Cộng đồng
  const handleAddNewFeature = () => {
    setEditingFeatureIndex(null);
    featureForm.reset({ id: '', icon: 'Users', title: '', description: '' });
    setIsFeatureDialogOpen(true);
  };

  // Hàm mở dialog chỉnh sửa đặc điểm theo index
  const handleEditFeature = (index: number) => {
    setEditingFeatureIndex(index);
    featureForm.reset(featureFields[index]);
    setIsFeatureDialogOpen(true);
  };

  // Hàm submit form dialog đặc điểm, thêm hoặc cập nhật đặc điểm
  const onFeatureSubmit: SubmitHandler<CultureFeatureItem> = (data) => {
    if (editingFeatureIndex !== null) {
      updateFeature(editingFeatureIndex, { ...data, id: featureFields[editingFeatureIndex].id });
    } else {
      appendFeature({ ...data, id: Date.now().toString() });
    }
    setIsFeatureDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg rounded-xl"><CardHeader><CardTitle className="text-2xl font-headline text-primary flex items-center"><Users className="w-6 h-6 mr-2" /> Quản Lý Văn Hóa Cộng Đồng</CardTitle><CardDescription>Chỉnh sửa nội dung, hình ảnh và các điểm nổi bật về văn hóa.</CardDescription></CardHeader><CardContent className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-2 text-muted-foreground">Đang tải dữ liệu...</p></CardContent></Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onMainSubmit)}>
      <Card className="shadow-lg rounded-xl">
        <CardHeader><CardTitle className="text-2xl font-headline text-primary flex items-center"><Users className="w-7 h-7 mr-2" /> Quản Lý Văn Hóa Cộng Đồng</CardTitle><CardDescription>Chỉnh sửa nội dung. Ảnh/Video sẽ được upload lên Cloudinary khi nhấn "Lưu Tất Cả Thay Đổi".</CardDescription></CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label htmlFor="mainText" className="font-semibold">Nội dung chính</Label><Textarea id="mainText" {...register("mainText")} rows={5} placeholder="Mô tả chung..." />{mainForm.formState.errors.mainText && <p className="text-sm text-destructive">{mainForm.formState.errors.mainText.message}</p>}</div>
            <div className="space-y-6"><div className="space-y-2"><Label htmlFor="quote" className="font-semibold">Trích dẫn</Label><Input id="quote" {...register("quote")} placeholder="Trích dẫn truyền cảm hứng..." />{mainForm.formState.errors.quote && <p className="text-sm text-destructive">{mainForm.formState.errors.quote.message}</p>}</div><div className="space-y-2"><Label htmlFor="quoteAuthor" className="font-semibold">Tác giả trích dẫn</Label><Input id="quoteAuthor" {...register("quoteAuthor")} placeholder="Tên người chia sẻ..." />{mainForm.formState.errors.quoteAuthor && <p className="text-sm text-destructive">{mainForm.formState.errors.quoteAuthor.message}</p>}</div></div>
          </div>
          
          <Card className="border-border shadow-sm">
            <CardHeader className="py-4"><div className="flex items-center"><Video className="w-5 h-5 mr-2 text-primary" /><CardTitle className="text-lg font-semibold text-foreground">Video Văn Hóa (Tùy chọn)</CardTitle></div></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="videoFileCulture">Chọn video từ máy tính (.mp4, .webm, tối đa {VIDEO_MAX_SIZE_MB}MB)</Label>
                <div className="flex items-center gap-2">
                    <Input 
                        id="videoFileCulture" 
                        type="file" 
                        accept=".mp4,.webm" 
                        onChange={handleVideoFileChange} 
                        className="flex-grow"
                        ref={cultureVideoInputRef}
                    />
                    {pendingVideoFile && (
                        <Button variant="ghost" size="icon" onClick={clearPendingVideoFile} aria-label="Xóa video đã chọn" className="text-destructive hover:text-destructive/80">
                            <XCircle className="w-5 h-5" />
                        </Button>
                    )}
                </div>
                {pendingVideoFile && <p className="text-xs text-muted-foreground">Đã chọn: {pendingVideoFile.name}. Video sẽ được upload khi lưu.</p>}
              </div>
              <div className="relative flex items-center my-1"><div className="flex-grow border-t border-border"></div><span className="flex-shrink mx-2 text-xs text-muted-foreground uppercase">Hoặc</span><div className="flex-grow border-t border-border"></div></div>
              <div className="space-y-2">
                <Label htmlFor="videoUrlCulture">Nhập URL Video (nếu không chọn file)</Label>
                <Input 
                  id="videoUrlCulture" 
                  {...register("videoUrl")} 
                  type="url" 
                  placeholder="https://example.com/video.mp4 hoặc link YouTube/Vimeo" 
                  disabled={!!pendingVideoFile} 
                  onChange={handleManualVideoUrlChange}
                />
                {mainForm.formState.errors.videoUrl && !pendingVideoFile && <p className="text-sm text-destructive mt-1">{mainForm.formState.errors.videoUrl.message}</p>}
                 <p className="text-xs text-muted-foreground mt-1">
                  Lưu ý: Xem trước video hoạt động tốt nhất với link trực tiếp đến file video (.mp4, .webm) hoặc link YouTube/Vimeo.
                </p>
              </div>
              {videoPreviewUrl && (
                <div className="mt-2 space-y-1">
                  <Label className="text-sm font-semibold">Xem trước video:</Label>
                  <div className="max-w-md mx-auto">
                     <SmartVideoPlayer 
                        src={videoPreviewUrl} 
                        aspectRatio="16/9"
                        controls={true}
                        muted={true} 
                        fallbackMessage={<p className="text-xs text-muted-foreground p-2 text-center">Không thể xem trước. Đảm bảo URL hợp lệ.</p>}
                      />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>


          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4"><div className="flex items-center"><ImageIconLucide className="w-5 h-5 mr-2 text-primary" /><CardTitle className="text-lg font-semibold text-foreground">Thư Viện Ảnh</CardTitle></div><Button type="button" onClick={handleAddNewImage} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Thêm Ảnh</Button></CardHeader>
            <CardContent>
              {galleryFields.length === 0 ? <p className="text-muted-foreground text-center py-4">Chưa có ảnh.</p> : (
                <div className="border rounded-md"><Table><ShadTableHeader><TableRow><TableHead className="w-[100px]">Xem Trước</TableHead><TableHead>Mô Tả</TableHead><TableHead className="text-right w-[120px]">Hành Động</TableHead></TableRow></ShadTableHeader><TableBody>
                  {(galleryFields as ManagedCultureImageItem[]).map((field, index) => (
                    <TableRow key={field.id}><TableCell>
                      <NextImage
                        src={field._tempPreviewUrl || field.imageUrl || "https://placehold.co/100x75.png?text=Chưa+có+ảnh"}
                        alt={field.description || "Culture image"}
                        width={80}
                        height={60}
                        className="rounded object-cover aspect-[4/3]"
                        data-ai-hint="culture team"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x75.png?text=Lỗi" }}
                      />
                    </TableCell><TableCell className="font-medium max-w-xs truncate">{field.description}</TableCell><TableCell className="text-right">
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleEditImage(index)} className="mr-2 hover:text-primary"><Edit className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)} className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell></TableRow>
                  ))}
                </TableBody></Table></div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-4"><div className="flex items-center"><Palette className="w-5 h-5 mr-2 text-primary" /><CardTitle className="text-lg font-semibold text-foreground">Đặc Điểm Văn Hóa</CardTitle></div><Button type="button" onClick={handleAddNewFeature} variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Thêm Đặc Điểm</Button></CardHeader>
            <CardContent>
              {featureFields.length === 0 ? <p className="text-muted-foreground text-center py-4">Chưa có đặc điểm.</p> : (
                <div className="border rounded-md"><Table><ShadTableHeader><TableRow><TableHead className="w-[80px]">Icon</TableHead><TableHead>Tiêu Đề</TableHead><TableHead>Mô Tả</TableHead><TableHead className="text-right w-[120px]">Hành Động</TableHead></TableRow></ShadTableHeader><TableBody>
                  {featureFields.map((field, index) => (
                    <TableRow key={field.id}><TableCell className="align-top"><DynamicLucideIcon name={field.icon} className="w-6 h-6 text-primary object-contain" /></TableCell><TableCell className="font-medium align-top">{field.title}</TableCell><TableCell className="text-sm text-muted-foreground max-w-xs truncate align-top">{field.description}</TableCell><TableCell className="text-right align-top">
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleEditFeature(index)} className="mr-2 hover:text-primary"><Edit className="h-4 w-4" /></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell></TableRow>
                  ))}
                </TableBody></Table></div>
              )}
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSaving || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Đang xử lý..." : "Lưu Tất Cả Thay Đổi"}
          </Button>
        </CardFooter>
      </Card>

      {/* Image Management Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh] flex flex-col">
          <DialogHeader><DialogTitle>{editingImageIndex !== null ? "Chỉnh Sửa Ảnh" : "Thêm Ảnh Mới"}</DialogTitle></DialogHeader>
          <form onSubmit={imageForm.handleSubmit(onImageSubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div className="space-y-2 border p-3 rounded-md bg-secondary/20">
                <Label className="font-semibold text-foreground">Quản lý ảnh</Label>
                <div className="space-y-1">
                    <Label htmlFor="galleryDialogImageFileCulture">Chọn ảnh mới từ máy tính</Label>
                    <div className="flex items-center gap-2">
                        <Input 
                            id="galleryDialogImageFileCulture" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageDialogFileChange} 
                            className="flex-grow"
                            ref={dialogGalleryImageInputRef}
                        />
                        {dialogImagePendingFile && (
                            <Button variant="ghost" size="icon" onClick={clearDialogImagePendingFile} aria-label="Xóa file đã chọn" className="text-destructive hover:text-destructive/80">
                                <XCircle className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                    {dialogImagePendingFile && <p className="text-xs text-muted-foreground mt-1">Đã chọn: {dialogImagePendingFile.name}.<br />Ảnh sẽ được upload khi lưu toàn bộ section.</p>}
                </div>
                <div className="relative flex items-center my-1"><div className="flex-grow border-t border-border"></div><span className="flex-shrink mx-2 text-xs text-muted-foreground uppercase">Hoặc</span><div className="flex-grow border-t border-border"></div></div>
                <div><Label htmlFor="imageUrlDialog">Nhập URL Hình Ảnh (nếu không chọn file)</Label>
                  <Input 
                    id="imageUrlDialog" 
                    {...imageForm.register("imageUrl")} 
                    type="url" 
                    disabled={!!dialogImagePendingFile} 
                    placeholder="https://..."
                    onChange={handleManualImageUrlChangeDialog}
                   />
                  {imageForm.formState.errors.imageUrl && !dialogImagePendingFile && <p className="text-sm text-destructive mt-1">{imageForm.formState.errors.imageUrl.message}</p>}
                </div>
              </div>

              {(previewSrcForImageDialog !== "https://placehold.co/400x300.png?text=Chưa+có+ảnh" || dialogImagePendingFile) && (
                <div className="mt-2 space-y-1"><Label className="text-sm font-semibold">Xem trước:</Label><div className="border rounded-md p-2 bg-muted/30 max-w-[200px] mx-auto">
                  <NextImage
                    src={previewSrcForImageDialog}
                    alt="Xem trước"
                    width={200}
                    height={150}
                    className="rounded-md object-contain max-h-[150px] w-auto mx-auto aspect-[4/3]"
                    data-ai-hint="culture team event"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x150.png?text=Lỗi" }} />
                </div></div>
              )}

              <div><Label htmlFor="imageDescription">Mô tả ảnh</Label><Input id="imageDescription" {...imageForm.register("description")} />{imageForm.formState.errors.description && <p className="text-sm text-destructive mt-1">{imageForm.formState.errors.description.message}</p>}</div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild><Button type="button" variant="outline">Hủy</Button></DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingImageIndex !== null ? "Cập Nhật Ảnh trong DS" : "Thêm Ảnh vào DS"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feature Management Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[85vh] flex flex-col">
          <DialogHeader><DialogTitle>{editingFeatureIndex !== null ? "Chỉnh Sửa Đặc Điểm" : "Thêm Đặc Điểm Mới"}</DialogTitle></DialogHeader>
          <form onSubmit={featureForm.handleSubmit(onFeatureSubmit)} className="flex-grow flex flex-col min-h-0">
            <div className="space-y-4 py-4 px-2 overflow-y-auto pr-3 flex-grow">
              <div>
                <Label htmlFor="featureIcon">Icon (Tên Lucide hoặc URL Ảnh)</Label>
                <Input id="featureIcon" {...featureForm.register("icon")} placeholder="Ví dụ: Users HOẶC https://example.com/icon.png" />
                {featureForm.formState.errors.icon && <p className="text-sm text-destructive mt-1">{featureForm.formState.errors.icon.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">Nhập tên từ <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Lucide Icons</a> hoặc URL ảnh.</p>
              </div>
              <div><Label htmlFor="featureTitle">Tiêu đề đặc điểm</Label><Input id="featureTitle" {...featureForm.register("title")} />{featureForm.formState.errors.title && <p className="text-sm text-destructive mt-1">{featureForm.formState.errors.title.message}</p>}</div>
              <div><Label htmlFor="featureDescription">Mô tả</Label><Textarea id="featureDescription" {...featureForm.register("description")} />{featureForm.formState.errors.description && <p className="text-sm text-destructive mt-1">{featureForm.formState.errors.description.message}</p>}</div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t">
              <DialogClose asChild><Button type="button" variant="outline">Hủy</Button></DialogClose>
              <Button type="submit" disabled={featureForm.formState.isSubmitting || isSaving} className="bg-primary hover:bg-primary/90">
                {(featureForm.formState.isSubmitting || isSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingFeatureIndex !== null ? "Lưu Thay Đổi" : "Thêm Đặc Điểm"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </form>
  );
}

    

