import React from "react";
import "./TextViewLifestyle.css";

export interface TextViewLifestyleSection {
  level: 1 | 2;
  subtitle: string;
  subdescription: string;
}

interface TextViewLifestyleProps {
  description: string | string[];
  sections?: TextViewLifestyleSection[];
  dotEnabled?: boolean; // nếu true, sẽ hiển thị dot trước subdescription
  bullets?: string[]; // Thêm prop bullets để hiển thị danh sách bullet points
  isReverse?: boolean; // để biết có phải reverse mode không
}

// Helper function để render description
const renderDescription = (description: string | string[]) => {
  if (Array.isArray(description)) {
    return (
      <ul className="text-view-lifestyle__bullets">
        {description.map((item, idx) => (
          <li key={idx} className="text-view-lifestyle__bullet-item">{item}</li>
        ))}
      </ul>
    );
  }

  // Nếu là string và chứa bullet points (có dấu "- ")
  if (typeof description === 'string' && description.includes('- ')) {
    const lines = description.split('\n');
    const bulletItems: string[] = [];
    let plainText = '';

    lines.forEach(line => {
      if (line.trim().startsWith('- ')) {
        bulletItems.push(line.trim().substring(2)); // Bỏ "- " ở đầu
      } else if (line.trim()) {
        plainText += line + '\n';
      }
    });

    return (
      <>
        {plainText.trim() && (
          <p className="text-view-lifestyle__description">{plainText.trim()}</p>
        )}
        {bulletItems.length > 0 && (
          <ul className="text-view-lifestyle__bullets">
            {bulletItems.map((item, idx) => (
              <li key={idx} className="text-view-lifestyle__bullet-item">{item}</li>
            ))}
          </ul>
        )}
      </>
    );
  }

  // Nếu là string thường
  return <p className="text-view-lifestyle__description">{description}</p>;
};

const TextViewLifestyle: React.FC<TextViewLifestyleProps> = ({
  description,
  sections,
  dotEnabled = false,
  bullets,
  isReverse = false
}) => {
  return (
    <div className="text-view-lifestyle__container">
      {description && renderDescription(description)}
      {bullets && bullets.length > 0 && (
        <ul className="text-view-lifestyle__bullets">
          {bullets.map((item, idx) => (
            <li key={idx} className="text-view-lifestyle__bullet-item">{item}</li>
          ))}
        </ul>
      )}
      {sections && sections.length > 0 && sections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          {section.level === 1 ? (
            <>
              {section.subtitle && (
                <h3 className="text-view-lifestyle__subtitle">
                  {section.subtitle}
                </h3>
              )}
              {section.subdescription && (
                <p className="text-view-lifestyle__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                  {dotEnabled && <span className="text-view-lifestyle__dot" />}
                  <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                </p>
              )}
            </>
          ) : (
            <>
              {section.subtitle && (
                <h4 className="text-view-lifestyle__subtitle text-view-lifestyle__subtitle--level2" style={{ fontWeight: 'bold' }}>
                  {section.subtitle}
                </h4>
              )}
              {section.subdescription && (
                <p className="text-view-lifestyle__subdescription" style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                  {dotEnabled && <span className="text-view-lifestyle__dot" />}
                  <span dangerouslySetInnerHTML={{ __html: section.subdescription }} />
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TextViewLifestyle; 