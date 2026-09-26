import { getPackages } from "@/lib/cache";
import { prisma } from "@/lib/db";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "PH";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.ph";

export default async function HomePage() {
  const [packages, homepage, faqs, posts] = await Promise.all([
    getPackages(COUNTRY).catch(() => []),
    prisma.homepage.findUnique({ where: { country: COUNTRY } }).catch(() => null),
    prisma.faq.findMany({ where: { country: COUNTRY }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
  ]);

  const headline = homepage?.heroHeadline || "Get connected, before you land.";
  const subheadline = homepage?.heroSubheadline || "Prepaid eSIM for the Philippines with zero contracts and no roaming traps. Instant QR code via email — active before baggage claim.";
  const ctaText = homepage?.heroCtaText || "Show Me Plans";
  const ctaHref = homepage?.headerCtaHref || "#tarife";

  
  const howItWorksTitle = homepage?.howItWorksTitle || "Get connected in 3 easy steps";
  const rawSteps = homepage?.howItWorksSteps as Array<{ title?: string; description?: string; step?: string }> | null;
  const stepsList = (Array.isArray(rawSteps) && rawSteps.length > 0) ? rawSteps : [
    { step: "01", title: "Choose your Philippines plan", description: "Select the perfect data package for your trip. Instant QR code delivery by email." },
    { step: "02", title: "Scan the QR code", description: "Scan the QR code in your smartphone settings under 'Add Cellular Plan'." },
    { step: "03", title: "Connect instantly", description: "Enable data upon arrival and enjoy high-speed internet everywhere." }
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
        nativeCountryName="PILIPINAS"
        activeCity="Manila"
        tickerCities="MANILA ✦ CEBU ✦ DAVAO ✦ BORACAY ✦ PALAWAN ✦ BOHOL ✦ ANGELES"
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
          Ready to surf in less than 2 minutes — no physical SIM card needed.
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
          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>What are you waiting for?</h2>
          <a className="btn-gradient" href="#tarife">Connect Now</a>
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
