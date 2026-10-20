"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaseSummary, LabelBadge } from "./GtaUi";
import { GoHighLevelBadge, PlatformLabel, TechChip } from "./TechIcon";
import { usesGoHighLevel, type Automation } from "@/src/data/automations";
import { useFocusTrap } from "@/src/lib/useFocusTrap";

interface AutomationDetailsPanelProps {
  item: Automation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AutomationDetailsPanel({ item, isOpen, onClose }: AutomationDetailsPanelProps) {
  const [zoomed, setZoomed] = useState(false);
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const [zoomEl, setZoomEl] = useState<HTMLDivElement | null>(null);

  // Focus moves into the panel (then the full-size card) and returns to the opener on close
  useFocusTrap(panelEl, isOpen && Boolean(item));
  useFocusTrap(zoomEl, isOpen && zoomed);

  useEffect(() => {
    if (!isOpen) setZoomed(false);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !isOpen) return;
      e.stopPropagation();
      if (zoomed) setZoomed(false);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, zoomed, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            ref={setPanelEl}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 z-[120] h-full w-full max-w-3xl overflow-y-auto bg-[#07090c]/95 backdrop-blur-md border-l border-white/10 focus:outline-none"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-black/90 px-5 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center bg-white px-1.5 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
                  <PlatformLabel platform={item.platform} />
                </span>
                {usesGoHighLevel(item) && <GoHighLevelBadge />}
                <LabelBadge label={item.label} />
              </div>
              <button type="button" onClick={onClose} className="gta-btn px-3 py-1" aria-label="Close">
                <kbd className="gta-key">Esc</kbd> Back
              </button>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              <div>
                <h2 className="gta-title text-4xl sm:text-5xl leading-none break-words">{item.title}</h2>
                <p className="mt-3 text-base sm:text-lg text-white/80">{item.tagline}</p>
              </div>

              <button
                type="button"
                onClick={() => setZoomed(true)}
                className="group relative block w-full overflow-hidden border border-white/10 bg-[#0b1220] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="View full card"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} workflow card`}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="h-auto w-full"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 font-hud text-xs uppercase tracking-wider text-white opacity-80 group-hover:opacity-100">
                  Click to zoom
                </span>
              </button>

              {item.caseStudy && <CaseSummary caseStudy={item.caseStudy} />}

              <section>
                <h3 className="gta-header">{item.caseStudy ? "How it works" : "What it does"}</h3>
                <p className="mt-3 leading-relaxed text-white/85">{item.summary}</p>
              </section>

              <section>
                <h3 className="gta-header">Tools</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tools.map((tool) => (
                    <TechChip key={tool} label={tool} large />
                  ))}
                </div>
              </section>

              {/* The case summary already covers evidence and limits */}
              {!item.caseStudy && (
                <>
                  <section>
                    <h3 className="gta-header">What was tested</h3>
                    <p className="mt-3 leading-relaxed text-white/85">{item.evidence}</p>
                  </section>

                  <section>
                    <h3 className="gta-header">Scope &amp; limits</h3>
                    <p className="mt-3 leading-relaxed text-white/80">{item.scope}</p>
                  </section>
                </>
              )}

              {item.label === "demo" && (
                <p className="border-l-2 border-white/30 pl-3 text-sm text-white/70">
                  Portfolio demo built on fictional data. A production deployment would need its own acceptance testing.
                </p>
              )}
            </div>
          </motion.aside>

          <AnimatePresence>
            {zoomed && (
              <motion.div
                ref={setZoomEl}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={`${item.title}, full-size card`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoomed(false)}
                className="fixed inset-0 z-[130] overflow-auto bg-black/95 p-2 sm:p-6 focus:outline-none"
              >
                <button
                  type="button"
                  onClick={() => setZoomed(false)}
                  className="gta-btn fixed right-4 top-4 z-10 px-3 py-1"
                  aria-label="Close full card"
                >
                  <kbd className="gta-key">Esc</kbd> Close
                </button>
                <Image
                  src={item.image}
                  alt={`${item.title} workflow card, full size`}
                  width={1600}
                  height={1000}
                  sizes="100vw"
                  className="mx-auto h-auto w-full max-w-[1600px]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
