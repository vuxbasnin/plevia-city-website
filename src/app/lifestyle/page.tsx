"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImage from '@/components/sections/LibImage/LibImage';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';
import ParaLeftDesRight from '@/components/sections/ParaLeftDesRight/ParaLeftDesRight';

export default function LifeStylePage() {
    return (<PageLayout>
        <ScrollReveal>
            <ImageHeader />
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
        <ScrollReveal>
            <ParaImageVertical
                title="SỐNG HIỆN ĐẠI, HƯỞNG TRỌN MỌI GIÁ TRỊ"
                description1={`Tại Plevia City, tiện ích không chỉ là những công trình phụ trợ – mà chính là nền tảng tạo nên một phong cách sống hiện đại, trọn vẹn và khác biệt. Từng hạng mục được đầu tư đồng bộ và hài hòa, nhằm đáp ứng nhu cầu của cư dân năng động trong thời đại số, nơi ở – làm việc – nghỉ ngơi đều diễn ra trong một hệ sinh thái khép kín, thuận tiện.`}
                description2={``}
                imageUrl=""
            >
            </ParaImageVertical>
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftDesRight
                title="Nâng tầm trải nghiệm sống thông minh"
                description={`Plevia City được tích hợp hệ thống tiện ích công nghệ thông minh ngay trong từng trải nghiệm thường nhật: camera AI an ninh 24/7, cảm biến khói – đám cháy, wifi mesh toàn khu và đặc biệt là ứng dụng cư dân đồng bộ – tất cả tạo nên một môi trường sống hiện đại, an toàn.`}
                sections={[]}
                imageUrl=""
                isShowLibImage={true}
                is169={true}
                reverse={true}
                dotEnabled={false}
                images={[
                    {
                        id: '1',
                        url: '/assets/lifestyle/6.png',
                        caption: ''
                    },
                    {
                        id: '2',
                        url: '/assets/lifestyle/7.png',
                        caption: ''
                    },
                    {
                        id: '3',
                        url: '/assets/lifestyle/8.png',
                        caption: ''
                    },
                    {
                        id: '4',
                        url: '/assets/lifestyle/9.png',
                        caption: ''
                    },
                    {
                        id: '5',
                        url: '/assets/lifestyle/10.png',
                        caption: ''
                    },
                    {
                        id: '6',
                        url: '/assets/lifestyle/11.png',
                        caption: ''
                    }
                ]}
            />
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftDesRight
                title="Kết nối cộng đồng, nâng cao chất lượng sống"
                description="Từ trường mầm non quốc tế, công viên ánh sáng, hồ bơi thư giãn đến không gian rèn luyện thể chất như gym, yoga, spa – mọi nhu cầu chăm sóc sức khỏe thể chất và tinh thần đều được đặt ngay trong khuôn viên nội khu."
                sections={[]}
                imageUrl=""
                isShowLibImage={true}
                is169={true}
                images={[
                    {
                        id: '1',
                        url: '/assets/lifestyle/1.png',
                        caption: ''
                    },
                    {
                        id: '2',
                        url: '/assets/lifestyle/2.png',
                        caption: ''
                    },
                    {
                        id: '3',
                        url: '/assets/lifestyle/3.png',
                        caption: ''
                    },
                    {
                        id: '4',
                        url: '/assets/lifestyle/4.png',
                        caption: ''
                    },
                    {
                        id: '5',
                        url: '/assets/lifestyle/5.png',
                        caption: ''
                    }
                ]}
            />
        </ScrollReveal>
    </PageLayout>);
} 