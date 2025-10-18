'use client';

import { SessionType, Verb } from '@/types/verb';
import { playCorrectSound, playIncorrectSound } from '@/utils/sound';
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
  onAnswer: (isCorrect: boolean, userAnswer?: string) => void;
  onNext: () => void;
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
  onAnswer,
  onNext
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
          Tiếp theo
        </button>
      </div>
    </>
  );
}

