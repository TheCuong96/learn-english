// Utility functions cho Text-to-Speech

// Lưu trữ voice đã chọn
let selectedVoiceName: string | null = null;

// Lưu trữ trạng thái mute
let isMuted: boolean = false;

// Lấy rate từ localStorage
const getSavedRate = (): number => {
  if (typeof window === 'undefined') return 0.9;
  const saved = localStorage.getItem('speechRate');
  return saved ? parseFloat(saved) : 0.9;
};

// Lấy trạng thái mute từ localStorage
const getSavedMuteState = (): boolean => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('speechMuted');
  return saved === 'true';
};

// Khởi tạo trạng thái mute
if (typeof window !== 'undefined') {
  isMuted = getSavedMuteState();
}

export const speak = (text: string, options?: { rate?: number; volume?: number; voiceName?: string }) => {
  if (typeof window === 'undefined') return;
  
  // Kiểm tra trạng thái mute
  if (isMuted) return;
  
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

// Lấy danh sách TẤT CẢ giọng có sẵn (không chỉ tiếng Anh)
export const getAllVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === 'undefined') return [];
  return window.speechSynthesis.getVoices();
};

// Chức năng mute/unmute
export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('speechMuted', isMuted.toString());
  }
  
  // Dừng audio đang phát khi mute
  if (isMuted) {
    stopSpeaking();
  }
  
  return isMuted;
};

// Lấy trạng thái mute hiện tại
export const getMuteState = (): boolean => {
  return isMuted;
};

// Set trạng thái mute
export const setMuteState = (muted: boolean) => {
  isMuted = muted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('speechMuted', muted.toString());
  }
  
  // Dừng audio đang phát khi mute
  if (muted) {
    stopSpeaking();
  }
};

