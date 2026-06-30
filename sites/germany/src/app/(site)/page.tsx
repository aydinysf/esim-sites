import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import BannerSlider from "@/components/site/BannerSlider";
import BlogCard from "@/components/site/BlogCard";
import Reveal from "@/components/site/Reveal";
import type { Metadata } from "next";


const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: process.env.PUBLIC_COUNTRY_CODE! },
    select: { metaSiteTitle: true, metaSiteDescription: true },
  });
  return {
    title: hp?.metaSiteTitle || "Germany eSIM | PoloSim",
    description: hp?.metaSiteDescription || "Die besten eSIM-Tarife für Deutschland.",
  };
}

export default async function HomePage() {
  const [homepage, featuredPosts, banners] = await Promise.all([
    prisma.homepage.findUnique({ where: { country: COUNTRY } }),
    prisma.post.findMany({
      where: { country: COUNTRY, status: "PUBLISHED", featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.banner.findMany({
      where: { country: COUNTRY, active: true },
      orderBy: { order: "asc" },
    }),
  ]);

  if (!homepage) {
    return <div className="p-8 text-center text-stone">Ana sayfa içeriği henüz eklenmedi.</div>;
  }

  const whyItems  = homepage.whyEsimItems    as { icon: string; title: string; description: string }[];
  const howSteps  = homepage.howItWorksSteps as { step: number; title: string; description: string }[];
  const stats     = homepage.stats           as { value: string; label: string }[];

  return (
    <>
      {banners.length > 0 ? (
        <BannerSlider banners={banners} />
      ) : (
        <HeroBanner
          headline={homepage.heroHeadline}
          subheadline={homepage.heroSubheadline}
          ctaText={homepage.heroCtaText}
          ctaHref={homepage.ctaBandCtaHref || "/packages"}
          image={homepage.heroImage}
        />
      )}

      {/* Stats bar */}
      {stats.length > 0 && (
        <section className="bg-gold">
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-center gap-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold text-white tabular">{s.value}</div>
                <div className="text-xs text-white/70 mt-0.5 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why eSIM */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Vorteile</p>
            <h2 className="font-display text-4xl font-bold text-ink">{homepage.whyEsimTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyItems.map((item, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="bg-card border border-sand rounded-card p-7 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200 h-full">
                <div className="w-11 h-11 rounded-xl bg-gold-pale flex items-center justify-center text-gold mb-4">
                  {item.icon === "zap" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  ) : item.icon === "globe" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  )}
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{item.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-card border-y border-sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Anleitung</p>
            <h2 className="font-display text-4xl font-bold text-ink">{homepage.howItWorksTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howSteps.map((step, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold text-white font-display font-bold text-xl flex items-center justify-center shadow-gold">
                    {step.step}
                  </div>
                  <div className="w-px h-4 bg-sand md:hidden" />
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Ratgeber</p>
                <h2 className="font-display text-4xl font-bold text-ink">Tipps & Guides</h2>
              </div>
              <a href="/blog" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1">
                Alle ansehen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 px-6 bg-ivory border-y border-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Bewertungen</p>
            <h2 className="font-display text-4xl font-bold text-ink">Das sagen unsere Nutzer</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Lena M.", role: "Reisende", text: "In zwei Minuten eingerichtet und sofort online. Genau so einfach, wie es sein sollte." },
              { name: "Tobias K.", role: "Geschäftsreise", text: "Kein Vertrag, kein Papierkram — ich kaufe nur das Datenvolumen, das ich wirklich brauche." },
              { name: "Aylin S.", role: "Studentin", text: "Stabile Verbindung im ganzen Land und der Support hat mir nachts in 5 Minuten geholfen." },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="bg-card border border-sand rounded-card p-7 shadow-card h-full flex flex-col gap-4">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 00.95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.59a1 1 0 00-.36 1.12l1.36 4.18c.3.92-.76 1.69-1.54 1.12l-3.56-2.59a1 1 0 00-1.18 0l-3.56 2.59c-.78.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 00-.36-1.12L1.4 9.6c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 00.95-.69l1.36-4.18z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-stone leading-relaxed flex-1">„{t.text}“</p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-9 h-9 rounded-full bg-gold-pale text-gold font-bold flex items-center justify-center text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      {(homepage.ctaBandTitle || homepage.ctaBandCtaText) && (
        <section className="py-16 px-6 bg-ink text-white">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
            {homepage.ctaBandTitle && (
              <h2 className="font-display text-3xl font-bold">{homepage.ctaBandTitle}</h2>
            )}
            {homepage.ctaBandSubtitle && (
              <p className="text-white/60 text-sm leading-relaxed">{homepage.ctaBandSubtitle}</p>
            )}
            {homepage.ctaBandCtaText && homepage.ctaBandCtaHref && (
              <a
                href={homepage.ctaBandCtaHref}
                className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-pill transition-all shadow-gold hover:shadow-none text-sm"
              >
                {homepage.ctaBandCtaText}
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}
