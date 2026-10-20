"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  // false on first load, so server-rendered content is visible right away
  animate?: boolean;
}

export default function SectionShell({ children, animate = true }: SectionShellProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-visible"
    >
      {children}
    </motion.div>
  );
}
