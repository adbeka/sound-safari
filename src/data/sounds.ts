// Sound Library - Curated sounds for each phase
import type { SoundItem, DifficultyLevel } from '../types';

export const DISCOVERY_SOUNDS: SoundItem[] = [
  {
    id: 'clock-tick',
    name: 'clock-tick',
    displayName: 'Tick-Tock Clock',
    category: 'household',
    description: 'The gentle ticking of a clock',
    difficulty: 'easy'
  },
  {
    id: 'fridge-hum',
    name: 'fridge-hum',
    displayName: 'Humming Refrigerator',
    category: 'household',
    description: 'The low hum of the fridge',
    difficulty: 'medium'
  },
  {
    id: 'water-drip',
    name: 'water-drip',
    displayName: 'Dripping Water',
    category: 'household',
    description: 'Drip... drip... drip...',
    difficulty: 'easy'
  },
  {
    id: 'wind-blow',
    name: 'wind-blow',
    displayName: 'Gentle Wind',
    category: 'nature',
    description: 'Whoooosh goes the wind',
    difficulty: 'easy'
  },
  {
    id: 'bird-chirp',
    name: 'bird-chirp',
    displayName: 'Bird Chirping',
    category: 'nature',
    description: 'Tweet tweet from a little bird',
    difficulty: 'easy'
  },
  {
    id: 'door-creak',
    name: 'door-creak',
    displayName: 'Creaky Door',
    category: 'household',
    description: 'Creeeak! The door opens',
    difficulty: 'easy'
  },
  {
    id: 'rain-patter',
    name: 'rain-patter',
    displayName: 'Rain Drops',
    category: 'nature',
    description: 'Pitter patter on the window',
    difficulty: 'easy'
  },
  {
    id: 'phone-ring',
    name: 'phone-ring',
    displayName: 'Phone Ringing',
    category: 'household',
    description: 'Ring ring! Time to answer',
    difficulty: 'easy'
  }
];

export const ANIMAL_SOUNDS: SoundItem[] = [
  {
    id: 'lion-roar',
    name: 'lion-roar',
    displayName: 'Lion',
    category: 'animal',
    description: 'ROOOAAAR! The mighty lion!',
    difficulty: 'easy'
  },
  {
    id: 'elephant-trumpet',
    name: 'elephant-trumpet',
    displayName: 'Elephant',
    category: 'animal',
    description: 'PAAA-OOOOO! The elephant says hello!',
    difficulty: 'medium'
  },
  {
    id: 'monkey-chatter',
    name: 'monkey-chatter',
    displayName: 'Monkey',
    category: 'animal',
    description: 'Ooh ooh ah ah! The silly monkey!',
    difficulty: 'easy'
  },
  {
    id: 'snake-hiss',
    name: 'snake-hiss',
    displayName: 'Snake',
    category: 'animal',
    description: 'Sssssss... says the snake',
    difficulty: 'easy'
  },
  {
    id: 'mouse-squeak',
    name: 'mouse-squeak',
    displayName: 'Mouse',
    category: 'animal',
    description: 'Squeak squeak! The tiny mouse',
    difficulty: 'easy'
  },
  {
    id: 'bear-growl',
    name: 'bear-growl',
    displayName: 'Bear',
    category: 'animal',
    description: 'GRRRRR! The big bear!',
    difficulty: 'medium'
  },
  {
    id: 'owl-hoot',
    name: 'owl-hoot',
    displayName: 'Owl',
    category: 'animal',
    description: 'Hoo hoo! The wise owl',
    difficulty: 'medium'
  },
  {
    id: 'frog-ribbit',
    name: 'frog-ribbit',
    displayName: 'Frog',
    category: 'animal',
    description: 'Ribbit ribbit! The jumping frog',
    difficulty: 'easy'
  },
  {
    id: 'cat-meow',
    name: 'cat-meow',
    displayName: 'Cat',
    category: 'animal',
    description: 'Meow meow! The cuddly cat',
    difficulty: 'easy'
  },
  {
    id: 'dog-bark',
    name: 'dog-bark',
    displayName: 'Dog',
    category: 'animal',
    description: 'Woof woof! The friendly dog',
    difficulty: 'easy'
  },
  {
    id: 'bird-tweet',
    name: 'bird-tweet',
    displayName: 'Bird',
    category: 'animal',
    description: 'Tweet tweet! The singing bird',
    difficulty: 'easy'
  },
  {
    id: 'bee-buzz',
    name: 'bee-buzz',
    displayName: 'Bee',
    category: 'animal',
    description: 'Bzzzzz! The busy bee',
    difficulty: 'easy'
  },
  {
    id: 'duck-quack',
    name: 'duck-quack',
    displayName: 'Duck',
    category: 'animal',
    description: 'Quack quack! The swimming duck',
    difficulty: 'easy'
  },
  {
    id: 'horse-neigh',
    name: 'horse-neigh',
    displayName: 'Horse',
    category: 'animal',
    description: 'Neeeigh! The galloping horse',
    difficulty: 'medium'
  },
  {
    id: 'sheep-baa',
    name: 'sheep-baa',
    displayName: 'Sheep',
    category: 'animal',
    description: 'Baa baa! The fluffy sheep',
    difficulty: 'easy'
  },
  {
    id: 'pig-oink',
    name: 'pig-oink',
    displayName: 'Pig',
    category: 'animal',
    description: 'Oink oink! The happy pig',
    difficulty: 'easy'
  }
];

export interface RhythmPattern {
  id: string;
  name: string;
  pattern: number[];
  difficulty: DifficultyLevel;
  description: string;
}

export const RHYTHM_PATTERNS: RhythmPattern[] = [
  {
    id: 'simple-beat',
    name: 'Simple Beat',
    pattern: [1, 0, 1, 0],
    difficulty: 'easy',
    description: 'Clap... rest... clap... rest'
  },
  {
    id: 'double-clap',
    name: 'Double Clap',
    pattern: [1, 1, 0, 0],
    difficulty: 'easy',
    description: 'Clap clap... pause... clap clap'
  },
  {
    id: 'triple-fun',
    name: 'Triple Fun',
    pattern: [1, 1, 1, 0],
    difficulty: 'medium',
    description: 'Clap clap clap... pause'
  },
  {
    id: 'syncopated',
    name: 'Bouncy Beat',
    pattern: [1, 0, 1, 1],
    difficulty: 'hard',
    description: 'Clap... rest... clap clap'
  },
  {
    id: 'gallop',
    name: 'Galloping Horse',
    pattern: [1, 1, 0, 1],
    difficulty: 'medium',
    description: 'Clap clap... rest... clap'
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    pattern: [1, 1, 0, 0, 1, 1, 0, 0],
    difficulty: 'medium',
    description: 'Boom boom... boom boom'
  }
];

// Echo's encouraging phrases
export const ENCOURAGEMENTS = [
  "Amazing work, superstar!",
  "That was PERFECT!",
  "You're a sound explorer!",
  "What a wonderful sound!",
  "I love how you did that!",
  "You're so talented!",
  "That made Echo's ears happy!",
  "Beautiful! Let's try another!",
  "You're the best sound maker!",
  "Echo is so proud of you!"
];

// Transition phrases
export const TRANSITION_PHRASES = {
  toDiscovery: [
    "Let's use our quiet ears now...",
    "Time to listen carefully...",
    "What sounds can we find?"
  ],
  toExpression: [
    "Now it's YOUR turn to make sounds!",
    "Let's make some noise together!",
    "Show me your best animal sounds!"
  ],
  toCreation: [
    "Ready to make music?",
    "Let's create our own rhythm!",
    "Time to be the band leader!"
  ]
};

// Comfort phrases for emotional support
export const COMFORT_PHRASES = [
  "Echo is right here with you",
  "You're doing so well",
  "Mommy/Daddy will be back soon",
  "Let's hear your special sound",
  "You're safe and Echo is listening",
  "What a brave explorer you are"
];
