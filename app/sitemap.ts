import type { MetadataRoute } from "next";
import { automations } from "@/src/data/automations";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath, sectionPath, sections } from "@/src/data/sections";
import { siteUrl } from "@/src/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    ...sections.map((s) =>
      entry(sectionPath(s.id), s.id === "new" ? 1 : s.id === "missions" || s.id === "automation" ? 0.9 : 0.6)
    ),
    ...portfolioData.projects.map((p) => entry(projectPath(p.slug), p.category === "client" ? 0.8 : 0.5)),
    ...automations.map((a) => entry(automationPath(a.id), a.featured ? 0.7 : 0.4)),
  ];
}
