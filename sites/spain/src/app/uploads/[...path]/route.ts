import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { existsSync, statSync } from "fs";
import path from "path";

// Kullanıcı tarafından yüklenen dosyaları sunar.
// Production'da (next start) public/ klasörüne çalışma anında eklenen dosyalar
// statik olarak sunulmadığı için yüklemeler bu route üzerinden servis edilir.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp",
  gif: "image/gif", avif: "image/avif", svg: "image/svg+xml",
  mp4: "video/mp4", webm: "video/webm", mov: "video/quicktime",
};

export async function GET(_req: NextRequest, { params }: { params: { path: string[] } }) {
  const rel = (params.path || []).join("/");
  // path traversal koruması
  if (!rel || rel.includes("..") || rel.includes("\0")) {
    return new Response("Not found", { status: 404 });
  }

  const filepath = path.join(process.cwd(), "public", "uploads", rel);
  if (!existsSync(filepath) || !statSync(filepath).isFile()) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await readFile(filepath);
  const ext = rel.split(".").pop()?.toLowerCase() || "";
  const type = TYPES[ext] || "application/octet-stream";

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
