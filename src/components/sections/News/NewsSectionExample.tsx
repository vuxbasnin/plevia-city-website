import React from 'react';
import NewsSection from './NewsSection';

// Dữ liệu mẫu cho NewsSection
const sampleNewsItems = [
  {
    id: '1',
    title: 'TỪ SỐNG LÂU ĐẾN SỐNG KHỎE: CÁCH THẾ HỆ MỚI ĐANG VIẾT LẠI TIÊU CHUẨN SỐNG ĐÔ THỊ',
    description: 'Giữa rừng thông, một mô hình sống khỏe đang được định hình, nơi thiên nhiên chữa lành, cộng đồng cùng đồng hành, và sức khỏe được chăm sóc như một phần của nhịp sống mỗi ngày.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    alt: 'Modern bedroom with mountain view'
  },
  {
    id: '2',
    title: 'BIM LAND CÔNG BỐ ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC DỰ ÁN THANH XUAN VALLEY',
    description: 'Hà Nội, ngày 14/06/2025 - Chủ đầu tư BIM Land đã ký kết hợp tác cùng 10 đơn vị phân phối chính thức dự án Thanh Xuan Valley, đánh dấu cột mốc quan trọng trong chiến lược phát triển giai đoạn mới của dự án, chuẩn bị cho kế hoạch mở rộng thị trường.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    alt: 'Business meeting and signing ceremony'
  },
  {
    id: '3',
    title: 'THANH XUAN VALLEY HỢP TÁC VỚI PRIME MEDICAL CARE HOÀN THIỆN HỆ SINH THÁI SỐNG KHỎE',
    description: 'BIM Land chính thức ký kết hợp tác với Trung tâm chăm sóc sức khỏe cao cấp Prime Medical Care (PMC), tích hợp mô hình y tế chủ động vào dự án Thanh Xuan Valley, góp phần hoàn thiện hệ sinh thái sống xanh – sống khỏe - sống bền vững.',
    imageUrl: 'https://khangdienhcm.com/wp-content/uploads/2025/05/TIEN-DO-XAY-DUNG-GLADIA-KHANG-DIEN-THANG-06-2025-KDHCM-1024x576.jpg',
    alt: 'Healthcare partnership signing'
  },
  {
    id: '4',
    title: 'KHÁM PHÁ KHÔNG GIAN LÀM VIỆC HIỆN ĐẠI TẠI THANH XUAN VALLEY',
    description: 'Tại Thanh Xuan Valley, chúng tôi mang đến không gian làm việc hiện đại với đầy đủ tiện nghi, kết hợp hài hòa giữa thiên nhiên và công nghệ, tạo môi trường lý tưởng cho sự sáng tạo và năng suất.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    alt: 'Modern workspace with nature view'
  },
  {
    id: '5',
    title: 'CỘNG ĐỒNG THANH XUAN VALLEY: NƠI KẾT NỐI VÀ PHÁT TRIỂN',
    description: 'Không chỉ là nơi sinh sống, Thanh Xuan Valley còn là cộng đồng nơi mọi người kết nối, chia sẻ và cùng nhau phát triển. Các hoạt động cộng đồng đa dạng giúp tạo nên môi trường sống năng động và gắn kết.',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
    alt: 'Community gathering and activities'
  },
  {
    id: '6',
    title: 'THIẾT KẾ XANH: KIẾN TRÚC HÀI HÒA VỚI THIÊN NHIÊN',
    description: 'Kiến trúc tại Thanh Xuan Valley được thiết kế theo nguyên tắc xanh, tối ưu hóa ánh sáng tự nhiên, thông gió và tích hợp cây xanh vào không gian sống, tạo nên môi trường sống lành mạnh và bền vững.',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    alt: 'Green architecture with natural elements'
  }
];

const NewsSectionExample: React.FC = () => {
  return (
    <div>
      {/* Sử dụng NewsSection với dữ liệu mẫu */}
      <NewsSection 
        newsItems={sampleNewsItems} 
        scrollInterval={5000} // Scroll mỗi 5 giây
      />
    </div>
  );
};

export default NewsSectionExample; 