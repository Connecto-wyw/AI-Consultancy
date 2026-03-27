"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import DesignBriefModal, { type DesignBrief } from "@/components/DesignBriefModal";

export default function NewCasePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [problem, setProblem] = useState("");
  const [type, setType] = useState("design");
  const [showModal, setShowModal] = useState(false);
  const [showDesignBrief, setShowDesignBrief] = useState(false);
  const [designBrief, setDesignBrief] = useState<DesignBrief | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState({ company: "", phone: "", email: "" });

  const consultingTypes = [
    { id: 'design', label: '브랜드 & 로고 디자인', desc: '로고, 패키지, 아이덴티티 디자인 특화' },
    { id: 'branding', ...t.thinIntake.types.branding },
    { id: 'marketing', ...t.thinIntake.types.marketing },
    { id: 'sales', ...t.thinIntake.types.sales },
    { id: 'automation', ...t.thinIntake.types.automation },
  ];

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowModal(true);
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Generate the consulting report
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: problem, type, designBrief: designBrief ?? undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // 2. Save lead contact info
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_id: data.caseId,
          company_or_name: lead.company,
          phone: lead.phone,
          email: lead.email,
        })
      });

      router.push(`/cases/${data.caseId}`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to process case.');
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-6 pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-5 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">AI Consultancy</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">{t.thinIntake.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed break-keep max-w-2xl mx-auto">{t.thinIntake.desc}</p>
        </div>

        <form onSubmit={handleFormSubmit} className="glass p-8 rounded-2xl flex flex-col gap-8 border border-white/10 shadow-2xl max-w-3xl">
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.thinIntake.step1}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {consultingTypes.map((c) => {
                const isDesign = c.id === 'design';
                const active = type === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setType(c.id);
                      if (isDesign) setShowDesignBrief(true);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      active
                        ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.15)] ring-1 ring-purple-500'
                        : 'bg-black/40 border-white/10 hover:bg-white/5'
                    } ${isDesign ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        {isDesign && (
                          <span className="text-xs font-bold tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
                            CONNNECTO 특화
                          </span>
                        )}
                        <h4 className={`text-sm font-bold ${active ? 'text-purple-400' : 'text-zinc-300'}`}>{c.label}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {active && designBrief && isDesign && (
                          <span className="text-xs text-emerald-400 font-medium">의뢰서 완성 ✓</span>
                        )}
                        {active && !isDesign && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                        {isDesign && (
                          <span className="text-xs text-zinc-500">클릭하여 의뢰서 작성 →</span>
                        )}
                      </div>
                    </div>
                    <p className="text-zinc-500 text-xs break-keep">{c.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="problem" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.thinIntake.step2}</label>
            <textarea
              id="problem"
              rows={6}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              placeholder={t.thinIntake.placeholder}
              required
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-500 max-w-sm break-keep">{t.thinIntake.timing}</p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-5 h-5" />
              {t.thinIntake.generate}
            </button>
          </div>
        </form>
      </div>

      {/* Design Brief Modal */}
      {showDesignBrief && (
        <DesignBriefModal
          onComplete={(brief) => {
            setDesignBrief(brief);
            setShowDesignBrief(false);
          }}
          onClose={() => {
            setShowDesignBrief(false);
            if (!designBrief) setType("branding");
          }}
        />
      )}

      {/* Lead Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md glass rounded-2xl p-8 border border-white/10 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{t.leadModal.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed break-keep">{t.leadModal.desc}</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300">{t.leadModal.company}</label>
                <input
                  type="text"
                  value={lead.company}
                  onChange={(e) => setLead(l => ({ ...l, company: e.target.value }))}
                  placeholder={t.leadModal.companyPlaceholder}
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300">{t.leadModal.phone}</label>
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => setLead(l => ({ ...l, phone: e.target.value }))}
                  placeholder={t.leadModal.phonePlaceholder}
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300">{t.leadModal.email}</label>
                <input
                  type="email"
                  value={lead.email}
                  onChange={(e) => setLead(l => ({ ...l, email: e.target.value }))}
                  placeholder={t.leadModal.emailPlaceholder}
                  required
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" />{t.leadModal.submitting}</> : t.leadModal.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
