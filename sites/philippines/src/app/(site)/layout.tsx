import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
