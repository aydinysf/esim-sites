import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
