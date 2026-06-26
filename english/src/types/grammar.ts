export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'reorder'
  | 'error-correction'
  | 'translation'
  | 'mixed-test';

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export type LessonStatus = 'published' | 'coming-soon';

export interface GrammarExample {
  english: string;
  vietnamese: string;
  highlight?: string;
}

export interface GrammarFormula {
  title: string;
  pattern: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface GrammarUsage {
  title: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface CommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

/** Cặp đúng/sai minh họa trong phần giới thiệu khái niệm. */
export interface GrammarConceptPair {
  correct: string;
  wrong: string;
}

/** Khối giới thiệu ngắn — ghi chú tiếng Việt, ví dụ demo giữ nguyên tiếng Anh. */
export interface GrammarConceptSection {
  title: string;
  explanation?: string;
  bullets?: string[];
  examples?: GrammarExample[];
  pairs?: GrammarConceptPair[];
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  vietnameseHint?: string;
  difficulty: ExerciseDifficulty;
  skillFocus?: string[];
}

export interface LessonSummary {
  keyPoints: string[];
  rememberSentences: GrammarExample[];
}

export interface GrammarLessonMetadata {
  id: string;
  slug: string;
  level: CEFRLevel;
  moduleId: string;
  moduleTitle: string;
  order: number;
  title: string;
  shortTitle?: string;
  description: string;
  estimatedMinutes: number;
  status: LessonStatus;
  previousLessonSlug?: string;
  nextLessonSlug?: string;
}

export interface GrammarLesson extends GrammarLessonMetadata {
  objectives: string[];
  conceptSections?: GrammarConceptSection[];
  formulas: GrammarFormula[];
  usages: GrammarUsage[];
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  quickNotes: string[];
  exercises: Exercise[];
  miniTest: Exercise[];
  summary: LessonSummary;
}

export interface GrammarModule {
  id: string;
  level: CEFRLevel;
  title: string;
  description: string;
  order: number;
  lessonSlugs: string[];
}

