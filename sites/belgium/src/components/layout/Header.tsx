import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w">
      <Link href="/" className="flex items-center gap-4 text-decoration-none">
        <Image
          src="/images/polosim-logo.png"
          alt="PoloSim"
          width={300}
          height={80}
          priority
          className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
        />
        <span className="logo border-l-2 border-[var(--line)] pl-4 text-xl sm:text-2xl font-bold text-[var(--ink)]">
          esimcard.be
        </span>
      </Link>

      <nav>
        <a href="#tarife">Tarife</a>
        <a href="#ablauf">Ablauf</a>
        <a href="#faq">FAQ</a>
        <Link href="/blog">Blog</Link>
      </nav>

      <span className="lang font-bold text-base">DE · EN</span>
    </header>
  );
}
