"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/cn";
import { motion } from "framer-motion";
import { portfolioData } from "@/src/data/portfolio";

export type TabId =
  | "new"
  | "missions"
  | "automation"
  | "profile"
  | "inventory"
  | "crew"
  | "achievements"
  | "quit";

interface Tab {
  id: TabId;
  label: string;
}

export const tabs: Tab[] = [
  { id: "new", label: "HOME" },
  { id: "missions", label: "PROJECTS" },
  { id: "automation", label: "AUTOMATION" },
  { id: "profile", label: "PROFILE" },
  { id: "inventory", label: "STACKS" },
  { id: "crew", label: "ROLES" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "quit", label: "CONTACT" },
];

interface TopTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TopTabs({ activeTab, onTabChange }: TopTabsProps) {
  const [clock, setClock] = useState("");
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

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

  return (
    <header className="w-full pt-3 sm:pt-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Title row */}
        <div className="flex items-end justify-between gap-4 pb-3">
          <motion.button
            type="button"
            onClick={() => onTabChange("new")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Go to home"
          >
            <Image
              src="/images/jm/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-8 w-8 sm:h-11 sm:w-11 object-contain"
            />
            <span className="gta-title text-3xl sm:text-5xl leading-none">JM.EXE</span>
          </motion.button>

          <div className="text-right font-hud uppercase leading-tight">
            <div className="text-sm sm:text-lg font-semibold tracking-wide text-white drop-shadow">
              {portfolioData.profile.name.replace(" C.", "")}
            </div>
            <div className="text-[11px] sm:text-sm font-medium tracking-wider text-white/70">
              <span className="hidden sm:inline">{clock}</span>
              <span className="hidden sm:inline mx-2 text-white/30">|</span>
              <span className="text-emerald-400">{portfolioData.profile.availability}</span>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <nav aria-label="Sections" className="relative">
          <div className="flex gap-[2px] overflow-x-auto scrollbar-hide snap-x">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex-1 min-w-[112px] snap-start h-10 sm:h-11 px-3 font-hud text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors duration-150",
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
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
