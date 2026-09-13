import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TutorVerse",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
