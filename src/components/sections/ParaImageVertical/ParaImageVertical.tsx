import React from "react";
import "./ParaImageVertical.css";

interface ParaImageVerticalProps {
  title: string;
  description1: string;
  description2: string;
  bullets?: string[];
  subDescription?: string;
  imageUrl: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const ParaImageVertical: React.FC<ParaImageVerticalProps> = ({
  title,
  description1,
  description2,
  bullets,
  subDescription,
  imageUrl,
  imageAlt = "image",
  children
}) => {
  return (
    <div className="para-image-vertical-container">
      <div className="piv-content">
        <h2 className="piv-title">{title}</h2>
        <p className="piv-description">{description1}</p>
        <p className="piv-description">{description2}</p>
        {bullets && bullets.length > 0 && (
          <ul className="piv-bullets">
            {bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {/*{subDescription && <p className="piv-sub-description">{subDescription}</p>}*/}
      </div>
      <div className="piv-image-wrapper">
        <img src={imageUrl} alt={imageAlt} className="piv-image" />
      </div>
      {children && <div className="piv-content piv-children">{children}</div>}
    </div>
  );
};

export default ParaImageVertical;
