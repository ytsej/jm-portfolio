"use client";

import { portfolioData } from "@/src/data/portfolio";
import { cn } from "@/src/lib/cn";

export default function Inventory() {
  const { techStack } = portfolioData;

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-wider uppercase mb-2">
          Stacks
        </h1>
        <p className="text-gray-400">Technology stack and tools</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className={cn(
              "p-6 rounded-lg glass-panel glass-panel-hover text-center",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <div className="font-display text-xl tracking-wider uppercase">
              {tech}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
