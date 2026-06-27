"use client";

import { useState } from "react";
import PackageCard from "./PackageCard";
import type { PolosimPackage } from "@/lib/polosim";

type SortKey = "price" | "data";

export default function PackageGrid({ packages }: { packages: PolosimPackage[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("price");

  const sorted = [...packages].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : b.dataAmount - a.dataAmount
  );

  if (packages.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="text-5xl mb-4">📡</div>
        <p className="text-stone text-sm">Pakete werden geladen…</p>
      </div>
    );
  }

  return (
    <div>
      {/* sort bar */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-stone">Sortieren:</span>
        {(["price", "data"] as SortKey[]).map((opt) => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-pill border transition-all
              ${sortBy === opt
                ? "bg-gold border-gold text-white shadow-gold"
                : "border-sand text-stone hover:border-gold/50 hover:text-ink"
              }`}
          >
            {opt === "price" ? "Preis ↑" : "Daten ↓"}
          </button>
        ))}
        <span className="ml-auto text-xs text-stone tabular">{packages.length} Tarife</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
