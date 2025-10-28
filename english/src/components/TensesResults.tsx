'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Home, RefreshCw, Trophy } from 'lucide-react';

interface TensesResultsProps {
  correct: number;
  total: number;
  wrongAnswers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }>;
  onRetry: () => void;
  onHome: () => void;
  onDownload?: () => void;
}

export default function TensesResults({ correct, total, wrongAnswers, onRetry, onHome, onDownload }: TensesResultsProps) {
  const percentage = Math.round((correct / total) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const isPass = percentage >= 50;

  const getResultMessage = () => {
    if (isExcellent) return { message: 'Xuất sắc!', icon: Trophy, color: 'text-yellow-500' };
    if (isGood) return { message: 'Tốt lắm!', icon: Trophy, color: 'text-blue-500' };
    if (isPass) return { message: 'Khá đấy!', icon: Trophy, color: 'text-green-500' };
    return { message: 'Cần cố gắng hơn!', icon: Trophy, color: 'text-gray-500' };
  };

  const resultInfo = getResultMessage();
  const ResultIcon = resultInfo.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary */}
      <Card className="text-center">
        <CardHeader>
          <ResultIcon className={`h-16 w-16 mx-auto ${resultInfo.color}`} />
          <CardTitle className="text-3xl">{resultInfo.message}</CardTitle>
          <CardDescription>
            Bạn đã hoàn thành bài tập
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{correct}</div>
              <div className="text-sm text-muted-foreground">Đúng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{total - correct}</div>
              <div className="text-sm text-muted-foreground">Sai</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Tỷ lệ</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wrong Answers */}
      {wrongAnswers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Các câu trả lời sai</CardTitle>
            <CardDescription>
              Ôn lại những câu bạn đã làm sai
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {wrongAnswers.map((answer, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-900/20"
              >
                <div className="font-semibold text-lg mb-2">
                  {answer.question}
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-semibold">Bạn trả lời:</span>{' '}
                    <span className="text-red-600 dark:text-red-400">{answer.userAnswer}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Đáp án đúng:</span>{' '}
                    <span className="text-green-600 dark:text-green-400">{answer.correctAnswer}</span>
                  </div>
                  <div className="text-muted-foreground mt-2">
                    {answer.explanation}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onRetry} size="lg" variant="default">
          <RefreshCw className="mr-2 h-5 w-5" />
          Làm lại
        </Button>
        {onDownload && (
          <Button onClick={onDownload} size="lg" variant="outline">
            <Download className="mr-2 h-5 w-5" />
            Tải báo cáo
          </Button>
        )}
        <Button onClick={onHome} size="lg" variant="outline">
          <Home className="mr-2 h-5 w-5" />
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}

