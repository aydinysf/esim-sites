"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";

interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "richtext" | "number";
  required?: boolean;
  options?: FieldOption[];
}

interface Props {
  type: string;
  submitEndpoint: string;
  method?: "POST" | "PUT";
  redirectPath: string;
  fields: Field[];
  initialData?: Record<string, any>;
}

export default function ContentForm({
  submitEndpoint,
  method = "POST",
  redirectPath,
  fields,
  initialData = {},
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(name: string, value: any) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(submitEndpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Kaydedilemedi. Lütfen tekrar deneyin.");
      return;
    }

    router.push(redirectPath);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === "text" && (
            <input
              type="text"
              value={formData[field.name] || ""}
              onChange={(e) => set(field.name, e.target.value)}
              required={field.required}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          )}

          {field.type === "number" && (
            <input
              type="number"
              value={formData[field.name] || ""}
              onChange={(e) => set(field.name, e.target.value)}
              required={field.required}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={formData[field.name] || ""}
              onChange={(e) => set(field.name, e.target.value)}
              required={field.required}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          )}

          {field.type === "select" && field.options && (
            <select
              value={formData[field.name] || ""}
              onChange={(e) => set(field.name, e.target.value)}
              required={field.required}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Seçin...</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "richtext" && (
            <RichTextEditor
              value={formData[field.name] || ""}
              onChange={(html) => set(field.name, html)}
            />
          )}
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition disabled:opacity-50 font-medium"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 px-6 py-2 rounded-lg hover:border-gray-500 transition"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
