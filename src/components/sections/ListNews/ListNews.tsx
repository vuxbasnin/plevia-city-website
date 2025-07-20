import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ItemNewsLarge from '@/components/ui/ItemNewsLarge/ItemNewsLarge';
import './ListNews.css';

interface NewsItem {
  id: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface ListNewsProps {
  newsItems: NewsItem[];
  itemsPerPage?: number;
  className?: string;
}

const ListNews: React.FC<ListNewsProps> = ({
  newsItems,
  itemsPerPage = 6,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  
  // Lấy items cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsItems.slice(startIndex, endIndex);

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className={`list-news ${className}`}>
      <div className="list-news__container">
        <h2 className="list-news__title">TIN TỨC</h2>
        
        <div className="list-news__grid">
          {currentItems.map((item) => (
            <ItemNewsLarge
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              className="list-news__item"
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="list-news__pagination">
            <button
              className="list-news__pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Trang trước"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="list-news__pagination-numbers">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="list-news__pagination-ellipsis">...</span>
                  ) : (
                    <button
                      className={`list-news__pagination-number ${
                        currentPage === page ? 'active' : ''
                      }`}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <button
              className="list-news__pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Trang sau"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListNews;
