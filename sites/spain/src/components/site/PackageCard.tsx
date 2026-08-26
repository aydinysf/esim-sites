import BuyButton from "./BuyButton";
import type { PolosimPackage } from "@/lib/polosim";

interface Props {
  pkg: PolosimPackage;
}

export default function PackageCard({ pkg }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.name,
    description: `${pkg.dataAmount}${pkg.dataUnit} — ${pkg.validity} days`,
    brand: { "@type": "Brand", name: "PoloSim" },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: "https://schema.org/InStock",
      url: pkg.buyUrl,
    },
  };

  const isPopular = pkg.popular || !!pkg.badge;

  return (
    <div className={`relative flex flex-col bg-card rounded-card border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift group
      ${isPopular ? "border-gold shadow-gold/20 shadow-md" : "border-sand shadow-card hover:border-gold/40"}`}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* badge */}
      {(pkg.badge || pkg.popular) && (
        <div className="absolute -top-px left-0 right-0 h-0.5 rounded-t-card bg-gold" />
      )}
      {(pkg.badge || pkg.popular) && (
        <span className="absolute -top-3 left-5 bg-gold text-white text-[11px] font-bold px-3 py-0.5 rounded-pill tracking-wide uppercase">
          {pkg.badge || "Beliebt"}
        </span>
      )}

      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* data + validity */}
        <div>
          <div className="flex items-baseline gap-1.5">
            {pkg.unlimited ? (
              <>
                <span className="font-display text-3xl font-bold text-ink leading-none">∞</span>
                <span className="text-base font-semibold text-stone">Unbegrenzt</span>
              </>
            ) : (
              <>
                <span className="font-display text-3xl font-bold text-ink tabular">{pkg.dataAmount}</span>
                <span className="text-base font-semibold text-stone">{pkg.dataUnit}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-stone">
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
              </svg>
              {pkg.validity} Tage
            </span>
            <span className="text-sand">·</span>
            <span>{pkg.operator}</span>
          </div>
        </div>

        {/* price */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl font-bold text-gold tabular leading-none">{pkg.price}</span>
          <span className="text-sm font-medium text-stone">{pkg.currency}</span>
        </div>

        {/* features */}
        {pkg.features.length > 0 && (
          <ul className="space-y-1.5 flex-1">
            {pkg.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone">
                <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-6 pb-6">
        <BuyButton buyUrl={pkg.buyUrl} popular={isPopular} />
      </div>
    </div>
  );
}
