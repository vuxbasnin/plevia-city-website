import React from "react";
import "./ParaImageVertical.css";

interface ParaImageVerticalProps {
  title: string;
  description: string;
  bullets?: string[];
  subDescription?: string;
  imageUrl: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const ParaImageVertical: React.FC<ParaImageVerticalProps> = ({
  title,
  description,
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
        <p className="piv-description">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="piv-bullets">
            {bullets.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {subDescription && <p className="piv-sub-description">{subDescription}</p>}
      </div>
      <div className="piv-image-wrapper">
        <img src={imageUrl} alt={imageAlt} className="piv-image" />
      </div>
      {children && <div className="piv-content piv-children">{children}</div>}
    </div>
  );
};

export default ParaImageVertical;
