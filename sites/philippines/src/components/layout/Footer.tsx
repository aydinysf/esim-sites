"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <footer className="w-full bg-[#182645] border-t border-white/20 mt-16 py-10">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Image
            src="/images/polosim-logo.png"
            alt="PoloSim"
            width={300}
            height={90}
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <span className="font-mono text-xs text-[var(--soft)] uppercase tracking-wider">
            PILIPINAS
          </span>
        </div>

        <nav className="flex items-center gap-6 font-medium text-sm text-[var(--soft)]">
          <a href="#tarife" className="hover:text-white transition-colors">{getTranslation("nav_tarife", lang)}</a>
          <a href="#ablauf" className="hover:text-white transition-colors">{getTranslation("nav_ablauf", lang)}</a>
          <a href="#faq" className="hover:text-white transition-colors">{getTranslation("nav_faq", lang)}</a>
          <Link href="/blog" className="hover:text-white transition-colors">{getTranslation("nav_blog", lang)}</Link>
        </nav>

        <div className="text-xs text-[var(--soft)] font-mono text-center md:text-right">
          © {new Date().getFullYear()} PoloSim. {getTranslation("footer_rights", lang)}
        </div>
      </div>
    </footer>
  );
}
