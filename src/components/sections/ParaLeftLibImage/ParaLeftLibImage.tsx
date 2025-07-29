import React from "react";
import "./ParaLeftLibImage.css";
import LibImageLifestyle from "../LibImageLifestyle/LibImageLifestyle";
import ContentLifestyle, {ContentLifestyleSection} from "../ContentLifestyle/ContentLifestyle";
import TitleLifestyle from "../TitleLifestyle/TitleLifestyle";

interface ImageItem {
    id: string;
    url: string;
    caption?: string;
}

// Sử dụng ContentLifestyleSection thay vì định nghĩa lại
type ParaLeftLibImageSection = ContentLifestyleSection;

interface ParaLeftLibImageProps {
    title: string;
    description: string | string[];
    sections?: ParaLeftLibImageSection[];
    backgroundColor?: 'white' | 'gray'; // mặc định là white
    reverse?: boolean; // nếu true, sẽ đảo ngược vị trí của text và ảnh
    dotEnabled?: boolean; // nếu true, sẽ hiển thị dot trước subdescription
    is169?: boolean; // nếu true, LibImage sẽ hiển thị với tỷ lệ 16:9
    images?: ImageItem[]; // Thêm prop images để truyền vào LibImage
    bullets?: string[]; // Thêm prop bullets để hiển thị danh sách bullet points
}

// Helper function để render description - đã chuyển sang ContentLifestyle

const ParaLeftLibImage: React.FC<ParaLeftLibImageProps> = ({
                                                               title,
                                                               description,
                                                               sections,
                                                               backgroundColor = 'white',
                                                               reverse,
                                                               dotEnabled = false,
                                                               is169 = false,
                                                               images,
                                                               bullets
                                                           }) => {
    return (<div
            className={"para-left-lib-image__container" + (backgroundColor === 'gray' ? ' para-left-lib-image__container--gray' : '')}
        >
            {/* Title component ở giữa */}
            <TitleLifestyle title={title}/>
            {reverse ? (<>
                    <div className="para-left-lib-image__inner reverse">
                        <div className="para-left-lib-image__lib-image-wrapper">
                            <LibImageLifestyle isHideTitle={true} is169={is169} images={images}/>
                        </div>
                        <div className="para-left-lib-image__text__reverse">
                            <ContentLifestyle
                                description={description}
                                sections={sections}
                                dotEnabled={dotEnabled}
                                bullets={bullets}
                                isReverse={true}
                            />
                        </div>
                    </div>
                </>) : (<>
                    <div className="para-left-lib-image__inner">
                        <div className="para-left-lib-image__text">
                            <ContentLifestyle
                                description={description}
                                sections={sections}
                                dotEnabled={dotEnabled}
                                bullets={bullets}
                                isReverse={false}
                            />
                        </div>
                        <div className="para-left-lib-image__lib-image-wrapper">
                            <LibImageLifestyle isHideTitle={true} is169={is169} images={images}/>
                        </div>
                    </div>
                </>)}
        </div>);
};

export const paraLeftLibImageExample = {
    title: "LIFESTYLE ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH",
    description: "Plevia City không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng thành phố Pleiku.",
    subtitle: "TIỆN ÍCH",
    subdescription: "Hệ thống tiện ích đẳng cấp 5 sao với công viên ánh sáng, hồ bơi thư giãn, phòng gym hiện đại, spa thư giãn và nhiều tiện ích khác.",
};

export default ParaLeftLibImage; 