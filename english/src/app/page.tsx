'use client';

import Navigation from '@/components/Navigation';
import ResultsScreen from '@/components/ResultsScreen';
import SessionScreen from '@/components/SessionScreen';
import { ReviewWord, SessionType, Verb } from '@/types/verb';
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

  const sessionLength = 10;

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
    
    // Lọc ra những từ có definition không rỗng (đặc biệt quan trọng cho trắc nghiệm)
    const validVocab = vocabulary.filter(v => v.definition && v.definition.trim() !== '');
    const words = VerbsData.random(validVocab, sessionLength);
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
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-slate-700">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Luyện tập động từ (804 verbs)
          </h1>
          {currentScreen !== 'home' && (
            <button 
              onClick={handleReset}
              className="text-blue-500 hover:text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Navigation */}
      {currentScreen === 'home' && <Navigation />}

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Home Screen */}
        {currentScreen === 'home' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Chào mừng bạn!</h2>
              <p className="text-slate-600">Luyện tập với 804 động từ từ verbs-data.json. Chọn một hoạt động bên dưới.</p>
              {stats && (
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                    📊 Tổng: {stats.total}
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded">
                    🔴 Bất quy tắc: {stats.irregular}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                    🟢 Quy tắc: {stats.regular}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => startSession('flashcards')}
                className="mode-card bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">📚 Học với thẻ ghi nhớ</h3>
                <p className="text-slate-600">Lật thẻ để học từ mới, V1-V2-V3 và ví dụ.</p>
              </div>
              
              <div 
                onClick={() => startSession('multiple-choice')}
                className="mode-card bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-green-600 mb-2">✅ Bài tập trắc nghiệm</h3>
                <p className="text-slate-600">Chọn đúng nghĩa của từ.</p>
              </div>
              
              <div 
                onClick={() => startSession('fill-in-blank')}
                className="mode-card bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-2">✏️ Điền vào chỗ trống</h3>
                <p className="text-slate-600">Hoàn thành câu với từ vựng đúng.</p>
              </div>
              
              <div 
                onClick={() => startSession('verb-forms')}
                className="mode-card bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-orange-600 mb-2">🔄 Chia động từ</h3>
                <p className="text-slate-600">Điền dạng V2 và V3 của động từ.</p>
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
            onAnswer={handleAnswer}
            onNext={handleNext}
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
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-slate-500">
          <p>&copy; 2025 Luyện tập động từ. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
