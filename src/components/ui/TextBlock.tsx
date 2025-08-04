import React from "react";

interface TextBlockProps {
  children?: React.ReactNode;
  content?: string;
  className?: string;
  fontSize?: string; // Thêm prop fontSize
  header?: string; // Thêm prop header
}

const TextBlock: React.FC<TextBlockProps> = ({ children, content, className = "", fontSize = "1rem", header }) => {
  // Responsive max-width based on screen size
  const getMaxWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return "92vw";
      if (window.innerWidth <= 640) return "90vw";
      if (window.innerWidth <= 768) return "85vw";
    }
    return "76vw";
  };

  return (
    <div
      className={`textblock-container ${className}`.trim()}
      style={{
        maxWidth: getMaxWidth(),
        margin: "0 auto",
        padding: "0px 0",
        fontSize: fontSize,
        color: "#000000",
        textAlign: "justify",
        lineHeight: 1.7,
        fontFamily: "Chillax-Light, sans-serif"
      }}
    >
      {header && (
        <h2 style={{
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
          fontFamily: "Chillax-Light, sans-serif",
          fontWeight: 600,
          color: "#000000",
          textAlign: "center",
          marginBottom: "24px",
          textTransform: "uppercase"
        }}>
          {header}
        </h2>
      )}
      {content ? <span dangerouslySetInnerHTML={{ __html: content }} /> : children}
    </div>
  );
};

export default TextBlock; 