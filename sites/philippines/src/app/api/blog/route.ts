import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { country: COUNTRY },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const post = await prisma.post.create({
    data: {
      ...body,
      country: COUNTRY,
      tags: body.tags || [],
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return Response.json(post, { status: 201 });
}
