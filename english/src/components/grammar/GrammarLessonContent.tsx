import Navigation from '@/components/Navigation';
import LessonDiagram, { hasLessonDiagram } from '@/components/grammar/diagrams/LessonDiagram';
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

interface GrammarLessonContentProps {
  lesson: GrammarLesson;
  previousLesson?: GrammarLessonMetadata;
  nextLesson?: GrammarLessonMetadata;
}

function ExampleList({ examples }: { examples: GrammarExample[] }) {
  return (
    <div className="space-y-3">
      {examples.map((example, index) => (
        <div
          key={`${example.english}-${index}`}
          className="rounded-xl border border-slate-700/80 bg-slate-950/60 p-4"
        >
          <p className="font-medium leading-7 text-white">{example.english}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{example.vietnamese}</p>
        </div>
      ))}
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
        <div className="container mx-auto px-3 py-4 sm:px-4">
          <Link href="/grammar" className="inline-flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <BookOpen className="h-5 w-5 text-violet-400" />
            English Learning Hub
          </Link>
          <Navigation />
        </div>
      </header>

      <main className="container mx-auto flex-grow px-3 py-7 sm:px-4 sm:py-10">
        <article className="mx-auto max-w-5xl">
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
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
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
            <div className="mt-10 space-y-12">
              <section aria-labelledby="objectives-heading">
                <h2 id="objectives-heading" className="text-2xl font-bold text-white">
                  Mục tiêu bài học
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {lesson.objectives.map((objective) => (
                    <li key={objective} className="flex gap-3 rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                      <Target className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                      <span className="leading-7 text-slate-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {showMindMap && (
                <section aria-labelledby="mindmap-heading">
                  <h2 id="mindmap-heading" className="text-2xl font-bold text-white">
                    Sơ đồ tư duy
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Nhìn tổng thể am / is / are — khẳng định, phủ định, câu hỏi và trả lời ngắn.
                  </p>
                  <div className="mt-4">
                    <LessonDiagram lessonSlug={lesson.slug} />
                  </div>
                </section>
              )}

              {lesson.formulas.length > 0 && (
                <section aria-labelledby="formulas-heading">
                  <h2 id="formulas-heading" className="text-2xl font-bold text-white">
                    Công thức
                  </h2>
                  <div className="mt-4 space-y-5">
                    {lesson.formulas.map((formula) => (
                      <Card key={formula.title} className="overflow-hidden bg-slate-900/80">
                        <CardHeader className="border-b border-slate-700 bg-violet-500/10">
                          <h3 className="text-xl font-semibold text-white">{formula.title}</h3>
                          <code className="mt-3 block overflow-x-auto rounded-lg border border-violet-400/30 bg-slate-950 px-4 py-3 text-sm font-semibold text-violet-200 sm:text-base">
                            {formula.pattern}
                          </code>
                          <CardDescription className="pt-2 leading-7 text-slate-300">
                            {formula.explanation}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-5">
                          <h3 className="mb-3 font-semibold text-slate-200">Ví dụ theo công thức</h3>
                          <ExampleList examples={formula.examples} />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="usages-heading">
                <h2 id="usages-heading" className="text-2xl font-bold text-white">
                  Cách dùng
                </h2>
                <div className="mt-4 grid gap-5 lg:grid-cols-2">
                  {lesson.usages.map((usage) => (
                    <Card key={usage.title} className="bg-slate-900/80">
                      <CardHeader>
                        <h3 className="text-xl font-semibold leading-7 text-white">{usage.title}</h3>
                        <CardDescription className="leading-7 text-slate-300">
                          {usage.explanation}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ExampleList examples={usage.examples} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section aria-labelledby="examples-heading">
                <h2 id="examples-heading" className="text-2xl font-bold text-white">
                  Ví dụ Anh–Việt
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ExampleList examples={lesson.examples} />
                </div>
              </section>

              <section aria-labelledby="mistakes-heading">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-300" />
                  <h2 id="mistakes-heading" className="text-2xl font-bold text-white">
                    Lỗi người Việt thường gặp
                  </h2>
                </div>
                <div className="mt-4 space-y-4">
                  {lesson.commonMistakes.map((mistake, index) => (
                    <Card key={`${mistake.wrong}-${index}`} className="bg-slate-900/80">
                      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
                        <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-4">
                          <p className="flex items-center gap-2 text-sm font-bold text-red-300">
                            <X className="h-4 w-4" />
                            Sai
                          </p>
                          <p className="mt-2 font-medium leading-7 text-red-100">{mistake.wrong}</p>
                        </div>
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                          <p className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                            <Check className="h-4 w-4" />
                            Đúng
                          </p>
                          <p className="mt-2 font-medium leading-7 text-emerald-100">{mistake.correct}</p>
                        </div>
                        <p className="leading-7 text-slate-300 md:col-span-2">
                          <strong className="text-white">Vì sao?</strong> {mistake.explanation}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {lesson.quickNotes.length > 0 && !showMindMap && (
                <section aria-labelledby="notes-heading">
                  <Card className="border-sky-400/30 bg-sky-500/10">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-sky-300" />
                        <h2 id="notes-heading" className="text-2xl font-semibold text-white">
                          Ghi chú nhanh
                        </h2>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {lesson.quickNotes.map((note) => (
                          <li key={note} className="flex gap-3 leading-7 text-slate-300">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              )}

              <section aria-labelledby="practice-heading">
                <div className="mb-4">
                  <h2 id="practice-heading" className="text-2xl font-bold text-white">
                    Bài tập luyện tập
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Làm từng câu ngay trên trang, kiểm tra đáp án và đọc giải thích ngắn.
                  </p>
                </div>
                {lesson.exercises.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
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
                    <CardHeader>
                      <CardTitle className="text-white">Chưa có bài tập luyện tập</CardTitle>
                      <CardDescription className="text-slate-400">
                        Bài này chưa có câu hỏi trong data, nhưng trang vẫn hiển thị an toàn.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </section>

              <section aria-labelledby="mini-test-heading">
                <div className="mb-4">
                  <h2 id="mini-test-heading" className="text-2xl font-bold text-white">
                    Mini test cuối bài
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Tối đa 10 câu để rà lại kiến thức chính. Kết quả mini test sẽ được lưu vào tiến độ học trên thiết bị này.
                  </p>
                </div>
                <MiniTest lessonSlug={lesson.slug} exercises={lesson.miniTest} />
              </section>

              <section aria-labelledby="summary-heading">
                <Card className="border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-slate-900">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <BookCheck className="h-6 w-6 text-emerald-300" />
                      <h2 id="summary-heading" className="text-2xl font-semibold text-white">
                        Tóm tắt cuối bài
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {lesson.summary.keyPoints.map((point) => (
                        <li key={point} className="flex gap-3 leading-7 text-slate-200">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {lesson.summary.rememberSentences.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-white">Câu nên nhớ</h3>
                        <ExampleList examples={lesson.summary.rememberSentences} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              <LessonNavigation previousLesson={previousLesson} nextLesson={nextLesson} />
            </div>
          )}
        </article>
      </main>
    </>
  );
}
