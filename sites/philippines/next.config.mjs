/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@esim/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Dosya yükleme limiti (resim ~10MB, video ~200MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
};

export default nextConfig;
