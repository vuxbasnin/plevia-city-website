"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import AutoScrollSmall from '@/components/ui/AutoScroll/AutoScrollSmall';
import TabExample2 from '@/components/ui/Tab/TabExample2';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImage from '@/components/sections/LibImage/LibImage';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';

export default function StyleLifePage() {
  return (
    <PageLayout>
      <ScrollReveal>
        <ImageHeader/>
      </ScrollReveal>
      <ScrollReveal>
        <ParaImageVertical
          title={'CHUẨN MỰC SỐNG THỜI ĐẠI SỐ'}
          description1={'Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số. Mỗi căn nhà là một mắt xích trong tổng thể được quy hoạch đồng bộ, thông minh – nơi kiến trúc không chỉ đẹp mà còn được tối ưu để tận dụng hết công năng từ thiên nhiên ban tặng giúp trải nghiệm sống.'}
          description2={'Tại đây, cư dân sẽ cảm nhận rõ rệt lối sống “eco smart living” qua từng bước chân: từ hệ thống camera AI 24/7, wifi mesh toàn khu, cảm biến thông minh,... Tất cả tạo nên một hệ sinh thái sống tiện nghi – thông minh – xanh mát, hài hòa giữa công nghệ và thiên nhiên.'}
          imageUrl={''}
          isLibImage={true}
        />
      </ScrollReveal>
      <ScrollReveal>
        <ParaImageVertical
          title={'QUY HOẠCH KHOA HỌC, KẾT NỐI THÔNG MINH '}
          description1={'Plevia City được quy hoạch theo hướng đô thị hiện đại, lấy tính khoa học và kết nối thông minh làm nền tảng. Dự án gồm 9 phân khu mang ký hiệu A đến K, được bố trí đối xứng theo trục giao thông trung tâm – trục đường huyết mạch dẫn trực tiếp ra tuyến đường lớn.'}
          description2={'Mỗi phân khu đều có lối đi thuận tiện, kết nối liền mạch với mạng lưới giao thông nội khu rộng rãi, không hề tồn tại điểm thắt hay đường cụt, giúp cư dân di chuyển dễ dàng đến bất kỳ vị trí nào trong khu đô thị. Quy hoạch ưu tiên sự tiếp cận nhanh chóng với các tiện ích chung đảm bảo mọi cư dân đều được tận hưởng trải nghiệm sống như nhau dù ở bất kỳ phân khu nào.'}
          imageUrl={'https://thanhxuanvalley.com/assets/custom/dnkt/Phu%20Quoc%20Marina.jpg'}
        />
      </ScrollReveal>
      <ScrollReveal>
        <LibImage />
      </ScrollReveal>
    </PageLayout>
  );
} 