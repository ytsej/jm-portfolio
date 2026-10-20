"use client";

import { portfolioData } from "@/src/data/portfolio";
import { contactMethods, socials, type ContactLink } from "@/src/data/contacts";
import { cn } from "@/src/lib/cn";
import { ListHeader, SectionHeading } from "./GtaUi";
import { LabelIcon } from "./TechIcon";

// Work contacts use the site's green; Social Club gets its own GTA-style purple
const themes = {
  contacts: {
    // gta-header lives in the utilities layer, so the override needs !important
    header: "!bg-emerald-400 !text-black",
    row: "hover:bg-emerald-400 hover:text-black focus-visible:ring-emerald-400",
    icon: "text-emerald-400",
  },
  social: {
    header: "!bg-purple-600 !text-white",
    row: "hover:bg-purple-600 hover:text-white focus-visible:ring-purple-400",
    icon: "text-purple-300",
  },
};

export default function Quit() {
  const { profile } = portfolioData;

  const renderRow = (method: ContactLink, theme: (typeof themes)[keyof typeof themes]) => (
    <a
      key={method.label}
      href={method.link}
      target={method.link.startsWith("http") ? "_blank" : undefined}
      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn("gta-row group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset", theme.row)}
    >
      <span className="flex items-center gap-3">
        <span className={cn("flex h-5 w-5 items-center justify-center group-hover:text-inherit", theme.icon)}>
          <LabelIcon label={method.label} className="h-5 w-5" />
        </span>
        {method.label}
      </span>
      <span className="truncate font-body text-sm normal-case tracking-normal text-white/75 group-hover:text-inherit">
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
          <ListHeader count={contactMethods.length} className={themes.contacts.header}>
            Contacts
          </ListHeader>
          {contactMethods.map((method) => renderRow(method, themes.contacts))}

          <ListHeader count={socials.length} className={cn("mt-3", themes.social.header)}>
            Social Club
          </ListHeader>
          {socials.map((method) => renderRow(method, themes.social))}
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
