"use client";

import { portfolioData } from "@/src/data/portfolio";
import { cn } from "@/src/lib/cn";

export default function Achievements() {
  const { achievements } = portfolioData;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
          Achievements
        </h1>
        <p className="text-gray-400">Unlocked accomplishments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "p-6 rounded-lg glass-panel transition-all duration-200",
              achievement.unlocked
                ? "border-green-500/50 bg-green-500/5"
                : "border-white/10 bg-white/5 opacity-50"
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  achievement.unlocked
                    ? "bg-green-500/20 border border-green-500/50"
                    : "bg-gray-500/20 border border-gray-500/50"
                )}
              >
                {achievement.unlocked ? (
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl tracking-wider uppercase mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
