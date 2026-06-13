export type Language = 'python' | 'javascript' | 'go' | 'java';

export type QuestionType = 'mcq' | 'output_guess' | 'code_fill' | 'debug' | 'concept' | 'ordering';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  language: Language;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  code?: string;
  options?: string[]; // For mcq, concept
  answer: string | string[]; // For ordering it could be an array of strings
  explanation: string;
  hint?: string;
  tags: string[];
}

export interface Topic {
  id: string;
  name: string;
  language: Language;
  subtopics: string[];
  order: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastPlayed: string | null;
  streakFreezes: number;
  badges: string[];
  completedQuestions: string[];
  topicProgress: Record<string, number>; // Topic ID -> percentage (0-100)
  personalBests: Record<string, number>; // Game mode -> score/time
}

export interface LevelInfo {
  name: string;
  minXp: number;
}
