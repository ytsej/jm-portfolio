"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PhoneMenu from "./PhoneMenu";
import IntroVideo from "./IntroVideo";

const SEEN_KEY = "hasSeenIntro";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const pathname = usePathname();

  // Autoplay once per session, only when landing on Home. A link straight to a
  // project or workflow skips it, and so does a visitor who prefers reduced motion.
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(SEEN_KEY);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (pathname === "/" && !seen && !reduced) setIsIntroOpen(true);
    } catch {
      // Storage blocked: skip the autoplay rather than play it on every load
    }
    // Only the landing page matters, not later in-site navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The footer's "Play intro" control replays it any time
  useEffect(() => {
    const play = () => setIsIntroOpen(true);
    window.addEventListener("jm:play-intro", play);
    return () => window.removeEventListener("jm:play-intro", play);
  }, []);

  const closeIntro = useCallback(() => {
    setIsIntroOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <IntroVideo open={isIntroOpen} onClose={closeIntro} />
      {children}
      {!isIntroOpen && <PhoneMenu />}
    </>
  );
}
