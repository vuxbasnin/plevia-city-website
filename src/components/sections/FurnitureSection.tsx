"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFurnitureImages } from "@/lib/firestoreService";
import { Loader2, Sofa } from "lucide-react";
import NextImage from "next/image";

interface FurnitureImage {
  id: string;
  url: string;
  caption: string;
  tags: string[];
  uploadedAt: number | null;
  uploadedBy: string;
}

export default function FurnitureSection() {
  const [furnitureImages, setFurnitureImages] = useState<FurnitureImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFurnitureImages() {
      try {
        setIsLoading(true);
        const images = await getFurnitureImages();
        setFurnitureImages(images as FurnitureImage[]);
        setError(null);
      } catch (err) {
        console.error("Error loading furniture images:", err);
        setError("Không thể tải dữ liệu mẫu nội thất");
        setFurnitureImages([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFurnitureImages();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">Đang tải mẫu nội thất...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (furnitureImages.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Sofa className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Các Mẫu Nội Thất</h2>
            <p className="text-muted-foreground">Chưa có mẫu nội thất nào được thêm.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Các Mẫu Nội Thất</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá bộ sưu tập nội thất đa dạng, từ thiết kế hiện đại đến cổ điển, 
            phù hợp với mọi không gian sống của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {furnitureImages.map((image) => (
            <Card key={image.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <NextImage
                  src={image.url}
                  alt={image.caption || "Mẫu nội thất"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop";
                  }}
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {image.caption || "Mẫu nội thất"}
                </CardTitle>
                {image.tags && image.tags.length > 0 && (
                  <CardDescription className="text-sm">
                    {image.tags.join(", ")}
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>

        {furnitureImages.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Hiển thị {furnitureImages.length} mẫu nội thất
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
