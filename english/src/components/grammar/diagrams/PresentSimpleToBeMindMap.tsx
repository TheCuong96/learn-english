import { Check, X } from 'lucide-react';

interface MindMapSectionProps {
  title: string;
  subtitle: string;
  accent: string;
  border: string;
  bg: string;
  children: React.ReactNode;
}

/** Một nhánh trên sơ đồ — hiển thị tiêu đề song ngữ và nội dung dạng bảng gọn. */
function MindMapSection({
  title,
  subtitle,
  accent,
  border,
  bg,
  children,
}: MindMapSectionProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border ${border} ${bg}`}>
      <div className={`border-b px-4 py-3 ${accent}`}>
        <h3 className="text-base font-bold tracking-wide text-white sm:text-lg">{title}</h3>
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">{subtitle}</p>
      </div>
      <div className="space-y-0 px-4 py-3">{children}</div>
    </div>
  );
}

interface PronounRowProps {
  subject: string;
  forms: React.ReactNode;
}

function PronounRow({ subject, forms }: PronounRowProps) {
  return (
    <div className="grid grid-cols-[3.25rem_1fr] gap-x-3 gap-y-0.5 border-b border-white/10 py-2 last:border-0 sm:grid-cols-[4rem_1fr]">
      <span className="font-bold text-white">{subject}</span>
      <span className="text-sm leading-6 text-slate-100">{forms}</span>
    </div>
  );
}

function FormPair({ full, short }: { full: string; short?: string }) {
  return (
    <span>
      <strong className="font-semibold text-white">{full}</strong>
      {short && (
        <>
          <span className="mx-1.5 text-slate-500">/</span>
          <span className="text-violet-200">{short}</span>
        </>
      )}
    </span>
  );
}

/** Sơ đồ tư duy tổng: am / is / are — khẳng định, phủ định, câu hỏi, trả lời ngắn. */
export default function PresentSimpleToBeMindMap() {
  return (
    <div className="space-y-5" role="img" aria-label="Sơ đồ tư duy Present Simple of be">
      {/* Hub trung tâm — chọn am / is / are */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-slate-900 to-slate-950 p-5 text-center shadow-lg shadow-violet-500/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Present Simple of BE
        </p>
        <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
          Chọn am / is / are
        </h3>
        <p className="mt-1 text-sm text-slate-400">Subject agreement</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-sky-300">I</p>
            <p className="mt-1 text-lg font-bold text-white">am</p>
          </div>
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">
              he · she · it
            </p>
            <p className="mt-1 text-lg font-bold text-white">is</p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-300">
              you · we · they
            </p>
            <p className="mt-1 text-lg font-bold text-white">are</p>
          </div>
        </div>

        {/* Nhánh nối xuống 4 khối */}
        <div className="mx-auto mt-5 hidden h-6 w-px bg-violet-400/40 sm:block" aria-hidden />
      </div>

      {/* 4 nhánh chính — 2×2 */}
      <div className="relative grid gap-4 lg:grid-cols-2">
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-600/40 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-slate-600/40 lg:block"
          aria-hidden
        />

        <MindMapSection
          title="Khẳng định"
          subtitle="Positive"
          accent="bg-sky-500/25"
          border="border-sky-400/35"
          bg="bg-sky-500/5"
        >
          <PronounRow subject="I" forms={<FormPair full="am" short="I'm" />} />
          <PronounRow subject="You" forms={<FormPair full="are" short="you're" />} />
          <PronounRow subject="He" forms={<FormPair full="is" short="he's" />} />
          <PronounRow subject="She" forms={<FormPair full="is" short="she's" />} />
          <PronounRow subject="It" forms={<FormPair full="is" short="it's" />} />
          <PronounRow subject="We" forms={<FormPair full="are" short="we're" />} />
          <PronounRow subject="They" forms={<FormPair full="are" short="they're" />} />
        </MindMapSection>

        <MindMapSection
          title="Phủ định"
          subtitle="Negative"
          accent="bg-orange-500/25"
          border="border-orange-400/35"
          bg="bg-orange-500/5"
        >
          <PronounRow subject="I" forms={<FormPair full="am not" short="I'm not" />} />
          <PronounRow
            subject="You"
            forms={
              <>
                <FormPair full="are not" short="you're not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">aren&apos;t</span>
              </>
            }
          />
          <PronounRow
            subject="He"
            forms={
              <>
                <FormPair full="is not" short="he's not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">isn&apos;t</span>
              </>
            }
          />
          <PronounRow
            subject="She"
            forms={
              <>
                <FormPair full="is not" short="she's not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">isn&apos;t</span>
              </>
            }
          />
          <PronounRow
            subject="It"
            forms={
              <>
                <FormPair full="is not" short="it's not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">isn&apos;t</span>
              </>
            }
          />
          <PronounRow
            subject="We"
            forms={
              <>
                <FormPair full="are not" short="we're not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">aren&apos;t</span>
              </>
            }
          />
          <PronounRow
            subject="They"
            forms={
              <>
                <FormPair full="are not" short="they're not" />
                <span className="mx-1.5 text-slate-500">/</span>
                <span className="text-orange-200">aren&apos;t</span>
              </>
            }
          />
        </MindMapSection>

        <MindMapSection
          title="Câu hỏi"
          subtitle="Question"
          accent="bg-violet-500/25"
          border="border-violet-400/35"
          bg="bg-violet-500/5"
        >
          <PronounRow subject="I" forms={<strong className="text-white">Am I …?</strong>} />
          <PronounRow subject="You" forms={<strong className="text-white">Are you …?</strong>} />
          <PronounRow subject="He" forms={<strong className="text-white">Is he …?</strong>} />
          <PronounRow subject="She" forms={<strong className="text-white">Is she …?</strong>} />
          <PronounRow subject="It" forms={<strong className="text-white">Is it …?</strong>} />
          <PronounRow subject="We" forms={<strong className="text-white">Are we …?</strong>} />
          <PronounRow subject="They" forms={<strong className="text-white">Are they …?</strong>} />
        </MindMapSection>

        <MindMapSection
          title="Trả lời ngắn"
          subtitle="Short answer"
          accent="bg-yellow-500/20"
          border="border-yellow-400/35"
          bg="bg-yellow-500/5"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-yellow-200/90">
            Khẳng định — chỉ dạng đầy đủ
          </p>
          <PronounRow subject="I" forms="Yes, I am." />
          <PronounRow subject="You" forms="Yes, you are." />
          <PronounRow subject="He" forms="Yes, he is." />
          <PronounRow subject="She" forms="Yes, she is." />
          <PronounRow subject="It" forms="Yes, it is." />
          <PronounRow subject="We" forms="Yes, we are." />
          <PronounRow subject="They" forms="Yes, they are." />

          <p className="mb-2 mt-4 border-t border-white/10 pt-3 text-xs font-semibold uppercase tracking-wide text-yellow-200/90">
            Phủ định — có thể viết tắt
          </p>
          <PronounRow subject="I" forms="No, I&apos;m not." />
          <PronounRow subject="He" forms="No, he isn&apos;t. / No, he&apos;s not." />
          <PronounRow subject="They" forms="No, they aren&apos;t. / No, they&apos;re not." />
        </MindMapSection>
      </div>

      {/* Quy tắc quan trọng */}
      <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 sm:p-5">
        <p className="text-center text-sm font-bold uppercase tracking-wide text-amber-200">
          Quy tắc quan trọng
        </p>
        <p className="mt-2 text-center text-base font-semibold text-white">
          Câu trả lời ngắn khẳng định không dùng dạng viết tắt
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div>
              <p className="text-xs font-medium text-red-300">Sai</p>
              <p className="mt-1 font-medium text-red-100">
                Are you happy? — Yes, I&apos;m.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <p className="text-xs font-medium text-emerald-300">Đúng</p>
              <p className="mt-1 font-medium text-emerald-100">
                Are you happy? — Yes, I am.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
