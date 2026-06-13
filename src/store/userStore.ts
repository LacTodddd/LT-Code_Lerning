import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStats } from '../types';

export const LEVELS = [
  { name: 'Beginner', minXp: 0 },
  { name: 'Junior', minXp: 500 },
  { name: 'Mid', minXp: 2000 },
  { name: 'Senior', minXp: 5000 },
  { name: 'Principal', minXp: 10000 },
  { name: 'Staff', minXp: 20000 },
  { name: 'Distinguished', minXp: 50000 },
];

interface UserStore extends UserStats {
  addXp: (amount: number) => void;
  updateStreak: () => void;
  useStreakFreeze: () => boolean;
  addBadge: (badgeId: string) => void;
  markQuestionComplete: (questionId: string) => void;
  updateTopicProgress: (topicId: string, percentage: number) => void;
  updatePersonalBest: (mode: string, score: number) => void;
}

const getLevelFromXp = (xp: number) => {
  let currentLevel = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) {
      currentLevel = i;
    } else {
      break;
    }
  }
  return currentLevel;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 0,
      streak: 0,
      lastPlayed: null,
      streakFreezes: 1, // Start with 1 freeze
      badges: [],
      completedQuestions: [],
      topicProgress: {},
      personalBests: {},

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = getLevelFromXp(newXp);
        return { xp: newXp, level: newLevel };
      }),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastPlayed === today) return state; // Already played today

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (state.lastPlayed === yesterdayStr) {
          // Continuous streak
          return { streak: state.streak + 1, lastPlayed: today };
        } else if (state.lastPlayed && state.streakFreezes > 0) {
          // Missed a day but has a freeze
          // Just updating lastPlayed without resetting streak, consumes 1 freeze
          return { streak: state.streak, lastPlayed: today, streakFreezes: state.streakFreezes - 1 };
        } else {
          // Streak broken
          return { streak: 1, lastPlayed: today };
        }
      }),

      useStreakFreeze: () => {
        const state = get();
        if (state.streakFreezes > 0) {
          set({ streakFreezes: state.streakFreezes - 1 });
          return true;
        }
        return false;
      },

      addBadge: (badgeId) => set((state) => {
        if (!state.badges.includes(badgeId)) {
          return { badges: [...state.badges, badgeId] };
        }
        return state;
      }),

      markQuestionComplete: (questionId) => set((state) => {
        if (!state.completedQuestions.includes(questionId)) {
          return { completedQuestions: [...state.completedQuestions, questionId] };
        }
        return state;
      }),

      updateTopicProgress: (topicId, percentage) => set((state) => ({
        topicProgress: { ...state.topicProgress, [topicId]: percentage }
      })),

      updatePersonalBest: (mode, score) => set((state) => {
        const currentBest = state.personalBests[mode];
        if (currentBest === undefined || score > currentBest) {
          return { personalBests: { ...state.personalBests, [mode]: score } };
        }
        return state;
      }),
    }),
    {
      name: 'programmer-quiz-user-storage',
    }
  )
);
