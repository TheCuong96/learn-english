/** Cỡ chữ trang (px) — scale rem/Tailwind qua font-size trên html */

export const PAGE_FONT_SIZE_KEY = 'pageFontSize';
export const DEFAULT_PAGE_FONT_PX = 16;
export const MIN_PAGE_FONT_PX = 12;
export const MAX_PAGE_FONT_PX = 24;

const clampFontPx = (px: number): number =>
  Math.min(MAX_PAGE_FONT_PX, Math.max(MIN_PAGE_FONT_PX, Math.round(px)));

/** Đọc px; tự chuyển giá trị scale cũ (0.75–1.5) sang px */
const parseSavedFontPx = (raw: string | null): number => {
  if (!raw) return DEFAULT_PAGE_FONT_PX;
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return DEFAULT_PAGE_FONT_PX;
  // Dữ liệu cũ lưu theo scale (≤ 3)
  if (value > 0 && value <= 3) return clampFontPx(value * DEFAULT_PAGE_FONT_PX);
  return clampFontPx(value);
};

export const getPageFontSize = (): number => {
  if (typeof window === 'undefined') return DEFAULT_PAGE_FONT_PX;
  return parseSavedFontPx(localStorage.getItem(PAGE_FONT_SIZE_KEY));
};

export const applyPageFontSize = (px: number): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.style.fontSize = `${clampFontPx(px)}px`;
};

export const setPageFontSize = (px: number): number => {
  const clamped = clampFontPx(px);
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAGE_FONT_SIZE_KEY, clamped.toString());
  }
  applyPageFontSize(clamped);
  return clamped;
};
