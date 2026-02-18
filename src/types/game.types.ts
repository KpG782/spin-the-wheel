// Prize Types
export interface Prize {
  id: string;
  name: string;
  color: string;
  probability: number;
  angle: number;
  icon?: string;
  type: 'instant' | 'raffle' | 'token';
}

// Wheel State
export interface WheelState {
  isSpinning: boolean;
  selectedPrize: Prize | null;
  rotation: number;
  showResult: boolean;
}

// BPM Game Types
export interface Song {
  id: string;
  name: string;
  artist: string;
  bpm: number;
  category: 'slow' | 'moderate' | 'fast';
  audioPreviewUrl?: string;
}

export interface GameState {
  currentSong: Song | null;
  userAnswer: 'fast' | 'slow' | null;
  isCorrect: boolean | null;
  showResult: boolean;
  score: number;
}

export interface BPMCategory {
  range: [number, number];
  label: string;
  color: string;
  description: string;
}
