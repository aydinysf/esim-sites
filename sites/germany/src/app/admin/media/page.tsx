"use client";

import { useEffect, useRef, useState } from "react";

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

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

function isLocalFile(url: string) {
  return url.startsWith("/uploads/");
}

// ─── Yeniden kullanılabilir dosya yükleyici ───────────────────────────────────
function FileUploader({
  accept,
  label,
  currentUrl,
  onUploaded,
  uploading,
  setUploading,
}: {
  accept: string;
  label: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
  uploading: boolean;
  setUploading: (v: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) onUploaded(data.url);
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
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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
        ) : currentUrl && (isLocalFile(currentUrl) || currentUrl.match(/\.(jpg|jpeg|png|webp|gif|avif)$/i)) ? (
          <div className="space-y-2">
            <img src={currentUrl} alt="" className="h-32 mx-auto rounded-lg object-cover" />
            <p className="text-xs text-gray-400">Değiştirmek için tıkla veya dosya sürükle</p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-3xl">📁</div>
            <p className="text-sm font-medium text-gray-600">Dosya seç veya buraya sürükle</p>
            <p className="text-xs text-gray-400">{accept.includes("video") ? "MP4, WebM, MOV" : "JPG, PNG, WebP, GIF, AVIF"} · Maks 200 MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>
      {currentUrl && (
        <p className="text-xs text-gray-400 mt-1 truncate">Dosya: {currentUrl}</p>
      )}
    </div>
  );
}

// ─── Ana sayfa ────────────────────────────────────────────────────────────────
export default function AdminMediaPage() {
  const [tab, setTab] = useState<MediaType>("IMAGE");
  const [all, setAll] = useState<Media[]>([]);
  const [editing, setEditing] = useState<Media | null>(null);
  const [form, setForm] = useState(empty(tab));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [videoMode, setVideoMode] = useState<"url" | "file">("url");

  // Tüm medyayı bir kere çek, tab geçişi = sıfır network isteği
  async function load() {
    const res = await fetch("/api/media");
    setAll(await res.json());
  }

  useEffect(() => { load(); }, []);

  const items = all.filter(m => m.type === tab);

  function openNew() {
    setEditing(null);
    setForm(empty(tab));
    setShowForm(true);
    setVideoMode("url");
  }

  function openEdit(m: Media) {
    setEditing(m);
    setForm({ ...m });
    setShowForm(true);
    if (m.type === "VIDEO") setVideoMode(isLocalFile(m.url) ? "file" : "url");
  }

  function close() {
    setEditing(null);
    setForm(empty(tab));
    setShowForm(false);
  }

  function handleYoutubeUrl(url: string) {
    const thumb = youtubeThumb(url);
    setForm(f => ({ ...f, url, thumbnail: thumb || f.thumbnail }));
  }

  async function save() {
    setSaving(true);
    const payload = { ...form, type: tab };
    if (editing) {
      await fetch(`/api/media/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    close();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Silinsin mi?")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    load();
  }

  const previewSrc =
    tab === "IMAGE"
      ? form.url
      : form.thumbnail || (isYouTube(form.url) ? youtubeThumb(form.url) : "");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medya Galerisi</h1>
        <button
          onClick={openNew}
          className="bg-[#C4A234] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] transition"
        >
          + Ekle
        </button>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 mb-6">
        {(["IMAGE", "VIDEO"] as MediaType[]).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setShowForm(false); setEditing(null); }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === t ? "bg-[#C4A234] text-white" : "bg-white border border-gray-200 hover:border-[#C4A234]"}`}
          >
            {t === "IMAGE" ? "📷 Fotoğraflar" : "🎬 Videolar"}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-lg">
            {editing ? "Düzenle" : tab === "IMAGE" ? "Fotoğraf Yükle" : "Video Ekle"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input
                value={form.title || ""}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
              <input
                type="number"
                value={form.order}
                onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
              />
            </div>
          </div>

          {/* Resim: dosya yükleyici */}
          {tab === "IMAGE" && (
            <FileUploader
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              label="Görsel *"
              currentUrl={form.url}
              onUploaded={url => setForm(f => ({ ...f, url }))}
              uploading={uploading}
              setUploading={setUploading}
            />
          )}

          {/* Video: URL mi dosya mı seçim */}
          {tab === "VIDEO" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setVideoMode("url"); setForm(f => ({ ...f, url: "" })); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition ${videoMode === "url" ? "bg-[#C4A234] text-white border-[#C4A234]" : "border-gray-300 hover:border-[#C4A234]"}`}
                >
                  YouTube / Vimeo linki
                </button>
                <button
                  type="button"
                  onClick={() => { setVideoMode("file"); setForm(f => ({ ...f, url: "" })); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition ${videoMode === "file" ? "bg-[#C4A234] text-white border-[#C4A234]" : "border-gray-300 hover:border-[#C4A234]"}`}
                >
                  Dosya yükle (MP4)
                </button>
              </div>

              {videoMode === "url" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.url}
                    onChange={e => handleYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
                  />
                  {form.thumbnail && (
                    <img src={form.thumbnail} alt="" className="mt-2 h-24 rounded-lg object-cover" />
                  )}
                </div>
              ) : (
                <FileUploader
                  accept="video/mp4,video/webm,video/quicktime"
                  label="Video Dosyası *"
                  currentUrl={form.url}
                  onUploaded={url => setForm(f => ({ ...f, url }))}
                  uploading={uploading}
                  setUploading={setUploading}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kapak Görseli (thumbnail)
                </label>
                <FileUploader
                  accept="image/jpeg,image/png,image/webp"
                  label=""
                  currentUrl={form.thumbnail || ""}
                  onUploaded={url => setForm(f => ({ ...f, thumbnail: url }))}
                  uploading={false}
                  setUploading={() => {}}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              value={form.description || ""}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A234]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || uploading || !form.url}
              className="bg-[#C4A234] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#a8882a] disabled:opacity-50 transition"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={close}
              className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:border-gray-500 transition"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      {items.length === 0 && !showForm && (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400">
          Henüz {tab === "IMAGE" ? "fotoğraf" : "video"} yok.
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => {
          const thumb =
            item.type === "IMAGE"
              ? item.url
              : item.thumbnail || youtubeThumb(item.url);
          return (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
              <div className="relative aspect-video bg-gray-100">
                {thumb ? (
                  <img src={thumb} alt={item.title || ""} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">🎬</div>
                )}
                {item.type === "VIDEO" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white text-lg">▶</div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">
                  {item.title || <span className="text-gray-400 italic">Başlıksız</span>}
                </div>
                <div className="flex gap-3 text-xs mt-2">
                  <button onClick={() => openEdit(item)} className="text-[#C4A234] hover:underline">Düzenle</button>
                  <button onClick={() => remove(item.id)} className="text-red-500 hover:underline">Sil</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
