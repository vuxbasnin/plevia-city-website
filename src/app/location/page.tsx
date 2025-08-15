"use client";

import PageLayout from '@/components/layout/PageLayout';
import Map from '@/components/sections/Map/Map';
import ScrollReveal from '@/components/shared/ScrollReveal';
import ImageHeaderStatic from "@/components/sections/ImageHeaderStatic";
import TextBlock from '@/components/ui/TextBlock';
import FormInfo from "@/components/sections/FormInfo/FormInfo";
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import React from "react";

export default function LocationPage() {
    return (<PageLayout>
            <ScrollReveal>
                <Map/>
            </ScrollReveal>
            <ScrollReveal>
                <TitleLifestyle title="Tâm điểm giao thương – Một chạm ngàn tiện ích"/>
            </ScrollReveal>
            <ScrollReveal>
                <div style={{ marginBottom: '1rem' }}>
                <TextBlock
                    content="Sở hữu vị trí đắc địa ngay cửa ngõ trung tâm Pleiku, Plevia City là biểu tượng mới của phong cách sống thịnh vượng, kết nối toàn diện. Tọa lạc tại giao điểm chiến lược đường Lý Nam Đế – Quốc lộ 14, dự án liền kề hàng loạt trục huyết mạch như Lê Duẩn, Hùng Vương, Hàn Mặc Tử… giúp cư dân di chuyển nhanh chóng tới bệnh viện, trường học, trung tâm thương mại, khu du lịch và các tiện ích hiện hữu chỉ trong vài phút.
Từ Plevia City, bạn dễ dàng tiếp cận mọi nhu cầu sống, từ y tế, giáo dục, vui chơi giải trí đến mua sắm và thương mại. Tất cả chỉ cách 1–10 phút di chuyển."/>
                </div>
            </ScrollReveal>
            <ScrollReveal>
                <div style={{ marginBottom: '1rem' }}>
                <TextBlock
                    content="- Phía Bắc: kết nối trực tiếp Quốc lộ 14, thuận lợi giao thương liên tỉnh.<br />
                - Phía Nam: giáp khu dân cư sầm uất, sẵn tiềm năng kinh doanh.<br />
                - Phía Đông: gần bệnh viện, trường học, khu mua sắm.<br />
                - Phía Tây: liền kề khu du lịch và không gian xanh."/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <div style={{ marginBottom: '3rem' }}>
                <TextBlock
                    content="Tựa viên ngọc xanh giữa phố núi, Plevia City mang đến trải nghiệm an cư thông minh bậc nhất với công nghệ 4.0: AI an ninh, App quản lý cư dân, Wifi Mesh phủ toàn khu, Smart Home và trung tâm điều hành đô thị thông minh."/>
                </div>
            </ScrollReveal>

            <ScrollReveal>
                <ImageHeaderStatic imageUrl="/assets/location/vi_tri_1.png" fullImage={true}/>
            </ScrollReveal>
            {/*<ScrollReveal>*/}
            {/*  <TextBlock*/}
            {/*    content="Với hạ tầng đô thị đang phát triển mạnh mẽ tại Gia Lai, đặc biệt khu vực phía Đông – nơi tập trung loạt dự án nâng cấp và mở rộng đường, bến xe, sân bay – vị trí của Plevia không chỉ mang lại trải nghiệm sống tiện nghi mà còn mở ra <b>cơ hội đầu tư sinh lời bền vững</b> theo thời gian. Đây chính là yếu tố khiến Plevia trở nên thực sự khác biệt - một nơi sống lý tưởng để tận hưởng từng khoảnh khắc vừa là một cơ hội đầu tư đáng giá để sinh lời theo thời gian." />*/}
            {/*</ScrollReveal>*/}
            {/*  <ScrollReveal>*/}
            {/*      <TitleLifestyle title={"Liên kết vùng"}/>*/}
            {/*  </ScrollReveal>*/}
            {/*<ScrollReveal>*/}
            {/*  <ImageWithDoubleCaption*/}
            {/*      imageUrl="/assets/location/local_relation.svg" caption1={''} caption2={''}/>*/}
            {/*</ScrollReveal>*/}
            <ScrollReveal>
                <FormInfo/>
            </ScrollReveal>
        </PageLayout>);
} 