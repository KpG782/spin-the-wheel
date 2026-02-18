import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'fast' | 'slow' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  children,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${variant} ${className} no-select touch-target`}
    >
      {children}
    </button>
  );
};
