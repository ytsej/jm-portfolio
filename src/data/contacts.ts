// Single source for contact links, used by the CONTACT tab and the phone
export interface ContactLink {
  label: string;
  value: string;
  link: string;
  icon: string;
}

export const contactMethods: ContactLink[] = [
  {
    label: "Email",
    value: "jmcruzada.delacruz@gmail.com",
    link: "mailto:jmcruzada.delacruz@gmail.com",
    icon: "✉️",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/johnmark-c-delacruz",
    link: "https://www.linkedin.com/in/johnmark-c-delacruz",
    icon: "💼",
  },
  {
    label: "GitHub",
    value: "github.com/jjimuu",
    link: "https://github.com/jjimuu",
    icon: "💻",
  },
  {
    label: "WhatsApp",
    value: "+63 967 412 1386",
    link: "https://wa.me/639674121386",
    icon: "💬",
  },
];

// Personal socials, kept below the work contacts
export const socials: ContactLink[] = [
  {
    label: "Facebook",
    value: "facebook.com/destinefanboi",
    link: "https://www.facebook.com/destinefanboi",
    icon: "📘",
  },
  {
    label: "Instagram",
    value: "@jm_deecee",
    link: "https://www.instagram.com/jm_deecee/",
    icon: "📸",
  },
  {
    label: "TikTok",
    value: "@_ytsej",
    link: "https://www.tiktok.com/@_ytsej",
    icon: "🎵",
  },
];

export const emailContact = contactMethods[0];
export const whatsappContact = contactMethods[3];
