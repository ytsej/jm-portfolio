"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/src/data/portfolio";
import { useFocusTrap } from "@/src/lib/useFocusTrap";
import { CaseSummary, isOngoingStatus } from "./GtaUi";
import { TechChip } from "./TechIcon";

interface ProjectDetailsPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsPanel({
  project,
  isOpen,
  onClose,
}: ProjectDetailsPanelProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [panelEl, setPanelEl] = useState<HTMLDivElement | null>(null);
  const [lightboxEl, setLightboxEl] = useState<HTMLDivElement | null>(null);

  // Focus moves into the panel (then the image viewer) and returns to the opener on close
  useFocusTrap(panelEl, isOpen && Boolean(project));
  useFocusTrap(lightboxEl, isOpen && lightboxIndex !== null);

  useEffect(() => {
    if (!isOpen) setLightboxIndex(null);
  }, [isOpen]);

  useEffect(() => {
    const count = project?.images.length ?? 0;
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      // Arrow keys page through the image viewer
      if (lightboxIndex !== null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const next = lightboxIndex + (e.key === "ArrowRight" ? 1 : -1);
        if (next >= 0 && next < count) setLightboxIndex(next);
        return;
      }
      if (e.key !== "Escape") return;
      if (lightboxIndex !== null) setLightboxIndex(null);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, lightboxIndex, onClose, project]);

  if (!project) return null;
  
  const hasImages = project.images && project.images.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110]"
          />

          {/* Panel */}
          <motion.div
            ref={setPanelEl}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#07090c]/95 backdrop-blur-md border-l border-white/10 z-[120] overflow-y-auto focus:outline-none"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-black/90 px-5 py-3">
              <span className="font-hud text-sm font-semibold uppercase tracking-[0.15em] text-white/80">Project brief</span>
              <button type="button" onClick={onClose} className="gta-btn px-3 py-1" aria-label="Close">
                <kbd className="gta-key">Esc</kbd> Back
              </button>
            </div>
            <div className="p-5 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="gta-title text-4xl sm:text-5xl leading-none mb-3 break-words">{project.title}</h2>
                <p className="text-lg text-white/70 mb-1">{project.subtitle}</p>
                <p className="font-hud text-sm font-semibold uppercase tracking-wider text-emerald-400">{project.role}</p>
              </div>

              {/* Status and highlight badges */}
              {(project.status || project.highlight) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.highlight && (
                    <span className="inline-block bg-emerald-400 px-3 py-1 font-hud text-xs font-bold uppercase tracking-wider text-black">
                      {project.highlight}
                    </span>
                  )}
                  {project.status && (
                    <span
                      className={`inline-block px-3 py-1 font-hud text-xs font-bold uppercase tracking-wider text-black ${
                        isOngoingStatus(project.status) ? "bg-gta-yellow" : "bg-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
              )}

              {/* Case summary first, technical details after */}
              {project.caseStudy && (
                <div className="mb-6">
                  <CaseSummary caseStudy={project.caseStudy} />
                </div>
              )}

              {/* Image Gallery */}
              {hasImages && (
                <div className="mb-6">
                  <h3 className="gta-header mb-3">Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.images.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        aria-label={`View image ${index + 1} of ${project.images.length}`}
                        className="relative aspect-video overflow-hidden bg-white/5 border border-white/10 hover:border-white transition-colors group"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          sizes="(min-width: 640px) 320px, 50vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="gta-header mb-3">{project.caseStudy ? "Technical details" : "Description"}</h3>
                <p className="text-white/85 leading-relaxed whitespace-pre-line">{project.description.replace(/\r/g, "")}</p>
              </div>

              {/* Bullets */}
              {project.bullets && project.bullets.length > 0 && (
                <div className="mb-6">
                  <h3 className="gta-header mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-emerald-400 mt-0.5">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="gta-header mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <TechChip key={tag} label={tag} large />
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {project.links && Object.keys(project.links).length > 0 && (
                <div className="mb-6">
                  <h3 className="gta-header mb-3">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gta-btn"
                      >
                        Live Site
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gta-btn"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gta-btn"
                      >
                        Demo
                      </a>
                    )}
                    {project.links.figma && (
                      <a
                        href={project.links.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gta-btn"
                      >
                        Figma
                      </a>
                    )}
                    {project.links.apk && (
                      <a
                        href={project.links.apk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gta-btn"
                      >
                        APK
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Project Loaded Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-8 py-4 text-center bg-gradient-to-r from-transparent via-black/80 to-transparent"
              >
                <p className="gta-title text-3xl sm:text-4xl uppercase" style={{ color: "#f5c542" }}>
                  Brief loaded
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && hasImages && (
              <>
                <motion.div
                  ref={setLightboxEl}
                  tabIndex={-1}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${project.title} image viewer`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxIndex(null)}
                  className="fixed inset-0 bg-black/90 z-[130] flex items-center justify-center p-4 focus:outline-none"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close lightbox"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-5xl w-full aspect-video"
                  >
                    <Image
                      src={project.images[lightboxIndex]}
                      alt={`${project.title} - Image ${lightboxIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </motion.div>

                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {lightboxIndex > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(lightboxIndex - 1);
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded font-display uppercase text-sm"
                        >
                          Previous
                        </button>
                      )}
                      <span className="px-4 py-2 bg-black/50 rounded text-sm">
                        {lightboxIndex + 1} / {project.images.length}
                      </span>
                      {lightboxIndex < project.images.length - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(lightboxIndex + 1);
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded font-display uppercase text-sm"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
