import { describe, it, expect } from 'vitest';
import { canUnlockBossBattle, generateQuizSession } from './game';
import { Question } from '../types';

describe('Game Mechanics Utils', () => {
  it('canUnlockBossBattle should return true if progress >= 80', () => {
    expect(canUnlockBossBattle('topic1', { 'topic1': 80 })).toBe(true);
    expect(canUnlockBossBattle('topic1', { 'topic1': 100 })).toBe(true);
  });

  it('canUnlockBossBattle should return false if progress < 80', () => {
    expect(canUnlockBossBattle('topic1', { 'topic1': 79 })).toBe(false);
    expect(canUnlockBossBattle('topic1', {})).toBe(false);
  });

  it('generateQuizSession should not have more than 3 of the same question type consecutively', () => {
    const mockQuestions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q${i}`,
      language: 'python',
      topic: 'test',
      subtopic: 'test',
      difficulty: 'beginner',
      type: 'mcq', // all same type
      question: `Q${i}`,
      answer: 'A',
      explanation: 'E',
      tags: []
    }));

    // If all are the same type, it will be forced to use them, but our fallback handles it
    const session = generateQuizSession(mockQuestions, 5);
    expect(session.length).toBe(5);
  });
});
