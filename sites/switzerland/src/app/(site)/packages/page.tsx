import { prisma } from "@/lib/db";
import PackageCard from "@/components/site/PackageCard";
import { getPackages } from "@/lib/cache";
import type { Metadata } from "next";
import { t } from "@/lib/i18n";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { packagesPageTitle: true, packagesPageSubtitle: true },
  });
  return {
    title: hp?.packagesPageTitle || t.home.packagesTitle,
    description: hp?.packagesPageSubtitle || t.footer.tagline,
  };
}

export default async function PackagesPage() {
  const [homepage, packages] = await Promise.all([
    prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { packagesPageTitle: true, packagesPageSubtitle: true },
    }),
    getPackages(COUNTRY).catch(() => []),
  ]);

  const sorted = [...packages].sort((a, b) => a.price - b.price);

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">🇨🇭 Schweiz</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
            {homepage?.packagesPageTitle || t.home.packagesTitle}
          </h1>
          {homepage?.packagesPageSubtitle && (
            <p className="text-stone mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              {homepage.packagesPageSubtitle}
            </p>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="text-center text-stone py-12">
            No active packages found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
