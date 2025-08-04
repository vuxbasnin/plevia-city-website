import React from 'react';
import SectionOneHome from './SectionOneHome';
import { reverse } from 'dns';

// Example data structure for SectionOneHome props
const sectionOneStoryLineData = {
    mainTitle: "5. MỘT GIẤC MƠ CÓ THẬT – MỘT CƠ HỘI CÓ THẬT",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Với việc Gia Lai chuyển mình mạnh mẽ với hạ tầng đô thị ngày càng phát triển, kéo theo đó là tiêu chuẩn sống của người dân ngày một cao. Plevia City ra đời như một lời đáp cho nhu cầu sống hiện đại – thông minh – đẳng cấp. Không chỉ đơn thuần là một khu đô thị, Plevia City mang trong mình khát vọng kiến tạo chuẩn sống kiểu mẫu cho thời đại số, nơi công nghệ và không gian sống hài hòa trong từng trải nghiệm.`,
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Khi mọi thứ còn đang trong giai đoạn tăng tốc, những sản phẩm như Plevia City – với quy hoạch bài bản, pháp lý rõ ràng và định vị khác biệt – chính là những “cánh cửa sớm” cho những ai biết nhìn xa. Giấc mơ an cư không còn xa vời, và cơ hội đầu tư cũng không chỉ nằm trên giấy. Plevia City là nơi để sống, nhưng cũng là nơi để đầu tư. Sở hữu vị trí chiến lược nằm giữa trung tâm, lại được bảo chứng bởi chủ đầu tư có tâm – có tầm, dự án mở ra cơ hội tăng trưởng bền vững, đáng giá theo thời gian.`,
                },
            ],
            imageUrl: "/assets/storyline/dream.png"
        }
    ]
};

const SectionFiveStoryLine: React.FC = () => {
    return (
        <SectionOneHome
            mainTitle={sectionOneStoryLineData.mainTitle}
            subtitle={sectionOneStoryLineData.subtitle}
            contentSections={sectionOneStoryLineData.contentSections}
            isStoryLine={true}
            sectionType="section-five"
        />
    );
};

export default SectionFiveStoryLine; 