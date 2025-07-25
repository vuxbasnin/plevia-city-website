import React from "react";
import "./ParaLeftDesRight.css";
import { reverse } from "dns";
import LibImage from "../LibImage/LibImage";

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
  reverse?: boolean; // nếu true, sẽ đảo ngược vị trí của text và ảnh
  isShowLibImage?: boolean; // nếu true, sẽ hiển thị LibImage thay vì ảnh
  dotEnabled?: boolean; // nếu true, sẽ hiển thị dot trước subdescription
}

const ParaLeftDesRight: React.FC<ParaLeftDesRightProps> = ({
  title,
  description,
  sections,
  imageUrl,
  backgroundColor = 'white',
  reverse,
  isShowLibImage = false,
  dotEnabled = false
}) => {
  return (
    <div
      className={
        "para-left-des-right__container" +
        (backgroundColor === 'gray' ? ' para-left-des-right__container--gray' : '') +
        (reverse ? ' para-left-des-right__container--reverse' : '')
      }
      style={
        reverse
          ? { background: 'hsl(var(--primary))' }
          : {}
      }
    >
      {/* Title cho mobile, hiển thị trên ảnh */}
      {title && (
        <h2 className="para-left-des-right__title para-left-des-right__title--mobile">{title}</h2>
      )}
      {reverse ? (
        <>
          <div className="para-left-des-right__inner reverse">
            {
              isShowLibImage ? (
                <div className="para-left-des-right__lib_image-wrapper">
                  <LibImage isHideTitle={true} />
                </div>
              ) : (

                <div className="para-left-des-right__image-wrapper">
                  {imageUrl && (
                    <img src={imageUrl} alt="section" className="para-left-des-right__image" />
                  )}
                </div>
              )
            }
            <div className="para-left-des-right__text__reverse">
              {title && (
                <h2 className="para-left-des-right__title">{title}</h2>
              )}
              {description && (
                <p className="para-left-des-right__description">{description}</p>
              )}
              {sections && sections.length > 0 && sections.map((section, idx) => (
                <div key={idx} style={{ marginBottom: 20 }}>
                  {section.level === 1 ? (
                    <>
                      {section.subtitle && (
                        <h3 className="para-left-des-right__subtitle">
                          {section.subtitle}
                        </h3>
                      )}
                      {section.subdescription && (
                        <p className="para-left-des-right__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                          {dotEnabled && <span className="para-left-des-right__dot" />}
                          <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {section.subtitle && (
                        <h4 className="para-left-des-right__subtitle para-left-des-right__subtitle--level2" style={{ fontWeight: 'bold' }}>
                          {section.subtitle}
                        </h4>
                      )}
                      {section.subdescription && (
                        <p className="para-left-des-right__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                          {dotEnabled && <span className="para-left-des-right__dot" />}
                          <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="para-left-des-right__inner">
            <div className="para-left-des-right__text">
              {title && (
                <h2 className="para-left-des-right__title">{title}</h2>
              )}
              {description && (
                <p className="para-left-des-right__description">{description}</p>
              )}
              {sections && sections.length > 0 && sections.map((section, idx) => (
                <div key={idx} style={{ marginBottom: 20 }}>
                  {section.level === 1 ? (
                    <>
                      {section.subtitle && (
                        <h3 className="para-left-des-right__subtitle">
                          {section.subtitle}
                        </h3>
                      )}
                      {section.subdescription && (
                        <p className="para-left-des-right__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                          {dotEnabled && reverse && <span className="para-left-des-right__dot" />}
                          <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {section.subtitle && (
                        <h4 className="para-left-des-right__subtitle para-left-des-right__subtitle--level2" style={{ fontWeight: 'bold' }}>
                          {section.subtitle}
                        </h4>
                      )}
                      {section.subdescription && (
                        <p className="para-left-des-right__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                          {dotEnabled && reverse && <span className="para-left-des-right__dot" />}
                          <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            {
              isShowLibImage ? (
                <div className="para-left-des-right__lib_image-wrapper">
                  <LibImage isHideTitle={true} />
                </div>
              ) : (

                <div className="para-left-des-right__image-wrapper">
                  {imageUrl && (
                    <img src={imageUrl} alt="section" className="para-left-des-right__image" />
                  )}
                </div>
              )
            }
          </div>
        </>
      )
      }

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
