import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/src/components/ClientLayout";
import { contactMethods, socials } from "@/src/data/contacts";
import { portfolioData } from "@/src/data/portfolio";
import { ownerName, siteName, siteUrl } from "@/src/data/site";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Closest free match to the GTA V menu font (Chalet)
const hud = Barlow_Semi_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hud",
  display: "swap",
});

const title = "JM.EXE | John Mark Dela Cruz";
const description =
  "Portfolio of John Mark Dela Cruz, a software developer focused on web development and workflow & AI automation. Projects, automation case studies, and resume.";

// Each page sets its own title, description, and canonical URL; these are the fallbacks
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: siteName,
  authors: [{ name: ownerName, url: siteUrl }],
  creator: ownerName,
  openGraph: {
    title,
    description,
    siteName,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "John Mark Dela Cruz, illustrated in GTA V style riding a scooter over a sunset city" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/images/jm/logo.png",
    shortcut: "/images/jm/logo.png",
    apple: "/images/jm/logo.png",
  },
};

// Structured data so search engines and AI answers can tell who this site is about
const profileLinks = [...contactMethods, ...socials]
  .map((c) => c.link)
  .filter((link) => link.startsWith("https://") && !link.includes("wa.me"));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: ownerName,
      alternateName: portfolioData.profile.name,
      jobTitle: "Software Developer",
      description: portfolioData.profile.summary.replace(/\n+/g, " "),
      url: siteUrl,
      image: `${siteUrl}${portfolioData.profile.photo}`,
      email: contactMethods.find((c) => c.label === "Email")?.link,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bacoor",
        addressRegion: "Cavite",
        addressCountry: "PH",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: portfolioData.education.school,
      },
      knowsAbout: [
        "Software development",
        "Web development",
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Workflow automation",
        "AI automation",
        "Zapier",
        "n8n",
        "Software testing",
      ],
      sameAs: profileLinks,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: `${ownerName} Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${hud.variable}`}>
      <body className="font-body antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
