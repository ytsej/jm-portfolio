"use client";

import HeroFeature from "./HeroFeature";
import SelectedWork from "./SelectedWork";
import TileGrid from "./TileGrid";
import type { TabId } from "@/src/data/sections";

interface HomeDashboardProps {
  onNavigate: (tab: TabId) => void;
  onOpenCase: (path: string) => void;
}

// Order follows what a recruiter needs first: who, selected work, then everything else
export default function HomeDashboard({ onNavigate, onOpenCase }: HomeDashboardProps) {
  const viewWork = () => {
    const target = document.getElementById("selected-work");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move keyboard and screen reader focus along with the scroll
    target?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <HeroFeature onNavigate={onNavigate} onViewWork={viewWork} />
      <SelectedWork onOpenCase={onOpenCase} onNavigate={onNavigate} />
      <TileGrid onTileClick={onNavigate} />
    </div>
  );
}
