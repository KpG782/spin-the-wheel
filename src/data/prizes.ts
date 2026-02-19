import { Prize } from '../types/game.types';

export const WHEEL_PRIZES: Prize[] = [
  {
    id: 'gcash-50',
    name: '₱50 GCash',
    color: '#FF5252',
    probability: 0.01,        // 1% - Backend: Very rare (~2 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '💵',
    type: 'instant'
  },
  {
    id: 'spotify-raffle',
    name: 'Spotify Premium Raffle',
    color: '#4D9FFF',
    probability: 0.02,        // 2% - Backend: Very rare (~4 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '🎵',
    type: 'raffle'
  },
  {
    id: 'extra-raffle',
    name: 'Extra Raffle Entry',
    color: '#0066FF',
    probability: 0.15,        // 15% - Backend: Uncommon (~30 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '🎟️',
    type: 'raffle'
  },
  {
    id: 'candy',
    name: 'Candy',
    color: '#B0B0B0',
    probability: 0.40,        // 40% - Backend: Most common (~80 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '🍬',
    type: 'token'
  },
  {
    id: 'sticker',
    name: 'Sticker',
    color: '#338FFF',
    probability: 0.32,        // 32% - Backend: Common (~64 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '⭐',
    type: 'token'
  },
  {
    id: 'try-again',
    name: 'Try Again',
    color: '#FFC107',
    probability: 0.10,        // 10% - Backend: Regular (~20 out of 200)
    angle: 60,                // UI: Balanced segment (looks fair)
    icon: '🔄',
    type: 'token'
  }
];

// Validate probabilities sum to 1.0 (100%)
const totalProbability = WHEEL_PRIZES.reduce((sum, prize) => sum + prize.probability, 0);
if (Math.abs(totalProbability - 1.0) > 0.001) {
  console.error('⚠️ Prize probabilities do not sum to 100%!', {
    total: (totalProbability * 100).toFixed(2) + '%',
    expected: '100%'
  });
}

// Log prize distribution for verification
if (import.meta.env.DEV) {
  console.log('🎰 Prize Distribution (for 200 spins):');
  WHEEL_PRIZES.forEach(prize => {
    const expectedWinners = Math.round(200 * prize.probability);
    console.log(`  ${prize.icon} ${prize.name}: ${(prize.probability * 100).toFixed(1)}% (~${expectedWinners} winners)`);
  });
}
