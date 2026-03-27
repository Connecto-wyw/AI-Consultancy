"use client";

import { useState } from "react";
import { Mail, MessageSquare, Building2, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire up to actual backend / email service
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10" />

      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-5 pt-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">Contact</p>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            함께 성장할<br />
            <span className="text-gradient">파트너를 찾습니다.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed break-keep">
            프로젝트 협업, 서비스 도입 문의, 또는 단순한 안녕 인사까지 — 어떤 이유로든 연락 주세요.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="glass p-6 rounded-2xl space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">이메일</p>
                  <p className="text-zinc-200 text-sm font-medium">hello@connecto-wyw.com</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">회사</p>
                  <p className="text-zinc-200 text-sm font-medium">Connecto Inc.</p>
                  <p className="text-zinc-500 text-xs mt-0.5">서울특별시</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">응답 시간</p>
                  <p className="text-zinc-200 text-sm font-medium">영업일 기준 24시간 이내</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="glass p-10 rounded-2xl flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
                <CheckCircle className="w-14 h-14 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">메시지를 받았습니다!</h2>
                <p className="text-zinc-400 break-keep max-w-xs">
                  빠른 시일 내에 담당자가 직접 연락드리겠습니다. 감사합니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">성함 *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="홍길동"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">회사명</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                      placeholder="주식회사 커넥토"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">이메일 *</label>
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
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">메시지 *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="문의하실 내용을 자유롭게 적어주세요."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="animate-pulse">전송 중...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      메시지 보내기
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
