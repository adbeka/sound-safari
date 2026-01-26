import type { DifficultyLevel } from '../types';

export const DIFFICULTY_ORDER: DifficultyLevel[] = ['easy', 'medium', 'hard'];

export const filterByDifficulty = <T extends { difficulty: DifficultyLevel }>(
  items: T[],
  level: DifficultyLevel
): T[] => {
  const maxIndex = DIFFICULTY_ORDER.indexOf(level);
  return items.filter(item => DIFFICULTY_ORDER.indexOf(item.difficulty) <= maxIndex);
};

export const getNextDifficulty = (
  current: DifficultyLevel,
  direction: 'up' | 'down'
): DifficultyLevel => {
  const index = DIFFICULTY_ORDER.indexOf(current);
  if (direction === 'up') {
    return DIFFICULTY_ORDER[Math.min(index + 1, DIFFICULTY_ORDER.length - 1)];
  }
  return DIFFICULTY_ORDER[Math.max(index - 1, 0)];
};
