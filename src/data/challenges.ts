import type { DailyChallenge } from '../types';

export interface DailyChallengeTemplate {
  id: string;
  title: string;
  description: string;
  type: DailyChallenge['type'];
  target: number;
}

export const DAILY_CHALLENGE_TEMPLATES: DailyChallengeTemplate[] = [
  {
    id: 'discover-3',
    title: 'Sound Scout',
    description: 'Discover 3 new sounds today.',
    type: 'discover',
    target: 3
  },
  {
    id: 'imitate-4',
    title: 'Animal Echo',
    description: 'Imitate 4 animal sounds today.',
    type: 'imitate',
    target: 4
  },
  {
    id: 'rhythm-2',
    title: 'Rhythm Ranger',
    description: 'Create 2 rhythms today.',
    type: 'rhythm',
    target: 2
  }
];

export const DAILY_REWARDS: Array<Pick<DailyChallenge, 'reward' | 'rewardType'>> = [
  { reward: '🧩 New Sticker Pack', rewardType: 'sticker' },
  { reward: '🏅 Mini Badge Boost', rewardType: 'badge' },
  { reward: '🌈 Environment Bonus', rewardType: 'environment' },
  { reward: '✨ Score Boost', rewardType: 'bonus' }
];

export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const generateDailyChallenge = (seedKey: string): DailyChallenge => {
  const seedValue = seedKey.split('-').reduce((sum, part) => sum + Number(part), 0);
  const challenge = DAILY_CHALLENGE_TEMPLATES[seedValue % DAILY_CHALLENGE_TEMPLATES.length];
  const reward = DAILY_REWARDS[seedValue % DAILY_REWARDS.length];

  return {
    id: `${challenge.id}-${seedKey}`,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    target: challenge.target,
    progress: 0,
    reward: reward.reward,
    rewardType: reward.rewardType,
    dateKey: seedKey,
    completed: false
  };
};
