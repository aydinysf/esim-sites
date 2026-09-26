import type { PolosimPackage } from "@/lib/polosim";

interface Props {
  pkg: PolosimPackage;
  colorIndex?: number;
}

const colors = ["var(--c4)", "var(--c6)", "var(--c1)", "var(--c5)", "var(--c2)", "var(--c3)"];

export default function PackageCard({ pkg, colorIndex = 0 }: Props) {
  const isPopular = pkg.popular || !!pkg.badge;
  const neonColor = colors[colorIndex % colors.length];

  const formattedPrice = pkg.price.toLocaleString("de-CH", {
    style: "currency",
    currency: "EUR",
  });

  const pricePerDay = (pkg.price / (pkg.validity || 1)).toLocaleString("de-CH", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <div
      className={`plan ${isPopular ? "sel" : ""}`}
      style={{ "--pc": neonColor } as React.CSSProperties}
    >
      {isPopular && <span className="tag">{pkg.badge || "BELIEBT"}</span>}
      <div className="gb">
        {pkg.unlimited ? "Unbegrenzt" : `${pkg.dataAmount} ${pkg.dataUnit}`}
      </div>
      <div className="dur">{pkg.validity} {pkg.validity === 1 ? "Tag" : "Tage"} · {pkg.operator || "PoloSim"}</div>

      <div className="chips-row">
        <span className="chip-mini">4G/5G</span>
        <span className="chip-mini">HOTSPOT</span>
        <span className="chip-mini">INSTANT</span>
      </div>

      <div className="pr">{formattedPrice}</div>
      <div className="pd">≈ {pricePerDay} / Tag</div>

      <a className="btn-outline" href={pkg.buyUrl} target="_blank" rel="noopener noreferrer">
        Jetzt kaufen
      </a>
    </div>
  );
}
