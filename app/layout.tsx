import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/src/components/ClientLayout";

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

// Browser tab shows the brand only; link previews keep the full name
const title = "JM.EXE | John Mark Dela Cruz, Software Developer";
const description =
  "Portfolio of John Mark Dela Cruz, a software developer focused on web development and workflow & AI automation. Projects, automation case studies, and resume.";

export const metadata: Metadata = {
  // Absolute base for the link-preview image; Vercel provides the production domain at build time
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://jm-exe.vercel.app"
  ),
  title: "JM.EXE",
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "John Mark Dela Cruz, illustrated in GTA V style with his scooter over a sunset city" }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${hud.variable}`}>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
