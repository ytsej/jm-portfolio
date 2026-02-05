"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export type TabId = 
  | "new" 
  | "missions" 
  | "stats" 
  | "inventory" 
  | "crew" 
  | "achievements" 
  | "quit";

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: "new", label: "HOME" },
  { id: "missions", label: "PROJECTS" },
  { id: "stats", label: "STATS" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.25, ease: "easeOut" },
    }),
  };

  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 relative">
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Desktop/Tablet Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6 md:gap-8 relative">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mr-4 flex-shrink-0"
          >
            <Image
              src="/images/jm/logo.png"
              alt="JM.EXE Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </motion.div>

          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative font-display text-base md:text-lg tracking-wider uppercase transition-all duration-200 flex-shrink-0 px-2 py-1",
                "hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                activeTab === tab.id
                  ? "text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              {tab.label}
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-1 left-0 right-0 mx-auto h-[3px] rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Logo - Smaller on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <Image
              src="/images/jm/logo.png"
              alt="JM.EXE Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </motion.div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {tabs.map((tab, i) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg font-display text-sm tracking-wider uppercase transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-400/50",
                      activeTab === tab.id
                        ? "bg-emerald-500/20 text-white border border-emerald-400/50"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
