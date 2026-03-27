"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from '@/i18n/en';
import { ko } from '@/i18n/ko';

type Language = 'en' | 'ko';
export type Dictionary = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('connecto-lang') as Language;
    if (stored && (stored === 'en' || stored === 'ko')) {
      setLang(stored);
    } else {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';
      if (browserLang.toLowerCase().includes('ko')) {
        setLang('ko');
      } else {
        setLang('en');
      }
    }
    setMounted(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('connecto-lang', newLang);
  };

  const t = lang === 'ko' ? ko : en;

  if (!mounted) {
     return <div className="min-h-screen bg-[#09090b]" />; // Prevent flash of wrong language.
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
