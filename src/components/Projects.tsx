"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/src/lib/cn";
import ProjectDetailsPanel from "./ProjectDetailsPanel";
import { HighlightBadge, ListHeader, SectionHeading, StatusBadge } from "./GtaUi";
import type { Project } from "@/src/data/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const clientProjects = projects.filter((p) => p.category === "client");
  const otherProjects = projects.filter((p) => p.category !== "client");

  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const [panelProject, setPanelProject] = useState<Project | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  const openPanel = (project: Project) => {
    setPanelProject(project);
    setIsPanelOpen(true);
  };

  const handleRowClick = (project: Project) => {
    setSelectedId(project.id);
    // On small screens there is no preview column, so go straight to details
    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) {
      openPanel(project);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setPanelProject(null), 300);
  };

  const renderRows = (items: Project[]) =>
    items.map((project) => {
      const isActive = selected?.id === project.id;
      return (
        <button
          key={project.id}
          type="button"
          onClick={() => handleRowClick(project)}
          onDoubleClick={() => openPanel(project)}
          className={cn(
            "gta-row focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400",
            isActive && "gta-row-active"
          )}
        >
          <span className="min-w-0 truncate">{project.title}</span>
          <span className="flex flex-shrink-0 items-center gap-2">
            {project.highlight && <HighlightBadge label={project.highlight} />}
            <StatusBadge status={project.status} inverted={isActive} />
          </span>
        </button>
      );
    });

  return (
    <>
      <SectionHeading
        title="Projects"
        subtitle="Client work first, then academic and personal builds. Select a project to preview it, then open the full brief."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 lg:gap-6 items-start">
        {/* Project list */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <section className="flex flex-col gap-[2px]">
            <ListHeader count={clientProjects.length} className="border-l-4 border-emerald-400">
              Client &amp; work
            </ListHeader>
            {renderRows(clientProjects)}
          </section>
          <section className="flex flex-col gap-[2px]">
            <ListHeader count={otherProjects.length} className="border-l-4 border-sky-400">
              Academic &amp; personal
            </ListHeader>
            {renderRows(otherProjects)}
          </section>
        </div>

        {/* Preview */}
        <div className="hidden lg:block lg:sticky lg:top-4">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="gta-panel"
              >
                <ListHeader>{selected.subtitle}</ListHeader>
                <div className="relative aspect-video bg-black">
                  {selected.images[0] ? (
                    <Image
                      src={selected.images[0]}
                      alt={`${selected.title} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 700px, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-900/40 via-black to-black">
                      <span className="font-hud text-sm uppercase tracking-[0.2em] text-white/50">
                        Private project · no public screenshots
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    {selected.highlight && (
                      <div className="mb-2">
                        <HighlightBadge label={selected.highlight} />
                      </div>
                    )}
                    <h2 className="font-display text-3xl tracking-wider uppercase leading-none">{selected.title}</h2>
                    <p className="mt-2 font-hud text-sm uppercase tracking-wider text-emerald-400">{selected.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">
                    {selected.shortDescription ?? selected.description.split("\n")[0]}
                  </p>
                  {selected.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {selected.tags.slice(0, 8).map((tag) => (
                        <span key={tag} className="gta-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button type="button" onClick={() => openPanel(selected)} className="gta-btn gta-btn-primary">
                      Open brief
                    </button>
                    {selected.links.live && (
                      <a href={selected.links.live} target="_blank" rel="noopener noreferrer" className="gta-btn">
                        Live site ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProjectDetailsPanel project={panelProject} isOpen={isPanelOpen} onClose={handleClosePanel} />
    </>
  );
}
