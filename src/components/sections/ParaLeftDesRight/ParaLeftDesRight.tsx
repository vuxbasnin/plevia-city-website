import React from "react";
import "./ParaLeftDesRight.css";

export interface ParaLeftDesRightSection {
  level: 1 | 2;
  subtitle: string;
  subdescription: string;
}

interface ParaLeftDesRightProps {
  title: string;
  description: string;
  sections: ParaLeftDesRightSection[];
  imageUrl: string;
  backgroundColor?: 'white' | 'gray'; // mặc định là white
}

const ParaLeftDesRight: React.FC<ParaLeftDesRightProps> = ({
  title,
  description,
  sections,
  imageUrl,
  backgroundColor = 'white',
}) => {
  return (
    <div
      className={
        "para-left-des-right__container" +
        (backgroundColor === 'gray' ? ' para-left-des-right__container--gray' : '')
      }
    >
      <div className="para-left-des-right__inner">
        <div className="para-left-des-right__text">
          <h2 className="para-left-des-right__title">{title}</h2>
          <p className="para-left-des-right__description">{description}</p>
          {sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 20 }}>
              {section.level === 1 ? (
                <>
                  <h3 className="para-left-des-right__subtitle">{section.subtitle}</h3>
                  <p className="para-left-des-right__subdescription">{section.subdescription}</p>
                </>
              ) : (
                <>
                  <h4 className="para-left-des-right__subtitle para-left-des-right__subtitle--level2" style={{ fontWeight: 'bold' }}>{section.subtitle}</h4>
                  <p className="para-left-des-right__subdescription">{section.subdescription}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="para-left-des-right__image-wrapper">
          <img src={imageUrl} alt="section" className="para-left-des-right__image" />
        </div>
      </div>
    </div>
  );
};

export const paraLeftDesRightExample = {
  title: "THIẾT KẾ ĐẲNG CẤP – KHÔNG GIAN SỐNG XANH",
  description:
    "Gladia by The Waters không chỉ đơn thuần là một dự án nhà ở thấp tầng, mà là biểu tượng của một phong cách sống đậm chất riêng – khác biệt – đẳng cấp giữa lòng khu Đông Sài Gòn.",
  subtitle: "KIẾN TRÚC",
  subdescription:
    "Nhà phố & biệt thự Gladia – Resort giữa lòng đô thị. Thiết kế kết hợp mái ngói cổ điển với kiến trúc hiện đại, ban công và sân thượng giật cấp hài hòa cùng sân vườn xanh và hàng rào cây 1m. Không gian sống đậm chất nghỉ dưỡng, như một khu resort giữa phố thị.",
  imageUrl:
    "https://khangdienhcm.com/wp-content/uploads/2025/07/TONG-QUAN-DU-AN-GLADIA-KHANG-DIEN.jpg",
};

export default ParaLeftDesRight;
