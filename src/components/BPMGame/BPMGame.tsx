import React, { useState, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Button } from '../shared/Button';
import { ResultModal } from '../shared/ResultModal';
import { Waveform } from './Waveform';
import { BPMDisplay } from './BPMDisplay';
import { getRandomSong, isFastBPM, getBPMDescription } from '../../data/songs';
import { triggerHaptic, trackEvent } from '../../utils/soundManager';
import { Song } from '../../types/game.types';
import './BPMGame.css';

export const BPMGame: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [userAnswer, setUserAnswer] = useState<'fast' | 'slow' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load first song
    loadNewSong();
  }, []);

  const loadNewSong = () => {
    const song = getRandomSong();
    setCurrentSong(song);
    setUserAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    triggerHaptic('click');
    
    // Simulate 10-second audio clip
    setTimeout(() => {
      setIsPlaying(false);
    }, 10000);
  };

  const handleAnswer = (answer: 'fast' | 'slow') => {
    if (!currentSong || userAnswer) return;

    const songIsFast = isFastBPM(currentSong.bpm);
    const correct = (answer === 'fast' && songIsFast) || (answer === 'slow' && !songIsFast);

    setUserAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      triggerHaptic('success');
    } else {
      triggerHaptic('error');
    }

    trackEvent('bpm_guess', {
      is_correct: correct,
      actual_bpm: currentSong.bpm,
      user_answer: answer,
    });
  };

  const handleNext = () => {
    setShowResult(false);
    loadNewSong();
  };

  if (!currentSong) {
    return <div className="game-page flex-center">Loading...</div>;
  }

  const getResultMessage = (): { title: string; description: string; icon: string } => {
    if (isCorrect) {
      return {
        title: '✅ Correct!',
        description: `This song has ${currentSong.bpm} BPM. ${getBPMDescription(currentSong.bpm)}`,
        icon: '🎉'
      };
    } else {
      return {
        title: '❌ Not quite!',
        description: `This song has ${currentSong.bpm} BPM. ${getBPMDescription(currentSong.bpm)}`,
        icon: '🎵'
      };
    }
  };

  const resultMessage = getResultMessage();

  return (
    <div className="game-page">
      <div className="container">
        <Header 
          title="Guess the BPM" 
          tagline="Test Your Music Instincts" 
        />

        <div className="score-display">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>

        <div className="bpm-game-container">
          <div className="music-player-card">
            <Waveform isPlaying={isPlaying} />
            
            <div className="song-info">
              <h3 className="song-title">{currentSong.name}</h3>
              <p className="song-artist">{currentSong.artist}</p>
            </div>

            <Button 
              onClick={handlePlay}
              variant="secondary"
              disabled={isPlaying}
            >
              {isPlaying ? '🎵 Playing...' : '▶️ Play 10sec Clip'}
            </Button>
          </div>

          <div className="question-section">
            <h2 className="question-text">
              Is this song Fast or Slow BPM?
            </h2>
            <p className="question-hint">
              (Slow ≤ 120 BPM • Fast &gt; 120 BPM)
            </p>
          </div>

          <div className="answer-buttons">
            <Button
              onClick={() => handleAnswer('fast')}
              variant="fast"
              disabled={userAnswer !== null}
              className={userAnswer === 'fast' ? 'selected' : ''}
            >
              ⚡ FAST BPM
            </Button>
            <Button
              onClick={() => handleAnswer('slow')}
              variant="slow"
              disabled={userAnswer !== null}
              className={userAnswer === 'slow' ? 'selected' : ''}
            >
              🐢 SLOW BPM
            </Button>
          </div>

          {userAnswer && (
            <BPMDisplay bpm={currentSong.bpm} show={true} />
          )}
        </div>

        <div className="survey-prompt">
          <p>🎯 Complete our survey to help build Pacebeats AI!</p>
        </div>
      </div>

      <ResultModal
        show={showResult}
        title={resultMessage.title}
        description={resultMessage.description}
        icon={resultMessage.icon}
        onClose={handleNext}
        variant={isCorrect ? 'success' : 'info'}
      />
    </div>
  );
};
