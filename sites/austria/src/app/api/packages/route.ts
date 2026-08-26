import { prisma } from "@/lib/db";
import { fetchPackagesFromAPI } from "@/lib/polosim";

export const dynamic = "force-dynamic";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const cached = await prisma.packageCache.findMany({
    where: { country: COUNTRY, expiresAt: { gt: new Date() } },
  });

  if (cached.length > 0) {
    return Response.json(cached.map((p) => p.data));
  }

  try {
    const packages = await fetchPackagesFromAPI(COUNTRY);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.packageCache.deleteMany({ where: { country: COUNTRY } });
    await prisma.packageCache.createMany({
      data: packages.map((pkg) => ({
        id: pkg.id,
        country: COUNTRY,
        data: pkg as any,
        expiresAt,
      })),
    });

    return Response.json(packages);
  } catch {
    const stale = await prisma.packageCache.findMany({ where: { country: COUNTRY } });
    if (stale.length > 0) return Response.json(stale.map((p) => p.data));
    return Response.json({ error: "Paketler yüklenemedi" }, { status: 503 });
  }
}
