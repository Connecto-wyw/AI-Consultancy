import Link from "next/link";
import { ArrowRight, BrainCircuit, Users, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
          <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          Connecto MVP Version 1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient pb-2">
          AI Consultancy with<br />Human Touch
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Transform vague business problems into structured diagnosis, strategic direction, and ready-to-use deliverables.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link 
            href="/cases/new" 
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-white/5 border border-white/10 rounded-full hover:bg-white/10 shadow-xl shadow-black/50 overflow-hidden"
          >
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px" />
            Start Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/agent" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-zinc-400 transition-all duration-300 hover:text-white"
          >
            Agent Dashboard
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-24 mb-16 z-10">
        <div className="glass p-6 rounded-2xl flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100">Smart Diagnosis</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We don't just take orders. Our AI reframes your unstructured problem like a senior consultant.
          </p>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100">Actionable Output</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Get instantly usable brand introductions, email drafts, and project scope outlines.
          </p>
        </div>

        <div className="glass p-6 rounded-2xl flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100">Human PM Review</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Premium quality control. Expert human PMs review and refine critical strategic deliverables.
          </p>
        </div>
      </div>
    </main>
  );
}
