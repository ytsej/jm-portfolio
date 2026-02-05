"use client";

import { useState, useEffect } from "react";
import TopTabs, { type TabId } from "@/src/components/TopTabs";
import HomeDashboard from "@/src/components/HomeDashboard";
import Projects from "@/src/components/Projects";
import Stats from "@/src/components/Stats";
import Inventory from "@/src/components/Inventory";
import Crew from "@/src/components/Crew";
import Achievements from "@/src/components/Achievements";
import Quit from "@/src/components/Quit";
import SectionShell from "@/src/components/SectionShell";
import { portfolioData } from "@/src/data/portfolio";
import type { Project } from "@/src/data/portfolio";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("new");
  const [featuredProject, setFeaturedProject] = useState<Project | undefined>(
    portfolioData.projects[0]
  );
  const [heroMode, setHeroMode] = useState<"welcome" | "project">("welcome");

  // Tab order for Q/E navigation
  const tabs: TabId[] = ["new", "missions", "stats", "inventory", "crew", "achievements", "quit"];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // ESC: Go to home
      if (e.key === "Escape") {
        if (activeTab !== "new") {
          setActiveTab("new");
          setHeroMode("welcome");
        }
      }

      // Q: Previous tab
      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        const currentIndex = tabs.indexOf(activeTab);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        setActiveTab(tabs[prevIndex]);
      }

      // E: Next tab
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        const currentIndex = tabs.indexOf(activeTab);
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        setActiveTab(tabs[nextIndex]);
      }

      // ENTER: Simulate click on focused element
      if (e.key === "Enter" && document.activeElement instanceof HTMLElement) {
        const focused = document.activeElement;
        if (focused.tagName === "BUTTON" || focused.tagName === "A") {
          e.preventDefault();
          focused.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, tabs]);

  const handleProjectSelect = (project: Project) => {
    setFeaturedProject(project);
    setHeroMode("project");
  };

  const renderSection = () => {
    switch (activeTab) {
      case "new":
        return (
          <HomeDashboard
            projects={portfolioData.projects}
            featuredProject={featuredProject}
            onProjectSelect={handleProjectSelect}
            onTileClick={setActiveTab}
            heroMode={heroMode}
            onHeroModeChange={setHeroMode}
          />
        );
      case "missions":
        return <Projects projects={portfolioData.projects} />;
      case "stats":
        return <Stats />;
      case "inventory":
        return <Inventory />;
      case "crew":
        return <Crew />;
      case "achievements":
        return <Achievements />;
      case "quit":
        return <Quit />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 overflow-visible">
        <SectionShell>{renderSection()}</SectionShell>
      </main>

      {/* Footer HUD */}
      <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-xs sm:text-sm text-gray-500">
            {activeTab === "new" && featuredProject && (
              <span>Current Project: {featuredProject.title}</span>
            )}
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-xs text-gray-500 font-display tracking-wider uppercase flex-wrap">
            <span>ESC Home</span>
            <span className="hidden sm:inline">ENTER Select</span>
            <span className="hidden md:inline">Q Prev Tab</span>
            <span className="hidden md:inline">E Next Tab</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
