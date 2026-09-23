import Link from "next/link";

export default function Header() {
  return (
    <header className="w">
      <Link className="logo" href="/">esimcard.es</Link>
      <nav>
        <a href="#tarife">Tarife</a>
        <a href="#ablauf">Ablauf</a>
        <a href="#faq">FAQ</a>
        <Link href="/blog">Blog</Link>
      </nav>
      <span className="lang">DE · EN</span>
    </header>
  );
}
