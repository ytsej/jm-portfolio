"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
}

export default function SectionShell({ children }: SectionShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full overflow-visible"
    >
      {children}
    </motion.div>
  );
}
