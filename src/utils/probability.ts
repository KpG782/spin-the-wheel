import { Prize } from '../types/game.types';

// Weighted Random Selection Algorithm
export function selectPrize(sections: Prize[]): Prize {
  // Validate sections
  if (!sections || sections.length === 0) {
    throw new Error('No prize sections provided');
  }

  // Calculate total probability
  const totalProbability = sections.reduce((sum, s) => sum + s.probability, 0);
  
  // Validate probability sum
  if (Math.abs(totalProbability - 1.0) > 0.001) {
    console.warn('⚠️ Total probability is not 1.0:', totalProbability);
  }
  
  // Generate random number between 0 and total probability
  const random = Math.random() * totalProbability;
  let cumulative = 0;
  
  // Select prize based on weighted probability
  for (const section of sections) {
    cumulative += section.probability;
    if (random < cumulative) {
      return section;
    }
  }
  
  // Fallback to last section (shouldn't happen with proper probabilities)
  console.warn('⚠️ Fallback to last prize triggered');
  return sections[sections.length - 1];
}

// Calculate rotation angle for selected prize
export function calculateRotation(
  selectedPrize: Prize, 
  sections: Prize[], 
  currentRotation: number
): number {
  // Find index of selected prize
  const prizeIndex = sections.findIndex(s => s.id === selectedPrize.id);
  
  if (prizeIndex === -1) {
    console.error('Prize not found:', selectedPrize);
    return 360 * 4; // Default 4 spins
  }
  
  // Calculate angle offset for prize (where it starts in the wheel)
  let angleOffset = 0;
  for (let i = 0; i < prizeIndex; i++) {
    angleOffset += sections[i].angle;
  }
  
  // Add center of prize section to get the middle of the segment
  const prizeCenterAngle = angleOffset + (sections[prizeIndex].angle / 2);
  
  // Add small random variance within the prize segment (makes it look more natural)
  const variance = (Math.random() - 0.5) * sections[prizeIndex].angle * 0.4; // ±20% of segment width
  
  // Add multiple full rotations for effect (3-5 spins)
  const fullRotations = Math.floor(3 + Math.random() * 2); // 3-5 spins
  
  // Calculate where the prize currently is after previous rotations
  const currentPrizePosition = (currentRotation + prizeCenterAngle) % 360;
  
  // Calculate rotation needed to align prize center with pointer at top (0°)
  // We need to rotate so that the prize ends up at 0° (top)
  const rotationNeeded = 360 * (fullRotations + 1) - currentPrizePosition + variance;
  
  return rotationNeeded;
}
