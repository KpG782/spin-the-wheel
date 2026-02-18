import { Prize } from '../types/game.types';

// Weighted Random Selection Algorithm
export function selectPrize(sections: Prize[]): Prize {
  // Calculate total probability
  const totalProbability = sections.reduce((sum, s) => sum + s.probability, 0);
  
  // Generate random number
  let random = Math.random() * totalProbability;
  
  // Select prize based on weighted probability
  for (const section of sections) {
    random -= section.probability;
    if (random <= 0) {
      return section;
    }
  }
  
  // Fallback to last section (shouldn't happen)
  return sections[sections.length - 1];
}

// Calculate rotation angle for selected prize
export function calculateRotation(selectedPrize: Prize, sections: Prize[]): number {
  // Find index of selected prize
  const prizeIndex = sections.findIndex(s => s.id === selectedPrize.id);
  
  // Calculate angle offset for prize
  let angleOffset = 0;
  for (let i = 0; i < prizeIndex; i++) {
    angleOffset += sections[i].angle;
  }
  
  // Add center of prize section
  angleOffset += sections[prizeIndex].angle / 2;
  
  // Add multiple full rotations for effect (3-5 spins)
  const fullRotations = 3 + Math.random() * 2; // 3-5 spins
  const totalRotation = (360 * fullRotations) + (360 - angleOffset);
  
  return totalRotation;
}
