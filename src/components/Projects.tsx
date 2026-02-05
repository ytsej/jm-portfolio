"use client";

import { useState } from "react";
import { cn } from "@/src/lib/cn";
import ProjectDetailsPanel from "./ProjectDetailsPanel";
import type { Project } from "@/src/data/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
            Projects
          </h1>
          <p className="text-gray-400">Select a project to view details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className={cn(
                "text-left p-6 rounded-lg glass-panel glass-panel-hover",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-2xl tracking-wider uppercase mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.subtitle}</p>
                </div>
                <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs uppercase font-display">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectDetailsPanel
        project={selectedProject}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}
