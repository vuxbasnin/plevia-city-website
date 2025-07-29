import React from "react";
import "./ParaImageVerticalLifestyle.css";
import LibImageLifestyle from "../LibImageLifestyle/LibImageLifestyle";

interface ParaImageVerticalLifestyleProps {
  title: string;
  description: string;
  bullets?: string[];
  subDescription?: string;
  imageUrl: string;
  imageAlt?: string;
  children?: React.ReactNode;
  isLibImage?: boolean;
}

const ParaImageVerticalLifestyle: React.FC<ParaImageVerticalLifestyleProps> = ({
  title,
  description,
  bullets,
  imageUrl,
  imageAlt = "image",
  children,
  isLibImage = false
}) => {
  return (
    <div className="para-image-vertical-lifestyle-container">
      <h2 className="pivl-title">{title}</h2>
      <div className="pivl-main-content">
        <div className="pivl-content">
          <p className="pivl-description">{description}</p>
          {bullets && bullets.length > 0 && (
            <ul className="pivl-bullets">
              {bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        {isLibImage ? (
          <LibImageLifestyle isHideTitle={isLibImage} />
        ) : (
          imageUrl && imageUrl.trim() !== '' && (
            <div className="pivl-image-wrapper">
              <img src={imageUrl} alt={imageAlt} className="pivl-image" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }} />
            </div>
          )
        )}
        {children && <div className="pivl-content pivl-children">{children}</div>}
      </div>
    </div>
  );
};

export default ParaImageVerticalLifestyle; 