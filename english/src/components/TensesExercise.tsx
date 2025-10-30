'use client';

import SpeakButton from '@/components/SpeakButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TensesQuestion } from '@/types/tenses';
import { playCorrectSound, playIncorrectSound } from '@/utils/sound';
import { speak } from '@/utils/speech';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const [autoNextProgress, setAutoNextProgress] = useState(0);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_NEXT_DELAY = 1500; // ms

  const currentQuestion = questions[currentIndex];

  // Function to clear auto-next timers
  const clearAutoNext = () => {
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    if (autoNextIntervalRef.current) {
      clearInterval(autoNextIntervalRef.current);
      autoNextIntervalRef.current = null;
    }
    setAutoNextProgress(0);
  };

  useEffect(() => {
    // Clear any existing auto-next timers
    clearAutoNext();

    // Auto-next when correct with progress indicator
    if (showExplanation && selectedAnswer === currentQuestion.correctAnswer) {
      playCorrectSound();
      setAutoNextProgress(0);
      const startTime = Date.now();
      autoNextIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / AUTO_NEXT_DELAY) * 100, 100);
        setAutoNextProgress(newProgress);
      }, 50);
      autoNextTimerRef.current = setTimeout(() => {
        handleNext();
      }, AUTO_NEXT_DELAY);
    } else if (showExplanation && selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      playIncorrectSound();
      setAutoNextProgress(0);
    }

    // Cleanup function
    return () => {
      clearAutoNext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExplanation]);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    // Play pronunciation of the selected answer only
    speak(answer);
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

  // Keyboard shortcuts for selecting answers
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!showExplanation && currentQuestion.options) {
        // Chọn đáp án bằng phím số 1-4
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 4 && numKey <= currentQuestion.options.length) {
          e.preventDefault();
          const selectedOption = currentQuestion.options[numKey - 1];
          handleSelectAnswer(selectedOption);
        }
      }

      // Enter để submit hoặc next
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!showExplanation && selectedAnswer) {
          handleSubmit();
        } else if (showExplanation) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExplanation, selectedAnswer, currentQuestion.options]);

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
        {!showExplanation && (
          <p className="text-xs text-slate-400 text-center">
            💡 Mẹo: Nhấn phím <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">1-4</kbd> để chọn đáp án, <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">Enter</kbd> để xác nhận
          </p>
        )}
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
          <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg text-slate-100 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <span className="flex-1 text-lg font-medium">{currentQuestion.question}</span>
              {!showExplanation && (
                <SpeakButton text={currentQuestion.question.replace('___', '...')} className="shrink-0" />
              )}
            </div>
            {/* Vietnamese meaning hint */}
            {!showExplanation && currentQuestion.vietnameseMeaning && (
              <div className="text-sm text-slate-400 italic pt-2 border-t border-slate-700">
                💡 {currentQuestion.vietnameseMeaning}
              </div>
            )}
          </div>

          {/* Options */}
          {!showExplanation && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full text-left justify-start h-auto py-3 px-4 cursor-pointer transition-all duration-200 transform ${
                    selectedAnswer === option
                      ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400 ring-2 ring-blue-400/60 text-blue-100 font-semibold shadow-lg shadow-blue-500/25 scale-[1.02]'
                      : 'text-slate-100 border-slate-600 hover:scale-[1.02] hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-md hover:shadow-blue-500/20'
                  }`}
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
            <div onClick={clearAutoNext}
                  onTouchStart={clearAutoNext} 
            className={`p-4 rounded-lg border-2 ${
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
                  {/* Completed sentence and Vietnamese meaning */}
                  {currentQuestion.completedSentence && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm">
                          <span className="font-semibold">Câu hoàn chỉnh:</span>{' '}
                          <span>{currentQuestion.completedSentence}</span>
                        </div>
                        <SpeakButton text={currentQuestion.completedSentence} />
                      </div>
                      {currentQuestion.vietnameseMeaning && (
                        <div className="text-sm text-slate-300">
                          <span className="font-semibold">Nghĩa (VN):</span>{' '}
                          <span>{currentQuestion.vietnameseMeaning}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedAnswer === currentQuestion.correctAnswer && autoNextProgress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-green-400">Tự động chuyển câu tiếp theo...</span>
                        <span className="text-xs text-green-400">
                          {((AUTO_NEXT_DELAY - (autoNextProgress / 100 * AUTO_NEXT_DELAY)) / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <div 
                        className="w-full bg-green-900/30 rounded-full h-2 overflow-hidden cursor-pointer"
                      >
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-75 ease-linear"
                          style={{ width: `${autoNextProgress}%` }}
                        />
                      </div>
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
                className="flex-1 bg-amber-800 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Xác nhận
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onCancel}
              className="cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:bg-red-500/20 hover:border-red-400/70"
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

