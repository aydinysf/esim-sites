"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Banner {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  image: string;
  ctaText?: string | null;
  ctaHref?: string | null;
}

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % banners.length), [banners.length]);
  const prev = () => setCurrent(c => (c - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next, banners.length]);

  if (!banners.length) return null;
  const b = banners[current];

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ minHeight: 620 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide images */}
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${banner.image}')` }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(100deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.70) 45%, rgba(15,23,42,0.30) 100%)"
          }} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-gold/90">PoloSim</span>
          </div>

          {b.title && (
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight transition-opacity duration-500">
              {b.title}
            </h1>
          )}
          {b.subtitle && (
            <p className="text-lg leading-relaxed text-white/70 max-w-md">{b.subtitle}</p>
          )}
          {b.ctaText && b.ctaHref && (
            <div className="pt-2">
              <Link
                href={b.ctaHref}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-7 py-3.5 rounded-pill transition-all shadow-gold text-sm"
              >
                {b.ctaText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      {banners.length > 1 && (
        <>
          <button onClick={prev} aria-label="Vorherige"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm text-lg font-light">
            ‹
          </button>
          <button onClick={next} aria-label="Nächste"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/30 hover:bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm text-lg font-light">
            ›
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Folie ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-gold w-6" : "bg-white/30 hover:bg-white/50 w-1.5"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
