"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/cn";
import { portfolioData, type Project } from "@/src/data/portfolio";

interface HeroFeatureProps {
  featuredProject?: Project;
  mode: "welcome" | "project";
  onModeChange?: (mode: "welcome" | "project") => void;
  onViewProject?: () => void;
  onNavigate?: (tab: "missions" | "automation" | "quit") => void;
}

export default function HeroFeature({
  featuredProject,
  mode,
  onModeChange,
  onViewProject,
  onNavigate,
}: HeroFeatureProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [manilaTime, setManilaTime] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const isWelcome = mode === "welcome" || !featuredProject;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Manila local time (GMT+8), so visitors abroad know when I'm online
    const updateTime = () =>
      setManilaTime(
        new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" })
      );
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Use project images when in Project mode, otherwise use jm images
  const slides = useMemo(() => {
    if (!isWelcome && featuredProject?.images && featuredProject.images.length > 0) {
      return featuredProject.images;
    }
    return [
      "/images/jm/gta/hero-1.webp",
      "/images/jm/gta/hero-2.webp",
      "/images/jm/gta/hero-3.webp",
    ];
  }, [isWelcome, featuredProject?.images]);

  // Reset index when slides change
  useEffect(() => {
    setIndex(0);
  }, [slides]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  const currentSrc = slides[index];

  return (
    <div className="relative w-full h-full overflow-hidden glass-panel group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSrc}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: prefersReducedMotion ? 1 : 1.02,
          }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1.08, 1.02],
                    x: ["-1%", "1%"],
                    y: ["-1%", "1%"],
                  }
            }
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src={currentSrc}
              alt={featuredProject?.title || "Hero"}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
      {/* Text covers most of the image on phones, so darken it more there */}
      <div className="absolute inset-0 bg-black/50 sm:hidden pointer-events-none" />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "linear-gradient(transparent 95%, rgba(255,255,255,0.08) 95%)", backgroundSize: "100% 3px" }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />
      {/* Dust particles - only render after mount to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = Math.random() * 100;
            const duration = 12 + Math.random() * 8;
            
            return (
              <motion.span
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                initial={{
                  x: `${startX}%`,
                  y: `${startY}%`,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.2 }
                    : {
                        y: ["-5%", "105%"],
                        x: [`${startX}%`, `${endX}%`],
                        opacity: [0, 0.6, 0],
                      }
                }
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-2xl space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Mode toggle */}
          <div className="flex items-center gap-2 sm:gap-3 mb-1">
            <div className="inline-flex bg-black/70 p-0.5 font-hud text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => onModeChange?.("welcome")}
                className={cn(
                  "px-3 py-1 transition-colors",
                  isWelcome ? "bg-white text-black" : "text-white/70 hover:text-white"
                )}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => onModeChange?.("project")}
                className={cn(
                  "px-3 py-1 transition-colors",
                  !isWelcome ? "bg-white text-black" : "text-white/70 hover:text-white"
                )}
              >
                Project
              </button>
            </div>
          </div>

          {!isWelcome && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/70 font-hud text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Project Active
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            </div>
          )}

          {isWelcome ? (
            <>
              <h2 className="gta-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
                John Mark
              </h2>
              <p className="font-hud text-sm sm:text-lg font-semibold uppercase tracking-wider text-emerald-400 drop-shadow-md">
                {portfolioData.profile.title}
              </p>
              <p className="hidden sm:block text-white/85 drop-shadow-md max-w-xl text-sm md:text-base leading-relaxed">
                I build websites and automate business workflows, with tests and checks so failures get flagged instead of slipping through.
              </p>

              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1 font-hud text-[11px] sm:text-xs uppercase tracking-wider text-white/80">
                <span>
                  <span className="text-emerald-400">Status:</span> {portfolioData.profile.availability}
                </span>
                <span>
                  <span className="text-emerald-400">Base:</span> Cavite, PH
                </span>
                <span>
                  <span className="text-emerald-400">Focus:</span> Web &amp; automation
                </span>
                <span>
                  <span className="text-emerald-400">Manila:</span> {manilaTime || "--:--"} (GMT+8)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  onClick={() => onNavigate?.("missions")}
                  className="gta-btn gta-btn-primary"
                >
                  View projects
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  onClick={() => onNavigate?.("automation")}
                  className="gta-btn"
                >
                  Automation
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  onClick={() => onNavigate?.("quit")}
                  className="gta-btn hidden sm:inline-flex"
                >
                  Contact
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
                {featuredProject?.title}
              </h2>
              <p className="text-sm sm:text-lg text-gray-200 drop-shadow-md mb-2">
                {featuredProject?.subtitle}
              </p>
              {featuredProject?.shortDescription && (
                <p className="hidden sm:block text-xs sm:text-sm text-gray-300 drop-shadow-md leading-relaxed max-w-2xl">
                  {featuredProject.shortDescription}
                </p>
              )}
              {featuredProject && (
                <motion.button
                  type="button"
                  onClick={onViewProject}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  className="gta-btn gta-btn-primary"
                >
                  Open brief
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
