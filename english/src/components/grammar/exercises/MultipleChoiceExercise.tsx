'use client';

import { useEffect, useId, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  checkGrammarAnswer,
  formatAcceptedAnswers,
  type AnswerCheckResult,
} from '@/lib/grammar-exercises';
import type { Exercise } from '@/types/grammar';
import type { ExerciseAnswerResult } from './ExerciseRenderer';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  questionNumber?: number;
  onAnswered?: (exerciseId: string, result: ExerciseAnswerResult | undefined) => void;
  resetSignal?: number;
}

export default function MultipleChoiceExercise({
  exercise,
  questionNumber,
  onAnswered,
  resetSignal,
}: MultipleChoiceExerciseProps) {
  const groupName = useId();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [lastResetSignal, setLastResetSignal] = useState(resetSignal);
  const options = exercise.options ?? [];

  useEffect(() => {
    if (lastResetSignal !== resetSignal) {
      setSelectedAnswer('');
      setResult(null);
      setLastResetSignal(resetSignal);
    }
  }, [lastResetSignal, resetSignal]);

  const resetAnswer = () => {
    setSelectedAnswer('');
    setResult(null);
    onAnswered?.(exercise.id, undefined);
  };

  const checkAnswer = () => {
    const checkedResult = checkGrammarAnswer(selectedAnswer, exercise.correctAnswer);
    setResult(checkedResult);
    onAnswered?.(exercise.id, {
      isCorrect: checkedResult.isCorrect,
      userAnswer: selectedAnswer,
    });
  };

  return (
    <Card className="border-slate-700 bg-slate-900/80">
      <CardHeader className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-bold text-violet-300">
            {questionNumber ? `Câu ${questionNumber}` : 'Câu hỏi'}
          </span>
          <span className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300">
            Trắc nghiệm
          </span>
        </div>
        <CardTitle className="pt-2 text-base leading-7 text-white">{exercise.question}</CardTitle>
        {exercise.vietnameseHint && (
          <CardDescription className="leading-6 text-slate-400">
            Gợi ý: {exercise.vietnameseHint}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        {options.length > 0 ? (
          <fieldset className="space-y-2">
            <legend className="sr-only">Chọn một đáp án</legend>
            {options.map((option, optionIndex) => {
              const optionId = `${groupName}-${optionIndex}`;
              const isSelected = selectedAnswer === option;

              return (
                <label
                  key={`${exercise.id}-${option}`}
                  htmlFor={optionId}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/50 p-3 text-sm leading-6 text-slate-200 transition',
                    isSelected && 'border-violet-400 bg-violet-500/15 text-white',
                  )}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={groupName}
                    value={option}
                    checked={isSelected}
                    onChange={() => {
                      setSelectedAnswer(option);
                      setResult(null);
                      onAnswered?.(exercise.id, undefined);
                    }}
                    className="mt-1"
                  />
                  <span>
                    <span className="mr-2 font-semibold text-violet-200">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>
                    {option}
                  </span>
                </label>
              );
            })}
          </fieldset>
        ) : (
          <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm leading-6 text-amber-100">
            Câu trắc nghiệm này chưa có lựa chọn. Vui lòng bổ sung options trong data.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={checkAnswer}
            disabled={!selectedAnswer || options.length === 0}
            className="bg-violet-600 text-white hover:bg-violet-500"
          >
            Kiểm tra
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetAnswer}
            disabled={!selectedAnswer && !result}
            className="border-slate-600 bg-slate-950 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Làm lại
          </Button>
        </div>

        {result && (
          <div
            aria-live="polite"
            className={cn(
              'rounded-xl border p-4 text-sm leading-6',
              result.isCorrect
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'
                : 'border-red-400/40 bg-red-500/10 text-red-100',
            )}
          >
            <p className="flex items-center gap-2 font-bold">
              {result.isCorrect ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {result.isCorrect ? 'Đúng' : 'Sai'}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-white">Đáp án đúng:</span>{' '}
              {formatAcceptedAnswers(exercise.correctAnswer)}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-white">Giải thích:</span>{' '}
              {exercise.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
