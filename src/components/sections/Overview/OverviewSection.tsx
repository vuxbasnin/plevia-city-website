import React from 'react';
import { usePathname } from 'next/navigation';
import ImageLeftDesRight from '../../ui/ImageLeft_DesRight/ImageLeft_DesRight';
import AutoScrollSmall from '../../ui/AutoScroll/AutoScrollSmall';

export default function Overview() {
  const pathname = usePathname();
  const isProjectPage = pathname === '/project';

  // Dữ liệu cho ImageLeft_DesRight component
  const investorData = {
    title: "THÔNG TIN TỔNG QUAN",
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

  const investorData2 = {
    title: "GIỚI THIỆU CHỦ ĐẦU TƯ",
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
    mainTitle: "ĐỘI NGŨ VẬN HÀNH",
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
          <ImageLeftDesRight {...(isProjectPage ? investorData2: investorData)} />
        </div>

        {/* Phần hiển thị các dự án - chỉ hiển thị khi không ở trang project */}
        {!isProjectPage && (
          <div className="overview-projects-section">
            <AutoScrollSmall 
              mainTitle={projectsData.mainTitle}
              projects={projectsData.projects}
              scrollInterval={4000}
            />
          </div>
        )}

        {/* Phần video YouTube - chỉ hiển thị khi ở trang project */}
        {isProjectPage && (
          <div className="overview-video-section">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Thanh Xuan Valley - Tầm Nhìn Phát Triển"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-video"
              ></iframe>
            </div>
          </div>
        )}
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

        .overview-video-section {
          margin-top: 60px;
        }

        .video-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .youtube-video {
          width: 100%;
          height: 450px;
          border: none;
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

          .overview-video-section {
            margin-top: 40px;
          }

          .youtube-video {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}