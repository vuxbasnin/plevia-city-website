import React from 'react';
import SectionOneHome from './SectionOneHome';

// Example data structure for SectionOneHome props
const sectionOneHomeData = {
    mainTitle: "THÔNG TIN TỔNG QUAN",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Tên dự án: Plevia City`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Vị trí: 63–65 Lý Nam Đế, p. Hội Phú, t. Gia Lai`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Chủ đầu tư: Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Diện tích: 7,04 ha`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Quy mô: 368 căn nhà phố & shophouse`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Diện tích sản phẩm: 110 m² đến 120 m²`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Thiết kế: Công ty Kiến Trúc Việt`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Pháp lý: Sổ từng nền – Quy hoạch 1/500`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `- Tiện ích nội khu: Công viên, gym, spa, sân thể thao, trường mầm non…`
                }
            ],
            imageUrl: "https://res.cloudinary.com/dytm93eoj/image/upload/v1753845504/home-assets/tn1twcf3bwszo20sv5de.jpg",
            reverse: true,
            dotEnabled: true
        }
    ]
};

const SectionTwoHomeExample: React.FC = () => {
    return (
        <>
            {/* Sử dụng với background (mặc định) */}
            <SectionOneHome
                mainTitle={sectionOneHomeData.mainTitle}
                subtitle={sectionOneHomeData.subtitle}
                contentSections={sectionOneHomeData.contentSections}
                isStoryLine={false}
            />
            
            {/*/!* Sử dụng không có background (cho storyline) *!/*/}
            {/*<SectionOneHome*/}
            {/*    mainTitle="STORY LINE"*/}
            {/*    subtitle="CÂU CHUYỆN CỦA CHÚNG TÔI"*/}
            {/*    contentSections={sectionOneHomeData.contentSections}*/}
            {/*    isStoryLine={true}*/}
            {/*/>*/}
        </>
    );
};

export default SectionTwoHomeExample; 