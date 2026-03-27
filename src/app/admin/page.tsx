"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Loader2, BrainCircuit, Mail, Users, FileText,
  ChevronDown, ChevronUp, X, Palette, Clock, Wallet,
  Tag, Globe, Building2
} from "lucide-react";

/* ── Types ── */
interface Case {
  id: string;
  created_at: string;
  consulting_type: string;
  input_text: string;
  design_brief_json: any;
  user_id: string | null;
  case_outputs: {
    diagnosis_json: any;
    strategy_json: any;
    deliverables_json: any;
  } | null;
  lead_contacts: {
    company_or_name: string;
    phone: string;
    email: string;
  }[];
}

interface ContactInquiry {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  message: string;
}

type Tab = "cases" | "contacts";

/* ── Helpers ── */
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    design: "브랜드 & 로고 디자인",
    branding: "브랜드 포지셔닝",
    marketing: "마케팅 전략",
    sales: "세일즈 & 커뮤니케이션",
    automation: "비즈니스 자동화",
  };
  return map[type] ?? type;
}

function typeBadge(type: string) {
  if (type === "design") return "bg-purple-500/10 text-purple-400 border-purple-500/30";
  if (type === "branding") return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (type === "marketing") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (type === "sales") return "bg-orange-500/10 text-orange-400 border-orange-500/30";
  return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
}

/* ── Design Brief Detail ── */
function DesignBriefDetail({ brief }: { brief: any }) {
  if (!brief) return null;
  return (
    <div className="mt-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-3">
      <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">디자인 의뢰서</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {brief.designTypes?.length > 0 && (
          <div className="flex gap-2">
            <Tag className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">디자인 항목</p>
              <p className="text-zinc-200">{brief.designTypes.join(", ")}</p>
            </div>
          </div>
        )}
        {brief.styles?.length > 0 && (
          <div className="flex gap-2">
            <Palette className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">스타일</p>
              <p className="text-zinc-200">{brief.styles.join(", ")}</p>
            </div>
          </div>
        )}
        {brief.competitors && (
          <div className="flex gap-2 sm:col-span-2">
            <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">경쟁사 / 레퍼런스</p>
              <p className="text-zinc-200 whitespace-pre-wrap">{brief.competitors}</p>
            </div>
          </div>
        )}
        {brief.namingDirection?.length > 0 && (
          <div className="flex gap-2">
            <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">네이밍 방향</p>
              <p className="text-zinc-200">{brief.namingDirection.join(", ")}</p>
            </div>
          </div>
        )}
        {brief.timeline && (
          <div className="flex gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">희망 일정</p>
              <p className="text-zinc-200">{brief.timeline}</p>
            </div>
          </div>
        )}
        {brief.budget && (
          <div className="flex gap-2">
            <Wallet className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-zinc-500 mb-1">예산</p>
              <p className="text-zinc-200">{brief.budget}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Case Row ── */
function CaseRow({ c }: { c: Case }) {
  const [open, setOpen] = useState(false);
  const lead = c.lead_contacts?.[0];
  const out = c.case_outputs;

  return (
    <div className="glass rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${typeBadge(c.consulting_type)}`}>
            {typeLabel(c.consulting_type)}
          </span>
          <p className="text-sm text-zinc-300 truncate">{c.input_text}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {lead && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              리드 ✓
            </span>
          )}
          {c.design_brief_json && (
            <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              의뢰서 ✓
            </span>
          )}
          <span className="text-xs text-zinc-500">{fmt(c.created_at)}</span>
          {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 space-y-5 pt-4">
          {/* 의뢰 내용 */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">의뢰 내용</p>
            <p className="text-sm text-zinc-300 bg-black/30 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">{c.input_text}</p>
          </div>

          {/* 디자인 의뢰서 */}
          <DesignBriefDetail brief={c.design_brief_json} />

          {/* 리드 정보 */}
          {lead && (
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">리드 연락처</p>
              <div className="flex flex-wrap gap-4 text-sm bg-black/30 rounded-lg p-3">
                <span className="text-zinc-300">👤 {lead.company_or_name}</span>
                <span className="text-zinc-300">📞 {lead.phone}</span>
                <span className="text-zinc-300">✉️ {lead.email}</span>
              </div>
            </div>
          )}

          {/* AI 결과 */}
          {out && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">AI 진단 결과</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-black/30 rounded-lg p-3 space-y-1">
                  <p className="text-xs text-purple-400 font-semibold">문제 재정의</p>
                  <p className="text-xs text-zinc-300 leading-relaxed">{out.diagnosis_json?.problem_definition}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 space-y-1">
                  <p className="text-xs text-blue-400 font-semibold">핵심 방향성</p>
                  <p className="text-xs text-zinc-300 leading-relaxed">{out.strategy_json?.direction}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 space-y-2 md:col-span-2">
                  <p className="text-xs text-emerald-400 font-semibold">Executive Summary</p>
                  <p className="text-xs text-zinc-300 leading-relaxed">{out.deliverables_json?.summary}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <a
              href={`/cases/${c.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
            >
              전체 리포트 보기 →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Contact Row ── */
function ContactRow({ c }: { c: ContactInquiry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span className="text-sm font-semibold text-zinc-200 shrink-0">{c.name}</span>
          {c.company && <span className="text-xs text-zinc-500">{c.company}</span>}
          <p className="text-sm text-zinc-400 truncate hidden sm:block">{c.message}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-zinc-400">{c.email}</span>
          <span className="text-xs text-zinc-500">{fmt(c.created_at)}</span>
          {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-zinc-400">👤 {c.name}{c.company ? ` (${c.company})` : ""}</span>
            <span className="text-zinc-400">✉️ {c.email}</span>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{c.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function AdminPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("cases");
  const [cases, setCases] = useState<Case[]>([]);
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else setAuthLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (authLoading) return;
    setLoading(true);
    Promise.all([
      fetch("/api/admin/cases").then(r => r.json()),
      fetch("/api/admin/contacts").then(r => r.json()),
    ]).then(([c, q]) => {
      setCases(Array.isArray(c) ? c : []);
      setContacts(Array.isArray(q) ? q : []);
    }).finally(() => setLoading(false));
  }, [authLoading]);

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    </div>
  );

  const leads = cases.filter(c => c.lead_contacts?.length > 0);
  const designCases = cases.filter(c => c.design_brief_json);

  const stats = [
    { label: "총 컨설팅 의뢰", value: cases.length, icon: <BrainCircuit className="w-5 h-5 text-purple-400" />, color: "text-purple-400" },
    { label: "디자인 의뢰서", value: designCases.length, icon: <Palette className="w-5 h-5 text-blue-400" />, color: "text-blue-400" },
    { label: "리드 연락처", value: leads.length, icon: <Users className="w-5 h-5 text-emerald-400" />, color: "text-emerald-400" },
    { label: "문의 접수", value: contacts.length, icon: <Mail className="w-5 h-5 text-orange-400" />, color: "text-orange-400" },
  ];

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "cases", label: "AI 컨설팅 의뢰", count: cases.length },
    { id: "contacts", label: "문의 접수", count: contacts.length },
  ];

  return (
    <main className="min-h-screen px-6 py-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-1 pt-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">Admin</p>
          <h1 className="text-4xl font-black text-white">대시보드</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {s.icon}
                <span className={`text-3xl font-black ${s.color}`}>{loading ? "—" : s.value}</span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-fit border border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                tab === t.id ? "bg-purple-600 text-white shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? "bg-white/20" : "bg-white/5"}`}>
                {loading ? "…" : t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {tab === "cases" && (
              cases.length === 0
                ? <Empty text="접수된 컨설팅 의뢰가 없습니다." />
                : cases.map(c => <CaseRow key={c.id} c={c} />)
            )}
            {tab === "contacts" && (
              contacts.length === 0
                ? <Empty text="접수된 문의가 없습니다." />
                : contacts.map(c => <ContactRow key={c.id} c={c} />)
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="glass rounded-2xl p-16 flex flex-col items-center justify-center gap-3 text-center">
      <FileText className="w-10 h-10 text-zinc-600" />
      <p className="text-zinc-500 text-sm">{text}</p>
    </div>
  );
}
