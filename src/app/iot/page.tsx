import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import IoTPage from "./IoT";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Plevia City - Công Nghệ IoT & AI Đô Thị Thông Minh | Khu Đô Thị Tương Lai Gia Lai";
  const description =
    "Khám phá công nghệ IoT và AI tiên tiến tại Plevia City - khu đô thị thông minh đầu tiên tại Gia Lai. Hệ thống AI quản lý toàn diện, an ninh 24/7, nhà thông minh, giao thông thông minh và tiện ích đẳng cấp.";
  
  const keywords = [
    'Plevia City IoT',
    'pleviacity IoT',
    'công nghệ IoT Gia Lai',
    'AI đô thị thông minh',
    'nhà thông minh Pleiku',
    'hệ thống AI Plevia',
    'đô thị thông minh Gia Lai',
    'công nghệ 4.0 Plevia',
    'IoT Plevia City',
    'AI Plevia City',
    'smart home Gia Lai',
    'an ninh AI 24/7',
    'giao thông thông minh',
    'nhà thông minh IoT',
    'hệ sinh thái IoT',
    'công nghệ tương lai',
    'đô thị số hóa',
    'Plevia City công nghệ',
    'pleviacity.vn IoT',
    'dự án IoT Gia Lai'
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: "/iot" },
    openGraph: {
      title,
      description,
      url: "/iot",
      type: "website",
      siteName: "Plevia City",
      locale: "vi_VN",
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          width: 1200,
          height: 630,
          alt: "Plevia City - Công nghệ IoT & AI đô thị thông minh",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/assets/home/plevia_city.jpg",
          alt: "Plevia City - Công nghệ IoT & AI đô thị thông minh",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function IoTPageComponent() {
  return (
    <PageLayout>
      {/* SEO Content - Hidden for better search engine optimization */}
      <div className="sr-only" aria-hidden="true">
        <article>
          <header>
            <h1>Plevia City - Công Nghệ IoT & AI Đô Thị Thông Minh Gia Lai</h1>
            <h2>Công Nghệ IoT Và AI Tiên Tiến Tại Plevia City</h2>
          </header>
          
          <section>
            <h3>Giới Thiệu Về Plevia City IoT</h3>
            <p>
              Plevia City là khu đô thị thông minh đầu tiên tại Gia Lai tích hợp công nghệ IoT và AI tiên tiến. 
              Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 
              và môi trường sống xanh đa lớp.
            </p>
          </section>
          
          <section>
            <h3>Hệ Thống AI Quản Lý Toàn Diện</h3>
            <p>
              Tại Plevia City, AI không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái đô thị. 
              Hệ thống AI Absolute Security phát hiện ngã, nhận diện đám đông và cảnh báo cháy trong 30 giây. 
              Mỗi camera là trạm AI độc lập, phân tích thời gian thực và phản ứng tức thì.
            </p>
          </section>

          <section>
            <h3>Nhà Thông Minh IoT</h3>
            <p>
              Mỗi căn nhà tại Plevia City là một hệ sinh thái thông minh được cá nhân hóa theo nhu cầu của gia chủ. 
              Hệ thống điều khiển giọng nói, IoT kết nối mọi thiết bị từ đèn chiếu sáng, điều hòa đến các thiết bị gia dụng. 
              Mọi thứ đều có thể được điều khiển từ xa qua ứng dụng di động.
            </p>
          </section>

          <section>
            <h3>An Ninh AI 24/7</h3>
            <p>
              Hệ thống AI Alert Station với khả năng nhận diện đa sinh trắc học, từ khuôn mặt đến giọng nói. 
              AI phân tích hành vi để phát hiện sớm các hoạt động bất thường, đảm bảo an ninh tuyệt đối cho cư dân. 
              Hệ thống học hỏi liên tục, cập nhật thuật toán để thích ứng với các mối đe dọa mới.
            </p>
          </section>

          <section>
            <h3>Giao Thông Thông Minh</h3>
            <p>
              AI quản lý đỗ xe với khả năng nhận diện biển số, hướng dẫn tìm chỗ trống và thanh toán tự động. 
              Hệ thống dự đoán nhu cầu đỗ xe theo thời gian thực, tối ưu hóa việc sử dụng không gian và giảm thiểu thời gian tìm kiếm.
            </p>
          </section>

          <section>
            <h3>Tiện Ích Đẳng Cấp</h3>
            <p>
              Khu phố được trang bị hệ thống AI tích hợp quản lý rác thải thông minh, tối ưu hóa việc phân loại và thu gom. 
              Màn hình tương tác cộng đồng cung cấp thông tin real-time về chất lượng không khí, giao thông và các dịch vụ tiện ích xung quanh.
            </p>
          </section>

          <section>
            <h3>Thời Tiết Thông Minh</h3>
            <p>
              Hệ thống AI phân tích dữ liệu thời tiết kết hợp với lịch trình cá nhân để đưa ra khuyến nghị tối ưu. 
              Từ việc nhắc nhở mang ô khi trời mưa đến điều chỉnh tự động hệ thống làm mát trong nhà, 
              mọi thứ đều được dự đoán và chuẩn bị sẵn sàng.
            </p>
          </section>

          <section>
            <h3>Thẻ Cư Dân Thông Minh</h3>
            <p>
              Thẻ cư dân tích hợp ví điện tử cho phép thanh toán nhanh chóng tại các cửa hàng. 
              Tích lũy điểm thưởng, nhận ưu đãi độc quyền và trải nghiệm mua sắm thuận tiện chỉ với một chạm.
            </p>
          </section>

          <section>
            <h3>Đô Thị Tương Lai</h3>
            <p>
              Plevia City là tầm nhìn về một đô thị thông minh toàn diện - nơi AI không chỉ quản lý từng căn nhà 
              mà còn kết nối toàn bộ hệ sinh thái. Từ drone giao hàng tự động đến robot dịch vụ cộng đồng, 
              ứng dụng quản lý tài chính cá nhân đến hệ thống giao thông thông minh - tất cả hòa quyện tạo nên 
              cuộc sống tiện nghi, an toàn và bền vững.
            </p>
          </section>

          <section>
            <h3>Vị Trí Đắc Địa Tại Gia Lai</h3>
            <p>
              Plevia City tọa lạc tại vị trí đắc địa thuộc Phường Hội Phú, Thành phố Pleiku, Tỉnh Gia Lai. 
              Dự án nằm trong khu vực phát triển năng động, gần các tiện ích công cộng, trường học, bệnh viện 
              và các trung tâm thương mại lớn của thành phố.
            </p>
          </section>

          <section>
            <h3>Đầu Tư Bất Động Sản Thông Minh</h3>
            <p>
              Plevia City không chỉ là nơi sinh sống lý tưởng mà còn là cơ hội đầu tư bất động sản thông minh. 
              Với công nghệ IoT và AI tiên tiến, dự án mang lại giá trị vượt thời gian cho các nhà đầu tư. 
              Căn hộ thông minh, biệt thự IoT và shophouse công nghệ cao tại Plevia City là lựa chọn hoàn hảo 
              cho những ai muốn sở hữu bất động sản của tương lai.
            </p>
          </section>

          <section>
            <h3>Liên Hệ Và Tư Vấn</h3>
            <p>
              Để biết thêm thông tin chi tiết về dự án Plevia City và các sản phẩm bất động sản thông minh, 
              vui lòng liên hệ với chúng tôi. Đội ngũ tư vấn chuyên nghiệp sẽ hỗ trợ bạn tìm hiểu về công nghệ IoT, 
              AI và các tiện ích đẳng cấp tại khu đô thị thông minh đầu tiên tại Gia Lai.
            </p>
          </section>

          <footer>
            <p>
              <strong>Plevia City</strong> - Khu đô thị thông minh đầu tiên tại Gia Lai với công nghệ IoT và AI tiên tiến. 
              Trải nghiệm cuộc sống tương lai ngay hôm nay.
            </p>
          </footer>
        </article>
      </div>

      <IoTPage />
    </PageLayout>
  );
}
