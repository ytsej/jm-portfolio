"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import messagesData from "@/src/data/phone-messages.json";
import callLogsData from "@/src/data/phone-call-logs.json";
import { contactMethods, socials, type ContactLink } from "@/src/data/contacts";
import { portfolioData, type Project } from "@/src/data/portfolio";
import { automations, type Automation } from "@/src/data/automations";
import { automationPath, projectPath } from "@/src/data/sections";
import { useFocusTrap } from "@/src/lib/useFocusTrap";

type AppScreen = "home" | "messages" | "contacts" | "jobs" | "workflows" | "internet" | "gallery" | "phone";
type MessageThread = typeof messagesData[0];
type CallLog = typeof callLogsData[0];

const BATTERY_LEVEL = 67;

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function PhoneMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  const [selectedMessage, setSelectedMessage] = useState<MessageThread | null>(null);
  const [selectedCallLog, setSelectedCallLog] = useState<CallLog | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const phoneRef = useRef<HTMLDivElement>(null);
  const [screenEl, setScreenEl] = useState<HTMLDivElement | null>(null);
  // Set when the phone is put away, so the open button takes focus once it's back
  const restoreFocus = useRef(false);

  // Focus stays inside the phone while it's open
  useFocusTrap(screenEl, isOpen);

  useEffect(() => {
    setMounted(true);
    // Load gallery images
    fetch("/api/phone/gallery")
      .then((res) => res.json())
      .then((data) => setGalleryImages(data.images || []))
      .catch(() => setGalleryImages([]));
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Escape puts the phone away; the page behind it stays where it is
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setCurrentScreen("home");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
    restoreFocus.current = true;
    setTimeout(() => {
      setCurrentScreen("home");
      setSelectedMessage(null);
      setSelectedCallLog(null);
      setSelectedGalleryImage(null);
    }, 300);
  }

  const handleBack = () => {
    if (selectedMessage || selectedCallLog || selectedGalleryImage) {
      setSelectedMessage(null);
      setSelectedCallLog(null);
      setSelectedGalleryImage(null);
    } else if (currentScreen !== "home") {
      setCurrentScreen("home");
    } else {
      handleClose();
    }
  };

  if (!mounted) return null;

  return (
    <div ref={phoneRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            ref={(el: HTMLButtonElement | null) => {
              if (el && restoreFocus.current) {
                restoreFocus.current = false;
                el.focus();
              }
            }}
            key="phone-button"
            initial={false}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 20px rgba(52,211,153,0.3)",
                      "0 0 30px rgba(52,211,153,0.5)",
                      "0 0 20px rgba(52,211,153,0.3)",
                    ],
                  }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-400/50 shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Open phone menu"
          >
            <PhoneIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </motion.button>
        ) : (
          <motion.div
            ref={setScreenEl}
            key="phone-ui"
            role="dialog"
            aria-modal="true"
            aria-label="Phone menu"
            tabIndex={-1}
            initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.85, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-[min(360px,calc(100vw-2rem))] focus:outline-none"
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="relative bg-black rounded-[2.5rem] p-4 shadow-2xl border-4 border-gray-800 overflow-hidden">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white mix-blend-screen pointer-events-none z-10"
              />
              
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none z-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                }}
              />

              <div className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 rounded-[2rem] overflow-hidden flex flex-col h-[min(600px,calc(100dvh-5rem))]">
                {/* Status Bar */}
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm border-b border-white/10 flex items-center justify-between flex-shrink-0">
                  <div className="text-white text-xs font-semibold">{time}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 border border-white/50 rounded-sm relative">
                      <div
                        className="absolute left-[1px] top-[1px] bottom-[1px] bg-emerald-400 rounded-[1px]"
                        style={{ width: `calc(${BATTERY_LEVEL}% - 2px)` }}
                      />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">{BATTERY_LEVEL}%</span>
                    <button
                      type="button"
                      onClick={handleClose}
                      aria-label="Close phone"
                      className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {currentScreen === "home" && (
                      <HomeScreen
                        key="home"
                        onAppClick={setCurrentScreen}
                        messagesCount={messagesData.length}
                        jobsCount={portfolioData.projects.length}
                        workflowsCount={automations.length}
                        galleryCount={galleryImages.length}
                        callLogsCount={callLogsData.length}
                      />
                    )}
                    {currentScreen === "messages" && (
                      <MessagesScreen
                        key="messages"
                        messages={messagesData}
                        selectedThread={selectedMessage}
                        onSelectThread={setSelectedMessage}
                        onBack={handleBack}
                      />
                    )}
                    {currentScreen === "contacts" && (
                      <ContactsScreen key="contacts" onBack={handleBack} />
                    )}
                    {currentScreen === "jobs" && (
                      <JobListScreen
                        key="jobs"
                        projects={portfolioData.projects}
                        onOpenProject={(project) => {
                          window.dispatchEvent(
                            new CustomEvent("jm:navigate", { detail: { path: projectPath(project.slug) } })
                          );
                          handleClose();
                        }}
                        onBack={handleBack}
                      />
                    )}
                    {currentScreen === "workflows" && (
                      <WorkflowsScreen
                        key="workflows"
                        items={automations}
                        onOpen={(item) => {
                          window.dispatchEvent(
                            new CustomEvent("jm:navigate", { detail: { path: automationPath(item.id) } })
                          );
                          handleClose();
                        }}
                        onBack={handleBack}
                      />
                    )}
                    {currentScreen === "internet" && <InternetScreen key="internet" onBack={handleBack} />}
                    {currentScreen === "gallery" && (
                      <GalleryScreen
                        key="gallery"
                        images={galleryImages}
                        selectedImage={selectedGalleryImage}
                        onSelectImage={setSelectedGalleryImage}
                        onBack={handleBack}
                      />
                    )}
                    {currentScreen === "phone" && (
                      <PhoneScreen
                        key="phone"
                        callLogs={callLogsData}
                        selectedLog={selectedCallLog}
                        onSelectLog={setSelectedCallLog}
                        onBack={handleBack}
                      />
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Home Screen Component
function HomeScreen({
  onAppClick,
  messagesCount,
  jobsCount,
  workflowsCount,
  galleryCount,
  callLogsCount,
}: {
  onAppClick: (screen: AppScreen) => void;
  messagesCount: number;
  jobsCount: number;
  workflowsCount: number;
  galleryCount: number;
  callLogsCount: number;
}) {
  const apps: { id: string; label: string; icon: string; badge?: number; screen?: AppScreen; href?: string }[] = [
    { id: "messages", label: "Messages", icon: "💬", badge: messagesCount, screen: "messages" },
    { id: "contacts", label: "Contacts", icon: "👤", screen: "contacts" },
    { id: "jobs", label: "Job List", icon: "📋", badge: jobsCount, screen: "jobs" },
    { id: "workflows", label: "Workflows", icon: "⚙️", badge: workflowsCount, screen: "workflows" },
    { id: "internet", label: "Internet", icon: "🌐", screen: "internet" },
    { id: "resume", label: "Resume", icon: "📄", href: portfolioData.profile.resumeUrl },
    { id: "gallery", label: "Gallery", icon: "🖼️", badge: galleryCount, screen: "gallery" },
    { id: "phone", label: "Phone", icon: "📞", badge: callLogsCount, screen: "phone" },
  ];

  const tileClass =
    "relative h-full w-full rounded-2xl p-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/50 transition-all flex flex-col items-center justify-center gap-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 h-full flex flex-col"
    >
      <h2 className="font-display text-2xl uppercase tracking-wider text-white mb-4 text-center">Phone</h2>
      {/* 2 x 4 grid that stretches to fill the screen */}
      <div className="grid flex-1 grid-cols-2 grid-rows-4 gap-3 min-h-0">
        {apps.map((app, i) => {
          const content = (
            <>
              <span className="text-4xl">{app.icon}</span>
              <span className="text-xs text-white uppercase font-display tracking-wider leading-tight text-center">
                {app.label}
              </span>
              {app.badge ? (
                <span className="absolute top-1.5 right-1.5 min-w-5 h-5 px-1 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {app.badge}
                </span>
              ) : null}
            </>
          );
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="min-h-0"
            >
              {app.href ? (
                <a href={app.href} target="_blank" rel="noopener noreferrer" className={tileClass}>
                  {content}
                </a>
              ) : (
                <button type="button" onClick={() => app.screen && onAppClick(app.screen)} className={`w-full ${tileClass}`}>
                  {content}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Messages Screen
function MessagesScreen({
  messages,
  selectedThread,
  onSelectThread,
  onBack,
}: {
  messages: MessageThread[];
  selectedThread: MessageThread | null;
  onSelectThread: (thread: MessageThread) => void;
  onBack: () => void;
}) {
  if (selectedThread) {
    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="p-4 h-full flex flex-col"
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
          <button onClick={onBack} className="text-emerald-400 text-xl">←</button>
          <span className="text-2xl">{selectedThread.avatar}</span>
          <span className="font-display text-sm uppercase text-white">{selectedThread.contact}</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {selectedThread.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.from === "me"
                  ? "bg-emerald-500/30 text-white"
                  : "bg-white/10 text-gray-200"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-[10px] text-gray-400 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="font-display text-lg uppercase text-white">Messages</h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="space-y-2">
        {messages.map((thread) => (
          <button
            key={thread.id}
            onClick={() => onSelectThread(thread)}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-2xl flex-shrink-0">{thread.avatar}</span>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-white truncate">{thread.contact}</p>
              <p className="text-xs text-gray-400 truncate">{thread.messages[thread.messages.length - 1].text}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Shared header for list-style app screens
function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
      <h3 className="font-display text-lg uppercase text-white">{title}</h3>
      <button onClick={onBack} className="text-gray-400 hover:text-white" aria-label="Back">
        ✕
      </button>
    </div>
  );
}

function LinkRow({ item }: { item: ContactLink }) {
  const external = item.link.startsWith("http");
  return (
    <a
      href={item.link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-colors"
    >
      <span className="text-2xl flex-shrink-0">{item.icon}</span>
      <span className="flex-1 min-w-0 text-left">
        <span className="block text-sm font-semibold text-white">{item.label}</span>
        <span className="block text-xs text-gray-400 truncate">{item.value}</span>
      </span>
      <span className="text-emerald-400 text-sm">↗</span>
    </a>
  );
}

// Contacts Screen: real contact info
function ContactsScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <ScreenHeader title="Contacts" onBack={onBack} />
      <div className="space-y-2">
        {contactMethods.map((item) => (
          <LinkRow key={item.label} item={item} />
        ))}
      </div>
      <h4 className="mt-5 mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">Social Club</h4>
      <div className="space-y-2 pb-4">
        {socials.map((item) => (
          <LinkRow key={item.label} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

// Job List Screen: projects, opens the PROJECTS tab
function JobListScreen({
  projects,
  onOpenProject,
  onBack,
}: {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <ScreenHeader title="Job List" onBack={onBack} />
      <div className="space-y-2 pb-4">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onOpenProject(project)}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-white truncate">{project.title}</span>
              {project.status && (
                <span className="flex-shrink-0 text-[10px] uppercase tracking-wider text-emerald-400">{project.status}</span>
              )}
            </span>
            <span className="mt-0.5 block text-xs text-gray-400 truncate">
              {project.highlight ? `${project.highlight} · ` : ""}
              {project.category === "client" ? "Client & work" : "Academic & personal"}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Workflows Screen: automation cards, opens the AUTOMATION tab with the panel
function WorkflowsScreen({
  items,
  onOpen,
  onBack,
}: {
  items: Automation[];
  onOpen: (item: Automation) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <ScreenHeader title="Workflows" onBack={onBack} />
      <div className="space-y-2 pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-white truncate">{item.title}</span>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-wider text-emerald-400">{item.platform}</span>
            </span>
            <span className="mt-0.5 block text-xs text-gray-400 truncate">
              {item.label === "client" ? "Client work · DoGoodie" : "Portfolio demo"}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Internet Screen: bookmarks to live sites and profiles
function InternetScreen({ onBack }: { onBack: () => void }) {
  const liveSites: ContactLink[] = portfolioData.projects
    .filter((p) => p.links.live)
    .map((p) => ({
      label: p.title,
      value: (p.links.live as string).replace(/^https?:\/\//, "").replace(/\/$/, ""),
      link: p.links.live as string,
      icon: "🌐",
    }));
  const profiles = contactMethods.filter((c) => c.label === "GitHub" || c.label === "LinkedIn");

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <ScreenHeader title="Internet" onBack={onBack} />
      <h4 className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">Live sites</h4>
      <div className="space-y-2">
        {liveSites.map((item) => (
          <LinkRow key={item.link} item={item} />
        ))}
      </div>
      <h4 className="mt-5 mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">Profiles</h4>
      <div className="space-y-2 pb-4">
        {profiles.map((item) => (
          <LinkRow key={item.label} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

// Gallery Screen
function GalleryScreen({
  images,
  selectedImage,
  onSelectImage,
  onBack,
}: {
  images: string[];
  selectedImage: string | null;
  onSelectImage: (img: string) => void;
  onBack: () => void;
}) {
  if (selectedImage) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="p-4 h-full flex flex-col bg-black"
      >
        <button onClick={onBack} className="text-white mb-3 text-left">← Back</button>
        <div className="flex-1 relative">
          <Image src={selectedImage} alt="Gallery" fill className="object-contain" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="font-display text-lg uppercase text-white">Gallery</h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white">✕</button>
      </div>
      {images.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
          No images yet
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onSelectImage(img)}
              className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-colors relative"
            >
              <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Phone Screen
function PhoneScreen({
  callLogs,
  selectedLog,
  onSelectLog,
  onBack,
}: {
  callLogs: CallLog[];
  selectedLog: CallLog | null;
  onSelectLog: (log: CallLog) => void;
  onBack: () => void;
}) {
  if (selectedLog) {
    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="p-4 h-full flex flex-col"
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
          <button onClick={onBack} className="text-emerald-400 text-xl">←</button>
          <span className="font-display text-sm uppercase text-white">Call Details</span>
        </div>
        <div className="flex-1">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📞</div>
            <h3 className="font-display text-xl uppercase text-white mb-2">{selectedLog.contact}</h3>
            <p className="text-sm text-emerald-400 mb-1">{selectedLog.status}</p>
            <p className="text-xs text-gray-400">{selectedLog.time}</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-gray-300 leading-relaxed">{selectedLog.description}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="p-4 h-full overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="font-display text-lg uppercase text-white">Recent</h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="space-y-2">
        {callLogs.map((log) => (
          <button
            key={log.id}
            onClick={() => onSelectLog(log)}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-2xl">{log.type === "outgoing" ? "📤" : "📥"}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-white">{log.contact}</p>
              <p className="text-xs text-emerald-400">{log.status}</p>
              <p className="text-xs text-gray-500">{log.time}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
