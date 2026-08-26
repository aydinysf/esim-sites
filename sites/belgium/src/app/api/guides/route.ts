import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const guides = await prisma.guide.findMany({
    where: { country: COUNTRY },
    orderBy: { order: "asc" },
  });
  return Response.json(guides);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const guide = await prisma.guide.create({
    data: { ...body, country: COUNTRY, order: Number(body.order) },
  });
  return Response.json(guide, { status: 201 });
}
