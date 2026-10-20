"use client";

import HeroFeature from "./HeroFeature";
import FeaturedWork from "./FeaturedWork";
import TileGrid from "./TileGrid";
import type { TabId } from "@/src/data/sections";

interface HomeDashboardProps {
  onNavigate: (tab: TabId) => void;
  onOpenCase: (path: string) => void;
}

// Order follows what a recruiter needs first: who, featured work, then everything else
export default function HomeDashboard({ onNavigate, onOpenCase }: HomeDashboardProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      <HeroFeature onNavigate={onNavigate} />
      <FeaturedWork onOpenCase={onOpenCase} />
      <TileGrid onTileClick={onNavigate} />
    </div>
  );
}
