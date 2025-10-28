'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TensesQuestion } from '@/types/tenses';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

interface TensesExerciseProps {
  questions: TensesQuestion[];
  onComplete: (correct: number, total: number, wrongAnswers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }>) => void;
  onCancel: () => void;
}

export default function TensesExercise({ questions, onComplete, onCancel }: TensesExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }>>([]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setScore(prevScore => isCorrect ? prevScore + 1 : prevScore);
    
    if (!isCorrect) {
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation
      }]);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      onComplete(score, questions.length, wrongAnswers);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-slate-100">Tiến độ</h3>
          <Badge variant="secondary">
            Câu {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-slate-100">
            Câu hỏi {currentIndex + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question */}
          <div className="text-lg font-medium bg-slate-800/50 border border-slate-700 p-4 rounded-lg text-slate-100">
            {currentQuestion.question}
          </div>

          {/* Options */}
          {!showExplanation && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? 'default' : 'outline'}
                  className="w-full text-left justify-start h-auto py-3 px-4 text-slate-100 border-slate-600"
                  onClick={() => handleSelectAnswer(option)}
                >
                  <span className="mr-2 font-semibold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-900/20 border-green-500 text-slate-100'
                : 'bg-red-900/20 border-red-500 text-slate-100'
            }`}>
              <div className="flex items-start gap-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className={`font-semibold ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? '✓ Đúng rồi!' : '✗ Sai rồi!'}
                  </div>
                  <div className="text-sm text-slate-300 mt-1">
                    {currentQuestion.explanation}
                  </div>
                  {selectedAnswer !== currentQuestion.correctAnswer && (
                    <div className="mt-2 text-sm">
                      <span className="font-semibold">Đáp án đúng:</span>{' '}
                      <span className="text-green-400 font-medium">
                        {currentQuestion.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1"
              >
                Xác nhận
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Hủy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Score */}
      <div className="text-center">
        <Badge variant="default" className="px-4 py-2 text-base">
          Điểm: {score} / {questions.length}
        </Badge>
      </div>
    </div>
  );
}

