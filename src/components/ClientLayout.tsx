"use client";

import { ReactNode, useEffect, useState } from "react";
import PhoneMenu from "./PhoneMenu";
import IntroVideo from "./IntroVideo";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  // The footer's "Play intro" control asks for the intro
  useEffect(() => {
    const play = () => setIsIntroOpen(true);
    window.addEventListener("jm:play-intro", play);
    return () => window.removeEventListener("jm:play-intro", play);
  }, []);

  return (
    <>
      <IntroVideo open={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
      {children}
      {!isIntroOpen && <PhoneMenu />}
    </>
  );
}
