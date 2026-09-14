import type { NextConfig } from "next";

// GitHub Pages serves the site under /TutorVerse, while Vercel serves it at the domain root.
// Set GITHUB_PAGES=true only in the GitHub Pages build workflow.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  ...(isGitHubPages ? { basePath: "/TutorVerse" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
