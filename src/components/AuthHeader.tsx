"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { User } from "lucide-react";

export default function AuthHeader() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur">
          <User className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-zinc-300 pr-2 border-r border-white/10">
            {user.user_metadata?.name || user.email}
          </span>
          <button 
            onClick={() => createClient().auth.signOut()}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link 
          href="/login"
          className="px-5 py-2 overflow-hidden relative group bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium text-white transition-all shadow-lg"
        >
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
          Login
        </Link>
      )}
    </div>
  );
}
