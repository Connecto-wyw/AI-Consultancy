"use client";

import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

/* ── Types ── */
export interface DesignBrief {
  designTypes: string[];
  styles: string[];
  competitors: string;
  namingDirection: string[];
  timeline: string;
  budget: string;
}

interface Props {
  onComplete: (brief: DesignBrief) => void;
  onClose: () => void;
}

/* ── Style CSS (visual only, not translated) ── */
const STYLE_CSS: Record<string, { bg: string; border: string; accent: string }> = {
  casual:    { bg: "from-orange-500/20 to-yellow-500/10",  border: "border-orange-500/30",  accent: "text-orange-400" },
  elegant:   { bg: "from-yellow-600/20 to-amber-500/5",   border: "border-yellow-600/30",  accent: "text-yellow-500" },
  retro:     { bg: "from-amber-700/20 to-red-800/10",     border: "border-amber-700/30",   accent: "text-amber-600" },
  minimal:   { bg: "from-zinc-400/10 to-zinc-600/5",      border: "border-zinc-500/30",    accent: "text-zinc-300" },
  bold:      { bg: "from-red-600/20 to-orange-600/10",    border: "border-red-500/30",     accent: "text-red-400" },
  natural:   { bg: "from-green-700/20 to-emerald-600/10", border: "border-green-600/30",   accent: "text-green-400" },
  tech:      { bg: "from-blue-600/20 to-cyan-500/10",     border: "border-blue-500/30",    accent: "text-blue-400" },
  playful:   { bg: "from-pink-500/20 to-purple-500/10",   border: "border-pink-500/30",    accent: "text-pink-400" },
  corporate: { bg: "from-indigo-600/20 to-blue-700/10",   border: "border-indigo-500/30",  accent: "text-indigo-400" },
  artisan:   { bg: "from-stone-500/20 to-amber-900/10",   border: "border-stone-500/30",   accent: "text-stone-400" },
};

const DESIGN_TYPE_EMOJIS: Record<string, string> = {
  logo: "✦", brand_identity: "◈", package: "⬡",
  biz_card: "▣", sns: "◉", brochure: "◧", signage: "⬜", goods: "◆",
};

/* ── Component ── */
export default function DesignBriefModal({ onComplete, onClose }: Props) {
  const { t } = useLanguage();
  const db = t.designBrief;

  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<DesignBrief>({
    designTypes: [], styles: [], competitors: "",
    namingDirection: [], timeline: "", budget: "",
  });

  function toggleArr(key: keyof DesignBrief, id: string, max?: number) {
    setBrief((prev) => {
      const arr = prev[key] as string[];
      if (arr.includes(id)) return { ...prev, [key]: arr.filter((x) => x !== id) };
      if (max && arr.length >= max) return prev;
      return { ...prev, [key]: [...arr, id] };
    });
  }

  function setSingle(key: keyof DesignBrief, value: string) {
    setBrief((prev) => ({ ...prev, [key]: value }));
  }

  const canNext = [
    brief.designTypes.length > 0,
    brief.styles.length > 0,
    true,
    brief.namingDirection.length > 0,
    brief.timeline !== "" && brief.budget !== "",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl glass rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-white/10 shrink-0">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase mb-1">{db.headerLabel}</p>
            <h2 className="text-xl font-black text-white">{db.title}</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress */}
        <div className="px-8 py-4 shrink-0">
          <div className="flex items-center gap-1.5">
            {db.steps.map((label, i) => (
              <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                  i < step ? "bg-purple-500 text-white" :
                  i === step ? "bg-purple-600 text-white ring-2 ring-purple-400/40" :
                  "bg-white/5 text-zinc-500"
                }`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-xs truncate hidden sm:block transition-colors ${i === step ? "text-zinc-200 font-medium" : "text-zinc-600"}`}>{label}</span>
                {i < db.steps.length - 1 && (
                  <div className={`h-px flex-1 transition-all ${i < step ? "bg-purple-500/50" : "bg-white/5"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-2 overflow-y-auto flex-1">

          {/* Step 0 – 디자인 항목 */}
          {step === 0 && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-zinc-400 break-keep">{db.step1Desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {db.designTypeItems.map((d) => {
                  const active = brief.designTypes.includes(d.id);
                  return (
                    <button key={d.id} type="button" onClick={() => toggleArr("designTypes", d.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${active ? "bg-purple-500/10 border-purple-500 ring-1 ring-purple-500" : "bg-black/40 border-white/10 hover:bg-white/5"}`}>
                      <span className={`text-lg ${active ? "text-purple-400" : "text-zinc-500"}`}>{DESIGN_TYPE_EMOJIS[d.id]}</span>
                      <span className={`text-sm font-medium ${active ? "text-purple-300" : "text-zinc-300"}`}>{d.label}</span>
                      {active && <Check className="w-4 h-4 text-purple-400 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1 – 스타일 */}
          {step === 1 && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-zinc-400">{db.step2Desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {db.styleItems.map((s) => {
                  const active = brief.styles.includes(s.id);
                  const css = STYLE_CSS[s.id];
                  return (
                    <button key={s.id} type="button" onClick={() => toggleArr("styles", s.id, 3)}
                      className={`relative p-4 rounded-xl border text-left transition-all bg-gradient-to-br ${css.bg} ${active ? `${css.border} ring-1 ring-white/20` : "border-white/10 hover:border-white/20"}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-sm font-bold ${css.accent}`}>{s.label}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{s.desc}</p>
                        </div>
                        {active && <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" /></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 – 경쟁사 */}
          {step === 2 && (
            <div className="space-y-4 py-4">
              <p className="text-sm text-zinc-400 break-keep">
                {db.step3Desc} <span className="text-zinc-600">{db.step3Optional}</span>
              </p>
              <textarea rows={7} value={brief.competitors}
                onChange={(e) => setSingle("competitors", e.target.value)}
                placeholder={db.step3Placeholder}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              />
            </div>
          )}

          {/* Step 3 – 네이밍 */}
          {step === 3 && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-zinc-400 break-keep">{db.step4Desc}</p>
              <div className="grid grid-cols-1 gap-3">
                {db.namingItems.map((n) => {
                  const active = brief.namingDirection.includes(n.id);
                  return (
                    <button key={n.id} type="button" onClick={() => toggleArr("namingDirection", n.id)}
                      className={`flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all ${active ? "bg-purple-500/10 border-purple-500 ring-1 ring-purple-500" : "bg-black/40 border-white/10 hover:bg-white/5"}`}>
                      <div>
                        <p className={`text-sm font-bold ${active ? "text-purple-300" : "text-zinc-200"}`}>{n.label}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{n.desc}</p>
                      </div>
                      {active && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4 – 일정 & 예산 */}
          {step === 4 && (
            <div className="space-y-8 py-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{db.timelineLabel}</p>
                <div className="grid grid-cols-2 gap-3">
                  {db.timelineItems.map((ti) => {
                    const active = brief.timeline === ti.id;
                    return (
                      <button key={ti.id} type="button" onClick={() => setSingle("timeline", ti.id)}
                        className={`px-5 py-4 rounded-xl border text-left transition-all ${active ? "bg-purple-500/10 border-purple-500 ring-1 ring-purple-500" : "bg-black/40 border-white/10 hover:bg-white/5"}`}>
                        <p className={`text-sm font-bold ${active ? "text-purple-300" : "text-zinc-200"}`}>{ti.label}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{ti.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{db.budgetLabel}</p>
                <div className="grid grid-cols-1 gap-2">
                  {db.budgetItems.map((b) => {
                    const active = brief.budget === b.id;
                    return (
                      <button key={b.id} type="button" onClick={() => setSingle("budget", b.id)}
                        className={`flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all ${active ? "bg-purple-500/10 border-purple-500 ring-1 ring-purple-500" : "bg-black/40 border-white/10 hover:bg-white/5"}`}>
                        <span className={`text-sm font-medium ${active ? "text-purple-300" : "text-zinc-300"}`}>{b.label}</span>
                        {active && <Check className="w-4 h-4 text-purple-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between shrink-0">
          <button type="button" onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? db.cancelBtn : db.prevBtn}
          </button>
          <span className="text-xs text-zinc-600">{step + 1} / {db.steps.length}</span>
          {step < db.steps.length - 1 ? (
            <button type="button" onClick={() => setStep(s => s + 1)} disabled={!canNext[step]}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all">
              {db.nextBtn}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="button" onClick={() => onComplete(brief)} disabled={!canNext[step]}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              {db.completeBtn}
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
