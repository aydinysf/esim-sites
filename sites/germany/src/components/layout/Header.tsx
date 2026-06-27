import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

const defaultNav = [
  { id: "pkgs",   label: "Pakete",  href: "/packages", target: "_self", children: [] },
  { id: "guides", label: "Guides",  href: "/guides",   target: "_self", children: [] },
  { id: "blog",   label: "Blog",    href: "/blog",     target: "_self", children: [] },
  { id: "faq",    label: "FAQ",     href: "/faq",      target: "_self", children: [] },
];

async function getMenuItems() {
  try {
    const items = await prisma.menuItem.findMany({
      where: { country: COUNTRY, parentId: null },
      orderBy: { order: "asc" },
      include: { children: { orderBy: { order: "asc" } } },
    });
    return items.length > 0 ? items : defaultNav;
  } catch {
    return defaultNav;
  }
}

export default async function Header() {
  const navItems = await getMenuItems();

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-sand sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/polosim-logo.png"
            alt="PoloSim"
            width={130}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item: any) =>
            item.children?.length > 0 ? (
              <div key={item.id} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-stone hover:text-ink transition-colors rounded-lg hover:bg-sand/50">
                  {item.label}
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 bg-card border border-sand rounded-card shadow-lift min-w-[180px] py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {item.children.map((child: any) => (
                    <Link key={child.id} href={child.href} target={child.target}
                      className="block px-4 py-2 text-sm text-stone hover:text-ink hover:bg-ivory transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.id} href={item.href} target={item.target}
                className="px-3 py-2 text-sm text-stone hover:text-ink transition-colors rounded-lg hover:bg-sand/50">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/packages"
          className="flex-shrink-0 bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2 rounded-pill transition-colors shadow-gold"
        >
          Tarife ansehen
        </Link>
      </div>
    </header>
  );
}
