import React from 'react';
import Tab from './Tab';

const TabExample: React.FC = () => {
  const tabData = [
    {
      id: 'location',
      title: 'VỊ TRÍ KẾT NỐI THUẬN TIỆN',
      description: 'Convenient connectivity location',
      image: '/images/map-location.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'VỊ TRÍ KẾT NỐI THUẬN TIỆN',
        paragraphs: [
          'Thanh Xuan Valley nằm kế bên hồ Đại Lải, tọa lạc tại cửa ngõ phía Bắc Hà Nội, chỉ cách ranh giới Hà Nội 5km.',
          'Hạ tầng giao thông kết nối hoàn thiện với cầu Nhật Tân, cầu Thăng Long; Cao tốc, đại lộ nằm trong con đường xuyên Á; Tuyến đường Vành đai 4 Vùng Thủ đô; Tuyến đường Vành đai 5 Vùng Thủ đô,....'
        ],
        bulletPoints: [
          '40 phút đến Hồ Tây',
          '20 phút đến Sân bay quốc tế Nội Bài',
          '5 phút đến hồ Đại Lải'
        ]
      }
    },
    {
      id: 'terrain',
      title: 'ĐỊA HÌNH & THIÊN NHIÊN ĐỘC TÔN',
      description: 'Unique terrain & nature',
      image: '/images/terrain-nature.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'ĐỊA HÌNH & THIÊN NHIÊN ĐỘC TÔN',
        paragraphs: [
          'Thanh Xuan Valley được thiết kế hài hòa với địa hình tự nhiên, tận dụng tối đa cảnh quan thiên nhiên xung quanh.',
          'Dự án được bao bọc bởi hệ thống rừng cây xanh mát, hồ nước trong lành và không khí trong lành của vùng núi.'
        ],
        bulletPoints: [
          'Hồ Đại Lải rộng 500ha',
          'Rừng quốc gia Ba Vì',
          'Không khí trong lành quanh năm'
        ]
      }
    },
    {
      id: 'architecture',
      title: 'QUY HOẠCH & KIẾN TRÚC ĐẲNG CẤP',
      description: 'Classy planning & architecture',
      image: '/images/architecture.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'QUY HOẠCH & KIẾN TRÚC ĐẲNG CẤP',
        paragraphs: [
          'Thanh Xuan Valley được quy hoạch theo tiêu chuẩn quốc tế với kiến trúc hiện đại, sang trọng.',
          'Mỗi căn hộ được thiết kế tối ưu không gian, đảm bảo tiện nghi và thoải mái cho cuộc sống hiện đại.'
        ],
        bulletPoints: [
          'Thiết kế bởi kiến trúc sư hàng đầu',
          'Tiêu chuẩn 5 sao quốc tế',
          'Vật liệu cao cấp nhập khẩu'
        ]
      }
    },
    {
      id: 'amenities',
      title: 'TIỆN ÍCH & DỊCH VỤ QUỐC TẾ',
      description: 'International amenities & services',
      image: '/images/amenities.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'TIỆN ÍCH & DỊCH VỤ QUỐC TẾ',
        paragraphs: [
          'Hệ thống tiện ích đẳng cấp quốc tế với đầy đủ dịch vụ từ cơ bản đến cao cấp.',
          'Cư dân được hưởng trọn vẹn cuộc sống tiện nghi, hiện đại ngay trong lòng thiên nhiên.'
        ],
        bulletPoints: [
          'Trung tâm thương mại cao cấp',
          'Bệnh viện quốc tế',
          'Trường học quốc tế'
        ]
      }
    },
    {
      id: 'community',
      title: 'CỘNG ĐỒNG\nVĂN MINH ƯU TÚ',
      description: 'Elite civilized community',
      image: '/images/community.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'CỘNG ĐỒNG VĂN MINH ƯU TÚ',
        paragraphs: [
          'Thanh Xuan Valley quy tụ cộng đồng cư dân văn minh, tri thức với lối sống hiện đại.',
          'Môi trường sống lý tưởng để nuôi dưỡng thế hệ tương lai với giá trị văn hóa và đạo đức tốt đẹp.'
        ],
        bulletPoints: [
          'Cộng đồng tri thức cao',
          'Văn hóa ứng xử văn minh',
          'Môi trường giáo dục tốt'
        ]
      }
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Tab 
        title="KEY POINTS" 
        tabs={tabData}
      />
    </div>
  );
};

export default TabExample; 