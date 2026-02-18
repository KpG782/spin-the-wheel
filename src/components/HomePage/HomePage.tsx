import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../shared/Header';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="container">
        <Header 
          title="Pacebeats Survey Games" 
          tagline="Music • Movement • Motivation" 
        />

        <div className="home-content">
          <div className="welcome-section">
            <h2 className="welcome-title">Choose Your Game!</h2>
            <p className="welcome-text">
              Play a fun game after completing our survey and win amazing prizes!
            </p>
          </div>

          <div className="games-grid">
            <Link to="/spin-wheel" className="game-card">
              <div className="game-icon">🎡</div>
              <h3 className="game-card-title">Spin the Beat</h3>
              <p className="game-card-description">
                Spin the wheel and win instant prizes! Get GCash, raffle entries, candy, and more.
              </p>
              <div className="game-card-cta">
                Play Now →
              </div>
            </Link>

            <Link to="/bpm-game" className="game-card">
              <div className="game-icon">🎵</div>
              <h3 className="game-card-title">Guess the BPM</h3>
              <p className="game-card-description">
                Test your music instincts! Listen to song clips and guess if they're fast or slow BPM.
              </p>
              <div className="game-card-cta">
                Play Now →
              </div>
            </Link>
          </div>

          <div className="survey-cta">
            <div className="survey-cta-content">
              <h3>Haven't taken the survey yet?</h3>
              <p>Complete our quick survey to unlock the games and help us build Pacebeats AI!</p>
              <button className="survey-button">
                📋 Take Survey
              </button>
            </div>
          </div>
        </div>

        <footer className="home-footer">
          <p>© 2026 Pacebeats • Your AI Running Music Coach</p>
        </footer>
      </div>
    </div>
  );
};
