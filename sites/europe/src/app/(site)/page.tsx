import { getPackages } from "@/lib/cache";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "EU";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esim-europe.com";

export default async function HomePage() {
  const packages = await getPackages(COUNTRY).catch(() => []);

  return (
    <div className="w">
      <ProductListJsonLd packages={packages} siteUrl={SITE_URL} />
      <Header />
      <main>
        <HeroBanner />

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
          <h2>Online in three easy steps</h2>
          <p className="sub">Setup takes less than 5 minutes.</p>
          <div className="steps">
            <div>
              <h3>Choose Plan</h3>
              <p>Select data & validity suited for your trip.</p>
            </div>
            <div>
              <h3>Pay Securely</h3>
              <p>Receive your QR code directly by email.</p>
            </div>
            <div>
              <h3>Scan & Connect</h3>
              <p>Scan QR code, activate eSIM, and enjoy 5G.</p>
            </div>
          </div>
        </section>

        <section id="faq">
          <h2>Häufige Fragen</h2>
          <details>
            <summary>Brauche ich eine Vorwahl oder Telefonnummer?</summary>
            <p>eSIM-Tarife von PoloSim beinhalten Highspeed-Datenvolumen für deine Reise.</p>
          </details>
          <details>
            <summary>Kann ich meinen Hotspot nutzen?</summary>
            <p>Ja, Tethering ve Hotspot ist in allen Tarifen ohne Aufpreis enthalten.</p>
          </details>
          <details>
            <summary>Wann startet die Laufzeit?</summary>
            <p>Die Laufzeit startet erst, wenn sich deine eSIM im Zielland mit dem Netz verbindet.</p>
          </details>
        </section>

        <section>
          <div className="cta">
            <h2>Ready for Europe?</h2>
            <a className="btn" href="#tarife">View Plans</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
