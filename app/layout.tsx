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

export const metadata: Metadata = {
  title: "JM.EXE | John Mark Dela Cruz, Software Developer",
  description:
    "Portfolio of John Mark Dela Cruz, a software developer focused on web development and workflow & AI automation. Projects, automation case studies, and resume.",
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
