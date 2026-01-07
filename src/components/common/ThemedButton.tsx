import React, { useMemo, memo } from 'react';

interface ThemedButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ThemedButtonComponent: React.FC<ThemedButtonProps> = ({ 
  variant = 'primary',
  className = '',
  children,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const buttonStyles = useMemo(() => {
    const baseStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    switch (variant) {
      case 'primary':
        return `bg-button-hero bg-button-hero-hover text-white text-base cursor-pointer font-raleway leading-5 font-semibold px-8 py-4 rounded-4xl transition-colors duration-200 ${baseStyles} ${className}`;
      case 'secondary':
        return `border-2 border-button text-button font-manrope font-medium px-6 py-3 rounded-lg hover:bg-button hover:text-white transition-all duration-200 ${baseStyles} ${className}`;
      default:
        return `bg-button bg-button-hover text-white font-manrope font-medium px-6 py-3 rounded-lg transition-colors duration-200 ${baseStyles} ${className}`;
    }
  }, [variant, disabled, className]);

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      data-testid="themed-button"
    >
      {children}
    </button>
  );
};

export const ThemedButton = memo(ThemedButtonComponent);
