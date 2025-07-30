import React from 'react';
import Tab from './Tab';
import TabNew from '../TabNew/TabNew';

const TabExample: React.FC = () => {
  const tabData = [
    {
      id: 'location',
      title: 'ỨNG DỤNG\n"TRÍ TUỆ NHÂN TẠO"',
      description: 'Convenient connectivity location',
      image: 'https://res.cloudinary.com/dytm93eoj/image/upload/v1753845489/home-assets/zm6fpdtf4t9xnsuvk2h7.png',
      content: {
        heading: 'ỨNG DỤNG "TRÍ TUỆ NHÂN TẠO"',
        paragraphs: [
          'Plevia City tiên phong trở thành khu đô thị đầu tiên tại Gia Lai ứng dụng trí tuệ nhân tạo (AI) vào vận hành – từ camera AI an ninh thông minh 24/7, hệ thống wifi mesh phủ khắp, đến app cư dân giúp việc vận hành mọi thứ trở nên vô cùng tiện lợi.'
        ],
        bulletPoints: [

        ]
      }
    },
    {
      id: 'terrain',
      title: 'KIẾN TRÚC HIỆN ĐẠI,\nĐẲNG CẤP',
      description: 'Unique terrain & nature',
      image: 'https://res.cloudinary.com/dytm93eoj/image/upload/v1753845490/home-assets/oyu3smqr90yie7y40qah.jpg',
      content: {
        heading: 'KIẾN TRÚC HIỆN ĐẠI, ĐẲNG CẤP',
        paragraphs: [
          'Thiết kế đồng bộ toàn khu theo phong cách hiện đại, quy hoạch tối ưu công năng. Mỗi căn đều có sân trước – sân sau, ban công và sân thượng rộng, đón sáng – đón gió tự nhiên, mang lại không gian sống thoáng đãng, tiện nghi và thẩm mỹ.'
        ],
        bulletPoints: [
        ]
      }
    },
    {
      id: 'architecture',
      title: 'TIỆN ÍCH &\nDỊCH VỤ',
      description: 'Classy planning & architecture',
      image: 'https://res.cloudinary.com/dytm93eoj/image/upload/v1753845493/home-assets/bilwsghljmgm1twn5yku.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'TIỆN ÍCH & DỊCH VỤ',
        paragraphs: [
          'Với cốt lõi là công nghệ, Plevia City kiến tạo hệ sinh thái sống hiện đại, mang đến trải nghiệm sống tiện nghi và an toàn cho cư dân. Các tiện ích thông minh như app cư dân, camera AI an ninh 24/7, wifi mesh phủ toàn khu, cảm biến khói tự động và bãi đỗ xe thông minh đều được tích hợp, giúp quản lý vận hành tối ưu và nâng cao chất lượng sống. Bên cạnh đó, cư dân còn được tận hưởng các tiện ích công cộng như trường mầm non quốc tế, công viên ánh sáng, hồ bơi, khu gym – yoga – spa, tạo nên một không gian sống đủ đầy, đáp ứng cả nhu cầu thể chất lẫn tinh thần.'
        ],
        bulletPoints: [
        ]
      }
    },
    {
      id: 'amenities',
      title: 'PHÁT TRIỂN\nBỀN VỮNG',
      description: 'International amenities & services',
      image: 'https://res.cloudinary.com/dytm93eoj/image/upload/v1753845496/home-assets/xn1remull4wn4rugfpmv.png', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'PHÁT TRIỂN BỀN VỮNG',
        paragraphs: [
          '<strong>Chuẩn mực từ thiết kế đến xây dựng</strong>',
          'Plevia City được thiết kế bởi đơn vị uy tín Kiến Trúc Việt, tuân thủ quy hoạch 1/500 và pháp lý rõ ràng. Dự án xây dựng theo tiêu chuẩn chất lượng cao, bàn giao hoàn thiện mặt ngoài, sẵn sàng đáp ứng nhu cầu an cư và khai thác kinh doanh.',
          '<strong>Hạ tầng đồng bộ – Tối ưu công năng</strong>',
          'Toàn bộ khu đô thị được đầu tư bài bản với hệ thống giao thông nội khu rộng rãi, thiết kế không gian khoa học, tối ưu công năng từng căn. Sự nhất quán trong kiến trúc tạo nên bộ mặt đô thị hiện đại và chuyên nghiệp.',
        ],
        bulletPoints: [

        ]
      }
    },
    {
      id: 'community',
      title: 'CƠ HỘI ĐẦU TƯ\nHẤP DẪN',
      description: 'Elite civilized community',
      image: 'https://res.cloudinary.com/dytm93eoj/image/upload/v1753845497/home-assets/gixz9kuy0bezsckdlkwp.jpg', // Thay bằng đường dẫn ảnh thực tế
      content: {
        heading: 'CƠ HỘI ĐẦU TƯ HẤP DẪN',
        paragraphs: [
          '<strong>Tiềm năng tăng giá mạnh mẽ</strong>',
          'Giá bất động sản tại Gia Lai đang tăng ổn định 10–15% mỗi năm. Plevia City được kỳ vọng tăng giá 30–50% trong 2–3 năm tới nhờ quy hoạch đô thị mở rộng và hệ thống hạ tầng phát triển',
          '<strong>Mức giá hợp lý – Chính sách linh hoạt</strong>',
          'Plevia City là lựa chọn hiếm hoi có mức giá cạnh tranh trong trung tâm Gia Lai và đã được cấp sổ đỏ từng nền. Chủ đầu tư áp dụng chính sách thanh toán linh hoạt, hỗ trợ vay vốn ngân hàng giúp khách hàng dễ dàng sở hữu sản phẩm tiềm năng.',
        ],
        bulletPoints: [
        ]
      }
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <TabNew
        title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG KHÁC BIỆT"
        tabs={tabData}
      />
    </div>
  );
};

export default TabExample; 