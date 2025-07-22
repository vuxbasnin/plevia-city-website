import React from "react";
import "./News4Item.css";

export interface NewsItem {
  image: string;
  date: string;
  author: string;
  title: string;
}

interface News4ItemProps {
  items: NewsItem[]; // phải đúng 4 phần tử
}

const News4Item: React.FC<News4ItemProps> = ({ items }) => {
  if (!items || items.length !== 4) return null;
  return (
    <div className="news4-container">
      <h2 className="news4-title">TIN TỨC DỰ ÁN</h2>
      <div className="news4-list">
        {items.map((item, idx) => (
          <div className="news4-item" key={idx}>
            <div className="news4-img-wrap">
              <img src={item.image} alt={item.title} className="news4-img" />
            </div>
            <div className="news4-meta">
              <span className="news4-meta-date">
                <span className="news4-meta-icon">●</span> {item.date}
              </span>
              <span className="news4-meta-author">
                <span className="news4-meta-icon">👤</span> {item.author}
              </span>
            </div>
            <div className="news4-item-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News4Item;

