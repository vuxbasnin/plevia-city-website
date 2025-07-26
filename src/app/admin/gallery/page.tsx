"use client";
import { useState, useEffect } from "react";
import { getGalleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImageCaption } from "@/lib/firestoreService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Màn hình upload ảnh mới
function GalleryImageUploadScreen({ onBack, onUploaded }: { onBack: () => void, onUploaded: () => void }) {
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
        await addGalleryImage({ url, caption, uploadedBy });
        successCount++;
      } catch (e) {
        failCount++;
      }
    }
    if (successCount > 0) {
      toast({ title: "Thành công", description: `Đã upload ${successCount} ảnh!` });
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
      <h1 className="text-2xl font-bold">Upload Mẫu nhà mới</h1>
      <div className="flex gap-2 items-end">
        {/* Cho phép chọn nhiều file */}
        <Input type="file" accept="image/*" multiple onChange={e => setFiles(e.target.files)} />
        <Input placeholder="Chú thích ảnh (tùy chọn)" value={caption} onChange={e => setCaption(e.target.value)} />
        <Button onClick={handleUpload} disabled={!files || files.length === 0 || isUploading}>
          {isUploading ? "Đang upload..." : "Upload mẫu nhà"}
        </Button>
        <Button variant="outline" onClick={onBack}>Quay lại</Button>
      </div>
      {/* Hiển thị danh sách file đã chọn */}
      {files && files.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          Đã chọn {files.length} mẫu nhà: {Array.from(files).map(f => f.name).join(", ")}
        </div>
      )}
    </div>
  );
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false); // State chuyển màn hình
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const imgs = await getGalleryImages();
    setImages(imgs);
  };

  // Hàm xử lý xóa ảnh khỏi thư viện
  // Chỉ xóa document ảnh trên Firestore, KHÔNG xóa file ảnh trên Cloudinary
  // => Ảnh sẽ không còn xuất hiện trên website/app, nhưng file vẫn còn trên Cloudinary (có thể dọn dẹp sau nếu cần)
  const handleDelete = async (id: string, url: string) => {
    await deleteGalleryImage(id); // Xóa document ảnh khỏi Firestore
    fetchImages(); // Refresh lại danh sách ảnh sau khi xóa
  };

  const handleEditCaption = async (id: string, newCaption: string) => {
    // Sửa caption trong Firestore
    await updateGalleryImageCaption(id, newCaption);
    fetchImages();
  };

  // Nếu đang ở màn hình upload ảnh thì render màn hình upload
  if (showUpload) {
    return <GalleryImageUploadScreen onBack={() => setShowUpload(false)} onUploaded={fetchImages} />;
  }

  // Màn hình gallery chính
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Mẫu nhà</h1>
      <Button onClick={() => setShowUpload(true)} className="mb-2">+ Upload mẫu nhà mới</Button>
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