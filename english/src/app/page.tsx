'use client';

import CategorySelector from '@/components/CategorySelector';
import Navigation from '@/components/Navigation';
import ResultsScreen from '@/components/ResultsScreen';
import SessionScreen from '@/components/SessionScreen';
import VoiceSelector from '@/components/VoiceSelector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ReviewWord, SessionType, Verb } from '@/types/verb';
import { categorizeVerb } from '@/utils/verb-categories';
import { VerbsData } from '@/utils/verbs-data';
import { BookOpen, CheckCircle2, Home, PenTool, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [vocabulary, setVocabulary] = useState<Verb[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'session' | 'results'>('home');
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [currentSessionWords, setCurrentSessionWords] = useState<Verb[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [reviewWords, setReviewWords] = useState<ReviewWord[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [sessionLength, setSessionLength] = useState(20);
  const [customLength, setCustomLength] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const sessionOptions: SessionType[] = ['flashcards', 'multiple-choice', 'fill-in-blank', 'verb-forms'];
  const quickLengthOptions = [10, 20, 30, 50];

  const sessionConfig = {
    'flashcards': {
      title: 'Học với thẻ ghi nhớ',
      icon: BookOpen,
      description: 'Lật thẻ để học từ mới, V1-V2-V3 và ví dụ',
      color: 'blue'
    },
    'multiple-choice': {
      title: 'Bài tập trắc nghiệm',
      icon: CheckCircle2,
      description: 'Chọn đúng nghĩa của từ',
      color: 'green'
    },
    'fill-in-blank': {
      title: 'Điền vào chỗ trống',
      icon: PenTool,
      description: 'Hoàn thành câu với từ vựng đúng',
      color: 'purple'
    },
    'verb-forms': {
      title: 'Chia động từ',
      icon: RefreshCw,
      description: 'Điền dạng V2 và V3 của động từ',
      color: 'orange'
    }
  };

  useEffect(() => {
    loadData();
    
    if (typeof window !== 'undefined') {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  useEffect(() => {
    if (currentScreen !== 'home') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCardIndex((prev) => (prev + 1) % 4);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCardIndex((prev) => (prev - 1 + 4) % 4);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startSession(sessionOptions[selectedCardIndex]);
      } else {
        switch (e.key) {
          case '1':
            setSelectedCardIndex(0);
            startSession('flashcards');
            break;
          case '2':
            setSelectedCardIndex(1);
            startSession('multiple-choice');
            break;
          case '3':
            setSelectedCardIndex(2);
            startSession('fill-in-blank');
            break;
          case '4':
            setSelectedCardIndex(3);
            startSession('verb-forms');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentScreen, vocabulary, selectedCardIndex]);

  const loadData = async () => {
    try {
      const data = await VerbsData.load();
      if (!data || data.length === 0) {
        throw new Error('File verbs-data.json rỗng hoặc không hợp lệ');
      }
      setVocabulary(data);
      console.log(`✅ Đã tải ${data.length} động từ`);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const startSession = (type: SessionType) => {
    if (!vocabulary || vocabulary.length === 0) {
      alert('Dữ liệu chưa được tải. Vui lòng đợi...');
      return;
    }

    setSessionType(type);
    setCurrentWordIndex(0);
    setScore(0);
    setReviewWords([]);
    setShowFeedback(false);
    setIsCorrect(null);
    
    let validVocab = vocabulary.filter(v => v.definition && v.definition.trim() !== '');
    
    if (selectedCategories.length > 0) {
      validVocab = validVocab.filter(verb => {
        const verbCategories = categorizeVerb(verb);
        return selectedCategories.some(catId => verbCategories.includes(catId));
      });
      
      if (validVocab.length === 0) {
        alert('Không có động từ nào thuộc chủ đề đã chọn. Vui lòng chọn chủ đề khác.');
        return;
      }
      
      if (validVocab.length < sessionLength) {
        alert(`Chỉ có ${validVocab.length} động từ trong chủ đề này. Sẽ dùng tất cả.`);
      }
    }
    
    const words = VerbsData.random(validVocab, Math.min(sessionLength, validVocab.length));
    setCurrentSessionWords(words);
    setCurrentScreen('session');
  };

  const handleAnswer = (correct: boolean, userAnswer?: string) => {
    const currentWord = currentSessionWords[currentWordIndex];
    
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setCorrectAnswer('');
    } else {
      const reviewWord: ReviewWord = { ...currentWord, userAnswer };
      setReviewWords([...reviewWords, reviewWord]);
      
      if (sessionType === 'verb-forms') {
        setCorrectAnswer(`Đáp án đúng là V2: <b>${currentWord.v2}</b>, V3: <b>${currentWord.v3}</b>.`);
      } else {
        setCorrectAnswer(`Đáp án đúng là "${currentWord.word}".`);
      }
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setCorrectAnswer('');
    
    if (currentWordIndex + 1 >= currentSessionWords.length) {
      setCurrentScreen('results');
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentScreen('home');
    setSessionType(null);
    setShowFeedback(false);
    setIsCorrect(null);
  };

  const downloadReport = () => {
    let reportContent = `BÁO CÁO HỌC TẬP - Luyện tập động từ\n`;
    reportContent += `Ngày: ${new Date().toLocaleDateString('vi-VN')}\n`;
    reportContent += `Loại bài: ${sessionType}\n`;
    reportContent += `Điểm số: ${score} / ${sessionLength}\n`;
    reportContent += `====================================\n\n`;

    currentSessionWords.forEach((word, index) => {
      reportContent += `TỪ VỰNG ${index + 1}:\n`;
      reportContent += `--------------------\n`;
      reportContent += `Từ: ${word.word}\n`;
      reportContent += `Dạng động từ: ${word.v1} - ${word.v2} - ${word.v3}\n`;
      reportContent += `Định nghĩa (VN): ${word.definition}\n`;
      reportContent += `Định nghĩa (EN): ${word.english_definition}\n`;
      reportContent += `Ví dụ: ${word.example}\n\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Verbs_Report_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = vocabulary.length > 0 ? VerbsData.stats(vocabulary) : null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        <p className="mt-4 text-lg font-semibold">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Luyện tập động từ (804 verbs)
            </h1>
            <div className="flex items-center gap-3">
              <VoiceSelector />
              {currentScreen !== 'home' && (
                <Button variant="ghost" size="icon" onClick={handleReset}>
                  <Home className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          {currentScreen === 'home' && <Navigation />}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Home Screen */}
        {currentScreen === 'home' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                💡 Mẹo: Dùng phím <kbd className="px-2 py-1 bg-muted rounded border">←→↑↓</kbd> để di chuyển, 
                <kbd className="px-2 py-1 bg-muted rounded border ml-1">Enter</kbd> để chọn, 
                hoặc <kbd className="px-2 py-1 bg-muted rounded border ml-1">1-4</kbd> để chọn nhanh!
              </p>
              {stats && (
                <div className="flex justify-center gap-4 flex-wrap">
                  <Badge variant="secondary">📊 Tổng: {stats.total}</Badge>
                  <Badge variant="destructive">🔴 Bất quy tắc: {stats.irregular}</Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                    🟢 Quy tắc: {stats.regular}
                  </Badge>
                </div>
              )}
            </div>

            {/* Cài đặt bài tập */}
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Cài đặt bài tập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Số câu hỏi */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-semibold">📝 Số câu hỏi:</p>
                    <div className="flex gap-2 flex-wrap">
                      {quickLengthOptions.map((length) => (
                        <Button
                          key={length}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSessionLength(length);
                            setShowCustomInput(false);
                          }}
                          className={`transition-all ${
                            sessionLength === length && !showCustomInput
                              ? 'bg-blue-600/30 border-blue-400 ring-2 ring-blue-400/60 text-blue-300 font-semibold shadow-lg'
                              : 'hover:border-blue-400/50'
                          }`}
                        >
                          {length} câu
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCustomInput(!showCustomInput)}
                        className={`transition-all ${
                          showCustomInput
                            ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-400/60 text-purple-300 font-semibold shadow-lg'
                            : 'hover:border-purple-400/50'
                        }`}
                      >
                        ✏️ Tùy chỉnh
                      </Button>
                    </div>
                  </div>
                  
                  {showCustomInput && (
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        min="1"
                        max="804"
                        value={customLength}
                        onChange={(e) => setCustomLength(e.target.value)}
                        placeholder="Nhập số câu (1-804)"
                        className="w-48"
                      />
                      <Button
                        onClick={() => {
                          const num = parseInt(customLength);
                          if (num >= 1 && num <= 804) {
                            setSessionLength(num);
                          } else {
                            alert('Vui lòng nhập số từ 1 đến 804');
                          }
                        }}
                      >
                        OK
                      </Button>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    ✨ Bạn sẽ làm <span className="font-bold text-primary">{sessionLength}</span> câu hỏi
                  </p>
                </div>
                
                {/* Chọn chủ đề */}
                <CategorySelector
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                />
              </CardContent>
            </Card>
            
            {/* Chọn chế độ luyện tập */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionOptions.map((type, index) => {
                const config = sessionConfig[type];
                const Icon = config.icon;
                const isSelected = selectedCardIndex === index;
                
                // Màu sắc riêng cho từng loại
                const colorClasses = {
                  blue: {
                    selected: 'bg-blue-600/30 ring-4 ring-blue-400 border-blue-400 shadow-xl shadow-blue-500/40',
                    icon: 'text-blue-400',
                    hover: 'hover:border-blue-400/50'
                  },
                  green: {
                    selected: 'bg-green-600/30 ring-4 ring-green-400 border-green-400 shadow-xl shadow-green-500/40',
                    icon: 'text-green-400',
                    hover: 'hover:border-green-400/50'
                  },
                  purple: {
                    selected: 'bg-purple-600/30 ring-4 ring-purple-400 border-purple-400 shadow-xl shadow-purple-500/40',
                    icon: 'text-purple-400',
                    hover: 'hover:border-purple-400/50'
                  },
                  orange: {
                    selected: 'bg-orange-600/30 ring-4 ring-orange-400 border-orange-400 shadow-xl shadow-orange-500/40',
                    icon: 'text-orange-400',
                    hover: 'hover:border-orange-400/50'
                  }
                };
                
                const colors = colorClasses[config.color as keyof typeof colorClasses];
                
                return (
                  <Card
                    key={type}
                    className={`cursor-pointer transition-all hover:scale-105 ${colors.hover} ${
                      isSelected ? colors.selected : ''
                    }`}
                    onClick={() => startSession(type)}
                    onMouseEnter={() => setSelectedCardIndex(index)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`h-6 w-6 ${colors.icon}`} />
                          <div>
                            <CardTitle className="text-xl">{config.title}</CardTitle>
                            <CardDescription>{config.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">Phím {index + 1}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Session Screen */}
        {currentScreen === 'session' && sessionType && currentSessionWords.length > 0 && (
          <SessionScreen
            sessionType={sessionType}
            currentWord={currentSessionWords[currentWordIndex]}
            currentIndex={currentWordIndex}
            totalWords={sessionLength}
            allWords={vocabulary}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            selectedCategories={selectedCategories}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onHome={handleReset}
          />
        )}

        {/* Results Screen */}
        {currentScreen === 'results' && (
          <ResultsScreen
            score={score}
            totalWords={sessionLength}
            reviewWords={reviewWords}
            onRetry={handleReset}
            onDownloadReport={downloadReport}
            onHome={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-muted-foreground">
          <p>&copy; 2025 Luyện tập động từ. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
