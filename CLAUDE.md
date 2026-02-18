# 🎮 Pacebeats Survey Game Webapp - Design & Style Guide

## 📋 Overview
Design guidelines for building the interactive survey game webapp using **React + TypeScript** for the Pacebeats 200-respondent survey event. This document covers both **Spin-the-Beat Wheel** and **Guess the BPM** game options with aligned branding.

---

## 🎨 Color Palette (Aligned with Pacebeats Brand)

### Primary Brand Colors
```css
/* Core Identity - Use These as Main Colors */
--primary-green: #00FF7F;        /* Signature neon green - Use for CTAs, highlights */
--primary-dark: #1A1A1A;         /* Deep charcoal - Text on light backgrounds */
--background-dark: #121212;      /* Pure dark background - Main page background */
--surface-dark: #1E1E1E;         /* Elevated surfaces - Cards, containers */
--accent-green: #4CAF50;         /* Secondary green - Success states */
--spotify-green: #1DB954;        /* Spotify integration - Music-related elements */
```

### Game-Specific Colors
```css
/* Wheel Spin & BPM Game Colors */
--win-green: #00FF7F;            /* Big wins, prizes */
--almost-yellow: #FFC107;        /* "Almost" / "Try Again" */
--suspense-red: #FF5252;         /* Low probability prizes */
--music-pulse: #1DB954;          /* BPM indicators, music elements */
--neutral-gray: #B0B0B0;         /* Small prizes, stickers */
```

### Text Colors
```css
--text-primary: #FFFFFF;         /* Primary text on dark backgrounds */
--text-secondary: #B0B0B0;       /* Secondary text, descriptions */
--text-muted: #707070;           /* Subtle hints */
--text-dark: #1A1A1A;            /* Text on light backgrounds */
```

### UI Component Colors
```css
--card-background: #2A2A2A;      /* Game cards, result displays */
--border-color: #333333;         /* Borders & dividers */
--overlay-color: rgba(0, 0, 0, 0.85);  /* Modal overlays */
--shadow-glow: rgba(0, 255, 127, 0.3);  /* Neon glow effects */
```

---

## 🎡 Option 1: Spin-the-Beat Wheel

### Visual Design

#### Wheel Design Specifications
```typescript
// Wheel Configuration
const wheelConfig = {
  diameter: "min(90vw, 500px)",
  borderWidth: "8px",
  borderColor: "#00FF7F",
  boxShadow: "0 0 40px rgba(0, 255, 127, 0.6)",
  centerDiameter: "100px",
  centerColor: "#1A1A1A",
  pointerColor: "#FF5252",
}
```

#### Wheel Sections & Colors
```typescript
// Prize Configuration (Rigged Probabilities)
const wheelSections = [
  {
    prize: "₱50 GCash",
    color: "#FF5252",           // Red (suspense)
    probability: 0.05,           // 5% chance
    angle: 18                    // Small section
  },
  {
    prize: "Spotify Premium Raffle Entry",
    color: "#1DB954",           // Spotify green
    probability: 0.10,          // 10% chance
    angle: 36
  },
  {
    prize: "Extra Raffle Entry",
    color: "#00FF7F",           // Neon green
    probability: 0.20,          // 20% chance
    angle: 72
  },
  {
    prize: "Candy",
    color: "#B0B0B0",           // Gray
    probability: 0.30,          // 30% chance
    angle: 108
  },
  {
    prize: "Sticker",
    color: "#4CAF50",           // Accent green
    probability: 0.25,          // 25% chance
    angle: 90
  },
  {
    prize: "Try Again",
    color: "#FFC107",           // Yellow
    probability: 0.10,          // 10% chance
    angle: 36
  }
];
```

#### Animation Effects
```css
/* Wheel Spin Animation */
@keyframes spinWheel {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(var(--final-rotation)); }
}

.wheel-spinning {
  animation: spinWheel 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  animation-fill-mode: forwards;
}

/* Neon Glow Pulse */
@keyframes neonPulse {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 255, 127, 0.4);
  }
  50% { 
    box-shadow: 0 0 40px rgba(0, 255, 127, 0.8);
  }
}

.wheel-container {
  animation: neonPulse 2s ease-in-out infinite;
}

/* Winner Flash Effect */
@keyframes winnerFlash {
  0%, 100% { 
    background: linear-gradient(135deg, #00FF7F, #1DB954);
  }
  50% { 
    background: linear-gradient(135deg, #1DB954, #00FF7F);
  }
}
```

### Layout Structure
```typescript
// Component Hierarchy
<SpinWheelGame>
  <Header>
    {/* Pacebeats logo + tagline */}
    <Logo src="pacebeats-logo.svg" />
    <Tagline>Spin the Beat • Win Prizes</Tagline>
  </Header>
  
  <GameContainer>
    <Instructions>
      {/* Short, clear instructions */}
      <Step>1. Complete survey</Step>
      <Step>2. Show confirmation</Step>
      <Step>3. Spin the wheel!</Step>
    </Instructions>
    
    <WheelSection>
      <Wheel sections={wheelSections} />
      <Pointer />
      <SpinButton>SPIN TO WIN</SpinButton>
    </WheelSection>
    
    <ResultModal show={showResult}>
      {/* Winner announcement */}
    </ResultModal>
  </GameContainer>
  
  <Footer>
    {/* Pacebeats branding */}
  </Footer>
</SpinWheelGame>
```

### Typography
```css
/* Font Styles for Spin Wheel */
.game-title {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #00FF7F;
  text-shadow: 0 0 20px rgba(0, 255, 127, 0.6);
  letter-spacing: -1px;
}

.spin-button {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.prize-text {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #1A1A1A;  /* Dark text on colored segments */
}

.winner-announcement {
  font-family: 'Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #00FF7F;
  text-align: center;
}
```

### Button Styles
```css
/* Primary Spin Button */
.spin-button {
  background: linear-gradient(135deg, #00FF7F, #1DB954);
  border: none;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  color: #1A1A1A;
  box-shadow: 
    0 4px 20px rgba(0, 255, 127, 0.4),
    0 0 40px rgba(0, 255, 127, 0.3);
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.spin-button:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 
    0 6px 30px rgba(0, 255, 127, 0.6),
    0 0 60px rgba(0, 255, 127, 0.5);
}

.spin-button:active {
  transform: translate(-50%, -50%) scale(0.98);
}

.spin-button:disabled {
  background: #616161;
  cursor: not-allowed;
  box-shadow: none;
}
```

### Probability Logic (Rigged System)
```typescript
// Weighted Random Selection Algorithm
function selectPrize(sections: WheelSection[]): WheelSection {
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
function calculateRotation(prizeIndex: number, sections: WheelSection[]): number {
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
```

---

## 🎵 Option 2: Guess the BPM Challenge

### Visual Design

#### Game Layout
```typescript
<BPMGame>
  <Header>
    <Logo src="pacebeats-logo.svg" />
    <Tagline>Test Your Music Instincts</Tagline>
  </Header>
  
  <GameContainer>
    <MusicPlayer>
      <Waveform animated />
      <PlayButton />
      <SongInfo>10-second clip</SongInfo>
    </MusicPlayer>
    
    <Question>
      Is this song Fast or Slow BPM?
    </Question>
    
    <AnswerButtons>
      <Button variant="fast">⚡ FAST BPM</Button>
      <Button variant="slow">🐢 SLOW BPM</Button>
    </AnswerButtons>
    
    <ResultFeedback show={showResult}>
      {/* Correct/Incorrect + explanation */}
    </ResultFeedback>
  </GameContainer>
  
  <SurveyPrompt>
    Complete our survey to help build Pacebeats AI!
  </SurveyPrompt>
</BPMGame>
```

#### Color Scheme for BPM Game
```css
/* Fast BPM - High Energy */
.fast-bpm {
  background: linear-gradient(135deg, #FF5252, #FF8A80);
  color: #FFFFFF;
  border: 3px solid #FF5252;
}

.fast-bpm:hover {
  box-shadow: 0 0 30px rgba(255, 82, 82, 0.6);
  transform: scale(1.03);
}

/* Slow BPM - Calm Energy */
.slow-bpm {
  background: linear-gradient(135deg, #2196F3, #64B5F6);
  color: #FFFFFF;
  border: 3px solid #2196F3;
}

.slow-bpm:hover {
  box-shadow: 0 0 30px rgba(33, 150, 243, 0.6);
  transform: scale(1.03);
}

/* Correct Answer Glow */
.correct-answer {
  background: linear-gradient(135deg, #00FF7F, #4CAF50);
  animation: correctPulse 0.5s ease-in-out;
}

@keyframes correctPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Incorrect Answer */
.incorrect-answer {
  background: linear-gradient(135deg, #616161, #757575);
  opacity: 0.6;
}
```

#### Waveform Animation
```css
/* Animated Music Waveform */
.waveform-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 80px;
  padding: 20px;
}

.waveform-bar {
  width: 6px;
  background: linear-gradient(180deg, #00FF7F, #1DB954);
  border-radius: 3px;
  animation: waveformPulse 0.8s ease-in-out infinite;
}

.waveform-bar:nth-child(1) { animation-delay: 0s; }
.waveform-bar:nth-child(2) { animation-delay: 0.1s; }
.waveform-bar:nth-child(3) { animation-delay: 0.2s; }
.waveform-bar:nth-child(4) { animation-delay: 0.3s; }
.waveform-bar:nth-child(5) { animation-delay: 0.4s; }

@keyframes waveformPulse {
  0%, 100% { height: 20px; }
  50% { height: 60px; }
}
```

### BPM Display Component
```css
.bpm-display {
  background: #1E1E1E;
  border: 2px solid #00FF7F;
  border-radius: 16px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 30px rgba(0, 255, 127, 0.3);
}

.bpm-number {
  font-size: 64px;
  font-weight: 700;
  color: #00FF7F;
  font-family: 'Jakarta Sans', sans-serif;
  line-height: 1;
}

.bpm-label {
  font-size: 16px;
  font-weight: 500;
  color: #B0B0B0;
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

### BPM Categories & Thresholds
```typescript
// BPM Classification
const bpmCategories = {
  slow: {
    range: [60, 100],
    label: "SLOW",
    color: "#2196F3",
    description: "Perfect for walking or cool-down"
  },
  moderate: {
    range: [101, 140],
    label: "MODERATE",
    color: "#FFC107",
    description: "Great for jogging"
  },
  fast: {
    range: [141, 180],
    label: "FAST",
    color: "#FF5252",
    description: "High-intensity running"
  },
  veryFast: {
    range: [181, 220],
    label: "VERY FAST",
    color: "#FF5252",
    description: "Sprint pace"
  }
};

// Sample Songs Pool
const songPool = [
  { name: "Dua Lipa - Levitating", bpm: 103, category: "moderate" },
  { name: "The Weeknd - Blinding Lights", bpm: 171, category: "fast" },
  { name: "Ed Sheeran - Shape of You", bpm: 96, category: "slow" },
  { name: "Daft Punk - Harder Better Faster", bpm: 123, category: "moderate" },
  { name: "Calvin Harris - Summer", bpm: 128, category: "moderate" },
  { name: "Post Malone - Circles", bpm: 80, category: "slow" },
  { name: "Avicii - Levels", bpm: 126, category: "moderate" },
  { name: "Drake - Hotline Bling", bpm: 68, category: "slow" },
];
```

---

## 🎯 Shared Design Components

### Page Layout (Both Games)
```css
/* Root Container */
.game-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #121212 0%, #1A1A1A 100%);
  color: #FFFFFF;
  font-family: 'Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

/* Center Content Container */
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* Header Section */
.game-header {
  text-align: center;
  padding: 40px 20px;
}

.game-logo {
  width: 120px;
  height: auto;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 20px rgba(0, 255, 127, 0.4));
}

.game-tagline {
  font-size: 24px;
  font-weight: 600;
  color: #B0B0B0;
  margin-top: 8px;
}
```

### Modal/Result Display
```css
/* Result Modal Overlay */
.result-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Result Card */
.result-card {
  background: linear-gradient(180deg, #1E1E1E 0%, #2A2A2A 100%);
  border: 3px solid #00FF7F;
  border-radius: 24px;
  padding: 48px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 60px rgba(0, 255, 127, 0.6);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Winner Icon */
.result-icon {
  font-size: 80px;
  margin-bottom: 24px;
  animation: iconBounce 0.6s ease-in-out;
}

@keyframes iconBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Result Text */
.result-title {
  font-size: 36px;
  font-weight: 700;
  color: #00FF7F;
  margin-bottom: 16px;
  text-shadow: 0 0 20px rgba(0, 255, 127, 0.6);
}

.result-description {
  font-size: 18px;
  color: #B0B0B0;
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Close/Continue Button */
.result-button {
  background: linear-gradient(135deg, #00FF7F, #1DB954);
  border: none;
  border-radius: 12px;
  padding: 16px 48px;
  color: #1A1A1A;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.result-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 255, 127, 0.6);
}
```

### Loading States
```css
/* Loading Spinner */
.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #333333;
  border-top-color: #00FF7F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Pulse Loading */
.pulse-loader {
  display: flex;
  gap: 12px;
}

.pulse-dot {
  width: 16px;
  height: 16px;
  background: #00FF7F;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

.pulse-dot:nth-child(1) { animation-delay: 0s; }
.pulse-dot:nth-child(2) { animation-delay: 0.2s; }
.pulse-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## 📱 Responsive Design

### Mobile Breakpoints
```css
/* Mobile First Approach */

/* Small phones (320px - 480px) */
@media (max-width: 480px) {
  .game-title {
    font-size: 32px;
  }
  
  .wheel {
    width: 280px;
    height: 280px;
  }
  
  .spin-button {
    width: 120px;
    height: 120px;
    font-size: 18px;
  }
  
  .result-card {
    padding: 32px 24px;
    margin: 20px;
  }
  
  .bpm-number {
    font-size: 48px;
  }
}

/* Standard phones (481px - 768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .game-title {
    font-size: 40px;
  }
  
  .wheel {
    width: 380px;
    height: 380px;
  }
  
  .spin-button {
    width: 140px;
    height: 140px;
    font-size: 20px;
  }
}

/* Tablets (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .wheel {
    width: 450px;
    height: 450px;
  }
}

/* Desktop (1025px+) */
@media (min-width: 1025px) {
  .wheel {
    width: 500px;
    height: 500px;
  }
  
  .game-container {
    padding: 40px;
  }
}
```

### Touch Optimization
```css
/* Touch-Friendly Buttons */
.touch-button {
  min-height: 56px;  /* Minimum touch target */
  min-width: 56px;
  padding: 16px 32px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Prevent Bounce Scrolling on iOS */
.game-page {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* Disable Selection on Game Elements */
.wheel, .spin-button, .answer-button {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
```

---

## 🔊 Sound Effects & Feedback

### Sound Event Triggers
```typescript
// Sound Effects Library
const soundEffects = {
  wheelSpin: "wheel-spin.mp3",       // Long spinning sound
  wheelStop: "wheel-stop.mp3",       // Stop ding
  bigWin: "big-win.mp3",             // Celebration (₱50)
  mediumWin: "medium-win.mp3",       // Success (Raffle entry)
  smallWin: "small-win.mp3",         // Positive (Candy/Sticker)
  tryAgain: "try-again.mp3",         // Neutral
  correctAnswer: "correct.mp3",      // BPM correct
  incorrectAnswer: "incorrect.mp3",  // BPM incorrect
  buttonClick: "click.mp3",          // UI interactions
};

// Play sound with fallback
function playSound(soundName: keyof typeof soundEffects) {
  try {
    const audio = new Audio(`/sounds/${soundEffects[soundName]}`);
    audio.volume = 0.6;
    audio.play().catch(err => console.log('Sound playback failed:', err));
  } catch (error) {
    // Silently fail if sounds not available
  }
}
```

### Haptic Feedback (Mobile)
```typescript
// Vibration Patterns
function triggerHaptic(pattern: 'success' | 'error' | 'click') {
  if (!navigator.vibrate) return;
  
  const patterns = {
    success: [100, 50, 100],  // Double buzz
    error: [200],             // Long buzz
    click: [10],              // Quick tap
  };
  
  navigator.vibrate(patterns[pattern]);
}
```

---

## ⚙️ Technical Implementation Notes

### React Component Structure
```typescript
// Recommended folder structure
src/
├── components/
│   ├── SpinWheel/
│   │   ├── Wheel.tsx
│   │   ├── WheelSection.tsx
│   │   ├── SpinButton.tsx
│   │   └── ResultModal.tsx
│   ├── BPMGame/
│   │   ├── MusicPlayer.tsx
│   │   ├── Waveform.tsx
│   │   ├── AnswerButtons.tsx
│   │   └── BPMDisplay.tsx
│   ├── shared/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Button.tsx
├── hooks/
│   ├── useSpinWheel.ts
│   ├── useBPMGame.ts
│   └── useSound.ts
├── utils/
│   ├── probability.ts
│   ├── animation.ts
│   └── soundManager.ts
├── styles/
│   ├── colors.css
│   ├── animations.css
│   └── responsive.css
└── types/
    ├── game.types.ts
    └── prize.types.ts
```

### TypeScript Interfaces
```typescript
// Prize Types
interface Prize {
  id: string;
  name: string;
  color: string;
  probability: number;
  angle: number;
  icon?: string;
  type: 'instant' | 'raffle' | 'token';
}

// Wheel State
interface WheelState {
  isSpinning: boolean;
  selectedPrize: Prize | null;
  rotation: number;
  showResult: boolean;
}

// BPM Game Types
interface Song {
  id: string;
  name: string;
  artist: string;
  bpm: number;
  category: 'slow' | 'moderate' | 'fast';
  audioPreviewUrl: string;
}

interface GameState {
  currentSong: Song | null;
  userAnswer: 'fast' | 'slow' | null;
  isCorrect: boolean | null;
  showResult: boolean;
  score: number;
}
```

### Performance Optimization
```typescript
// Lazy load heavy animations
import { lazy, Suspense } from 'react';

const SpinWheel = lazy(() => import('./components/SpinWheel'));
const BPMGame = lazy(() => import('./components/BPMGame'));

// Memoize expensive calculations
import { useMemo } from 'react';

function useWheelRotation(selectedPrize: Prize, sections: Prize[]) {
  return useMemo(() => {
    return calculateRotation(selectedPrize, sections);
  }, [selectedPrize, sections]);
}

// Debounce sound effects
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

const debouncedSound = useCallback(
  debounce((soundName: string) => playSound(soundName), 100),
  []
);
```

---

## 📊 Analytics & Event Tracking

### Track User Interactions
```typescript
// Analytics Events
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Log for debugging
  console.log('Event:', eventName, properties);
};

// Track spin results
function trackSpinResult(prize: Prize) {
  trackEvent('wheel_spin', {
    prize_name: prize.name,
    prize_type: prize.type,
    prize_value: prize.value,
  });
}

// Track BPM answers
function trackBPMAnswer(correct: boolean, bpm: number) {
  trackEvent('bpm_guess', {
    is_correct: correct,
    actual_bpm: bpm,
  });
}
```

---

## 🎁 Prize Probability Reference

### Recommended Distribution (200 Respondents)

```typescript
// Expected outcomes for 200 spins
const expectedPrizes = {
  "₱50 GCash": {
    probability: 0.05,           // 5%
    expectedWinners: 10,         // ~10 people
    totalCost: "₱500"
  },
  "Spotify Premium Raffle": {
    probability: 0.10,           // 10%
    expectedWinners: 20,         // ~20 people
    note: "Draw 1-3 winners later"
  },
  "Extra Raffle Entry": {
    probability: 0.20,           // 20%
    expectedWinners: 40,         // ~40 people
    note: "Give physical raffle ticket"
  },
  "Candy": {
    probability: 0.30,           // 30%
    expectedWinners: 60,         // ~60 people
    totalCost: "₱300-600"
  },
  "Sticker": {
    probability: 0.25,           // 25%
    expectedWinners: 50,         // ~50 people
    totalCost: "₱250-500"
  },
  "Try Again": {
    probability: 0.10,           // 10%
    expectedWinners: 20,         // ~20 people
    note: "Give small token anyway"
  }
};
```

### Budget-Friendly Adjustments
If you need to reduce costs, adjust probabilities:

```typescript
// Lower cost version
const budgetPrizes = {
  "₱50 GCash": 0.03,              // 3% = ~6 winners = ₱300
  "Spotify Raffle": 0.07,         // 7% = ~14 entries
  "Extra Raffle": 0.15,           // 15% = ~30 entries
  "Candy": 0.35,                  // 35% = ~70 people
  "Sticker": 0.30,                // 30% = ~60 people
  "Try Again": 0.10,              // 10% = ~20 people
};

// Total estimated cost: ₱800-1,200
```

---

## 🚀 Deployment Checklist

### Before Launch
- [ ] Test on multiple devices (iOS, Android, Desktop)
- [ ] Verify probability distribution is working correctly
- [ ] Test with slow internet connection
- [ ] Ensure offline fallback messages
- [ ] Test sound effects (with user interaction trigger)
- [ ] Verify responsive design on all screen sizes
- [ ] Add loading states for all async operations
- [ ] Test with 10+ consecutive spins/games
- [ ] Verify no memory leaks in animations
- [ ] Test accessibility (screen readers, keyboard navigation)

### Day-of-Event Prep
- [ ] Pre-load all sounds and images
- [ ] Test on actual booth WiFi/mobile data
- [ ] Have offline backup (screenshots of results)
- [ ] Prepare manual prize distribution method
- [ ] Print QR code for survey link (large format)
- [ ] Test on booth device(s) before event starts
- [ ] Have chargers/power banks ready
- [ ] Prepare simple verbal script for booth handlers

---

## 🎨 Brand Consistency Tips

1. **Always use Pacebeats neon green (#00FF7F)** for primary actions
2. **Dark backgrounds** maintain the app's premium feel
3. **Smooth animations** reflect music rhythm and pace
4. **High contrast** ensures readability in bright outdoor settings
5. **Music-related metaphors** in copy (spin the beat, guess the rhythm, etc.)
6. **Bold typography** for energy and excitement
7. **Glow effects** for that distinctive Pacebeats vibe

---

## 📝 Copywriting Guidelines

### Tone of Voice
- **Energetic** but not overwhelming
- **Friendly** and conversational
- **Brief** - max 2 lines per instruction
- **Action-oriented** - use verbs (Spin, Guess, Win)
- **Music-themed** language where possible

### Sample Copy Snippets

#### Spin Wheel
```
🎵 SPIN THE BEAT • WIN PRIZES 🎵

Ready to test your luck?
Complete the survey → Show confirmation → Spin to win!

[After spin]
🎉 Congratulations! 🎉
You won: [Prize Name]
Collect your prize from the booth!
```

#### BPM Game
```
🎶 TEST YOUR MUSIC INSTINCTS 🎶

Can you guess if this song is FAST or SLOW BPM?
Listen carefully and make your choice!

[After answer]
✅ Correct! This song has [X] BPM
Perfect for [running pace description]

[or]

❌ Not quite! This song has [X] BPM
Great for [running pace description]

Complete our survey to help build Pacebeats AI!
```

---

## 🎯 Success Metrics (Optional Tracking)

```typescript
// Track completion rate
interface GameMetrics {
  totalSpins: number;
  totalSurveyCompletes: number;
  prizeDistribution: Record<string, number>;
  averageTimePerParticipant: number;
  peakHours: string[];
  mobileVsDesktop: { mobile: number; desktop: number };
}
```

---

## 🔧 Quick Implementation Tips

### For Fast Development
1. Use **Recharts** or **react-canvas-wheel** for wheel component
2. Use **Howler.js** for reliable sound management
3. Use **Framer Motion** for smooth animations
4. Use **React Query** (optional) if fetching songs from API
5. Deploy to **Vercel** or **Netlify** for instant hosting
6. Use **Canvas API** for drawing the wheel (best performance)

### Critical Features Priority
1. ✅ **Must Have**: Wheel spin with rigged probability
2. ✅ **Must Have**: Mobile-responsive design
3. ✅ **Must Have**: Result display
4. ⭐ **Nice to Have**: Sound effects
5. ⭐ **Nice to Have**: Haptic feedback
6. ⭐ **Nice to Have**: BPM game option
7. ⭐ **Nice to Have**: Analytics tracking

---

## 🎉 Good Luck with Your Survey Event!

This design guide gives you everything needed to build an engaging, on-brand webapp for your Pacebeats survey booth. Remember:

- **Speed matters** - aim for 1-2 minutes per person
- **Visual attraction** - use bright neon green to draw attention
- **Movement & sound** - create excitement and crowd gathering
- **Simple mechanics** - don't overcomplicate it

**Target**: 50-200 real respondents ✅
**Strategy**: Make it fun, fast, and rewarding ✅
**Branding**: Stay true to Pacebeats identity ✅

---

*Aligned with Pacebeats Brand Kit © 2026*
*Music • Movement • Motivation* 🎵🏃‍♂️💚
