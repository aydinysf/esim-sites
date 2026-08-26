import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import BannerSlider from "@/components/site/BannerSlider";
import BlogCard from "@/components/site/BlogCard";
import PackageCard from "@/components/site/PackageCard";
import Reveal from "@/components/site/Reveal";
import { getPackages } from "@/lib/cache";
import type { Metadata } from "next";
import { t } from "@/lib/i18n";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { metaSiteTitle: true, metaSiteDescription: true },
  });
  return {
    title: hp?.metaSiteTitle || `eSIM | PoloSim`,
    description: hp?.metaSiteDescription || t.footer.tagline,
  };
}

export default async function HomePage() {
  const [homepage, featuredPosts, banners, packages] = await Promise.all([
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
    getPackages(COUNTRY).catch(() => []),
  ]);

  const teaserPackages = [...packages].sort((a, b) => a.price - b.price);

  if (!homepage) {
    return <div className="p-8 text-center text-stone">Content loading...</div>;
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

      {teaserPackages.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.home.packagesEyebrow}</p>
                <h2 className="font-display text-4xl font-bold text-ink">
                  {homepage.packagesPageTitle || t.home.packagesTitle}
                </h2>
                {homepage.packagesPageSubtitle && (
                  <p className="text-sm text-stone mt-2 max-w-xl">{homepage.packagesPageSubtitle}</p>
                )}
              </div>
              <a href="/packages" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1 whitespace-nowrap">
                {t.home.viewAllPackages} →
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {teaserPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

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

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.home.whyEyebrow}</p>
            <h2 className="font-display text-4xl font-bold text-ink">{homepage.whyEsimTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyItems.map((item, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="bg-card border border-sand rounded-card p-7 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <h3 className="font-semibold text-ink mb-1.5">{item.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card border-y border-sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.home.howEyebrow}</p>
            <h2 className="font-display text-4xl font-bold text-ink">{homepage.howItWorksTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howSteps.map((step, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold text-white font-display font-bold text-xl flex items-center justify-center shadow-gold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.home.guidesEyebrow}</p>
                <h2 className="font-display text-4xl font-bold text-ink">{t.home.guidesTitle}</h2>
              </div>
              <a href="/blog" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors flex items-center gap-1">
                {t.home.viewAllGuides} →
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

      <section className="py-20 px-6 bg-ivory border-y border-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{t.home.reviewsEyebrow}</p>
            <h2 className="font-display text-4xl font-bold text-ink">{t.home.reviewsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.home.testimonials.map((review, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="bg-card border border-sand rounded-card p-7 shadow-card h-full flex flex-col gap-4">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 00.95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.59a1 1 0 00-.36 1.12l1.36 4.18c.3.92-.76 1.69-1.54 1.12l-3.56-2.59a1 1 0 00-1.18 0l-3.56 2.59c-.78.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 00-.36-1.12L1.4 9.6c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 00.95-.69l1.36-4.18z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-stone leading-relaxed flex-1">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-9 h-9 rounded-full bg-gold-pale text-gold font-bold flex items-center justify-center text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{review.name}</div>
                      <div className="text-xs text-muted">{review.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {(homepage.ctaBandTitle || homepage.ctaBandCtaText) && (
        <section className="py-16 px-6 bg-ink text-white">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
            {homepage.ctaBandTitle && <h2 className="font-display text-3xl font-bold">{homepage.ctaBandTitle}</h2>}
            {homepage.ctaBandSubtitle && <p className="text-white/60 text-sm leading-relaxed">{homepage.ctaBandSubtitle}</p>}
            {homepage.ctaBandCtaText && homepage.ctaBandCtaHref && (
              <a href={homepage.ctaBandCtaHref} className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-pill transition-all shadow-gold text-sm">
                {homepage.ctaBandCtaText}
              </a>
            )}
          </div>
        </section>
      )}
    </>
  );
}
