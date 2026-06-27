import Link from "next/link";

interface Props {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  image?: string | null;
}

export default function HeroBanner({ headline, subheadline, ctaText, ctaHref }: Props) {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-germany.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 35%",
        minHeight: "580px",
      }}
    >
      {/* layered overlay: dark base + gold gradient from left */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(28,23,16,0.88) 0%, rgba(28,23,16,0.70) 50%, rgba(28,23,16,0.40) 100%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 flex flex-col items-start gap-6 max-w-2xl">
        {/* eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-light">
          <span className="w-6 h-px bg-gold" /> Powered by PoloSim
        </span>

        <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight">
          {headline}
        </h1>

        <p className="text-lg text-white/75 leading-relaxed max-w-lg">
          {subheadline}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={ctaHref}
            className="bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-pill transition-all shadow-gold hover:shadow-none text-sm"
          >
            {ctaText}
          </Link>
          <Link
            href="/guides"
            className="bg-white/10 hover:bg-white/18 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-pill transition-all text-sm backdrop-blur-sm"
          >
            eSIM Guide
          </Link>
        </div>

        {/* trust row */}
        <div className="flex flex-wrap gap-5 pt-4 border-t border-white/10 mt-2 w-full">
          {[
            { label: "Sofort aktivieren", icon: "⚡" },
            { label: "Kein Vertrag",       icon: "✓"  },
            { label: "24/7 Support",       icon: "💬" },
          ].map(({ label, icon }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-white/60">
              <span className="text-gold text-sm">{icon}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
