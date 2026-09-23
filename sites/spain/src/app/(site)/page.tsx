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
  const [packages, homepage, faqs, posts, guides] = await Promise.all([
    getPackages(COUNTRY).catch(() => []),
    prisma.homepage.findUnique({ where: { country: COUNTRY } }).catch(() => null),
    prisma.faq.findMany({ where: { country: COUNTRY }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
    prisma.guide.findMany({ where: { country: COUNTRY, status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 3 }).catch(() => []),
  ]);

  const headline = homepage?.heroHeadline || "Ankommen, scannen, online sein.";
  const subheadline = homepage?.heroSubheadline || "Prepaid-eSIM für España ohne Vertrag und ohne Roaming-Gebühren.";
  const ctaText = homepage?.heroCtaText || "Tarife ansehen";
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
      />

      <section id="tarife">
        <h2>Wähle deine Laufzeit</h2>
        <p className="sub">Alle Preise inkl. Hotspot und sofortiger Aktivierung.</p>

        <div className="plans">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <p className="fair">
          Unbegrenzte Tarife unterliegen einer Fair-Use-Regel. Die genauen Bedingungen stehen in den AGB.
        </p>

        <div className="pay">
          Bezahlen mit <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span>
        </div>
      </section>

      <section id="ablauf">
        <h2>In drei Schritten online</h2>
        <p className="sub">Die Einrichtung dauert unter fünf Minuten.</p>
        <div className="steps">
          <div>
            <h3>Tarif wählen</h3>
            <p>Datenmenge und Laufzeit passen zu deiner Reise.</p>
          </div>
          <div>
            <h3>Bezahlen</h3>
            <p>Den QR-Code bekommst du direkt per E-Mail.</p>
          </div>
          <div>
            <h3>Scannen</h3>
            <p>QR-Code scannen, eSIM aktivieren, lossurfen.</p>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="faq">
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
          <h2>Blog & Ratgeber</h2>
          <div className="plans">
            {posts.map((post) => (
              <div key={post.id} className="plan">
                <div className="gb" style={{ fontSize: '20px' }}>{post.title}</div>
                <div className="dur">{post.excerpt || post.title}</div>
                <Link className="btn" href={`/blog/${post.slug}`} style={{ marginTop: '16px' }}>
                  Weiterlesen
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="cta">
          <h2>Bereit für España?</h2>
          <a className="btn" href="#tarife">Tarif wählen</a>
        </div>
      </section>
    </>
  );
}
