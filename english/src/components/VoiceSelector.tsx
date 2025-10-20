'use client';

import { getEnglishVoices, getMuteState, getSelectedVoice, setSelectedVoice, speak, toggleMute } from '@/utils/speech';
import { useEffect, useState } from 'react';

export default function VoiceSelector() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoiceState] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState(0.9);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    loadVoices();
    setIsMuted(getMuteState());
    
    // Load voices khi có sẵn
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Load rate từ localStorage
    const savedRate = localStorage.getItem('speechRate');
    if (savedRate) {
      setRate(parseFloat(savedRate));
    }
  }, []);

  const loadVoices = () => {
    const englishVoices = getEnglishVoices();
    console.log('Tìm thấy giọng tiếng Anh:', englishVoices.length);
    setVoices(englishVoices);
    
    // Set giọng mặc định nếu chưa có
    const current = getSelectedVoice();
    if (!current && englishVoices.length > 0) {
      const defaultVoice = englishVoices[0].name;
      console.log('Chọn giọng mặc định:', defaultVoice);
      setSelectedVoice(defaultVoice);
      setSelectedVoiceState(defaultVoice);
    } else if (current) {
      setSelectedVoiceState(current);
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    console.log('Đổi giọng:', voiceName);
    setSelectedVoice(voiceName);
    setSelectedVoiceState(voiceName);
    setIsOpen(false);
    
    // Test phát âm với rate hiện tại
    setTimeout(() => {
      speak('Hello, this is a test.', { voiceName, rate });
    }, 100);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    localStorage.setItem('speechRate', newRate.toString());
    
    // Test phát âm
    speak('Testing speed', { rate: newRate });
  };

  const getVoiceLabel = (voice: SpeechSynthesisVoice) => {
    // Tạo label ngắn gọn
    const country = voice.lang.includes('US') ? '🇺🇸' : 
                   voice.lang.includes('GB') ? '🇬🇧' : 
                   voice.lang.includes('AU') ? '🇦🇺' :
                   voice.lang.includes('CA') ? '🇨🇦' :
                   voice.lang.includes('IN') ? '🇮🇳' : '🌐';
    
    const gender = voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') ? '♀' :
                  voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man') ? '♂' : '';
    
    return `${country} ${voice.name.split(' ')[0]} ${gender}`;
  };

  const currentVoice = voices.find(v => v.name === selectedVoice);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Voice selector button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowSettings(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600 text-slate-200 rounded-lg border border-slate-600/40 transition-all text-sm cursor-pointer"
        >
          <span>🎤</span>
          <span className="hidden sm:inline">
            {currentVoice ? getVoiceLabel(currentVoice) : 'Chọn giọng'}
          </span>
          <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
        </button>

        {/* Mute button */}
        <button
          onClick={() => {
            const newMuteState = toggleMute();
            setIsMuted(newMuteState);
          }}
          className={`p-2 rounded-lg border transition-all cursor-pointer ${
            isMuted 
              ? 'bg-red-600/50 hover:bg-red-600 text-red-300 border-red-400/40' 
              : 'bg-slate-700/50 hover:bg-slate-600 text-slate-200 border-slate-600/40'
          }`}
          title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Settings button */}
        <button
          onClick={() => {
            setShowSettings(!showSettings);
            setIsOpen(false);
          }}
          className="p-2 bg-slate-700/50 hover:bg-slate-600 text-slate-200 rounded-lg border border-slate-600/40 transition-all cursor-pointer"
          title="Cài đặt tốc độ đọc"
        >
          ⚙️
        </button>
      </div>

      {/* Overlay để đóng dropdown khi click bên ngoài - phải đặt trước */}
      {(isOpen || showSettings) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false);
            setShowSettings(false);
          }}
        />
      )}

      {/* Voice dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600/40 rounded-lg shadow-2xl max-h-96 overflow-y-auto custom-scrollbar min-w-[280px]">
          <div className="p-2">
            <p className="text-xs text-slate-400 px-3 py-2 font-semibold">
              🎤 Chọn giọng đọc ({voices.length} giọng):
            </p>
            {voices.length === 0 ? (
              <p className="text-xs text-slate-400 px-3 py-2 italic">
                Đang tải giọng nói... Vui lòng đợi hoặc refresh trang.
              </p>
            ) : (
              voices.map((voice) => (
                <button
                  key={voice.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoiceChange(voice.name);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between gap-2 ${
                    voice.name === selectedVoice
                      ? 'bg-purple-600/40 text-purple-200 border-2 border-purple-400 ring-2 ring-purple-400/60 font-semibold'
                      : 'hover:bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <span className="text-sm truncate flex-1">{getVoiceLabel(voice)}</span>
                  {voice.name === selectedVoice && <span className="text-xs">✓</span>}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Settings dropdown */}
      {showSettings && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600/40 rounded-lg shadow-2xl p-4 min-w-[280px]">
          <p className="text-sm text-slate-200 font-semibold mb-3">⚙️ Cài đặt phát âm</p>
          
          {/* Speed control */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-slate-300">Tốc độ:</label>
              <span className="text-xs text-purple-400 font-semibold">{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>2.0x</span>
            </div>
          </div>

          {/* Quick speed buttons */}
          <div className="flex gap-2 flex-wrap">
            {[0.7, 0.9, 1.0, 1.2].map((speed) => (
              <button
                key={speed}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRateChange(speed);
                }}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  Math.abs(rate - speed) < 0.05
                    ? 'bg-purple-600/40 border-2 border-purple-400 ring-2 ring-purple-400/60 text-purple-200 shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-transparent'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Test button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak('The quick brown fox jumps over the lazy dog.', { rate });
            }}
            className="w-full mt-3 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded-lg text-sm font-semibold transition-all"
          >
            🔊 Test phát âm
          </button>
        </div>
      )}
    </div>
  );
}


