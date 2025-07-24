import React from "react";

interface TextBlockProps {
  children?: React.ReactNode;
  content?: string;
  className?: string;
  fontSize?: string; // Thêm prop fontSize
}

const TextBlock: React.FC<TextBlockProps> = ({ children, content, className = "", fontSize = "1.5rem" }) => {
  return (
    <div
      className={`textblock-container ${className}`.trim()}
      style={{
        maxWidth: "76vw",
        margin: "0 auto",
        padding: "24px 0",
        fontSize: fontSize,
        color: "#222",
        textAlign: "justify",
        lineHeight: 1.7,
        fontFamily: "Roboto, sans-serif"
      }}
    >
      {content ? <span dangerouslySetInnerHTML={{ __html: content }} /> : children}
    </div>
  );
};

export default TextBlock; 