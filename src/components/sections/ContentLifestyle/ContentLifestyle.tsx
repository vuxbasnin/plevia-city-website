import React from "react";
import "./ContentLifestyle.css";

export interface ContentLifestyleSection {
  level: 1 | 2;
  subtitle: string;
  subdescription: string;
}

interface ContentLifestyleProps {
  description: string | string[];
  sections?: ContentLifestyleSection[];
  dotEnabled?: boolean;
  bullets?: string[];
  isReverse?: boolean;
}

// Helper function để render text với bold support
const renderTextWithBold = (text: string) => {
  // Tìm và thay thế **text** hoặc <b>text</b> thành <strong>text</strong>
  const parts = text.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2); // Loại bỏ **
      return <strong key={index}>{boldText}</strong>;
    }
    if (part.startsWith('<b>') && part.endsWith('</b>')) {
      const boldText = part.slice(3, -4); // Loại bỏ <b> và </b>
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

// Helper function để render description
const renderDescription = (description: string | string[]) => {
  if (Array.isArray(description)) {
    return (
      <div className="content-lifestyle__description">
        {description.map((item, index) => (
          <p key={index}>{renderTextWithBold(item)}</p>
        ))}
      </div>
    );
  }

  // Kiểm tra xem có phải là bullet points không
  if (description.includes('- ')) {
    const lines = description.split('\n');
    const descriptionLines = [];
    const bulletLines = [];

    lines.forEach(line => {
      if (line.trim().startsWith('- ')) {
        bulletLines.push(line.trim().substring(2)); // Loại bỏ '- '
      } else if (line.trim()) {
        descriptionLines.push(line.trim());
      }
    });

    return (
      <>
        {descriptionLines.length > 0 && (
          <div className="content-lifestyle__description">
            {descriptionLines.map((line, index) => (
              <p key={index}>{renderTextWithBold(line)}</p>
            ))}
          </div>
        )}
        {bulletLines.length > 0 && (
          <ul className="content-lifestyle__bullets">
            {bulletLines.map((item, idx) => (
              <li key={idx} className="content-lifestyle__bullet-item">
                {renderTextWithBold(item)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  // Nếu là text thường
  return (
    <div className="content-lifestyle__description">
      {renderTextWithBold(description)}
    </div>
  );
};

const ContentLifestyle: React.FC<ContentLifestyleProps> = ({
  description, sections, dotEnabled = false, bullets, isReverse = false
}) => {
  return (
    <div className={`content-lifestyle__container ${isReverse ? 'content-lifestyle__container--reverse' : ''}`}>
      {description && renderDescription(description)}
      {bullets && bullets.length > 0 && (
        <ul className="content-lifestyle__bullets">
          {bullets.map((item, idx) => (
            <li key={idx} className="content-lifestyle__bullet-item">
              {renderTextWithBold(item)}
            </li>
          ))}
        </ul>
      )}
      {sections && sections.length > 0 && (
        <div className="content-lifestyle__sections">
          {sections.map((section, index) => (
            <div key={index} className="content-lifestyle__section">
              <h3 className="content-lifestyle__subtitle">
                {dotEnabled && <span className="content-lifestyle__dot"></span>}
                {renderTextWithBold(section.subtitle)}
              </h3>
              <p className="content-lifestyle__subdescription">
                {renderTextWithBold(section.subdescription)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentLifestyle; 