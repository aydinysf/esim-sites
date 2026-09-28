"use client";
import React, { useState, useEffect, useRef } from "react";
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

const slidesData = [
  {
    id: 1,
    title: "Verbinde dich, bevor du landest.",
    desc: "Prepaid-Datentarife ohne Vertrag, ohne Roaming-Gebühren. QR-Code scannen und sofort lossurfen.",
    cta: "Tarife vergleichen",
    href: "#tarife",
    watermark: "eSIM",
    bgStyle: "radial-gradient(55% 90% at 90% 15%, rgba(255,255,255,.28), transparent 60%), linear-gradient(120deg, #1E3A8A, #3B6CF0)"
  },
  {
    id: 2,
    title: "In unter 5 Minuten online.",
    desc: "Tarif wählen, bezahlen, QR-Code scannen. Ganz ohne physische SIM-Karte.",
    cta: "So funktioniert es",
    href: "#ablauf",
    watermark: "5 Min.",
    bgStyle: "radial-gradient(55% 90% at 90% 15%, rgba(255,255,255,.28), transparent 60%), linear-gradient(120deg, #0B6E8C, #12B5A0)"
  },
  {
    id: 3,
    title: "Ab 1,68 € nach ESPAÑA.",
    desc: "Keine Roaming-Gebühren, kein Vertrag. Hotspot inklusive.",
    cta: "Tarife ansehen",
    href: "#tarife",
    watermark: "1,68 €",
    bgStyle: "radial-gradient(55% 90% at 90% 15%, rgba(255,255,255,.28), transparent 60%), linear-gradient(120deg, #B3202F, #F26A2E)"
  }
];

export default function HeroBanner({ nativeCountryName = "ESPAÑA" }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deviceResult, setDeviceResult] = useState("");
  const [lang, setLang] = useState<LangMode>("NATIVE");
  const isPausedRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("polosim_lang") as LangMode;
    if (saved) setLang(saved);

    const handleLangChange = (e: any) => {
      if (e.detail) setLang(e.detail);
    };

    window.addEventListener("polosim_lang_change", handleLangChange);

    // Auto-slide every 6s unless reduced-motion is preferred
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: NodeJS.Timeout;

    if (!prefersReducedMotion) {
      timer = setInterval(() => {
        if (!isPausedRef.current) {
          setCurrentSlide((prev) => (prev + 1) % slidesData.length);
        }
      }, 6000);
    }

    return () => {
      window.removeEventListener("polosim_lang_change", handleLangChange);
      if (timer) clearInterval(timer);
    };
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

  const slide = slidesData[currentSlide];

  return (
    <div className="w-full relative">
      {/* Hero Slider Section */}
      <section
        role="region"
        aria-roledescription="carousel"
        className="w-full relative overflow-hidden text-white transition-all duration-700 ease-in-out"
        style={{ background: slide.bgStyle }}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onFocus={() => (isPausedRef.current = true)}
        onBlur={() => (isPausedRef.current = false)}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 py-[clamp(56px,8vw,120px)] relative z-10 flex flex-col items-start min-h-[420px] justify-center">
          
          {/* Watermark Background Text */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-white/20 select-none pointer-events-none tracking-tighter"
            style={{ fontSize: "clamp(90px, 17vw, 250px)", lineHeight: 0.8 }}
          >
            {slide.watermark}
          </div>

          {/* Slide Content */}
          <div className="max-w-[720px] relative z-20">
            <h1 className="font-extrabold text-[clamp(38px,6vw,76px)] leading-[1.05] tracking-tight text-white mb-5">
              {slide.title}
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-[600px]">
              {slide.desc}
            </p>
            <a
              href={slide.href}
              className="inline-flex items-center justify-center bg-white text-[#111827] font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-[#111827] hover:text-white"
            >
              {slide.cta}
            </a>
          </div>

          {/* Slider Controls Bar */}
          <div className="absolute bottom-6 left-4 sm:left-8 lg:left-12 right-4 sm:right-8 lg:right-12 flex items-center justify-between z-30">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {slidesData.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Folie ${idx + 1}`}
                  aria-current={idx === currentSlide ? "true" : "false"}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Vorheriges Bild"
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#111827] transition-all"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Nächstes Bild"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slidesData.length)}
                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#111827] transition-all"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Device Compatibility Strip (Sade / Clean) */}
      <section className="w-full bg-[var(--soft)] border-b border-[var(--line)] py-5 px-4 sm:px-8 lg:px-12">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <label htmlFor="dev" className="font-semibold text-sm sm:text-base text-[var(--ink)] whitespace-nowrap">
            {getTranslation("device_check_title", lang)}
          </label>
          <div className="flex-1 w-full max-w-[480px]">
            <select
              id="dev"
              onChange={handleDeviceChange}
              className="w-full bg-[var(--bg)] border border-[var(--line)] rounded-xl px-4 py-3 text-[var(--ink)] font-medium text-sm focus:outline-none focus:border-[var(--acc)] cursor-pointer"
            >
              <option value="">{getTranslation("device_check_select", lang)}</option>
              <option value="1">iPhone XS / XR oder neuer</option>
              <option value="1">Samsung Galaxy S20 oder neuer</option>
              <option value="1">Google Pixel 3 oder neuer</option>
              <option value="0">Anderes Gerät</option>
            </select>
          </div>
        </div>
        {deviceResult && (
          <p className="w-full mt-2 text-sm font-semibold text-[var(--acc)]" aria-live="polite">
            {deviceResult}
          </p>
        )}
      </section>
    </div>
  );
}
