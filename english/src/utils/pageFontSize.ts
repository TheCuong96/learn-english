/** Cỡ chữ trang — scale rem/Tailwind qua font-size trên html */

export const PAGE_FONT_SIZE_KEY = 'pageFontSize';
export const DEFAULT_PAGE_FONT_SCALE = 1;
export const MIN_PAGE_FONT_SCALE = 0.75;
export const MAX_PAGE_FONT_SCALE = 1.5;
export const BASE_FONT_PX = 16;

export const getPageFontScale = (): number => {
  if (typeof window === 'undefined') return DEFAULT_PAGE_FONT_SCALE;
  const saved = localStorage.getItem(PAGE_FONT_SIZE_KEY);
  if (!saved) return DEFAULT_PAGE_FONT_SCALE;
  const scale = parseFloat(saved);
  if (Number.isNaN(scale)) return DEFAULT_PAGE_FONT_SCALE;
  return Math.min(MAX_PAGE_FONT_SCALE, Math.max(MIN_PAGE_FONT_SCALE, scale));
};

export const applyPageFontScale = (scale: number): void => {
  if (typeof document === 'undefined') return;
  const clamped = Math.min(MAX_PAGE_FONT_SCALE, Math.max(MIN_PAGE_FONT_SCALE, scale));
  document.documentElement.style.fontSize = `${BASE_FONT_PX * clamped}px`;
};

export const setPageFontScale = (scale: number): number => {
  const clamped = Math.min(MAX_PAGE_FONT_SCALE, Math.max(MIN_PAGE_FONT_SCALE, scale));
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAGE_FONT_SIZE_KEY, clamped.toString());
  }
  applyPageFontScale(clamped);
  return clamped;
};

export const getPageFontPercent = (scale = getPageFontScale()): number =>
  Math.round(scale * 100);
