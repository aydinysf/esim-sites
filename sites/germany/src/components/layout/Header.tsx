import Link from "next/link";
import { prisma } from "@/lib/db";
import Image from "next/image";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

const defaultNav = [
  { id: "home",   label: "Start",   href: "/",         target: "_self", children: [] },
  { id: "pkgs",   label: "Pakete",  href: "/packages", target: "_self", children: [] },
  { id: "guides", label: "Guides",  href: "/guides",   target: "_self", children: [] },
  { id: "blog",   label: "Blog",    href: "/blog",     target: "_self", children: [] },
  { id: "faq",    label: "FAQ",     href: "/faq",      target: "_self", children: [] },
];

async function getHeaderData() {
  try {
    const [menuItems, homepage] = await Promise.all([
      prisma.menuItem.findMany({
        where: { country: COUNTRY, parentId: null },
        orderBy: { order: "asc" },
        include: { children: { orderBy: { order: "asc" } } },
      }),
      prisma.homepage.findUnique({
        where: { country: COUNTRY },
        select: { headerCtaText: true, headerCtaHref: true },
      }),
    ]);
    return {
      navItems: menuItems.length > 0 ? menuItems : defaultNav,
      ctaText: homepage?.headerCtaText || "Tarife ansehen",
      ctaHref: homepage?.headerCtaHref || "/packages",
    };
  } catch {
    return { navItems: defaultNav, ctaText: "Tarife ansehen", ctaHref: "/packages" };
  }
}

export default async function Header() {
  const { navItems, ctaText, ctaHref } = await getHeaderData();

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="PoloSim – Startseite">
          <Image
            src="/images/polosim-logo.png"
            alt="PoloSim"
            width={1536}
            height={1024}
            priority
            className="h-16 w-auto"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Hauptnavigation">
          {navItems.map((item: any) =>
            item.children?.length > 0 ? (
              <div key={item.id} className="relative group">
                <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-muted hover:text-ink transition-colors rounded-lg hover:bg-[#F1F5F9]">
                  {item.label}
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-card shadow-lift min-w-[200px] py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  {item.children.map((child: any) => (
                    <Link key={child.id} href={child.href} target={child.target}
                      className="flex items-center px-4 py-2.5 text-sm text-muted hover:text-ink hover:bg-[#F8FAFC] transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.id} href={item.href} target={item.target}
                className="px-3.5 py-2 text-sm font-medium text-muted hover:text-ink transition-colors rounded-lg hover:bg-[#F1F5F9]">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="flex-shrink-0 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-pill transition-colors shadow-gold whitespace-nowrap"
        >
          {ctaText}
        </Link>
      </div>
    </header>
  );
}
