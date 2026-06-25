import type {
  GrammarLesson,
  GrammarLessonMetadata,
  GrammarModule,
} from '@/types/grammar';

import {
  A1_GRAMMAR_LESSON_COUNT,
  A1_GRAMMAR_LESSONS,
  A1_GRAMMAR_MODULES,
} from './curriculum';
import { presentSimpleToBeLesson } from './lessons/lesson-01-to-be';
import { presentSimpleLesson } from './lessons/lesson-02-present-simple';
import { presentContinuousLesson } from './lessons/lesson-03-present-continuous';

const publishedLessons: GrammarLesson[] = [
  presentSimpleToBeLesson,
  presentSimpleLesson,
  presentContinuousLesson,
];

const publishedLessonsBySlug = new Map(
  publishedLessons.map((lesson) => [lesson.slug, lesson]),
);

const lessonMetadataBySlug = new Map(
  A1_GRAMMAR_LESSONS.map((lesson) => [lesson.slug, lesson]),
);

function createComingSoonLesson(
  metadata: GrammarLessonMetadata,
): GrammarLesson {
  return {
    ...metadata,
    objectives: [
      `Nắm được kiến thức nền tảng của bài “${metadata.title}”.`,
      'Nhận biết cấu trúc trong các câu tiếng Anh A1 thường gặp.',
      'Áp dụng cấu trúc vào giao tiếp và bài tập cơ bản.',
    ],
    formulas: [],
    usages: [],
    examples: [],
    commonMistakes: [],
    quickNotes: [
      'Nội dung chi tiết của bài học đang được biên soạn.',
      'Metadata đã sẵn sàng để hiển thị trên trang danh sách A1 Grammar.',
    ],
    exercises: [],
    miniTest: [],
    summary: {
      keyPoints: [],
      rememberSentences: [],
    },
  };
}

export function getA1GrammarLessonMetadata(
  slug: string,
): GrammarLessonMetadata | undefined {
  return lessonMetadataBySlug.get(slug);
}

export function getA1GrammarLesson(
  slug: string,
): GrammarLesson | undefined {
  const publishedLesson = publishedLessonsBySlug.get(slug);

  if (publishedLesson) {
    return publishedLesson;
  }

  const metadata = lessonMetadataBySlug.get(slug);
  return metadata ? createComingSoonLesson(metadata) : undefined;
}

export function getA1GrammarLessonsByModule(
  moduleId: string,
): GrammarLessonMetadata[] {
  return A1_GRAMMAR_LESSONS.filter(
    (lesson) => lesson.moduleId === moduleId,
  );
}

export function getA1GrammarModule(
  moduleId: string,
): GrammarModule | undefined {
  return A1_GRAMMAR_MODULES.find(
    (grammarModule) => grammarModule.id === moduleId,
  );
}

export function getAllA1GrammarSlugs(): string[] {
  return A1_GRAMMAR_LESSONS.map((lesson) => lesson.slug);
}

export {
  A1_GRAMMAR_LESSON_COUNT,
  A1_GRAMMAR_LESSONS,
  A1_GRAMMAR_MODULES,
  presentContinuousLesson,
  presentSimpleLesson,
  presentSimpleToBeLesson,
};

