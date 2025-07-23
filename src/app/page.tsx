
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
          title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
          description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}
          sections={[
            {
              level: 1,
              subtitle: "KIẾN TRÚC",
              subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`
            },
            {
              level: 2,
              subtitle: "QUY HOẠCH",
              subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên chào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`
            },
            {
              level: 1,
              subtitle: "TIỆN ÍCH NỔI BẬT",
              subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
        />
      </ScrollReveal>
      <ScrollReveal>
        <TableLeftImageRight {...tableLeftImageRightExample} />
      </ScrollReveal>
      <ScrollReveal>
        <ParaImageVertical
          title="VỊ TRÍ ĐẮC ĐỊA – KẾT NỐI HOÀN HẢO"
          description={`Dự án Gladia Khang Điền tọa lạc tại mặt tiền đường Võ Chí Công, P. Bình Trưng (Quận 2), TP.HCM. Nơi đây được đánh giá là khu vực phát triển nhanh nhất tại TP.HCM. Nhiều dự án hạ tầng quan trọng kết nối về trung tâm Quận 1 và tuyến cao tốc Long Thành – Dầu Giây,… giúp khu Đông trở thành một khu đô thị mới đáng sống. Từ Gladia, cư dân di chuyển:`}
          bullets={[
            "Chỉ 10 phút đến Khu đô thị Thủ Thiêm",
            "Chỉ 20 phút đến Chợ Bến Thành",
            "Chỉ 20 phút đến Khu đô thị Phú Mỹ Hưng",
            "Chỉ 15 phút đến Khu Công nghệ Cao TP.HCM",
            "Chỉ 45 phút đến sân bay Quốc tế Long Thành"
          ]}
          subDescription="Gladia by the Waters dễ dàng tiếp cận đến các cơ sở Giáo dục, Giải trí, Mua sắm và Y tế chất lượng cao như: Trường American School, Trường Quốc tế Việt Úc (VAS), Bệnh viện Quốc tế Mỹ (AIH), Bệnh viện FV, Esttela Heights, Thiso Mall, Vietnam Country Gofl Club"
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-TRI-GLADIA-QUAN-2.webp"
          imageAlt="Vị trí dự án Gladia Khang Điền"
        >
          <div style={{ marginTop: 32 }}>
            <p>
              <b>Năm 2025 – 2026, Dự án Gladia Khang Điền khẳng định tiềm năng phát triển bởi các công trình giao thông trọng điểm tại Khu Đông TP.HCM</b>
            </p>
            <ul>
              <li>Tuyến đường Liên Cảng – Cát Lái – Phú Hữu kết nối với đường Vành Đai 3 dự kiến khởi công 2026.</li>
              <li>Đường Nguyễn Thị Định mở rộng 30m – 12 làn xe. Dự kiến khởi công 2026.</li>
              <li>Mở rộng Võ Chí Công – 12 làn. Dự kiến khởi công 2028.</li>
              <li>Đường Liên Phường –  hoàn thành năm 2026</li>
              <li>Nút Giao An Phú hoàn thành năm 2026.</li>
              <li>Sân bay Quốc tế Long Thành</li>
              <li>Gladia giúp khách hàng dễ dàng kết nối với các trung tâm, nhưng lại tọa lạc tại một không gian biệt lập với 3 mặt giáp sông</li>
            </ul>
          </div>
        </ParaImageVertical>
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
          description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}
          sections={[
            {
              level: 1,
              subtitle: "KIẾN TRÚC",
              subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`
            },
            {
              level: 2,
              subtitle: "QUY HOẠCH",
              subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên trào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`
            },
            {
              level: 1,
              subtitle: "TIỆN ÍCH NỔI BẬT",
              subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
          description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}
          sections={[
            {
              level: 1,
              subtitle: "KIẾN TRÚC",
              subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`
            },
            {
              level: 2,
              subtitle: "QUY HOẠCH",
              subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên trào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`
            },
            {
              level: 1,
              subtitle: "TIỆN ÍCH NỔI BẬT",
              subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
          description={`Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`}
          sections={[
            {
              level: 1,
              subtitle: "KIẾN TRÚC",
              subdescription: `Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị.\n\nThiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.`
            },
            {
              level: 2,
              subtitle: "QUY HOẠCH",
              subdescription: `Mật độ xây dựng chỉ 23,3%, 3 mặt giáp sông.\n5 công viên chủ đề bao gồm: Công viên trào mừng, Công viên Ven Sông, Công viên Sức khỏe và Công viên Cộng đồng.\nHệ giá trị 5 iFactors độc bản: iNature – Thiên nhiên, iEntertainment – Giải trí, iWel-being – Sức khỏe, iConvenience – Tiện nghi, iSustainability – Bền vững\nTiện ích: Hồ Cảnh Quan, Sân Golf mini, khu BBQ và đường chạy bộ 2km.\nThiết kế mảng xanh đa tầng.\nGladia Khang Điền không chỉ mang đến không gian sống xanh, trong lành mà còn là biểu tượng của sự đẳng cấp và tinh hoa, nơi mỗi ngày đều là một trải nghiệm tuyệt vời giữa thiên nhiên và sự sang trọng.`
            },
            {
              level: 1,
              subtitle: "TIỆN ÍCH NỔI BẬT",
              subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
          backgroundColor='gray'
        />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/MAT-BANG-DU-AN-GLADIA-KHANG-DIEN-QUAN-2-1.webp" fullImage={true} />
      </ScrollReveal>
      <ScrollReveal>
        <TabProject />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/NHA-PHO-LIEN-KE-VUON-GLADIA-KHANG-DIEN-1.jpg" fullImage={false} />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-TU-LAP-GLADIA-KHANG-DIEN-QUAN-2.jpg" fullImage={false} />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN-HCM-QUAN-2.jpg" fullImage={false} />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-DON-LAP-GLADIA-KHANG-DIEN-01.jpg" fullImage={false} />
      </ScrollReveal>
      <ScrollReveal>
        <TableLeftImageRight {...tableLeftImageRightPriceExample} />
      </ScrollReveal>
      <ScrollReveal>
        <ParaLeftDesRight
          title="CHÍNH SÁCH BÁN HÀNG GLADIA KHANG ĐIỀN – NĂM 2025"
          description={
            ``
          }
          sections={[
            {
              level: 1,
              subtitle: "PHƯƠNG THỨC THANH TOÁN",
              subdescription: `Chính sách thanh toán chuẩn:  20% ký HĐMB, 2025 thanh toán chỉ 30%, Năm 2026 thanh chỉ 65% nhận nhà. \n\n Chính sách thanh toán nhanh: Khách hàng TT 95%, nhận nhà chiết khấu tối thiểu 10%. \n\n Chính sách hỗ trợ lãi suất: Tỷ lệ vay 75%, hỗ trợ lãi suất 0%, Ân hạn gốc 18 tháng, thời gian vay tối đa 35 năm`
            },
            {
              level: 2,
              subtitle: "ĐẶT CHỖ SỚM – QUÀ TẶNG NHIỀU",
              subdescription: `Booking trước 31/07/2025 tặng 200 triệu.\n\n Booking từ 01/08/2025 đến thời điểm đóng tặng 100 triệu.\n\nMiễn Phí Quản Lý 24 tháng.\n\nTặng gói Samsung Smart Things – Smart Home`
            },
            {
              level: 1,
              subtitle: "TIỆN ÍCH NỔI BẬT",
              subdescription: `Hồ bơi tràn bờ, phòng gym, khu vui chơi trẻ em, khu BBQ ngoài trời, sân thể thao đa năng, vườn thiền, đường dạo bộ ven sông...`
            }
          ]}
          imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/CHINH-SACH-THANH-TOAN-DU-AN-GLADIA-KHANG-DIEN-QUAN-2.jpg"
          backgroundColor='white'
        />
      </ScrollReveal>
      <ScrollReveal>
        <ParaManyImage
          title='TIẾN ĐỘ XÂY DỰNG DỰ ÁN GLADIA KHANG ĐIỀN – THÁNG 05/2025'
          paragraph={`Cập nhật tiến độ xây dựng mới nhất dự án Gladia. Nhà thầu An Phong và Weathcons đang tích cực xây dựng, khối lượng công việc đạt hơn 95%. Trong đó:

Hạ tầng dự án đã hoàn thiện.
Chủ đầu tư đang trồng và chăm sóc cây xanh của dự án.
Đã hoàn thiện nhà Mẫu và nhà điều hành
Biệt thự Đơn Lập, Song Lập Tứ Lập, Nhà phố liên kế đang hoàn thiện
Tiện ích, nhà điều hành, công viên hàng hoàn thiện
Chủ đầu tư Khang Điền – Keppel Land  dự kiến hoàn thiện tiện ích, nhà mẫu và sản phẩm vào Quý 3/2025.`}
          images={[
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-DU-AN-GLADIA-KHANG-DIEN-KEPPEL-LAND-THANG-06-1024x683.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-GLADIA-THANG-06-1024x683.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/TIEN-DO-DU-AN-GLADIA-KHANG-DIEN-THANG-06-1024x682.jpeg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-02-1024x576.webp",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-04-1024x576.webp",
            "https://khangdienhcm.com/wp-content/uploads/2025/05/TIEN-DO-XAY-DUNG-GLADIA-KHANG-DIEN-THANG-06-2025-KDHCM-1024x576.jpg",
            "https://khangdienhcm.com/wp-content/uploads/2025/04/gladia-KDH-7-1024x576.jpg",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-05-1024x576.webp",
            "https://khangdienhcm.com/wp-content/uploads/2025/06/tien-do-du-an-gladia-03-1024x576.webp"
          ]}
        />
      </ScrollReveal>
      <ScrollReveal>
        <TabProjectBgBlue />
      </ScrollReveal>
      <ScrollReveal>
        <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-SAO-NEN-MUA-GLADIA-KHANG-DIEN.jpg" fullImage={false} />
      </ScrollReveal>
    <ScrollReveal>
        <LibImage />
    </ScrollReveal>
      <ScrollReveal>
        <NewsSectionExample />
      </ScrollReveal>
      <ScrollReveal>
        <FormReport />
      </ScrollReveal>
    </PageLayout>
  );
}