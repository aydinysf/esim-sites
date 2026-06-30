"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import SessionWrapper from "@/components/admin/SessionWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return (
      <SessionWrapper>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          {children}
        </div>
      </SessionWrapper>
    );
  }

  return (
    <SessionWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-8 w-full">{children}</main>
      </div>
    </SessionWrapper>
  );
}
