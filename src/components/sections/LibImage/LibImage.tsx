'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Title from '@/components/ui/Title/Title';
import './LibImage.css';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
}

const LibImage: React.FC = () => {
  // Dữ liệu ảnh mẫu - bạn có thể thay đổi theo nhu cầu
  const images: ImageItem[] = [
    { id: 1, src: '/images/lib1.jpg', alt: 'Thư viện 1', title: 'Không gian học tập' },
    { id: 2, src: '/images/lib2.jpg', alt: 'Thư viện 2', title: 'Khu vực đọc sách' },
    { id: 3, src: '/images/lib3.jpg', alt: 'Thư viện 3', title: 'Phòng họp nhóm' },
    { id: 4, src: '/images/lib4.jpg', alt: 'Thư viện 4', title: 'Khu vực thư giãn' },
    { id: 5, src: '/images/lib5.jpg', alt: 'Thư viện 5', title: 'Không gian sáng tạo' },
    { id: 6, src: '/images/lib6.jpg', alt: 'Thư viện 6', title: 'Khu vực làm việc' },
    { id: 7, src: '/images/lib7.jpg', alt: 'Thư viện 7', title: 'Phòng hội thảo' },
    { id: 8, src: '/images/lib8.jpg', alt: 'Thư viện 8', title: 'Khu vực networking' },
    { id: 9, src: '/images/lib9.jpg', alt: 'Thư viện 9', title: 'Không gian mở' },
    { id: 10, src: '/images/lib10.jpg', alt: 'Thư viện 10', title: 'Khu vực cafe' },
    { id: 11, src: '/images/lib11.jpg', alt: 'Thư viện 11', title: 'Phòng đào tạo' },
    { id: 12, src: '/images/lib12.jpg', alt: 'Thư viện 12', title: 'Khu vực triển lãm' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Chia đôi list ảnh
  const halfLength = Math.ceil(images.length / 2);
  const topRow = images.slice(0, halfLength); // List hiển thị bên trên
  const bottomRow = images.slice(halfLength); // List hiển thị bên dưới
  
  // Số lượng items hiển thị mỗi hàng (3 items)
  const itemsPerRow = 3;
  const maxIndex = Math.max(topRow.length - itemsPerRow, bottomRow.length - itemsPerRow);

  const nextPage = () => {
    if (currentIndex >= maxIndex) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Lấy items hiển thị cho mỗi hàng
  const getTopRowItems = () => {
    return topRow.slice(currentIndex, currentIndex + itemsPerRow);
  };

  const getBottomRowItems = () => {
    return bottomRow.slice(currentIndex, currentIndex + itemsPerRow);
  };

  const topItems = getTopRowItems();
  const bottomItems = getBottomRowItems();

  // Kiểm tra có thể scroll không
  const canScrollNext = currentIndex < maxIndex;
  const canScrollPrev = currentIndex > 0;

  return (
    <section className="lib-image">
      {/* Main Title */}
      <div className="lib-image-header">
        <Title variant="large" align="center">
          THƯ VIỆN HÌNH ẢNH
        </Title>
      </div>

      <div className="lib-image-content">
        {/* Navigation Buttons */}
        <button 
          className="nav-button nav-button-prev" 
          onClick={prevPage}
          disabled={!canScrollPrev}
          aria-label="Trang trước"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image Grid */}
        <div className="image-grid-container">
          <div className="image-grid-wrapper">
            <div 
              className="image-grid-slider"
              style={{ transform: `translateX(-${currentIndex * 33.333333}%)` }}
            >
              {/* Tạo 3 bản sao để scroll mượt */}
              {Array.from({ length: 3 }, (_, copyIndex) => (
                <div key={copyIndex} className="image-grid">
                  {/* Top Row */}
                  {topItems.map((image, index) => (
                    <div key={`top-${image.id}-${copyIndex}-${index}`} className="image-item">
                      <div className="image-wrapper">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={300}
                          className="grid-image"
                        />
                        {image.title && (
                          <div className="image-overlay">
                            <h4 className="image-title">{image.title}</h4>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Bottom Row */}
                  {bottomItems.map((image, index) => (
                    <div key={`bottom-${image.id}-${copyIndex}-${index}`} className="image-item">
                      <div className="image-wrapper">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={300}
                          className="grid-image"
                        />
                        {image.title && (
                          <div className="image-overlay">
                            <h4 className="image-title">{image.title}</h4>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          className="nav-button nav-button-next" 
          onClick={nextPage}
          disabled={!canScrollNext}
          aria-label="Trang tiếp"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* View More Button */}
      <div className="view-more-container">
        <button className="view-more-button">
          Xem thêm →
        </button>
      </div>
    </section>
  );
};

export default LibImage;
