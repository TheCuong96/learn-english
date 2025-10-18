// Utility functions cho Text-to-Speech

export const speak = (text: string, options?: { rate?: number; volume?: number }) => {
  if (typeof window === 'undefined') return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Tìm giọng tiếng Anh
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => /en-US|en-GB/i.test(v.lang));
  
  if (enVoice) {
    utterance.voice = enVoice;
  }
  
  utterance.lang = 'en-US';
  utterance.rate = options?.rate || 0.9;
  utterance.volume = options?.volume || 1;
  
  window.speechSynthesis.cancel(); // Hủy audio đang phát (nếu có)
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
};

