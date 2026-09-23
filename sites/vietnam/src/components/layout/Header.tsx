import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w">
      <Link href="/" className="flex items-center gap-3 decoration-none">
        <Image
          src="/images/polosim-logo.png"
          alt="PoloSim"
          width={160}
          height={40}
          priority
          className="h-9 w-auto object-contain"
        />
        <span className="logo border-l border-[var(--line)] pl-3 text-[19px] text-[var(--ink)]">
          esimcard.vn
        </span>
      </Link>

      <nav>
        <a href="#tarife">Tarife</a>
        <a href="#ablauf">Ablauf</a>
        <a href="#faq">FAQ</a>
        <Link href="/blog">Blog</Link>
      </nav>

      <span className="lang font-semibold">DE · EN</span>
    </header>
  );
}
