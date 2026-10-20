"use client";

import { portfolioData } from "@/src/data/portfolio";
import { ListHeader, SectionHeading } from "./GtaUi";

export default function Inventory() {
  const { skillGroups } = portfolioData;

  return (
    <>
      <SectionHeading title="Stacks" subtitle="Tools and technologies, grouped the same way as my resume." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <section key={group.name} className="gta-panel">
            <ListHeader count={group.items.length}>{group.name}</ListHeader>
            <ul className="flex flex-wrap gap-1.5 p-4">
              {group.items.map((item) => (
                <li key={item} className="gta-chip text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
