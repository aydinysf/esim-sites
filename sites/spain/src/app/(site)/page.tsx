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
        nativeCountryName="ESPAÑA"
        activeCity="Madrid"
        tickerCities="MADRID ✦ BARCELONA ✦ SEVILLA ✦ VALENCIA ✦ MÁLAGA ✦ BILBAO ✦ ALICANTE"
      />

      <TariffSection packages={packages} />

      <section id="ablauf" className="py-16 bg-[var(--bg)]">
        <div className="max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)]">
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
        <section id="faq">
          <div className="eyebrow" style={{ color: "var(--c5)" }}>FAQ</div>
          <h2>Häufige Fragen</h2>
          {faqs.map((faq) => (
            <details key={faq.id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      )}

      {posts.length > 0 && (
        <section id="blog">
          <div className="eyebrow" style={{ color: "var(--c2)" }}>BLOG</div>
          <h2>Ratgeber & News</h2>
          <div className="plans">
            {posts.map((post) => (
              <div key={post.id} className="plan">
                <div className="gb" style={{ fontSize: "20px" }}>{post.title}</div>
                <div className="dur">{post.excerpt || post.title}</div>
                <Link className="btn-outline" href={`/blog/${post.slug}`} style={{ marginTop: "16px" }}>
                  Weiterlesen
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="cta-card">
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>¿A qué esperas?</h2>
          <a className="btn-gradient" href="#tarife">Conectar ahora</a>
        </div>
      </section>

      {/* Mobile Fixed Bottom Purchase Bar */}
      <div className="bar">
        <div>
          <b>{packages[0]?.name || "eSIM Plan"}</b>
          <small>{packages[0]?.validity || 30} Tage · Instant QR</small>
        </div>
        <a className="btn-gradient" href={packages[0]?.buyUrl || "#tarife"}>
          Kaufen
        </a>
      </div>
    </>
  );
}
