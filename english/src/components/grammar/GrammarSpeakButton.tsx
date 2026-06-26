'use client';

import { Button } from '@/components/ui/button';
import { speak } from '@/utils/speech';
import { Volume2 } from 'lucide-react';

interface GrammarSpeakButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function GrammarSpeakButton({
  text,
  label = 'Nghe phát âm',
  className = '',
}: GrammarSpeakButtonProps) {
  const normalizedText = text.trim();

  if (!normalizedText) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => speak(normalizedText)}
      className={`h-8 w-8 shrink-0 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-violet-500/20 hover:text-violet-100 ${className}`}
      aria-label={label}
      title={label}
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  );
}
