import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export default async function AdminDashboard() {
  const [postCount, guideCount, faqCount] = await Promise.all([
    prisma.post.count({ where: { country: COUNTRY } }),
    prisma.guide.count({ where: { country: COUNTRY } }),
    prisma.faq.count({ where: { country: COUNTRY } }),
  ]);

  const recentPosts = await prisma.post.findMany({
    where: { country: COUNTRY },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, status: true, createdAt: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Panou de Control</h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { label: "Blog", count: postCount, href: "/admin/blog" },
          { label: "Ghiduri", count: guideCount, href: "/admin/guides" },
          { label: "FAQ", count: faqCount, href: "/admin/faq" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl font-bold text-amber-600">{item.count}</div>
            <div className="text-gray-600 mt-1">{item.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Articole Recente</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Titlu</th>
              <th className="pb-2">Stare</th>
              <th className="pb-2">Dată</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="py-3">
                  <Link href={`/admin/blog/${post.id}`} className="hover:text-amber-600">
                    {post.title}
                  </Link>
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      post.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status === "PUBLISHED" ? "Publicat" : "Ciornă"}
                  </span>
                </td>
                <td className="py-3 text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("ro-RO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
