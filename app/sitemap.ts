import type { MetadataRoute } from "next";

const baseUrl = "https://tutorverse.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/subjects",
    "/find-tutor",
    "/become-a-tutor",
    "/how-it-works",
    "/about",
    "/contact",
    "/tuition",
    "/science-tuition",
    "/jee-neet-tuition",
  ];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
