'use client';

import { applyPageFontScale, getPageFontScale } from '@/utils/pageFontSize';
import { useEffect } from 'react';

/** Áp cỡ chữ đã lưu khi load trang — trước khi mở menu Cài đặt phát âm */
export default function PageFontSizeInit() {
  useEffect(() => {
    applyPageFontScale(getPageFontScale());
  }, []);

  return null;
}
