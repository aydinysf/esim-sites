"use client";

import { useEffect, useState } from "react";

type Data = Record<string, string>;

const SECTIONS = [
  {
    title: "Hero Bölümü",
    fields: [
      { name: "heroHeadline",    label: "Ana Başlık" },
      { name: "heroSubheadline", label: "Alt Başlık" },
      { name: "heroCtaText",     label: "Buton Metni" },
      { name: "heroImage",       label: "Arka Plan Görsel URL (boşsa varsayılan kullanılır)" },
    ],
  },
  {
    title: "Neden eSIM?",
    fields: [
      { name: "whyEsimTitle", label: "Bölüm Başlığı" },
    ],
  },
  {
    title: "Nasıl Çalışır?",
    fields: [
      { name: "howItWorksTitle", label: "Bölüm Başlığı" },
    ],
  },
  {
    title: "Alt CTA Bandı",
    fields: [
      { name: "ctaBandTitle",    label: "Başlık" },
      { name: "ctaBandSubtitle", label: "Alt Metin" },
      { name: "ctaBandCtaText",  label: "Buton Metni" },
      { name: "ctaBandCtaHref",  label: "Buton Linki" },
    ],
  },
  {
    title: "Header",
    fields: [
      { name: "headerCtaText", label: "Sağ Üst Buton Metni" },
      { name: "headerCtaHref", label: "Sağ Üst Buton Linki" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { name: "footerTagline", label: "Footer Açıklama Metni" },
    ],
  },
  {
    title: "Blog Sayfası",
    fields: [
      { name: "blogPageTitle",    label: "Sayfa Başlığı" },
      { name: "blogPageSubtitle", label: "Sayfa Alt Başlığı" },
    ],
  },
  {
    title: "Rehberler Sayfası",
    fields: [
      { name: "guidesPageTitle",    label: "Sayfa Başlığı" },
      { name: "guidesPageSubtitle", label: "Sayfa Alt Başlığı" },
    ],
  },
  {
    title: "SSS Sayfası",
    fields: [
      { name: "faqPageTitle",    label: "Sayfa Başlığı" },
      { name: "faqPageSubtitle", label: "Sayfa Alt Başlığı" },
    ],
  },
  {
    title: "Paketler Sayfası",
    fields: [
      { name: "packagesPageTitle",    label: "Sayfa Başlığı" },
      { name: "packagesPageSubtitle", label: "Sayfa Alt Başlığı" },
    ],
  },
  {
    title: "SEO / Meta",
    fields: [
      { name: "metaSiteTitle",       label: "Site Adı (sekme başlığı şablonu)" },
      { name: "metaSiteDescription", label: "Varsayılan Meta Açıklaması" },
    ],
  },
];

export default function AdminHomepagePage() {
  const [data, setData] = useState<Data | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/homepage").then(r => r.json()).then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form);
    const res = await fetch("/api/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Kaydedilemedi. Oturumunuz sona ermiş olabilir, sayfayı yenileyip tekrar deneyin.");
      return;
    }
    setData(await res.json());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!data) return (
    <div className="flex items-center gap-2 text-gray-400 p-4">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-[#C4A234] rounded-full animate-spin" />
      Yükleniyor...
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Site İçeriği</h1>
          <p className="text-sm text-gray-500 mt-1">Tüm sayfalardaki metinleri buradan yönet</p>
        </div>
        <button
          form="homepage-form"
          type="submit"
          disabled={saving}
          className="bg-[#C4A234] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-[#a8882a] disabled:opacity-50 transition"
        >
          {saving ? "Kaydediliyor..." : saved ? "✓ Kaydedildi" : "Kaydet"}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form id="homepage-form" onSubmit={handleSubmit} className="space-y-6">
        {SECTIONS.map(section => (
          <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    defaultValue={data[field.name] || ""}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
