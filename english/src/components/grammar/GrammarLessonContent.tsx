import Navigation from '@/components/Navigation';
import LessonDiagram, { hasLessonDiagram } from '@/components/grammar/diagrams/LessonDiagram';
import { GRAMMAR_SHELL } from '@/components/grammar/grammar-shell';
import LessonProgressMarker from '@/components/grammar/LessonProgressMarker';
import ExerciseRenderer from '@/components/grammar/exercises/ExerciseRenderer';
import MiniTest from '@/components/grammar/exercises/MiniTest';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type {
  GrammarConceptSection,
  GrammarExample,
  GrammarLesson,
  GrammarLessonMetadata,
} from '@/types/grammar';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookCheck,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Construction,
  Lightbulb,
  ListChecks,
  Target,
  X,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface GrammarLessonContentProps {
  lesson: GrammarLesson;
  previousLesson?: GrammarLessonMetadata;
  nextLesson?: GrammarLessonMetadata;
}

function ExampleList({
  examples,
  compact = false,
}: {
  examples: GrammarExample[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'space-y-1.5' : 'space-y-3'}>
      {examples.map((example, index) => (
        <div
          key={`${example.english}-${index}`}
          className={
            compact
              ? 'rounded-lg border border-slate-700/80 bg-slate-950/60 px-2.5 py-2'
              : 'rounded-xl border border-slate-700/80 bg-slate-950/60 p-4'
          }
        >
          <p className={compact ? 'text-sm leading-6 text-white' : 'font-medium leading-7 text-white'}>
            {example.english}
          </p>
          <p className={compact ? 'mt-0.5 text-xs leading-5 text-slate-400' : 'mt-1 text-sm leading-6 text-slate-400'}>
            {example.vietnamese}
          </p>
        </div>
      ))}
    </div>
  );
}

function ConceptSections({ sections }: { sections: GrammarConceptSection[] }) {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <Card key={section.title} className="bg-slate-900/80">
          <CardHeader className="p-3 pb-2">
            <h3 className="text-base font-semibold leading-6 text-white">{section.title}</h3>
            {section.explanation && (
              <CardDescription className="text-xs leading-5 text-slate-300">
                {section.explanation}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-2 p-3 pt-0">
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-1">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm font-medium text-violet-200">
                    <span className="text-slate-500">‣</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {section.examples && section.examples.length > 0 && (
              <ExampleList examples={section.examples} compact />
            )}
            {section.pairs && section.pairs.length > 0 && (
              <div className="space-y-2">
                {section.pairs.map((pair) => (
                  <div key={`${pair.correct}-${pair.wrong}`} className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-2">
                      <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase text-emerald-300">
                        <Check className="h-3 w-3" />
                        Đúng
                      </p>
                      <p className="mt-1 text-sm text-emerald-100">{pair.correct}</p>
                    </div>
                    <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 py-2">
                      <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase text-red-300">
                        <X className="h-3 w-3" />
                        Sai
                      </p>
                      <p className="mt-1 text-sm text-red-100">{pair.wrong}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SectionHeading({
  id,
  title,
  description,
  icon,
}: {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-2.5">
      <h2 id={id} className="flex items-center gap-2 text-lg font-bold text-white">
        {icon}
        {title}
      </h2>
      {description && (
        <p className="mt-0.5 text-xs leading-5 text-slate-400">{description}</p>
      )}
    </div>
  );
}

function LessonNavigation({
  previousLesson,
  nextLesson,
}: Pick<GrammarLessonContentProps, 'previousLesson' | 'nextLesson'>) {
  return (
    <nav
      aria-label="Điều hướng bài học"
      className="grid gap-3 border-t border-slate-700 pt-6 sm:grid-cols-2"
    >
      {previousLesson ? (
        <Button asChild variant="outline" className="h-auto justify-start border-slate-600 bg-slate-900 px-4 py-3 text-left text-slate-200">
          <Link href={`/grammar/a1/${previousLesson.slug}`}>
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span>
              <span className="block text-xs text-slate-400">Bài trước</span>
              <span className="line-clamp-1">{previousLesson.shortTitle ?? previousLesson.title}</span>
            </span>
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextLesson && (
        <Button asChild variant="outline" className="h-auto justify-end border-slate-600 bg-slate-900 px-4 py-3 text-right text-slate-200">
          <Link href={`/grammar/a1/${nextLesson.slug}`}>
            <span>
              <span className="block text-xs text-slate-400">Bài tiếp theo</span>
              <span className="line-clamp-1">{nextLesson.shortTitle ?? nextLesson.title}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </Button>
      )}
    </nav>
  );
}

export default function GrammarLessonContent({
  lesson,
  previousLesson,
  nextLesson,
}: GrammarLessonContentProps) {
  const isPublished = lesson.status === 'published';
  const showMindMap = hasLessonDiagram(lesson.slug);

  return (
    <>
      <LessonProgressMarker lessonSlug={lesson.slug} enabled={isPublished} />

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
        <article className="w-full">
          <Link
            href="/grammar/a1"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Danh sách A1 Grammar
          </Link>

          <header className="mt-6 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 via-slate-900 to-slate-950 p-5 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-violet-500 text-white">CEFR {lesson.level}</Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                Bài {String(lesson.order).padStart(2, '0')}
              </Badge>
              {!isPublished && (
                <Badge variant="outline" className="border-amber-400/40 bg-amber-500/10 text-amber-200">
                  Đang biên soạn
                </Badge>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {lesson.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              {lesson.description}
            </p>
            <dl className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <BookCheck className="h-4 w-4 text-violet-300" />
                <dt className="sr-only">Module</dt>
                <dd>{lesson.moduleTitle}</dd>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <Clock3 className="h-4 w-4 text-amber-300" />
                <dt className="sr-only">Thời lượng</dt>
                <dd>{lesson.estimatedMinutes} phút</dd>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <ListChecks className="h-4 w-4 text-emerald-300" />
                <dt className="sr-only">Số bài tập</dt>
                <dd>{lesson.exercises.length + lesson.miniTest.length} câu luyện tập</dd>
              </div>
            </dl>
          </header>

          {!isPublished ? (
            <div className="mt-8 space-y-6">
              <Card className="border-amber-400/30 bg-amber-500/10">
                <CardHeader>
                  <Construction className="h-9 w-9 text-amber-300" />
                  <CardTitle className="pt-2 text-xl text-white">
                    Nội dung chi tiết đang được biên soạn
                  </CardTitle>
                  <CardDescription className="leading-7 text-slate-300">
                    Khung bài học đã có trong lộ trình. Công thức, ví dụ và bài tập sẽ được bổ sung
                    trước khi bài chuyển sang trạng thái xuất bản.
                  </CardDescription>
                </CardHeader>
              </Card>

              <section aria-labelledby="placeholder-objectives">
                <h2 id="placeholder-objectives" className="text-2xl font-bold text-white">
                  Bạn sẽ học gì?
                </h2>
                <ul className="mt-4 space-y-3">
                  {lesson.objectives.map((objective) => (
                    <li key={objective} className="flex gap-3 rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-slate-300">
                      <Target className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                      <span className="leading-7">{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <LessonNavigation previousLesson={previousLesson} nextLesson={nextLesson} />
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <section aria-labelledby="objectives-heading">
                <SectionHeading id="objectives-heading" title="Mục tiêu bài học" />
                <ul className="flex flex-wrap gap-2">
                  {lesson.objectives.map((objective) => (
                    <li
                      key={objective}
                      className="inline-flex max-w-full items-start gap-1.5 rounded-lg border border-slate-700 bg-slate-900/70 px-2.5 py-1.5 text-xs leading-5 text-slate-300 sm:text-sm"
                    >
                      <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start xl:gap-6">
                {/* Cột trái: công thức, sơ đồ, ghi chú */}
                <div className="space-y-5">
                  {lesson.conceptSections && lesson.conceptSections.length > 0 && (
                    <section aria-labelledby="concepts-heading">
                      <SectionHeading
                        id="concepts-heading"
                        title="Giới thiệu động từ be"
                        description="Ghi chú bằng tiếng Việt — ví dụ demo giữ nguyên tiếng Anh."
                      />
                      <ConceptSections sections={lesson.conceptSections} />
                    </section>
                  )}

                  {showMindMap && (
                    <section aria-labelledby="mindmap-heading">
                      <SectionHeading
                        id="mindmap-heading"
                        title="Sơ đồ tư duy"
                        description="Am / is / are — khẳng định, phủ định, câu hỏi, trả lời ngắn."
                      />
                      <LessonDiagram lessonSlug={lesson.slug} compact />
                    </section>
                  )}

                  {lesson.formulas.length > 0 && (
                    <section aria-labelledby="formulas-heading">
                      <SectionHeading id="formulas-heading" title="Công thức" />
                      <div className="space-y-3">
                        {lesson.formulas.map((formula) => (
                          <Card key={formula.title} className="overflow-hidden bg-slate-900/80">
                            <CardHeader className="space-y-1 border-b border-slate-700 bg-violet-500/10 p-3">
                              <h3 className="text-base font-semibold text-white">{formula.title}</h3>
                              <code className="block overflow-x-auto rounded-md border border-violet-400/30 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-violet-200">
                                {formula.pattern}
                              </code>
                              <CardDescription className="text-xs leading-5 text-slate-300">
                                {formula.explanation}
                              </CardDescription>
                            </CardHeader>
                            {formula.examples.length > 0 && (
                              <CardContent className="p-3">
                                <ExampleList examples={formula.examples} compact />
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  {lesson.quickNotes.length > 0 && !showMindMap && (
                    <section aria-labelledby="notes-heading">
                      <Card className="border-sky-400/30 bg-sky-500/10">
                        <CardHeader className="flex-row items-center gap-2 space-y-0 p-3">
                          <Lightbulb className="h-5 w-5 text-sky-300" />
                          <h2 id="notes-heading" className="text-lg font-semibold text-white">
                            Ghi chú nhanh
                          </h2>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <ul className="space-y-1.5">
                            {lesson.quickNotes.map((note) => (
                              <li key={note} className="flex gap-2 text-xs leading-5 text-slate-300 sm:text-sm">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-300" />
                                {note}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </section>
                  )}

                  {lesson.usages.length > 0 && (
                    <section aria-labelledby="usages-heading">
                      <SectionHeading id="usages-heading" title="Cách dùng" />
                      <div className="space-y-3">
                        {lesson.usages.map((usage) => (
                          <Card key={usage.title} className="bg-slate-900/80">
                            <CardHeader className="p-3 pb-2">
                              <h3 className="text-base font-semibold leading-6 text-white">{usage.title}</h3>
                              <CardDescription className="text-xs leading-5 text-slate-300">
                                {usage.explanation}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <ExampleList examples={usage.examples} compact />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  {lesson.examples.length > 0 && (
                    <section aria-labelledby="examples-heading">
                      <SectionHeading id="examples-heading" title="Ví dụ Anh–Việt" />
                      <ExampleList examples={lesson.examples} compact />
                    </section>
                  )}

                  {lesson.commonMistakes.length > 0 && (
                    <section aria-labelledby="mistakes-heading">
                      <SectionHeading
                        id="mistakes-heading"
                        title="Lỗi người Việt thường gặp"
                        icon={<AlertTriangle className="h-5 w-5 text-amber-300" />}
                      />
                      <div className="space-y-3">
                        {lesson.commonMistakes.map((mistake, index) => (
                          <Card key={`${mistake.wrong}-${index}`} className="bg-slate-900/80">
                            <CardContent className="grid gap-2.5 p-3 sm:grid-cols-2">
                              <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-2.5">
                                <p className="flex items-center gap-1.5 text-xs font-bold text-red-300">
                                  <X className="h-3.5 w-3.5" />
                                  Sai
                                </p>
                                <p className="mt-1 text-sm leading-6 text-red-100">{mistake.wrong}</p>
                              </div>
                              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-2.5">
                                <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                                  <Check className="h-3.5 w-3.5" />
                                  Đúng
                                </p>
                                <p className="mt-1 text-sm leading-6 text-emerald-100">{mistake.correct}</p>
                              </div>
                              <p className="text-xs leading-5 text-slate-300 sm:col-span-2">
                                <strong className="text-white">Vì sao?</strong> {mistake.explanation}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  )}

                  <section aria-labelledby="summary-heading">
                    <Card className="border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-slate-900">
                      <CardHeader className="flex-row items-center gap-2 space-y-0 p-3">
                        <BookCheck className="h-5 w-5 text-emerald-300" />
                        <h2 id="summary-heading" className="text-lg font-semibold text-white">
                          Tóm tắt cuối bài
                        </h2>
                      </CardHeader>
                      <CardContent className="space-y-3 p-3 pt-0">
                        <ul className="space-y-1.5">
                          {lesson.summary.keyPoints.map((point) => (
                            <li key={point} className="flex gap-2 text-xs leading-5 text-slate-200 sm:text-sm">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        {lesson.summary.rememberSentences.length > 0 && (
                          <div>
                            <h3 className="mb-2 text-sm font-semibold text-white">Câu nên nhớ</h3>
                            <ExampleList examples={lesson.summary.rememberSentences} compact />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </section>
                </div>

                {/* Cột phải: bài tập — sticky trên desktop */}
                <div className="space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto lg:pr-1">
                  <section aria-labelledby="practice-heading">
                    <SectionHeading
                      id="practice-heading"
                      title="Bài tập luyện tập"
                      description="Làm từng câu, kiểm tra đáp án và đọc giải thích ngắn."
                    />
                    {lesson.exercises.length > 0 ? (
                      <div className="space-y-3">
                        {lesson.exercises.map((exercise, index) => (
                          <ExerciseRenderer
                            key={exercise.id}
                            exercise={exercise}
                            questionNumber={index + 1}
                          />
                        ))}
                      </div>
                    ) : (
                      <Card className="border-slate-700 bg-slate-900/80">
                        <CardHeader className="p-3">
                          <CardTitle className="text-base text-white">Chưa có bài tập luyện tập</CardTitle>
                          <CardDescription className="text-xs text-slate-400">
                            Bài này chưa có câu hỏi trong data, nhưng trang vẫn hiển thị an toàn.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )}
                  </section>

                  <section aria-labelledby="mini-test-heading">
                    <SectionHeading
                      id="mini-test-heading"
                      title="Mini test cuối bài"
                      description="Tối đa 10 câu. Kết quả được lưu vào tiến độ học trên thiết bị này."
                    />
                    <MiniTest lessonSlug={lesson.slug} exercises={lesson.miniTest} />
                  </section>
                </div>
              </div>

              <LessonNavigation previousLesson={previousLesson} nextLesson={nextLesson} />
            </div>
          )}
        </article>
      </main>
    </>
  );
}
