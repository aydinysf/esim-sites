const POLOSIM_API = process.env.POLOSIM_API_BASE;
const POLOSIM_KEY = process.env.POLOSIM_API_KEY;

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${POLOSIM_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${POLOSIM_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Giriş başarısız");

  const data = await res.json();
  return { token: data.token, user: data.user };
}

export async function verifyToken(token: string) {
  const res = await fetch(`${POLOSIM_API}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${POLOSIM_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${POLOSIM_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Kayıt başarısız");
  return res.json();
}
