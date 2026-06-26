import type { ComponentType } from 'react';

import PresentSimpleToBeMindMap from './PresentSimpleToBeMindMap';

const LESSON_DIAGRAMS: Record<string, ComponentType> = {
  'present-simple-to-be-am-is-are': PresentSimpleToBeMindMap,
};

interface LessonDiagramProps {
  lessonSlug: string;
  compact?: boolean;
}

/** Render sơ đồ tư duy theo slug bài học — trả về null nếu bài chưa có diagram. */
export default function LessonDiagram({ lessonSlug, compact }: LessonDiagramProps) {
  const Diagram = LESSON_DIAGRAMS[lessonSlug] as ComponentType<{ compact?: boolean }> | undefined;
  if (!Diagram) return null;
  return <Diagram compact={compact} />;
}

export function hasLessonDiagram(lessonSlug: string): boolean {
  return lessonSlug in LESSON_DIAGRAMS;
}
