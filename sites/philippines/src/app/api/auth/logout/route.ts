import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("polosim_token");
  return Response.json({ ok: true });
}
