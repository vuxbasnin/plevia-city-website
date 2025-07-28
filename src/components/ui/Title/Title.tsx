import React from 'react';
import './Title.css';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'large' | 'small';
  align?: 'left' | 'center' | 'right';
  isColorWhite?: boolean;
}

const Title: React.FC<TitleProps> = ({
  children,
  className = '',
  variant = 'default',
  align = 'center',
  isColorWhite = false
}) => {
  const baseClass = 'title';
  const variantClass = `title-${variant}`;
  const alignClass = `title-${align}`;
  const colorClass = isColorWhite ? 'title-color-white' : '';

  return (
    <div className={`${baseClass} ${variantClass} ${alignClass} ${className} ${colorClass}`}>
      <h2>{children}</h2>
    </div>
  );
};

export default Title; 