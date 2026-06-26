'use client';

import {
  getPageFontPercent,
  getPageFontScale,
  setPageFontScale,
} from '@/utils/pageFontSize';
import { getAllVoices, getMuteState, getSelectedVoice, setSelectedVoice, speak, toggleMute } from '@/utils/speech';
import { useEffect, useState } from 'react';

export default function VoiceSelector() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoiceState] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState(0.9);
  const [fontScale, setFontScale] = useState(1);
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

    setFontScale(getPageFontScale());
  }, []);

  const loadVoices = () => {
    const allVoices = getAllVoices();
    console.log('Tìm thấy tất cả giọng:', allVoices.length);
    
    // Sắp xếp: giọng tiếng Anh trước, sau đó các giọng khác
    const englishVoices = allVoices.filter(v => /en-/i.test(v.lang));
    const otherVoices = allVoices.filter(v => !/en-/i.test(v.lang));
    const sortedVoices = [...englishVoices, ...otherVoices];
    
    setVoices(sortedVoices);
    
    // Set giọng mặc định nếu chưa có (ưu tiên giọng tiếng Anh)
    const current = getSelectedVoice();
    if (!current) {
      // Ưu tiên giọng tiếng Anh đầu tiên, nếu không có thì dùng giọng đầu tiên
      const defaultVoice = englishVoices.length > 0 
        ? englishVoices[0].name 
        : allVoices.length > 0 
        ? allVoices[0].name 
        : null;
      
      if (defaultVoice) {
        console.log('Chọn giọng mặc định:', defaultVoice);
        setSelectedVoice(defaultVoice);
        setSelectedVoiceState(defaultVoice);
      }
    } else if (current) {
      setSelectedVoiceState(current);
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    console.log('Đổi giọng:', voiceName);
    setSelectedVoice(voiceName);
    setSelectedVoiceState(voiceName);
    // Không tự động đóng menu để người dùng có thể tiếp tục chọn các giọng khác
    
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

  const handleFontScaleChange = (newScale: number) => {
    const clamped = setPageFontScale(newScale);
    setFontScale(clamped);
  };

  const getVoiceLabel = (voice: SpeechSynthesisVoice) => {
    // Tạo label ngắn gọn với hỗ trợ nhiều quốc gia/ngôn ngữ hơn
    let country = '🌐';
    const lang = voice.lang.toUpperCase();
    
    // Tiếng Anh
    if (lang.includes('EN-US') || lang.includes('US')) country = '🇺🇸';
    else if (lang.includes('EN-GB') || lang.includes('GB')) country = '🇬🇧';
    else if (lang.includes('EN-AU') || lang.includes('AU')) country = '🇦🇺';
    else if (lang.includes('EN-CA') || lang.includes('CA')) country = '🇨🇦';
    else if (lang.includes('EN-IN') || lang.includes('IN')) country = '🇮🇳';
    else if (lang.includes('EN')) country = '🇬🇧';
    // Các ngôn ngữ khác
    else if (lang.includes('VI') || lang.includes('VN')) country = '🇻🇳';
    else if (lang.includes('ZH') || lang.includes('CN')) country = '🇨🇳';
    else if (lang.includes('JA') || lang.includes('JP')) country = '🇯🇵';
    else if (lang.includes('KO') || lang.includes('KR')) country = '🇰🇷';
    else if (lang.includes('ES') || lang.includes('SP')) country = '🇪🇸';
    else if (lang.includes('FR') || lang.includes('FR')) country = '🇫🇷';
    else if (lang.includes('DE') || lang.includes('GER')) country = '🇩🇪';
    else if (lang.includes('IT') || lang.includes('ITA')) country = '🇮🇹';
    else if (lang.includes('PT') || lang.includes('BR')) country = '🇧🇷';
    else if (lang.includes('RU') || lang.includes('RUS')) country = '🇷🇺';
    else if (lang.includes('AR')) country = '🇸🇦';
    else if (lang.includes('TH')) country = '🇹🇭';
    
    const gender = voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') ? '♀' :
                  voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man') ? '♂' : '';
    
    // Hiển thị mã ngôn ngữ nếu không phải tiếng Anh
    const langCode = /en-/i.test(voice.lang) ? '' : `[${voice.lang.substring(0, 2).toUpperCase()}]`;
    
    return `${country} ${voice.name.split(' ')[0]} ${gender} ${langCode}`.trim();
  };

  const currentVoice = voices.find(v => v.name === selectedVoice);

  return (
    <div className="relative flex w-full">
      {/* Single menu button */}
      <div className="ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-slate-700/50 hover:bg-slate-600 text-slate-200 rounded-lg border border-slate-600/40 transition-all text-xs sm:text-sm md:text-base cursor-pointer"
        >
          <span className="text-sm sm:text-base md:text-lg">{isMuted ? '🔇' : '🎤'}</span>
          <span className="hidden sm:inline">
            {currentVoice ? getVoiceLabel(currentVoice) : 'Cài đặt phát âm'}
          </span>
          <span className="text-xs sm:text-sm md:text-base">{isOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Overlay để đóng dropdown khi click bên ngoài */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Combined menu dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-slate-800/95 backdrop-blur-md border border-slate-600/40 rounded-lg shadow-2xl min-w-[280px] sm:min-w-[300px] md:min-w-[350px] max-w-[90vw] sm:max-w-[95vw] md:max-w-none max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="p-3 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-700/50">
              <div className="flex-1">
                <p className="text-sm md:text-base text-slate-200 font-semibold">🎤 Cài đặt phát âm</p>
                {currentVoice && (
                  <p className="text-xs md:text-sm text-slate-400 mt-1 truncate">
                    {currentVoice.name}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newMuteState = toggleMute();
                  setIsMuted(newMuteState);
                }}
                className={`flex flex-col items-center justify-center p-2 md:p-2.5 rounded-lg border transition-all cursor-pointer min-w-[50px] md:min-w-[60px] ${
                  isMuted 
                    ? 'bg-red-600/50 hover:bg-red-600 text-red-300 border-red-400/40' 
                    : 'bg-slate-700/50 hover:bg-slate-600 text-slate-200 border-slate-600/40'
                }`}
                aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
              >
                <span className="text-base md:text-lg">{isMuted ? '🔇' : '🔊'}</span>
                <span className="text-[10px] md:text-xs mt-0.5">{isMuted ? 'Tắt' : 'Bật'}</span>
              </button>
            </div>

            {/* Speed Settings */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs md:text-sm text-slate-300 font-medium">⚙️ Tốc độ:</label>
                <span className="text-xs md:text-sm text-purple-400 font-semibold">{rate.toFixed(1)}x</span>
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
              <div className="flex justify-between text-xs md:text-sm text-slate-400 mt-1 mb-2">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
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
                    className={`px-3 md:px-4 py-1 md:py-1.5 rounded text-xs md:text-sm font-semibold transition-all ${
                      Math.abs(rate - speed) < 0.05
                        ? 'bg-purple-600/40 border-2 border-purple-400 ring-2 ring-purple-400/60 text-purple-200 shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Font size — scale toàn trang qua rem/Tailwind */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs md:text-sm text-slate-300 font-medium">🔤 Cỡ chữ trang:</label>
                <span className="text-xs md:text-sm text-sky-400 font-semibold">
                  {getPageFontPercent(fontScale)}%
                </span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.05"
                value={fontScale}
                onChange={(e) => handleFontScaleChange(parseFloat(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-xs md:text-sm text-slate-400 mt-1 mb-2">
                <span>75%</span>
                <span>100%</span>
                <span>150%</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[0.85, 1, 1.15, 1.25].map((scale) => (
                  <button
                    key={scale}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFontScaleChange(scale);
                    }}
                    className={`px-3 md:px-4 py-1 md:py-1.5 rounded text-xs md:text-sm font-semibold transition-all ${
                      Math.abs(fontScale - scale) < 0.03
                        ? 'bg-sky-600/40 border-2 border-sky-400 ring-2 ring-sky-400/60 text-sky-200 shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {getPageFontPercent(scale)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Selection */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs md:text-sm text-slate-400 font-semibold">
                  Chọn giọng đọc ({voices.length}):
                </p>
                <p className="text-[10px] md:text-xs text-slate-500">
                  {voices.filter(v => /en-/i.test(v.lang)).length} tiếng Anh
                </p>
              </div>
              {voices.length === 0 ? (
                <p className="text-xs text-slate-400 px-2 py-1 italic">
                  Đang tải giọng nói...
                </p>
              ) : (
                <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                  {voices.map((voice) => (
                    <button
                      key={voice.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoiceChange(voice.name);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex flex-col gap-1 ${
                        voice.name === selectedVoice
                          ? 'bg-purple-600/40 text-purple-200 border-2 border-purple-400 ring-2 ring-purple-400/60 font-semibold'
                          : 'hover:bg-slate-700/50 text-slate-300'
                      }`}
                      aria-label={`Chọn giọng ${voice.name}, ngôn ngữ ${voice.lang}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm md:text-base truncate flex-1">{getVoiceLabel(voice)}</span>
                        {voice.name === selectedVoice && <span className="text-xs md:text-sm">✓</span>}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] md:text-xs text-slate-400 truncate">{voice.name}</span>
                        <span className="text-[10px] md:text-xs text-slate-500">{voice.lang}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Test button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak('The quick brown fox jumps over the lazy dog.', { rate });
              }}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all"
            >
              🔊 Test phát âm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


