import { Verb } from '@/types/verb';

export const VerbsData = {
  // Load dữ liệu từ file JSON
  async load(): Promise<Verb[]> {
    try {
      const response = await fetch('/data/verbs-data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Không thể tải dữ liệu động từ:', error);
      return [];
    }
  },

  // Hàm lấy ngẫu nhiên n động từ
  random(verbs: Verb[], count: number = 10): Verb[] {
    const shuffled = [...verbs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  },

  // Hàm thống kê
  stats(verbs: Verb[]) {
    const total = verbs.length;
    const regular = verbs.filter(v => v.v1 !== v.v2 && v.v2 === v.v3).length;
    const irregular = verbs.filter(v => v.v1 !== v.v2 || v.v2 !== v.v3).length;
    const unchanging = verbs.filter(v => v.v1 === v.v2 && v.v2 === v.v3).length;

    return {
      total,
      regular,
      irregular,
      unchanging,
    };
  },

  // Hàm xáo trộn mảng
  shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};

