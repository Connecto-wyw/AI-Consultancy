"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, BrainCircuit, CheckCircle2, FileText, Loader2, Sparkles, Target, Compass, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function CaseWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { t } = useLanguage();

  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    async function fetchCase() {
      try {
        const res = await fetch(`/api/cases/${id}`);
        const data = await res.json();
        setCaseData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [id]);

  useEffect(() => {
    if (!loading && caseData?.case_outputs) {
      const timers = [
        setTimeout(() => setStep(1), 800),
        setTimeout(() => setStep(2), 2500),
        setTimeout(() => setStep(3), 4200),
        setTimeout(() => setStep(4), 6000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [loading, caseData]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8" /></div>;
  if (!caseData || caseData.error) return <div className="min-h-screen flex items-center justify-center text-white">{t.thinReport.notFound}</div>;

  const out = caseData.case_outputs;

  const StepLoader = ({ title, active }: { title: string, active: boolean }) => (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${active ? 'bg-white/5 border-white/10' : 'bg-black/40 border-white/5 opacity-50 grayscale'}`}>
      {active ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Loader2 className="w-5 h-5 text-zinc-500 animate-[spin_3s_linear_infinite]" />}
      <span className={`font-semibold text-sm ${active ? 'text-zinc-200' : 'text-zinc-500'}`}>{title}</span>
    </div>
  );

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto space-y-8 pb-40">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t.thinIntake.back}
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{t.thinReport.title}</h1>
        <p className="text-zinc-400 text-sm mt-1">{t.thinReport.focus} <span className="text-purple-400 font-medium capitalize">{caseData.consulting_type}</span></p>
      </div>

      <section className="glass p-6 rounded-2xl border border-white/5">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-400" />
          {t.thinReport.inputLabel}
        </h2>
        <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">{caseData.input_text}</p>
      </section>

      {step < 4 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StepLoader title={t.thinReport.step1} active={step >= 1} />
          <StepLoader title={t.thinReport.step2} active={step >= 2} />
          <StepLoader title={t.thinReport.step3} active={step >= 3} />
          <StepLoader title={t.thinReport.step4} active={step >= 4} />
        </div>
      )}

      <div className="space-y-12 transition-all duration-1000 relative">

        <section className={`transition-all duration-700 ease-out ${step >= 1 ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <BrainCircuit className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{t.thinReport.rootDiagnosis}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{t.thinReport.probRef}</h3>
              <div className="p-6 bg-black/40 border border-purple-500/20 rounded-2xl h-full shadow-inner">
                <p className="text-zinc-200 leading-relaxed font-medium text-sm">{out?.diagnosis_json?.problem_definition}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t.thinReport.rootCauses}</h3>
                <ul className="space-y-2">
                  {out?.diagnosis_json?.root_causes?.map((cause: string, i: number) => (
                    <li key={i} className="flex gap-3 text-zinc-300 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-purple-400 font-bold">•</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t.thinReport.priority}</h3>
                <div className="flex flex-wrap gap-2">
                  {out?.diagnosis_json?.priority?.map((p: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-semibold whitespace-nowrap">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`transition-all duration-700 ease-out delay-100 ${step >= 2 ? 'opacity-100 translate-y-0 relative mt-12' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Compass className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{t.thinReport.stratDir}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border-blue-500/20 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{t.thinReport.coreDir}</h3>
              <p className="text-zinc-200 text-sm leading-relaxed">{out?.strategy_json?.direction}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-emerald-500/20 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{t.thinReport.positioning}</h3>
              <p className="text-zinc-200 text-sm leading-relaxed">{out?.strategy_json?.positioning}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-orange-500/20 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{t.thinReport.scope}</h3>
              <p className="text-zinc-200 text-sm leading-relaxed">{out?.strategy_json?.scope}</p>
            </div>
          </div>
        </section>

        <section className={`transition-all duration-700 ease-out delay-100 ${step >= 3 ? 'opacity-100 translate-y-0 relative mt-12' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Target className="w-8 h-8 text-orange-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{t.thinReport.actionPlan}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {out?.deliverables_json?.action_plan?.map((plan: string, i: number) => (
              <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-zinc-200 text-sm leading-relaxed pt-1.5">{plan}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`transition-all duration-700 ease-out delay-100 ${step >= 4 ? 'opacity-100 translate-y-0 relative mt-12' : 'opacity-0 translate-y-10 pointer-events-none absolute w-full'}`}>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">{t.thinReport.readyOutput}</h2>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-black/60 border border-white/10 rounded-2xl shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              <h3 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">{t.thinReport.execSummary}</h3>
              <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed font-medium">
                {out?.deliverables_json?.summary}
              </p>
            </div>

            <div className="p-8 bg-black/60 border border-white/10 rounded-2xl shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
              <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">{t.thinReport.marketingMsg}</h3>
              <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed italic border-l-4 border-blue-500/50 pl-4 py-1">
                "{out?.deliverables_json?.marketing_message}"
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Expert CTA — fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => alert("전문가 상담 연결 중입니다. (Placeholder)")}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] flex items-center justify-center gap-3"
          >
            <PhoneCall className="w-6 h-6" />
            {t.thinReport.expertBtn}
          </button>
        </div>
      </div>
    </main>
  );
}
