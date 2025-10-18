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

  const handleCheck = () => {
    if (hasAnswered) return;
    
    const isCorrect = 
      v2Input.trim().toLowerCase() === word.v2.toLowerCase() && 
      v3Input.trim().toLowerCase() === word.v3.toLowerCase();
    
    setHasAnswered(true);
    onAnswer(isCorrect, `V2: ${v2Input}, V3: ${v3Input}`);
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xl text-slate-700 mb-4">Điền dạng V2 và V3 của động từ:</p>
      <div className="flex items-center justify-center gap-3 mb-8">
        <h2 className="text-5xl font-bold text-orange-500">{word.v1}</h2>
        <SpeakButton text={word.v1} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="v2-input" className="block text-lg font-medium text-slate-600">
            V2 (quá khứ)
          </label>
          <input
            id="v2-input"
            type="text"
            value={v2Input}
            onChange={(e) => setV2Input(e.target.value)}
            disabled={hasAnswered}
            className={`mt-1 text-center text-xl w-full p-3 border-2 rounded-lg ${
              hasAnswered
                ? v2Input.trim().toLowerCase() === word.v2.toLowerCase()
                  ? 'border-green-500 ring-2 ring-green-300'
                  : 'border-red-500 ring-2 ring-red-300'
                : 'border-gray-300'
            }`}
          />
        </div>
        <div>
          <label htmlFor="v3-input" className="block text-lg font-medium text-slate-600">
            V3 (quá khứ phân từ)
          </label>
          <input
            id="v3-input"
            type="text"
            value={v3Input}
            onChange={(e) => setV3Input(e.target.value)}
            disabled={hasAnswered}
            className={`mt-1 text-center text-xl w-full p-3 border-2 rounded-lg ${
              hasAnswered
                ? v3Input.trim().toLowerCase() === word.v3.toLowerCase()
                  ? 'border-green-500 ring-2 ring-green-300'
                  : 'border-red-500 ring-2 ring-red-300'
                : 'border-gray-300'
            }`}
          />
        </div>
      </div>
      <button
        onClick={handleCheck}
        disabled={hasAnswered || !v2Input.trim() || !v3Input.trim()}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Kiểm tra
      </button>
    </div>
  );
}

