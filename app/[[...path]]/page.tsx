import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PauseMenu from "@/src/components/PauseMenu";
import { automations } from "@/src/data/automations";
import { portfolioData } from "@/src/data/portfolio";
import { automationPath, projectPath, sectionPath, sections } from "@/src/data/sections";
import { faqs } from "@/src/data/faq";
import { ownerName, siteName, siteUrl } from "@/src/data/site";

// Every section and case study is prerendered; anything else is a 404
export const dynamicParams = false;

type Params = { path?: string[] };

export function generateStaticParams(): Params[] {
  return [
    { path: [] },
    ...sections.filter((s) => s.slug).map((s) => ({ path: [s.slug] })),
    ...portfolioData.projects.map((p) => ({ path: ["projects", p.slug] })),
    ...automations.map((a) => ({ path: ["automation", a.id] })),
  ];
}

interface PageInfo {
  path: string;
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>[];
}

const crumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: siteName, path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
  })),
});

function describe(path: string[] = []): PageInfo | null {
  const [first, second, ...rest] = path;
  if (rest.length > 0) return null;

  if (!first) {
    return {
      path: "/",
      title: `${siteName} | ${ownerName}`,
      description: sections[0].description,
    };
  }

  const section = sections.find((s) => s.slug === first);
  if (!section) return null;

  if (!second) {
    return {
      path: sectionPath(section.id),
      title: `${section.title} | ${ownerName}`,
      description: section.description,
      jsonLd: [
        crumbs([{ name: section.title, path: sectionPath(section.id) }]),
        ...(section.id === "profile"
          ? [
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                url: `${siteUrl}${sectionPath("profile")}`,
                mainEntity: { "@id": `${siteUrl}/#person` },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              },
            ]
          : []),
      ],
    };
  }

  if (section.id === "missions") {
    const project = portfolioData.projects.find((p) => p.slug === second);
    if (!project) return null;
    return {
      path: projectPath(project.slug),
      title: `${project.title} | ${ownerName}`,
      description: project.shortDescription ?? project.description.split("\n")[0],
      jsonLd: [
        crumbs([
          { name: "Projects", path: sectionPath("missions") },
          { name: project.title, path: projectPath(project.slug) },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.shortDescription ?? project.description.split("\n")[0],
          url: `${siteUrl}${projectPath(project.slug)}`,
          author: { "@id": `${siteUrl}/#person` },
          keywords: project.tags.join(", "),
          ...(project.links.live ? { sameAs: [project.links.live] } : {}),
        },
      ],
    };
  }

  if (section.id === "automation") {
    const item = automations.find((a) => a.id === second);
    if (!item) return null;
    return {
      path: automationPath(item.id),
      title: `${item.title} | ${ownerName}`,
      description: `${item.tagline} ${item.label === "client" ? "Client work for DoGoodie." : "Portfolio demo on fictional data."}`,
      jsonLd: [
        crumbs([
          { name: "Automation", path: sectionPath("automation") },
          { name: item.title, path: automationPath(item.id) },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: item.title,
          description: `${item.tagline} ${item.summary}`,
          url: `${siteUrl}${automationPath(item.id)}`,
          author: { "@id": `${siteUrl}/#person` },
          keywords: [item.platform, ...item.tools].join(", "),
        },
      ],
    };
  }

  return null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = describe((await params).path);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName,
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "John Mark Dela Cruz, illustrated in GTA V style riding a scooter over a sunset city" }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og.jpg"],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const page = describe((await params).path);
  if (!page) notFound();

  return (
    <>
      {page.jsonLd?.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <PauseMenu />
    </>
  );
}
