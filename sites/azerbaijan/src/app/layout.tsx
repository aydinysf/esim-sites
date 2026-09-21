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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esim-azerbaijan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eSIM Azərbaycan | PoloSim",
    template: "%s | PoloSim",
  },
  description: "Azərbaycan üçün ən sərfəli eSIM paketlərini müqayisə edin və dərhal aktivləşdirin.",
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
    title: "eSIM Azərbaycan | PoloSim",
    description: "Azərbaycan üçün ən sərfəli eSIM paketlərini müqayisə edin və dərhal aktivləşdirin.",
    url: siteUrl,
    siteName: "PoloSim eSIM",
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eSIM Azərbaycan | PoloSim",
    description: "Azərbaycan üçün ən sərfəli eSIM paketlərini müqayisə edin və dərhal aktivləşdirin.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <OrganizationJsonLd siteUrl={siteUrl} siteName="eSIM Azərbaycan | PoloSim" />
        {children}
      </body>
    </html>
  );
}
