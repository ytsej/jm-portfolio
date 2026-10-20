"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/src/data/portfolio";
import { sectionPath, type TabId } from "@/src/data/sections";
import { handleInternalClick } from "@/src/lib/nav";

const slides = ["/images/jm/gta/hero-1.webp", "/images/jm/gta/hero-2.webp", "/images/jm/gta/hero-3.webp"];

// First screen: who I am, what I do, and quick facts with resume and contact links
export default function HeroFeature({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { profile } = portfolioData;

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const currentSrc = slides[index];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col justify-end overflow-hidden glass-panel min-h-[440px] sm:min-h-[460px] lg:min-h-[500px]"
    >
      {/* initial={false}: the first slide is visible before hydration */}
      <AnimatePresence initial={false} mode="wait">
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
              alt=""
              fill
              sizes="(min-width: 1280px) 1240px, 100vw"
              className="object-cover object-[70%_center]"
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlays: text sits bottom-left, so darken that corner most */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
      {/* Text covers most of the image on phones, so darken it more there */}
      <div className="absolute inset-0 bg-black/50 sm:hidden pointer-events-none" />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "linear-gradient(transparent 95%, rgba(255,255,255,0.08) 95%)", backgroundSize: "100% 3px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }} />
      {/* Dust particles - only render after mount to avoid hydration mismatch */}
      {mounted && !prefersReducedMotion && (
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
                initial={{ x: `${startX}%`, y: `${startY}%`, opacity: 0, scale: 0.6 }}
                animate={{ y: ["-5%", "105%"], x: [`${startX}%`, `${endX}%`], opacity: [0, 0.6, 0] }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            );
          })}
        </div>
      )}

      {/* Content stays in normal flow, so the panel grows instead of clipping on narrow screens */}
      <div className="relative z-10 max-w-2xl space-y-3 p-4 sm:space-y-4 sm:p-6 lg:p-8">
        <h1 id="hero-title" className="gta-title text-4xl sm:text-6xl lg:text-7xl leading-[0.95]">
          {profile.name.replace(" C.", "")}
        </h1>
        <p className="font-hud text-base sm:text-lg font-semibold uppercase tracking-wider text-emerald-400 drop-shadow-md">
          {profile.title}
        </p>
        <p className="max-w-xl text-[15px] sm:text-base leading-relaxed text-white/90 drop-shadow-md">
          I build and maintain websites and web apps, and automate the business work around them: form intake, AI inbox
          triage, CRM updates, and recurring reports. Each build has checks, so failures get flagged instead of slipping
          through.
        </p>

        <dl className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-x-6 gap-y-1 pt-1 font-hud text-xs sm:text-sm uppercase tracking-wider text-white/85">
          <div>
            <dt className="inline text-emerald-400">Status: </dt>
            <dd className="inline">{profile.availability}</dd>
          </div>
          <div>
            <dt className="inline text-emerald-400">Base: </dt>
            <dd className="inline">Cavite, PH</dd>
          </div>
          <div>
            <dt className="inline text-emerald-400">Focus: </dt>
            <dd className="inline">Software &amp; automation</dd>
          </div>
          <div>
            <dt className="inline text-emerald-400">Timezone: </dt>
            <dd className="inline">GMT+8</dd>
          </div>
          <div>
            <dt className="inline text-emerald-400">Resume: </dt>
            <dd className="inline">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                View PDF ↗
              </a>
            </dd>
          </div>
          <div>
            <dt className="inline text-emerald-400">Contact: </dt>
            <dd className="inline">
              <a
                href={sectionPath("quit")}
                onClick={(e) => handleInternalClick(e, () => onNavigate("quit"))}
                className="underline underline-offset-4 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Email, LinkedIn, WhatsApp
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
