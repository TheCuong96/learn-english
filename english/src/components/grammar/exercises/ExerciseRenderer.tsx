'use client';

import type { Exercise } from '@/types/grammar';

import FillBlankExercise from './FillBlankExercise';
import MultipleChoiceExercise from './MultipleChoiceExercise';
import TranslationExercise from './TranslationExercise';

export interface ExerciseAnswerResult {
  isCorrect: boolean;
  userAnswer: string | string[];
}

interface ExerciseRendererProps {
  exercise: Exercise;
  questionNumber?: number;
  onAnswered?: (exerciseId: string, result: ExerciseAnswerResult | undefined) => void;
  resetSignal?: number;
}

export default function ExerciseRenderer({
  exercise,
  questionNumber,
  onAnswered,
  resetSignal,
}: ExerciseRendererProps) {
  if (exercise.type === 'multiple-choice') {
    return (
      <MultipleChoiceExercise
        exercise={exercise}
        questionNumber={questionNumber}
        onAnswered={onAnswered}
        resetSignal={resetSignal}
      />
    );
  }

  if (exercise.type === 'translation') {
    return (
      <TranslationExercise
        exercise={exercise}
        questionNumber={questionNumber}
        onAnswered={onAnswered}
        resetSignal={resetSignal}
      />
    );
  }

  if (exercise.type === 'reorder') {
    return (
      <FillBlankExercise
        exercise={exercise}
        questionNumber={questionNumber}
        label="Câu hoàn chỉnh của bạn"
        typeLabel="Sắp xếp câu"
        placeholder="Viết lại câu đã sắp xếp..."
        onAnswered={onAnswered}
        resetSignal={resetSignal}
      />
    );
  }

  if (exercise.type === 'error-correction') {
    return (
      <FillBlankExercise
        exercise={exercise}
        questionNumber={questionNumber}
        label="Câu đã sửa"
        typeLabel="Sửa lỗi"
        placeholder="Viết câu đúng..."
        onAnswered={onAnswered}
        resetSignal={resetSignal}
      />
    );
  }

  return (
    <FillBlankExercise
      exercise={exercise}
      questionNumber={questionNumber}
      onAnswered={onAnswered}
      resetSignal={resetSignal}
    />
  );
}
