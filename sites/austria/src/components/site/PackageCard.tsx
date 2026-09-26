"use client";
import React, { useState, useEffect } from "react";
import type { PolosimPackage } from "@/lib/polosim";
import { getTranslation, LangMode } from "@/lib/i18n";

interface Props {
  pkg: PolosimPackage;
  colorIndex?: number;
}

const colors = ["var(--c4)", "var(--c6)", "var(--c1)", "var(--c5)", "var(--c2)", "var(--c3)"];

export default function PackageCard({ pkg, colorIndex = 0 }: Props) {
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
  const neonColor = colors[colorIndex % colors.length];

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
      className={`plan ${isPopular ? "sel" : ""}`}
      style={{ "--pc": neonColor } as React.CSSProperties}
    >
      {isPopular && <span className="tag">{pkg.badge || getTranslation("pkg_popular", lang)}</span>}
      <div className="gb">
        {pkg.unlimited ? unlimitedLabel : `${pkg.dataAmount} ${pkg.dataUnit}`}
      </div>
      <div className="dur">{pkg.validity} {dayLabel} · {pkg.operator || "PoloSim"}</div>

      <div className="chips-row">
        <span className="chip-mini">4G/5G</span>
        <span className="chip-mini">{getTranslation("pkg_chip_hotspot", lang)}</span>
        <span className="chip-mini">{getTranslation("pkg_chip_instant", lang)}</span>
      </div>

      <div className="pr">{formattedPrice}</div>
      <div className="pd">≈ {pricePerDayVal} / {getTranslation("pkg_per_day", lang)}</div>

      <a className="btn-outline" href={pkg.buyUrl} target="_blank" rel="noopener noreferrer">
        {getTranslation("pkg_buy_btn", lang)}
      </a>
    </div>
  );
}
