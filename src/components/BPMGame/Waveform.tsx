import React from 'react';
import './Waveform.css';

interface WaveformProps {
  isPlaying: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  const barCount = 7;

  return (
    <div className="waveform-container">
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          className={`waveform-bar ${isPlaying ? 'playing' : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};
