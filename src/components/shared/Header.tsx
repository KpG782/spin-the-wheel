import React from 'react';
import { Logo } from './Logo';
import './Header.css';

interface HeaderProps {
  title: string;
  tagline: string;
}

export const Header: React.FC<HeaderProps> = ({ title, tagline }) => {
  return (
    <header className="game-header">
      <div className="logo-container">
        <Logo size="medium" />
      </div>
      <h2 className="game-title">{title}</h2>
      <p className="game-tagline">{tagline}</p>
    </header>
  );
};
