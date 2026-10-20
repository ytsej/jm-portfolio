import { automations } from "@/src/data/automations";
import { contactMethods } from "@/src/data/contacts";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath } from "@/src/data/sections";
import { ownerName, siteName, siteUrl } from "@/src/data/site";

// Plain-text summary for AI assistants and answer engines (llmstxt.org),
// built from the same data as the site so the two never drift apart
export const dynamic = "force-static";

export function GET() {
  const { profile, experience, education, projects } = portfolioData;
  const lines: string[] = [];
  const list = (items: string[]) => items.forEach((item) => lines.push(`- ${item}`));
  const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

  lines.push(`# ${ownerName} (${siteName})`, "");
  lines.push(`> ${profile.title}. Based in ${profile.location} (GMT+8). ${profile.availability}.`, "");
  lines.push(profile.summary, "");

  lines.push(`Full text with every case summary: ${siteUrl}/llms-full.txt`, "");
  lines.push("## Projects", "");
  list(
    projects.map((p) => {
      const kind = p.category === "client" ? "Client work" : "Academic or personal";
      const status = p.status ? `, ${p.status}` : "";
      return `[${p.title}](${siteUrl}${projectPath(p.slug)}): ${kind}${status}. Role: ${p.role}. ${oneLine(p.shortDescription ?? "")}`;
    })
  );
  lines.push("");

  lines.push("## Automation workflows", "");
  list(
    automations.map((a) => {
      const kind = a.label === "client" ? "Client work for DoGoodie" : "Portfolio demo on fictional data";
      return `[${a.title}](${siteUrl}${automationPath(a.id)}): ${kind}, ${a.platform}. ${a.tagline} Limits: ${a.scope}`;
    })
  );
  lines.push("");

  lines.push("## Experience", "");
  list(experience.map((job) => `${job.role}, ${job.company} (${job.period}, ${job.location}). ${job.bullets.join(" ")}`));
  lines.push("");

  lines.push("## Education", "");
  list([`${education.degree}, ${education.school} (${education.period})`]);
  lines.push("");

  lines.push("## Contact", "");
  list([
    ...contactMethods.map((c) => `${c.label}: ${c.link.replace("mailto:", "")}`),
    `Resume (PDF): ${siteUrl}${profile.resumeUrl}`,
  ]);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
