export interface Verb {
  word: string;
  type: string;
  v1: string;
  v2: string;
  v3: string;
  definition: string;
  english_definition: string;
  example: string;
  icon?: string;
}

export type SessionType = 'flashcards' | 'multiple-choice' | 'fill-in-blank' | 'verb-forms';

export interface ReviewWord extends Verb {
  userAnswer?: string;
}

