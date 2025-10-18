'use client';

import { Verb } from '@/types/verb';
import { speak } from '@/utils/speech';
import { VerbsData } from '@/utils/verbs-data';
import { useEffect, useState } from 'react';
import SpeakButton from './SpeakButton';

interface MultipleChoiceProps {
  word: Verb;
  allWords: Verb[];
  onAnswer: (isCorrect: boolean) => void;
}

export default function MultipleChoice({ word, allWords, onAnswer }: MultipleChoiceProps) {
  const [options, setOptions] = useState<Verb[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Reset state khi chuyển sang câu mới
    setSelectedAnswer(null);
    
    // Phát âm động từ
    setTimeout(() => speak(word.word), 300);
    
    // Tạo options - chỉ lấy những từ có definition không rỗng
    const opts = [word];
    const validWords = allWords.filter(w => 
      w.word !== word.word && 
      w.definition && 
      w.definition.trim() !== '' &&
      w.definition !== word.definition
    );
    const distractors = VerbsData.shuffleArray(validWords);
    
    for (let i = 0; opts.length < 4 && i < distractors.length; i++) {
      opts.push(distractors[i]);
    }
    
    setOptions(VerbsData.shuffleArray(opts));
  }, [word, allWords]);

  const handleClick = (option: Verb) => {
    if (selectedAnswer) return; // Đã chọn rồi
    
    setSelectedAnswer(option.word);
    const isCorrect = option.word === word.word;
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: Verb) => {
    let baseClass = "btn-answer w-full text-left p-4 border-2 rounded-lg shadow-sm transition-all ";
    
    if (!selectedAnswer) {
      return baseClass + "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer";
    }
    
    if (option.word === word.word) {
      return baseClass + "bg-green-100 border-green-500 ring-2 ring-green-300";
    }
    
    if (option.word === selectedAnswer) {
      return baseClass + "bg-red-100 border-red-500 ring-2 ring-red-300";
    }
    
    return baseClass + "bg-white border-gray-200 opacity-50";
  };

  return (
    <>
      <div className="text-center mb-6">
        <p className="text-lg text-slate-600">Từ nào có nghĩa là:</p>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl font-bold text-blue-600">{word.word}</h2>
          <SpeakButton text={word.word} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={getButtonClass(option)}
            disabled={selectedAnswer !== null}
          >
            {option.definition || option.english_definition || option.word}
          </button>
        ))}
      </div>
    </>
  );
}

