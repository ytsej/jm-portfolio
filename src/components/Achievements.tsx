"use client";

import { portfolioData } from "@/src/data/portfolio";
import { cn } from "@/src/lib/cn";
import { SectionHeading } from "./GtaUi";

export default function Achievements() {
  const { achievements } = portfolioData;
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      <SectionHeading
        title="Achievements"
        subtitle="Milestones so far. Locked ones are in progress."
        right={
          <span className="font-hud text-sm font-semibold uppercase tracking-wider text-white/70">
            {unlocked} / {achievements.length} unlocked
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn("flex items-start gap-4 p-5", achievement.unlocked ? "bg-black/75" : "bg-black/50 opacity-60")}
          >
            <div
              className={cn(
                "flex h-11 w-11 flex-shrink-0 items-center justify-center",
                achievement.unlocked ? "bg-emerald-400 text-black" : "bg-white/10 text-white/50"
              )}
            >
              {achievement.unlocked ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
              <h3 className="font-hud text-lg font-semibold uppercase tracking-wide">{achievement.title}</h3>
              <p className="mt-1 text-sm text-white/70">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
