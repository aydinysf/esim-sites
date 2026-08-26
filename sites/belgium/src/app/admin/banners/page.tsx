"use client";

import { useEffect, useRef, useState } from "react";

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

function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) onChange(data.url);
    else alert(data.error || "Yükleme başarısız");
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Banner Görseli <span className="text-red-500">*</span>
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${dragOver ? "border-[#C4A234] bg-[#fdf8ec]" : "border-gray-200 hover:border-[#C4A234] hover:bg-gray-50"}`}
      >
        {uploading ? (
          <p className="text-sm text-gray-500 animate-pulse">Yükleniyor...</p>
        ) : value ? (
          <div className="space-y-2">
            <img src={value} alt="" className="h-36 mx-auto rounded-lg object-cover w-full" />
            <p className="text-xs text-gray-400">Değiştirmek için tıkla veya dosya sürükle</p>
          </div>
        ) : (
          <div className="space-y-1 py-4">
            <div className="text-4xl">🖼️</div>
            <p className="text-sm font-medium text-gray-600">Görsel seç veya buraya sürükle</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP · Önerilen: 1920×600px</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>
      {value && (
        <p className="text-xs text-gray-400 mt-1 truncate">Dosya: {value}</p>
      )}
    </div>
  );
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty());
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/banners?all=1");
    setBanners(await res.json());
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm(empty());
    setShowForm(true);
  }

  function openEdit(b: Banner) {
    setEditing(b);
    setForm({
      title: b.title || "", subtitle: b.subtitle || "", image: b.image,
      ctaText: b.ctaText || "", ctaHref: b.ctaHref || "",
      order: b.order, active: b.active,
    });
    setShowForm(true);
  }

  function closeForm() {
    setEditing(null);
    setForm(empty());
    setShowForm(false);
  }

  async function save() {
    setSaving(true);
    if (editing) {
      await fetch(`/api/banners/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    closeForm();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banner / Slider</h1>
        <button
          onClick={openNew}
          className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition"
        >
          + Yeni Banner
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-lg">{editing ? "Banner Düzenle" : "Yeni Banner"}</h2>

          <ImageUploader
            value={form.image}
            onChange={url => setForm(f => ({ ...f, image: url }))}
          />

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "title",    label: "Başlık"      },
              { key: "subtitle", label: "Alt Başlık"  },
              { key: "ctaText",  label: "Buton Metni" },
              { key: "ctaHref",  label: "Buton Linki" },
              { key: "order",    label: "Sıra", type: "number" },
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
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
              className="w-4 h-4 accent-[#C4A234]"
            />
            Aktif (sitede görünsün)
          </label>

          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.image}
              className="bg-[#C4A234] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] disabled:opacity-50 transition"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={closeForm}
              className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:border-gray-500 transition"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      <div className="space-y-3">
        {banners.length === 0 && !showForm && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">
            Henüz banner yok. Yukarıdan ekle.
          </div>
        )}
        {banners.map(b => (
          <div key={b.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex items-center gap-4 p-4">
            <img src={b.image} alt={b.title || ""} className="w-28 h-16 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">
                {b.title || <span className="text-gray-400 italic">Başlıksız</span>}
              </div>
              <div className="text-sm text-gray-500 truncate">{b.subtitle}</div>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${b.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {b.active ? "Aktif" : "Pasif"} · Sıra: {b.order}
              </span>
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
