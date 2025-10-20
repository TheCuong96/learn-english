'use client';

import { ReviewWord } from '@/types/verb';
import { useEffect, useState } from 'react';

interface ResultsScreenProps {
  score: number;
  totalWords: number;
  reviewWords: ReviewWord[];
  onRetry: () => void;
  onDownloadReport: () => void;
  onHome: () => void;
}

interface MotivationMessage {
  emoji: string;
  title: string;
  message: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

// Hàm tạo lời chúc mừng dựa trên tỷ lệ điểm
function getMotivationMessage(score: number, totalWords: number): MotivationMessage {
  const percentage = (score / totalWords) * 100;
  
  if (percentage === 100) {
    return {
      emoji: '🏆',
      title: 'Hoàn hảo tuyệt đối!',
      message: 'Xuất sắc! Bạn đã trả lời đúng tất cả! Bạn là người học giỏi nhất! Tiếp tục phát huy nhé! 💪',
      color: 'text-yellow-300',
      bgColor: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500'
    };
  } else if (percentage >= 90) {
    return {
      emoji: '🌟',
      title: 'Tuyệt vời!',
      message: 'Rất xuất sắc! Chỉ sai vài câu thôi. Bạn đã làm rất tốt! Hãy tiếp tục nỗ lực! 🎯',
      color: 'text-green-300',
      bgColor: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500'
    };
  } else if (percentage >= 80) {
    return {
      emoji: '👏',
      title: 'Rất tốt!',
      message: 'Làm tốt lắm! Bạn đang trên đà tiến bộ rất tốt. Cố gắng thêm một chút nữa bạn sẽ đạt điểm cao hơn! 💫',
      color: 'text-blue-300',
      bgColor: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500'
    };
  } else if (percentage >= 70) {
    return {
      emoji: '👍',
      title: 'Khá tốt!',
      message: 'Không tệ! Bạn đã nắm được phần lớn kiến thức. Hãy ôn lại những từ sai để làm tốt hơn lần sau nhé! 📚',
      color: 'text-indigo-300',
      bgColor: 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-500'
    };
  } else if (percentage >= 60) {
    return {
      emoji: '💪',
      title: 'Cần cố gắng thêm!',
      message: 'Bạn đã cố gắng! Hãy xem lại những từ sai bên dưới và luyện tập thêm. Bạn nhất định sẽ tiến bộ! 🌱',
      color: 'text-purple-300',
      bgColor: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500'
    };
  } else if (percentage >= 50) {
    return {
      emoji: '📖',
      title: 'Hãy cố gắng hơn nữa!',
      message: 'Đừng nản lòng! Mọi người đều phải học từ những sai lầm. Hãy ôn lại và thử lại nhé! Bạn làm được! 🔥',
      color: 'text-orange-300',
      bgColor: 'bg-gradient-to-r from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500'
    };
  } else {
    return {
      emoji: '🎯',
      title: 'Cần ôn lại nhiều hơn!',
      message: 'Đừng lo! Học tiếng Anh cần thời gian và kiên trì. Hãy xem lại những từ sai, ôn kỹ và làm lại bài nhé! Tin vào bản thân! 💡',
      color: 'text-red-300',
      bgColor: 'bg-gradient-to-r from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-500'
    };
  }
}

export default function ResultsScreen({
  score,
  totalWords,
  reviewWords,
  onRetry,
  onDownloadReport,
  onHome
}: ResultsScreenProps) {
  const [focusedButton, setFocusedButton] = useState(0); // 0 = Làm lại, 1 = Tải báo cáo, 2 = Về trang chủ

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Arrow keys navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedButton((prev) => (prev - 1 + 3) % 3);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedButton((prev) => (prev + 1) % 3);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedButton === 0) {
          onRetry();
        } else if (focusedButton === 1) {
          onDownloadReport();
        } else {
          onHome();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        // R = Retry (Làm lại)
        onRetry();
      } else if (e.key === 'd' || e.key === 'D') {
        // D = Download
        onDownloadReport();
      } else if (e.key === 'h' || e.key === 'H' || e.key === 'Escape') {
        // H = Home hoặc Escape
        onHome();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [focusedButton, onRetry, onDownloadReport, onHome]);

  const motivation = getMotivationMessage(score, totalWords);
  const percentage = ((score / totalWords) * 100).toFixed(1);

  return (
    <div className="text-center max-w-4xl mx-auto">
      {/* Lời chúc mừng động lực */}
      <div className={`mb-8 p-6 rounded-xl border-2 ${motivation.bgColor} ${motivation.borderColor} backdrop-blur-sm shadow-2xl animate-fade-in`}>
        <div className="text-6xl mb-3">{motivation.emoji}</div>
        <h2 className={`text-4xl font-bold mb-3 ${motivation.color}`}>
          {motivation.title}
        </h2>
        <p className="text-xl mb-4 text-slate-200 leading-relaxed">
          {motivation.message}
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="text-center">
            <p className="text-5xl font-bold text-purple-400">{score}</p>
            <p className="text-sm text-slate-400">Câu đúng</p>
          </div>
          <div className="text-4xl text-slate-500">/</div>
          <div className="text-center">
            <p className="text-5xl font-bold text-slate-400">{totalWords}</p>
            <p className="text-sm text-slate-400">Tổng câu</p>
          </div>
          <div className="text-4xl text-slate-500">=</div>
          <div className="text-center">
            <p className={`text-5xl font-bold ${motivation.color}`}>{percentage}%</p>
            <p className="text-sm text-slate-400">Tỷ lệ</p>
          </div>
        </div>
      </div>
      <p className="text-purple-300 text-sm mb-4">
        💡 Dùng <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">←→</kbd> để di chuyển, 
        <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">Enter</kbd> để chọn, 
        hoặc <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">R</kbd> làm lại, 
        <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">D</kbd> tải báo cáo, 
        <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">H/Esc</kbd> về trang chủ
      </p>
      
      <div className="mb-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-slate-200">Những từ cần xem lại:</h3>
        {reviewWords.length > 0 ? (
          <ul className="space-y-3">
            {reviewWords.map((item, index) => (
              <li 
                key={index} 
                className="p-3 bg-red-500/20 rounded-lg border border-red-500/50"
              >
                <span className="font-bold text-red-300">{item.word}</span>: <span className="text-slate-300">{item.definition}</span>
                <br />
                <span className="text-sm text-slate-400">
                  {item.v1} - {item.v2} - {item.v3}
                </span>
                {item.userAnswer && (
                  <>
                    <br />
                    <span className="text-sm text-red-400">
                      Bạn đã trả lời: {item.userAnswer}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-400">🎉 Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi.</p>
        )}
      </div>
      
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={onRetry}
          onMouseEnter={() => setFocusedButton(0)}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${
            focusedButton === 0 ? 'ring-4 ring-purple-400/50 scale-105' : ''
          }`}
        >
          🔄 Làm lại <span className="text-purple-200 text-sm ml-2">(R)</span>
        </button>
        <button
          onClick={onDownloadReport}
          onMouseEnter={() => setFocusedButton(1)}
          className={`bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${
            focusedButton === 1 ? 'ring-4 ring-slate-400/50 scale-105' : ''
          }`}
        >
          📥 Tải báo cáo <span className="text-slate-300 text-sm ml-2">(D)</span>
        </button>
        <button
          onClick={onHome}
          onMouseEnter={() => setFocusedButton(2)}
          className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${
            focusedButton === 2 ? 'ring-4 ring-blue-400/50 scale-105' : ''
          }`}
        >
          🏠 Trang chủ <span className="text-blue-200 text-sm ml-2">(H)</span>
        </button>
      </div>
    </div>
  );
}

