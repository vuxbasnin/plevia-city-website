
"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import Overview from '@/components/sections/Overview/OverviewSection';
import TabExample from '@/components/ui/Tab/TabExample';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import FormInfo from '@/components/sections/FormInfo/FormInfo';
import ParaLeftDesRight, { paraLeftDesRightExample } from '@/components/sections/ParaLeftDesRight/ParaLeftDesRight';
import TableLeftImageRight, { tableLeftImageRightExample, tableLeftImageRightPriceExample } from '@/components/sections/TableLeftImageRight/TableLeftImageRight';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';
import ImageHeaderStatic from '@/components/sections/ImageHeaderStatic';
import TabProject from '@/components/sections/TabProject/TabProject';
import ImageLeftDesRight from '@/components/ui/ImageLeft_DesRight/ImageLeft_DesRight';
import ParaManyImage from '@/components/sections/ParaManyImage/ParaManyImage';
import { title } from 'process';
import TabProjectBgBlue from '@/components/sections/TabProjectBgBlue/TabProjectBgBlue';
import News4Item from '@/components/sections/News4Item/News4Item';
import FormReport from '@/components/sections/FormReport/FormReport';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImage from "@/components/sections/LibImage/LibImage";

export default function HomePage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader />
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="PLEVIA CITY - NƠI THỂ HIỆN ĐẲNG CẤP"
          description={``}
          sections={[
            {
              level: 1,
              subtitle: "",
              subdescription: `Plevia City là khu đô thị thông minh đầu tiên có ứng dụng “Trí tuệ nhân tạo” được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.`
            },
            {
              level: 2,
              subtitle: "",
              subdescription: `Plevia City được phát triển với tầm nhìn trở thành khu đô thị kiểu mẫu thời đại số – nơi công nghệ không chỉ là nền tảng vận hành, mà còn là động lực kiến tạo một môi trường sống văn minh, tiện nghi và an toàn. Với việc ứng dụng đồng bộ trí tuệ nhân tạo, hạ tầng số và tiện ích thông minh, Plevia City hướng đến hình mẫu đô thị tiên phong tại Tây Nguyên – mở ra chuẩn sống mới cho thế hệ cư dân thời hiện đại.
`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Được quy hoạch bài bản theo định hướng "hiện đại – thông minh – bền vững", Plevia City không chỉ mở ra tiềm năng lớn cho các nhà đầu tư mà còn kiến tạo nên một phong cách sống mới tại phố núi – nơi thiên nhiên, công nghệ và con người cùng vận hành hài hòa.
`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="THÔNG TIN TỔNG QUAN"
          description={``}
          sections={[
            {
              level: 1,
              subtitle: "",
              subdescription: `Tên dự án: Plevia City`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Vị trí: 63–65 Lý Nam Đế, p. Hội Phú, t.Gia Lai`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Chủ đầu tư: Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Diện tích: 7,04 ha`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Quy mô: 368 căn nhà phố & shophouse
`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Diện tích sản phẩm: 110 m² đến 120 m²`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Thiết kế: Công ty Kiến Trúc Việt`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Pháp lý: Sổ từng nền – Quy hoạch 1/500`
            },
            {
              level: 1,
              subtitle: "",
              subdescription: `Tiện ích nội khu: Công viên, gym, spa, sân thể thao, trường mầm non…`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
          reverse={true}
          dotEnabled={true}
        />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/MAT-BANG-DU-AN-GLADIA-KHANG-DIEN-QUAN-2-1.webp" fullImage={true} />
      </ScrollReveal>
      <ScrollReveal>
        <TabProject />
      </ScrollReveal>

      <ScrollReveal>
        <ParaImageVertical
          title="VỊ TRÍ ĐẮC ĐỊA – KẾT NỐI HOÀN HẢO"
          description1={`Plevia City sở hữu vị trí đắc địa khi nằm trên trục đường chính nội đô phường Hội Phú cách trung tâm hành chính thành phố chưa đầy 2km. Trong bối cảnh quy hoạch đến năm 2030 chỉ khoảng 7% diện tích đô thị là đất bằng phẳng thuận lợi cho việc phát triển khu đô thị cao cấp, việc Plevia City phát triển trên vùng đất phẳng rộng lớn là một lợi thế cực kỳ hiếm có, lý tưởng để hình thành một đô thị hiện đại và đồng bộ.`}
          description2={`Về lâu dài, Plevia City sẽ được hưởng lợi trực tiếp từ các dự án hạ tầng quy hoạch trọng điểm của tỉnh trong vài năm tới, cụ thể:
`}

          bullets={[
            "Sân bay Pleiku đang khai thác và có kế hoạch mở thêm đường bay quốc tế",
            "Sân bay dự phòng đang nghiên cứu phương án dân dụng",
            "Cao tốc Pleiku – Quy Nhơn đang đẩy mạnh đầu tư, kết hợp các tuyến QL 14, QL 19 tạo thành mạng giao thông liên kết xuyên vùng",
            "Phát triển khu công nghiệp Nam Pleiku ",
          ]}
          subDescription="Gladia by the Waters dễ dàng tiếp cận đến các cơ sở Giáo dục, Giải trí, Mua sắm và Y tế chất lượng cao như: Trường American School, Trường Quốc tế Việt Úc (VAS), Bệnh viện Quốc tế Mỹ (AIH), Bệnh viện FV, Esttela Heights, Thiso Mall, Vietnam Country Gofl Club"
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-TRI-GLADIA-QUAN-2.webp"
          imageAlt="Vị trí dự án Gladia Khang Điền"
        >
        </ParaImageVertical>
      </ScrollReveal>
      <ScrollReveal>
        <TabExample />
      </ScrollReveal>
      <ScrollReveal>
        <LibImage />
      </ScrollReveal>
      <ScrollReveal>
        <ParaManyImage
          title="TIẾN ĐỘ XÂY DỰNG DỰ ÁN"
          paragraph="Cập nhật tiến độ xây dựng mới nhất dự án Gladia. Nhà thầu An Phong và Weathcons đang tích cực xây dựng, khối lượng công việc đạt hơn 95%. Trong đó:"
          bullets={[
            "Hạ tầng dự án đã hoàn thiện.",
            "Chủ đầu tư đang trồng và chăm sóc cây xanh của dự án.",
            "Đã hoàn thiện nhà Mẫu và nhà điều hành",
            "Biệt thự Đơn Lập, Song Lập Tứ Lập, Nhà phố liên kế đang hoàn thiện",
            "Tiện ích, nhà điều hành, công viên hàng hoàn thiện"
          ]}
          footer="Chủ đầu tư Khang Điền – Keppel Land dự kiến hoàn thiện tiện ích, nhà mẫu và sản phẩm vào Quý 3/2025."
          images={[
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-DU-AN-GLADIA-KHANG-DIEN-KEPPEL-LAND-THANG-06-1024x683.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-GLADIA-THANG-06-1024x683.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-DU-AN-GLADIA-KHANG-DIEN-THANG-06-1024x682.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-02-1024x576.webp",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-04-1024x576.webp",
            "https://khangdienhcm.com/wp-content/uploads/2025/05/TIEN-DO-XAY-DUNG-GLADIA-KHANG-DIEN-THANG-06-2025-KDHCM-1024x576.jpg",
          ]}
        />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSectionExample />
      </ScrollReveal>
      <ScrollReveal>
        <FormInfo />
      </ScrollReveal>
    </PageLayout>
  );
}