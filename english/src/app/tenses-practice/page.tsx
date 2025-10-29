'use client';

import Navigation from '@/components/Navigation';
import TensesExercise from '@/components/TensesExercise';
import TensesResults from '@/components/TensesResults';
import VoiceSelector from '@/components/VoiceSelector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TenseType, TensesQuestion } from '@/types/tenses';
import { TensesData } from '@/utils/tenses-data';
import { ArrowLeft, CheckCircle2, Home, Menu, X } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tenses = TensesData.getAllTenses();
  const tensesByGroup = TensesData.getTensesByGroup();

  const handleStartExercise = async () => {
    setIsLoading(true);
    
    try {
      // Lấy danh sách các thì đã chọn, nếu không chọn gì thì lấy tất cả
      const selectedTenseList = selectedTenses.length > 0 ? selectedTenses : tenses.map(t => t.id);
      
      // Lấy câu hỏi theo từng thì đã chọn (async)
      let filteredQuestions: TensesQuestion[] = [];
      
      // Load tất cả câu hỏi song song
      const questionPromises = selectedTenseList.map(tenseType => 
        TensesData.getQuestionsByTense(tenseType)
      );
      
      const questionArrays = await Promise.all(questionPromises);
      
      // Kết hợp tất cả câu hỏi
      questionArrays.forEach(questions => {
        filteredQuestions = filteredQuestions.concat(questions);
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
        setIsLoading(false);
        return;
      }
      
      setQuestions(randomQuestions);
      setCurrentScreen('exercise');
      setStartTime(Date.now());
    } catch (error) {
      console.error('Lỗi khi tải câu hỏi:', error);
      alert('Đã xảy ra lỗi khi tải câu hỏi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
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
        <div className="container mx-auto px-0 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2 sm:gap-3 px-3 sm:px-0">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              {currentScreen !== 'home' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentScreen('home')}
                  className="sm:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                <span className="hidden sm:inline">12 Thì Tiếng Anh - Luyện tập</span>
                <span className="sm:hidden">12 Thì</span>
              </h1>
            </div>
            {/* Desktop & Tablet: Show VoiceSelector and Home button */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4">
              <VoiceSelector />
              <Link href="/" className="cursor-pointer">
                <Button variant="ghost" size="icon" className="cursor-pointer p-2 md:p-2.5">
                  <Home className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
              </Link>
            </div>
            {/* Mobile: Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden cursor-pointer p-2 bg-slate-700/50 hover:bg-slate-600 text-slate-200 rounded-lg border border-slate-600/40 transition-all"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden px-3 pb-3 pt-2 border-t border-slate-700/50 mt-2">
              <div className="flex flex-col gap-3">
                <VoiceSelector />
                {currentScreen !== 'home' && (
                  <>
                    <Link href="/" className="cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Về trang chủ
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentScreen('home');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start cursor-pointer"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Về trang luyện tập
                    </Button>
                  </>
                )}
                {currentScreen === 'home' && (
                  <div className="pt-2">
                    <Navigation onLinkClick={() => setIsMobileMenuOpen(false)} vertical={true} />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Desktop & Tablet Navigation */}
          {currentScreen === 'home' && (
            <div className="hidden sm:block px-3 sm:px-0">
              <Navigation />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-0 sm:px-4 md:px-6 py-4 sm:py-6 text-slate-100">
        {currentScreen === 'home' && (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-0">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
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
                    Số câu hỏi (tối đa: 500)
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <Input
                      type="number"
                      min="5"
                      max="500"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Math.max(5, Math.min(500, parseInt(e.target.value) || 10)))}
                      className="w-full sm:w-40"
                      placeholder="Nhập số câu hỏi"
                    />
                    <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestionCount(10)}
                        className="px-2 sm:px-2 text-xs sm:text-sm"
                      >
                        10
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestionCount(50)}
                        className="px-2 sm:px-2 text-xs sm:text-sm"
                      >
                        50
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestionCount(100)}
                        className="px-2 sm:px-2 text-xs sm:text-sm"
                      >
                        100
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestionCount(500)}
                        className="px-2 sm:px-2 text-xs sm:text-sm"
                      >
                        500
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Bạn có thể chọn từ 5 đến 500 câu hỏi. Click vào các nút để chọn nhanh.
                  </p>
                </div>

                {/* Difficulty and Start Button - Same Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-end">
                  <div className="w-full">
                    <label className="text-sm font-medium mb-2 block">
                      Độ khó
                    </label>
                    <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard' | 'all')}>
                      <SelectTrigger className="w-full sm:w-48 bg-slate-800/60 border-slate-600 text-slate-200 hover:bg-slate-700/60 hover:border-slate-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800/95 border-slate-600">
                        <SelectItem value="all" className="text-slate-200 hover:bg-slate-700/60 focus:bg-slate-700/60">Tất cả</SelectItem>
                        <SelectItem value="easy" className="text-slate-200 hover:bg-slate-700/60 focus:bg-slate-700/60">Dễ</SelectItem>
                        <SelectItem value="medium" className="text-slate-200 hover:bg-slate-700/60 focus:bg-slate-700/60">Trung bình</SelectItem>
                        <SelectItem value="hard" className="text-slate-200 hover:bg-slate-700/60 focus:bg-slate-700/60">Khó</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-start md:justify-end w-full">
                    <Button
                      onClick={handleStartExercise}
                      disabled={isLoading}
                      size="lg"
                      className="w-full md:w-auto px-6 sm:px-12 py-4 sm:py-6 text-base sm:text-lg cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span className="text-sm sm:text-base">Đang tải câu hỏi...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-sm sm:text-base">Bắt đầu làm bài</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Clear All Button - Above Tense Selection */}
                {selectedTenses.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      Đã chọn {selectedTenses.length} thì
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTenses([])}
                      className="text-xs sm:text-sm px-2 sm:px-3 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:bg-red-500/20 hover:border-red-400/70 hover:text-red-200"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                )}

                {/* Tense Selection */}
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-4 w-full h-auto">
                    <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">Tất cả</TabsTrigger>
                    <TabsTrigger value="present" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">Hiện tại</TabsTrigger>
                    <TabsTrigger value="past" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">Quá khứ</TabsTrigger>
                    <TabsTrigger value="future" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">Tương lai</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-2 max-h-64 overflow-y-auto p-2 sm:p-4 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {tenses.map((tense) => (
                        <Button
                          key={tense.id}
                          variant="outline"
                          size="sm"
                          className={`text-xs sm:text-sm cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedTenses.includes(tense.id)
                              ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400 ring-2 ring-blue-400/60 text-blue-100 font-semibold shadow-lg shadow-blue-500/25'
                              : 'border-slate-600 text-slate-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-md hover:shadow-blue-500/20'
                          }`}
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
                  <TabsContent value="present" className="space-y-2 max-h-64 overflow-y-auto p-2 sm:p-4 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.present.map((tense) => (
                        <Button
                          key={tense.id}
                          variant="outline"
                          size="sm"
                          className={`text-xs sm:text-sm cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedTenses.includes(tense.id)
                              ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400 ring-2 ring-blue-400/60 text-blue-100 font-semibold shadow-lg shadow-blue-500/25'
                              : 'border-slate-600 text-slate-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-md hover:shadow-blue-500/20'
                          }`}
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
                  <TabsContent value="past" className="space-y-2 max-h-64 overflow-y-auto p-2 sm:p-4 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.past.map((tense) => (
                        <Button
                          key={tense.id}
                          variant="outline"
                          size="sm"
                          className={`text-xs sm:text-sm cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedTenses.includes(tense.id)
                              ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400 ring-2 ring-blue-400/60 text-blue-100 font-semibold shadow-lg shadow-blue-500/25'
                              : 'border-slate-600 text-slate-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-md hover:shadow-blue-500/20'
                          }`}
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
                  <TabsContent value="future" className="space-y-2 max-h-64 overflow-y-auto p-2 sm:p-4 md:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {tensesByGroup.future.map((tense) => (
                        <Button
                          key={tense.id}
                          variant="outline"
                          size="sm"
                          className={`text-xs sm:text-sm cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            selectedTenses.includes(tense.id)
                              ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-blue-400 ring-2 ring-blue-400/60 text-blue-100 font-semibold shadow-lg shadow-blue-500/25'
                              : 'border-slate-600 text-slate-300 hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-md hover:shadow-blue-500/20'
                          }`}
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
              </CardContent>
            </Card>
          </div>
        )}

        {currentScreen === 'exercise' && questions.length > 0 && (
          <>
            {selectedTenses.length > 0 && (
              <div className="max-w-4xl mx-auto mb-4">
                <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/30">
                  <p className="text-slate-300 text-sm mb-2">🎯 Đang luyện các thì:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTenses.map((id) => {
                      const t = tenses.find(t => t.id === id);
                      if (!t) return null;
                      return (
                        <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/30 border border-purple-500/30 rounded-full text-xs text-purple-300">
                          {t.nameVN}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <TensesExercise
              questions={questions}
              onComplete={handleComplete}
              onCancel={handleRetry}
            />
          </>
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

