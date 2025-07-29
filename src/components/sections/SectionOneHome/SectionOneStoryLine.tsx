import React from 'react';
import SectionOneHome from './SectionOneHome';

// Example data structure for SectionOneHome props
const sectionOneStoryLineData = {
    mainTitle: "1. XUẤT PHÁT TỪ MỘT TẦM NHÌN LỚN",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Trong bối cảnh đô thị hóa ngày càng mạnh mẽ tại Gia Lai, nhu cầu về một khu đô thị hiện đại – văn minh – thông minh trở nên cấp thiết hơn bao giờ hết. Không chỉ là nơi để ở, người dân còn đang mong muốn tìm kiếm một không gian sống hội tụ cả công nghệ, tiện ích, thiên nhiên và cộng đồng.`,
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Dù cho tình trạng khu đô thị ở Gia Lai hiện nay đang có tiến triển tích cực nhưng vẫn chưa hoàn toàn đáp ứng đủ nhu cầu. Nguyên nhân đến từ việc hệ thống đô thị tại Gia Lai vẫn chưa đồng đều về hạ tầng và chất lượng dịch vụ. Một số đô thị vẫn đang trong quá trình hoàn thiện cơ sở hạ tầng, quy hoạch, chưa đủ để đáp ứng đầy đủ yêu cầu phát triển bền vững và nhu cầu ngày càng cao của người dân.`,
                },
            ],
            imageUrl: "/assets/storyline/big_view.png"
        }
    ]
};

const SectionOneStoryLine: React.FC = () => {
    return (
        <SectionOneHome
            mainTitle={sectionOneStoryLineData.mainTitle}
            subtitle={sectionOneStoryLineData.subtitle}
            contentSections={sectionOneStoryLineData.contentSections}
            isStoryLine={true}
        />
    );
};

export default SectionOneStoryLine; 