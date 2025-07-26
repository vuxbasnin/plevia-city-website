import React from "react";
import "./ParaImageVertical.css";
import LibImage from "../LibImage/LibImage";

interface ParaImageVerticalProps {
  title: string;
  description1: string;
  description2: string;
  bullets?: string[];
  subDescription?: string;
  imageUrl: string;
  imageAlt?: string;
  children?: React.ReactNode;
  isLibImage?: boolean;
}

const ParaImageVertical: React.FC<ParaImageVerticalProps> = ({
  title,
  description1,
  description2,
  bullets,
  subDescription,
  imageUrl,
  imageAlt = "image",
  children,
  isLibImage = false
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
      {isLibImage ? (
        <LibImage isHideTitle={isLibImage} />
      ) : (
        <div className="piv-image-wrapper">
          <img src={imageUrl} alt={imageAlt} className="piv-image" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
        </div>
      )}
      {children && <div className="piv-content piv-children">{children}</div>}
    </div>
  );
};

export default ParaImageVertical;
