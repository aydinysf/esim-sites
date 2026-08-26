"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Panou de Control", icon: "📊" },
  { label: "─ Conținut", icon: "", href: "", divider: true },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
  { href: "/admin/guides", label: "Ghiduri", icon: "📚" },
  { href: "/admin/faq", label: "FAQ", icon: "❓" },
  { href: "/admin/pages", label: "Pagini", icon: "📄" },
  { label: "─ Design", icon: "", href: "", divider: true },
  { href: "/admin/banners", label: "Bannere/Slider", icon: "🖼️" },
  { href: "/admin/media", label: "Galerie Media", icon: "🎬" },
  { href: "/admin/menu", label: "Meniu", icon: "☰" },
  { href: "/admin/homepage", label: "Acasă", icon: "🏠" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-gray-900 text-gray-300 flex flex-col min-h-screen flex-shrink-0">
      <div className="p-5 border-b border-gray-700">
        <div className="font-bold text-white text-sm">🇷🇴 eSIM România</div>
        <div className="text-xs text-gray-500 mt-0.5">Panou de Control</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.divider) {
            return (
              <div key={i} className="px-3 pt-4 pb-1 text-xs text-gray-500 font-medium uppercase tracking-wider">
                {item.label}
              </div>
            );
          }
          const active = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active ? "bg-[#C4A234] text-white" : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-700 space-y-1">
        <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-800 hover:text-white transition">
          🌐 Vezi Site-ul
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          🚪 Deconectare
        </button>
      </div>
    </aside>
  );
}
