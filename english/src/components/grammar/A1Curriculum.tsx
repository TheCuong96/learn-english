'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  getAllLessonProgress,
  type LessonLearningStatus,
  type LessonProgress,
} from '@/lib/grammar-progress';
import type { LessonStatus } from '@/types/grammar';
import { BookOpen, CheckCircle2, Clock3, Construction, ListChecks, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface A1CurriculumLesson {
  slug: string;
  order: number;
  title: string;
  shortTitle?: string;
  description: string;
  estimatedMinutes: number;
  publicationStatus: LessonStatus;
  exerciseCount: number;
}

export interface A1CurriculumModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: A1CurriculumLesson[];
}

interface A1CurriculumProps {
  modules: A1CurriculumModule[];
}

const learningStatusConfig: Record<
  LessonLearningStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  'not-started': {
    label: 'Chưa học',
    className: 'border-slate-600 bg-slate-800 text-slate-300',
    icon: BookOpen,
  },
  'in-progress': {
    label: 'Đang học',
    className: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
    icon: PlayCircle,
  },
  completed: {
    label: 'Hoàn thành',
    className: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
    icon: CheckCircle2,
  },
};

function LearningStatusBadge({ status }: { status: LessonLearningStatus }) {
  const config = learningStatusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
}

export default function A1Curriculum({ modules }: A1CurriculumProps) {
  const [progressBySlug, setProgressBySlug] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    const progressEntries = getAllLessonProgress().map((progress) => [
      progress.lessonSlug,
      progress,
    ]);

    setProgressBySlug(Object.fromEntries(progressEntries));
  }, []);

  if (modules.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-5 py-12 text-center">
        <Construction className="mx-auto h-10 w-10 text-slate-500" />
        <h2 className="mt-4 text-xl font-semibold text-white">Chưa có bài học A1</h2>
        <p className="mt-2 text-sm text-slate-400">
          Nội dung đang được chuẩn bị. Vui lòng quay lại sau.
        </p>
      </section>
    );
  }

  const lessons = modules.flatMap((grammarModule) => grammarModule.lessons);
  const publishedLessons = lessons.filter(
    (lesson) => lesson.publicationStatus === 'published',
  );
  const completedCount = publishedLessons.filter(
    (lesson) => progressBySlug[lesson.slug]?.status === 'completed',
  ).length;
  const progressPercent =
    publishedLessons.length > 0
      ? Math.round((completedCount / publishedLessons.length) * 100)
      : 0;

  return (
    <div className="mt-10 space-y-10">
      <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Tiến độ A1 Grammar</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Đã hoàn thành {completedCount}/{publishedLessons.length} bài đã xuất bản.
            </p>
          </div>
          <Button asChild variant="outline" className="border-slate-600 bg-slate-950 text-slate-200 hover:bg-slate-800 hover:text-white">
            <Link href="/grammar/a1/review">Câu sai của tôi</Link>
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Progress value={progressPercent} className="h-3 bg-slate-800 [&>div]:bg-emerald-400" />
          <span className="min-w-12 text-right text-sm font-semibold text-emerald-200">
            {progressPercent}%
          </span>
        </div>
      </section>

      {modules.map((grammarModule) => (
        <section key={grammarModule.id} aria-labelledby={`module-${grammarModule.id}`}>
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 font-bold text-white">
              {grammarModule.order}
            </span>
            <div>
              <h2 id={`module-${grammarModule.id}`} className="text-xl font-bold text-white sm:text-2xl">
                {grammarModule.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-400 sm:text-base">
                {grammarModule.description}
              </p>
            </div>
          </div>

          {grammarModule.lessons.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 px-5 py-8 text-center text-sm text-slate-400">
              Module này chưa có bài học.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {grammarModule.lessons.map((lesson) => {
                const isPublished = lesson.publicationStatus === 'published';
                const learningProgress = progressBySlug[lesson.slug];
                const learningStatus = learningProgress?.status ?? 'not-started';

                return (
                  <Card
                    key={lesson.slug}
                    id={`lesson-${lesson.slug}`}
                    className={`flex h-full flex-col bg-slate-900/80 transition-colors ${
                      isPublished
                        ? 'border-slate-700 hover:border-violet-400/60'
                        : 'border-slate-800 opacity-75'
                    }`}
                  >
                    <CardHeader className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-violet-300">
                          Bài {String(lesson.order).padStart(2, '0')}
                        </span>
                        {isPublished ? (
                          <LearningStatusBadge status={learningStatus} />
                        ) : (
                          <Badge variant="outline" className="border-slate-600 text-slate-400">
                            Sắp ra mắt
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="pt-2 text-lg leading-7 text-white">
                        {lesson.shortTitle ?? lesson.title}
                      </CardTitle>
                      {lesson.shortTitle && (
                        <p className="text-xs leading-5 text-slate-500">{lesson.title}</p>
                      )}
                      <CardDescription className="line-clamp-3 leading-6 text-slate-400">
                        {lesson.description}
                      </CardDescription>
                      {isPublished && learningProgress?.bestScore !== undefined && (
                        <p className="text-xs font-medium text-emerald-200">
                          Best score: {learningProgress.bestScore}% · {learningProgress.attempts} lần làm
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="mt-auto px-5 pb-4">
                      <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-4 w-4 text-amber-300" />
                          {lesson.estimatedMinutes} phút
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <ListChecks className="h-4 w-4 text-emerald-300" />
                          {lesson.exerciseCount > 0
                            ? `${lesson.exerciseCount} bài tập`
                            : 'Bài tập đang soạn'}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="px-5 pb-5">
                      <Button
                        asChild
                        className={`w-full text-white ${
                          isPublished
                            ? 'bg-violet-500 hover:bg-violet-400'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        <Link href={`/grammar/a1/${lesson.slug}`}>
                          {isPublished ? 'Học bài' : 'Xem thông tin'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
