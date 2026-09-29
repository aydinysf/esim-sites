import TariffSection from "@/components/site/TariffSection";
import { getPackages } from "@/lib/cache";
import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "ES";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.es";

export default async function HomePage() {
  const [packages, homepage, faqs, posts] = await Promise.all([
    getPackages(COUNTRY).catch(() => []),
    prisma.homepage.findUnique({ where: { country: COUNTRY } }).catch(() => null),
    prisma.faq.findMany({ where: { country: COUNTRY }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
  ]);

  const headline = homepage?.heroHeadline || "Conéctate, antes de aterrizar.";
  const subheadline = homepage?.heroSubheadline || "eSIM prepago para España sin contratos ni trampas de roaming. Código QR al instante por e-mail: activo antes de recoger la maleta.";
  const ctaText = homepage?.heroCtaText || "Ver los planes";
  const ctaHref = homepage?.headerCtaHref || "#tarife";

  
  const howItWorksTitle = homepage?.howItWorksTitle || "En 3 sencillos pasos online";
  const rawSteps = homepage?.howItWorksSteps as Array<{ title?: string; description?: string; step?: string }> | null;
  const stepsList = (Array.isArray(rawSteps) && rawSteps.length > 0) ? rawSteps : [
    { step: "01", title: "Elige tu tarifa para España", description: "Selecciona el paquete de datos ideal para tu viaje. Recibirás el código QR al instante por e-mail." },
    { step: "02", title: "Escanea el código QR", description: "Escanea el código QR desde los ajustes de tu smartphone en 'Añadir plan móvil'." },
    { step: "03", title: "Conéctate al instante", description: "Activa la línea de datos al llegar. Conéctate directamente a la mejor red local." }
  ];

  return (
    <>
      <ProductListJsonLd packages={packages} siteUrl={SITE_URL} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />}

      <HeroBanner
        headline={headline}
        subheadline={subheadline}
        ctaText={ctaText}
        ctaHref={ctaHref}
        nativeCountryName="ÖSTERREICH"
        activeCity="Wien"
        tickerCities="WIEN ✦ SALZBURG ✦ INNSBRUCK ✦ GRAZ ✦ LINZ ✦ KLAGENFURT ✦ BREGENZ"
      />

      <TariffSection packages={packages} />

      <section id="ablauf" className="py-16 bg-[var(--bg)] w-full">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--acc)] mb-2 inline-block">
              IN DREI SCHRITTEN ONLINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
              {howItWorksTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsList.map((step, idx) => (
              <div key={idx} className="bg-[var(--soft)] border border-[var(--line)] rounded-2xl p-8 flex flex-col items-start">
                <span className="w-10 h-10 rounded-full bg-[var(--acc)] text-[var(--accink)] font-bold text-base flex items-center justify-center mb-6">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{step.title}</h3>
                <p className="text-[var(--mut)] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="faq" className="py-16 bg-[var(--soft)] border-y border-[var(--line)] w-full">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--acc)] mb-2 inline-block">
                HILFE & FRAGEN
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
                Häufige Fragen
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-[var(--bg)] border border-[var(--line)] rounded-2xl p-6 transition-all group">
                  <summary className="font-bold text-base sm:text-lg text-[var(--ink)] cursor-pointer select-none list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-[var(--acc)] font-bold text-xl group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-4 text-[var(--mut)] text-sm sm:text-base leading-relaxed border-t border-[var(--line)] pt-4">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section id="blog" className="py-16 bg-[var(--bg)] w-full">
          <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--acc)] mb-2 inline-block">
                RATGEBER
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
                Ratgeber & News
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-[var(--soft)] border border-[var(--line)] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-xl text-[var(--ink)] mb-2">{post.title}</h3>
                    <p className="text-[var(--mut)] text-sm leading-relaxed line-clamp-3">{post.excerpt || post.title}</p>
                  </div>
                  <Link className="mt-6 inline-flex items-center text-sm font-bold text-[var(--acc)] hover:underline" href={`/blog/${post.slug}`}>
                    Weiterlesen →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-r from-[#1E3A8A] via-[#3B6CF0] to-[#12B5A0] text-white text-center w-full">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Worauf wartest du noch?</h2>
          <a className="inline-flex items-center justify-center bg-white text-[#111827] font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-[#111827] hover:text-white transition-all" href="#tarife">
            Jetzt verbinden
          </a>
        </div>
      </section>
    </>
  );
}
