"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/cn";
import type { Project } from "@/src/data/portfolio";

interface HeroFeatureProps {
  featuredProject?: Project;
  mode: "welcome" | "project";
  onModeChange?: (mode: "welcome" | "project") => void;
  onViewProject?: () => void;
}

export default function HeroFeature({
  featuredProject,
  mode,
  onModeChange,
  onViewProject,
}: HeroFeatureProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isWelcome = mode === "welcome" || !featuredProject;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use project images when in Project mode, otherwise use jm images
  const slides = useMemo(() => {
    if (!isWelcome && featuredProject?.images && featuredProject.images.length > 0) {
      return featuredProject.images;
    }
    return [
      "/images/jm/1.png",
      "/images/jm/2.png",
      "/images/jm/3.png",
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
    <div className="relative w-full h-full rounded-lg overflow-hidden glass-panel group">
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
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />
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
            <div className="inline-flex rounded-full bg-black/40 border border-white/20 p-0.5 sm:p-1 text-[10px] sm:text-xs font-display uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              <button
                type="button"
                onClick={() => onModeChange?.("welcome")}
                className={cn(
                  "px-2 py-0.5 sm:px-3 sm:py-1 rounded-full transition-colors text-xs sm:text-sm",
                  isWelcome ? "bg-emerald-500 text-black" : "text-gray-300"
                )}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => onModeChange?.("project")}
                className={cn(
                  "px-2 py-0.5 sm:px-3 sm:py-1 rounded-full transition-colors text-xs sm:text-sm",
                  !isWelcome ? "bg-emerald-500 text-black" : "text-gray-300"
                )}
              >
                Project
              </button>
            </div>
          </div>

          {!isWelcome && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-display text-white">
              Project Active
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            </div>
          )}

          {isWelcome ? (
            <>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
                JM.EXE
              </h2>
              <p className="text-gray-200 drop-shadow-md max-w-xl text-[11px] sm:text-sm md:text-base font-semibold">
                IT Student • Frontend / API • Hardware & Systems
              </p>
              <p className="hidden sm:block text-gray-200 drop-shadow-md max-w-xl text-xs sm:text-sm md:text-base leading-relaxed">
                Building reliable web interfaces and practical systems — from UI to APIs, databases, and device troubleshooting. Comfortable with real-world setups: OS installs, PC assembly, and hands-on problem solving.
              </p>

              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 gap-y-1 text-[10px] sm:text-[11px] text-gray-300 font-mono">
                <span>
                  <span className="text-emerald-400">STATUS:</span> ONLINE
                </span>
                <span>
                  <span className="text-emerald-400">BUILD:</span> PORTFOLIO v1.0
                </span>
                <span>
                  <span className="text-emerald-400">MODE:</span> INTERACTIVE
                </span>
                <span>
                  <span className="text-emerald-400">PROFILE:</span> LOADED
                </span>
              </div>

              <motion.button
                type="button"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.03, boxShadow: "0 0 18px rgba(52,211,153,0.55)" }
                }
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                onClick={() => onModeChange?.("project")}
                className="mt-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-emerald-400/70 rounded uppercase font-display tracking-wider text-white text-xs sm:text-sm transition-all duration-200"
              >
                View Projects
              </motion.button>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
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
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : { scale: 1.03, boxShadow: "0 0 18px rgba(52,211,153,0.55)" }
                  }
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-emerald-400/70 rounded uppercase font-display tracking-wider text-white text-xs sm:text-sm transition-all duration-200"
                >
                  View Project
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
