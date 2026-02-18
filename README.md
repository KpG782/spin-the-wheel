# Pacebeats Survey Game Webapp

Interactive survey game webapp built with React + TypeScript featuring:
- 🎡 Spin-the-Beat Wheel game with rigged probability system
- 🎵 Guess the BPM challenge game  
- PaceBeats blue brand design (#0066FF)
- Official PaceBeats logo integration
- Responsive design for mobile and desktop
- Smooth animations and haptic feedback

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── SpinWheel/       # Wheel game components
│   ├── BPMGame/         # BPM game components
│   ├── HomePage/        # Home page
│   └── shared/          # Shared components
├── data/                # Game data (prizes, songs)
├── styles/              # Global styles
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## Features

### Spin-the-Beat Wheel
- Weighted probability system
- 6 different prizes with customizable odds
- Smooth spin animation
- Prize result modal

### Guess the BPM Game
- 10 popular songs
- Fast/Slow BPM classification
- Score tracking
- Visual feedback

## Technology Stack

- React 18
- TypeScript
- Vite
- Framer Motion (animations)
- React Router
- CSS3 (custom animations)

## Deployment

This app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## License

© 2026 Pacebeats
