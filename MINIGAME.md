# Sound Match Minigame

## Overview
A simple memory card matching game has been added to Sound Safari! This minigame provides a fun, interactive break from the main safari phases and helps develop memory and sound recognition skills.

## Features

### Gameplay
- **3 Pairs to Match**: The game uses 3 animal sounds (6 cards total) to keep it simple for toddlers
- **Sound Feedback**: Each card plays a unique tone when flipped
- **Visual Design**: Colorful cards with animal emojis
- **Star Rating**: Performance-based stars (1-3) based on number of moves
  - 3 stars: 15 moves or less
  - 2 stars: 16-20 moves
  - 1 star: More than 20 moves

### Integration
The minigame can be accessed in two ways:
1. **From Start Screen**: A dedicated "Play Sound Match Game" button on the welcome screen
2. **During Gameplay**: A "Minigame" button in the top-right corner during active safari sessions

### Game Elements
- **Animal Sounds Used**:
  - 🦁 Lion (220 Hz)
  - 🐱 Cat (440 Hz)
  - 🐶 Dog (330 Hz)
  - 🐦 Bird (880 Hz)
  - 🐘 Elephant (165 Hz)
  - 🦆 Duck (550 Hz)

### Scoring
- Each successful match awards a point to the player's overall score
- Game tracks moves and displays completion time
- Win screen shows stars earned and offers replay option

### User Experience
- **Easy to Understand**: Simple tap-to-flip mechanic
- **Audio Feedback**: Different tones help distinguish between cards
- **Animations**: Smooth card flip animations using Framer Motion
- **Responsive**: Works on various screen sizes
- **Echo Integration**: Echo provides encouraging messages throughout

## Technical Implementation

### Files Added
- `/src/components/SoundMatchMinigame.tsx` - Main minigame component

### Files Modified
- `/src/components/GameView.tsx` - Integration with main game flow

### Key Features
- State management using React hooks
- Web Audio API for generating unique tones per animal
- Framer Motion for smooth animations
- Responsive grid layout with Tailwind CSS
- Integration with existing Zustand store for scoring

## Future Enhancements
Potential improvements could include:
- Additional difficulty levels with more cards
- Actual sound file playback instead of generated tones
- Time-based challenges
- Multiple minigame types
- Minigame-specific achievements and badges
