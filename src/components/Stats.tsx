"use client";

import { portfolioData } from "@/src/data/portfolio";
import { cn } from "@/src/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

export default function Stats() {
  const { profile, skills } = portfolioData;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
          Stats
        </h1>
        <p className="text-gray-400">Profile and skill statistics</p>
      </div>

      {/* Profile Section */}
      <div className="p-8 rounded-lg glass-panel">
        <h2 className="font-display text-3xl tracking-wider uppercase mb-4">
          {profile.name}
        </h2>
        <p className="text-xl text-gray-300 mb-2">{profile.title}</p>
        <p className="text-gray-400 leading-relaxed mb-6">{profile.summary}</p>
        
        {/* Resume View */}
        <a
          href="/images/jm/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg transition-all duration-200 hover:scale-105 group"
        >
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span className="font-display text-sm uppercase tracking-wider text-white">
            View Resume (PDF)
          </span>
        </a>
      </div>

      {/* Skills Section */}
      <div className="space-y-6">
        <h2 className="font-display text-3xl tracking-wider uppercase">
          Skills
        </h2>
        <div className="space-y-4">
          {skills.map((skill, index) => {
            const targetWidth = `${skill.percentage}%`;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-wider uppercase">
                    {skill.name}
                  </span>
                  <span className="text-gray-400">{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  {prefersReducedMotion ? (
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r from-emerald-500 to-green-400"
                      )}
                      style={{ width: targetWidth }}
                    />
                  ) : (
                    <motion.div
                      className={cn(
                        "h-full bg-gradient-to-r from-emerald-500 to-green-400"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: targetWidth }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                        delay: index * 0.1,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
