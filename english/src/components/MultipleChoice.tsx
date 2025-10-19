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
  const [focusedIndex, setFocusedIndex] = useState(0); // Cho arrow key navigation

  useEffect(() => {
    // Reset state khi chuyển sang câu mới
    setSelectedAnswer(null);
    setFocusedIndex(0);
    
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      
      // Phím P hoặc S để phát âm
      if (key === 'P' || key === 'S') {
        e.preventDefault();
        speak(word.word);
        return;
      }

      if (selectedAnswer) return; // Đã chọn rồi thì bỏ qua
      
      // Arrow keys navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        return;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        return;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(options[focusedIndex]);
        return;
      }
      
      let index = -1;
      
      // Hỗ trợ phím 1-4 và A-D
      if (key >= '1' && key <= '4') {
        index = parseInt(key) - 1;
      } else if (key >= 'A' && key <= 'D') {
        index = key.charCodeAt(0) - 'A'.charCodeAt(0);
      }
      
      if (index >= 0 && index < options.length) {
        setFocusedIndex(index);
        handleClick(options[index]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, selectedAnswer, focusedIndex, word]);

  const handleClick = (option: Verb) => {
    if (selectedAnswer) return; // Đã chọn rồi
    
    setSelectedAnswer(option.word);
    const isCorrect = option.word === word.word;
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: Verb, index: number) => {
    const baseClass = "btn-answer w-full text-left p-4 border-2 rounded-lg shadow-sm transition-all text-slate-200 ";
    
    if (!selectedAnswer) {
      // Highlight focused option
      if (index === focusedIndex) {
        return baseClass + "bg-slate-700/80 border-purple-500 ring-2 ring-purple-500/50 cursor-pointer";
      }
      return baseClass + "bg-slate-800/60 border-slate-600 hover:bg-slate-700/80 hover:border-purple-500/50 cursor-pointer";
    }
    
    if (option.word === word.word) {
      return baseClass + "bg-green-500/20 border-green-500 ring-2 ring-green-400/50";
    }
    
    if (option.word === selectedAnswer) {
      return baseClass + "bg-red-500/20 border-red-500 ring-2 ring-red-400/50";
    }
    
    return baseClass + "bg-slate-800/40 border-slate-700 opacity-50";
  };

  return (
    <>
      <div className="text-center mb-6">
        <p className="text-lg text-slate-300">Từ nào có nghĩa là:</p>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl font-bold text-purple-400">{word.word}</h2>
          <SpeakButton text={word.word} />
        </div>
        <p className="text-purple-300 text-sm mt-3">
          💡 <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs">P/S</kbd> phát âm, 
          <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">←→↑↓</kbd> di chuyển, 
          <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">Enter</kbd> chọn, 
          hoặc <kbd className="px-2 py-1 bg-slate-700 rounded border border-slate-600 text-xs ml-1">A-D/1-4</kbd>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option, index) => {
          const label = String.fromCharCode(65 + index); // A, B, C, D
          return (
            <button
              key={index}
              onClick={() => handleClick(option)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={getButtonClass(option, index) + ' relative'}
              disabled={selectedAnswer !== null}
            >
              <span className="absolute left-2 top-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs font-bold">
                {label}
              </span>
              <span className="ml-8">{option.definition || option.english_definition || option.word}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

