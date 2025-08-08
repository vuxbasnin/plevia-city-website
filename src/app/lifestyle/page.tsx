"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImage from '@/components/sections/LibImage/LibImage';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';
import ParaLeftDesRight from '@/components/sections/ParaLeftDesRight/ParaLeftDesRight';
import FormInfo from '@/components/sections/FormInfo/FormInfo';
import ParaLeftLibImage from "@/components/sections/ParaLeftLibImage";
import LibImageHome from "@/components/sections/LibImageHome/LibImageHome";
import ParaImageVerticalLifestyle from "@/components/sections/ParaImageVerticalLifestyle";

export default function LifeStylePage() {
    return (<PageLayout>
        <ScrollReveal>
            <ImageHeader imageUrl="/assets/lifestyle/banner_lifestyle.png"/>
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftLibImage
                title="CHUẨN MỰC SỐNG THỜI ĐẠI SỐ"
                description=""
                sections={[{
                    level: 1,
                    subtitle: "",
                    subdescription: `Plevia City không đơn thuần là nơi an cư, mà còn là biểu tượng cho phong cách sống hiện đại, thông minh nơi công nghệ trở thành nền tảng kiến tạo nên một không gian sống chuẩn mực thời đại số. Mỗi căn nhà là một mắt xích trong tổng thể được quy hoạch đồng bộ, thông minh – nơi kiến trúc không chỉ đẹp mà còn được tối ưu để tận dụng hết công năng từ thiên nhiên ban tặng giúp trải nghiệm sống.`
                }, {
                    level: 2,
                    subtitle: "",
                    subdescription: `Tại đây, cư dân sẽ cảm nhận rõ rệt lối sống “eco smart living” qua từng bước chân: từ hệ thống camera AI 24/7, wifi mesh toàn khu, cảm biến thông minh,... Tất cả tạo nên một hệ sinh thái sống tiện nghi – thông minh – xanh mát, hài hòa giữa công nghệ và thiên nhiên.`
                }]}
                is169={true}
                images={[{
                    id: '0', url: '/assets/lifestyle/living_standard/ls_0.png', caption: ''
                }, {
                    id: '1', url: '/assets/lifestyle/living_standard/ls_1.jpg', caption: ''
                }, {
                    id: '2', url: '/assets/lifestyle/living_standard/ls_2.jpg', caption: ''
                }, {
                    id: '3', url: '/assets/lifestyle/living_standard/ls_3.jpg', caption: ''
                }, {
                    id: '4', url: '/assets/lifestyle/living_standard/ls_4.jpg', caption: ''
                }]}
            />
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftLibImage
                title="Cộng đồng dân cư văn minh, gắn kết"
                description=""
                sections={[{
                    level: 1,
                    subtitle: "",
                    subdescription: `Tại Plevia City, mỗi cư dân không chỉ là hàng xóm – mà còn là một phần của một cộng đồng văn minh, gắn kết.`
                }, {
                    level: 2,
                    subtitle: "",
                    subdescription: `Tại đây, giá trị sống không chỉ đo bằng tiện nghi hiện đại, mà còn bằng những mối quan hệ bền chặt và sự sẻ chia giữa những con người cùng chung lý tưởng “Sống xanh – Sống thông minh – Sống hạnh phúc”.`
                }]}
                is169={true}
                reverse={true}
                images={[{
                    id: '0', url: '/assets/lifestyle/scientific_planning/sp_0.png', caption: ''
                }, {
                    id: '1', url: '/assets/lifestyle/scientific_planning/sp_1.png', caption: ''
                }, {
                    id: '2', url: '/assets/lifestyle/scientific_planning/sp_4.jpg', caption: ''
                }]}
            />
        </ScrollReveal>
        <ScrollReveal>
            <div id="house-models">
                <LibImageHome/>
            </div>
        </ScrollReveal>
        <ScrollReveal>
            <div id="interior-designs">
                <ParaImageVerticalLifestyle
                    title="SỐNG HIỆN ĐẠI, HƯỞNG TRỌN MỌI GIÁ TRỊ"
                    description={`Tại Plevia City, tiện ích không chỉ là những công trình phụ trợ – mà chính là nền tảng tạo nên một phong cách sống hiện đại, trọn vẹn và khác biệt. Từng hạng mục được đầu tư đồng bộ và hài hòa, nhằm đáp ứng nhu cầu của cư dân năng động trong thời đại số, nơi ở – làm việc – nghỉ ngơi đều diễn ra trong một hệ sinh thái khép kín, thuận tiện.`}
                    imageUrl="/assets/lifestyle/modern_living.png"
                >
                </ParaImageVerticalLifestyle>
            </div>
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftLibImage
                title="Nâng tầm trải nghiệm sống thông minh"
                description={`Plevia City được tích hợp hệ thống tiện ích công nghệ thông minh ngay trong từng trải nghiệm thường nhật: camera AI an ninh 24/7, cảm biến khói – đám cháy, wifi mesh toàn khu và đặc biệt là ứng dụng cư dân đồng bộ – tất cả tạo nên một môi trường sống hiện đại, an toàn.`}
                bullets={["- Mạng lưới **Camera AI** toàn khu hoạt động 24/7, hỗ trợ nhận diện thông minh và cảnh báo tức thì.", "- Hệ thống **cảm biến khói và cháy nổ** được bố trí tại các vị trí trọng yếu, đảm bảo phát hiện sớm và xử lý kịp thời các tình huống khẩn cấp.", "- Hạ tầng **Wi-Fi mesh** phủ sóng toàn khu giúp cư dân kết nối liền mạch ở bất kỳ đâu.", "- **Ứng dụng cư dân đồng bộ** đóng vai trò như \"trợ lý số\", cho phép cư dân đặt lịch tiện ích, theo dõi hoá đơn, nhận thông báo và tương tác với ban quản lý chỉ qua vài thao tác.", "- **Khóa cửa thông minh** được đặt ở mỗi căn nhà giúp kiểm soát ra vào an toàn và thuận tiện, góp phần tạo nên một không gian sống hiện đại và đầy cảm hứng.",]}
                is169={true}
                reverse={true}
                dotEnabled={false}
                images={[{
                    id: '0', url: '/assets/lifestyle/living_experience/le_0.png', caption: ''
                }, {
                    id: '1', url: '/assets/lifestyle/living_experience/le_1.png', caption: ''
                }, {
                    id: '2', url: '/assets/lifestyle/living_experience/le_12.png', caption: ''
                }, {
                    id: '3', url: '/assets/lifestyle/living_experience/le_13.png', caption: ''
                }]}
            />
        </ScrollReveal>
        <ScrollReveal>
            <ParaLeftLibImage
                title="Kết nối cộng đồng, nâng cao chất lượng sống"
                description="Tại khu đô thị, cư dân sẽ được trải nghiệm một hệ sinh thái tiện ích toàn diện, nơi mọi nhu cầu về sức khỏe, thư giãn và gắn kết cộng đồng đều được đáp ứng. Tất cả tạo nên một môi trường sống năng động, hiện đại và đáng mơ ước cho cư dân mọi lứa tuổi."
                sections={[]}
                bullets={["- **Phòng gym** được trang bị thiết bị hiện đại", "- **Không gian tập yoga** yên tĩnh giúp cân bằng tinh thần\n", "- **Khu spa thư giãn** mang đến những phút giây nghỉ ngơi trọn vẹn sau ngày dài\n", "- **Công viên ánh sáng** được phủ cây xanh rộng rãi là nơi lý tưởng để đi dạo, hít thở không khí trong lành", "- **Trường mẫu giáo chuẩn quốc tế** - nơi trẻ em được học tập và phát triển trong môi trường an toàn, hiện đại, giàu tính tương tác", "- **Sân pickleball** – môn thể thao thời thượng đang được ưa chuộng là điểm hẹn lý tưởng cho những trận đấu sôi động cùng bạn bè và gia đình.",

                ]}
                is169={true}
                images={[{
                    id: '0', url: '/assets/lifestyle/connecting_community/cc_0.png', caption: ''
                },{
                    id: '1', url: '/assets/lifestyle/connecting_community/cc_1.jpg', caption: ''
                }, {
                    id: '2', url: '/assets/lifestyle/connecting_community/cc_2.jpg', caption: ''
                }, {
                    id: '3', url: '/assets/lifestyle/connecting_community/cc_3.png', caption: ''
                }, {
                    id: '4', url: '/assets/lifestyle/connecting_community/cc_4.png', caption: ''
                }, {
                    id: '5', url: '/assets/lifestyle/connecting_community/cc_5.png', caption: ''
                }, {
                    id: '6', url: '/assets/lifestyle/connecting_community/cc_6.png', caption: ''
                }]}
            />
        </ScrollReveal>
        <ScrollReveal>
            <FormInfo />
        </ScrollReveal>
    </PageLayout>);
} 