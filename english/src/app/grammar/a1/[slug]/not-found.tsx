import GrammarHeader from '@/components/grammar/GrammarHeader';
import { GRAMMAR_SHELL } from '@/components/grammar/grammar-shell';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function LessonNotFound() {
  return (
    <>
      <GrammarHeader />

      <main className={`${GRAMMAR_SHELL} flex flex-grow items-center justify-center py-16`}>
        <section className="max-w-lg rounded-2xl border border-slate-700 bg-slate-900/80 p-7 text-center sm:p-10">
          <SearchX className="mx-auto h-12 w-12 text-violet-300" />
          <h1 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Không tìm thấy bài học
          </h1>
          <p className="mt-3 leading-7 text-slate-400">
            Đường dẫn này không thuộc lộ trình A1 Grammar hoặc bài học đã được di chuyển.
          </p>
          <Button asChild className="mt-6 bg-violet-500 text-white hover:bg-violet-400">
            <Link href="/grammar/a1">Quay lại danh sách A1</Link>
          </Button>
        </section>
      </main>
    </>
  );
}
