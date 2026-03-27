"use client";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 bg-zinc-900/80 backdrop-blur border border-white/10 p-1.5 rounded-full shadow-lg">
      <button 
        onClick={() => setLang('ko')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${lang === 'ko' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
      >
        한국어
      </button>
      <button 
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${lang === 'en' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
      >
        English
      </button>
    </div>
  );
}
