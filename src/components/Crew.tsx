"use client";

import { portfolioData } from "@/src/data/portfolio";
import { SectionHeading } from "./GtaUi";

// Rotating accent colors, like the character-switch wheel
const accents = ["#65b4d4", "#72cc72", "#ffa357"];

export default function Crew() {
  const { roles } = portfolioData;

  return (
    <>
      <SectionHeading title="Roles" subtitle="The kinds of work I take on, most relevant first." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, index) => (
          <article
            key={role.title}
            className="gta-panel border-t-[3px] p-5 transition-colors duration-150 hover:bg-black/85"
            style={{ borderTopColor: accents[index % accents.length] }}
          >
            <h2 className="font-display text-2xl tracking-wider uppercase leading-none">{role.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{role.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <span key={skill} className="gta-chip">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
