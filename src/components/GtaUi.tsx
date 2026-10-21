import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";
import type { CaseStudy } from "@/src/data/portfolio";

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
      {count !== undefined && <span className="opacity-60">{count}</span>}
    </div>
  );
}

export function LabelBadge({ label }: { label: "client" | "demo" }) {
  return label === "client" ? (
    <span className="inline-flex items-center bg-emerald-400 px-2 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
      Client work
    </span>
  ) : (
    <span className="inline-flex items-center border border-white/30 bg-black/60 px-2 py-0.5 font-hud text-xs font-semibold uppercase tracking-wider text-white/85">
      Portfolio demo
    </span>
  );
}

export function StatusBadge({ status, inverted }: { status: string; inverted?: boolean }) {
  if (!status) return null;
  // Ongoing work is a GTA mission-yellow badge, readable on both dark and selected rows
  if (isOngoingStatus(status)) {
    return (
      <span className="inline-flex items-center bg-gta-yellow px-1.5 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
        {status}
      </span>
    );
  }
  const isLive = /live/i.test(status);
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

export const isOngoingStatus = (status: string) => /ongoing|in progress/i.test(status);

export function HighlightBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center bg-emerald-400 px-1.5 py-0.5 font-hud text-xs font-bold uppercase tracking-wider text-black">
      {label}
    </span>
  );
}

const caseRows: { key: keyof CaseStudy; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "responsibility", label: "My part" },
  { key: "decision", label: "Key decision" },
  { key: "result", label: "Result" },
  { key: "evidence", label: "Evidence" },
  { key: "limits", label: "Limits" },
];

// Short recruiter-facing summary shown before the technical details
export function CaseSummary({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section>
      <h3 className="gta-header">Case summary</h3>
      <dl className="divide-y divide-white/10 bg-black/40">
        {caseRows
          .filter((row) => caseStudy[row.key])
          .map((row) => (
            <div key={row.key} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
              <dt className="font-hud text-sm font-semibold uppercase tracking-wider text-emerald-400">{row.label}</dt>
              <dd className="text-[15px] leading-relaxed text-white/85">{caseStudy[row.key]}</dd>
            </div>
          ))}
      </dl>
    </section>
  );
}
