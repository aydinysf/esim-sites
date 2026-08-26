import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";

  const banners = await prisma.banner.findMany({
    where: { country: COUNTRY, ...(all ? {} : { active: true }) },
    orderBy: { order: "asc" },
  });
  return Response.json(banners);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const banner = await prisma.banner.create({
    data: { ...body, country: COUNTRY, order: Number(body.order || 0) },
  });
  return Response.json(banner, { status: 201 });
}
