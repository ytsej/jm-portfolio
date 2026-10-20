"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/src/lib/useFocusTrap";

interface IntroVideoProps {
  open: boolean;
  onClose: () => void;
}

// Optional intro, played from the footer's "Play intro" control. The site opens
// straight on content; while the intro plays, focus stays inside it.
export default function IntroVideo({ open, onClose }: IntroVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [overlayEl, setOverlayEl] = useState<HTMLDivElement | null>(null);

  useFocusTrap(overlayEl, open);

  useEffect(() => {
    if (open) setVideoError(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <AnimatePresence>
      {/* The exit animation does the fade-out */}
      {open && (
        <motion.div
          ref={setOverlayEl}
          role="dialog"
          aria-modal="true"
          aria-label="Intro video"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[140] bg-black flex items-center justify-center focus:outline-none"
        >
          {/* Video Container - Small centered box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl aspect-video mx-auto px-4"
          >
            {!videoError ? (
              <video
                autoPlay
                muted
                playsInline
                onEnded={onClose}
                onError={handleVideoError}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              >
                <source src="/images/jm/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-center p-8 bg-black/50 rounded-lg">
                <p className="text-xl">Video unavailable</p>
              </div>
            )}

            {/* Skip Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 gta-btn"
            >
              <kbd className="gta-key">Esc</kbd> Skip intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
