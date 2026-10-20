"use client";

import { useState, useEffect } from "react";
import TopTabs, { tabs as tabList, type TabId } from "@/src/components/TopTabs";
import HomeDashboard from "@/src/components/HomeDashboard";
import Projects from "@/src/components/Projects";
import Automation from "@/src/components/Automation";
import Profile from "@/src/components/Profile";
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
  const tabs: TabId[] = tabList.map((tab) => tab.id);

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

      // ESC: Go to home, unless a details panel is open (it closes itself)
      if (e.key === "Escape" && !document.querySelector('[aria-modal="true"]')) {
        if (activeTab !== "new") {
          setActiveTab("new");
          setHeroMode("welcome");
        }
      }

      // Tab shortcuts are disabled while a details panel is open
      if (document.querySelector('[aria-modal="true"]')) return;

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
      case "automation":
        return <Automation />;
      case "profile":
        return <Profile onTabChange={setActiveTab} />;
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
        <SectionShell key={activeTab}>{renderSection()}</SectionShell>
      </main>

      {/* Footer HUD: GTA-style instructional buttons */}
      <footer className="w-full py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="font-hud text-xs sm:text-sm uppercase tracking-wider text-white/50">
            {portfolioData.profile.title}
          </div>
          <div className="hidden md:flex items-center gap-4 bg-black/70 px-3 py-1.5 font-hud text-xs font-semibold uppercase tracking-wider text-white/90">
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Q</kbd><kbd className="gta-key">E</kbd> Tabs</span>
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Enter</kbd> Select</span>
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Esc</kbd> Home</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
