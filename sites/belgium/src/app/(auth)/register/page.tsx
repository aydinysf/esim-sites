"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Kayıt başarısız. Email zaten kullanımda olabilir.");
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">Kayıt Ol</h1>
        <p className="text-gray-500 text-sm mb-6">polosim hesabı oluşturun</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Ad Soyad", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Şifre", type: "password" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-brand-600 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}
