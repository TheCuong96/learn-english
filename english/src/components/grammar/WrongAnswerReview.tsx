'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAcceptedAnswers } from '@/lib/grammar-exercises';
import { getWrongAnswers, type WrongAnswerRecord } from '@/lib/grammar-progress';

export default function WrongAnswerReview() {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswerRecord[]>([]);

  useEffect(() => {
    setWrongAnswers(getWrongAnswers());
  }, []);

  if (wrongAnswers.length === 0) {
    return (
      <Card className="border-slate-700 bg-slate-900/80">
        <CardHeader>
          <CardTitle className="text-white">Chưa có câu sai</CardTitle>
          <CardDescription className="leading-6 text-slate-400">
            Sau khi bạn hoàn thành mini test và có câu sai, các câu đó sẽ xuất hiện ở đây.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-6 text-slate-300">
          Đang lưu {wrongAnswers.length} câu sai từ các mini test A1.
        </p>
      </div>

      <div className="grid gap-4">
        {wrongAnswers.map((record, index) => (
          <Card
            key={`${record.lessonSlug}-${record.exerciseId}-${record.createdAt}-${index}`}
            className="border-slate-700 bg-slate-900/80"
          >
            <CardHeader className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-violet-400/40 text-violet-200">
                  {record.lessonSlug}
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {new Date(record.createdAt).toLocaleDateString('vi-VN')}
                </Badge>
              </div>
              <CardTitle className="pt-2 text-base leading-7 text-white">
                {record.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5 text-sm leading-6">
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-red-100">
                <span className="font-semibold text-white">Bạn trả lời:</span>{' '}
                {formatAcceptedAnswers(record.userAnswer)}
              </p>
              <p className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-emerald-100">
                <span className="font-semibold text-white">Đáp án đúng:</span>{' '}
                {formatAcceptedAnswers(record.correctAnswer)}
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-white">Giải thích:</span>{' '}
                {record.explanation}
              </p>
              <Link
                href={`/grammar/a1/${record.lessonSlug}`}
                className="inline-flex text-sm font-medium text-violet-300 hover:text-violet-200"
              >
                Ôn lại bài học
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
