"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { cn } from "@/src/lib/cn";
import { portfolioData } from "@/src/data/portfolio";
import { ListHeader, SectionHeading } from "./GtaUi";
import type { TabId } from "./TopTabs";

export default function Profile({ onTabChange }: { onTabChange: (tab: TabId) => void }) {
  const { profile, howIWork, experience, education } = portfolioData;

  return (
    <>
      <SectionHeading title="Profile" subtitle="Who I am, how I work, and where I've worked." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
        {/* Character card */}
        <div className="gta-panel lg:sticky lg:top-4">
          <ProfilePhoto name={profile.name} title={profile.title} photo={profile.photo} photoGta={profile.photoGta} />
          <dl className="divide-y divide-white/10 font-hud text-sm uppercase tracking-wider">
            <div className="flex justify-between gap-4 px-5 py-2.5">
              <dt className="text-white/50">Base</dt>
              <dd className="text-right text-white/90">{profile.location}</dd>
            </div>
            <div className="flex justify-between gap-4 px-5 py-2.5">
              <dt className="text-white/50">Status</dt>
              <dd className="text-right text-emerald-400">{profile.availability}</dd>
            </div>
            <div className="flex justify-between gap-4 px-5 py-2.5">
              <dt className="text-white/50">Education</dt>
              <dd className="text-right text-white/90">BSIT, {education.period}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 p-5 pt-3">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="gta-btn gta-btn-primary flex-1">
              View resume
            </a>
            <button type="button" onClick={() => onTabChange("quit")} className="gta-btn flex-1">
              Contact
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Bio */}
          <section className="gta-panel">
            <ListHeader>About</ListHeader>
            <p className="p-5 leading-relaxed text-white/85">{profile.summary}</p>
          </section>

          {/* How I work */}
          <section className="gta-panel">
            <ListHeader>How I work</ListHeader>
            <a
              href="/images/jm/how-i-work.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#0b1220] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
            >
              <Image
                src="/images/jm/how-i-work.webp"
                alt="How I Work: spec first, test the work, fail loudly, verify the output, and keep the team in sync."
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="h-auto w-full"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 font-hud text-xs uppercase tracking-wider text-white opacity-80 group-hover:opacity-100">
                Open full size ↗
              </span>
            </a>
            <details className="group/details border-t border-white/10">
              <summary className="cursor-pointer list-none px-5 py-3 font-hud text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white">
                Read as text
              </summary>
              <ol className="divide-y divide-white/10">
                {howIWork.map((item, i) => (
                  <li key={item.title} className="flex gap-4 px-5 py-4">
                    <span className="font-display text-3xl leading-none text-emerald-400">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-hud text-base font-semibold uppercase tracking-wider text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          </section>

          {/* Experience */}
          <section className="gta-panel">
            <ListHeader count={experience.length}>Experience</ListHeader>
            <div className="divide-y divide-white/10">
              {experience.map((job) => (
                <article key={job.company + job.role} className="px-5 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-hud text-lg font-semibold uppercase tracking-wide text-white">{job.company}</h3>
                    <span className="font-hud text-xs uppercase tracking-wider text-white/50">{job.period}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                    <span className="text-emerald-400">{job.role}</span>
                    <span className="text-white/50">{job.location}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-white/80">
                        <span className="text-emerald-400">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="gta-panel">
            <ListHeader>Education</ListHeader>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-5 py-4">
              <div>
                <h3 className="font-hud text-lg font-semibold uppercase tracking-wide text-white">{education.school}</h3>
                <p className="text-sm text-white/75">{education.degree}</p>
              </div>
              <span className="font-hud text-xs uppercase tracking-wider text-white/50">{education.period}</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Real photo by default; when a GTA portrait exists, a PHOTO | GTA switch
// toggles it, and hovering with a mouse previews it.
function ProfilePhoto({ name, title, photo, photoGta }: { name: string; title: string; photo: string; photoGta?: string }) {
  const [style, setStyle] = useState<"photo" | "gta">("photo");
  const [hovering, setHovering] = useState(false);
  const showGta = Boolean(photoGta) && (style === "gta" || hovering);

  const onPointerEnter = (e: PointerEvent) => {
    if (photoGta && e.pointerType === "mouse") setHovering(true);
  };

  return (
    <div
      className="relative aspect-square overflow-hidden bg-black"
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => setHovering(false)}
    >
      <Image
        src={photo}
        alt={name}
        fill
        sizes="(min-width: 1024px) 400px, 100vw"
        className={cn("object-cover object-top transition-opacity duration-300", showGta ? "opacity-0" : "opacity-100")}
        priority
      />
      {photoGta && (
        <Image
          src={photoGta}
          alt={`${name}, GTA V-style portrait`}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className={cn("object-cover object-top transition-opacity duration-300", showGta ? "opacity-100" : "opacity-0")}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wider uppercase leading-none">{name}</h2>
        <p className="mt-2 font-hud text-sm font-semibold uppercase tracking-wider text-emerald-400">{title}</p>
      </div>

      {photoGta && (
        <div
          role="group"
          aria-label="Portrait style"
          className="absolute left-3 top-3 inline-flex bg-black/75 p-0.5 font-hud text-xs font-semibold uppercase tracking-wider"
        >
          {(["photo", "gta"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={style === option}
              onClick={() => {
                setStyle(option);
                setHovering(false);
              }}
              className={cn(
                "px-3 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                style === option ? "bg-white text-black" : "text-white/70 hover:text-white"
              )}
            >
              {option === "photo" ? "Photo" : "GTA"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
