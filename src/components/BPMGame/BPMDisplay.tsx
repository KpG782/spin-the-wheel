import React from 'react';
import './BPMDisplay.css';

interface BPMDisplayProps {
  bpm: number;
  show: boolean;
}

export const BPMDisplay: React.FC<BPMDisplayProps> = ({ bpm, show }) => {
  if (!show) return null;

  return (
    <div className="bpm-display">
      <div className="bpm-number">{bpm}</div>
      <div className="bpm-label">BPM</div>
    </div>
  );
};
