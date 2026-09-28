"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTranslation, LangMode } from "@/lib/i18n";

export default function Footer() {
  const [lang, setLang] = useState<LangMode>("NATIVE");

  useEffect(() => {
    const saved = localStorage.getItem("polosim_lang") as LangMode;
    if (saved) setLang(saved);

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener("polosim_lang_change", handleLangChange);
    return () => window.removeEventListener("polosim_lang_change", handleLangChange);
  }, []);

  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--line)] mt-16 py-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--mut)]">
        <div className="font-semibold text-[var(--ink)]">
          © {new Date().getFullYear()} PoloSim. {getTranslation("footer_rights", lang)}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="/impressum" className="hover:text-[var(--ink)] transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-[var(--ink)] transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-[var(--ink)] transition-colors">AGB</Link>
          <Link href="/widerruf" className="hover:text-[var(--ink)] transition-colors">Widerruf</Link>
        </div>
      </div>
    </footer>
  );
}
