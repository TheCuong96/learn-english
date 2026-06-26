'use client';

import { useEffect } from 'react';

import { markLessonInProgress } from '@/lib/grammar-progress';

interface LessonProgressMarkerProps {
  lessonSlug: string;
  enabled?: boolean;
}

export default function LessonProgressMarker({
  lessonSlug,
  enabled = true,
}: LessonProgressMarkerProps) {
  useEffect(() => {
    if (enabled) {
      markLessonInProgress(lessonSlug);
    }
  }, [enabled, lessonSlug]);

  return null;
}
