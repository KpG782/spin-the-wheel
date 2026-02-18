import { Song } from '../types/game.types';

export const SONG_POOL: Song[] = [
  {
    id: 'levitating',
    name: 'Levitating',
    artist: 'Dua Lipa',
    bpm: 103,
    category: 'moderate'
  },
  {
    id: 'blinding-lights',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    bpm: 171,
    category: 'fast'
  },
  {
    id: 'shape-of-you',
    name: 'Shape of You',
    artist: 'Ed Sheeran',
    bpm: 96,
    category: 'slow'
  },
  {
    id: 'harder-better-faster',
    name: 'Harder Better Faster',
    artist: 'Daft Punk',
    bpm: 123,
    category: 'moderate'
  },
  {
    id: 'summer',
    name: 'Summer',
    artist: 'Calvin Harris',
    bpm: 128,
    category: 'moderate'
  },
  {
    id: 'circles',
    name: 'Circles',
    artist: 'Post Malone',
    bpm: 80,
    category: 'slow'
  },
  {
    id: 'levels',
    name: 'Levels',
    artist: 'Avicii',
    bpm: 126,
    category: 'moderate'
  },
  {
    id: 'hotline-bling',
    name: 'Hotline Bling',
    artist: 'Drake',
    bpm: 68,
    category: 'slow'
  },
  {
    id: 'titanium',
    name: 'Titanium',
    artist: 'David Guetta ft. Sia',
    bpm: 126,
    category: 'moderate'
  },
  {
    id: 'uptown-funk',
    name: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    bpm: 115,
    category: 'moderate'
  }
];

// BPM threshold: slow <= 120 BPM, fast > 120 BPM
export const BPM_THRESHOLD = 120;

export function getRandomSong(): Song {
  return SONG_POOL[Math.floor(Math.random() * SONG_POOL.length)];
}

export function isFastBPM(bpm: number): boolean {
  return bpm > BPM_THRESHOLD;
}

export function getBPMDescription(bpm: number): string {
  if (bpm <= 100) {
    return 'Perfect for walking or cool-down';
  } else if (bpm <= 140) {
    return 'Great for jogging';
  } else if (bpm <= 180) {
    return 'High-intensity running';
  } else {
    return 'Sprint pace';
  }
}
