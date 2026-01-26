import type { Environment } from '../types';

export const ENVIRONMENTS: Environment[] = [
  {
    id: 'savanna',
    name: 'Sunny Savanna',
    emoji: '🦁',
    description: 'Warm grasslands with gentle breezes.',
    unlockAtSessions: 0
  },
  {
    id: 'rainforest',
    name: 'Rainforest Canopy',
    emoji: '🌧️',
    description: 'Lush leaves and playful raindrops.',
    unlockAtSessions: 2
  },
  {
    id: 'ocean',
    name: 'Ocean Reef',
    emoji: '🌊',
    description: 'Bubbly tides and calming waves.',
    unlockAtSessions: 4
  },
  {
    id: 'mountain',
    name: 'Mountain Meadow',
    emoji: '⛰️',
    description: 'Crisp air with echoing sounds.',
    unlockAtSessions: 6
  },
  {
    id: 'starlight',
    name: 'Starlight Sky',
    emoji: '✨',
    description: 'A sparkling night adventure.',
    unlockAtSessions: 8
  }
];

export const DEFAULT_ENVIRONMENT_ID = ENVIRONMENTS[0].id;
