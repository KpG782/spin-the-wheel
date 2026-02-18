import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`pacebeats-logo ${size} ${className}`}>
      <img 
        src="/logo.png" 
        alt="PaceBeats" 
        className="logo-image"
      />
    </div>
  );
};
