
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

export default function HomePage() {
  return (
    <PageLayout>
      <ImageHeader />
      <ParaLeftDesRight
        title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
        description={
          `Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`
        }
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
      {/* Section: THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH - KIẾN TRÚC */}
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-TRI-GLADIA-QUAN-2.webp" />
      <TableLeftImageRight {...tableLeftImageRightExample} />
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
      <ParaLeftDesRight
        title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
        description={
          `Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`
        }
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
      <ParaLeftDesRight
        title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
        description={
          `Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`
        }
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
      <ParaLeftDesRight
        title="THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH"
        description={
          `Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.\n\nLấy cảm hứng từ kiến trúc tân cổ điển sang trọng và tinh thần nghỉ dưỡng sinh thái, Gladia kiến tạo nên không gian sống biệt lập giữa thiên nhiên xanh mát, nơi từng bước chân đều cảm nhận được sự tinh tế, an yên và riêng tư tuyệt đối`
        }
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
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/VI-TRI-GLADIA-QUAN-2.webp" />
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/NHA-PHO-LIEN-KE-VUON-GLADIA-KHANG-DIEN-1.jpg" />
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-TU-LAP-GLADIA-KHANG-DIEN-QUAN-2.jpg" />
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN-HCM-QUAN-2.jpg" />
      <ImageHeaderStatic imageUrl="https://khangdienhcm.com/wp-content/uploads/2025/07/BIET-THU-DON-LAP-GLADIA-KHANG-DIEN-01.jpg" />
      <TableLeftImageRight {...tableLeftImageRightPriceExample} />
    </PageLayout>
  );
}