import React from 'react';
import SectionOneHome from './SectionOneHome';
import { reverse } from 'dns';

// Example data structure for SectionOneHome props
const sectionOneStoryLineData = {
    mainTitle: "4. LAN TỎA VÀ KẾT NỐI CỘNG ĐỒNG",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Câu chuyện của Plevia City không chỉ nằm ở vị trí, công nghệ hay quy hoạch. Đó còn là câu chuyện của một cộng đồng sống văn minh, năng động, kết nối, gắn bó. Mỗi người dân sống tại đây không chỉ đang sở hữu một căn nhà, mà đang góp phần tạo nên một phong cách sống mới cho thành phố.`,
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Plevia City không hướng đến số đông, mà hướng đến những cư dân có cùng cách nghĩ lối sống thông minh, hiện đại. Chính sự đồng điệu ấy đã và sẽ kiến tạo nên một cộng đồng thân thiện, cởi mở và đầy cảm hứng – nơi người ta không chỉ sống gần nhau, mà còn thật sự hiểu nhau.`,
                },
            ],
            imageUrl: "/assets/storyline/community.png",
            reverse: true
        }
    ]
};

const SectionFourStoryLine: React.FC = () => {
    return (
        <SectionOneHome
            mainTitle={sectionOneStoryLineData.mainTitle}
            subtitle={sectionOneStoryLineData.subtitle}
            contentSections={sectionOneStoryLineData.contentSections}
            isStoryLine={true}
        />
    );
};

export default SectionFourStoryLine; 