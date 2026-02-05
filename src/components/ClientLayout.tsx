"use client";

import { ReactNode, useState } from "react";
import PhoneMenu from "./PhoneMenu";
import IntroVideo from "./IntroVideo";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  return (
    <>
      <IntroVideo onVisibilityChange={setIsIntroVisible} />
      {children}
      {!isIntroVisible && <PhoneMenu />}
    </>
  );
}
