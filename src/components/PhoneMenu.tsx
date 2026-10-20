"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import messagesData from "@/src/data/phone-messages.json";
import contactsData from "@/src/data/phone-contacts.json";
import callLogsData from "@/src/data/phone-call-logs.json";

type AppScreen = "home" | "messages" | "contacts" | "gallery" | "phone";
type MessageThread = typeof messagesData[0];
type Contact = typeof contactsData[0];
type CallLog = typeof callLogsData[0];

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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCallLog, setSelectedCallLog] = useState<CallLog | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const phoneRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (currentScreen !== "home") {
          setCurrentScreen("home");
          setSelectedMessage(null);
          setSelectedContact(null);
          setSelectedCallLog(null);
          setSelectedGalleryImage(null);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentScreen]);

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

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentScreen("home");
      setSelectedMessage(null);
      setSelectedContact(null);
      setSelectedCallLog(null);
      setSelectedGalleryImage(null);
    }, 300);
  };

  const handleBack = () => {
    if (selectedMessage || selectedContact || selectedCallLog || selectedGalleryImage) {
      setSelectedMessage(null);
      setSelectedContact(null);
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
    <div ref={phoneRef} className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
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
            className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-400/50 shadow-lg flex items-center justify-center"
            aria-label="Open JM.EXE Phone"
          >
            <PhoneIcon className="w-8 h-8 text-white" />
          </motion.button>
        ) : (
          <motion.div
            key="phone-ui"
            initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.85, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-[320px] sm:w-[360px]"
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

              <div className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 rounded-[2rem] overflow-hidden flex flex-col h-[600px]">
                {/* Status Bar */}
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm border-b border-white/10 flex items-center justify-between flex-shrink-0">
                  <div className="text-white text-xs font-semibold">{time}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 border border-white/50 rounded-sm relative">
                      <div className="absolute inset-[2px] bg-emerald-400 rounded-[1px]" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">100%</span>
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
                        contactsCount={contactsData.length}
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
                      <ContactsScreen
                        key="contacts"
                        contacts={contactsData}
                        selectedContact={selectedContact}
                        onSelectContact={setSelectedContact}
                        onBack={handleBack}
                      />
                    )}
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

                {/* Bottom Controls */}
                <div className="px-4 pb-4 flex items-center justify-between gap-3 flex-shrink-0 bg-black/50 border-t border-white/10">
                  <a
                    href="mailto:jmcruzada.delacruz@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-display uppercase tracking-wider text-white">
                      Email
                    </span>
                  </a>
                  <a
                    href="https://wa.me/639674121386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-xl transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-display uppercase tracking-wider text-white">
                      WhatsApp
                    </span>
                  </a>
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
  contactsCount,
  galleryCount,
  callLogsCount,
}: {
  onAppClick: (screen: AppScreen) => void;
  messagesCount: number;
  contactsCount: number;
  galleryCount: number;
  callLogsCount: number;
}) {
  const apps = [
    { id: "messages" as AppScreen, label: "Messages", icon: "💬", badge: messagesCount },
    { id: "contacts" as AppScreen, label: "Contacts", icon: "👤", badge: contactsCount },
    { id: "gallery" as AppScreen, label: "Gallery", icon: "🖼️", badge: galleryCount },
    { id: "phone" as AppScreen, label: "Phone", icon: "📞", badge: callLogsCount },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 h-full"
    >
      <h2 className="font-display text-2xl uppercase tracking-wider text-white mb-6 text-center">
        JM.EXE Phone
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {apps.map((app, i) => (
          <motion.button
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAppClick(app.id)}
            className="relative aspect-square rounded-2xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/50 transition-all flex flex-col items-center justify-center gap-3"
          >
            <span className="text-4xl">{app.icon}</span>
            <span className="text-xs text-white uppercase font-display tracking-wider">
              {app.label}
            </span>
            {app.badge > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                {app.badge}
              </span>
            )}
          </motion.button>
        ))}
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

// Contacts Screen
function ContactsScreen({
  contacts,
  selectedContact,
  onSelectContact,
  onBack,
}: {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  onBack: () => void;
}) {
  if (selectedContact) {
    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="p-4 h-full flex flex-col"
      >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
          <button onClick={onBack} className="text-emerald-400 text-xl">←</button>
          <span className="font-display text-sm uppercase text-white">Contact Details</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{selectedContact.avatar}</div>
            <h3 className="font-display text-xl uppercase text-white mb-1">{selectedContact.name}</h3>
            <p className="text-sm text-emerald-400">{selectedContact.role}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2">About</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{selectedContact.description}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedContact.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-xs text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
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
      className="p-4 h-full"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="font-display text-lg uppercase text-white">Contacts</h3>
        <button onClick={onBack} className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-colors"
          >
            <span className="text-3xl">{contact.avatar}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-white">{contact.name}</p>
              <p className="text-xs text-gray-400">{contact.role}</p>
            </div>
          </button>
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
