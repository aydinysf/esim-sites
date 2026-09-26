import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Link href="/" className="flex items-center gap-3 decoration-none">
        <div className="logo-box" />
        <Image
          src="/images/polosim-logo.png"
          alt="PoloSim"
          width={180}
          height={48}
          priority
          className="h-8 w-auto object-contain"
        />
        <span className="logo-text text-lg border-l border-white/20 pl-3">
          esim-azerbaijan.com
        </span>
      </Link>

      <nav>
        <a href="#tarife">Tarife</a>
        <a href="#ablauf">Ablauf</a>
        <a href="#faq">FAQ</a>
        <Link href="/blog">Blog</Link>
      </nav>

      <span className="font-mono text-xs font-bold tracking-widest text-[var(--soft)]">DE · EN</span>
    </header>
  );
}
