import React from "react";
import "./ParaManyImage.css";

interface ParaManyImageProps {
  title: string;
  paragraph: string;
  bullets?: string[];
  footer?: string;
  images: string[]; // 9 ảnh
}

const ParaManyImage: React.FC<ParaManyImageProps> = ({ title, paragraph, bullets, footer, images }) => {
  return (
    <div className="para-many-image-container">
      <h2 className="para-many-image-title">{title}</h2>
      <div className="para-many-image-line" />
      <p className="para-many-image-paragraph">{paragraph}</p>
      {bullets && bullets.length > 0 && (
        <ul className="para-many-image-bullets">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {footer && <p className="para-many-image-footer">{footer}</p>}
      <div className="para-many-image-grid">
        {images.slice(0, 9).map((img, idx) => (
          <div className="para-many-image-item" key={idx}>
            <img src={img} alt={`image-${idx+1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParaManyImage;
