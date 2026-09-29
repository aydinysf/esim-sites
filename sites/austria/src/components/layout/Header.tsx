"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { getTranslation, LangMode } from "@/lib/i18n";

export default function Header() {
  const [lang, setLang] = useState<LangMode>("NATIVE");
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("polosim_lang") as LangMode;
    if (saved) setLang(saved);

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener("polosim_lang_change", handleLangChange);

    // IntersectionObserver for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("polosim_lang_change", handleLangChange);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="w-full bg-[var(--bg)] border-b border-[var(--line)] sticky top-0 z-50 transition-colors">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: PoloSim Logo (Enlarged) with Country Name underneath */}
        <Link href="/" className="flex flex-col items-start justify-center text-decoration-none group py-1">
          <img
            src="/images/polosim-logo.png"
            alt="PoloSim"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xs sm:text-sm font-black text-[var(--ink)] tracking-[0.25em] uppercase mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
            ÖSTERREICH
          </span>
        </Link>

        {/* Center: Vibrant Menu Capsule */}
        <nav className="w-full md:w-auto overflow-x-auto bg-gradient-to-r from-[#1E3A8A] via-[#3B6CF0] via-[#12B5A0] to-[#F26A2E] p-1.5 rounded-2xl md:rounded-full shadow-md flex items-center justify-center gap-1">
          <a
            href="#tarife"
            className={`px-4 py-1.5 rounded-full text-white font-bold text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/30 ${
              activeSection === "tarife" ? "bg-white/30 shadow-sm" : ""
            }`}
          >
            {getTranslation("nav_tarife", lang)}
          </a>
          <a
            href="#ablauf"
            className={`px-4 py-1.5 rounded-full text-white font-bold text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/30 ${
              activeSection === "ablauf" ? "bg-white/30 shadow-sm" : ""
            }`}
          >
            {getTranslation("nav_ablauf", lang)}
          </a>
          <a
            href="#faq"
            className={`px-4 py-1.5 rounded-full text-white font-bold text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/30 ${
              activeSection === "faq" ? "bg-white/30 shadow-sm" : ""
            }`}
          >
            {getTranslation("nav_faq", lang)}
          </a>
          <Link
            href="/blog"
            className="px-4 py-1.5 rounded-full text-white font-bold text-sm whitespace-nowrap transition-all duration-200 hover:bg-white/30"
          >
            {getTranslation("nav_blog", lang)}
          </Link>
        </nav>

        {/* Right: Language Switcher & Tarife CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="#tarife"
            className="bg-[var(--acc)] text-[var(--accink)] font-bold text-sm px-5 py-2 rounded-xl transition-transform hover:scale-105 shadow-sm"
          >
            {getTranslation("nav_tarife", lang)}
          </a>
        </div>

      </div>
    </header>
  );
}
