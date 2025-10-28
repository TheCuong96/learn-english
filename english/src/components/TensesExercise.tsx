'use client';

import SpeakButton from '@/components/SpeakButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TensesQuestion } from '@/types/tenses';
import { playCorrectSound, playIncorrectSound } from '@/utils/sound';
import { VerbsData } from '@/utils/verbs-data';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [verbs, setVerbs] = useState<any[]>([]);

  const AUTO_NEXT_DELAY = 1500; // ms

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    // Load verbs data for Vietnamese meaning hints
    VerbsData.load().then(setVerbs).catch(() => setVerbs([]));
  }, []);

  useEffect(() => {
    // Auto-next when correct with progress indicator
    if (showExplanation && selectedAnswer === currentQuestion.correctAnswer) {
      playCorrectSound();
      setAutoNextProgress(0);
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / AUTO_NEXT_DELAY) * 100, 100);
        setAutoNextProgress(newProgress);
      }, 50);
      const timer = setTimeout(() => {
        handleNext();
      }, AUTO_NEXT_DELAY);
      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
        setAutoNextProgress(0);
      };
    } else if (showExplanation && selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      playIncorrectSound();
      setAutoNextProgress(0);
    } else {
      setAutoNextProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExplanation]);

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

  const buildCompletedSentence = (q: string, answer: string) => {
    let s = q;
    s = s.replace(/___\s*\([^)]*\)/, answer);
    s = s.replace(/\s+\./g, '.');
    return s;
  };

  const extractBaseVerb = (q: string) => {
    const m = q.match(/\(([^)]+)\)/);
    return m ? m[1].toLowerCase() : '';
  };

  const SUBJECT_VN: Record<string, string> = {
    'I': 'Tôi', 'You': 'Bạn', 'We': 'Chúng tôi', 'They': 'Họ', 'He': 'Anh ấy', 'She': 'Cô ấy', 'It': 'Nó'
  };

  const TIME_VN_MAP: Record<string, string> = {
    'every day': 'mỗi ngày', 'every week': 'mỗi tuần', 'on mondays': 'vào thứ Hai', 'often': 'thường', 'usually': 'thường', 'sometimes': 'đôi khi', 'always': 'luôn luôn', 'never': 'không bao giờ',
    'now': 'bây giờ', 'at the moment': 'vào lúc này', 'right now': 'ngay lúc này', 'currently': 'hiện tại', 'these days': 'dạo này',
    'already': 'đã', 'just': 'vừa mới', 'yet': 'chưa', 'ever': 'từng', 'never ': 'chưa từng', 'so far': 'cho đến nay', 'recently': 'gần đây',
    'yesterday': 'hôm qua', 'last night': 'tối qua', 'last week': 'tuần trước', 'in 2010': 'năm 2010', 'two days ago': 'hai ngày trước',
    'at 8 pm last night': 'lúc 8 giờ tối qua', 'when you called': 'khi bạn gọi', 'while he was away': 'trong khi anh ấy vắng',
    'before he arrived': 'trước khi anh ấy tới', 'by the time she came': 'khi cô ấy đến', 'when the movie started': 'khi bộ phim bắt đầu',
    'for two hours before he came': 'trong hai giờ trước khi anh ấy đến', 'since morning before the exam': 'từ sáng trước kỳ thi',
    'tomorrow': 'ngày mai', 'next week': 'tuần tới', 'soon': 'sớm', 'later': 'sau này',
    'at this time tomorrow': 'vào giờ này ngày mai', 'all day tomorrow': 'suốt ngày mai',
    'by next week': 'vào tuần tới', 'by tomorrow': 'vào ngày mai', 'by 5 pm': 'trước 5 giờ chiều',
    'by next month': 'vào tháng tới', 'by the end of the year': 'vào cuối năm'
  };

  const findTimeVn = (text: string) => {
    const lower = text.toLowerCase();
    let found = '';
    Object.keys(TIME_VN_MAP).forEach(k => {
      if (!found && lower.includes(k)) found = TIME_VN_MAP[k];
    });
    return found;
  };

  const findSubjectVn = (text: string) => {
    // Try leading subject pattern
    const m1 = text.match(/^([A-Za-z]+)\s/);
    if (m1 && SUBJECT_VN[m1[1]]) return SUBJECT_VN[m1[1]];
    // Try after auxiliary in questions: Do/Does/Is/Are/Did/Was/Were/Will/Had/Have/Has + subject
    const m2 = text.match(/^(?:Do|Does|Is|Are|Did|Was|Were|Will|Had|Have|Has)\s+([A-Za-z]+)/i);
    if (m2) {
      const sub = m2[1].charAt(0).toUpperCase() + m2[1].slice(1).toLowerCase();
      if (SUBJECT_VN[sub]) return SUBJECT_VN[sub];
    }
    return '';
  };

  const getVerbVn = (base: string) => {
    if (!base) return '';
    const v = verbs.find((x) => (x.v1 || x.word || '').toLowerCase() === base);
    if (!v) return '';
    return (v.definition || '').toString();
  };

  const buildVietnameseMeaning = (fullEn: string, q: TensesQuestion) => {
    const subjectVn = findSubjectVn(fullEn);
    const baseVerb = extractBaseVerb(q.question);
    const verbVn = getVerbVn(baseVerb) || baseVerb; // fallback to base if missing
    const timeVn = findTimeVn(fullEn);
    const isNegative = /\bnot\b|n't/.test(q.correctAnswer);

    const parts: string[] = [];
    if (subjectVn) parts.push(subjectVn);

    const tense = q.tenseType;
    const verbPhrase = () => {
      if (!verbVn) return '';
      switch (tense) {
        case 'present-simple':
          return isNegative ? `không ${verbVn}` : verbVn;
        case 'present-continuous':
          return (isNegative ? 'không ' : '') + `đang ${verbVn}`;
        case 'present-perfect':
          return (isNegative ? 'chưa ' : 'đã ') + verbVn;
        case 'present-perfect-continuous':
          return (isNegative ? 'chưa ' : 'đã ') + `đang ${verbVn}`;
        case 'past-simple':
          return (isNegative ? 'đã không ' : 'đã ') + verbVn;
        case 'past-continuous':
          return (isNegative ? 'đã không ' : 'đang ') + verbVn;
        case 'past-perfect':
          return (isNegative ? 'đã không ' : 'đã ') + verbVn;
        case 'past-perfect-continuous':
          return (isNegative ? 'đã không ' : 'đã ') + `đang ${verbVn}`;
        case 'future-simple':
          return (isNegative ? 'sẽ không ' : 'sẽ ') + verbVn;
        case 'future-continuous':
          return (isNegative ? 'sẽ không ' : 'sẽ ') + `đang ${verbVn}`;
        case 'future-perfect':
          return (isNegative ? 'sẽ chưa ' : 'sẽ đã ') + verbVn;
        case 'future-perfect-continuous':
          return (isNegative ? 'sẽ chưa ' : 'sẽ đã ') + `đang ${verbVn}`;
      }
    };

    const vp = verbPhrase();
    if (vp) parts.push(vp);
    if (timeVn) parts.push(timeVn);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  };

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
          <div className="text-lg font-medium bg-slate-800/50 border border-slate-700 p-4 rounded-lg text-slate-100 flex items-start justify-between gap-3">
            <span className="flex-1">{currentQuestion.question}</span>
            {!showExplanation && (
              <SpeakButton text={currentQuestion.question.replace('___', '...')} className="shrink-0" />
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
                  {/* Completed sentence and Vietnamese meaning */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm">
                        <span className="font-semibold">Câu hoàn chỉnh:</span>{' '}
                        <span>{buildCompletedSentence(currentQuestion.question, currentQuestion.correctAnswer)}</span>
                      </div>
                      <SpeakButton text={buildCompletedSentence(currentQuestion.question, currentQuestion.correctAnswer)} />
                    </div>
                    <div className="text-sm text-slate-300">
                      <span className="font-semibold">Nghĩa (VN):</span>{' '}
                      <span>{buildVietnameseMeaning(buildCompletedSentence(currentQuestion.question, currentQuestion.correctAnswer), currentQuestion)}</span>
                    </div>
                  </div>
                  {selectedAnswer === currentQuestion.correctAnswer && autoNextProgress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-green-400">Tự động chuyển câu tiếp theo...</span>
                        <span className="text-xs text-green-400">
                          {((AUTO_NEXT_DELAY - (autoNextProgress / 100 * AUTO_NEXT_DELAY)) / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <div className="w-full bg-green-900/30 rounded-full h-2 overflow-hidden">
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
                className="flex-1 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
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

