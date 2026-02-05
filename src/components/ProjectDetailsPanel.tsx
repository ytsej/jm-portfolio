"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/src/data/portfolio";

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-black/95 backdrop-blur-md border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-4xl tracking-wider uppercase mb-2">
                    {project.title}
                  </h2>
                  <p className="text-xl text-gray-400 mb-1">{project.subtitle}</p>
                  <p className="text-sm text-gray-500">{project.role}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close"
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
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded uppercase text-xs font-display tracking-wider">
                  {project.status}
                </span>
              </div>

              {/* Image Gallery */}
              {hasImages && (
                <div className="mb-6">
                  <h3 className="font-display text-xl tracking-wider uppercase mb-3">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                        className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-colors group"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-display text-xl tracking-wider uppercase mb-3">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Bullets */}
              {project.bullets && project.bullets.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl tracking-wider uppercase mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-white mt-1">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl tracking-wider uppercase mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {project.links && Object.keys(project.links).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-display text-xl tracking-wider uppercase mb-3">
                    Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded uppercase text-sm font-display tracking-wider transition-colors"
                      >
                        Live Site
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded uppercase text-sm font-display tracking-wider transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded uppercase text-sm font-display tracking-wider transition-colors"
                      >
                        Demo
                      </a>
                    )}
                    {project.links.figma && (
                      <a
                        href={project.links.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded uppercase text-sm font-display tracking-wider transition-colors"
                      >
                        Figma
                      </a>
                    )}
                    {project.links.apk && (
                      <a
                        href={project.links.apk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded uppercase text-sm font-display tracking-wider transition-colors"
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
                className="mt-8 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded text-center"
              >
                <p className="font-display text-2xl tracking-wider uppercase text-emerald-400">
                  Project Loaded
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && hasImages && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxIndex(null)}
                  className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
                >
                  <button
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
                      className="object-contain"
                    />
                  </motion.div>

                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {lightboxIndex > 0 && (
                        <button
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
