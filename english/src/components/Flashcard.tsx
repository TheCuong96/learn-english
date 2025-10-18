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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className="perspective-1000 mx-auto w-full max-w-md h-64">
        <div className={`card relative w-full h-full ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Front */}
          <div className="card-face absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border-2 border-blue-200">
            <h2 className="text-5xl font-bold mb-4">{word.word}</h2>
            <SpeakButton text={word.word} className="mt-2" />
          </div>
          {/* Back */}
          <div className="card-face card-face-back absolute w-full h-full flex flex-col items-center justify-center bg-blue-50 rounded-xl shadow-lg p-4 border-2 border-blue-200">
            <p className="text-2xl font-semibold text-blue-800">{word.definition}</p>
            <p className="text-slate-500 font-medium mt-1">(Động từ)</p>
            <div className="mt-4 text-center">
              <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">V1:</span> {word.v1} &nbsp;
              <span className="font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">V2:</span> {word.v2} &nbsp;
              <span className="font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded">V3:</span> {word.v3}
            </div>
            <p className="text-slate-700 italic mt-4 text-center">VD: {word.example}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button 
          onClick={handleFlip}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
        >
          Lật thẻ
        </button>
      </div>
    </>
  );
}

