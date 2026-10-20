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
