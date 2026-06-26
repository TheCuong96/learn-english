'use client';

import FillBlankExercise from './FillBlankExercise';
import type { Exercise } from '@/types/grammar';
import type { ExerciseAnswerResult } from './ExerciseRenderer';

interface TranslationExerciseProps {
  exercise: Exercise;
  questionNumber?: number;
  onAnswered?: (exerciseId: string, result: ExerciseAnswerResult | undefined) => void;
  resetSignal?: number;
}

export default function TranslationExercise({
  exercise,
  questionNumber,
  onAnswered,
  resetSignal,
}: TranslationExerciseProps) {
  return (
    <FillBlankExercise
      exercise={exercise}
      questionNumber={questionNumber}
      label="Câu tiếng Anh của bạn"
      typeLabel="Dịch câu"
      placeholder="Ví dụ: I am a student."
      onAnswered={onAnswered}
      resetSignal={resetSignal}
    />
  );
}
