"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/cn";
import type { Project } from "@/src/data/portfolio";

interface ProjectCarouselProps {
  projects: Project[];
  selectedProjectId?: string;
  onProjectSelect: (project: Project) => void;
}

export default function ProjectCarousel({
  projects,
  selectedProjectId,
  onProjectSelect,
}: ProjectCarouselProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="w-full overflow-visible space-y-3">
      <div className="flex gap-3 sm:gap-4 overflow-x-auto py-3 sm:py-4 px-2 sm:px-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scroll-smooth snap-x snap-mandatory">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          const hasError = imageErrors[project.id] === true;
          const imagePath = project.images?.[0] || "/images/projects/placeholder.jpg";

          return (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project)}
              className={cn(
                "relative flex-shrink-0 w-48 h-28 sm:w-56 sm:h-36 rounded-lg overflow-hidden glass-panel transition-all duration-300 group snap-center",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                "active:scale-95 lg:hover:scale-105",
                isSelected
                  ? "ring-2 ring-emerald-400 shadow-lg shadow-emerald-400/40 lg:scale-105"
                  : "lg:hover:ring-1 lg:hover:ring-white/30"
              )}
            >
              {hasError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 to-purple-900/50" />
              ) : (
                <Image
                  src={imagePath}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(project.id)}
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

              {/* Hover preview */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="px-3 py-1 border border-emerald-400/60 rounded text-xs uppercase font-display tracking-wider text-white">
                  View Project
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-10">
                <h4 className="font-display text-xs sm:text-base tracking-wider uppercase text-white drop-shadow-lg truncate">
                  {project.title}
                </h4>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full shadow-lg shadow-white/50"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 justify-center">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          return (
            <span
              key={project.id}
              className={cn(
                "h-1.5 rounded-full bg-white/30 transition-all duration-300",
                isSelected ? "w-6 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" : "w-3"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
