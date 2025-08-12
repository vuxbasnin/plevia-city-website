import React from 'react';
import SectionOneHome from './SectionOneHome';
import Title from '@/components/ui/Title/Title';

// Example data structure for SectionOneHome props
const sectionOneHomeData = {
    mainTitle: "Nơi phố thị mang dáng hình tương lai",
    subtitle: "",
    contentSections: [
        {
            title: "",
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
            imageUrl: "/assets/home/song_tinh_hoa.png"
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
                isShowTitle={true}
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

export default SectionOneHomeExample; 