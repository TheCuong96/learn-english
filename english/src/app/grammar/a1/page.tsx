import A1Curriculum, {
  type A1CurriculumModule,
} from '@/components/grammar/A1Curriculum';
import { GRAMMAR_SHELL } from '@/components/grammar/grammar-shell';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import {
  A1_GRAMMAR_LESSON_COUNT,
  A1_GRAMMAR_MODULES,
  getA1GrammarLesson,
  getA1GrammarLessonsByModule,
} from '@/data/grammar/a1';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock3, ListChecks } from 'lucide-react';

export const metadata: Metadata = {
  title: 'A1 Grammar – Ngữ pháp tiếng Anh cơ bản | English Learning Hub',
  description:
    'Lộ trình A1 Grammar cho người Việt gồm các chủ điểm ngữ pháp nền tảng, thời lượng học và bài tập thực hành theo từng bài.',
};

function buildCurriculum(): A1CurriculumModule[] {
  return A1_GRAMMAR_MODULES.map((grammarModule) => ({
    id: grammarModule.id,
    title: grammarModule.title,
    description: grammarModule.description,
    order: grammarModule.order,
    lessons: getA1GrammarLessonsByModule(grammarModule.id).map((metadata) => {
      const lesson = getA1GrammarLesson(metadata.slug);

      return {
        slug: metadata.slug,
        order: metadata.order,
        title: metadata.title,
        shortTitle: metadata.shortTitle,
        description: metadata.description,
        estimatedMinutes: metadata.estimatedMinutes,
        publicationStatus: metadata.status,
        exerciseCount: (lesson?.exercises.length ?? 0) + (lesson?.miniTest.length ?? 0),
      };
    }),
  }));
}

export default function A1GrammarPage() {
  const curriculum = buildCurriculum();
  const totalMinutes = curriculum.reduce(
    (moduleTotal, grammarModule) =>
      moduleTotal +
      grammarModule.lessons.reduce(
        (lessonTotal, lesson) => lessonTotal + lesson.estimatedMinutes,
        0,
      ),
    0,
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className={`${GRAMMAR_SHELL} py-4`}>
          <Link href="/grammar" className="inline-flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <BookOpen className="h-5 w-5 text-violet-400" />
            English Learning Hub
          </Link>
          <Navigation />
        </div>
      </header>

      <main className={`${GRAMMAR_SHELL} flex-grow py-7 sm:py-10`}>
        <div className="w-full">
          <Link
            href="/grammar"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả cấp độ Grammar
          </Link>

          <section className="mt-6 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 via-slate-900 to-slate-950 p-5 sm:p-8">
            <Badge className="bg-violet-500 text-white">CEFR A1 · Beginner</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              A1 Grammar
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">
              Xây nền ngữ pháp tiếng Anh từ những cấu trúc thiết yếu. Mỗi bài được thiết kế
              ngắn gọn, có giải thích tiếng Việt, ví dụ và bài tập để bạn học đến đâu chắc đến đó.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <BookOpen className="h-4 w-4 text-violet-300" />
                {A1_GRAMMAR_MODULES.length} chủ điểm
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <ListChecks className="h-4 w-4 text-emerald-300" />
                {A1_GRAMMAR_LESSON_COUNT} bài học
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <Clock3 className="h-4 w-4 text-amber-300" />
                Khoảng {Math.round(totalMinutes / 60)} giờ
              </span>
            </div>
          </section>

          <A1Curriculum modules={curriculum} />
        </div>
      </main>
    </>
  );
}
