import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const homepage = await prisma.homepage.findUnique({ where: { country: COUNTRY } });
  return Response.json(homepage);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const homepage = await prisma.homepage.update({
    where: { country: COUNTRY },
    data: {
      heroHeadline: body.heroHeadline,
      heroSubheadline: body.heroSubheadline,
      heroCtaText: body.heroCtaText,
      heroImage: body.heroImage || null,
      whyEsimTitle: body.whyEsimTitle,
      howItWorksTitle: body.howItWorksTitle,
    },
  });
  return Response.json(homepage);
}
