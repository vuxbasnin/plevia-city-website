import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

const sampleNewsData = [
  {
    title: "Plevia City - Khởi công xây dựng khu đô thị thông minh đầu tiên tại Gia Lai",
    summary: "Dự án Plevia City chính thức khởi công với sự tham gia của lãnh đạo tỉnh Gia Lai và đại diện Tập đoàn Đầu tư Bắc Hải.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Khởi công xây dựng khu đô thị thông minh đầu tiên tại Gia Lai",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Ngày 15/12/2024, dự án Plevia City đã chính thức khởi công tại TP. Pleiku, tỉnh Gia Lai. Đây là khu đô thị thông minh đầu tiên tại khu vực Tây Nguyên, đánh dấu bước tiến quan trọng trong việc phát triển đô thị hiện đại tại địa phương."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Dự án được phát triển bởi Tập đoàn Đầu tư Bắc Hải với tổng vốn đầu tư hơn 2.000 tỷ đồng, bao gồm các hạng mục: khu dân cư cao cấp, trung tâm thương mại, văn phòng, khách sạn và các tiện ích công cộng."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Khu dân cư cao cấp với 500 căn hộ",
              "Trung tâm thương mại 5 tầng",
              "Khách sạn 4 sao 200 phòng",
              "Công viên cây xanh 5ha",
              "Hệ thống giao thông hiện đại"
            ]
          }
        }
      ]
    },
    author: "Ban Truyền thông Plevia City",
    tags: ["khởi công", "dự án", "gia lai"],
    isPublished: true,
    slug: "plevia-city-khoi-cong-xay-dung-khu-do-thi-thong-minh-dau-tien-tai-gia-lai"
  },
  {
    title: "Tiến độ xây dựng Plevia City - Tháng 1/2025",
    summary: "Cập nhật tiến độ thi công các hạng mục chính của dự án Plevia City trong tháng đầu năm 2025.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Tiến độ xây dựng Plevia City - Tháng 1/2025",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Sau hơn 1 tháng khởi công, dự án Plevia City đã đạt được những tiến độ đáng kể. Công tác san lấp mặt bằng và xây dựng hạ tầng cơ bản đã hoàn thành 60%."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Các hạng mục đang được thi công tích cực bao gồm: hệ thống đường giao thông nội bộ, hệ thống cấp thoát nước, điện chiếu sáng và viễn thông."
          }
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Hoàn thành 60% san lấp mặt bằng",
              "Thi công 40% hệ thống đường giao thông",
              "Lắp đặt 30% hệ thống cấp thoát nước",
              "Chuẩn bị khởi công tòa nhà chung cư A1"
            ]
          }
        }
      ]
    },
    author: "Đội Quản lý Dự án",
    tags: ["tiến độ", "xây dựng", "2025"],
    isPublished: true,
    slug: "tien-do-xay-dung-plevia-city-thang-1-2025"
  },
  {
    title: "Plevia City - Thiết kế kiến trúc độc đáo lấy cảm hứng từ văn hóa Tây Nguyên",
    summary: "Khám phá những điểm nhấn kiến trúc độc đáo của Plevia City, kết hợp giữa hiện đại và văn hóa truyền thống Tây Nguyên.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Thiết kế kiến trúc độc đáo lấy cảm hứng từ văn hóa Tây Nguyên",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Plevia City được thiết kế bởi đội ngũ kiến trúc sư hàng đầu Việt Nam, lấy cảm hứng từ văn hóa truyền thống của các dân tộc Tây Nguyên. Dự án kết hợp hài hòa giữa kiến trúc hiện đại và những nét văn hóa đặc trưng của vùng đất cao nguyên."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Các tòa nhà được thiết kế với mái dốc lấy cảm hứng từ nhà rông truyền thống, kết hợp với vật liệu hiện đại như kính, thép và bê tông cốt thép."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Mái dốc lấy cảm hứng từ nhà rông",
              "Sử dụng gỗ tự nhiên trong trang trí nội thất",
              "Họa tiết hoa văn dân tộc trên tường",
              "Không gian xanh mô phỏng rừng Tây Nguyên"
            ]
          }
        }
      ]
    },
    author: "Kiến trúc sư Nguyễn Văn A",
    tags: ["kiến trúc", "thiết kế", "văn hóa"],
    isPublished: true,
    slug: "plevia-city-thiet-ke-kien-truc-doc-dao-lay-cam-hung-tu-van-hoa-tay-nguyen"
  },
  {
    title: "Plevia City - Tiện ích đẳng cấp quốc tế cho cuộc sống hiện đại",
    summary: "Khám phá hệ thống tiện ích đẳng cấp quốc tế tại Plevia City, mang đến trải nghiệm sống hoàn hảo cho cư dân.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Tiện ích đẳng cấp quốc tế cho cuộc sống hiện đại",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Plevia City được đầu tư hệ thống tiện ích đẳng cấp quốc tế, đáp ứng mọi nhu cầu của cư dân từ giải trí, thể thao, giáo dục đến y tế và thương mại."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Dự án bao gồm trung tâm thương mại hiện đại, bệnh viện đa khoa, trường học quốc tế, công viên giải trí và hệ thống thể thao đa dạng."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Trung tâm thương mại 5 tầng với 200 gian hàng",
              "Bệnh viện đa khoa 200 giường",
              "Trường học quốc tế từ mầm non đến THPT",
              "Công viên nước và khu vui chơi giải trí",
              "Sân tennis, bể bơi, phòng gym cao cấp"
            ]
          }
        }
      ]
    },
    author: "Ban Quản lý Tiện ích",
    tags: ["tiện ích", "cuộc sống", "hiện đại"],
    isPublished: true,
    slug: "plevia-city-tien-ich-dang-cap-quoc-te-cho-cuoc-song-hien-dai"
  },
  {
    title: "Plevia City - Cơ hội đầu tư bất động sản tiềm năng tại Gia Lai",
    summary: "Phân tích tiềm năng đầu tư bất động sản tại Plevia City với những lợi thế về vị trí, hạ tầng và quy hoạch.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Cơ hội đầu tư bất động sản tiềm năng tại Gia Lai",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Plevia City được đánh giá là một trong những dự án bất động sản có tiềm năng đầu tư cao nhất tại khu vực Tây Nguyên. Với vị trí đắc địa, hạ tầng đồng bộ và quy hoạch hiện đại, dự án hứa hẹn mang lại lợi nhuận cao cho nhà đầu tư."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Theo các chuyên gia bất động sản, giá trị bất động sản tại Plevia City dự kiến sẽ tăng 20-30% trong 3-5 năm tới."
          }
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Vị trí trung tâm TP. Pleiku",
              "Hạ tầng giao thông thuận tiện",
              "Tiện ích đẳng cấp quốc tế",
              "Quy hoạch tổng thể hiện đại",
              "Tiềm năng tăng giá cao"
            ]
          }
        }
      ]
    },
    author: "Chuyên gia Bất động sản",
    tags: ["đầu tư", "bất động sản", "tiềm năng"],
    isPublished: true,
    slug: "plevia-city-co-hoi-dau-tu-bat-dong-san-tiem-nang-tai-gia-lai"
  },
  {
    title: "Plevia City - Cam kết bảo vệ môi trường và phát triển bền vững",
    summary: "Tìm hiểu về các giải pháp bảo vệ môi trường và phát triển bền vững được áp dụng tại dự án Plevia City.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Cam kết bảo vệ môi trường và phát triển bền vững",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Plevia City cam kết phát triển theo hướng bền vững với các giải pháp bảo vệ môi trường tiên tiến. Dự án áp dụng công nghệ xanh và sử dụng năng lượng tái tạo để giảm thiểu tác động đến môi trường."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Hệ thống xử lý nước thải, thu gom rác thải và tái chế được thiết kế theo tiêu chuẩn quốc tế, đảm bảo môi trường sống trong lành cho cư dân."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Hệ thống năng lượng mặt trời",
              "Xử lý nước thải tiên tiến",
              "Thu gom và tái chế rác thải",
              "Công viên cây xanh chiếm 30% diện tích",
              "Sử dụng vật liệu thân thiện môi trường"
            ]
          }
        }
      ]
    },
    author: "Ban Môi trường Plevia City",
    tags: ["môi trường", "bền vững", "xanh"],
    isPublished: true,
    slug: "plevia-city-cam-ket-bao-ve-moi-truong-va-phat-trien-ben-vung"
  },
  {
    title: "Plevia City - Sự kiện ra mắt dự án thu hút hàng nghìn người tham gia",
    summary: "Sự kiện ra mắt dự án Plevia City đã thu hút sự quan tâm của hàng nghìn người dân và nhà đầu tư tại Gia Lai.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Sự kiện ra mắt dự án thu hút hàng nghìn người tham gia",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Ngày 20/11/2024, sự kiện ra mắt dự án Plevia City đã được tổ chức thành công tại TP. Pleiku với sự tham gia của hơn 3.000 người dân, nhà đầu tư và đối tác kinh doanh."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Sự kiện giới thiệu chi tiết về quy hoạch tổng thể, tiện ích và các chính sách ưu đãi đặc biệt dành cho khách hàng đầu tiên."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Hơn 3.000 người tham gia",
              "Triển lãm mô hình 3D dự án",
              "Tư vấn chính sách ưu đãi",
              "Ký kết hợp đồng đặt chỗ",
              "Chương trình văn nghệ đặc sắc"
            ]
          }
        }
      ]
    },
    author: "Ban Truyền thông",
    tags: ["sự kiện", "ra mắt", "khách hàng"],
    isPublished: true,
    slug: "plevia-city-su-kien-ra-mat-du-an-thu-hut-hang-nghin-nguoi-tham-gia"
  },
  {
    title: "Plevia City - Hợp tác với các đối tác quốc tế nâng tầm dự án",
    summary: "Tập đoàn Đầu tư Bắc Hải ký kết hợp tác với các đối tác quốc tế để nâng tầm chất lượng dự án Plevia City.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Hợp tác với các đối tác quốc tế nâng tầm dự án",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Tập đoàn Đầu tư Bắc Hải đã ký kết các thỏa thuận hợp tác chiến lược với nhiều đối tác quốc tế uy tín để nâng tầm chất lượng dự án Plevia City."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Các đối tác bao gồm: công ty quản lý khách sạn Marriott, công ty thiết kế kiến trúc Perkins+Will, và công ty công nghệ thông minh Siemens."
          }
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Marriott - Quản lý khách sạn 4 sao",
              "Perkins+Will - Thiết kế kiến trúc",
              "Siemens - Hệ thống thông minh",
              "JLL - Tư vấn bất động sản",
              "CBRE - Quản lý vận hành"
            ]
          }
        }
      ]
    },
    author: "Ban Đối ngoại",
    tags: ["hợp tác", "quốc tế", "đối tác"],
    isPublished: true,
    slug: "plevia-city-hop-tac-voi-cac-doi-tac-quoc-te-nang-tam-du-an"
  },
  {
    title: "Plevia City - Chính sách ưu đãi đặc biệt cho khách hàng đầu tiên",
    summary: "Khám phá các chính sách ưu đãi hấp dẫn dành riêng cho những khách hàng đầu tiên của dự án Plevia City.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Chính sách ưu đãi đặc biệt cho khách hàng đầu tiên",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Để tri ân những khách hàng tin tưởng và lựa chọn Plevia City ngay từ đầu, chủ đầu tư đã đưa ra các chính sách ưu đãi đặc biệt với giá trị lên đến hàng trăm triệu đồng."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Các ưu đãi bao gồm: giảm giá trực tiếp, hỗ trợ vay vốn, tặng nội thất cao cấp và miễn phí quản lý vận hành trong 2 năm đầu."
          }
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Giảm giá 15% cho 100 khách hàng đầu tiên",
              "Hỗ trợ vay vốn lãi suất 0% trong 12 tháng",
              "Tặng nội thất cao cấp trị giá 200 triệu",
              "Miễn phí quản lý vận hành 2 năm",
              "Tặng thẻ thành viên VIP trọn đời"
            ]
          }
        }
      ]
    },
    author: "Ban Kinh doanh",
    tags: ["ưu đãi", "khách hàng", "chính sách"],
    isPublished: true,
    slug: "plevia-city-chinh-sach-uu-dai-dac-biet-cho-khach-hang-dau-tien"
  },
  {
    title: "Plevia City - Tuyển dụng nhân sự chất lượng cao cho dự án",
    summary: "Dự án Plevia City đang tuyển dụng hàng trăm vị trí nhân sự chất lượng cao với mức lương cạnh tranh.",
    content: {
      time: Date.now(),
      version: "2.28.2",
      blocks: [
        {
          type: "header",
          data: {
            text: "Plevia City - Tuyển dụng nhân sự chất lượng cao cho dự án",
            level: 1
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Để đảm bảo chất lượng vận hành và dịch vụ tốt nhất cho cư dân, Plevia City đang tuyển dụng hàng trăm vị trí nhân sự chất lượng cao với mức lương cạnh tranh và chế độ đãi ngộ hấp dẫn."
          }
        },
        {
          type: "paragraph",
          data: {
            text: "Các vị trí tuyển dụng bao gồm: quản lý dự án, kỹ sư xây dựng, nhân viên kinh doanh, nhân viên vận hành và bảo trì."
          }
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "Quản lý dự án: 5-10 vị trí",
              "Kỹ sư xây dựng: 20-30 vị trí",
              "Nhân viên kinh doanh: 50-100 vị trí",
              "Nhân viên vận hành: 30-50 vị trí",
              "Nhân viên bảo trì: 20-30 vị trí"
            ]
          }
        }
      ]
    },
    author: "Ban Nhân sự",
    tags: ["tuyển dụng", "nhân sự", "việc làm"],
    isPublished: true,
    slug: "plevia-city-tuyen-dung-nhan-su-chat-luong-cao-cho-du-an"
  }
];

export async function generateSampleNews() {
  try {
    console.log("Bắt đầu tạo bài viết mẫu...");
    
    for (const newsData of sampleNewsData) {
      const docRef = await addDoc(collection(db, "news_articles"), {
        ...newsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log(`Đã tạo bài viết: ${newsData.title} với ID: ${docRef.id}`);
    }
    
    console.log("Hoàn thành tạo bài viết mẫu!");
  } catch (error) {
    console.error("Lỗi khi tạo bài viết mẫu:", error);
  }
}

// Chạy script nếu được gọi trực tiếp
if (typeof window === 'undefined') {
  generateSampleNews();
} 