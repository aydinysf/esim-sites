import { loginUser } from "@/lib/polosim-auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const { token, user } = await loginUser(email, password);

    cookies().set("polosim_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ user });
  } catch {
    return Response.json({ error: "Geçersiz email veya şifre" }, { status: 401 });
  }
}
