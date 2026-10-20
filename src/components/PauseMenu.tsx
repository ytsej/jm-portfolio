"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import TopTabs from "@/src/components/TopTabs";
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
import { parsePath, sectionPath, sections, type TabId } from "@/src/data/sections";

// Tab order for Q/E navigation
const tabOrder: TabId[] = sections.map((s) => s.id);

export default function PauseMenu() {
  // The URL is the source of truth: /projects, /automation/<id>, and so on
  const pathname = usePathname();
  const { tab: activeTab, caseSlug } = parsePath(pathname);

  // Skip the section fade-in on first load so content shows before hydration
  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  // Views switch in place through the History API (Next.js keeps usePathname
  // in sync), so there is no reload and refresh or Back/Forward land on the same view
  const navigate = useCallback((path: string, opts: { replace?: boolean; from?: string } = {}) => {
    if (path === window.location.pathname) return;
    const state = opts.from ? { jmFrom: opts.from } : null;
    if (opts.replace) window.history.replaceState(state, "", path);
    else window.history.pushState(state, "", path);
  }, []);

  const goToTab = useCallback((tab: TabId) => navigate(sectionPath(tab)), [navigate]);

  // A case remembers where it was opened from, so closing it steps back there
  const openCase = useCallback(
    (path: string) => navigate(path, { from: window.location.pathname }),
    [navigate]
  );

  const closeCase = useCallback(() => {
    if (window.history.state?.jmFrom) window.history.back();
    else navigate(sectionPath(activeTab), { replace: true });
  }, [navigate, activeTab]);

  // Phone apps (Job List, Workflows) ask to open a project or workflow
  useEffect(() => {
    const onNavigate = (e: Event) => {
      const { path } = (e as CustomEvent<{ path: string }>).detail;
      if (parsePath(path).caseSlug) openCase(path);
      else navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("jm:navigate", onNavigate);
    return () => window.removeEventListener("jm:navigate", onNavigate);
  }, [navigate, openCase]);

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

      // Overlays (details panels, the phone, the intro) handle their own keys
      if (document.querySelector('[aria-modal="true"]')) return;

      // ESC: Go to home
      if (e.key === "Escape" && activeTab !== "new") {
        goToTab("new");
      }

      // Q: Previous tab
      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        const currentIndex = tabOrder.indexOf(activeTab);
        goToTab(tabOrder[currentIndex > 0 ? currentIndex - 1 : tabOrder.length - 1]);
      }

      // E: Next tab
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        const currentIndex = tabOrder.indexOf(activeTab);
        goToTab(tabOrder[currentIndex < tabOrder.length - 1 ? currentIndex + 1 : 0]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, goToTab]);

  const renderSection = () => {
    switch (activeTab) {
      case "new":
        return <HomeDashboard onNavigate={goToTab} onOpenCase={openCase} />;
      case "missions":
        return (
          <Projects
            projects={portfolioData.projects}
            caseSlug={caseSlug}
            onOpenCase={openCase}
            onCloseCase={closeCase}
          />
        );
      case "automation":
        return <Automation caseSlug={caseSlug} onOpenCase={openCase} onCloseCase={closeCase} />;
      case "profile":
        return <Profile onTabChange={goToTab} />;
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
      <TopTabs activeTab={activeTab} onTabChange={goToTab} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 overflow-visible">
        <SectionShell key={activeTab} animate={hasMounted.current}>
          {renderSection()}
        </SectionShell>
      </main>

      {/* Footer HUD: GTA-style instructional buttons. The footer text sits on the left, clear of the phone button. */}
      <footer className="w-full pt-4 pb-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-hud text-xs sm:text-sm uppercase tracking-wider text-white/60">
              {portfolioData.profile.title}
            </span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("jm:play-intro"))}
              className="font-hud text-xs sm:text-sm uppercase tracking-wider text-white/60 underline-offset-4 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              ▶ Play intro
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-black/70 px-3 py-1.5 font-hud text-xs font-semibold uppercase tracking-wider text-white/90">
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Q</kbd><kbd className="gta-key">E</kbd> Tabs</span>
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Enter</kbd> Select</span>
            <span className="flex items-center gap-1.5"><kbd className="gta-key">Esc</kbd> Back</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
