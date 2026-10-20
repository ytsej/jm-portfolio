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
      label: "Facebook",
      value: "facebook.com/destinefanboi",
      link: "https://www.facebook.com/destinefanboi",
    },
    {
      label: "Mobile",
      value: "09498422084",
      link: "tel:+639498422084",
    },
  ];

  return (
    <>
      <SectionHeading
        title="Contact"
        subtitle={`${profile.availability}. Reach out about roles, freelance automation work, or collaborations.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-4 lg:gap-6 items-start">
        <div className="flex flex-col gap-[2px]">
          <ListHeader count={contactMethods.length}>Contacts</ListHeader>
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.link}
              target={method.link.startsWith("http") ? "_blank" : undefined}
              rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="gta-row group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
            >
              <span>{method.label}</span>
              <span className="truncate font-body text-sm normal-case tracking-normal text-white/70 group-hover:text-inherit">
                {method.value}
              </span>
            </a>
          ))}
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
