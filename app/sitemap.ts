import type { MetadataRoute } from "next";

const baseUrl = "https://www.tutorverse.in";

const boards = ["cbse", "icse", "maharashtra-state-board"];
const juniorSubjects = ["mathematics", "science"];
const seniorSubjects = ["mathematics", "physics", "chemistry", "biology"];
const classes = ["6", "7", "8", "9", "10", "11", "12"];

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

  for (const board of boards) {
    for (const className of classes) {
      const subjects = Number(className) <= 10 ? juniorSubjects : seniorSubjects;
      for (const subject of subjects) {
        pages.push(`/tuition/${board}/${className}/${subject}`);
      }
    }
  }

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/tuition/") ? 0.8 : 0.7,
  }));
}
