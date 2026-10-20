import { automations } from "@/src/data/automations";
import { faqs } from "@/src/data/faq";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath } from "@/src/data/sections";
import { ownerName, siteName, siteUrl } from "@/src/data/site";

// Long form of llms.txt: every case summary in one plain-text file, built from
// the same data as the site. Entries without a case summary use their description.
export const dynamic = "force-static";

export function GET() {
  const { profile, projects, experience, skillGroups } = portfolioData;
  const out: string[] = [];
  const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

  out.push(`# ${ownerName} (${siteName}): full portfolio text`, "");
  out.push(`> ${profile.title}. ${profile.availability}. ${profile.location}.`, "", profile.summary, "");

  out.push("## Quick answers", "");
  faqs.forEach((f) => out.push(`**${f.question}** ${f.answer}`, ""));

  out.push("## Projects", "");
  projects.forEach((p) => {
    out.push(`### ${p.title}`, `URL: ${siteUrl}${projectPath(p.slug)}`);
    out.push(`Type: ${p.category === "client" ? "Client work" : "Academic or personal"}. Status: ${p.status || "n/a"}. Role: ${p.role}.`);
    if (p.links.live) out.push(`Live site: ${p.links.live}`);
    if (p.links.github) out.push(`Code: ${p.links.github}`);
    out.push("");
    if (p.caseStudy) {
      const c = p.caseStudy;
      out.push(`Problem: ${c.problem}`, `My part: ${c.responsibility}`);
      if (c.decision) out.push(`Key decision: ${c.decision}`);
      out.push(`Result: ${c.result}`, `Evidence: ${c.evidence}`, `Limits: ${c.limits}`);
    } else {
      out.push(oneLine(p.description));
    }
    out.push(`Technologies: ${p.tags.join(", ")}`, "");
  });

  out.push("## Automation workflows", "");
  automations.forEach((a) => {
    out.push(`### ${a.title}`, `URL: ${siteUrl}${automationPath(a.id)}`);
    out.push(`Platform: ${a.platform}. ${a.label === "client" ? "Client work for DoGoodie." : "Portfolio demo on fictional data."}`, "");
    if (a.caseStudy) {
      const c = a.caseStudy;
      out.push(`Problem: ${c.problem}`, `My part: ${c.responsibility}`);
      if (c.decision) out.push(`Key decision: ${c.decision}`);
      out.push(`Result: ${c.result}`, `Evidence: ${c.evidence}`, `Limits: ${c.limits}`);
    } else {
      out.push(`What it does: ${a.summary}`, `What was tested: ${a.evidence}`, `Limits: ${a.scope}`);
    }
    out.push(`Tools: ${a.tools.join(", ")}`, "");
  });

  out.push("## Experience", "");
  experience.forEach((job) => {
    out.push(`### ${job.role}, ${job.company} (${job.period}, ${job.location})`);
    job.bullets.forEach((b) => out.push(`- ${b}`));
    out.push("");
  });

  out.push("## Skills", "");
  skillGroups.forEach((g) => out.push(`- ${g.name}: ${g.items.join(", ")}`));
  out.push("");

  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
