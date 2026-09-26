import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#1E2E52]/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,4vw,56px)] py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start gap-1 text-decoration-none group">
          <Image
            src="/images/polosim-logo.png"
            alt="PoloSim"
            width={400}
            height={120}
            priority
            className="h-14 sm:h-18 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[var(--c4)] uppercase pl-1">
            España
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-base">
          <a href="#tarife" className="text-[var(--soft)] hover:text-[var(--c4)] transition-colors">Tarife</a>
          <a href="#ablauf" className="text-[var(--soft)] hover:text-[var(--c4)] transition-colors">Ablauf</a>
          <a href="#faq" className="text-[var(--soft)] hover:text-[var(--c4)] transition-colors">FAQ</a>
          <Link href="/blog" className="text-[var(--soft)] hover:text-[var(--c4)] transition-colors">Blog</Link>
        </nav>

        <span className="font-mono text-sm font-bold tracking-widest text-[var(--soft)]">DE · EN</span>
      </div>
    </header>
  );
}
