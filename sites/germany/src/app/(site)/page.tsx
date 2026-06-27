import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import BlogCard from "@/components/site/BlogCard";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Germany eSIM 2024 | Best Plans for Travelers",
  description: "Compare the best Germany eSIM plans. Instant activation, no contract.",
};

export default async function HomePage() {
  const [homepage, featuredPosts] = await Promise.all([
    prisma.homepage.findUnique({ where: { country: COUNTRY } }),
    prisma.post.findMany({
      where: { country: COUNTRY, status: "PUBLISHED", featured: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
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
      <HeroBanner
        headline={homepage.heroHeadline}
        subheadline={homepage.heroSubheadline}
        ctaText={homepage.heroCtaText}
        ctaHref="/packages"
        image={homepage.heroImage}
      />

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
              <div key={i} className="bg-card border border-sand rounded-card p-7 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-gold-subtle flex items-center justify-center text-2xl mb-4">
                  {item.icon === "zap" ? "⚡" : item.icon === "globe" ? "🌐" : "🔒"}
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{item.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{item.description}</p>
              </div>
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
              <div key={i} className="text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold text-white font-display font-bold text-xl flex items-center justify-center shadow-gold">
                  {step.step}
                </div>
                <div className="w-px h-4 bg-sand md:hidden" />
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{step.description}</p>
              </div>
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

      {/* CTA band */}
      <section className="py-16 px-6 bg-ink text-white">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 className="font-display text-3xl font-bold">Bereit für Deutschland?</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Vergleiche alle Tarife und aktiviere deine eSIM in unter 5 Minuten.
          </p>
          <a
            href="/packages"
            className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-pill transition-all shadow-gold hover:shadow-none text-sm"
          >
            Tarife vergleichen →
          </a>
        </div>
      </section>
    </>
  );
}
