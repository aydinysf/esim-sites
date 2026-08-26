import { registerUser } from "@/lib/polosim-auth";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = await registerUser(body);
    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: "Kayıt başarısız" }, { status: 400 });
  }
}
