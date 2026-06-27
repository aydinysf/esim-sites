import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const pages = await prisma.page.findMany({
    where: { country: COUNTRY },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(pages);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const page = await prisma.page.create({
    data: { ...body, country: COUNTRY },
  });
  return Response.json(page, { status: 201 });
}
