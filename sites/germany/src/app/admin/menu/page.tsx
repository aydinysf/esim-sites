"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  target: string;
  parentId?: string | null;
  children?: MenuItem[];
}

const empty = (): Omit<MenuItem, "id" | "children"> => ({
  label: "", href: "", order: 0, target: "_self", parentId: null,
});

interface PageRow { id: string; title: string; slug: string; status: string; }

// Sitedeki sabit (kod tabanlı) sayfalar
const STATIC_PAGES = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Paketler",  href: "/packages" },
  { label: "Rehberler", href: "/guides" },
  { label: "Blog",      href: "/blog" },
  { label: "SSS",       href: "/faq" },
  { label: "Galeri",    href: "/gallery" },
];

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(empty());
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const [mRes, pRes] = await Promise.all([fetch("/api/menu"), fetch("/api/pages")]);
    setItems(await mRes.json());
    setPages(await pRes.json());
  }

  useEffect(() => { load(); }, []);

  // Hedef seçiciden seçim yapıldığında href'i (ve boşsa etiketi) doldur
  function pickDestination(href: string, label: string) {
    if (!href) return;
    setForm(f => ({ ...f, href, label: f.label || label }));
  }

  function openNew() { setEditing(null); setForm(empty()); setShowForm(true); }
  function openEdit(item: MenuItem) {
    setEditing(item);
    setForm({ label: item.label, href: item.href, order: item.order, target: item.target, parentId: item.parentId || null });
    setShowForm(true);
  }
  function close() { setEditing(null); setForm(empty()); setShowForm(false); }

  async function save() {
    setSaving(true);
    if (editing) {
      await fetch(`/api/menu/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/menu", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false);
    close();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Bu menü öğesi ve alt öğeleri silinsin mi?")) return;
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    load();
  }

  // Flat list of all items for parent selector
  const allFlat = items.flatMap(i => [i, ...(i.children || [])]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Menü Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">Sitenin navigasyon menüsünü buradan yönet.</p>
        </div>
        <button onClick={openNew} className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition">
          + Yeni Öğe
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing ? "Menü Öğesi Düzenle" : "Yeni Menü Öğesi"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiket <span className="text-red-500">*</span></label>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="Pakete"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link <span className="text-red-500">*</span></label>
              <input value={form.href} onChange={e => setForm(f => ({ ...f, href: e.target.value }))}
                placeholder="/packages veya https://..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hazır sayfa seç (linki otomatik doldurur)</label>
              <select
                value=""
                onChange={e => {
                  const opt = e.target.selectedOptions[0];
                  if (opt) pickDestination(opt.value, opt.dataset.label || "");
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
              >
                <option value="">— Sayfa seç (veya yukarıdan elle yaz) —</option>
                <optgroup label="Sabit sayfalar">
                  {STATIC_PAGES.map(p => (
                    <option key={p.href} value={p.href} data-label={p.label}>{p.label} ({p.href})</option>
                  ))}
                </optgroup>
                {pages.length > 0 && (
                  <optgroup label="Dinamik sayfalar">
                    {pages.map(p => (
                      <option key={p.id} value={`/${p.slug}`} data-label={p.title}>
                        {p.title} (/{p.slug}){p.status !== "PUBLISHED" ? " — taslak" : ""}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hedef</label>
              <select value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]">
                <option value="_self">Aynı sekme</option>
                <option value="_blank">Yeni sekme</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Üst Öğe (alt menü yapmak için)</label>
              <select value={form.parentId || ""} onChange={e => setForm(f => ({ ...f, parentId: e.target.value || null }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]">
                <option value="">— Üst düzey (ana menü) —</option>
                {items.map(i => (
                  <option key={i.id} value={i.id} disabled={i.id === editing?.id}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.label || !form.href}
              className="bg-[#C4A234] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] disabled:opacity-50 transition">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={close} className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:border-gray-500 transition">İptal</button>
          </div>
        </div>
      )}

      {/* Menu Tree */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {items.length === 0 && (
          <div className="p-8 text-center text-gray-400">Henüz menü öğesi yok.</div>
        )}
        {items.map(item => (
          <div key={item.id} className="border-b last:border-0">
            <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
              <span className="text-gray-400">☰</span>
              <div className="flex-1">
                <span className="font-medium">{item.label}</span>
                <span className="text-gray-400 text-sm ml-2">{item.href}</span>
                {item.target === "_blank" && <span className="ml-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded">↗ yeni sekme</span>}
              </div>
              <span className="text-gray-400 text-xs">Sıra: {item.order}</span>
              <div className="flex gap-3 text-sm">
                <button onClick={() => openEdit(item)} className="text-[#C4A234] hover:underline">Düzenle</button>
                <button onClick={() => remove(item.id)} className="text-red-500 hover:underline">Sil</button>
              </div>
            </div>
            {item.children && item.children.length > 0 && item.children.map(child => (
              <div key={child.id} className="flex items-center gap-3 px-5 py-2.5 bg-gray-50 border-t hover:bg-gray-100">
                <span className="text-gray-300 ml-4">└</span>
                <div className="flex-1">
                  <span className="text-sm font-medium">{child.label}</span>
                  <span className="text-gray-400 text-xs ml-2">{child.href}</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <button onClick={() => openEdit(child)} className="text-[#C4A234] hover:underline">Düzenle</button>
                  <button onClick={() => remove(child.id)} className="text-red-500 hover:underline">Sil</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3">Menü değişiklikleri siteye anlık yansır.</p>
    </div>
  );
}
