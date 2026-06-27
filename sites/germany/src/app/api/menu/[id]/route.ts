import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: params.id },
    data: {
      label: body.label,
      href: body.href,
      order: Number(body.order || 0),
      target: body.target || "_self",
      parentId: body.parentId || null,
    },
  });
  return Response.json(item);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.menuItem.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}
