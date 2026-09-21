import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esimcard.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eSIM Česko | PoloSim",
    template: "%s | PoloSim",
  },
  description: "Porovnejte nejlepší eSIM datové tarify pro Česko a okamžitě je aktivujte.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "de-AT": "https://esimcard.at",
      "nl-BE": "https://esimcard.be",
      "de-CH": "https://esimcard.ch",
      "cs-CZ": "https://esimcard.cz",
      "es-ES": "https://esimcard.es",
      "en-PH": "https://esimcard.ph",
      "ro-RO": "https://esimcard.ro",
      "vi-VN": "https://esimcard.vn",
      "de-DE": "https://esim-germany.com",
      "az-AZ": "https://esim-azerbaijan.com",
      "en-EU": "https://esim-europe.com",
      "x-default": "https://esim-europe.com"
},
  },
  openGraph: {
    title: "eSIM Česko | PoloSim",
    description: "Porovnejte nejlepší eSIM datové tarify pro Česko a okamžitě je aktivujte.",
    url: siteUrl,
    siteName: "PoloSim eSIM",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eSIM Česko | PoloSim",
    description: "Porovnejte nejlepší eSIM datové tarify pro Česko a okamžitě je aktivujte.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <OrganizationJsonLd siteUrl={siteUrl} siteName="eSIM Česko | PoloSim" />
        {children}
      </body>
    </html>
  );
}
