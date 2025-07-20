import React from 'react';
import ImageLeftDesRight from '../../ui/ImageLeft_DesRight/ImageLeft_DesRight';
import AutoScrollSmall from '../../ui/AutoScroll/AutoScrollSmall';

export default function Overview() {
  // Dữ liệu cho ImageLeft_DesRight component
  const investorData = {
    title: "CHỦ ĐẦU TƯ",
    imageSrc: "/images/bim-land-investor.jpg", // Thay đổi đường dẫn ảnh thực tế
    imageAlt: "BIM Land - Chủ đầu tư bất động sản hàng đầu Việt Nam",
    description: [
      "Là một trong những nhà phát triển bất động sản hàng đầu Việt Nam, với hơn 30 năm kinh nghiệm kiến tạo những dự án tầm cỡ quốc tế, BIM Land không chỉ tạo ra những sản phẩm bất động sản đơn thuần mà luôn hướng đến việc phát triển những điểm đến đẳng cấp, bền vững, mang lại giá trị lâu dài cho khách hàng và cộng đồng.",
      "Với quỹ đất hơn 9 triệu m2 tại Quảng Ninh, Phú Quốc, Vĩnh Phúc, Hà Nội, Ninh Thuận, Lào và vẫn đang tiếp tục mở rộng đến các thành phố và điểm đến du lịch tiềm năng, BIM Land từng bước quy hoạch và phát triển nhiều vùng đất hoang sơ trở thành những khu đô thị du lịch, khu phức hợp du lịch đạt tiêu chuẩn quốc tế."
    ],
    logo: {
      mainText: "BIM",
      subText: "Land",
      tagline: "A Member of BIM Group"
    }
  };

  // Dữ liệu cho AutoScrollSmall component - các dự án của BIM Land
  const projectsData = {
    mainTitle: "CÁC DỰ ÁN TIÊU BIỂU",
    projects: [
      {
        id: "1",
        title: "BIM Land Phú Quốc",
        imageUrl: "/images/projects/phu-quoc.jpg",
        alt: "Dự án BIM Land Phú Quốc"
      },
      {
        id: "2", 
        title: "BIM Land Quảng Ninh",
        imageUrl: "/images/projects/quang-ninh.jpg",
        alt: "Dự án BIM Land Quảng Ninh"
      },
      {
        id: "3",
        title: "BIM Land Vĩnh Phúc",
        imageUrl: "/images/projects/vinh-phuc.jpg",
        alt: "Dự án BIM Land Vĩnh Phúc"
      },
      {
        id: "4",
        title: "BIM Land Hà Nội",
        imageUrl: "/images/projects/ha-noi.jpg",
        alt: "Dự án BIM Land Hà Nội"
      },
      {
        id: "5",
        title: "BIM Land Ninh Thuận",
        imageUrl: "/images/projects/ninh-thuan.jpg",
        alt: "Dự án BIM Land Ninh Thuận"
      },
      {
        id: "6",
        title: "BIM Land Lào",
        imageUrl: "/images/projects/laos.jpg",
        alt: "Dự án BIM Land Lào"
      }
    ]
  };

  return (
    <section className="overview-section">
      <div className="overview-container">
        {/* Phần giới thiệu chủ đầu tư */}
        <div className="overview-investor-section">
          <ImageLeftDesRight {...investorData} />
        </div>

        {/* Phần hiển thị các dự án */}
        <div className="overview-projects-section">
          <AutoScrollSmall 
            mainTitle={projectsData.mainTitle}
            projects={projectsData.projects}
            scrollInterval={4000}
          />
        </div>
      </div>

      <style jsx>{`
        .overview-section {
          background-color: #ffffff;
          padding: 60px 0;
        }

        .overview-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .overview-investor-section {
          margin-bottom: 80px;
        }

        .overview-projects-section {
          margin-top: 60px;
        }

        @media (max-width: 768px) {
          .overview-section {
            padding: 40px 0;
          }

          .overview-investor-section {
            margin-bottom: 60px;
          }

          .overview-projects-section {
            margin-top: 40px;
          }
        }
      `}</style>
    </section>
  );
}