import type { Exercise } from '@/types/grammar';

export type LessonLearningStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonSlug: string;
  status: LessonLearningStatus;
  bestScore?: number;
  attempts: number;
  lastStudiedAt?: string;
  completedAt?: string;
}

export interface WrongAnswerRecord {
  lessonSlug: string;
  exerciseId: string;
  question: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  explanation: string;
  createdAt: string;
}

export interface TestHistoryRecord {
  lessonSlug: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
}

interface MiniTestResultInput {
  lessonSlug: string;
  score: number;
  totalQuestions: number;
  wrongAnswers: Omit<WrongAnswerRecord, 'lessonSlug' | 'createdAt'>[];
  passingPercentage?: number;
}

export const GRAMMAR_A1_STORAGE_KEYS = {
  lessonProgress: 'englishApp.grammar.a1.lessonProgress',
  wrongAnswers: 'englishApp.grammar.a1.wrongAnswers',
  testHistory: 'englishApp.grammar.a1.testHistory',
} as const;

const DEFAULT_PASSING_PERCENTAGE = 70;

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readJsonArray<T>(key: string, isValidItem: (item: unknown) => item is T): T[] {
  if (!canUseLocalStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return [];

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(isValidItem);
  } catch {
    return [];
  }
}

function writeJsonArray<T>(key: string, value: T[]): void {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable in private mode or when quota is exceeded.
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isAnswerValue(value: unknown): value is Exercise['correctAnswer'] {
  return typeof value === 'string' || isStringArray(value);
}

function isLessonLearningStatus(value: unknown): value is LessonLearningStatus {
  return value === 'not-started' || value === 'in-progress' || value === 'completed';
}

function isLessonProgress(value: unknown): value is LessonProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const progress = value as Record<string, unknown>;

  return (
    typeof progress.lessonSlug === 'string' &&
    isLessonLearningStatus(progress.status) &&
    typeof progress.attempts === 'number' &&
    (progress.bestScore === undefined || typeof progress.bestScore === 'number') &&
    (progress.lastStudiedAt === undefined || typeof progress.lastStudiedAt === 'string') &&
    (progress.completedAt === undefined || typeof progress.completedAt === 'string')
  );
}

function isWrongAnswerRecord(value: unknown): value is WrongAnswerRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.lessonSlug === 'string' &&
    typeof record.exerciseId === 'string' &&
    typeof record.question === 'string' &&
    isAnswerValue(record.userAnswer) &&
    isAnswerValue(record.correctAnswer) &&
    typeof record.explanation === 'string' &&
    typeof record.createdAt === 'string'
  );
}

function isTestHistoryRecord(value: unknown): value is TestHistoryRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.lessonSlug === 'string' &&
    typeof record.score === 'number' &&
    typeof record.totalQuestions === 'number' &&
    typeof record.percentage === 'number' &&
    typeof record.createdAt === 'string'
  );
}

export function getAllLessonProgress(): LessonProgress[] {
  return readJsonArray(GRAMMAR_A1_STORAGE_KEYS.lessonProgress, isLessonProgress);
}

export function getLessonProgress(lessonSlug: string): LessonProgress {
  const savedProgress = getAllLessonProgress().find(
    (progress) => progress.lessonSlug === lessonSlug,
  );

  return (
    savedProgress ?? {
      lessonSlug,
      status: 'not-started',
      attempts: 0,
    }
  );
}

export function saveLessonProgress(nextProgress: LessonProgress): LessonProgress {
  const allProgress = getAllLessonProgress();
  const existingIndex = allProgress.findIndex(
    (progress) => progress.lessonSlug === nextProgress.lessonSlug,
  );

  const normalizedProgress: LessonProgress = {
    ...nextProgress,
    attempts: Math.max(0, nextProgress.attempts),
  };

  if (existingIndex >= 0) {
    allProgress[existingIndex] = normalizedProgress;
  } else {
    allProgress.push(normalizedProgress);
  }

  writeJsonArray(GRAMMAR_A1_STORAGE_KEYS.lessonProgress, allProgress);
  return normalizedProgress;
}

export function markLessonInProgress(lessonSlug: string): LessonProgress {
  const currentProgress = getLessonProgress(lessonSlug);
  const now = new Date().toISOString();

  if (currentProgress.status === 'completed') {
    return saveLessonProgress({
      ...currentProgress,
      lastStudiedAt: now,
    });
  }

  return saveLessonProgress({
    ...currentProgress,
    status: 'in-progress',
    lastStudiedAt: now,
  });
}

export function saveMiniTestResult({
  lessonSlug,
  score,
  totalQuestions,
  wrongAnswers,
  passingPercentage = DEFAULT_PASSING_PERCENTAGE,
}: MiniTestResultInput): LessonProgress {
  const now = new Date().toISOString();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const currentProgress = getLessonProgress(lessonSlug);
  const isCompleted = percentage >= passingPercentage;
  const nextBestScore =
    currentProgress.bestScore === undefined
      ? percentage
      : Math.max(currentProgress.bestScore, percentage);

  const nextProgress = saveLessonProgress({
    ...currentProgress,
    status: isCompleted ? 'completed' : 'in-progress',
    bestScore: nextBestScore,
    attempts: currentProgress.attempts + 1,
    lastStudiedAt: now,
    completedAt: isCompleted ? currentProgress.completedAt ?? now : currentProgress.completedAt,
  });

  const history = getTestHistory();
  writeJsonArray(GRAMMAR_A1_STORAGE_KEYS.testHistory, [
    ...history,
    {
      lessonSlug,
      score,
      totalQuestions,
      percentage,
      createdAt: now,
    },
  ]);

  if (wrongAnswers.length > 0) {
    addWrongAnswers(
      wrongAnswers.map((wrongAnswer) => ({
        ...wrongAnswer,
        lessonSlug,
        createdAt: now,
      })),
    );
  }

  return nextProgress;
}

export function addWrongAnswers(records: WrongAnswerRecord[]): void {
  if (records.length === 0) return;

  const currentRecords = getWrongAnswers();
  writeJsonArray(GRAMMAR_A1_STORAGE_KEYS.wrongAnswers, [...records, ...currentRecords]);
}

export function getWrongAnswers(): WrongAnswerRecord[] {
  return readJsonArray(GRAMMAR_A1_STORAGE_KEYS.wrongAnswers, isWrongAnswerRecord);
}

export function getTestHistory(): TestHistoryRecord[] {
  return readJsonArray(GRAMMAR_A1_STORAGE_KEYS.testHistory, isTestHistoryRecord);
}
