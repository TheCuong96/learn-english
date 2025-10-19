'use client';

import { Verb } from '@/types/verb';
import { speak } from '@/utils/speech';
import { useEffect, useState } from 'react';
import SpeakButton from './SpeakButton';

interface FlashcardProps {
  word: Verb;
}

export default function Flashcard({ word }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset state và phát âm khi chuyển sang thẻ mới
  useEffect(() => {
    setIsFlipped(false);
    // Phát âm động từ
    setTimeout(() => speak(word.word), 300);
  }, [word]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      
      // Phím P hoặc S để phát âm
      if (key === 'p' || key === 's') {
        e.preventDefault();
        speak(word.word);
        return;
      }
      
      // Phím Space, F, Enter để lật thẻ
      if (key === ' ' || key === 'f' || key === 'enter') {
        e.preventDefault();
        setIsFlipped(!isFlipped);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, word]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className="perspective-1000 mx-auto w-full max-w-md h-64">
        <div className={`card relative w-full h-full ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Front */}
          <div className="card-face absolute w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-2xl border-2 border-purple-500/50">
            <h2 
              className="text-5xl font-bold mb-4 text-white cursor-pointer hover:scale-110 transition-transform select-none"
              onClick={() => speak(word.word)}
              title="Click để nghe phát âm 👆"
            >
              {word.word}
            </h2>
            <SpeakButton text={word.word} className="mt-2" />
          </div>
          {/* Back */}
          <div className="card-face card-face-back absolute w-full h-full flex flex-col items-center justify-center bg-slate-800/90 rounded-xl shadow-2xl p-4 border-2 border-slate-600">
            <p className="text-2xl font-semibold text-purple-300">{word.definition}</p>
            <p className="text-slate-400 font-medium mt-1">(Động từ)</p>
            <div className="mt-4 text-center text-slate-200 flex gap-3 justify-center flex-wrap">
              <span 
                className="font-semibold bg-blue-500/30 text-blue-300 px-2 py-1 rounded border border-blue-500/50 cursor-pointer hover:scale-110 transition-transform select-none"
                onClick={() => speak(word.v1)}
                title="Click để nghe V1 👆"
              >
                V1: {word.v1}
              </span>
              <span 
                className="font-semibold bg-green-500/30 text-green-300 px-2 py-1 rounded border border-green-500/50 cursor-pointer hover:scale-110 transition-transform select-none"
                onClick={() => speak(word.v2)}
                title="Click để nghe V2 👆"
              >
                V2: {word.v2}
              </span>
              <span 
                className="font-semibold bg-purple-500/30 text-purple-300 px-2 py-1 rounded border border-purple-500/50 cursor-pointer hover:scale-110 transition-transform select-none"
                onClick={() => speak(word.v3)}
                title="Click để nghe V3 👆"
              >
                V3: {word.v3}
              </span>
            </div>
            <p className="text-slate-300 italic mt-4 text-center">VD: {word.example}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-purple-300 text-sm mb-2">
          💡 <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">P/S</kbd> phát âm, 
          <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">Space/F</kbd> lật thẻ
        </p>
        <button 
          onClick={handleFlip}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg border border-slate-600"
        >
          Lật thẻ
        </button>
      </div>
    </>
  );
}

