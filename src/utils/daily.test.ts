import { describe, it, expect } from 'vitest';
import { getDailySeed, generateDailyChallenge } from './daily';
import { Question } from '../types';

describe('Daily Challenge Utils', () => {
  it('getDailySeed should return a valid number', () => {
    const seed = getDailySeed();
    expect(typeof seed).toBe('number');
    expect(seed).toBeGreaterThan(0);
  });

  it('generateDailyChallenge should return specified number of questions', () => {
    const mockQuestions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q${i}`,
      language: 'python',
      topic: 'test',
      subtopic: 'test',
      difficulty: 'beginner',
      type: 'mcq',
      question: `Q${i}`,
      answer: 'A',
      explanation: 'E',
      tags: []
    }));

    const challenge = generateDailyChallenge(mockQuestions, 5);
    expect(challenge.length).toBe(5);
  });

  it('generateDailyChallenge should return same questions for same seed (idempotent)', () => {
    const mockQuestions: Question[] = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i}`,
      language: 'python',
      topic: 'test',
      subtopic: 'test',
      difficulty: 'beginner',
      type: i % 2 === 0 ? 'mcq' : 'concept',
      question: `Q${i}`,
      answer: 'A',
      explanation: 'E',
      tags: []
    }));

    // Since generateDailyChallenge uses local date, calling it twice on the same day 
    // without mocking Date still returns the same result for the current day.
    const challenge1 = generateDailyChallenge(mockQuestions, 5);
    const challenge2 = generateDailyChallenge(mockQuestions, 5);

    expect(challenge1.map(q => q.id)).toEqual(challenge2.map(q => q.id));
  });
});
