import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* brand */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Image
            src="/images/polosim-logo.png"
            alt="PoloSim"
            width={110}
            height={38}
            className="h-8 w-auto brightness-0 invert opacity-80"
          />
          <p className="text-sm leading-relaxed max-w-xs">
            Die besten eSIM-Tarife für Deutschland. Sofort aktivieren — keine physische SIM, kein Warten.
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/40">Alle Systeme aktiv</span>
          </div>
        </div>

        {/* nav */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Seiten</div>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/packages", label: "Pakete" },
              { href: "/guides",   label: "Guides" },
              { href: "/blog",     label: "Blog"   },
              { href: "/faq",      label: "FAQ"    },
              { href: "/gallery",  label: "Galerie"},
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* polosim */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">PoloSim</div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="https://www.polosim.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5">
                polosim.com
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} esim-germany.com — Powered by PoloSim</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-gold">♥</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
