"use client";

import { useState } from "react";
import HeroFeature from "./HeroFeature";
import TileGrid from "./TileGrid";
import ProjectCarousel from "./ProjectCarousel";
import ProjectDetailsPanel from "./ProjectDetailsPanel";
import type { TabId } from "./TopTabs";
import type { Project } from "@/src/data/portfolio";

interface HomeDashboardProps {
  projects: Project[];
  featuredProject?: Project;
  onProjectSelect: (project: Project) => void;
  onTileClick: (tabId: TabId) => void;
  heroMode: "welcome" | "project";
  onHeroModeChange: (mode: "welcome" | "project") => void;
}

export default function HomeDashboard({
  projects,
  featuredProject,
  onProjectSelect,
  onTileClick,
  heroMode,
  onHeroModeChange,
}: HomeDashboardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleViewProject = () => {
    if (featuredProject) {
      setIsPanelOpen(true);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {/* Left: Hero Feature */}
          <div className="lg:col-span-2 flex min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]">
            <HeroFeature
              featuredProject={featuredProject}
              mode={heroMode}
              onModeChange={onHeroModeChange}
              onViewProject={handleViewProject}
              onNavigate={onTileClick}
            />
          </div>

        {/* Right: Tile Grid */}
        <div className="lg:col-span-1 flex min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]">
          <TileGrid onTileClick={onTileClick} />
        </div>
      </div>

      {/* Bottom: Project Carousel */}
      <div className="w-full overflow-visible">
        <div className="gta-header flex items-center justify-between">
          <span>Featured work</span>
          <span className="text-white/50">{projects.length}</span>
        </div>
        <ProjectCarousel
          projects={projects}
          selectedProjectId={featuredProject?.id}
          onProjectSelect={onProjectSelect}
        />
      </div>
    </div>

    <ProjectDetailsPanel
      project={featuredProject || null}
      isOpen={isPanelOpen}
      onClose={handleClosePanel}
    />
    </>
  );
}
