import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-hd",
  weight: ["500", "700", "800"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-bd",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.ro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eSIM România | esimcard.ro",
    template: "%s | esimcard.ro",
  },
  description: "eSIM preplătit pentru România fără contracte și fără taxe de roaming. Codul QR soseste instant pe e-mail.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <OrganizationJsonLd siteUrl={siteUrl} siteName="esimcard.ro" />
        {children}
      </body>
    </html>
  );
}
