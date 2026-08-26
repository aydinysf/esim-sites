import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...body,
      publishedAt: body.status === "PUBLISHED" ? (body.publishedAt ?? new Date()) : null,
    },
  });
  return Response.json(post);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.post.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}
