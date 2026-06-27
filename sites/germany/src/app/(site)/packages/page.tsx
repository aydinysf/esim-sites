import { getPackages } from "@/lib/cache";
import PackageGrid from "@/components/site/PackageGrid";
import type { Metadata } from "next";

const COUNTRY = process.env.PUBLIC_COUNTRY_CODE!;

export const metadata: Metadata = {
  title: "Germany eSIM Plans & Prices 2024 | Compare All",
  description: "Compare all Germany eSIM plans. Find the best data package for your trip.",
};

export default async function PackagesPage() {
  let packages = [];
  try {
    packages = await getPackages(COUNTRY);
  } catch {
    // API erişilemiyorsa boş liste dön
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-3">Germany eSIM Plans</h1>
      <p className="text-gray-600 mb-10">
        Compare all available eSIM plans for Germany. Buy online and activate instantly.
      </p>
      <PackageGrid packages={packages} />
    </div>
  );
}
