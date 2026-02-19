import React, { useState } from 'react';
import { Header } from '../shared/Header';
import { ResultModal } from '../shared/ResultModal';
import { Wheel } from './Wheel';
import { SpinButton } from './SpinButton';
import { WHEEL_PRIZES } from '../../data/prizes';
import { selectPrize, calculateRotation } from '../../utils/probability';
import { triggerHaptic, trackEvent } from '../../utils/soundManager';
import { Prize } from '../../types/game.types';
import './SpinWheelGame.css';

export const SpinWheelGame: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    // Select prize based on weighted probability
    const prize = selectPrize(WHEEL_PRIZES);
    console.log('🎰 Selected Prize:', prize.name, `(${(prize.probability * 100).toFixed(1)}% chance)`);
    
    const additionalRotation = calculateRotation(prize, WHEEL_PRIZES, rotation);
    const finalRotation = rotation + additionalRotation;

    setIsSpinning(true);
    setRotation(finalRotation);
    triggerHaptic('click');

    // Show result after spin animation
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prize);
      setShowResult(true);
      triggerHaptic('success');
      trackEvent('wheel_spin', {
        prize_name: prize.name,
        prize_type: prize.type,
      });
    }, 4000);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setSelectedPrize(null);
  };

  const getPrizeMessage = (prize: Prize): string => {
    switch (prize.id) {
      case 'gcash-50':
        return '🎉 Amazing! Collect your ₱50 GCash from the booth staff!';
      case 'spotify-raffle':
        return '🎵 Great! You\'re entered into the Spotify Premium raffle draw!';
      case 'extra-raffle':
        return '🎟️ Nice! Get an extra raffle ticket from the booth!';
      case 'candy':
        return '🍬 Sweet! Pick a candy from the booth staff!';
      case 'sticker':
        return '⭐ Cool! Grab a Pacebeats sticker from the booth!';
      case 'try-again':
        return '🔄 Don\'t worry! Grab a small token from the booth anyway!';
      default:
        return 'Collect your prize from the booth!';
    }
  };

  return (
    <div className="game-page">
      <div className="container">
        <Header 
          title="Spin the Beat" 
          tagline="Win Prizes • Complete Survey" 
        />

        <div className="instructions">
          <div className="instruction-step">
            <span className="step-number">1</span>
            <span className="step-text">Complete survey</span>
          </div>
          <div className="instruction-step">
            <span className="step-number">2</span>
            <span className="step-text">Show confirmation</span>
          </div>
          <div className="instruction-step">
            <span className="step-number">3</span>
            <span className="step-text">Spin the wheel!</span>
          </div>
        </div>

        <div className="wheel-section">
          <Wheel 
            sections={WHEEL_PRIZES}
            rotation={rotation}
            isSpinning={isSpinning}
          />
          <SpinButton 
            onClick={handleSpin}
            disabled={isSpinning}
          />
        </div>

        <div className="prizes-legend">
          <h3>Prizes:</h3>
          <div className="prizes-grid">
            {WHEEL_PRIZES.map(prize => (
              <div 
                key={prize.id} 
                className="prize-item"
                style={{
                  borderLeft: `4px solid ${prize.color}`,
                  background: `linear-gradient(90deg, ${prize.color}15, transparent)`
                }}
              >
                <span className="prize-icon">{prize.icon}</span>
                <span className="prize-name">{prize.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPrize && (
        <ResultModal
          show={showResult}
          title={`You won: ${selectedPrize.name}`}
          description={getPrizeMessage(selectedPrize)}
          icon={selectedPrize.icon || '🎉'}
          onClose={handleCloseResult}
          variant={selectedPrize.id === 'try-again' ? 'info' : 'success'}
        />
      )}
    </div>
  );
};
