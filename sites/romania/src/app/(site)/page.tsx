import { getPackages } from "@/lib/cache";
import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "RO";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.ro";

export default async function HomePage() {
  const [packages, homepage, faqs, posts] = await Promise.all([
    getPackages(COUNTRY).catch(() => []),
    prisma.homepage.findUnique({ where: { country: COUNTRY } }).catch(() => null),
    prisma.faq.findMany({ where: { country: COUNTRY }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
  ]);

  const headline = homepage?.heroHeadline || "Conectează-te, înainte de aterizare.";
  const subheadline = homepage?.heroSubheadline || "eSIM preplătit pentru România fără contracte și fără capcane de roaming. Cod QR instant pe e-mail — activ înainte de banda de bagaje.";
  const ctaText = homepage?.heroCtaText || "Arată-mi planurile";
  const ctaHref = homepage?.headerCtaHref || "#tarife";

  
  const howItWorksTitle = homepage?.howItWorksTitle || "In 3 einfachen Schritten online";
  const rawSteps = homepage?.howItWorksSteps as Array<{ title?: string; description?: string; step?: string }> | null;
  const stepsList = (Array.isArray(rawSteps) && rawSteps.length > 0) ? rawSteps : [
    { step: "01", title: "Tarif für Rumänien wählen", description: "Wähle das passende Datenpaket für deine Reise. Der QR-Code wird sofort per E-Mail geliefert." },
    { step: "02", title: "QR-Code scannen", description: "Scanne den QR-Code in den Einstellungen deines Smartphones unter 'Mobilfunk hinzufügen'." },
    { step: "03", title: "Sofort verknüpft & surfen", description: "Aktiviere die Datenleitung bei deiner Ankunft. Du bist sofort mit dem besten Netz verbunden." }
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
        nativeCountryName="ROMÂNIA"
        activeCity="Bukarest"
        tickerCities="BUKAREST ✦ KLAUSENBURG ✦ TIMIȘOARA ✦ IAȘI ✦ KRONSTADT ✦ CONSTANȚA"
      />

      <section id="tarife">
        <div className="eyebrow" style={{ color: "var(--c4)" }}>TARIFE & PREISE</div>
        <h2>Wähle deine Laufzeit</h2>
        <p className="lead" style={{ fontSize: "16px", marginBottom: "20px" }}>
          Alle Preise inkl. Hotspot und sofortiger Aktivierung per QR-Code.
        </p>

        <div className="plans">
          {packages.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} colorIndex={idx} />
          ))}
        </div>

        <p className="fair">
          Unbegrenzte Tarife unterliegen einer Fair-Use-Regel. Die genauen Bedingungen stehen in den AGB.
        </p>

        <div className="pay">
          Bezahlen mit <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span><span>EPS</span>
        </div>
      </section>

      <section id="ablauf">
        <div className="eyebrow" style={{ color: "var(--c6)" }}>IN DREI SCHRITTEN ONLINE</div>
        <h2>{howItWorksTitle}</h2>
        <p className="lead" style={{ fontSize: "16px" }}>
          In weniger als 2 Minuten surffähig — ganz ohne physische SIM-Karte.
        </p>
        <div className="steps">
          {stepsList.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-num">{step.step || `0${idx + 1}`}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
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
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Ce mai aștepți?</h2>
          <a className="btn-gradient" href="#tarife">Conectează-te acum</a>
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
