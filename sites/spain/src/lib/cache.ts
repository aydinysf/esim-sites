import { prisma } from "@/lib/db";
import { fetchPackagesFromAPI, type PolosimPackage } from "@/lib/polosim";

export async function getPackages(country: string): Promise<PolosimPackage[]> {
  const cached = await prisma.packageCache.findMany({
    where: {
      country,
      expiresAt: { gt: new Date() },
    },
  });

  if (cached.length > 0) {
    return cached.map((p) => p.data as unknown as PolosimPackage);
  }

  const packages = await fetchPackagesFromAPI(country);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.packageCache.deleteMany({ where: { country } });
  await prisma.packageCache.createMany({
    data: packages.map((pkg) => ({
      id: pkg.id,
      country,
      data: pkg as any,
      expiresAt,
    })),
  });

  return packages;
}
