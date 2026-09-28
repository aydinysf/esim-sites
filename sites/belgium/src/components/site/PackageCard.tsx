"use client";
import React, { useState, useEffect } from "react";
import type { PolosimPackage } from "@/lib/polosim";
import { getTranslation, LangMode } from "@/lib/i18n";

interface Props {
  pkg: PolosimPackage;
  colorIndex?: number;
}

export default function PackageCard({ pkg }: Props) {
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

  const isPopular = pkg.popular || !!pkg.badge;

  const formattedPrice = pkg.price.toLocaleString("de-AT", {
    style: "currency",
    currency: "EUR",
  });

  const pricePerDayVal = (pkg.price / (pkg.validity || 1)).toLocaleString("de-AT", {
    style: "currency",
    currency: "EUR",
  });

  const dayLabel = pkg.validity === 1 ? getTranslation("pkg_per_day", lang) : getTranslation("pkg_per_days", lang);
  const unlimitedLabel = getTranslation("pkg_chip_unlimited", lang);

  return (
    <div
      className={`relative rounded-2xl p-6 bg-[var(--bg)] border transition-all duration-200 flex flex-col justify-between ${
        isPopular ? "border-2 border-[var(--acc)] shadow-md" : "border-[var(--line)] shadow-sm hover:border-[var(--acc)]"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 right-6 bg-[var(--acc)] text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          {pkg.badge || getTranslation("pkg_popular", lang)}
        </span>
      )}

      <div>
        <div className="text-3xl font-extrabold text-[var(--ink)] mb-1">
          {pkg.unlimited ? unlimitedLabel : `${pkg.dataAmount} ${pkg.dataUnit}`}
        </div>

        <div className="text-sm font-medium text-[var(--mut)] mb-4">
          {pkg.validity} {dayLabel} · 4G/5G · Hotspot
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--line)]">
        <div className="text-2xl font-extrabold text-[var(--ink)] mb-1">
          {formattedPrice}
        </div>
        <div className="text-xs font-semibold text-[var(--mut)] mb-5">
          ≈ {pricePerDayVal} / {getTranslation("pkg_per_day", lang)}
        </div>

        <a
          href={pkg.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-[var(--acc)] text-[var(--accink)] font-bold text-sm py-3 rounded-xl transition-transform hover:scale-[1.02]"
        >
          {getTranslation("pkg_buy_btn", lang)}
        </a>
      </div>
    </div>
  );
}
