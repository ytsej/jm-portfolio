"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface IntroVideoProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function IntroVideo({ onVisibilityChange }: IntroVideoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setIsVisible(true);
      onVisibilityChange?.(true);
    }
  }, [onVisibilityChange]);

  const handleComplete = () => {
    // Start fade-out animation
    setIsFading(true);
    
    // Wait for fade animation, then hide completely
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasSeenIntro", "true");
      onVisibilityChange?.(false);
    }, 800); // Match fade duration
  };

  const handleVideoError = () => {
    setVideoError(true);
    // If video fails to load, skip it after a short delay
    setTimeout(() => {
      handleComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[90] bg-black flex items-center justify-center"
        >
          {/* Video Container - Small centered box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isFading ? 0.95 : 1, opacity: isFading ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl aspect-video mx-auto px-4"
          >
            {!videoError ? (
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleComplete}
                onError={handleVideoError}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              >
                <source src="/images/jm/intro.mp4" type="video/mp4" />
                <source src="/images/jm/intro.MP4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-center p-8 bg-black/50 rounded-lg">
                <div>
                  <p className="text-xl mb-4">Video unavailable</p>
                  <button
                    onClick={handleComplete}
                    className="px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded uppercase font-display tracking-wider text-white transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Skip Button */}
            <button
              onClick={handleComplete}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded uppercase font-display tracking-wider text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Skip intro"
            >
              Skip Intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
