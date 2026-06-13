import { Question } from '../types';

// Simple seeded random number generator
// Mulbery32
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Get an integer seed based on current local date (YYYYMMDD)
export const getDailySeed = (): number => {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  return parseInt(dateStr, 10);
};

export const generateDailyChallenge = (allQuestions: Question[], count: number = 5): Question[] => {
  if (allQuestions.length === 0) return [];
  
  const seed = getDailySeed();
  const random = mulberry32(seed);
  
  const shuffled = [...allQuestions].sort(() => random() - 0.5);
  
  // Try to pick different question types
  const selected: Question[] = [];
  const typeCount: Record<string, number> = {};
  
  for (const q of shuffled) {
    if (selected.length >= count) break;
    
    const type = q.type;
    // Don't show more than 2 of the same type in daily challenge if possible
    if ((typeCount[type] || 0) < 2) {
      selected.push(q);
      typeCount[type] = (typeCount[type] || 0) + 1;
    }
  }
  
  // If we couldn't fill it with unique types, just pad with remaining
  if (selected.length < count) {
    for (const q of shuffled) {
      if (selected.length >= count) break;
      if (!selected.includes(q)) {
        selected.push(q);
      }
    }
  }
  
  return selected;
};
