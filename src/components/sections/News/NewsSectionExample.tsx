"use client";

import React, { useState, useEffect } from 'react';
import NewsSection from './NewsSection';
import { getPublishedNewsArticles } from '@/lib/firestoreService';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

const NewsSectionExample: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        console.log('Loading published news articles for homepage...');
        const articles = await getPublishedNewsArticles(5); // Chỉ load 5 bài viết mới nhất
        console.log('Raw published articles from Firestore:', articles);
        
        // Transform NewsArticle to NewsItem format
        const transformedNews = articles.map(article => ({
          id: article.id,
          title: article.title,
          description: article.summary || 'Không có mô tả',
          imageUrl: article.coverImageUrl || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
          alt: article.title
        }));
        
        console.log('Transformed published news items for homepage:', transformedNews);
        setNewsItems(transformedNews);
      } catch (error) {
        console.error('Error loading published news for homepage:', error);
        // Fallback to empty array if error
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Đang tải tin tức...</div>
      </div>
    );
  }

  // Fallback data nếu không có bài viết nào đã publish
  if (newsItems.length === 0) {
    const fallbackNewsItems = [
      {
        id: '1',
        title: 'TỪ SỐNG LÂU ĐẾN SỐNG KHỎE: CÁCH THẾ HỆ MỚI ĐANG VIẾT LẠI TIÊU CHUẨN SỐNG ĐÔ THỊ',
        description: 'Giữa rừng thông, một mô hình sống khỏe đang được định hình, nơi thiên nhiên chữa lành, cộng đồng cùng đồng hành, và sức khỏe được chăm sóc như một phần của nhịp sống mỗi ngày.',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        alt: 'Modern bedroom with mountain view'
      },
      {
        id: '2',
        title: 'BẮC HẢI CÔNG BỐ ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC DỰ ÁN PLEVIA CITY',
        description: 'Hà Nội, ngày 14/06/2025 - Chủ đầu tư BẮC HẢI đã ký kết hợp tác cùng 10 đơn vị phân phối chính thức dự án Plevia City, đánh dấu cột mốc quan trọng trong chiến lược phát triển giai đoạn mới của dự án.',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
        alt: 'Business meeting and signing ceremony'
      },
      {
        id: '3',
        title: 'PLEVIA CITY HỢP TÁC VỚI PRIME MEDICAL CARE HOÀN THIỆN HỆ SINH THÁI SỐNG KHỎE',
        description: 'BẮC HẢI chính thức ký kết hợp tác với Trung tâm chăm sóc sức khỏe cao cấp Prime Medical Care (PMC), tích hợp mô hình y tế chủ động vào dự án Plevia City.',
        imageUrl: 'https://khangdienhcm.com/wp-content/uploads/2025/05/TIEN-DO-XAY-DUNG-GLADIA-KHANG-DIEN-THANG-06-2025-KDHCM-1024x576.jpg',
        alt: 'Healthcare partnership signing'
      }
    ];
    
    return (
      <div>
        <NewsSection 
          newsItems={fallbackNewsItems} 
          scrollInterval={5000}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Sử dụng NewsSection với dữ liệu thực từ Firestore (chỉ bài viết đã publish) */}
      <NewsSection 
        newsItems={newsItems} 
        scrollInterval={5000} // Scroll mỗi 5 giây
      />
    </div>
  );
};

export default NewsSectionExample; 