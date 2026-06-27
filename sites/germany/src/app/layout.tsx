import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://esim-germany.com"),
  title: {
    default: "Germany eSIM | esim-germany.com",
    template: "%s | esim-germany.com",
  },
  description: "Compare Germany eSIM plans. Buy online, activate instantly.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-ivory text-ink font-sans">{children}</body>
    </html>
  );
}
