import GrammarLessonContent from '@/components/grammar/GrammarLessonContent';
import {
  getA1GrammarLesson,
  getA1GrammarLessonMetadata,
  getAllA1GrammarSlugs,
} from '@/data/grammar/a1';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllA1GrammarSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getA1GrammarLessonMetadata(slug);

  if (!lesson) {
    return {
      title: 'Không tìm thấy bài học | English Learning Hub',
      description: 'Bài học A1 Grammar bạn đang tìm không tồn tại.',
    };
  }

  return {
    title: `${lesson.shortTitle ?? lesson.title} – A1 Grammar | English Learning Hub`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getA1GrammarLesson(slug);

  if (!lesson) {
    notFound();
  }

  const previousLesson = lesson.previousLessonSlug
    ? getA1GrammarLessonMetadata(lesson.previousLessonSlug)
    : undefined;
  const nextLesson = lesson.nextLessonSlug
    ? getA1GrammarLessonMetadata(lesson.nextLessonSlug)
    : undefined;

  return (
    <GrammarLessonContent
      lesson={lesson}
      previousLesson={previousLesson}
      nextLesson={nextLesson}
    />
  );
}
