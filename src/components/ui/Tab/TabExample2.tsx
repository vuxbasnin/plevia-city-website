import React from 'react';
import Tab from './Tab';

const TabExample2: React.FC = () => {
  const tabData = [
    {
      id: 'location',
      title: 'XINH, SANG TRỌNG, HIỆN ĐẠI',
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
      title: 'KẾT HỢP CÔNG NGHỆ',
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
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Tab 
        title="CONCEPT" 
        tabs={tabData}
      />
    </div>
  );
};

export default TabExample2; 