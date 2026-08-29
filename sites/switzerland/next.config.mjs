/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@esim/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Server Actions limit (Next.js 14 format)
  serverActions: {
    bodySizeLimit: "200mb",
  },
};

export default nextConfig;
