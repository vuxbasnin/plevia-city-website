import React from "react";

interface ImageWithDoubleCaptionProps {
  imageUrl: string;
  caption1: string;
  caption2: string;
}

const ImageWithDoubleCaption: React.FC<ImageWithDoubleCaptionProps> = ({ imageUrl, caption1, caption2 }) => {
  return (
    <div style={{ width: "100vw", maxWidth: "100vw", margin: "0 auto 32px auto" }}>
      <img
        src={imageUrl}
        style={{ width: "100vw", maxWidth: "100vw", display: "block", margin: 0, borderRadius: 0 }}
      />
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}>{caption1}</div>
        <div style={{ fontWeight: 700, fontSize: "1.15rem", fontFamily: "Roboto, sans-serif", marginTop: 4 }}>{caption2}</div>
      </div>
    </div>
  );
};

export default ImageWithDoubleCaption; 