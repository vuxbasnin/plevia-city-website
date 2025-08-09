"use client";

import PageLayout from '@/components/layout/PageLayout';
import ImageHeader from '@/components/sections/ImageHeader';
import TabExample from '@/components/ui/Tab/TabExample';
import NewsSectionExample from '@/components/sections/News/NewsSectionExample';
import FormInfo from '@/components/sections/FormInfo/FormInfo';
import ParaImageVertical from '@/components/sections/ParaImageVertical/ParaImageVertical';
import ImageHeaderStatic from '@/components/sections/ImageHeaderStatic';
import ParaManyImage from '@/components/sections/ParaManyImage/ParaManyImage';
import ScrollReveal from '@/components/shared/ScrollReveal';
import LibImageHome from '@/components/sections/LibImageHome/LibImageHome';
import LibImageFurnitureHome from '@/components/sections/LibImageFurnitureHome/LibImageFurnitureHome';
import SectionOneHomeExample from '@/components/sections/SectionOneHome/SectionOneHomeExample';
import TabProject from "@/components/sections/TabProject/TabProject";
import StructuredData from '@/components/shared/StructuredData';
import SocialMediaDebug from '@/components/shared/SocialMediaDebug';
import TitleLifestyle from "@/components/sections/TitleLifestyle";
import React from "react";

export default function HomePage() {
    return (
        <>
            <StructuredData type="home" />
            <PageLayout>
                <ScrollReveal>
                    <ImageHeader
                        imageUrl="https://res.cloudinary.com/dytm93eoj/image/upload/v1753845485/home-assets/ssknbjvtcnhrl9woana1.jpg"/>
                </ScrollReveal>
                <ScrollReveal>
                    <SectionOneHomeExample/>
                </ScrollReveal>
                <ScrollReveal>
                    <ParaImageVertical
                        title="VỊ TRÍ ĐẮC ĐỊA – KẾT NỐI HOÀN HẢO"
                        description1={`Plevia City sở hữu vị trí đắc địa khi nằm trên trục đường chính nội đô phường Hội Phú cách trung tâm hành chính thành phố chưa đầy 2km. Trong bối cảnh quy hoạch đến năm 2030 chỉ khoảng 7% diện tích đô thị là đất bằng phẳng thuận lợi cho việc phát triển khu đô thị cao cấp, việc Plevia City phát triển trên vùng đất phẳng rộng lớn là một lợi thế cực kỳ hiếm có, lý tưởng để hình thành một đô thị hiện đại và đồng bộ.`}
                        description2={`Về lâu dài, Plevia City sẽ được hưởng lợi trực tiếp từ các dự án hạ tầng quy hoạch trọng điểm của tỉnh trong vài năm tới, cụ thể:`}
                        bullets={["- Sân bay Pleiku đang khai thác và có kế hoạch mở thêm đường bay quốc tế", "- Sân bay dự phòng đang nghiên cứu phương án dân dụng", "- Cao tốc Pleiku – Quy Nhơn đang đẩy mạnh đầu tư, kết hợp các tuyến QL 14, QL 19 tạo thành mạng giao thông liên kết xuyên vùng", "- Phát triển khu công nghiệp Nam Pleiku ",]}
                        subDescription="Gladia by the Waters dễ dàng tiếp cận đến các cơ sở Giáo dục, Giải trí, Mua sắm và Y tế chất lượng cao như: Trường American School, Trường Quốc tế Việt Úc (VAS), Bệnh viện Quốc tế Mỹ (AIH), Bệnh viện FV, Esttela Heights, Thiso Mall, Vietnam Country Gofl Club"
                        imageUrl="https://res.cloudinary.com/dytm93eoj/image/upload/v1753845487/home-assets/gn3glzslmrkope10iufp.png"
                        imageAlt="Vị trí dự án Plevia City"
                    >
                    </ParaImageVertical>
                </ScrollReveal>
                <ScrollReveal>
                    <TitleLifestyle title="Mặt bằng dự án" />
                </ScrollReveal>

                <ScrollReveal>
                    <ImageHeaderStatic
                        imageUrl="/assets/home/mat_bang.png"
                        fullImage={true}/>
                </ScrollReveal>
                <ScrollReveal>
                    <TabProject/>
                </ScrollReveal>
                <ScrollReveal>
                    <LibImageHome/>
                </ScrollReveal>
                
                {/* Khoảng cách giữa 2 section */}
                <div className="py-8 bg-transparent"></div>
                
                <ScrollReveal>
                    <LibImageFurnitureHome/>
                </ScrollReveal>


                <ScrollReveal>
                    <TabExample/>
                </ScrollReveal>

                <ScrollReveal>
                    <ParaManyImage
                        title="TIẾN ĐỘ XÂY DỰNG DỰ ÁN"
                        paragraph="Đang cập nhật"
                        // bullets={[
                        //   "Hạ tầng dự án đã hoàn thiện.",
                        //   "Chủ đầu tư đang trồng và chăm sóc cây xanh của dự án.",
                        //   "Đã hoàn thiện nhà Mẫu và nhà điều hành",
                        //   "Biệt thự Đơn Lập, Song Lập Tứ Lập, Nhà phố liên kế đang hoàn thiện",
                        //   "Tiện ích, nhà điều hành, công viên hàng hoàn thiện"
                        // ]}
                        // footer="Chủ đầu tư Khang Điền – Keppel Land dự kiến hoàn thiện tiện ích, nhà mẫu và sản phẩm vào Quý 3/2025."
                        images={[
                            "/assets/home/tien_do_1.png",
                            "/assets/home/tien_do_2.png",
                            "/assets/home/tien_do_3.png",
                        ]}
                    />
                </ScrollReveal>
                <ScrollReveal>
                    <NewsSectionExample/>
                </ScrollReveal>
                <ScrollReveal>
                    <FormInfo/>
                </ScrollReveal>
            </PageLayout>
        </>
    );
}