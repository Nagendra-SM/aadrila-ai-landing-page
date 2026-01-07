import React from 'react';

interface ThemedTextProps {
  variant?: 'hero-title' | 'title' | 'subtitle' | 'body';
  className?: string;
  children: React.ReactNode;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  variant = 'body', 
  className = '', 
  children, 
  as: Component = 'p' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero-title':
        return `text-hero-title font-raleway font-bold ${className}`;
      case 'title':
        return `text-title font-raleway font-semibold ${className}`;
      case 'subtitle':
        return `text-subtitle font-manrope font-medium ${className}`;
      case 'body':
      default:
        return `text-body font-manrope ${className}`;
    }
  };

  const ComponentMap = {
    p: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    span: 'span'
  } as const;

  const Tag = ComponentMap[Component];

  return <Tag className={getVariantStyles()}>{children}</Tag>;
};
