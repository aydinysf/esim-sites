import { getPackages } from "@/lib/cache";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/site/HeroBanner";
import PackageCard from "@/components/site/PackageCard";
import { ProductListJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE || "VN";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.vn";

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
          <h2>Kết nối chỉ trong 3 bước</h2>
          <p className="sub">Cài đặt hoàn tất dưới 5 phút.</p>
          <div className="steps">
            <div>
              <h3>Chọn gói cước</h3>
              <p>Chọn dung lượng và thời hạn phù hợp.</p>
            </div>
            <div>
              <h3>Thanh toán</h3>
              <p>Nhận mã QR ngay lập tức qua email.</p>
            </div>
            <div>
              <h3>Quét mã</h3>
              <p>Quét mã QR và trải nghiệm 5G.</p>
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
            <h2>Sẵn sàng cho Việt Nam?</h2>
            <a className="btn" href="#tarife">Xem gói cước</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
