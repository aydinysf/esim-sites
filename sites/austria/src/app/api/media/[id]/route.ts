import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const media = await prisma.media.update({
    where: { id: params.id },
    data: { ...body, order: Number(body.order || 0) },
  });
  return Response.json(media);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.media.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}
