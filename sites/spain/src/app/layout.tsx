import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-hd",
  weight: ["600", "800"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-bd",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eSIM España | esimcard.es",
    template: "%s | esimcard.es",
  },
  description: "eSIM prepago para España sin contratos ni trampas de roaming. Código QR al instante por e-mail: activo antes de recoger la maleta.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable}`}>
      <body>
        <OrganizationJsonLd siteUrl={siteUrl} siteName="esimcard.es" />
        {children}
      </body>
    </html>
  );
}
