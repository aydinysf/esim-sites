"use client";
import React, { useState } from "react";
import PackageCard from "@/components/site/PackageCard";
import type { PolosimPackage } from "@/lib/polosim";

interface Props {
  packages: PolosimPackage[];
}

export default function TariffSection({ packages }: Props) {
  const [activeTab, setActiveTab] = useState<"1" | "5-10" | "20-30">("20-30");

  const filteredPackages = packages.filter((pkg) => {
    if (activeTab === "1") return pkg.validity === 1;
    if (activeTab === "5-10") return pkg.validity >= 5 && pkg.validity <= 10;
    if (activeTab === "20-30") return pkg.validity >= 11;
    return true;
  });

  const displayPackages = filteredPackages.length > 0 ? filteredPackages : packages;

  return (
    <section id="tarife" className="py-16 bg-[var(--soft)] border-y border-[var(--line)] w-full">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--acc)] mb-2 inline-block">
            TARIFE & PREISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mb-3">
            Wähle deine Laufzeit
          </h2>
          <p className="text-[var(--mut)] text-base max-w-xl mx-auto font-normal">
            Alle Preise inkl. Hotspot und sofortiger Aktivierung per QR-Code.
          </p>
        </div>

        {/* Segment Control Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto py-2">
          <button
            type="button"
            onClick={() => setActiveTab("1")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === "1"
                ? "bg-[var(--ink)] text-white shadow-md"
                : "bg-[var(--bg)] text-[var(--mut)] border border-[var(--line)] hover:text-[var(--ink)]"
            }`}
          >
            1 Tag
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("5-10")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === "5-10"
                ? "bg-[var(--ink)] text-white shadow-md"
                : "bg-[var(--bg)] text-[var(--mut)] border border-[var(--line)] hover:text-[var(--ink)]"
            }`}
          >
            5–10 Tage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("20-30")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === "20-30"
                ? "bg-[var(--ink)] text-white shadow-md"
                : "bg-[var(--bg)] text-[var(--mut)] border border-[var(--line)] hover:text-[var(--ink)]"
            }`}
          >
            20–30 Tage
          </button>
        </div>

        {/* Full-width Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {displayPackages.map((pkg, idx) => (
            <PackageCard key={pkg.id || idx} pkg={pkg} colorIndex={idx} />
          ))}
        </div>

        {/* Fair-Use & Payment Logos */}
        <div className="mt-12 text-center text-xs text-[var(--mut)] max-w-xl mx-auto space-y-4">
          <p>Unbegrenzte Tarife unterliegen einer Fair-Use-Regel. Die genauen Bedingungen stehen in den AGB.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-[var(--ink)]">
            <span>Bezahlen mit</span>
            <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded font-mono text-[11px]">Visa</span>
            <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded font-mono text-[11px]">Mastercard</span>
            <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded font-mono text-[11px]">PayPal</span>
            <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded font-mono text-[11px]">Apple Pay</span>
            <span className="px-2.5 py-1 bg-[var(--bg)] border border-[var(--line)] rounded font-mono text-[11px]">EPS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
