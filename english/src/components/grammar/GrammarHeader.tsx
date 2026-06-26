import Navigation from '@/components/Navigation';
import VoiceSelector from '@/components/VoiceSelector';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

import { GRAMMAR_SHELL } from './grammar-shell';

export default function GrammarHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className={`${GRAMMAR_SHELL} py-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/grammar" className="inline-flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <BookOpen className="h-5 w-5 text-violet-400" />
            English Learning Hub
          </Link>
          <div className="w-full sm:w-auto sm:min-w-[260px]">
            <VoiceSelector />
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
