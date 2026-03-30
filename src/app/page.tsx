"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Users, FileText, CheckCircle, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const serviceIcons = [
  <BrainCircuit key="0" className="w-6 h-6 text-purple-400" />,
  <FileText key="1" className="w-6 h-6 text-blue-400" />,
  <Users key="2" className="w-6 h-6 text-emerald-400" />,
];

const diffIcons = [
  <Zap key="0" className="w-5 h-5 text-purple-400" />,
  <Shield key="1" className="w-5 h-5 text-blue-400" />,
  <CheckCircle key="2" className="w-5 h-5 text-emerald-400" />,
];

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-32">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-sm font-semibold tracking-[0.25em] text-purple-400 uppercase">{h.heroLabel}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="text-gradient">{h.hero1}</span>
            <br />
            <span className="text-white">{h.hero2}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed break-keep">{h.heroDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/cases/new" className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all w-full sm:w-auto justify-center">
              {h.heroCta1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all w-full sm:w-auto justify-center">
              {h.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">{h.aboutLabel}</p>
            <h2 className="text-4xl font-bold text-white leading-snug">
              {h.aboutTitle1}<br />
              <span className="text-gradient">{h.aboutTitle2}</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed break-keep">{h.aboutDesc1}</p>
            <p className="text-zinc-400 leading-relaxed break-keep">{h.aboutDesc2}</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {h.diff.map((item, i) => (
              <div key={i} className="glass p-5 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {diffIcons[i]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-100 mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed break-keep">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">{h.servicesLabel}</p>
            <h2 className="text-4xl font-bold text-white">{h.servicesTitle}</h2>
            <p className="text-zinc-400 max-w-xl mx-auto break-keep">{h.servicesDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.services.map((s, i) => (
              <div key={i} className="glass p-7 rounded-2xl flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {serviceIcons[i]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-100">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed break-keep">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">{h.processLabel}</p>
            <h2 className="text-4xl font-bold text-white">{h.processTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.steps.map((p, i) => (
              <div key={i} className="relative flex flex-col gap-4">
                {i < h.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%_-_1rem)] w-full h-px bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2" />
                )}
                <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center">
                  <span className="text-xl font-black text-gradient">{p.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">{p.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-snug">
            {h.ctaTitle1}<br />
            <span className="text-gradient">{h.ctaTitle2}</span>
          </h2>
          <p className="text-zinc-400 text-lg break-keep">{h.ctaDesc}</p>
          <Link href="/cases/new" className="group inline-flex items-center gap-2 px-10 py-5 font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_40px_rgba(147,51,234,0.35)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all text-lg">
            {h.ctaBtn}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span>{h.footerRights}</span>
          <Link href="/contact" className="hover:text-white transition-colors">{h.footerContact}</Link>
        </div>
      </footer>
    </main>
  );
}
