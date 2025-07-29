import React from "react";
import "./TitleLifestyle.css";

interface TitleLifestyleProps {
  title: string;
  isMobile?: boolean;
}

const TitleLifestyle: React.FC<TitleLifestyleProps> = ({
  title,
  isMobile = false
}) => {
  return (
    <div className={`title-lifestyle__container ${isMobile ? 'title-lifestyle__container--mobile' : ''}`}>
      <h1 className="title-lifestyle__main-title">{title}</h1>
    </div>
  );
};

export default TitleLifestyle; 