"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { automations } from "@/src/data/automations";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath } from "@/src/data/sections";
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

// The other two examples; the client websites card rotates between two sites (below)
const cases: CaseCard[] = [
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

// One card that alternates between the two sites from the DoGoodie contract,
// so both get shown without taking two cards
const websites = [
  {
    name: "DoGoodie",
    image: "/images/projects/dogoodie/img-001.webp",
    summary:
      "A launch website for the DoGoodie builder community, with a secure challenge-intake API that writes to Google Sheets.",
    result: "Live at dogoodiebuilders.com.",
    path: projectPath("dogoodie"),
  },
  {
    name: "Ethical Capacity Lab",
    image: "/images/projects/ethical-capacity-lab/redesign-001.webp",
    summary:
      "The public front door for the Ethical Capacity Lab and its two programs, routing five audiences to clear pathways.",
    result: "Live at ethicalcapacitylab.org.",
    path: projectPath("ethical-capacity-lab"),
  },
];

const ROTATE_MS = 6000;

function WebsitesCard({ onOpenCase }: { onOpenCase: (path: string) => void }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Once someone picks a site themselves, stop rotating for good
  const [picked, setPicked] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || picked || reducedMotion) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % websites.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, paused, picked, reducedMotion]);

  const choose = (i: number) => {
    setActive(i);
    setPicked(true);
  };

  return (
    <article
      className="flex flex-col bg-black/70"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-[#0b1220]">
        {websites.map((site, i) => (
          <a
            key={site.name}
            href={site.path}
            onClick={(e) => handleInternalClick(e, () => onOpenCase(site.path))}
            tabIndex={-1}
            aria-hidden
            className={cn(
              "absolute inset-0 block transition-opacity duration-700",
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <Image
              src={site.image}
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </a>
        ))}
        {/* Picker: also shows which site is on screen */}
        <div className="absolute bottom-2 left-2 z-10 flex gap-1" role="group" aria-label="Choose a website">
          {websites.map((site, i) => (
            <button
              key={site.name}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={i === active}
              className={cn(
                "px-2.5 py-1 font-hud text-xs font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                i === active ? "bg-white text-black" : "bg-black/75 text-white/85 hover:bg-black"
              )}
            >
              {site.name === "Ethical Capacity Lab" ? "ECL" : site.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-hud text-xs font-semibold uppercase tracking-wider text-white/60">
            Client websites
          </span>
          <LabelBadge label="client" />
        </div>
        {/* Both texts share one grid cell, so the card never changes height */}
        <div className="grid flex-1">
          {websites.map((site, i) => (
            <div
              key={site.name}
              aria-hidden={i !== active}
              {...(i !== active ? { inert: true } : {})}
              className={cn(
                "col-start-1 row-start-1 flex flex-col gap-3 transition-opacity duration-700",
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <h3 className="font-hud text-xl font-semibold uppercase leading-tight tracking-wide text-white">
                {site.name}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-white/80">{site.summary}</p>
              <p className="text-sm leading-relaxed text-white/80">
                <span className="font-hud font-semibold uppercase tracking-wider text-emerald-400">Result: </span>
                {site.result}
              </p>
              <div className="mt-auto pt-1">
                <a
                  href={site.path}
                  onClick={(e) => handleInternalClick(e, () => onOpenCase(site.path))}
                  className="gta-btn gta-btn-primary"
                >
                  Read case study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedWork({ onOpenCase }: { onOpenCase: (path: string) => void }) {
  const itip = portfolioData.projects.find((p) => p.slug === "itip");

  return (
    <section aria-labelledby="featured-work-title">
      <div className="mb-3 sm:mb-4">
        <h2 id="featured-work-title" className="gta-title text-3xl sm:text-4xl leading-none">
          Featured work
        </h2>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-white/75">
          Three examples of what I can own: client websites, a client automation, and an engineering demo. Each case
          states my part, the result, the evidence, and the limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        <WebsitesCard onOpenCase={onOpenCase} />
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
              <span className="inline-flex items-center gap-1.5 bg-gta-yellow px-2 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
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
    </section>
  );
}
