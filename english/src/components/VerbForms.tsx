'use client';

import { Verb } from '@/types/verb';
import { speak } from '@/utils/speech';
import { useEffect, useState } from 'react';
import SpeakButton from './SpeakButton';

interface VerbFormsProps {
  word: Verb;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export default function VerbForms({ word, onAnswer }: VerbFormsProps) {
  const [v2Input, setV2Input] = useState('');
  const [v3Input, setV3Input] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state và phát âm khi chuyển sang câu mới
  useEffect(() => {
    setV2Input('');
    setV3Input('');
    setHasAnswered(false);
    
    // Phát âm động từ V1
    setTimeout(() => speak(word.v1), 300);
  }, [word]);

  // Keyboard shortcut để phát âm
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (key === 'P' || key === 'S') {
        e.preventDefault();
        speak(word.v1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [word]);

  const handleCheck = () => {
    if (hasAnswered) return;
    
    const isCorrect = 
      v2Input.trim().toLowerCase() === word.v2.toLowerCase() && 
      v3Input.trim().toLowerCase() === word.v3.toLowerCase();
    
    setHasAnswered(true);
    onAnswer(isCorrect, `V2: ${v2Input}, V3: ${v3Input}`);
  };

  return (
    <div className="text-center  mx-auto">
      <p className="text-xl text-slate-300 mb-4">Điền dạng V2 và V3 của động từ:</p>
      <div className="flex items-center justify-center gap-3 mb-2">
        <SpeakButton text={word.v1} />
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 
            className="text-5xl font-bold text-orange-400 cursor-pointer hover:scale-110 transition-transform select-none"
            onClick={() => speak(word.v1)}
            title="Click để nghe phát âm V1 👆"
          >
            {word.v1}
          </h2> 
          <span className="text-3xl text-slate-400">=</span>
          <h2 className="text-5xl font-bold text-cyan-400">{word.definition}</h2>
        </div>
      </div>
      <p className="text-purple-300 text-sm mb-6">
        💡 Nhấn <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">P</kbd> hoặc 
        <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">S</kbd> để nghe lại phát âm
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl mx-auto">
        <div>
          <label htmlFor="v2-input" className="block text-lg font-medium text-slate-300">
            V2 (quá khứ)
          </label>
          <input
            id="v2-input"
            type="text"
            value={v2Input}
            onChange={(e) => setV2Input(e.target.value)}
            disabled={hasAnswered}
            className={`mt-1 text-center text-xl w-full p-3 border-2 rounded-lg bg-slate-800/60 text-slate-200 ${
              hasAnswered
                ? v2Input.trim().toLowerCase() === word.v2.toLowerCase()
                  ? 'border-green-500 ring-2 ring-green-400/50'
                  : 'border-red-500 ring-2 ring-red-400/50'
                : 'border-slate-600'
            }`}
          />
        </div>
        <div>
          <label htmlFor="v3-input" className="block text-lg font-medium text-slate-300">
            V3 (quá khứ phân từ)
          </label>
          <input
            id="v3-input"
            type="text"
            value={v3Input}
            onChange={(e) => setV3Input(e.target.value)}
            disabled={hasAnswered}
            className={`mt-1 text-center text-xl w-full p-3 border-2 rounded-lg bg-slate-800/60 text-slate-200 ${
              hasAnswered
                ? v3Input.trim().toLowerCase() === word.v3.toLowerCase()
                  ? 'border-green-500 ring-2 ring-green-400/50'
                  : 'border-red-500 ring-2 ring-red-400/50'
                : 'border-slate-600'
            }`}
          />
        </div>
      </div>
      <button
        onClick={handleCheck}
        disabled={hasAnswered || !v2Input.trim() || !v3Input.trim()}
        className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Kiểm tra
      </button>
    </div>
  );
}

