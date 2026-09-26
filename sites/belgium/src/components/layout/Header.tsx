import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
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
          België
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
