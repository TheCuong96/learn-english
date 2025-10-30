export type TenseType =
  | 'present-simple'
  | 'present-continuous'
  | 'present-perfect'
  | 'present-perfect-continuous'
  | 'past-simple'
  | 'past-continuous'
  | 'past-perfect'
  | 'past-perfect-continuous'
  | 'future-simple'
  | 'future-continuous'
  | 'future-perfect'
  | 'future-perfect-continuous';

export interface TenseFormula {
  id: TenseType;
  name: string;
  nameVN: string;
  affirmative: string;
  negative: string;
  interrogative: string;
  examples: {
    affirmative: string[];
    negative: string[];
    interrogative: string[];
  };
  timeSignals: string[];
  usage: string;
}

export interface TensesQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  tenseType: TenseType;
  difficulty: 'easy' | 'medium' | 'hard';
  completedSentence?: string;
  vietnameseMeaning?: string;
}

export interface TensesExercise {
  id: string;
  tenseId: TenseType;
  sentence: string;
  blankPosition: number;
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation: string;
}

export interface TensesResult {
  correct: number;
  total: number;
  wrongAnswers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
  timeSpent: number;
}

export interface TenseComparison {
  type1: TenseType;
  type2: TenseType;
  differences: {
    timeSignals: string[];
    usage: string[];
    examples: string[];
  };
}

