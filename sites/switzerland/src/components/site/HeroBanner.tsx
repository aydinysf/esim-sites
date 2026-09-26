"use client";
import React, { useState, useEffect } from "react";
import { getTranslation, LangMode } from "@/lib/i18n";

interface Props {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  nativeCountryName?: string;
  activeCity?: string;
  tickerCities?: string;
}

export default function HeroBanner({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  nativeCountryName = "SCHWEIZ",
  activeCity = "Zürich",
  tickerCities = "ZÜRICH ✦ GENF ✦ BASEL ✦ BERN ✦ LAUSANNE ✦ LUZERN ✦ ST. GALLEN"
}: Props) {
  const [deviceResult, setDeviceResult] = useState("");
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

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "1") {
      setDeviceResult(getTranslation("device_check_success", lang));
    } else if (val === "0") {
      setDeviceResult(getTranslation("device_check_warn", lang));
    } else {
      setDeviceResult("");
    }
  };

  return (
    <div className="w-full relative py-6 sm:py-10 lg:py-12">
      {/* Hero Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column - Headline & Device Selector */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span>{getTranslation("eyebrow_live", lang)}</span>
          </div>

          {/* Headline with Multi-color Gradient Styling */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-[62px] leading-[1.05] tracking-tight text-white mb-6">
            {getTranslation("headline_p1", lang)} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">{getTranslation("headline_p2_1", lang)}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#c084fc]">{getTranslation("headline_p2_2", lang)}</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f472b6] to-[#ec4899]">{getTranslation("headline_p3", lang).replace(".", "")}</span>
            <span className="text-[#ef4444]">.</span>
          </h1>

          {/* Subheadline Paragraph */}
          <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed max-w-[540px] mb-8 font-normal">
            {subheadline || getTranslation("subheadline_fallback", lang)}
          </p>

          {/* Device Compatibility Check Card */}
          <div className="w-full max-w-[540px] bg-[#162544]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <label htmlFor="dev" className="block text-white font-semibold text-sm sm:text-base mb-3.5">
              {getTranslation("device_check_title", lang)}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                id="dev"
                onChange={handleDeviceChange}
                className="flex-1 bg-[#1e3056] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="">{getTranslation("device_check_select", lang)}</option>
                <option value="1">iPhone XS / XR oder neuer</option>
                <option value="1">Samsung Galaxy S20 oder neuer</option>
                <option value="1">Google Pixel 3 oder neuer</option>
                <option value="0">Anderes Gerät</option>
              </select>
              <a
                href={ctaHref || "#tarife"}
                className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] text-[#060714] font-bold px-6 py-3.5 rounded-xl shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:scale-[1.02] transition-all duration-300 text-center whitespace-nowrap text-sm sm:text-base flex items-center justify-center"
              >
                {ctaText || getTranslation("device_check_btn", lang)}
              </a>
            </div>
            {deviceResult && (
              <p className="mt-3 text-sm font-semibold text-cyan-400">
                {deviceResult}
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Phone / QR Code Stage Mockup */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-6 lg:mt-0">
          <div className="w-full max-w-[300px] sm:max-w-[320px] relative">
            
            {/* Top Left Floating Signal Chip */}
            <div className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-[#162544]/90 border border-white/20 backdrop-blur-md rounded-xl p-2.5 shadow-xl text-white flex items-center justify-center">
              <span className="text-base">📶</span>
            </div>

            {/* Glowing Neon Border Outer Frame */}
            <div className="p-[2px] rounded-[32px] bg-gradient-to-br from-[#38bdf8] via-[#a855f7] to-[#ec4899] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(56,189,248,0.25)] relative overflow-hidden">
              
              {/* Inner Card Background */}
              <div className="bg-[#101b33] rounded-[30px] p-6 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[410px]">
                
                {/* Moving Scanline Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-30 animate-scanline" />

                {/* Top Monospace Title inside Card */}
                <div className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 font-bold mb-6 text-center uppercase">
                  {getTranslation("stage_title", lang)}
                </div>

                {/* Crisp White QR Code Container */}
                <div className="bg-white rounded-2xl p-4 shadow-xl mb-4 w-[185px] h-[185px] flex items-center justify-center">
                  <svg
                    className="w-full h-full text-slate-900"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="14" width="12" height="12" rx="2" fill="currentColor" />

                    <rect x="65" y="5" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="74" y="14" width="12" height="12" rx="2" fill="currentColor" />

                    <rect x="5" y="65" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="14" y="74" width="12" height="12" rx="2" fill="currentColor" />

                    <rect x="42" y="10" width="6" height="6" rx="1" />
                    <rect x="52" y="10" width="6" height="6" rx="1" />
                    <rect x="42" y="22" width="6" height="6" rx="1" />
                    <rect x="52" y="28" width="6" height="6" rx="1" />
                    
                    <rect x="10" y="42" width="6" height="6" rx="1" />
                    <rect x="22" y="42" width="6" height="6" rx="1" />
                    <rect x="28" y="52" width="6" height="6" rx="1" />
                    
                    <rect x="42" y="42" width="16" height="16" rx="2" />
                    <rect x="65" y="42" width="8" height="8" rx="1" />
                    <rect x="78" y="42" width="12" height="6" rx="1" />
                    <rect x="65" y="54" width="6" height="12" rx="1" />

                    <rect x="42" y="65" width="8" height="8" rx="1" />
                    <rect x="54" y="75" width="10" height="10" rx="2" />
                    <rect x="70" y="65" width="20" height="8" rx="2" />
                    <rect x="70" y="78" width="8" height="12" rx="1" />
                    <rect x="82" y="82" width="8" height="8" rx="1" />
                  </svg>
                </div>

                {/* Scan & Connect Text (Reactive Translated) */}
                <div className="font-extrabold text-xl text-white tracking-tight mb-4">
                  {getTranslation("stage_scan", lang)}
                </div>

                {/* Active City Pill Badge */}
                <div className="bg-[#0b243b]/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs px-4 py-1.5 rounded-full inline-flex items-center gap-2 font-semibold shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>{lang === "EN" ? `Active in ${activeCity}` : getTranslation("stage_active_in", lang)}</span>
                </div>

              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <div className="absolute -bottom-3 -right-4 sm:-right-6 z-20 bg-[#162544]/95 border border-white/20 backdrop-blur-xl rounded-xl px-4 py-2.5 font-mono text-xs text-white shadow-2xl flex items-center gap-2 font-semibold tracking-wide border-t-white/30">
              <span className="text-amber-400 text-sm">⚡</span>
              <span>{getTranslation("stage_live_5min", lang)}</span>
            </div>

          </div>
        </div>

      </div>

      {/* Infinite Ticker Bar below Hero */}
      <div className="w-full overflow-hidden mt-10 sm:mt-14 py-3 border-y border-white/10 bg-[#101b33]/60 backdrop-blur-md">
        <div className="flex whitespace-nowrap animate-ticker">
          <div className="flex items-center gap-6 font-mono text-xs text-slate-300 tracking-wider">
            <span className="text-cyan-400 font-bold">SIGNAL::</span>
            <span>{tickerCities}</span>
            <span className="text-cyan-400 font-bold">SIGNAL::</span>
            <span>{tickerCities}</span>
            <span className="text-cyan-400 font-bold">SIGNAL::</span>
            <span>{tickerCities}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
