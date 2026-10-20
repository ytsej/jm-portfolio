"use client";

import { portfolioData } from "@/src/data/portfolio";
import { ListHeader, SectionHeading } from "./GtaUi";

export default function Quit() {
  const { profile } = portfolioData;

  const contactMethods = [
    {
      label: "Email",
      value: "jmcruzada.delacruz@gmail.com",
      link: "mailto:jmcruzada.delacruz@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/johnmark-c-delacruz",
      link: "https://www.linkedin.com/in/johnmark-c-delacruz",
    },
    {
      label: "GitHub",
      value: "github.com/jjimuu",
      link: "https://github.com/jjimuu",
    },
    {
      label: "WhatsApp",
      value: "+63 967 412 1386",
      link: "https://wa.me/639674121386",
    },
  ];

  // Personal socials, kept below the work contacts
  const socials = [
    {
      label: "Facebook",
      value: "facebook.com/destinefanboi",
      link: "https://www.facebook.com/destinefanboi",
    },
    {
      label: "Instagram",
      value: "@jm_deecee",
      link: "https://www.instagram.com/jm_deecee/",
    },
    {
      label: "TikTok",
      value: "@_ytsej",
      link: "https://www.tiktok.com/@_ytsej",
    },
  ];

  const renderRow = (method: { label: string; value: string; link: string }, compact?: boolean) => (
    <a
      key={method.label}
      href={method.link}
      target={method.link.startsWith("http") ? "_blank" : undefined}
      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`gta-row group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400${compact ? " py-2 text-sm" : ""}`}
    >
      <span>{method.label}</span>
      <span className="truncate font-body text-sm normal-case tracking-normal text-white/70 group-hover:text-inherit">
        {method.value}
      </span>
    </a>
  );

  return (
    <>
      <SectionHeading
        title="Contact"
        subtitle={`${profile.availability}. Reach out about roles, freelance automation work, or collaborations.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-4 lg:gap-6 items-start">
        <div className="flex flex-col gap-[2px]">
          <ListHeader count={contactMethods.length}>Contacts</ListHeader>
          {contactMethods.map((method) => renderRow(method))}

          <ListHeader count={socials.length} className="mt-3">
            Social Club
          </ListHeader>
          {socials.map((method) => renderRow(method, true))}
        </div>

        <section className="gta-panel">
          <ListHeader>Resume</ListHeader>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-white/80">
              {profile.name} · {profile.title}
              <br />
              {profile.location}
            </p>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="gta-btn gta-btn-primary w-full">
              View resume (PDF)
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
