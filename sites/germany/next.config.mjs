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
};

export default nextConfig;
