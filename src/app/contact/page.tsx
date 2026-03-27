"use client";

import { useState } from "react";
import { Mail, MessageSquare, Building2, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      alert(c.errorMsg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-6 pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-5 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">{c.label}</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            {c.title1}<br />
            <span className="text-gradient">{c.title2}</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed break-keep mx-auto">{c.desc}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="glass p-6 rounded-2xl space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">{c.emailLabel}</p>
                  <p className="text-zinc-200 text-sm font-medium">hello@connecto-wyw.com</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">{c.companyLabel}</p>
                  <p className="text-zinc-200 text-sm font-medium">CONNNECTO Corp.</p>
                  <p className="text-zinc-500 text-xs mt-0.5">경기도 성남시 분당구</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">{c.responseLabel}</p>
                  <p className="text-zinc-200 text-sm font-medium">{c.responseValue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="glass p-10 rounded-2xl flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
                <CheckCircle className="w-14 h-14 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">{c.successTitle}</h2>
                <p className="text-zinc-400 break-keep max-w-xs">{c.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{c.nameLabel}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={c.namePlaceholder}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{c.companyInputLabel}</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder={c.companyInputPlaceholder}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{c.emailInputLabel}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="hello@company.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{c.messageLabel}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={c.messagePlaceholder}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2"
                >
                  {submitting ? <span className="animate-pulse">{c.submitting}</span> : <><Send className="w-4 h-4" />{c.submitBtn}</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
