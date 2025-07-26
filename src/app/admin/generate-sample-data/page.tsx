"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateSampleNews } from "@/scripts/generateSampleNews";

export default function GenerateSampleDataPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateNews = async () => {
    setIsGenerating(true);
    try {
      await generateSampleNews();
      toast({
        title: "Thành công!",
        description: "Đã tạo 10 bài viết mẫu thành công.",
      });
    } catch (error) {
      console.error("Lỗi khi tạo dữ liệu mẫu:", error);
      toast({
        title: "Lỗi!",
        description: "Không thể tạo dữ liệu mẫu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Tạo Dữ Liệu Mẫu</h1>
        <p className="text-muted-foreground mt-2">
          Tạo các bài viết mẫu để test và demo hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tạo Bài Viết Mẫu</CardTitle>
          <CardDescription>
            Script này sẽ tạo 10 bài viết mẫu về dự án Plevia City với nội dung đa dạng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Các bài viết sẽ được tạo:</h4>
              <ul className="text-sm space-y-1">
                <li>• Plevia City - Khởi công xây dựng khu đô thị thông minh</li>
                <li>• Tiến độ xây dựng Plevia City - Tháng 1/2025</li>
                <li>• Thiết kế kiến trúc độc đáo lấy cảm hứng từ văn hóa Tây Nguyên</li>
                <li>• Tiện ích đẳng cấp quốc tế cho cuộc sống hiện đại</li>
                <li>• Cơ hội đầu tư bất động sản tiềm năng tại Gia Lai</li>
                <li>• Cam kết bảo vệ môi trường và phát triển bền vững</li>
                <li>• Sự kiện ra mắt dự án thu hút hàng nghìn người tham gia</li>
                <li>• Hợp tác với các đối tác quốc tế nâng tầm dự án</li>
                <li>• Chính sách ưu đãi đặc biệt cho khách hàng đầu tiên</li>
                <li>• Tuyển dụng nhân sự chất lượng cao cho dự án</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleGenerateNews} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Đang tạo..." : "Tạo 10 Bài Viết Mẫu"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Lưu ý: Tất cả bài viết sẽ được đặt trạng thái "Đã xuất bản" và có thể xem ngay tại trang tin tức
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 