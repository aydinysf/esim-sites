"use client";

import { useEffect, useState } from "react";

type MediaType = "IMAGE" | "VIDEO";

interface Media {
  id: string;
  type: MediaType;
  title?: string;
  url: string;
  thumbnail?: string;
  description?: string;
  order: number;
}

const empty = (type: MediaType): Omit<Media, "id"> => ({
  type, title: "", url: "", thumbnail: "", description: "", order: 0,
});

function youtubeThumb(url: string) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : "";
}

export default function AdminMediaPage() {
  const [tab, setTab] = useState<MediaType>("IMAGE");
  const [items, setItems] = useState<Media[]>([]);
  const [editing, setEditing] = useState<Media | null>(null);
  const [form, setForm] = useState(empty(tab));
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load(type: MediaType) {
    const res = await fetch(`/api/media?type=${type}`);
    setItems(await res.json());
  }

  useEffect(() => { load(tab); }, [tab]);

  function openNew() { setEditing(null); setForm(empty(tab)); setShowForm(true); }
  function openEdit(m: Media) { setEditing(m); setForm({ ...m }); setShowForm(true); }
  function close() { setEditing(null); setForm(empty(tab)); setShowForm(false); }

  function handleUrlChange(url: string) {
    const thumb = tab === "VIDEO" ? youtubeThumb(url) : "";
    setForm(f => ({ ...f, url, thumbnail: thumb || f.thumbnail }));
  }

  async function save() {
    setSaving(true);
    const payload = { ...form, type: tab };
    if (editing) {
      await fetch(`/api/media/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/media", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    close();
    load(tab);
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    load(tab);
  }

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medya Galerisi</h1>
        <button onClick={openNew} className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition">
          + Ekle
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["IMAGE", "VIDEO"] as MediaType[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === t ? "bg-[#C4A234] text-white" : "bg-white border border-gray-200 hover:border-[#C4A234]"}`}>
            {t === "IMAGE" ? "📷 Fotoğraflar" : "🎬 Videolar"}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing ? "Düzenle" : tab === "IMAGE" ? "Fotoğraf Ekle" : "Video Ekle"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tab === "IMAGE" ? "Görsel URL" : "Video URL (YouTube / Vimeo)"} <span className="text-red-500">*</span>
              </label>
              <input value={form.url} onChange={e => handleUrlChange(e.target.value)}
                placeholder={tab === "IMAGE" ? "https://..." : "https://youtube.com/watch?v=..."}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
            {tab === "VIDEO" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL (opsiyonel)</label>
                <input value={form.thumbnail || ""} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}
                  placeholder="Boş bırakılırsa YouTube'dan otomatik alınır"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
              <textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]" />
            </div>
          </div>
          {/* Preview */}
          {(form.url || form.thumbnail) && (
            <img src={tab === "IMAGE" ? form.url : (form.thumbnail || "")} alt="" className="h-28 rounded-lg object-cover" />
          )}
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !form.url}
              className="bg-[#C4A234] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] disabled:opacity-50 transition">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={close} className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:border-gray-500 transition">İptal</button>
          </div>
        </div>
      )}

      {/* Grid */}
      {items.length === 0 && !showForm && (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400">Henüz {tab === "IMAGE" ? "fotoğraf" : "video"} yok.</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
            <div className="relative aspect-video bg-gray-100">
              <img
                src={tab === "IMAGE" ? item.url : (item.thumbnail || youtubeThumb(item.url))}
                alt={item.title || ""}
                className="w-full h-full object-cover"
              />
              {tab === "VIDEO" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white text-lg">▶</div>
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="text-sm font-medium truncate">{item.title || <span className="text-gray-400 italic">Başlıksız</span>}</div>
              <div className="flex gap-3 text-xs mt-2">
                <button onClick={() => openEdit(item)} className="text-[#C4A234] hover:underline">Düzenle</button>
                <button onClick={() => remove(item.id)} className="text-red-500 hover:underline">Sil</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
