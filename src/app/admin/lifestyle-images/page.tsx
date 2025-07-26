"use client";
import { useState, useEffect } from "react";
import { addLifestyleImage, getLifestyleImages, deleteLifestyleImage, updateLifestyleImageCaption } from "@/lib/firestoreService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

function LifestyleImageUploadScreen({ onBack, onUploaded }: { onBack: () => void, onUploaded: () => void }) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'gallery_images');

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const url = await handleFileUpload(file);
        const uploadedBy = user?.displayName || user?.email || "unknown";
        await addLifestyleImage({ url, caption, uploadedBy });
        successCount++;
      } catch (e) {
        failCount++;
      }
    }
    if (successCount > 0) {
      toast({ title: "Thành công", description: `Đã upload ${successCount} ảnh lifestyle!` });
    }
    if (failCount > 0) {
      toast({ title: "Lỗi", description: `Có ${failCount} ảnh upload thất bại!`, variant: "destructive" });
    }
    setFiles(null);
    setCaption("");
    onUploaded();
    onBack();
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upload Ảnh Lifestyle mới</h1>
      <div className="flex gap-2 items-end">
        <Input type="file" accept="image/*" multiple onChange={e => setFiles(e.target.files)} />
        <Input placeholder="Chú thích ảnh (tùy chọn)" value={caption} onChange={e => setCaption(e.target.value)} />
        <Button onClick={handleUpload} disabled={!files || files.length === 0 || isUploading}>
          {isUploading ? "Đang upload..." : "Upload ảnh"}
        </Button>
        <Button variant="outline" onClick={onBack}>Quay lại</Button>
      </div>
      {files && files.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          Đã chọn {files.length} ảnh: {Array.from(files).map(f => f.name).join(", ")}
        </div>
      )}
    </div>
  );
}

export default function LifestyleImagesAdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const imgs = await getLifestyleImages();
    setImages(imgs);
  };

  const handleDelete = async (id: string, url: string) => {
    await deleteLifestyleImage(id);
    fetchImages();
  };

  const handleEditCaption = async (id: string, newCaption: string) => {
    await updateLifestyleImageCaption(id, newCaption);
    fetchImages();
  };

  if (showUpload) {
    return <LifestyleImageUploadScreen onBack={() => setShowUpload(false)} onUploaded={fetchImages} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Ảnh Lifestyle</h1>
      <Button onClick={() => setShowUpload(true)} className="mb-2">+ Upload ảnh lifestyle mới</Button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="border rounded p-2 flex flex-col items-center">
            <img src={img.url} alt={img.caption} className="w-full h-40 object-cover rounded" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
            <input
              className="text-sm mt-2 border rounded px-2 py-1 text-center"
              value={img.caption}
              onChange={e => handleEditCaption(img.id, e.target.value)}
            />
            <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id, img.url)} className="mt-2">Xóa</Button>
          </div>
        ))}
      </div>
    </div>
  );
} 