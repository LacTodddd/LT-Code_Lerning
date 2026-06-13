import { Question } from '../types';

export const XP_REWARDS = {
  CORRECT: 10,
  NO_HINT_BONUS: 15,
  SPEED_BONUS: 5, // < 5s
  DAILY_CHALLENGE: 50,
  BOSS_BATTLE: 100
};

export const canUnlockBossBattle = (topicId: string, topicProgress: Record<string, number>): boolean => {
  return (topicProgress[topicId] || 0) >= 80;
};

// Select questions ensuring we don't have > 3 of same type consecutively
export const generateQuizSession = (questions: Question[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selected: Question[] = [];
  let consecutiveTypeCount = 0;
  let lastType = '';

  for (const q of shuffled) {
    if (selected.length >= count) break;
    
    if (q.type === lastType) {
      consecutiveTypeCount++;
    } else {
      consecutiveTypeCount = 1;
      lastType = q.type;
    }

    if (consecutiveTypeCount <= 3) {
      selected.push(q);
    } else {
      // Look for a different type
      const diffTypeIdx = shuffled.findIndex(item => !selected.includes(item) && item.type !== lastType);
      if (diffTypeIdx !== -1) {
        selected.push(shuffled[diffTypeIdx]);
        lastType = shuffled[diffTypeIdx].type;
        consecutiveTypeCount = 1;
      } else {
        // Fallback if no other types available
        selected.push(q);
      }
    }
  }

  return selected;
};
