import React from 'react';
import SectionOneHome from './SectionOneHome';

// Example data structure for SectionOneHome props
const sectionOneHomeData = {
    mainTitle: "PLEVIA CITY",
    subtitle: "NƠI THỂ HIỆN ĐẲNG CẤP",
    contentSections: [
        {
            title: "PLEVIA CITY",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Plevia City là khu đô thị thông minh đầu tiên có ứng dụng "Trí tuệ nhân tạo" được phát triển tại Gia Lai. Dự án đánh dấu bước chuyển mình của khu vực với mô hình đô thị hiện đại, tích hợp công nghệ vận hành 4.0 và môi trường sống xanh đa lớp.`
                },
                {
                    level: 2,
                    subtitle: "",
                    subdescription: `Plevia City được phát triển với tầm nhìn trở thành khu đô thị kiểu mẫu thời đại số – nơi công nghệ không chỉ là nền tảng vận hành, mà còn là động lực kiến tạo một môi trường sống văn minh, tiện nghi và an toàn. Với việc ứng dụng đồng bộ trí tuệ nhân tạo, hạ tầng số và tiện ích thông minh, Plevia City hướng đến hình mẫu đô thị tiên phong tại Tây Nguyên – mở ra chuẩn sống mới cho thế hệ cư dân thời hiện đại.`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Được quy hoạch bài bản theo định hướng "hiện đại – thông minh – bền vững", Plevia City không chỉ mở ra tiềm năng lớn cho các nhà đầu tư mà còn kiến tạo nên một phong cách sống mới tại phố núi – nơi thiên nhiên, công nghệ và con người cùng vận hành hài hòa.`
                }
            ],
            imageUrl: "https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg"
        },
        {
            title: "THÔNG TIN TỔNG QUAN",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Tên dự án: Plevia City`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Vị trí: 63–65 Lý Nam Đế, p. Hội Phú, t.Gia Lai`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Chủ đầu tư: Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Diện tích: 7,04 ha`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Quy mô: 368 căn nhà phố & shophouse`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Diện tích sản phẩm: 110 m² đến 120 m²`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Thiết kế: Công ty Kiến Trúc Việt`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Pháp lý: Sổ từng nền – Quy hoạch 1/500`
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Tiện ích nội khu: Công viên, gym, spa, sân thể thao, trường mầm non…`
                }
            ],
            imageUrl: "https://khangdienhcm.com/wp-content/uploads/2025/06/PHOI-CANH-BIET-THU-SONG-LAP-GLADIA-KHANG-DIEN.jpg",
            reverse: true,
            dotEnabled: true
        }
    ]
};

const SectionOneHomeExample: React.FC = () => {
    return (
        <>
            {/* Sử dụng với background (mặc định) */}
            <SectionOneHome
                mainTitle={sectionOneHomeData.mainTitle}
                subtitle={sectionOneHomeData.subtitle}
                contentSections={sectionOneHomeData.contentSections}
                isStoryLine={false}
            />
            
            {/* Sử dụng không có background (cho storyline) */}
            <SectionOneHome
                mainTitle="STORY LINE"
                subtitle="CÂU CHUYỆN CỦA CHÚNG TÔI"
                contentSections={sectionOneHomeData.contentSections}
                isStoryLine={true}
            />
        </>
    );
};

export default SectionOneHomeExample; 