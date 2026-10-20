"use client";

import { portfolioData } from "@/src/data/portfolio";
import type { IconName } from "@/src/data/icon-data";
import { SectionHeading } from "./GtaUi";
import { LabelIcon, TechIcon } from "./TechIcon";

// Rotating accent colors, like the character-switch wheel
const accents = ["#65b4d4", "#72cc72", "#ffa357"];

const roleIcons: Record<string, IconName> = {
  "Full-Stack Web Developer": "code-xml",
  "Workflow & AI Automation": "workflow",
  "QA & Testing": "shield-check",
  "Project Coordination": "chart-gantt",
  "Unity Game Dev": "gamepad-2",
  "Hardware & Systems": "cpu",
};

export default function Crew() {
  const { roles } = portfolioData;

  return (
    <>
      <SectionHeading title="Roles" subtitle="The kinds of work I take on, most relevant first." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, index) => {
          const accent = accents[index % accents.length];
          const icon = roleIcons[role.title];
          return (
            <article
              key={role.title}
              className="gta-panel border-t-[3px] p-5 transition-colors duration-150 hover:bg-black/85"
              style={{ borderTopColor: accent }}
            >
              <div className="flex items-center gap-3">
                {icon && (
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2"
                    style={{ borderColor: accent, backgroundColor: `${accent}1f` }}
                  >
                    <TechIcon name={icon} color={accent} className="h-5 w-5" />
                  </span>
                )}
                <h2 className="font-display text-2xl tracking-wider uppercase leading-none">{role.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{role.description}</p>
              {/* Logo plus name: not every logo is recognizable, and recruiters scan the text */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {role.skills.map((skill) => (
                  <span key={skill} className="gta-chip gap-1.5 py-1 text-emerald-400">
                    <LabelIcon label={skill} className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-white/85">{skill}</span>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
