import { iconData, type IconName } from "@/src/data/icon-data";

// Labels as they appear in portfolio data (lowercased) -> icon. Line icons
// cover things that aren't brands; an optional color tints them.
// HighLevel isn't in Simple Icons, so it has its own traced mark (see below)
type LabelMatch = { icon: IconName; color?: string } | { mark: "highlevel" };

const byLabel: Record<string, LabelMatch> = {
  // Websites
  html: { icon: "html5" },
  css: { icon: "css3" },
  javascript: { icon: "javascript" },
  typescript: { icon: "typescript" },
  "next.js": { icon: "nextdotjs" },
  react: { icon: "react" },
  "tailwind css": { icon: "tailwindcss" },
  bootstrap: { icon: "bootstrap" },
  php: { icon: "php" },
  mysql: { icon: "mysql" },
  // Back end
  "node.js (express)": { icon: "nodedotjs" },
  "node.js": { icon: "nodedotjs" },
  "vercel functions": { icon: "vercel" },
  vercel: { icon: "vercel" },
  firebase: { icon: "firebase" },
  supabase: { icon: "supabase" },
  "openai api": { icon: "openai" },
  openai: { icon: "openai" },
  "google sheets api": { icon: "googlesheets" },
  "google sheets": { icon: "googlesheets" },
  // Automation
  "zapier (with javascript code steps)": { icon: "zapier" },
  zapier: { icon: "zapier" },
  n8n: { icon: "n8n" },
  "gohighlevel api": { mark: "highlevel" },
  gohighlevel: { mark: "highlevel" },
  webhooks: { icon: "webhook", color: "#c73a63" },
  gmail: { icon: "gmail" },
  discord: { icon: "discord" },
  "google docs": { icon: "googledocs" },
  // Quality assurance
  "manual software testing": { icon: "clipboard-check" },
  "manual testing": { icon: "clipboard-check" },
  "bug tracking": { icon: "bug" },
  "data validation": { icon: "shield-check" },
  vitest: { icon: "vitest" },
  playwright: { icon: "drama", color: "#2ead33" },
  // AI-assisted development
  "claude code": { icon: "claude" },
  claude: { icon: "claude" },
  codex: { icon: "openai" },
  chatgpt: { icon: "openai" },
  "specs and tests first, output reviewed": { icon: "file-check" },
  // Tools
  "git and github": { icon: "github" },
  "google workspace": { icon: "google" },
  figma: { icon: "figma" },
  canva: { icon: "canva" },
  notion: { icon: "notion" },
  obsidian: { icon: "obsidian" },
  projectlibre: { icon: "chart-gantt", color: "#5aa0e0" },
  postman: { icon: "postman" },
  "google analytics 4": { icon: "googleanalytics" },
  "task breakdown": { icon: "list-checks" },
  // Also worked with
  java: { icon: "openjdk" },
  python: { icon: "python" },
  sqlite: { icon: "sqlite" },
  unity: { icon: "unity" },
  "c#": { icon: "hash", color: "#9b4f96" },
  "pc assembly": { icon: "cpu" },
  "os installation": { icon: "hard-drive" },
  "hardware troubleshooting": { icon: "wrench" },
  troubleshooting: { icon: "wrench" },
  // Project tags
  "tanstack start": { icon: "layers", color: "#e4b44c" },
  payzah: { icon: "credit-card" },
  "qa testing": { icon: "clipboard-check" },
  formspree: { icon: "formspree" },
  "axe-core": { icon: "accessibility", color: "#7c5cff" },
  firestore: { icon: "firebase" },
  "firebase authentication": { icon: "firebase" },
  "firebase realtime database": { icon: "firebase" },
  postgresql: { icon: "postgresql" },
  "prisma orm": { icon: "prisma" },
  "nextauth.js": { icon: "key-round", color: "#9b5de5" },
  zod: { icon: "zod" },
  exceljs: { icon: "file-spreadsheet", color: "#21a366" },
  xlsx: { icon: "file-spreadsheet", color: "#21a366" },
  jwt: { icon: "jsonwebtokens" },
  "bcrypt.js": { icon: "lock" },
  jquery: { icon: "jquery" },
  "react router": { icon: "reactrouter" },
  "styled components": { icon: "styledcomponents" },
  gsap: { icon: "greensock" },
  "framer motion": { icon: "framer" },
  "three.js": { icon: "threedotjs" },
  "locomotive scroll": { icon: "mouse" },
  swiper: { icon: "swiper" },
  "react icons": { icon: "react" },
  // Automation tools: Zapier built-ins in Zapier orange, n8n nodes in n8n pink
  "chatgpt (openai)": { icon: "openai" },
  "code by zapier": { icon: "code", color: "#ff4f00" },
  "formatter by zapier": { icon: "type", color: "#ff4f00" },
  "filter by zapier": { icon: "filter", color: "#ff4f00" },
  "ai by zapier": { icon: "sparkles", color: "#ff4f00" },
  "paths by zapier": { icon: "split", color: "#ff4f00" },
  "schedule by zapier": { icon: "clock", color: "#ff4f00" },
  "zapier tables": { icon: "table", color: "#ff4f00" },
  "webhook (header auth)": { icon: "webhook", color: "#ea4b71" },
  "n8n data tables": { icon: "database", color: "#ea4b71" },
  "http request": { icon: "globe", color: "#ea4b71" },
  wait: { icon: "hourglass", color: "#ea4b71" },
  "error trigger": { icon: "triangle-alert", color: "#ea4b71" },
  code: { icon: "code", color: "#ea4b71" },
  "gohighlevel api (read-only)": { mark: "highlevel" },
  "api key auth": { icon: "key-round" },
  // Contact
  email: { icon: "mail" },
  linkedin: { icon: "linkedin" },
  github: { icon: "github" },
  whatsapp: { icon: "whatsapp" },
  facebook: { icon: "facebook" },
  instagram: { icon: "instagram" },
  tiktok: { icon: "tiktok" },
};

// Near-black brand colors (Next.js, Vercel, GitHub, OpenAI) vanish on the dark
// panels, so those draw in white instead
function visibleOnDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.06 ? "#ffffff" : hex;
}

export function TechIcon({ name, color, className }: { name: IconName; color?: string; className?: string }) {
  const icon = iconData[name];
  if (icon.kind === "brand") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill={visibleOnDark(color ?? icon.color)} aria-hidden focusable="false">
        <path d={icon.body} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}

// HighLevel mark, traced from the official logo (three rising arrows) without
// its navy tile, so it sits on the dark panels like the other logos
export function HighLevelMark({ className }: { className?: string }) {
  return (
    <svg viewBox="84 84 344 344" className={className} aria-hidden focusable="false">
      <path d="M160 93L228 166H182V418H140V166H92Z" fill="#fec401" />
      <path d="M257 197L326 270H280V418H232V270H188Z" fill="#2996fb" />
      <path d="M351 93L420 166H372V418H330V166H282Z" fill="#4acf28" />
      {/* Folds under each arrowhead */}
      <path d="M148 166H182V200Z M244 270H280V306Z M338 166H372V200Z" fill="#000" fillOpacity={0.15} />
    </svg>
  );
}

// Icon for a label from the data files, or nothing if there isn't one
export function LabelIcon({ label, className }: { label: string; className?: string }) {
  const match = byLabel[label.toLowerCase()];
  if (!match) return null;
  if ("mark" in match) return <HighLevelMark className={className} />;
  return <TechIcon name={match.icon} color={match.color} className={className} />;
}

// Shown next to the platform badge on workflows that call the GoHighLevel API
export function GoHighLevelBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-white/25 bg-black/60 px-1.5 py-0.5 font-hud text-xs font-semibold uppercase tracking-wider text-white/90">
      <HighLevelMark className="h-3.5 w-3.5" />
      GoHighLevel
    </span>
  );
}

// Logo plus name, used for skills, project tags, and workflow tools.
// Not every logo is recognizable, and recruiters scan the text.
export function TechChip({ label, large }: { label: string; large?: boolean }) {
  return (
    <span className={`gta-chip gap-1.5 py-1 text-emerald-400 ${large ? "text-sm" : ""}`}>
      <LabelIcon label={label} className={`${large ? "h-4 w-4" : "h-3.5 w-3.5"} flex-shrink-0`} />
      <span className="text-white/85">{label}</span>
    </span>
  );
}
