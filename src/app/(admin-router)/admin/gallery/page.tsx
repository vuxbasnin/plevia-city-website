"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase-browser";
import Image from "next/image";

// Màn hình upload ảnh mới
function GalleryImageUploadScreen({
  onBack,
  onUploaded,
}: {
  onBack: () => void;
  onUploaded: () => void;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "gallery");
      formData.append("createdBy", user?.displayName || user?.email || "admin");

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error((errorData as any).error || "Upload failed");
      }

      const result = await response.json();
      return (result as any).url as string;
    } catch (error) {
      console.error("Upload error:", error);
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

        successCount++;
      } catch (e) {
        console.error("Upload/save error:", e);
        failCount++;
      }
    }
    if (successCount > 0) {
      toast({
        title: "Thành công",
        description: `Đã upload ${successCount} ảnh!`,
      });
    }
    if (failCount > 0) {
      toast({
        title: "Lỗi",
        description: `Có ${failCount} ảnh upload thất bại!`,
        variant: "destructive",
      });
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
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <Input
          placeholder="Chú thích ảnh (tùy chọn)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          onClick={handleUpload}
          disabled={!files || files.length === 0 || isUploading}
        >
          {isUploading ? "Đang upload..." : "Upload mẫu nhà"}
        </Button>
        <Button variant="outline" onClick={onBack}>
          Quay lại
        </Button>
      </div>
      {/* Hiển thị danh sách file đã chọn */}
      {files && files.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          Đã chọn {files.length} mẫu nhà:{" "}
          {Array.from(files)
            .map((f) => f.name)
            .join(", ")}
        </div>
      )}
    </div>
  );
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false); // State chuyển màn hình

  // const didFetchRef = useRef(false);
  useEffect(() => {
    // if (didFetchRef.current) return; // guard against React Strict Mode double-invoke in dev
    // didFetchRef.current = true;
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("image").select("*");
    console.log("data", data);
    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }
    setImages(data || []);
  };

  // Hàm xử lý xóa ảnh khỏi thư viện
  const handleDelete = async (id: string, url: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('image')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Delete DB error:', error);
        return;
      }
      fetchImages();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEditCaption = async (id: string, newCaption: string) => {
    // Note: Supabase table doesn't have caption field yet
    // This function is kept for future use when caption field is added
    console.log('Edit caption not implemented yet for Supabase');
  };

  // Nếu đang ở màn hình upload ảnh thì render màn hình upload
  if (showUpload) {
    return (
      <GalleryImageUploadScreen
        onBack={() => setShowUpload(false)}
        onUploaded={fetchImages}
      />
    );
  }

  // Màn hình gallery chính
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Mẫu nhà</h1>
      <Button onClick={() => setShowUpload(true)} className="mb-2">
        + Upload mẫu nhà mới
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img?.id}
            className="border rounded p-2 flex flex-col items-center"
          >
            <div className="text-xs text-gray-500 mb-1 truncate w-full">
              {img?.link_image}
            </div>
            <div className="relative w-full h-40">
              <Image
                src={img?.link_image}
                alt={img?.type || 'Gallery image'}
                className="w-full h-40 object-cover rounded"
                width={160}
                height={120}
                onError={(e) => {
                  console.error('Image load error:', img?.link_image);
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop';
                }}
              />
            </div>
            <div className="text-sm mt-2 text-center">
              <div className="font-medium">{img?.type}</div>
              <div className="text-gray-500">by {img?.created_by}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(img?.created_at).toLocaleDateString()}
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(img?.id, img?.link_image)}
              className="mt-2"
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
