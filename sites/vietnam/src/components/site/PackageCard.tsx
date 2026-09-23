import type { PolosimPackage } from "@/lib/polosim";

interface Props {
  pkg: PolosimPackage;
}

export default function PackageCard({ pkg }: Props) {
  const isPopular = pkg.popular || !!pkg.badge;

  return (
    <div className={`plan ${isPopular ? "sel" : ""}`}>
      {isPopular && <span className="tag">{pkg.badge || "Beliebt"}</span>}
      <div className="gb">
        {pkg.unlimited ? "Unbegrenzt" : `${pkg.dataAmount} ${pkg.dataUnit}`}
      </div>
      <div className="dur">{pkg.validity} Tage · {pkg.operator || "PoloSim"}</div>
      <div className="pr">{pkg.price} {pkg.currency}</div>
      <div className="pd">Sofortige Aktivierung per QR-Code</div>
      <ul>
        <li>4G / 5G Highspeed</li>
        <li>Hotspot / Tethering</li>
        <li>Keine Verträge & keine Roaming-Kosten</li>
      </ul>
      <a className="btn" href={pkg.buyUrl} target="_blank" rel="noopener noreferrer">
        Jetzt kaufen
      </a>
    </div>
  );
}
