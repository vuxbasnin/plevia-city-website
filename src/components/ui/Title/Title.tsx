import React from 'react';
import './Title.css';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'large' | 'small';
  align?: 'left' | 'center' | 'right';
}

const Title: React.FC<TitleProps> = ({
  children,
  className = '',
  variant = 'default',
  align = 'center'
}) => {
  const baseClass = 'title';
  const variantClass = `title-${variant}`;
  const alignClass = `title-${align}`;
  
  return (
    <div className={`${baseClass} ${variantClass} ${alignClass} ${className}`}>
      <h2>{children}</h2>
    </div>
  );
};

export default Title; 