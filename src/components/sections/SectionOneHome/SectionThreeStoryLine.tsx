import React from 'react';
import SectionOneHome from './SectionOneHome';
import { reverse } from 'dns';

// Example data structure for SectionOneHome props
const sectionOneStoryLineData = {
    mainTitle: "3. KHÁT VỌNG KIẾN TẠO KHU ĐÔ THỊ KIỂU MẪU THỜI ĐẠI SỐ",
    subtitle: "",
    contentSections: [
        {
            title: "",
            description: "",
            sections: [
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Plevia City không chạy theo số lượng hay hình thức, mà muốn xác lập một tiêu chuẩn sống mới tại Gia Lai - <strong>Khu đô thị đầu tiên ứng dụng trí tuệ nhân tạo</strong>. Cùng với việc  thiết kế kiến trúc đồng bộ, hiện đại, tiện ích đa dạng – tất cả tạo nên mục tiêu lớn nhất: <strong>định hình một chuẩn sống mới – Eco Smart Living đầu tiên</strong> tại Gia Lai`,
                },
                {
                    level: 1,
                    subtitle: "",
                    subdescription: `Đằng sau mỗi tính năng công nghệ là một lựa chọn mang tính tương lai. Không phải để “trưng bày hiện đại”, mà để <strong>kiến tạo một đô thị thực sự biết phục vụ người dùng</strong> – nơi từng căn nhà là một đơn vị thông minh, từng tiện ích là một bước tiến của trải nghiệm sống.`,
                },
            ],
            imageUrl: "/assets/storyline/desire_to_create.jpg"
        }
    ]
};

const SectionThreeStoryLine: React.FC = () => {
    return (
        <SectionOneHome
            mainTitle={sectionOneStoryLineData.mainTitle}
            subtitle={sectionOneStoryLineData.subtitle}
            contentSections={sectionOneStoryLineData.contentSections}
            isStoryLine={true}
        />
    );
};

export default SectionThreeStoryLine; 