import { iconData, type IconName } from "@/src/data/icon-data";

// Labels as they appear in portfolio data (lowercased) -> icon. Line icons
// cover things that aren't brands; an optional color tints them.
const byLabel: Record<string, { icon: IconName; color?: string }> = {
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
  "gohighlevel api": { icon: "target", color: "#188bf6" },
  gohighlevel: { icon: "target", color: "#188bf6" },
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
  "gohighlevel api (read-only)": { icon: "target", color: "#188bf6" },
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

// Icon for a label from the data files, or nothing if there isn't one
export function LabelIcon({ label, className }: { label: string; className?: string }) {
  const match = byLabel[label.toLowerCase()];
  return match ? <TechIcon name={match.icon} color={match.color} className={className} /> : null;
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
