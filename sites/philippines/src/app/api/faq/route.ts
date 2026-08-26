import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const faqs = await prisma.faq.findMany({
    where: { country: COUNTRY },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return Response.json(faqs);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const faq = await prisma.faq.create({
    data: { ...body, country: COUNTRY, order: Number(body.order) },
  });
  return Response.json(faq, { status: 201 });
}
