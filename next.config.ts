import type { NextConfig } from "next";

// TutorVerse uses GitHub Pages only for the static preview. Vercel serves at the domain root.
const isGitHubPages =
  process.env.GITHUB_ACTIONS === "true" && process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  ...(isGitHubPages ? { basePath: "/TutorVerse" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
