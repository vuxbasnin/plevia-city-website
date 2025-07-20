"use client";
import { useState, useEffect } from "react";
import { getGalleryImages, addGalleryImage, deleteGalleryImage, updateGalleryImageCaption } from "@/lib/firestoreService";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Màn hình upload ảnh mới
function GalleryImageUploadScreen({ onBack, onUploaded }: { onBack: () => void, onUploaded: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Hàm xử lý upload ảnh
  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFileToCloudinary(file, "gallery_images");
      // Lấy username: ưu tiên displayName, fallback sang email
      const uploadedBy = user?.displayName || user?.email || "unknown";
      await addGalleryImage({ url, caption, uploadedBy });
      toast({ title: "Thành công", description: "Đã upload ảnh!" });
      setFile(null);
      setCaption("");
      onUploaded(); // Gọi callback để reload gallery
      onBack(); // Quay lại màn hình gallery
    } catch (e) {
      toast({ title: "Lỗi", description: "Không upload được ảnh!", variant: "destructive" });
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upload Ảnh Mới</h1>
      <div className="flex gap-2 items-end">
        <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <Input placeholder="Chú thích ảnh (tùy chọn)" value={caption} onChange={e => setCaption(e.target.value)} />
        <Button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Đang upload..." : "Upload ảnh"}
        </Button>
        <Button variant="outline" onClick={onBack}>Quay lại</Button>
      </div>
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
      <h1 className="text-2xl font-bold">Quản lý Thư viện Ảnh</h1>
      <Button onClick={() => setShowUpload(true)} className="mb-2">+ Upload ảnh mới</Button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="border rounded p-2 flex flex-col items-center">
            <img src={img.url} alt={img.caption} className="w-full h-40 object-cover rounded" />
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