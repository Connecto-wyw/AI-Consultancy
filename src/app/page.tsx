"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, Users, FileText, CheckCircle, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
    title: "AI 전략 컨설팅",
    desc: "막연한 비즈니스 고민을 시니어 컨설턴트 수준의 AI가 날카롭게 재정의하고, 실행 가능한 전략으로 변환합니다.",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-400" />,
    title: "즉시 활용 가능한 산출물",
    desc: "브랜드 소개문, 이메일 초안, 프로젝트 범위안 등 실무에 바로 적용할 수 있는 결과물을 제공합니다.",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "전문가 PM 리뷰",
    desc: "AI가 놓칠 수 있는 감정적 뉘앙스와 디테일을 경험 풍부한 전문가 PM이 직접 검수하고 완성도를 높입니다.",
  },
];

const differentiators = [
  {
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    title: "15초 안에 전략 리포트",
    desc: "긴 미팅 없이도 AI가 즉시 핵심 문제를 진단하고 맞춤형 전략 보고서를 생성합니다.",
  },
  {
    icon: <Shield className="w-5 h-5 text-blue-400" />,
    title: "휴먼 터치 보장",
    desc: "모든 AI 결과물은 전문가 PM이 직접 검수합니다. 자동화와 전문성의 완벽한 균형.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    title: "검증된 컨설팅 프레임워크",
    desc: "수백 건의 컨설팅 경험에서 도출된 독자적인 프레임워크로 문제의 본질을 짚어냅니다.",
  },
];

const processSteps = [
  { step: "01", title: "문제 제출", desc: "현재 겪고 있는 비즈니스 고민을 자유롭게 입력합니다." },
  { step: "02", title: "AI 진단", desc: "Connecto AI가 핵심 문제를 분석하고 전략 리포트를 생성합니다." },
  { step: "03", title: "전문가 검수", desc: "내부 PM이 결과물을 검토하고 최종 품질을 보장합니다." },
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* ── HERO ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-32">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-sm font-semibold tracking-[0.25em] text-purple-400 uppercase">
            AI Consultancy Agency
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="text-gradient">AI가 주도하고,</span>
            <br />
            <span className="text-white">사람이 완성합니다.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed break-keep">
            Connecto는 인공지능과 전문가의 협업으로 비즈니스 문제를 진단하고,
            즉시 실행 가능한 전략과 결과물을 제공하는 AI 컨설팅 에이전시입니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/cases/new"
              className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all w-full sm:w-auto justify-center"
            >
              AI 컨설팅 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all w-full sm:w-auto justify-center"
            >
              전문가 상담 문의
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">About Connecto</p>
            <h2 className="text-4xl font-bold text-white leading-snug">
              컨설팅의 본질은<br />
              <span className="text-gradient">올바른 질문</span>에서 시작됩니다.
            </h2>
            <p className="text-zinc-400 leading-relaxed break-keep">
              Connecto는 "AI가 사람을 대체한다"는 통념을 거부합니다.
              우리는 AI의 속도와 분석력에 시니어 컨설턴트의 판단력을 결합해,
              기업이 진짜 문제를 발견하고 빠르게 실행할 수 있도록 돕습니다.
            </p>
            <p className="text-zinc-400 leading-relaxed break-keep">
              브랜드 포지셔닝부터 클라이언트 커뮤니케이션, 프로젝트 스코프 기획까지
              — 복잡한 비즈니스 고민을 15초 안에 명확한 전략으로 변환합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {differentiators.map((item, i) => (
              <div key={i} className="glass p-5 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {item.icon}
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
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">Our Services</p>
            <h2 className="text-4xl font-bold text-white">Connecto가 제공하는 것</h2>
            <p className="text-zinc-400 max-w-xl mx-auto break-keep">
              단순 자문을 넘어, 즉시 쓸 수 있는 전략 결과물을 만들어 드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass p-7 rounded-2xl flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {s.icon}
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
            <p className="text-sm font-semibold tracking-[0.2em] text-purple-400 uppercase">How It Works</p>
            <h2 className="text-4xl font-bold text-white">3단계로 완성되는 전략</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((p, i) => (
              <div key={i} className="relative flex flex-col gap-4">
                {i < processSteps.length - 1 && (
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
            지금 바로<br />
            <span className="text-gradient">비즈니스 진단을 받아보세요.</span>
          </h2>
          <p className="text-zinc-400 text-lg break-keep">
            무료로 시작할 수 있습니다. 15초면 충분합니다.
          </p>
          <Link
            href="/cases/new"
            className="group inline-flex items-center gap-2 px-10 py-5 font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_40px_rgba(147,51,234,0.35)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all text-lg"
          >
            무료 AI 컨설팅 시작
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <span className="font-black tracking-[0.2em] text-zinc-400">CONNECTO</span>
          <span>© 2026 Connecto. All rights reserved.</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </footer>
    </main>
  );
}
