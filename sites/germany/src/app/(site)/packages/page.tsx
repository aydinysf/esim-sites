import { prisma } from "@/lib/db";
import { getPackages } from "@/lib/cache";
import PackageGrid from "@/components/site/PackageGrid";
import PageHeader from "@/components/site/PageHeader";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function generateMetadata(): Promise<Metadata> {
  const hp = await prisma.homepage.findUnique({
    where: { country: COUNTRY },
    select: { packagesPageTitle: true, packagesPageSubtitle: true, metaSiteTitle: true },
  });
  return {
    title: hp?.packagesPageTitle ? `${hp.packagesPageTitle} | ${hp.metaSiteTitle || "eSIM"}` : "Germany eSIM Plans | Compare All",
    description: hp?.packagesPageSubtitle || "Compare all Germany eSIM plans.",
  };
}

export default async function PackagesPage() {
  const [hp, packages] = await Promise.all([
    prisma.homepage.findUnique({
      where: { country: COUNTRY },
      select: { packagesPageTitle: true, packagesPageSubtitle: true },
    }),
    getPackages(COUNTRY).catch(() => [] as any[]),
  ]);

  const title    = hp?.packagesPageTitle    || "Germany eSIM Plans";
  const subtitle = hp?.packagesPageSubtitle || "";

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} eyebrow="Tarife" breadcrumb={[{ label: "Pakete" }]} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <PackageGrid packages={packages} />
      </div>
    </>
  );
}
