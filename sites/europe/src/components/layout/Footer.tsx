import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#182645] border-t border-white/20 mt-16 py-10">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] flex flex-wrap gap-4 items-center justify-between text-sm text-[var(--soft)]">
        <span>© 2026 PoloSim</span>
        <nav className="flex flex-wrap gap-6">
          <Link href="/impressum" className="hover:text-[var(--c4)] transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-[var(--c4)] transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-[var(--c4)] transition-colors">AGB</Link>
          <a href="mailto:support@polosim.com" className="hover:text-[var(--c4)] transition-colors">support@polosim.com</a>
        </nav>
      </div>
    </footer>
  );
}
