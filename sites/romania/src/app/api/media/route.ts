import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const media = await prisma.media.findMany({
    where: { country: COUNTRY, ...(type ? { type: type as any } : {}) },
    orderBy: { order: "asc" },
  });
  return Response.json(media);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const media = await prisma.media.create({
    data: { ...body, country: COUNTRY, order: Number(body.order || 0) },
  });
  return Response.json(media, { status: 201 });
}
