"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface HomepageData {
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroImage: string;
  whyEsimTitle: string;
  howItWorksTitle: string;
}

export default function AdminHomepagePage() {
  const router = useRouter();
  const [data, setData] = useState<HomepageData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form);

    await fetch("/api/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ana Sayfa İçeriği</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4 max-w-2xl">
        {[
          { name: "heroHeadline", label: "Hero Başlık", defaultValue: data.heroHeadline },
          { name: "heroSubheadline", label: "Hero Alt Başlık", defaultValue: data.heroSubheadline },
          { name: "heroCtaText", label: "Hero Buton Metni", defaultValue: data.heroCtaText },
          { name: "heroImage", label: "Hero Görsel URL", defaultValue: data.heroImage },
          { name: "whyEsimTitle", label: '"Neden eSIM?" Başlığı', defaultValue: data.whyEsimTitle },
          { name: "howItWorksTitle", label: '"Nasıl Çalışır?" Başlığı', defaultValue: data.howItWorksTitle },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              name={field.name}
              defaultValue={field.defaultValue}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : saved ? "Kaydedildi ✓" : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
