import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Link href="/" className="flex items-center gap-4 text-decoration-none">
        <div className="logo-box" />
        <Image
          src="/images/polosim-logo.png"
          alt="PoloSim"
          width={400}
          height={120}
          priority
          className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
        />
        <span className="logo-text text-xl sm:text-2xl border-l-2 border-white/20 pl-4">
          esim-germany.com
        </span>
      </Link>

      <nav>
        <a href="#tarife">Tarife</a>
        <a href="#ablauf">Ablauf</a>
        <a href="#faq">FAQ</a>
        <Link href="/blog">Blog</Link>
      </nav>

      <span className="font-mono text-sm font-bold tracking-widest text-[var(--soft)]">DE · EN</span>
    </header>
  );
}
