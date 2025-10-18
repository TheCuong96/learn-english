// Utility functions cho âm thanh phản hồi

// Tạo âm thanh đúng (cao và vui)
export const playCorrectSound = () => {
  if (typeof window === 'undefined') return;
  
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioContext = new AudioContextClass();
  
  // Tạo 3 nốt nhạc tăng dần (ding-ding-ding)
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    const startTime = audioContext.currentTime + (index * 0.1);
    const endTime = startTime + 0.15;
    
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
    
    oscillator.start(startTime);
    oscillator.stop(endTime);
  });
};

// Tạo âm thanh sai (thấp và buồn)
export const playIncorrectSound = () => {
  if (typeof window === 'undefined') return;
  
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioContext = new AudioContextClass();
  
  // Tạo 2 nốt nhạc giảm dần (buzz-buzz)
  const frequencies = [329.63, 246.94]; // E4, B3
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sawtooth';
    
    const startTime = audioContext.currentTime + (index * 0.15);
    const endTime = startTime + 0.2;
    
    gainNode.gain.setValueAtTime(0.2, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
    
    oscillator.start(startTime);
    oscillator.stop(endTime);
  });
};

