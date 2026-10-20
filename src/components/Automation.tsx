"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AutomationDetailsPanel from "./AutomationDetailsPanel";
import { LabelBadge, ListHeader, SectionHeading } from "./GtaUi";
import { automationIntro, automations, type Automation as AutomationItem } from "@/src/data/automations";
import { automationPath } from "@/src/data/sections";
import { handleInternalClick } from "@/src/lib/nav";

interface AutomationProps {
  // From the URL: /automation/<id> opens that workflow's details
  caseSlug?: string;
  onOpenCase: (path: string) => void;
  onCloseCase: () => void;
}

export default function Automation({ caseSlug, onOpenCase, onCloseCase }: AutomationProps) {
  const featured = automations.filter((a) => a.featured);
  const others = automations.filter((a) => !a.featured);

  const caseItem = automations.find((a) => a.id === caseSlug) ?? null;
  const [showAll, setShowAll] = useState(Boolean(caseItem && !caseItem.featured));
  // Keeps the last workflow rendered while the panel slides out
  const [selected, setSelected] = useState<AutomationItem | null>(caseItem);

  useEffect(() => {
    if (caseItem) setSelected(caseItem);
  }, [caseItem]);

  const linkProps = (item: AutomationItem) => ({
    href: automationPath(item.id),
    onClick: (e: MouseEvent) => handleInternalClick(e, () => onOpenCase(automationPath(item.id))),
  });

  return (
    <>
      <SectionHeading
        title="Automation"
        subtitle={automationIntro}
        right={
          <div className="flex flex-wrap gap-2">
            <LabelBadge label="client" />
            <LabelBadge label="demo" />
          </div>
        }
      />

      {/* Featured */}
      <ListHeader count={featured.length}>Featured: client work, then demos</ListHeader>
      <div className="mt-[2px] grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
        {featured.map((item) => (
          <a
            key={item.id}
            {...linkProps(item)}
            className="group relative flex w-full flex-col bg-black/70 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1220]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 bg-black/80 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white px-1.5 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
                  {item.platform}
                </span>
                <LabelBadge label={item.label} />
              </div>
              <h3 className="font-hud text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{item.tagline}</p>
            </div>
            <span className="pointer-events-none absolute inset-0 ring-0 ring-inset ring-white/0 transition-all group-hover:ring-2 group-hover:ring-white/80" />
          </a>
        ))}
      </div>

      {/* View all */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="gta-btn"
        >
          {showAll ? "Hide other workflows" : `View all (${others.length} more)`}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ListHeader count={others.length} className="mt-4">
              All other workflows
            </ListHeader>
            <div className="mt-[2px] flex flex-col gap-[2px]">
              {others.map((item) => (
                <a
                  key={item.id}
                  {...linkProps(item)}
                  className="gta-row group normal-case focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="relative hidden sm:block h-12 w-20 flex-shrink-0 overflow-hidden bg-[#0b1220]">
                      <Image src={item.image} alt="" fill sizes="80px" className="object-cover object-top" />
                    </span>
                    <span className="min-w-0">
                      <span className="block uppercase">{item.title}</span>
                      <span className="block font-body text-sm normal-case tracking-normal text-white/70 group-hover:text-inherit">
                        {item.tagline}
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="text-xs text-white/70 group-hover:text-inherit">{item.platform}</span>
                    {item.label === "client" && <LabelBadge label="client" />}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AutomationDetailsPanel item={selected} isOpen={Boolean(caseItem)} onClose={onCloseCase} />
    </>
  );
}
