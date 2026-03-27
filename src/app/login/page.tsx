"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { createClient } from "@/utils/supabase/client";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="glass p-10 rounded-3xl max-w-md w-full text-center space-y-8 z-10 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <BrainCircuit className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{t.auth.title}</h1>
          <p className="text-zinc-400 text-sm break-keep">{t.auth.desc}</p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full relative flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {t.auth.google}
          </button>
        </div>
        
        <p className="text-xs text-zinc-500 pt-8 border-t border-white/5 break-keep">
          {t.auth.tos}
        </p>
      </div>

      <Link href="/" className="absolute top-8 left-8 text-zinc-500 hover:text-white transition-colors text-sm font-medium z-10">
        ← {t.intake.back}
      </Link>
    </main>
  );
}
