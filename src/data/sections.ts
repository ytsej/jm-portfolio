// Tabs, their URLs, and per-page search text. Plain module (no "use client")
// so server code like generateMetadata and the sitemap can import it too.

export type TabId =
  | "new"
  | "missions"
  | "automation"
  | "profile"
  | "inventory"
  | "crew"
  | "achievements"
  | "quit";

export interface Section {
  id: TabId;
  label: string;
  // URL segment; "" is the home page
  slug: string;
  // Page title for search results and the browser tab
  title: string;
  description: string;
}

export const sections: Section[] = [
  {
    id: "new",
    label: "HOME",
    slug: "",
    title: "Home",
    description:
      "Portfolio of John Mark Dela Cruz, a software developer focused on web development and workflow & AI automation. Selected client work, automation case studies, and resume.",
  },
  {
    id: "missions",
    label: "PROJECTS",
    slug: "projects",
    title: "Projects",
    description:
      "Client websites, an ongoing payments platform, and academic builds by John Mark Dela Cruz, each with the role, what was delivered, and the limits.",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    slug: "automation",
    title: "Automation",
    description:
      "Zapier and n8n workflows by John Mark Dela Cruz: two client automations for DoGoodie and portfolio demos, each with what was tested and where the limits are.",
  },
  {
    id: "profile",
    label: "PROFILE",
    slug: "profile",
    title: "Profile",
    description:
      "About John Mark Dela Cruz, a software developer in Cavite, Philippines: how the work gets done, experience, and education.",
  },
  {
    id: "inventory",
    label: "STACKS",
    slug: "stacks",
    title: "Stacks",
    description: "Languages, frameworks, automation platforms, and tools John Mark Dela Cruz works with.",
  },
  {
    id: "crew",
    label: "ROLES",
    slug: "roles",
    title: "Roles",
    description:
      "Roles John Mark Dela Cruz can fill, from full-stack web development to workflow & AI automation, QA, and project coordination.",
  },
  {
    id: "achievements",
    label: "ACHIEVEMENTS",
    slug: "achievements",
    title: "Achievements",
    description: "Milestones of John Mark Dela Cruz, from the first client launch to the BSIT capstone.",
  },
  {
    id: "quit",
    label: "CONTACT",
    slug: "contact",
    title: "Contact",
    description:
      "Contact John Mark Dela Cruz by email, LinkedIn, GitHub, or WhatsApp. Open to full-time roles.",
  },
];

export function sectionPath(id: TabId): string {
  const section = sections.find((s) => s.id === id);
  return section?.slug ? `/${section.slug}` : "/";
}

export const projectPath = (slug: string) => `/projects/${slug}`;
export const automationPath = (id: string) => `/automation/${id}`;

// "/projects/dogoodie" -> { tab: "missions", caseSlug: "dogoodie" }
export function parsePath(pathname: string): { tab: TabId; caseSlug?: string } {
  const [first = "", second] = pathname.split("/").filter(Boolean);
  const section = sections.find((s) => s.slug === first);
  if (!section) return { tab: "new" };
  return { tab: section.id, caseSlug: second ? decodeURIComponent(second) : undefined };
}
