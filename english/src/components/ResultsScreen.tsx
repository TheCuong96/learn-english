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
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-400">🎉 Hoàn thành!</h2>
      <p className="text-xl mb-6 text-slate-200">
        Điểm của bạn: <span className="font-bold text-purple-400">{score} / {totalWords}</span>
      </p>
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

