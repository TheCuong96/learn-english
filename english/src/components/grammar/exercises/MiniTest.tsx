'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Award, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveMiniTestResult } from '@/lib/grammar-progress';
import type { Exercise } from '@/types/grammar';

import ExerciseRenderer, { type ExerciseAnswerResult } from './ExerciseRenderer';

interface MiniTestProps {
  lessonSlug: string;
  exercises: Exercise[];
  maxQuestions?: number;
}

type AnswerMap = Record<string, ExerciseAnswerResult | undefined>;

export default function MiniTest({
  lessonSlug,
  exercises,
  maxQuestions = 10,
}: MiniTestProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [resetSignal, setResetSignal] = useState(0);
  const lastSavedAttemptSignature = useRef<string | null>(null);
  const miniTestExercises = useMemo(
    () => exercises.slice(0, maxQuestions),
    [exercises, maxQuestions],
  );
  const answeredCount = miniTestExercises.filter(
    (exercise) => answers[exercise.id] !== undefined,
  ).length;
  const correctCount = miniTestExercises.filter(
    (exercise) => answers[exercise.id]?.isCorrect === true,
  ).length;
  const isComplete =
    miniTestExercises.length > 0 && answeredCount === miniTestExercises.length;

  useEffect(() => {
    if (!isComplete) return;

    const attemptSignature = JSON.stringify(
      miniTestExercises.map((exercise) => ({
        id: exercise.id,
        answer: answers[exercise.id]?.userAnswer,
        isCorrect: answers[exercise.id]?.isCorrect,
      })),
    );

    if (lastSavedAttemptSignature.current === attemptSignature) return;

    lastSavedAttemptSignature.current = attemptSignature;

    saveMiniTestResult({
      lessonSlug,
      score: correctCount,
      totalQuestions: miniTestExercises.length,
      wrongAnswers: miniTestExercises
        .filter((exercise) => answers[exercise.id]?.isCorrect === false)
        .map((exercise) => ({
          exerciseId: exercise.id,
          question: exercise.question,
          userAnswer: answers[exercise.id]?.userAnswer ?? '',
          correctAnswer: exercise.correctAnswer,
          explanation: exercise.explanation,
        })),
    });
  }, [answers, correctCount, isComplete, lessonSlug, miniTestExercises]);

  const handleAnswered = (exerciseId: string, result: ExerciseAnswerResult | undefined) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [exerciseId]: result,
    }));
  };

  const resetTest = () => {
    setAnswers({});
    lastSavedAttemptSignature.current = null;
    setResetSignal((currentSignal) => currentSignal + 1);
  };

  if (miniTestExercises.length === 0) {
    return (
      <Card className="border-slate-700 bg-slate-900/80">
        <CardHeader>
          <CardTitle className="text-white">Chưa có mini test</CardTitle>
          <CardDescription className="text-slate-400">
            Bài này chưa có câu hỏi mini test trong data.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-violet-400/30 bg-violet-500/10">
        <CardHeader className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Award className="h-5 w-5 text-violet-300" />
                Mini test cuối bài
              </CardTitle>
              <CardDescription className="mt-2 leading-6 text-slate-300">
                Làm từng câu và bấm “Kiểm tra”. Điểm sẽ hiện sau khi bạn trả lời hết.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={resetTest}
              disabled={answeredCount === 0}
              className="border-slate-600 bg-slate-950 text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Làm lại mini test
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div aria-live="polite" className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-sm leading-6 text-slate-300">
              Đã trả lời: <span className="font-bold text-white">{answeredCount}</span>/
              {miniTestExercises.length}
            </p>
            {isComplete ? (
              <p className="mt-2 text-lg font-bold text-emerald-200">
                Kết quả: {correctCount}/{miniTestExercises.length} câu đúng
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                Hoàn thành tất cả câu để xem điểm tổng.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {miniTestExercises.map((exercise, index) => (
          <ExerciseRenderer
            key={`${exercise.id}-${resetSignal}`}
            exercise={exercise}
            questionNumber={index + 1}
            onAnswered={handleAnswered}
            resetSignal={resetSignal}
          />
        ))}
      </div>
    </div>
  );
}
