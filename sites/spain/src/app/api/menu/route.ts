import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const items = await prisma.menuItem.findMany({
    where: { country: COUNTRY, parentId: null },
    orderBy: { order: "asc" },
    include: {
      children: { orderBy: { order: "asc" } },
    },
  });
  return Response.json(items);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.menuItem.create({
    data: {
      country: COUNTRY,
      label: body.label,
      href: body.href,
      order: Number(body.order || 0),
      target: body.target || "_self",
      parentId: body.parentId || null,
    },
  });
  return Response.json(item, { status: 201 });
}
