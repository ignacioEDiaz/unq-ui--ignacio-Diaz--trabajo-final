import React from 'react';
import './Container.style.css'; 

export default function Container({
  direction = 'col',
  gap = '1rem',
  align = 'start',
  justify = 'start',
  className = '',
  as: Tag = 'div',
  children,
}) {
  return (
    <Tag
      className={`containerWrapper ${className}`} 
      style={{
        display: 'flex',
        flexDirection: direction === 'row' ? 'row' : 'column',
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </Tag>
  );
}
