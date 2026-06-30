import Link from "next/link";
import { prisma } from "@/lib/db";
import Image from "next/image";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

async function getFooterData() {
  try {
    return await prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { footerTagline: true },
    });
  } catch { return null; }
}

export default async function Footer() {
  const data = await getFooterData();
  const tagline = data?.footerTagline || "Die besten eSIM-Tarife für Deutschland. Sofort aktivieren — keine physische SIM, kein Warten.";

  return (
    <footer className="bg-[#0F172A] text-white/50">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="inline-flex bg-white rounded-xl px-4 py-3 w-fit">
            <Image
              src="/images/polosim-logo.png"
              alt="PoloSim"
              width={1536}
              height={1024}
              className="h-12 w-auto"
            />
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-white/50">{tagline}</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/30">Alle Systeme aktiv</span>
          </div>
        </div>

        {/* Seiten */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/25 mb-4">Seiten</p>
          <ul className="space-y-3">
            {[
              { href: "/packages", label: "Pakete"  },
              { href: "/guides",   label: "Guides"  },
              { href: "/blog",     label: "Blog"    },
              { href: "/faq",      label: "FAQ"     },
              { href: "/gallery",  label: "Galerie" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PoloSim */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/25 mb-4">PoloSim</p>
          <ul className="space-y-3">
            <li>
              <a href="https://www.polosim.com" target="_blank" rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                polosim.com
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <Link href="/admin" className="text-sm text-white/50 hover:text-white transition-colors">Admin</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {new Date().getFullYear()} esim-germany.com — Powered by PoloSim</span>
          <span>Made with <span className="text-gold">♥</span></span>
        </div>
      </div>
    </footer>
  );
}
