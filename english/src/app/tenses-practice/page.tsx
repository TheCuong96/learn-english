'use client';

import TensesExercise from '@/components/TensesExercise';
import TensesResults from '@/components/TensesResults';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TenseType, TensesQuestion } from '@/types/tenses';
import { TensesData } from '@/utils/tenses-data';
import { ArrowLeft, CheckCircle2, Home } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Screen = 'home' | 'exercise' | 'results';

export default function TensesPracticePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedTenses, setSelectedTenses] = useState<TenseType[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<TensesQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }>>([]);
  const [startTime, setStartTime] = useState(0);

  const tenses = TensesData.getAllTenses();
  const tensesByGroup = TensesData.getTensesByGroup();

  const handleStartExercise = () => {
    // Lấy danh sách các thì đã chọn, nếu không chọn gì thì lấy tất cả
    const selectedTenseList = selectedTenses.length > 0 ? selectedTenses : tenses.map(t => t.id);
    
    // Lấy câu hỏi theo từng thì đã chọn
    let filteredQuestions: TensesQuestion[] = [];
    selectedTenseList.forEach(tenseType => {
      const questionsForThisTense = TensesData.getQuestionsByTense(tenseType);
      filteredQuestions = filteredQuestions.concat(questionsForThisTense);
    });

    // Lọc theo độ khó
    if (difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }

    // Xáo trộn và lấy số câu cần thiết
    const randomQuestions = TensesData.shuffle(filteredQuestions).slice(0, questionCount);
    
    // Kiểm tra nếu không có đủ câu hỏi
    if (randomQuestions.length === 0) {
      alert('Không tìm thấy câu hỏi nào! Vui lòng chọn lại cài đặt.');
      return;
    }
    
    setQuestions(randomQuestions);
    setCurrentScreen('exercise');
    setStartTime(Date.now());
  };

  const handleComplete = (
    correct: number,
    total: number,
    wrong: Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }>
  ) => {
    setScore(correct);
    setWrongAnswers(wrong);
    setCurrentScreen('results');
  };

  const handleRetry = () => {
    setCurrentScreen('home');
    setScore(0);
    setWrongAnswers([]);
  };

  const handleDownload = () => {
    const content = `BÁO CÁO BÀI TẬP TENSES\n
Ngày: ${new Date().toLocaleDateString('vi-VN')}\n
Kết quả: ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%)\n
Thời gian: ${Math.round((Date.now() - startTime) / 1000)}s\n
Các câu sai:\n
${wrongAnswers.map((a, i) => `${i + 1}. ${a.question}\n   Bạn trả lời: ${a.userAnswer}\n   Đáp án đúng: ${a.correctAnswer}\n   Giải thích: ${a.explanation}\n`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tenses_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {currentScreen !== 'home' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentScreen('home')}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                12 Thì Tiếng Anh - Luyện tập
              </h1>
            </div>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 text-slate-100">
        {currentScreen === 'home' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-400">12</div>
                  <div className="text-sm text-muted-foreground">Thì tiếng Anh</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-400">4</div>
                  <div className="text-sm text-muted-foreground">Thì hiện tại</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-400">4</div>
                  <div className="text-sm text-muted-foreground">Thì quá khứ</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-muted-foreground">Thì tương lai</div>
                </CardContent>
              </Card>
            </div>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt bài tập</CardTitle>
                <CardDescription>
                  Chọn thì, độ khó và số câu hỏi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Count */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Số câu hỏi
                  </label>
                  <Input
                    type="number"
                    min="5"
                    max="50"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Math.max(5, Math.min(50, parseInt(e.target.value) || 10)))}
                    className="w-32"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Độ khó
                  </label>
                  <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard' | 'all')}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="easy">Dễ</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="hard">Khó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tense Selection */}
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="present">Hiện tại</TabsTrigger>
                    <TabsTrigger value="past">Quá khứ</TabsTrigger>
                    <TabsTrigger value="future">Tương lai</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tenses.map((tense) => (
                        <Button
                          key={tense.id}
                          variant={selectedTenses.includes(tense.id) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            if (selectedTenses.includes(tense.id)) {
                              setSelectedTenses(selectedTenses.filter(t => t !== tense.id));
                            } else {
                              setSelectedTenses([...selectedTenses, tense.id]);
                            }
                          }}
                        >
                          {tense.nameVN}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="present" className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.present.map((tense) => (
                        <Button
                          key={tense.id}
                          variant={selectedTenses.includes(tense.id) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            if (selectedTenses.includes(tense.id)) {
                              setSelectedTenses(selectedTenses.filter(t => t !== tense.id));
                            } else {
                              setSelectedTenses([...selectedTenses, tense.id]);
                            }
                          }}
                        >
                          {tense.nameVN}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="past" className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.past.map((tense) => (
                        <Button
                          key={tense.id}
                          variant={selectedTenses.includes(tense.id) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            if (selectedTenses.includes(tense.id)) {
                              setSelectedTenses(selectedTenses.filter(t => t !== tense.id));
                            } else {
                              setSelectedTenses([...selectedTenses, tense.id]);
                            }
                          }}
                        >
                          {tense.nameVN}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="future" className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.future.map((tense) => (
                        <Button
                          key={tense.id}
                          variant={selectedTenses.includes(tense.id) ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            if (selectedTenses.includes(tense.id)) {
                              setSelectedTenses(selectedTenses.filter(t => t !== tense.id));
                            } else {
                              setSelectedTenses([...selectedTenses, tense.id]);
                            }
                          }}
                        >
                          {tense.nameVN}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedTenses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Đã chọn {selectedTenses.length} thì
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTenses([])}
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button
                onClick={handleStartExercise}
                size="lg"
                className="px-12 py-6 text-lg"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Bắt đầu làm bài
              </Button>
            </div>
          </div>
        )}

        {currentScreen === 'exercise' && questions.length > 0 && (
          <TensesExercise
            questions={questions}
            onComplete={handleComplete}
            onCancel={handleRetry}
          />
        )}

        {currentScreen === 'results' && (
          <TensesResults
            correct={score}
            total={questions.length}
            wrongAnswers={wrongAnswers}
            onRetry={handleRetry}
            onHome={handleRetry}
            onDownload={handleDownload}
          />
        )}
      </main>
    </div>
  );
}

