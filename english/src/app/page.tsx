'use client';

import CategorySelector from '@/components/CategorySelector';
import Navigation from '@/components/Navigation';
import ResultsScreen from '@/components/ResultsScreen';
import SessionScreen from '@/components/SessionScreen';
import VoiceSelector from '@/components/VoiceSelector';
import { ReviewWord, SessionType, Verb } from '@/types/verb';
import { categorizeVerb } from '@/utils/verb-categories';
import { VerbsData } from '@/utils/verbs-data';
import { useEffect, useState } from 'react';

export default function Home() {
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // Cho arrow key navigation
  const [sessionLength, setSessionLength] = useState(20); // Mặc định 20 câu
  const [customLength, setCustomLength] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Chọn chủ đề

  const sessionOptions: SessionType[] = ['flashcards', 'multiple-choice', 'fill-in-blank', 'verb-forms'];
  const quickLengthOptions = [10, 20, 30, 50];

  useEffect(() => {
    loadData();
    
    // Load voices cho Speech API
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

  // Keyboard shortcuts cho trang chủ
  useEffect(() => {
    if (currentScreen !== 'home') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Arrow keys navigation
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
        // Number keys 1-4
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    // Lọc ra những từ có definition không rỗng
    let validVocab = vocabulary.filter(v => v.definition && v.definition.trim() !== '');
    
    // Lọc theo categories nếu có chọn
    if (selectedCategories.length > 0) {
      validVocab = validVocab.filter(verb => {
        const verbCategories = categorizeVerb(verb);
        return selectedCategories.some(catId => verbCategories.includes(catId));
      });
      
      if (validVocab.length === 0) {
        alert('Không có động từ nào thuộc chủ đề đã chọn. Vui lòng chọn chủ đề khác.');
        return;
      }
      
      // Nếu số câu yêu cầu lớn hơn số từ có sẵn, điều chỉnh
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
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
        <p className="mt-4 text-lg font-semibold text-slate-200">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-slate-800/50  shadow-2xl border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Luyện tập động từ (804 verbs)
            </h1>
            <div className="flex items-center gap-3">
              <VoiceSelector />
              {currentScreen !== 'home' && (
                <button 
                  onClick={handleReset}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {/* Navigation */}
          {currentScreen === 'home' && <Navigation />}
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Home Screen */}
        {currentScreen === 'home' && (
          <div>
            <div className="text-center mb-8">
              <p className="text-purple-300 text-sm mt-2">
                💡 Mẹo: Dùng phím <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600">←→↑↓</kbd> để di chuyển, 
                <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 ml-1">Enter</kbd> để chọn, 
                hoặc <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 ml-1">1-4</kbd> để chọn nhanh!
              </p>
              {stats && (
                <div className="mt-4 flex justify-center gap-4 text-sm flex-wrap">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                    📊 Tổng: {stats.total}
                  </span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded border border-red-500/30">
                    🔴 Bất quy tắc: {stats.irregular}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded border border-green-500/30">
                    🟢 Quy tắc: {stats.regular}
                  </span>
                </div>
              )}

              {/* Cài đặt bài tập - Gộp chung 1 khung */}
              <div className="mt-6 max-w-7xl mx-auto">
                <div className="bg-slate-800/60  p-6 rounded-xl border border-slate-700/50">
                  <h3 className="text-xl font-bold text-slate-100 mb-4">⚙️ Cài đặt bài tập</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                     {/* Số câu hỏi */}
                     <div className='flex flex-rows justify-center items-center gap-2'>
                      <p className="text-slate-200 font-semibold">📝 Số câu hỏi:</p>
                      <div className="flex gap-2 justify-start flex-wrap">
                        {quickLengthOptions.map((length) => (
                          <button
                            key={length}
                            onClick={() => {
                              setSessionLength(length);
                              setShowCustomInput(false);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              sessionLength === length && !showCustomInput
                                ? 'bg-purple-600 text-white ring-2 ring-purple-400/50'
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {length} câu
                          </button>
                        ))}
                        <button
                          onClick={() => setShowCustomInput(!showCustomInput)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            showCustomInput
                              ? 'bg-purple-600 text-white ring-2 ring-purple-400/50'
                              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          ✏️ Tùy chỉnh
                        </button>
                      </div>
                      
                      {showCustomInput && (
                        <div className="mt-3 flex gap-2 items-center">
                          <input
                            type="number"
                            min="1"
                            max="804"
                            value={customLength}
                            onChange={(e) => setCustomLength(e.target.value)}
                            placeholder="Nhập số câu (1-804)"
                            className="px-4 py-2 bg-slate-700/50 text-slate-200 border border-slate-600 rounded-lg w-48 text-center"
                          />
                          <button
                            onClick={() => {
                              const num = parseInt(customLength);
                              if (num >= 1 && num <= 804) {
                                setSessionLength(num);
                              } else {
                                alert('Vui lòng nhập số từ 1 đến 804');
                              }
                            }}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
                          >
                            OK
                          </button>
                        </div>
                      )}
                      
                      <p className="text-purple-300 text-sm mt-3">
                        ✨ Bạn sẽ làm <span className="font-bold text-purple-400">{sessionLength}</span> câu hỏi
                      </p>
                    
                     {/* Chọn chủ đề */}
                     </div>
                      <CategorySelector
                        selectedCategories={selectedCategories}
                        onCategoriesChange={setSelectedCategories}
                      />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => startSession('flashcards')}
                onMouseEnter={() => setSelectedCardIndex(0)}
                className={`mode-card bg-slate-800/60  p-6 rounded-xl shadow-2xl border hover:bg-slate-800/80 relative transition-all ${
                  selectedCardIndex === 0 
                    ? 'border-blue-500 ring-2 ring-blue-500/50 bg-slate-800/80' 
                    : 'border-slate-700/50 hover:border-blue-500/50'
                }`}
              >
                <div className="absolute top-3 right-3 bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-bold border border-blue-500/30">
                  Phím 1
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">📚 Học với thẻ ghi nhớ</h3>
                <p className="text-slate-300">Lật thẻ để học từ mới, V1-V2-V3 và ví dụ.</p>
              </div>
              
              <div 
                onClick={() => startSession('multiple-choice')}
                onMouseEnter={() => setSelectedCardIndex(1)}
                className={`mode-card bg-slate-800/60  p-6 rounded-xl shadow-2xl border hover:bg-slate-800/80 relative transition-all ${
                  selectedCardIndex === 1 
                    ? 'border-green-500 ring-2 ring-green-500/50 bg-slate-800/80' 
                    : 'border-slate-700/50 hover:border-green-500/50'
                }`}
              >
                <div className="absolute top-3 right-3 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-bold border border-green-500/30">
                  Phím 2
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">✅ Bài tập trắc nghiệm</h3>
                <p className="text-slate-300">Chọn đúng nghĩa của từ.</p>
              </div>
              
              <div 
                onClick={() => startSession('fill-in-blank')}
                onMouseEnter={() => setSelectedCardIndex(2)}
                className={`mode-card bg-slate-800/60  p-6 rounded-xl shadow-2xl border hover:bg-slate-800/80 relative transition-all ${
                  selectedCardIndex === 2 
                    ? 'border-purple-500 ring-2 ring-purple-500/50 bg-slate-800/80' 
                    : 'border-slate-700/50 hover:border-purple-500/50'
                }`}
              >
                <div className="absolute top-3 right-3 bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-bold border border-purple-500/30">
                  Phím 3
                </div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">✏️ Điền vào chỗ trống</h3>
                <p className="text-slate-300">Hoàn thành câu với từ vựng đúng.</p>
              </div>
              
              <div 
                onClick={() => startSession('verb-forms')}
                onMouseEnter={() => setSelectedCardIndex(3)}
                className={`mode-card bg-slate-800/60  p-6 rounded-xl shadow-2xl border hover:bg-slate-800/80 relative transition-all ${
                  selectedCardIndex === 3 
                    ? 'border-orange-500 ring-2 ring-orange-500/50 bg-slate-800/80' 
                    : 'border-slate-700/50 hover:border-orange-500/50'
                }`}
              >
                <div className="absolute top-3 right-3 bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs font-bold border border-orange-500/30">
                  Phím 4
                </div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">🔄 Chia động từ</h3>
                <p className="text-slate-300">Điền dạng V2 và V3 của động từ.</p>
              </div>
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
      <footer className="bg-slate-800/30  mt-8 border-t border-slate-700/50">
        <div className="container mx-auto px-4 py-4 text-center text-slate-400">
          <p>&copy; 2025 Luyện tập động từ. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
