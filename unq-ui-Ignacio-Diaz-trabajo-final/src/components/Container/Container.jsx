import React from 'react';
import styles from './Container.style.scss';

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
      className={`${styles.containerWrapper} ${className}`}
      style={{
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