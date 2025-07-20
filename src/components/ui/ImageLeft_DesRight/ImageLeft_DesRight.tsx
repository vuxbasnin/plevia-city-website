import React from 'react';
import './ImageLeft_DesRight.css';

interface ImageLeftDesRightProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string[];
  logo?: {
    mainText: string;
    subText: string;
    tagline: string;
  };
}

const ImageLeftDesRight: React.FC<ImageLeftDesRightProps> = ({
  title,
  imageSrc,
  imageAlt,
  description,
  logo
}) => {
  return (
    <div className="image-left-des-right-container">
      {/* Title Section */}
      <div className="title-section">
        <h2 className="main-title">{title}</h2>
      </div>
      
      {/* Content Section */}
      <div className="content-section">
        {/* Left Side - Image */}
        <div className="image-section">
          <div className="image-wrapper">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="main-image"
            />
            {/* Decorative Elements */}
            <div className="decorative-elements">
              <div className="leaf-outline leaf-1"></div>
              <div className="leaf-outline leaf-2"></div>
              <div className="leaf-outline leaf-3"></div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Description */}
        <div className="description-section">
          <div className="description-content">
            {description.map((paragraph, index) => (
              <p key={index} className="description-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Logo Section */}
          {logo && (
            <div className="logo-section">
              <div className="logo">
                <div className="logo-main">
                  <span className="logo-bold">{logo.mainText}</span>
                  <span className="logo-light">{logo.subText}</span>
                </div>
                <div className="logo-tagline">{logo.tagline}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLeftDesRight;

