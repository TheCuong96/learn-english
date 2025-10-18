'use client';

import { Verb } from '@/types/verb';
import { speak } from '@/utils/speech';
import { useEffect, useState } from 'react';
import SpeakButton from './SpeakButton';

interface FillInBlankProps {
  word: Verb;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

export default function FillInBlank({ word, onAnswer }: FillInBlankProps) {
  const [sentence, setSentence] = useState('');
  const [wordToReplace, setWordToReplace] = useState('');
  const [userInput, setUserInput] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    // Reset state khi chuyển sang câu mới
    setUserInput('');
    setHasAnswered(false);
    
    // Phát âm câu ví dụ
    setTimeout(() => speak(word.example), 300);
    
    const exampleSentence = word.example;
    let targetWord = word.word;

    // Tìm verb form trong câu ví dụ
    const verbForms = [word.v1, word.v2, word.v3].filter(Boolean).sort((a, b) => b.length - a.length);
    const uniqueVerbForms = [...new Set(verbForms)];
    
    for (const form of uniqueVerbForms) {
      const regex = new RegExp(`\\b${form}\\b`, 'i');
      if (regex.test(exampleSentence)) {
        targetWord = form;
        break;
      }
    }
    
    const finalRegex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const modifiedSentence = exampleSentence.replace(finalRegex, '______');
    
    setSentence(modifiedSentence);
    setWordToReplace(targetWord);
  }, [word]);

  const handleCheck = () => {
    if (hasAnswered) return;
    
    const isCorrect = userInput.trim().toLowerCase() === wordToReplace.toLowerCase();
    setHasAnswered(true);
    onAnswer(isCorrect, userInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xl text-slate-700 mb-4">Điền từ còn thiếu vào câu:</p>
      <div className="flex items-center justify-center gap-3">
        <p className="text-2xl bg-white p-6 rounded-lg shadow-inner">{sentence}</p>
        <SpeakButton text={word.example} />
      </div>
      <p className="text-base text-slate-500 mt-4 italic">Gợi ý: {word.english_definition}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={hasAnswered}
        className={`text-center text-xl w-full max-w-sm p-3 border-2 rounded-lg mt-4 ${
          hasAnswered 
            ? userInput.trim().toLowerCase() === wordToReplace.toLowerCase()
              ? 'border-green-500 ring-2 ring-green-300'
              : 'border-red-500 ring-2 ring-red-300'
            : 'border-gray-300'
        }`}
        placeholder="Nhập câu trả lời..."
      />
      <button
        onClick={handleCheck}
        disabled={hasAnswered || !userInput.trim()}
        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Kiểm tra
      </button>
    </div>
  );
}

