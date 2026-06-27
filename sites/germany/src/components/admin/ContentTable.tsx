"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Row {
  id: string;
  title: string;
  status: string;
  meta: string;
  date: Date;
}

interface Props {
  rows: Row[];
  basePath: string;
  deleteEndpoint: string;
}

export default function ContentTable({ rows, basePath, deleteEndpoint }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    setDeleting(id);
    await fetch(`${deleteEndpoint}/${id}`, { method: "DELETE" });
    router.refresh();
    setDeleting(null);
  }

  if (rows.length === 0) {
    return <div className="bg-white rounded-xl p-8 text-center text-gray-500">Henüz içerik yok.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-500 border-b">
            <th className="px-6 py-3 font-medium">Başlık</th>
            <th className="px-6 py-3 font-medium">Durum</th>
            <th className="px-6 py-3 font-medium">Kategori</th>
            <th className="px-6 py-3 font-medium">Tarih</th>
            <th className="px-6 py-3 font-medium">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{row.title}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {row.status === "PUBLISHED" ? "Yayında" : "Taslak"}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">{row.meta}</td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(row.date).toLocaleDateString("tr-TR")}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <a href={`${basePath}/${row.id}`} className="text-brand-600 hover:underline">
                    Düzenle
                  </a>
                  <button
                    onClick={() => handleDelete(row.id)}
                    disabled={deleting === row.id}
                    className="text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deleting === row.id ? "Siliniyor..." : "Sil"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
