import React from 'react';
import './ItemNewsLarge.css';

interface ItemNewsLargeProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  className?: string;
}

const ItemNewsLarge: React.FC<ItemNewsLargeProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  className = ''
}) => {
  return (
    <article className={`item-news-large ${className}`}>
      <div className="item-news-large__image-container">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="item-news-large__image"
        />
      </div>
      
      <div className="item-news-large__content">
        <h3 className="item-news-large__title">
          {title}
        </h3>
        
        <p className="item-news-large__description">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ItemNewsLarge;

