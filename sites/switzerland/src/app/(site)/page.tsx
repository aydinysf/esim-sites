import { getPackages } from "@/lib/cache";
import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "CH";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.ch";

export default async function HomePage() {
  const [packages, homepage, faqs, posts] = await Promise.all([
    getPackages(COUNTRY).catch(() => []),
    prisma.homepage.findUnique({ where: { country: COUNTRY } }).catch(() => null),
    prisma.faq.findMany({ where: { country: COUNTRY }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
  ]);

  const headline = homepage?.heroHeadline || "Verbinde dich, bevor du landest.";
  const subheadline = homepage?.heroSubheadline || "Prepaid-eSIM für die Schweiz ohne Vertrag und ohne Roaming-Falle. QR-Code direkt per E-Mail — aktiv, bevor das Gepäckband startet.";
  const ctaText = homepage?.heroCtaText || "Zeig mir die Tarife";
  const ctaHref = homepage?.headerCtaHref || "#tarife";

  return (
    <>
      <ProductListJsonLd packages={packages} siteUrl={SITE_URL} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />}

      <HeroBanner
        headline={headline}
        subheadline={subheadline}
        ctaText={ctaText}
        ctaHref={ctaHref}
        nativeCountryName="SCHWEIZ"
        activeCity="Zürich"
        tickerCities="ZÜRICH ✦ GENF ✦ BASEL ✦ BERN ✦ LAUSANNE ✦ LUZERN ✦ ST. GALLEN"
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
        <h2>undefined</h2>
        <p className="lead" style={{ fontSize: "16px" }}>undefined</p>
        <div className="steps">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3>undefined</h3>
            <p>undefined</p>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <h3>undefined</h3>
            <p>undefined</p>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <h3>undefined</h3>
            <p>undefined</p>
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
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Worauf wartest du noch?</h2>
          <a className="btn-gradient" href="#tarife">Jetzt verbinden</a>
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
