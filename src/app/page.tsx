
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
        />
      </ScrollReveal>

      {/*<ScrollReveal>*/}
      {/*  <ParaLeftDesRight*/}
      {/*    title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"*/}
      {/*    description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}*/}
      {/*    sections={[*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "KIẾN TRÚC",*/}
      {/*        subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 2,*/}
      {/*        subtitle: "QUY HOẠCH",*/}
      {/*        subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên trào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "TIỆN ÍCH NỔI BẬT",*/}
      {/*        subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`*/}
      {/*      }*/}
      {/*    ]}*/}
      {/*    imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"*/}
      {/*  />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ParaLeftDesRight*/}
      {/*    title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"*/}
      {/*    description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}*/}
      {/*    sections={[*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "KIẾN TRÚC",*/}
      {/*        subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 2,*/}
      {/*        subtitle: "QUY HOẠCH",*/}
      {/*        subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên trào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "TIỆN ÍCH NỔI BẬT",*/}
      {/*        subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`*/}
      {/*      }*/}
      {/*    ]}*/}
      {/*    imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"*/}
      {/*    backgroundColor='gray'*/}
      {/*  />*/}
      {/*</ScrollReveal>*/}
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
                {/*<div style={{ marginTop: 32 }}>*/}
                {/*  <p>*/}
                {/*    <b>Năm 2025 – 2026, Dự án Gladia Khang Điền khẳng định tiềm năng phát triển bởi các công trình giao thông trọng điểm tại Khu Đông TP.HCM</b>*/}
                {/*  </p>*/}
                {/*  <ul>*/}
                {/*    <li>Tuyến đường Liên Cảng – Cát Lái – Phú Hữu kết nối với đường Vành Đai 3 dự kiến khởi công 2026.</li>*/}
                {/*    <li>Đường Nguyễn Thị Định mở rộng 30m – 12 làn xe. Dự kiến khởi công 2026.</li>*/}
                {/*    <li>Mở rộng Võ Chí Công – 12 làn. Dự kiến khởi công 2028.</li>*/}
                {/*    <li>Đường Liên Phường –  hoàn thành năm 2026</li>*/}
                {/*    <li>Nút Giao An Phú hoàn thành năm 2026.</li>*/}
                {/*    <li>Sân bay Quốc tế Long Thành</li>*/}
                {/*    <li>Gladia giúp khách hàng dễ dàng kết nối với các trung tâm, nhưng lại tọa lạc tại một không gian biệt lập với 3 mặt giáp sông</li>*/}
                {/*  </ul>*/}
                {/*</div>*/}
            </ParaImageVertical>
        </ScrollReveal>
      {/*  <ScrollReveal>*/}
      {/*      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/NHA-PHO-LIEN-KE-VUON-GLADIA-KHANG-DIEN-1.jpg" fullImage={false} />*/}
      {/*  </ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-TU-LAP-GLADIA-KHANG-DIEN-QUAN-2.jpg" fullImage={false} />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN-HCM-QUAN-2.jpg" fullImage={false} />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-DON-LAP-GLADIA-KHANG-DIEN-01.jpg" fullImage={false} />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <TableLeftImageRight {...tableLeftImageRightPriceExample} />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ParaLeftDesRight*/}
      {/*    title="CHÍNH SÁCH BÁN HÀNG GLADIA KHANG ĐIỀN – NĂM 2025"*/}
      {/*    description={*/}
      {/*      ``*/}
      {/*    }*/}
      {/*    sections={[*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "PHƯƠNG THỨC THANH TOÁN",*/}
      {/*        subdescription: `Chính sách thanh toán chuẩn:  20% ký HĐMB, 2025 thanh toán chỉ 30%, Năm 2026 thanh chỉ 65% nhận nhà. \n\n Chính sách thanh toán nhanh: Khách hàng TT 95%, nhận nhà chiết khấu tối thiểu 10%. \n\n Chính sách hỗ trợ lãi suất: Tỷ lệ vay 75%, hỗ trợ lãi suất 0%, Ân hạn gốc 18 tháng, thời gian vay tối đa 35 năm`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 2,*/}
      {/*        subtitle: "ĐẶT CHỖ SỚM – QUÀ TẶNG NHIỀU",*/}
      {/*        subdescription: `Booking trước 31/07/2025 tặng 200 triệu.\n\n Booking từ 01/08/2025 đến thời điểm đóng tặng 100 triệu.\n\nMiễn Phí Quản Lý 24 tháng.\n\nTặng gói Samsung Smart Things – Smart Home`*/}
      {/*      },*/}
      {/*      {*/}
      {/*        level: 1,*/}
      {/*        subtitle: "TIỆN ÍCH NỔI BẬT",*/}
      {/*        subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`*/}
      {/*      }*/}
      {/*    ]}*/}
      {/*    imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/CHINH-SACH-THANH-TOAN-DU-AN-GLADIA-KHANG-DIEN-QUAN-2.jpg"*/}
      {/*    backgroundColor='white'*/}
      {/*  />*/}
      {/*</ScrollReveal>*/}
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
      {/*<ScrollReveal>*/}
      {/*  <TabProjectBgBlue />*/}
      {/*</ScrollReveal>*/}
      {/*<ScrollReveal>*/}
      {/*  <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-SAO-NEN-MUA-GLADIA-KHANG-DIEN.jpg" fullImage={false} />*/}
      {/*</ScrollReveal>*/}

      <ScrollReveal>
        <NewsSectionExample />
      </ScrollReveal>
      <ScrollReveal>
        <FormInfo />
      </ScrollReveal>
    </PageLayout>
  );
}