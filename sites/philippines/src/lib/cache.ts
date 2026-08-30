import { prisma } from "@/lib/db";
import { fetchPackagesFromAPI, buildBuyUrl, type PolosimPackage } from "@/lib/polosim";

export async function getPackages(country: string): Promise<PolosimPackage[]> {
  try {
    const cached = await prisma.packageCache.findMany({
      where: {
        country,
        expiresAt: { gt: new Date() },
      },
    });

    if (cached.length > 0) {
      return cached.map((p) => {
        const pkg = p.data as unknown as PolosimPackage;
        return {
          ...pkg,
          buyUrl: buildBuyUrl(country, pkg.id),
        };
      });
    }

    const packages = await fetchPackagesFromAPI(country);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.packageCache.deleteMany({ where: { country } }).catch(() => {});
    
    if (packages.length > 0) {
      await prisma.packageCache.createMany({
        data: packages.map((pkg) => ({
          id: `${country}_${pkg.id}`,
          country,
          data: pkg as any,
          expiresAt,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    return packages;
  } catch (error) {
    console.error("getPackages cache error for country:", country, error);
    return fetchPackagesFromAPI(country).catch(() => []);
  }
}
