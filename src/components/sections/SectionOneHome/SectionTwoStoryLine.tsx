import React from 'react';
import SectionOneHome from './SectionOneHome';
import { reverse } from 'dns';

// Example data structure for SectionOneHome props
const sectionOneStoryLineData = {
    mainTitle: "2. MỘT CHỦ ĐẦU TƯ DÀY DẶN KINH NGHIỆM – ĐẦY TÂM HUYẾT",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Giữa rất nhiều dự án mọc lên mỗi ngày, Plevia City nổi bật không chỉ vì vị trí hay quy hoạch, mà còn bởi người đứng sau nó là một chủ đầu tư vừa vó tầm vừa có tâm – <strong>Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải</strong>. Đây là một chủ đầu tư <strong>đã từng phát triển nhiều dự án bất động sản</strong>, hiểu rõ nhu cầu và mong muốn của người dân và nhà đầu tư, và hơn hết là đặt trọn tâm huyết trong từng dự án.`,
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Với phương châm "xây dựng không gian sống bền vững và đáng sống",  <strong>Tập đoàn Đầu tư Bắc Hải</strong> không chọn lối đi dễ dàng, mà <strong>kiên trì với những giá trị dài hạn</strong>, đầu tư nghiêm túc từ pháp lý, thiết kế, tiện ích, đến trải nghiệm sống sau khi bàn giao. Plevia City sẽ là minh chứng tiếp theo cho một dự án không chỉ được tính bằng mét vuông, mà còn được đo bằng <strong>tâm – tầm – tín</strong> của người làm thật.`,
                },
            ],
            imageUrl: "/assets/storyline/investor.png",
            reverse: true
        }
    ]
};

const SectionTwoStoryLine: React.FC = () => {
    return (
        <SectionOneHome
            mainTitle={sectionOneStoryLineData.mainTitle}
            subtitle={sectionOneStoryLineData.subtitle}
            contentSections={sectionOneStoryLineData.contentSections}
            isStoryLine={true}
            sectionType="section-two"
        />
    );
};

export default SectionTwoStoryLine; 