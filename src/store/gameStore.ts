import { create } from 'zustand';
import { Question, Language } from '../types';

interface GameStore {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  
  currentSession: Question[] | null;
  currentQuestionIndex: number;
  startSession: (questions: Question[]) => void;
  nextQuestion: () => void;
  endSession: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  selectedLanguage: 'python',
  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
  
  currentSession: null,
  currentQuestionIndex: 0,
  startSession: (questions) => set({ currentSession: questions, currentQuestionIndex: 0 }),
  nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  endSession: () => set({ currentSession: null, currentQuestionIndex: 0 }),
}));
