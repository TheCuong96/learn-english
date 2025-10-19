// Utility functions cho Text-to-Speech

// Lưu trữ voice đã chọn
let selectedVoiceName: string | null = null;

// Lấy rate từ localStorage
const getSavedRate = (): number => {
  if (typeof window === 'undefined') return 0.9;
  const saved = localStorage.getItem('speechRate');
  return saved ? parseFloat(saved) : 0.9;
};

export const speak = (text: string, options?: { rate?: number; volume?: number; voiceName?: string }) => {
  if (typeof window === 'undefined') return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Lấy tất cả giọng nói
  const voices = window.speechSynthesis.getVoices();
  
  // Ưu tiên giọng được chọn, sau đó giọng đã lưu, cuối cùng giọng mặc định
  const voiceToUse = options?.voiceName || selectedVoiceName;
  let voice: SpeechSynthesisVoice | undefined;
  
  if (voiceToUse) {
    voice = voices.find(v => v.name === voiceToUse);
  }
  
  // Nếu không tìm thấy, dùng giọng tiếng Anh đầu tiên
  if (!voice) {
    voice = voices.find(v => /en-US|en-GB|en-AU/i.test(v.lang));
  }
  
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'en-US';
  }
  
  // Sử dụng rate từ localStorage nếu không có options
  utterance.rate = options?.rate || getSavedRate();
  utterance.volume = options?.volume || 1;
  
  window.speechSynthesis.cancel(); // Hủy audio đang phát (nếu có)
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
};

// Lưu voice đã chọn
export const setSelectedVoice = (voiceName: string) => {
  selectedVoiceName = voiceName;
};

// Lấy voice hiện tại
export const getSelectedVoice = () => {
  return selectedVoiceName;
};

// Lấy danh sách giọng tiếng Anh
export const getEnglishVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === 'undefined') return [];
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(v => /en-/i.test(v.lang));
};

