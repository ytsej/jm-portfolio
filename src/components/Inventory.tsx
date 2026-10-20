"use client";

import { portfolioData } from "@/src/data/portfolio";
import { ListHeader, SectionHeading } from "./GtaUi";
import { LabelIcon } from "./TechIcon";

export default function Inventory() {
  const { skillGroups } = portfolioData;

  return (
    <>
      <SectionHeading title="Stacks" subtitle="Tools and technologies, grouped the same way as my resume." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <section key={group.name} className="gta-panel">
            <ListHeader count={group.items.length}>{group.name}</ListHeader>
            {/* Inventory-style slots: logo on top, name below */}
            <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-[2px] p-[2px]">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex min-h-[92px] flex-col items-center justify-center gap-2 bg-white/[0.04] px-1.5 py-3 text-center text-emerald-400 transition-colors duration-150 hover:bg-white/10"
                >
                  <LabelIcon label={item} className="h-7 w-7 flex-shrink-0" />
                  <span className="text-xs leading-tight text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
