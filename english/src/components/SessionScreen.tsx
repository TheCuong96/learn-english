'use client';

import { SessionType, Verb } from '@/types/verb';
import { playCorrectSound, playIncorrectSound } from '@/utils/sound';
import { VERB_CATEGORIES } from '@/utils/verb-categories';
import { useEffect } from 'react';
import FillInBlank from './FillInBlank';
import Flashcard from './Flashcard';
import MultipleChoice from './MultipleChoice';
import VerbForms from './VerbForms';

interface SessionScreenProps {
  sessionType: SessionType;
  currentWord: Verb;
  currentIndex: number;
  totalWords: number;
  allWords: Verb[];
  showFeedback: boolean;
  isCorrect: boolean | null;
  correctAnswer: string;
  selectedCategories?: string[];
  onAnswer: (isCorrect: boolean, userAnswer?: string) => void;
  onNext: () => void;
  onHome: () => void;
}

export default function SessionScreen({
  sessionType,
  currentWord,
  currentIndex,
  totalWords,
  allWords,
  showFeedback,
  isCorrect,
  correctAnswer,
  selectedCategories = [],
  onAnswer,
  onNext,
  onHome
}: SessionScreenProps) {
  const progress = (currentIndex / totalWords) * 100;

  // Phát âm thanh khi có phản hồi
  useEffect(() => {
    if (showFeedback && isCorrect !== null) {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }
  }, [showFeedback, isCorrect]);

  // Keyboard shortcuts cho nút "Tiếp theo"
  useEffect(() => {
    if (!showFeedback && sessionType !== 'flashcards') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFeedback, sessionType, onNext]);

  // Keyboard shortcut để về trang chủ (Escape hoặc H)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === 'Escape' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        // Xác nhận trước khi thoát
        const confirmExit = window.confirm('Bạn có chắc muốn về trang chủ? Tiến trình hiện tại sẽ bị mất.');
        if (confirmExit) {
          onHome();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onHome]);

  const renderContent = () => {
    switch (sessionType) {
      case 'flashcards':
        return <Flashcard word={currentWord} />;
      case 'multiple-choice':
        return <MultipleChoice word={currentWord} allWords={allWords} onAnswer={onAnswer} />;
      case 'fill-in-blank':
        return <FillInBlank word={currentWord} onAnswer={onAnswer} />;
      case 'verb-forms':
        return <VerbForms word={currentWord} onAnswer={onAnswer} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header with Categories & Home button */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex-1">
            <p className="text-purple-300 text-sm">
              💡 Nhấn <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">Esc</kbd> hoặc 
              <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">H</kbd> để về trang chủ
            </p>
          </div>
          <button
            onClick={() => {
              const confirmExit = window.confirm('Bạn có chắc muốn về trang chủ? Tiến trình hiện tại sẽ bị mất.');
              if (confirmExit) onHome();
            }}
            className="bg-slate-700/50 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg border border-slate-600 transition-all flex items-center gap-2"
          >
            🏠 <span className="hidden sm:inline">Trang chủ</span>
          </button>
        </div>
        
        {/* Selected Categories Display */}
        {selectedCategories.length > 0 && (
          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <p className="text-slate-300 text-sm mb-2">🎯 Chủ đề đang luyện:</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((catId) => {
                const category = VERB_CATEGORIES.find(c => c.id === catId);
                if (!category) return null;
                return (
                  <span
                    key={catId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-xs text-purple-300"
                  >
                    {category.icon} {category.nameVi}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-purple-400">Tiến độ</span>
          <span className="text-sm font-medium text-purple-400">{currentIndex} / {totalWords}</span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full progress-bar-inner" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[350px]">
        {renderContent()}
      </div>

      {/* Feedback Area */}
      <div className="mt-4 min-h-[50px] text-center">
        {showFeedback && isCorrect !== null && (
          <div className={`border-l-4 p-4 rounded-md ${
            isCorrect 
              ? 'bg-green-500/20 border-green-500 text-green-300'
              : 'bg-red-500/20 border-red-500 text-red-300'
          }`}>
            <p className="font-bold">{isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}</p>
            {!isCorrect && (
              <p dangerouslySetInnerHTML={{ __html: correctAnswer }} />
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onNext}
          className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${
            !showFeedback && sessionType !== 'flashcards' ? 'hidden' : ''
          }`}
        >
          Tiếp theo <span className="text-purple-200 text-sm ml-2">(Enter)</span>
        </button>
      </div>
    </>
  );
}

