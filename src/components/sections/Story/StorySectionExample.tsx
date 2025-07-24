import React from 'react';
import StorySection from './StorySection';

const StorySectionExample: React.FC = () => {
  const stories = [
    {
      id: "1",
      title: "Kiến trúc sư trưởng",
      imageSrc: "/images/architect-roger.jpg",
      imageAlt: "Ông Roger Gaspar - Kiến trúc sư trưởng",
      description: [
        "Với hơn 20 năm kinh nghiệm trong lĩnh vực kiến trúc và quy hoạch đô thị, ông Roger Gaspar đã dẫn dắt đội ngũ thiết kế tạo nên những dự án bất động sản đẳng cấp quốc tế.",
        "Ông là người đứng sau những công trình kiến trúc nổi tiếng tại Việt Nam và khu vực Đông Nam Á, mang đến những không gian sống hiện đại, bền vững và thân thiện với môi trường."
      ],
      logo: {
        mainText: "Ông Roger Gaspar",
        subText: "Kiến trúc sư trưởng",
        tagline: "Dự án Plevia City"
      }
    },
    {
      id: "2",
      title: "Tầm nhìn thiết kế",
      imageSrc: "/images/design-vision.jpg",
      imageAlt: "Tầm nhìn thiết kế dự án",
      description: [
        "Dự án Plevia City được thiết kế với tầm nhìn tạo nên một cộng đồng sống hiện đại, nơi con người và thiên nhiên hòa hợp trong một không gian sống đẳng cấp.",
        "Mỗi chi tiết thiết kế đều được chăm chút tỉ mỉ, từ việc bố trí không gian đến việc lựa chọn vật liệu, tất cả đều hướng đến mục tiêu tạo nên giá trị bền vững cho cư dân."
      ],
      logo: {
        mainText: "Plevia City",
        subText: "Tầm nhìn thiết kế",
        tagline: "Nơi cuộc sống thăng hoa"
      }
    },
    {
      id: "3",
      title: "Công nghệ xây dựng",
      imageSrc: "/images/construction-tech.jpg",
      imageAlt: "Công nghệ xây dựng hiện đại",
      description: [
        "Áp dụng những công nghệ xây dựng tiên tiến nhất từ các quốc gia phát triển, dự án cam kết mang đến chất lượng công trình vượt trội và thời gian thi công tối ưu.",
        "Từ hệ thống quản lý thông minh đến vật liệu xây dựng bền vững, mọi yếu tố đều được lựa chọn kỹ lưỡng để đảm bảo tuổi thọ và giá trị lâu dài cho dự án."
      ],
      logo: {
        mainText: "Công nghệ",
        subText: "Xây dựng hiện đại",
        tagline: "Chất lượng vượt trội"
      }
    },
    {
      id: "4",
      title: "Tiện ích đẳng cấp",
      imageSrc: "/images/luxury-amenities.jpg",
      imageAlt: "Tiện ích đẳng cấp 5 sao",
      description: [
        "Hệ thống tiện ích đẳng cấp 5 sao được thiết kế để phục vụ mọi nhu cầu của cư dân, từ giải trí, thể thao đến các dịch vụ chăm sóc sức khỏe và giáo dục.",
        "Mỗi tiện ích đều được lên kế hoạch chi tiết, đảm bảo mang đến trải nghiệm sống hoàn hảo và nâng cao chất lượng cuộc sống cho mọi thành viên trong gia đình."
      ],
      logo: {
        mainText: "Tiện ích",
        subText: "Đẳng cấp 5 sao",
        tagline: "Trải nghiệm hoàn hảo"
      }
    }
  ];

  return (
    <StorySection
      mainTitle="CÂU CHUYỆN DỰ ÁN"
      stories={stories}
      scrollInterval={5000}
    />
  );
};

export default StorySectionExample; 