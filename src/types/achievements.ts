// Achievement System - Badges and rewards for accomplishments

export type BadgeType = 
  | 'first-safari'
  | 'sound-detective'
  | 'animal-expert'
  | 'rhythm-master'
  | 'brave-explorer'
  | 'super-listener'
  | 'voice-champion'
  | 'music-maker'
  | 'safari-veteran'
  | 'comfort-friend';

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: 'sessions' | 'sounds' | 'animals' | 'rhythms' | 'phases' | 'comfort';
    count: number;
  };
  earnedAt?: Date;
}

export interface Achievement {
  badgeId: BadgeType;
  earnedAt: Date;
  sessionId: string;
}

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'first-safari',
    name: 'First Safari',
    description: 'Complete your very first Sound Safari adventure!',
    emoji: '🎉',
    rarity: 'common',
    requirement: { type: 'sessions', count: 1 }
  },
  {
    id: 'sound-detective',
    name: 'Sound Detective',
    description: 'Discover 25 different sounds',
    emoji: '🔍',
    rarity: 'common',
    requirement: { type: 'sounds', count: 25 }
  },
  {
    id: 'animal-expert',
    name: 'Animal Expert',
    description: 'Imitate 50 animal sounds',
    emoji: '🦁',
    rarity: 'rare',
    requirement: { type: 'animals', count: 50 }
  },
  {
    id: 'rhythm-master',
    name: 'Rhythm Master',
    description: 'Create 30 rhythms',
    emoji: '🥁',
    rarity: 'rare',
    requirement: { type: 'rhythms', count: 30 }
  },
  {
    id: 'brave-explorer',
    name: 'Brave Explorer',
    description: 'Complete all three phases in one session',
    emoji: '⭐',
    rarity: 'epic',
    requirement: { type: 'phases', count: 3 }
  },
  {
    id: 'super-listener',
    name: 'Super Listener',
    description: 'Discover all sounds in discovery phase',
    emoji: '👂',
    rarity: 'common',
    requirement: { type: 'sounds', count: 5 }
  },
  {
    id: 'voice-champion',
    name: 'Voice Champion',
    description: 'Imitate all 8 animals in one session',
    emoji: '🎤',
    rarity: 'epic',
    requirement: { type: 'animals', count: 8 }
  },
  {
    id: 'music-maker',
    name: 'Music Maker',
    description: 'Complete all rhythm patterns',
    emoji: '🎵',
    rarity: 'rare',
    requirement: { type: 'rhythms', count: 4 }
  },
  {
    id: 'safari-veteran',
    name: 'Safari Veteran',
    description: 'Complete 10 Sound Safari adventures',
    emoji: '🏆',
    rarity: 'legendary',
    requirement: { type: 'sessions', count: 10 }
  },
  {
    id: 'comfort-friend',
    name: 'Comfort Friend',
    description: 'Echo is always here for you',
    emoji: '💖',
    rarity: 'epic',
    requirement: { type: 'comfort', count: 1 }
  }
];

export function checkBadgeEarned(
  badge: Badge,
  profile: {
    sessionHistory: any[];
    achievements: Achievement[];
  }
): boolean {
  // Already earned
  if (profile.achievements.some(a => a.badgeId === badge.id)) {
    return false;
  }

  const { type, count } = badge.requirement;

  switch (type) {
    case 'sessions':
      return profile.sessionHistory.length >= count;
    
    case 'sounds': {
      const totalSounds = profile.sessionHistory.reduce(
        (sum, s) => sum + s.soundsDiscovered.length,
        0
      );
      return totalSounds >= count;
    }
    
    case 'animals': {
      const totalAnimals = profile.sessionHistory.reduce(
        (sum, s) => sum + s.soundsImitated.length,
        0
      );
      return totalAnimals >= count;
    }
    
    case 'rhythms': {
      const totalRhythms = profile.sessionHistory.reduce(
        (sum, s) => sum + s.rhythmsCreated,
        0
      );
      return totalRhythms >= count;
    }
    
    case 'phases': {
      const lastSession = profile.sessionHistory[profile.sessionHistory.length - 1];
      return lastSession?.currentPhase === 'creation' && 
             lastSession.soundsDiscovered.length >= 5 &&
             lastSession.soundsImitated.length >= 8 &&
             lastSession.rhythmsCreated >= 4;
    }
    
    case 'comfort': {
      const hasComfortPlayed = profile.sessionHistory.some(
        s => s.comfortSoundsPlayed.length > 0
      );
      return hasComfortPlayed;
    }
    
    default:
      return false;
  }
}

export function getRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common': return '#81C784';
    case 'rare': return '#4FC3F7';
    case 'epic': return '#BA68C8';
    case 'legendary': return '#FFD54F';
  }
}
