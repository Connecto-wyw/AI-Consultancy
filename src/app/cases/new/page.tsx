import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NewCasePage() {
  return (
    <main className="min-h-screen p-8 relative overflow-hidden flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-3xl w-full pt-12 space-y-8 z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">New Consultation</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Describe your business, brand, or communication challenge. Our AI consultant will diagnose the root cause and recommend the best strategic deliverables.
          </p>
        </div>

        <form className="glass p-8 rounded-2xl flex flex-col gap-6 mt-8">
          <div className="space-y-3">
            <label htmlFor="problem" className="block text-sm font-medium text-zinc-300">
              What is the core issue you are facing?
            </label>
            <textarea
              id="problem"
              name="problem"
              rows={6}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              placeholder="e.g., Our startup offers an innovative B2B SaaS, but customers say our website looks generic. How do we differentiate?"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <p className="text-xs text-zinc-500 max-w-sm">
              Your input will be analyzed using Connecto's proprietary consulting framework.
            </p>
            <button
              type="submit"
              className="group relative inline-flex items-center px-6 py-3 font-medium text-white transition-all bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analyze Problem
              </span>
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <h4 className="text-zinc-300 text-sm font-medium mb-1">Brand Positioning</h4>
            <p className="text-zinc-500 text-xs">Define your core differentiation and messaging.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <h4 className="text-zinc-300 text-sm font-medium mb-1">Client Comm.</h4>
            <p className="text-zinc-500 text-xs">Negotiate scope and protect business boundaries.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
            <h4 className="text-zinc-300 text-sm font-medium mb-1">Scope Planning</h4>
            <p className="text-zinc-500 text-xs">Structure vague ideas into actionable execution.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
