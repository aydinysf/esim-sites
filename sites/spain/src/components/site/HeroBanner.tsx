import Link from "next/link";

interface Props {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  image?: string | null;
}

export default function HeroBanner({ headline, subheadline, ctaText, ctaHref, image }: Props) {
  return (
    <section className="relative overflow-hidden text-white" style={{ minHeight: 620 }}>
      {image ? (
        <>
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
            style={{ backgroundImage: `url('${image}')` }}
          />
          {/* Overlay: strong on left, fades right */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(100deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0.30) 100%)"
          }} />
        </>
      ) : (
        <>
          {/* Gradient fallback when no image is set */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(120% 120% at 0% 0%, #1e293b 0%, #0F172A 55%, #020617 100%)"
          }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #C4A234 1px, transparent 0)",
            backgroundSize: "28px 28px"
          }} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-xl flex flex-col gap-6">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold/90">
              Powered by PoloSim
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg leading-relaxed text-white/70 max-w-md">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-pill transition-all shadow-gold text-sm"
            >
              {ctaText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-pill transition-all text-sm backdrop-blur-sm"
            >
              eSIM Guide
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 pt-4 mt-2 border-t border-white/[0.12]">
            {[
              { label: "Sofort aktivieren" },
              { label: "Kein Vertrag"      },
              { label: "24/7 Support"      },
            ].map(({ label }) => (
              <span key={label} className="flex items-center gap-2 text-xs text-white/50">
                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
