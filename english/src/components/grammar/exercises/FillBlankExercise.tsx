'use client';

import { useEffect, useId, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  checkGrammarAnswer,
  formatAcceptedAnswers,
  type AnswerCheckResult,
} from '@/lib/grammar-exercises';
import type { Exercise } from '@/types/grammar';
import type { ExerciseAnswerResult } from './ExerciseRenderer';

interface FillBlankExerciseProps {
  exercise: Exercise;
  questionNumber?: number;
  label?: string;
  typeLabel?: string;
  placeholder?: string;
  onAnswered?: (exerciseId: string, result: ExerciseAnswerResult | undefined) => void;
  resetSignal?: number;
}

export default function FillBlankExercise({
  exercise,
  questionNumber,
  label = 'Nhập đáp án của bạn',
  typeLabel = 'Điền từ',
  placeholder = 'Viết đáp án...',
  onAnswered,
  resetSignal,
}: FillBlankExerciseProps) {
  const inputId = useId();
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [lastResetSignal, setLastResetSignal] = useState(resetSignal);

  useEffect(() => {
    if (lastResetSignal !== resetSignal) {
      setAnswer('');
      setResult(null);
      setLastResetSignal(resetSignal);
    }
  }, [lastResetSignal, resetSignal]);

  const resetAnswer = () => {
    setAnswer('');
    setResult(null);
    onAnswered?.(exercise.id, undefined);
  };

  const checkAnswer = () => {
    const checkedResult = checkGrammarAnswer(answer, exercise.correctAnswer);
    setResult(checkedResult);
    onAnswered?.(exercise.id, {
      isCorrect: checkedResult.isCorrect,
      userAnswer: answer,
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
            {typeLabel}
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
        <div className="space-y-2">
          <Label htmlFor={inputId} className="text-slate-200">
            {label}
          </Label>
          <Input
            id={inputId}
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setResult(null);
              onAnswered?.(exercise.id, undefined);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && answer.trim()) {
                checkAnswer();
              }
            }}
            placeholder={placeholder}
            className="border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
          />
          <p className="text-xs leading-5 text-slate-500">
            Hệ thống tự bỏ khoảng trắng thừa và không phân biệt hoa/thường khi chấm.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={checkAnswer}
            disabled={!answer.trim()}
            className="bg-violet-600 text-white hover:bg-violet-500"
          >
            Kiểm tra
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetAnswer}
            disabled={!answer && !result}
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
