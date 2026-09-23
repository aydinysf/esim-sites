import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w">
      <span>© 2026 PoloSim</span>
      <nav>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/agb">AGB</Link>
        <a href="mailto:support@polosim.com">support@polosim.com</a>
      </nav>
    </footer>
  );
}
