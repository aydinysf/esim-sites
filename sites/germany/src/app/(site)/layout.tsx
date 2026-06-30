import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Admin panelden yapılan değişikliklerin (menü, içerik) anında yansıması için
// site sayfaları her istekte sunucuda render edilir. Production'da next start
// ile bu hızlıdır (yavaşlık yalnızca dev modundaki derlemeden kaynaklanıyordu).
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
