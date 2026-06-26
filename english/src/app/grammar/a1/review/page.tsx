import Navigation from '@/components/Navigation';
import WrongAnswerReview from '@/components/grammar/WrongAnswerReview';
import { GRAMMAR_SHELL } from '@/components/grammar/grammar-shell';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Câu sai của tôi – A1 Grammar | English Learning Hub',
  description:
    'Xem lại các câu sai trong mini test A1 Grammar để ôn tập đúng trọng tâm.',
};

export default function A1GrammarReviewPage() {
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
            href="/grammar/a1"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại A1 Grammar
          </Link>

          <section className="mt-6 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 via-slate-900 to-slate-950 p-5 sm:p-8">
            <Badge className="bg-violet-500 text-white">A1 Review</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Câu sai của tôi
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-300 sm:text-lg">
              Tập trung ôn lại những câu bạn đã trả lời sai trong mini test.
            </p>
          </section>

          <section className="mt-8">
            <WrongAnswerReview />
          </section>
        </div>
      </main>
    </>
  );
}
