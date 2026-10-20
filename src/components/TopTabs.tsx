"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/cn";
import { motion } from "framer-motion";
import { portfolioData } from "@/src/data/portfolio";
import { sectionPath, sections, type TabId } from "@/src/data/sections";
import { handleInternalClick } from "@/src/lib/nav";

export type { TabId };

interface TopTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TopTabs({ activeTab, onTabChange }: TopTabsProps) {
  const [clock, setClock] = useState("");
  const tabRefs = useRef<Partial<Record<TabId, HTMLAnchorElement | null>>>({});
  const activeIndex = sections.findIndex((s) => s.id === activeTab);

  // Clock renders client-side only to avoid a hydration mismatch
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      setClock(`${day} ${time}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Keep the active tab visible in the scrollable strip on small screens
  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeTab]);

  const step = (delta: number) => {
    const next = (activeIndex + delta + sections.length) % sections.length;
    onTabChange(sections[next].id);
  };

  return (
    <header className="w-full pt-3 sm:pt-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Title row */}
        <div className="flex items-end justify-between gap-4 pb-3">
          <a
            href="/"
            onClick={(e) => handleInternalClick(e, () => onTabChange("new"))}
            className="flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="JM.EXE home"
          >
            <Image
              src="/images/jm/logo.png"
              alt=""
              width={64}
              height={64}
              className="h-11 w-11 sm:h-16 sm:w-16 object-contain"
              priority
            />
          </a>

          <div className="text-right font-hud uppercase leading-tight">
            <div className="text-sm sm:text-lg font-semibold tracking-wide text-white drop-shadow">
              {portfolioData.profile.name.replace(" C.", "")}
            </div>
            <div className="text-xs sm:text-sm font-medium tracking-wider text-white/70">
              <span className="hidden sm:inline">{clock}</span>
              <span className="hidden sm:inline mx-2 text-white/30">|</span>
              <span className="text-emerald-400">{portfolioData.profile.availability}</span>
            </div>
          </div>
        </div>

        {/* Tab strip. Below lg the tabs scroll sideways, so Q/E-style arrows and a
            position counter make the hidden tabs obvious. */}
        <nav aria-label="Sections" className="flex items-stretch gap-[2px]">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous section"
            className="lg:hidden flex w-10 flex-shrink-0 items-center justify-center bg-black/75 text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative min-w-0 flex-1">
            <ul className="flex gap-[2px] overflow-x-auto scrollbar-hide snap-x">
              {sections.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <li key={tab.id} className="flex-1 min-w-[112px] snap-start">
                    <a
                      ref={(el) => {
                        tabRefs.current[tab.id] = el;
                      }}
                      href={sectionPath(tab.id)}
                      onClick={(e) => handleInternalClick(e, () => onTabChange(tab.id))}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative flex h-10 sm:h-11 items-center justify-center px-3 font-hud text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400",
                        isActive ? "bg-white text-black" : "bg-black/75 text-white/80 hover:bg-black/90 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="tab-accent"
                          className="absolute inset-x-0 top-0 h-[3px] bg-emerald-400"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      {tab.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            {/* Edge fades hint that the strip scrolls */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/70 to-transparent lg:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/70 to-transparent lg:hidden" />
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next section"
            className="lg:hidden flex w-10 flex-shrink-0 items-center justify-center bg-black/75 text-white hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
        <p className="mt-1 text-right font-hud text-xs uppercase tracking-wider text-white/50 lg:hidden" aria-hidden>
          {activeIndex + 1} / {sections.length} · {sections[activeIndex]?.label}
        </p>
      </div>
    </header>
  );
}
