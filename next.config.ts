import type { NextConfig } from "next";

// GitHub Pages serves the site under /TutorVerse.
// Vercel serves the site at the domain root. Requiring GitHub Actions here
// prevents any Vercel project environment variable from accidentally applying
// the GitHub Pages base path.
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
