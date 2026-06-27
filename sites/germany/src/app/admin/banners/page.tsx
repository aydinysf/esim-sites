"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaHref?: string;
  order: number;
  active: boolean;
}

const empty = (): Omit<Banner, "id"> => ({
  title: "", subtitle: "", image: "", ctaText: "", ctaHref: "", order: 0, active: true,
});

export default function AdminBannersPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty());
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/banners?all=1");
    const data = await res.json();
    setBanners(data);
  }

  useEffect(() => { load(); }, []);

  function openNew() { setEditing(null); setForm(empty()); }
  function openEdit(b: Banner) { setEditing(b); setForm({ title: b.title || "", subtitle: b.subtitle || "", image: b.image, ctaText: b.ctaText || "", ctaHref: b.ctaHref || "", order: b.order, active: b.active }); }

  async function save() {
    setSaving(true);
    if (editing) {
      await fetch(`/api/banners/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/banners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setEditing(null);
    setForm(empty());
    load();
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    load();
  }

  const isOpen = editing !== null || form.image !== "";

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banner / Slider</h1>
        <button onClick={openNew} className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition">
          + Yeni Banner
        </button>
      </div>

      {/* Form */}
      {(isOpen || editing) && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-lg">{editing ? "Banner Düzenle" : "Yeni Banner"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "title", label: "Başlık" },
              { key: "subtitle", label: "Alt Başlık" },
              { key: "ctaText", label: "Buton Metni" },
              { key: "ctaHref", label: "Buton Linki" },
              { key: "order", label: "Sıra", type: "number" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type || "text"}
                  value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL <span className="text-red-500">*</span></label>
              <input
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
                placeholder="https://..."
              />
              {form.image && <img src={form.image} alt="" className="mt-2 h-28 w-full object-cover rounded-lg" />}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 accent-[#C4A234]" />
            Aktif (sitede görünsün)
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.image} className="bg-[#C4A234] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] disabled:opacity-50 transition">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={() => { setEditing(null); setForm(empty()); }} className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:border-gray-500 transition">
              İptal
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {banners.length === 0 && <div className="bg-white rounded-xl p-8 text-center text-gray-400">Henüz banner yok.</div>}
        {banners.map(b => (
          <div key={b.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex items-center gap-4 p-4">
            <img src={b.image} alt={b.title || ""} className="w-28 h-16 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{b.title || <span className="text-gray-400 italic">Başlıksız</span>}</div>
              <div className="text-sm text-gray-500 truncate">{b.subtitle}</div>
              <div className="text-xs mt-1">
                <span className={`px-2 py-0.5 rounded font-medium ${b.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {b.active ? "Aktif" : "Pasif"}
                </span>
                <span className="ml-2 text-gray-400">Sıra: {b.order}</span>
              </div>
            </div>
            <div className="flex gap-3 text-sm flex-shrink-0">
              <button onClick={() => openEdit(b)} className="text-[#C4A234] hover:underline">Düzenle</button>
              <button onClick={() => remove(b.id)} className="text-red-500 hover:underline">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
