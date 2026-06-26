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
    <div className={`h-full overflow-hidden rounded-2xl border ${border} ${bg}`}>
      <div className={`border-b px-3 py-2.5 sm:px-4 sm:py-3 ${accent}`}>
        <h3 className="text-sm font-bold tracking-wide text-white sm:text-base lg:text-lg">{title}</h3>
        <p className="text-[0.65rem] font-medium uppercase tracking-wider text-white/70 sm:text-xs">{subtitle}</p>
      </div>
      <div className="space-y-0 px-3 py-2 sm:px-4 sm:py-3">{children}</div>
    </div>
  );
}

interface PronounRowProps {
  subject: string;
  forms: React.ReactNode;
}

function PronounRow({ subject, forms }: PronounRowProps) {
  return (
    <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 gap-y-0.5 border-b border-white/10 py-1.5 last:border-0 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-3 sm:py-2 xl:grid-cols-[2.5rem_minmax(0,1fr)]">
      <span className="text-sm font-bold text-white sm:text-base">{subject}</span>
      <span className="text-xs leading-5 text-slate-100 sm:text-sm sm:leading-6">{forms}</span>
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
export default function PresentSimpleToBeMindMap({ compact = false }: { compact?: boolean }) {
  const branchGridClass = compact
    ? 'grid w-full grid-cols-1 gap-2 sm:grid-cols-2'
    : 'grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4';

  return (
    <div
      className={`w-full ${compact ? 'space-y-2' : 'space-y-4 sm:space-y-5'}`}
      role="img"
      aria-label="Sơ đồ tư duy Present Simple of be"
    >
      {/* Hub trung tâm — chọn am / is / are */}
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/30 via-slate-900 to-slate-950 text-center shadow-lg shadow-violet-500/10 ${
          compact ? 'p-2.5' : 'rounded-2xl p-4 sm:p-5'
        }`}
      >
        {!compact && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            Present Simple of BE
          </p>
        )}
        <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'mt-1 text-xl sm:text-2xl'}`}>
          Chọn am / is / are
        </h3>
        {!compact && <p className="mt-1 text-sm text-slate-400">Subject agreement</p>}

        <div className={`grid w-full gap-2 ${compact ? 'mt-2 grid-cols-3' : 'mt-4 grid-cols-1 gap-3 sm:grid-cols-3'}`}>
          <div className={`rounded-lg border border-sky-400/30 bg-sky-500/10 ${compact ? 'px-2 py-1.5' : 'rounded-xl px-4 py-3'}`}>
            <p className="text-[0.6rem] font-medium uppercase tracking-wide text-sky-300 sm:text-xs">I</p>
            <p className={`font-bold text-white ${compact ? 'text-sm' : 'mt-1 text-lg'}`}>am</p>
          </div>
          <div className={`rounded-lg border border-emerald-400/30 bg-emerald-500/10 ${compact ? 'px-2 py-1.5' : 'rounded-xl px-4 py-3'}`}>
            <p className="text-[0.6rem] font-medium uppercase tracking-wide text-emerald-300 sm:text-xs">
              he · she · it
            </p>
            <p className={`font-bold text-white ${compact ? 'text-sm' : 'mt-1 text-lg'}`}>is</p>
          </div>
          <div className={`rounded-lg border border-amber-400/30 bg-amber-500/10 ${compact ? 'px-2 py-1.5' : 'rounded-xl px-4 py-3'}`}>
            <p className="text-[0.6rem] font-medium uppercase tracking-wide text-amber-300 sm:text-xs">
              you · we · they
            </p>
            <p className={`font-bold text-white ${compact ? 'text-sm' : 'mt-1 text-lg'}`}>are</p>
          </div>
        </div>

        {!compact && (
          <div className="mx-auto mt-5 hidden h-6 w-px bg-violet-400/40 sm:block" aria-hidden />
        )}
      </div>

      {/* 4 nhánh chính */}
      <div className={branchGridClass}>
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
      <div
        className={`w-full rounded-xl border border-amber-400/40 bg-amber-500/10 ${
          compact ? 'p-2.5' : 'rounded-2xl p-4 sm:p-5'
        }`}
      >
        <p className={`text-center font-bold uppercase tracking-wide text-amber-200 ${compact ? 'text-[0.65rem]' : 'text-sm'}`}>
          Quy tắc quan trọng
        </p>
        <p className={`text-center font-semibold text-white ${compact ? 'mt-1 text-xs' : 'mt-2 text-base'}`}>
          Câu trả lời ngắn khẳng định không dùng dạng viết tắt
        </p>
        <div className={`grid gap-2 ${compact ? 'mt-2 grid-cols-1' : 'mt-4 gap-3 sm:grid-cols-2'}`}>
          <div className={`flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-500/10 ${compact ? 'p-2' : 'gap-3 rounded-xl p-3'}`}>
            <X className={`shrink-0 text-red-400 ${compact ? 'mt-0.5 h-4 w-4' : 'mt-0.5 h-5 w-5'}`} />
            <div>
              <p className="text-[0.65rem] font-medium text-red-300 sm:text-xs">Sai</p>
              <p className={`font-medium text-red-100 ${compact ? 'mt-0.5 text-xs' : 'mt-1'}`}>
                Are you happy? — Yes, I&apos;m.
              </p>
            </div>
          </div>
          <div className={`flex items-start gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 ${compact ? 'p-2' : 'gap-3 rounded-xl p-3'}`}>
            <Check className={`shrink-0 text-emerald-400 ${compact ? 'mt-0.5 h-4 w-4' : 'mt-0.5 h-5 w-5'}`} />
            <div>
              <p className="text-[0.65rem] font-medium text-emerald-300 sm:text-xs">Đúng</p>
              <p className={`font-medium text-emerald-100 ${compact ? 'mt-0.5 text-xs' : 'mt-1'}`}>
                Are you happy? — Yes, I am.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
