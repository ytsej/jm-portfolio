import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";

// Page heading used at the top of each tab
export function SectionHeading({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <div>
        <h1 className="gta-title text-4xl sm:text-5xl leading-none">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl text-sm sm:text-base text-white/70">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

// Dark bar above a list or panel, like the pause-menu column headers
export function ListHeader({ children, count, className }: { children: ReactNode; count?: number; className?: string }) {
  return (
    <div className={cn("gta-header flex items-center justify-between", className)}>
      <span>{children}</span>
      {count !== undefined && <span className="text-white/50">{count}</span>}
    </div>
  );
}

export function LabelBadge({ label }: { label: "client" | "demo" }) {
  return label === "client" ? (
    <span className="inline-flex items-center bg-emerald-400 px-2 py-0.5 font-hud text-[11px] font-bold uppercase tracking-wider text-black">
      Client work · DoGoodie
    </span>
  ) : (
    <span className="inline-flex items-center border border-white/30 bg-black/60 px-2 py-0.5 font-hud text-[11px] font-semibold uppercase tracking-wider text-white/80">
      Portfolio demo
    </span>
  );
}

export function StatusBadge({ status, inverted }: { status: string; inverted?: boolean }) {
  const isLive = /live|ongoing|in progress/i.test(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-hud text-xs font-semibold uppercase tracking-wider",
        inverted ? "text-black/70" : "text-white/60"
      )}
    >
      {isLive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />}
      {status}
    </span>
  );
}
