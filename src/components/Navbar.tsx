"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "AI Consultancy", href: "/cases/new" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black/60 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-lg tracking-[0.2em] group-hover:text-purple-300 transition-colors">
            CONNNECTO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth — Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <User className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-sm text-zinc-300 max-w-[120px] truncate">
                {user.user_metadata?.name || user.email}
              </span>
              <span className="w-px h-4 bg-white/10" />
              <button
                onClick={() => createClient().auth.signOut()}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="relative px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium text-white transition-all"
            >
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              Login
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? "text-white bg-white/5" : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-white/10">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-zinc-400 truncate max-w-[200px]">
                  {user.user_metadata?.name || user.email}
                </span>
                <button
                  onClick={() => { createClient().auth.signOut(); setMenuOpen(false); }}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
