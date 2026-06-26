import GrammarHeader from '@/components/grammar/GrammarHeader';
import { GRAMMAR_SHELL } from '@/components/grammar/grammar-shell';
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
import { A1_GRAMMAR_LESSON_COUNT, A1_GRAMMAR_MODULES } from '@/data/grammar/a1';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ngữ pháp tiếng Anh theo cấp độ | English Learning Hub',
  description:
    'Học ngữ pháp tiếng Anh theo cấp độ với giải thích tiếng Việt, ví dụ Anh–Việt và bài tập thực hành dễ hiểu.',
};

const upcomingLevels = [
  {
    level: 'A2',
    title: 'Ngữ pháp A2',
    description: 'Mở rộng cấu trúc câu và giao tiếp trong các tình huống quen thuộc.',
  },
  {
    level: 'B1',
    title: 'Ngữ pháp B1',
    description: 'Củng cố ngữ pháp trung cấp để diễn đạt tự nhiên và chính xác hơn.',
  },
];

export default function GrammarOverviewPage() {
  return (
    <>
      <GrammarHeader />

      <main className={`${GRAMMAR_SHELL} flex-grow py-8 sm:py-12`}>
        <section className="w-full text-center">
          <Badge className="mb-4 border-violet-400/30 bg-violet-500/15 text-violet-200">
            Grammar roadmap
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Học ngữ pháp tiếng Anh theo cấp độ
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-slate-300 sm:text-lg">
            Bắt đầu từ kiến thức nền tảng, học từng bài ngắn với giải thích tiếng Việt
            và luyện tập theo lộ trình rõ ràng.
          </p>
        </section>

        <section className="mt-10 grid w-full gap-5 lg:grid-cols-3" aria-label="Các cấp độ ngữ pháp">
          <Card className="border-violet-400/40 bg-gradient-to-b from-violet-500/20 to-slate-900 md:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="mb-3 bg-violet-500 text-white">Đang mở</Badge>
                  <CardTitle className="text-2xl text-white sm:text-3xl">A1 Grammar</CardTitle>
                  <CardDescription className="mt-2 text-slate-300">
                    Nền tảng ngữ pháp cho người mới bắt đầu, trình bày rõ ràng bằng tiếng Việt.
                  </CardDescription>
                </div>
                <Sparkles className="h-8 w-8 shrink-0 text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1.5">
                  {A1_GRAMMAR_MODULES.length} chủ điểm
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">
                  {A1_GRAMMAR_LESSON_COUNT} bài học
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5">
                  Ví dụ Anh–Việt
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full bg-violet-500 text-white hover:bg-violet-400 sm:w-auto">
                <Link href="/grammar/a1">
                  Khám phá A1 Grammar
                  <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-5">
            {upcomingLevels.map((item) => (
              <Card key={item.level} className="border-slate-700 bg-slate-900/70 opacity-80">
                <CardHeader className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl text-slate-200">{item.title}</CardTitle>
                    <Layers3 className="h-5 w-5 text-slate-500" />
                  </div>
                  <CardDescription className="text-slate-400">{item.description}</CardDescription>
                  <Badge variant="outline" className="mt-2 w-fit border-slate-600 text-slate-400">
                    Coming soon
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
