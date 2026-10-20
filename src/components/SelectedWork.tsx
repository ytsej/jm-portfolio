"use client";

import Image from "next/image";
import { automations } from "@/src/data/automations";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath, sectionPath, type TabId } from "@/src/data/sections";
import { handleInternalClick } from "@/src/lib/nav";
import { LabelBadge } from "./GtaUi";

interface CaseCard {
  kind: string;
  label: "client" | "demo";
  title: string;
  summary: string;
  result: string;
  image: string;
  links: { label: string; path: string }[];
}

const automationImage = (id: string) => automations.find((a) => a.id === id)?.image ?? "";

// Three differentiated examples: client websites, a client automation, an engineering demo
const cases: CaseCard[] = [
  {
    kind: "Client websites",
    label: "client",
    title: "DoGoodie and Ethical Capacity Lab",
    summary:
      "One DoGoodie contract, two live websites: a community launch site with a secure challenge-intake API, and a Next.js front door for the parent organization.",
    result: "Both live at dogoodiebuilders.com and ethicalcapacitylab.org.",
    image: "/images/projects/dogoodie/img-001.webp",
    links: [
      { label: "DoGoodie case", path: projectPath("dogoodie") },
      { label: "ECL case", path: projectPath("ethical-capacity-lab") },
    ],
  },
  {
    kind: "Client automation",
    label: "client",
    title: "Email Inquiry Classifier",
    summary:
      "Business inquiries from Gmail are classified by ChatGPT, cleaned up with JavaScript, and posted to the team's Discord channel.",
    result: "Published and on at the 18 Oct 2026 review, with 27 successful runs.",
    image: automationImage("dogoodie-email-inquiry-classifier"),
    links: [{ label: "Read case study", path: automationPath("dogoodie-email-inquiry-classifier") }],
  },
  {
    kind: "Engineering demo",
    label: "demo",
    title: "Authenticated Lead Routing",
    summary:
      "An n8n webhook with header auth and an event ledger, so a retried lead returns the original CRM records instead of creating duplicates.",
    result: "Acceptance run covered replays, conflicts, and rejected auth and input.",
    image: automationImage("authenticated-lead-routing"),
    links: [{ label: "Read case study", path: automationPath("authenticated-lead-routing") }],
  },
];

interface SelectedWorkProps {
  onOpenCase: (path: string) => void;
  onNavigate: (tab: TabId) => void;
}

export default function SelectedWork({ onOpenCase, onNavigate }: SelectedWorkProps) {
  const itip = portfolioData.projects.find((p) => p.slug === "itip");

  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="scroll-mt-4">
      <div className="mb-3 sm:mb-4">
        <h2 id="selected-work-title" tabIndex={-1} className="gta-title text-3xl sm:text-4xl leading-none focus:outline-none">
          Selected work
        </h2>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-white/75">
          Three examples of what I can own: client websites, a client automation, and an engineering demo. Each case
          states my part, the result, the evidence, and the limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {cases.map((item) => (
          <article key={item.title} className="flex flex-col bg-black/70">
            <a
              href={item.links[0].path}
              onClick={(e) => handleInternalClick(e, () => onOpenCase(item.links[0].path))}
              tabIndex={-1}
              aria-hidden
              className="group relative block aspect-video overflow-hidden bg-[#0b1220]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </a>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-hud text-xs font-semibold uppercase tracking-wider text-white/60">{item.kind}</span>
                <LabelBadge label={item.label} />
              </div>
              <h3 className="font-hud text-xl font-semibold uppercase leading-tight tracking-wide text-white">
                {item.title}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-white/80">{item.summary}</p>
              <p className="text-sm leading-relaxed text-white/80">
                <span className="font-hud font-semibold uppercase tracking-wider text-emerald-400">Result: </span>
                {item.result}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {item.links.map((link, i) => (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleInternalClick(e, () => onOpenCase(link.path))}
                    className={i === 0 ? "gta-btn gta-btn-primary" : "gta-btn"}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {itip && (
        <div className="mt-[2px] flex flex-col gap-3 bg-black/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-300 px-2 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
                Ongoing
              </span>
              <span className="font-hud text-xs font-semibold uppercase tracking-wider text-white/60">
                Current role · {itip.role}
              </span>
            </div>
            <h3 className="mt-2 font-hud text-lg font-semibold uppercase leading-tight tracking-wide text-white">
              {itip.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              Working on an existing platform in Kuwait. The Payzah payment integration and its testing are still in
              progress, and the platform has not launched.
            </p>
          </div>
          <a
            href={projectPath(itip.slug)}
            onClick={(e) => handleInternalClick(e, () => onOpenCase(projectPath(itip.slug)))}
            className="gta-btn flex-shrink-0 self-start sm:self-center"
          >
            View details
          </a>
        </div>
      )}

      <p className="mt-3 text-sm text-white/70">
        More client, academic, and personal work is in{" "}
        <SectionLink tab="missions" onNavigate={onNavigate}>
          Projects
        </SectionLink>{" "}
        and{" "}
        <SectionLink tab="automation" onNavigate={onNavigate}>
          Automation
        </SectionLink>
        .
      </p>
    </section>
  );
}

function SectionLink({ tab, onNavigate, children }: { tab: TabId; onNavigate: (tab: TabId) => void; children: string }) {
  return (
    <a
      href={sectionPath(tab)}
      onClick={(e) => handleInternalClick(e, () => onNavigate(tab))}
      className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
    >
      {children}
    </a>
  );
}
