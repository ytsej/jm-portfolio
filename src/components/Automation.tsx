"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AutomationDetailsPanel from "./AutomationDetailsPanel";
import { LabelBadge, ListHeader, SectionHeading } from "./GtaUi";
import { automationIntro, automations, type Automation as AutomationItem } from "@/src/data/automations";

export default function Automation({
  initialOpenId,
  onInitialOpenHandled,
}: {
  initialOpenId?: string;
  onInitialOpenHandled?: () => void;
}) {
  const featured = automations.filter((a) => a.featured);
  const others = automations.filter((a) => !a.featured);

  const [showAll, setShowAll] = useState(false);
  const initialItem = automations.find((a) => a.id === initialOpenId) ?? null;
  const [selected, setSelected] = useState<AutomationItem | null>(initialItem);
  const [isPanelOpen, setIsPanelOpen] = useState(Boolean(initialItem));

  // Only open the requested workflow once; later visits to the tab start closed
  useEffect(() => {
    if (initialOpenId) onInitialOpenHandled?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (item: AutomationItem) => {
    setSelected(item);
    setIsPanelOpen(true);
  };

  const close = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

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
      <ListHeader count={featured.length}>Featured workflows</ListHeader>
      <div className="mt-[2px] grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
        {featured.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => open(item)}
            className="group relative block w-full bg-black/70 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1220]">
              <Image
                src={item.image}
                alt={`${item.title} workflow card`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-center justify-between gap-3 bg-black/80 px-4 py-3">
              <div className="min-w-0">
                <h3 className="truncate font-hud text-base sm:text-lg font-semibold uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="truncate text-xs sm:text-sm text-white/65">{item.tagline}</p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1">
                <span className="bg-white px-1.5 py-0.5 font-hud text-[11px] font-bold uppercase tracking-wider text-black">
                  {item.platform}
                </span>
                <LabelBadge label={item.label} />
              </div>
            </div>
            <span className="pointer-events-none absolute inset-0 ring-0 ring-inset ring-white/0 transition-all group-hover:ring-2 group-hover:ring-white/80" />
          </button>
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
                <button
                  key={item.id}
                  type="button"
                  onClick={() => open(item)}
                  className="gta-row group normal-case focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="relative hidden sm:block h-12 w-20 flex-shrink-0 overflow-hidden bg-[#0b1220]">
                      <Image src={item.image} alt="" fill sizes="80px" className="object-cover object-top" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate uppercase">{item.title}</span>
                      <span className="block truncate font-body text-xs normal-case tracking-normal text-white/60 group-hover:text-inherit">
                        {item.tagline}
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="text-xs text-white/60 group-hover:text-inherit">{item.platform}</span>
                    {item.label === "client" && <LabelBadge label="client" />}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AutomationDetailsPanel item={selected} isOpen={isPanelOpen} onClose={close} />
    </>
  );
}
