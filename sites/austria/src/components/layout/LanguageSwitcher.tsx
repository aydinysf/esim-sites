"use client";
import React, { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<"NATIVE" | "EN">("NATIVE");

  useEffect(() => {
    const saved = localStorage.getItem("polosim_lang");
    if (saved === "EN" || saved === "NATIVE") {
      setLang(saved);
    }
  }, []);

  const toggleLang = (target: "NATIVE" | "EN") => {
    setLang(target);
    localStorage.setItem("polosim_lang", target);
    window.dispatchEvent(new CustomEvent("polosim_lang_change", { detail: target }));
  };

  return (
    <div className="inline-flex items-center bg-[#101b33]/90 border border-white/20 rounded-full p-1 font-mono text-xs font-bold shadow-inner">
      <button
        type="button"
        onClick={() => toggleLang("NATIVE")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "NATIVE"
            ? "bg-[#38bdf8] text-[#060714] shadow-[0_0_12px_rgba(56,189,248,0.6)] font-extrabold"
            : "text-slate-300 hover:text-white"
        }`}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => toggleLang("EN")}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          lang === "EN"
            ? "bg-[#38bdf8] text-[#060714] shadow-[0_0_12px_rgba(56,189,248,0.6)] font-extrabold"
            : "text-slate-300 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
