"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/src/data/portfolio";
import { faqs } from "@/src/data/faq";
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
            <div className="space-y-3 p-5 leading-relaxed text-white/85">
              {profile.summary.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* How I work */}
          <section className="gta-panel">
            <ListHeader>How I work</ListHeader>
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

          {/* Quick answers: same text as the FAQPage structured data */}
          <section className="gta-panel" aria-labelledby="quick-answers">
            <ListHeader count={faqs.length}>
              <span id="quick-answers">Quick answers</span>
            </ListHeader>
            <dl className="divide-y divide-white/10">
              {faqs.map((item) => (
                <div key={item.question} className="px-5 py-4">
                  <dt className="font-hud text-base font-semibold uppercase tracking-wider text-white">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-white/80">{item.answer}</dd>
                </div>
              ))}
            </dl>
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

// Real photo by default. When a GTA portrait exists, a round thumbnail of the
// other version sits in the corner, like the GTA V character switch.
function ProfilePhoto({ name, title, photo, photoGta }: { name: string; title: string; photo: string; photoGta?: string }) {
  const [showGta, setShowGta] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const current = showGta && photoGta ? photoGta : photo;
  const other = showGta ? photo : photoGta;

  return (
    <div className="relative aspect-square overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image
            src={current}
            alt={current === photo ? name : `${name}, GTA V-style portrait`}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover object-top"
            priority={current === photo}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h2 className="font-display text-3xl sm:text-4xl tracking-wider uppercase leading-none">{name}</h2>
        <p className="mt-2 font-hud text-sm font-semibold uppercase tracking-wider text-emerald-400">{title}</p>
      </div>

      {other && (
        <button
          type="button"
          onClick={() => setShowGta((v) => !v)}
          aria-label={showGta ? "Switch to photo" : "Switch to GTA portrait"}
          title={showGta ? "Switch to photo" : "Switch to GTA portrait"}
          className="group absolute right-3 top-3 h-14 w-14 sm:h-16 sm:w-16 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_3px_rgba(0,0,0,0.6),0_6px_18px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-110 group-hover:border-emerald-400">
            <Image src={other} alt="" fill sizes="64px" className="object-cover object-top" />
          </span>
          {/* Swap badge */}
          <span className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-black shadow">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h5M20 20v-5h-5M5.6 15a7 7 0 0011.9 2.2M18.4 9A7 7 0 006.5 6.8" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
