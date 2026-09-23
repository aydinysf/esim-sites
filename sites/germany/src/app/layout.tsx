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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esim-germany.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eSIM Deutschland | esim-germany.com",
    template: "%s | esim-germany.com",
  },
  description: "Prepaid-eSIM für Deutschland ohne Vertrag und ohne Roaming-Gebühren. Der QR-Code kommt sofort per E-Mail.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <OrganizationJsonLd siteUrl={siteUrl} siteName="esim-germany.com" />
        {children}
      </body>
    </html>
  );
}
