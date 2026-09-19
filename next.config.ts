import type { NextConfig } from "next";

// GitHub Pages needs a static export. Vercel can use normal Next.js server routes,
// which TutorVerse needs for secure server-side services such as LocationIQ.
const isGitHubPages =
  process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" } : {}),
  ...(isGitHubPages ? { basePath: "/TutorVerse" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
