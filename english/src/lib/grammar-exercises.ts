import type { Exercise } from '@/types/grammar';

export interface AnswerCheckResult {
  isCorrect: boolean;
  acceptedAnswers: string[];
  normalizedUserAnswer: string;
}

interface NormalizeOptions {
  preserveCase?: boolean;
}

export function getAcceptedAnswers(correctAnswer: Exercise['correctAnswer']): string[] {
  return Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
}

export function normalizeGrammarAnswer(
  answer: string,
  options: NormalizeOptions = {},
): string {
  const normalizedWhitespace = answer
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/\s+([?.!,;:])/g, '$1')
    .trim();

  return options.preserveCase
    ? normalizedWhitespace
    : normalizedWhitespace.toLowerCase();
}

export function checkGrammarAnswer(
  userAnswer: string,
  correctAnswer: Exercise['correctAnswer'],
  options: NormalizeOptions = {},
): AnswerCheckResult {
  const acceptedAnswers = getAcceptedAnswers(correctAnswer);
  const normalizedUserAnswer = normalizeGrammarAnswer(userAnswer, options);
  const isCorrect = acceptedAnswers.some(
    (answer) => normalizeGrammarAnswer(answer, options) === normalizedUserAnswer,
  );

  return {
    isCorrect,
    acceptedAnswers,
    normalizedUserAnswer,
  };
}

export function formatAcceptedAnswers(correctAnswer: Exercise['correctAnswer']): string {
  return getAcceptedAnswers(correctAnswer).join(' / ');
}
