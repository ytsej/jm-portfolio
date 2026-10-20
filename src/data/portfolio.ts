export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  status: string;
  // "client" = live or paid work, "academic" = school and personal builds
  category?: "client" | "academic";
  // Short label shown next to the title, e.g. "Capstone"
  highlight?: string;
  shortDescription?: string;
  description: string;
  bullets: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
    figma?: string;
    apk?: string;
  };
  tags: string[];
  images: string[];
}

// Load projects from JSON file (admin-created projects auto-saved here)
let dynamicProjects: Project[] = [];
if (typeof window === "undefined") {
  try {
    const fs = require("fs");
    const path = require("path");
    const projectsPath = path.join(process.cwd(), "src", "data", "projects.json");
    if (fs.existsSync(projectsPath)) {
      const data = fs.readFileSync(projectsPath, "utf-8");
      dynamicProjects = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading projects.json:", error);
  }
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface WorkPrinciple {
  title: string;
  description: string;
}

export interface Role {
  title: string;
  description: string;
  skills: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    location: string;
    availability: string;
    summary: string;
    resumeUrl: string;
    photo: string;
    // GTA V-style portrait; the PHOTO | GTA switch appears once this is set
    photoGta?: string;
  };
  howIWork: WorkPrinciple[];
  experience: Experience[];
  education: {
    school: string;
    degree: string;
    period: string;
  };
  skillGroups: SkillGroup[];
  roles: Role[];
  achievements: Achievement[];
  projects: Project[];
}

const staticProjects: Project[] = [
  {
    id: "digital-tipping-platform",
    title: "iTip — Digital Tipping Platform",
    subtitle: "Web Platform / Payments (Kuwait)",
    role: "Software Developer",
    status: "Ongoing",
    category: "client",
    shortDescription:
      "iTip is a QR-code tipping platform for service staff in Kuwait, with separate Admin, Merchant, and Staff portals. Pilot launch in progress.",
    description:
      "iTip is a digital tipping platform for Kuwait that lets guests tip service staff through QR codes, with separate Admin, Merchant, and Staff portals.\n\nI am improving the existing application: integrating Payzah payments, verifying fee calculations, fixing bugs, and coordinating QA testing for the pilot launch. The platform is not public yet, so the screenshots show its marketing pages only, with no merchant or customer data.",
    bullets: [
      "Payzah payment gateway integration",
      "Fee calculation verification",
      "Bug fixes in the existing application",
      "QA test coordination for the pilot launch",
    ],
    links: {},
    tags: ["TanStack Start", "React", "TypeScript", "Supabase", "Tailwind CSS", "Payzah", "QA Testing"],
    images: [
      "/images/projects/itip/img-001.webp",
      "/images/projects/itip/img-002.webp",
      "/images/projects/itip/img-003.webp",
      "/images/projects/itip/img-004.webp",
    ],
  },
  {
    id: "ethical-capacity-lab-website",
    title: "Ethical Capacity Lab Website",
    subtitle: "Client Website / Next.js",
    role: "Full-Stack Web Developer (DoGoodie contract)",
    status: "Live",
    category: "client",
    shortDescription:
      "One public front door for The Ethical Capacity Lab, DoGoodie, and the Liberation from Suffering Network, routing five audiences to clear, bounded pathways.",
    description:
      "The public website for The Ethical Capacity Lab and the two programs it connects: DoGoodie (practical work) and the Liberation from Suffering Network (relationships). It routes five public audiences to distinct pathways while keeping public learning available without pressure.\n\nBuilt with the Next.js App Router and strict TypeScript: server-rendered pages with small client islands for navigation and forms, a POST-only server route that validates submissions before forwarding them to Formspree, and consent-gated Google Analytics 4. There is no database, CMS, or user accounts by design.",
    bullets: [
      "Next.js App Router with strict TypeScript and server-rendered pages",
      "Five audience pathways, with a guided Start Here flow and a QR code entry point",
      "Server-side form validation at /api/submissions before Formspree delivery",
      "Consent-gated Google Analytics 4 with advertising permissions kept denied",
      "Search setup: metadata, sitemap, robots, and noindex on preview builds",
      "Vitest unit tests, plus Playwright and axe route, form, and accessibility checks",
    ],
    links: {
      live: "https://ethicalcapacitylab.org",
    },
    tags: ["Next.js", "React", "TypeScript", "Formspree", "Google Analytics 4", "Vitest", "Playwright", "axe-core", "Vercel"],
    images: [
      "/images/projects/ethical-capacity-lab/img-001.webp",
      "/images/projects/ethical-capacity-lab/img-002.webp",
      "/images/projects/ethical-capacity-lab/img-003.webp",
      "/images/projects/ethical-capacity-lab/img-004.webp",
    ],
  },
  {
    id: "dogoodie-website",
    title: "DoGoodie Website",
    subtitle: "Client Website / Static Site + Serverless API",
    role: "Full-Stack Web Developer (DoGoodie contract)",
    status: "Live",
    category: "client",
    shortDescription:
      "Launch website for the DoGoodie builder community and The $5 Impact Hack, with a secure challenge-intake API that writes to Google Sheets.",
    description:
      "A multi-page public site for DoGoodie, a builder community using technology to reduce suffering. It covers the community, The $5 Impact Hack, builder profiles, proof of work, policies, and contact routes.\n\nThe front end is dependency-free HTML, one shared CSS design system, and vanilla JavaScript, with the challenge status calculated from dates in Asia/Manila time. Organizations submit challenges through a single Vercel Function that validates input on the server and writes to Google Sheets using short-lived Vercel OIDC credentials, with no stored private key, then sends a Formspree notification.",
    bullets: [
      "Multi-page static site with a shared CSS design system and vanilla JavaScript",
      "Date-driven challenge status and timelines, calculated in Asia/Manila time",
      "Challenge intake API with origin check, field allowlist, size and rate limits, and bot and idempotency controls",
      "Google Sheets writes through Vercel OIDC and Workload Identity Federation, with no stored service-account key",
      "Consent-gated Google Analytics 4 and a strict Content Security Policy",
      "Node test suite, a site validator, and headless-browser QA across pages and viewports",
    ],
    links: {
      live: "https://dogoodiebuilders.com",
    },
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Vercel Functions", "Google Sheets API", "Formspree", "Google Analytics 4"],
    images: [
      "/images/projects/dogoodie/img-001.webp",
      "/images/projects/dogoodie/img-002.webp",
      "/images/projects/dogoodie/img-003.webp",
      "/images/projects/dogoodie/img-004.webp",
    ],
  },
  {
    id: "caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444",
    title: "CARESIM – Caregiving Education Platform",
    subtitle: "BSIT Capstone Project / Web LMS & Android Simulation Game",
    role: "Frontend Developer (Web LMS) / Unity Scene Developer (Mobile Game)",
    status: "Completed",
    category: "academic",
    highlight: "Capstone",
    shortDescription: "Our BSIT capstone project: a caregiving education platform that pairs a web Learning Management System with an Android simulation game for interactive, structured caregiving training.",
    description: "CARESIM is our BSIT capstone project: a two-part caregiving education platform, consisting of a web-based Learning Management System (LMS) and a companion Android simulation game. The system was designed to enhance caregiving education by combining structured online learning with interactive, simulation-based practice.\r\n\r\nThe CARESIM Web LMS serves as the central learning hub, providing caregiving students with access to learning modules, quizzes, and performance tracking. It allows administrators and instructors to manage content, validate user inputs, and monitor student progress through assessments and activities. The LMS complements the mobile game by reinforcing theoretical knowledge alongside practical simulation.\r\n\r\nThe CARESIM Android application focuses on interactive caregiving scenarios built in Unity. The game presents step-by-step caregiving tasks in a guided environment, emphasizing procedural understanding rather than competitive gameplay. Firebase is used to store user authentication data and track basic progress across sessions. Together, the Web LMS and mobile game demonstrate how web and game-based systems can work together to support accessible and interactive healthcare education.",
    bullets: [
      "Web-based learning modules for caregiving topics",
      "Quiz and assessment management with field validations",
      "Student progress and performance tracking",
      "Admin panel for content and user management",
      "Android-based caregiving simulation scenarios",
      "Step-by-step guided caregiving tasks",
      "3D interactive environments built with Unity",
      "Firebase-backed user authentication and progress tracking",
      "Integrated web and mobile learning workflow",
    ],
    links: {
      github: "https://github.com/icczyrellgwenabelita/cms",
      apk: "https://drive.google.com/file/d/1Fyv9TuEB8jiB-bJJgTS5wnvzYW1mIhhE/view",
    },
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Firebase",
      "Firestore",
      "Unity",
      "C#",
      "Firebase Authentication",
      "Firebase Realtime Database",
    ],
    images: [
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-001.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-002.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-003.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-004.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-005.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-006.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-007.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-008.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-009.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-010.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-011.png",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-012.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-013.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-014.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-015.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-016.jpg",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-017.png",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-018.png",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-019.png",
      "/images/projects/caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444/img-020.png",
    ],
  },
  {
    id: "hoa-profiling-system-(multi-tenant-edition)-1770309399098",
    title: "HOA Profiling System (Multi-Tenant Edition)",
    subtitle: "Web App / Management System",
    role: "Full-Stack Developer",
    status: "",
    category: "academic",
    shortDescription: "A secure, multi-tenant web application designed to digitize resident profiling and household management for Homeowners Associations using an efficient 'Invite & Fill' workflow.",
    description: "The HOA Profiling System is a modern, mobile-responsive platform built to replace traditional paper-based resident record-keeping used by Homeowners Associations (HOAs). The system is designed with a multi-tenant architecture, allowing multiple independent HOAs to operate within a shared infrastructure while maintaining strict data isolation and security.\r\n\r\nThe platform follows a streamlined two-step 'Invite & Fill' workflow. HOA officers initiate household registration by completing an initial profiling form, which automatically generates a secure, tokenized link or QR code. Residents then use this link to self-register their household members, reducing manual data entry and administrative workload for officers.\r\n\r\nThe system provides administrators with real-time demographic insights, including priority population groups such as senior citizens, persons with disabilities (PWDs), and registered voters. These analytics support better decision-making, reporting, and community resource planning. The application also includes role-based access control, audit logging, and data export features to ensure transparency, accountability, and long-term data usability.",
    bullets: [
      "Multi-tenant architecture with strict data isolation per HOA",
      "Two-step 'Invite & Fill' household registration workflow",
      "Secure, tokenized links and QR codes for resident self-onboarding",
      "Role-based access control (Owners, Admins, Officers)",
      "Real-time demographic analytics dashboard (Seniors, PWDs, Voters)",
      "Comprehensive audit logs for create, update, and delete actions",
      "Excel export and system data backup tools",
      "Mobile-first interface optimized for field profiling",
    ],
    links: {},
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js",
      "Zod",
      "ExcelJS",
      "XLSX",
      "JWT",
      "bcrypt.js",
    ],
    images: [
      "/images/projects/hoa-profiling-system-(multi-tenant-edition)-1770309399098/img-001.png",
    ],
  },
  {
    id: "cvsu-imus-alumni-management-system-1770305402008",
    title: "CvSU Imus Alumni Management System",
    subtitle: "Web App / Information System",
    role: "Frontend Developer & UI/UX Designer",
    status: "Completed",
    category: "academic",
    shortDescription: "A web-based Alumni Management System for Cavite State University – Imus Campus that centralizes alumni records, supports engagement through jobs and events, and provides administrators with structured data management and reporting tools.",
    description: "The CvSU Imus Alumni Management System is a comprehensive web platform built to support long-term alumni engagement and institutional data management. The system allows alumni to register, manage their profiles, apply for job postings, and stay informed through events and announcements, while administrators manage records, approvals, and reports through a dedicated dashboard.\r\n\r\nI handled the UI/UX design and frontend development, starting with wireframes and layouts in Figma and translating them into responsive, user-friendly interfaces. The focus was on usability, consistency, and accessibility across both alumni and admin modules, while ensuring smooth interaction with backend authentication, approval workflows, and data-driven features.",
    bullets: [
      "Responsive alumni registration and profile management interfaces",
      "User-friendly dashboards for alumni and administrators",
      "Role-based UI behavior and access states",
      "Job postings and application UI flows",
      "Events and announcements display modules",
      "Form validation and user feedback handling",
      "Frontend support for account approval and password reset workflows",
    ],
    links: {
      figma: "https://www.figma.com/design/5bahxSsoagVzrDn366S3IN/ALUMNI-MANAGEMENT-SYSTEM--Copy-?node-id=0-1&t=fdKUrsVe9FWzFyjh-1",
    },
    tags: [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript",
      "jQuery",
      "Figma",
    ],
    images: [
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-024.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-001.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-002.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-003.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-004.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-005.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-006.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-007.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-008.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-009.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-010.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-011.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-012.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-013.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-014.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-015.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-016.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-017.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-018.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-019.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-020.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-021.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-022.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-023.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-025.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-026.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-027.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-028.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-029.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-030.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-031.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-032.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-033.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-034.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-035.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-036.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-037.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-038.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-039.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-040.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-041.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-042.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-043.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-044.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-045.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-046.png",
      "/images/projects/cvsu-imus-alumni-management-system-1770305402008/img-047.png",
    ],
  },
  {
    id: "jmqtie-pet-shop-management-system-1770307977613",
    title: "Jmqtie Pet Shop Management System",
    subtitle: "Desktop Application (Java)",
    role: "Frontend Developer • UI Designer • System Prototyping",
    status: "Completed",
    category: "academic",
    shortDescription: "A second-year Java desktop app for managing a pet shop's products, users, customers, and billing in one place.",
    description: "The Jmqtie Pet Shop Management System is a Java-based application built to streamline daily operations of a small pet shop business. The system provides structured modules for managing pets and products, user accounts, customers, and sales transactions with integrated billing and receipt generation.\r\n\r\nThe application focuses on simplicity and usability, featuring a clean interface with clear navigation and role-based access for administrators. It supports basic inventory tracking, customer billing, and user management while maintaining data consistency through a MySQL database. The system was designed and prototyped with usability in mind, ensuring that common business tasks can be performed efficiently.",
    bullets: [
      "User authentication and admin access",
      "Product and pet inventory management",
      "Category management for pets and items",
      "Customer records management",
      "Billing and sales transaction module",
      "Automatic total computation and receipt printing",
      "User management (add, update, delete users)",
      "Simple and intuitive UI for daily operations",
    ],
    links: {},
    tags: [
      "Java",
      "MySQL",
    ],
    images: [
      "/images/projects/jmqtie-pet-shop-management-system-1770307977613/img-005.jpeg",
      "/images/projects/jmqtie-pet-shop-management-system-1770307977613/img-004.jpeg",
      "/images/projects/jmqtie-pet-shop-management-system-1770307977613/img-001.jpeg",
      "/images/projects/jmqtie-pet-shop-management-system-1770307977613/img-002.jpeg",
      "/images/projects/jmqtie-pet-shop-management-system-1770307977613/img-003.jpeg",
    ],
  },
  {
    id: "tetrad-interactive-group-portfolio-1770308119786",
    title: "Tetrad Interactive Group Portfolio",
    subtitle: "Web App (Portfolio Website)",
    role: "Frontend Developer",
    status: "Completed",
    category: "academic",
    shortDescription: "An interactive group portfolio showcasing advanced frontend animations, smooth scrolling, and immersive visual storytelling.",
    description: "Tetrad Interactive Group Portfolio is a creative web-based portfolio project focused on exploring modern frontend animation techniques and immersive user experiences. The site was built using React and emphasizes fluid motion, visual depth, and interactive UI elements to create an engaging browsing experience.\r\n\r\nThe project integrates multiple animation and interaction libraries, including GSAP and Framer Motion for complex transitions, Locomotive Scroll for smooth scrolling and parallax effects, and Three.js to enhance visual depth. Swiper is used for interactive sliders and carousels, while Styled Components provides modular and flexible styling. The project highlights strong frontend architecture, animation orchestration, and creative UI execution within a collaborative setup.",
    bullets: [
      "React-based multi-page portfolio with client-side routing",
      "Advanced animations using GSAP and Framer Motion",
      "Smooth scrolling and parallax effects with Locomotive Scroll",
      "Interactive sliders and carousels using Swiper",
      "Visually immersive UI composition and transitions",
      "Dynamic team member sections with animated interactions",
    ],
    links: {
      demo: "https://tetrad-portfolio.vercel.app/",
    },
    tags: [
      "React",
      "React Router",
      "Styled Components",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "Locomotive Scroll",
      "Swiper",
      "React Icons",
    ],
    images: [
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-001.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-002.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-003.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-004.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-005.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-006.png",
      "/images/projects/tetrad-interactive-group-portfolio-1770308119786/img-007.png",
    ],
  },
];

// projects.json is the admin staging file. Skip entries already pasted into
// staticProjects (matched by id or title) so they don't show up twice.
const knownIds = new Set(staticProjects.map((p) => p.id));
const knownTitles = new Set(staticProjects.map((p) => p.title.toLowerCase()));
const extraProjects = dynamicProjects
  .filter((p) => !knownIds.has(p.id) && !knownTitles.has(p.title.toLowerCase()))
  .map((p) => ({ ...p, category: p.category ?? "academic" }));

export const portfolioData: PortfolioData = {
  profile: {
    name: "John Mark C. Dela Cruz",
    title: "Software Developer | Workflow & AI Automation",
    location: "Bacoor, Cavite, Philippines",
    availability: "Open to full-time roles",
    summary:
      "Software developer who builds websites and automates business workflows. I've built and launched client websites with Next.js and serverless APIs, and Zapier and n8n workflows that triage email with AI, generate reports, and sync CRM data. I test my work, design it so a failed AI result is flagged to the team instead of failing silently, and use AI coding tools spec-first with every result reviewed.",
    resumeUrl: "/images/jm/cv.pdf",
    photo: "/images/jm/profile.webp",
    photoGta: "/images/jm/gta/profile-gta.webp",
  },
  howIWork: [
    {
      title: "Spec first",
      description:
        "I write down the inputs, outputs, and edge cases before building, then use AI tools like Claude Code, Claude, Codex, and ChatGPT against that spec and review every result.",
    },
    {
      title: "Test the work",
      description:
        "Unit tests, browser QA, and real test runs before I call something done, not just a demo that worked once.",
    },
    {
      title: "Fail loudly, not silently",
      description:
        "Gates before and after risky steps, so an invalid AI result or a failed write is flagged for a person instead of slipping through.",
    },
    {
      title: "Verify the output",
      description:
        "A finished run isn't proof. I check the saved result separately and write down what was and wasn't verified.",
    },
    {
      title: "Keep the team in sync",
      description:
        "Clear timelines, dependencies, and task breakdowns so developers, QA, and analysts know what's next.",
    },
  ],
  experience: [
    {
      company: "iTip (Kuwait)",
      role: "Software Developer",
      period: "Sep 2026 – Present",
      location: "Remote",
      bullets: [
        "Improving iTip, an existing QR-code tipping platform with Admin, Merchant, and Staff portals.",
        "Integrating Payzah payments and verifying fee calculations.",
        "Fixing bugs and coordinating QA testing for the pilot launch.",
      ],
    },
    {
      company: "DoGoodie",
      role: "Web & AI Automation Developer (Contract)",
      period: "Jul 2026 – Sep 2026",
      location: "Remote, U.S.",
      bullets: [
        "Built the Ethical Capacity Lab website with Next.js, now live at ethicalcapacitylab.org.",
        "Built the DoGoodie website and its challenge-intake API, live at dogoodiebuilders.com.",
        "Automated Gmail triage in Zapier: OpenAI classifies each business email and JavaScript validates the result, so prioritized alerts reach the team's Discord.",
        "Created a weekly KPI tracker in Google Sheets and a Zapier workflow that generates the report from a Google Docs template.",
        "Set up search basics (titles, descriptions, social tags, sitemap, robots.txt) and Google Analytics 4.",
      ],
    },
    {
      company: "Inventi Asia",
      role: "Project Management Intern",
      period: "Feb 2026 – May 2026",
      location: "Makati, Philippines (hybrid)",
      bullets: [
        "Supported task coordination between developers, QA, and a business analyst for a property management platform.",
        "Tracked timelines, dependencies, and the work breakdown in ProjectLibre and Google Sheets.",
      ],
    },
    {
      company: "Philippine Statistics Authority (PSA)",
      role: "Statistical Researcher (Contract)",
      period: "Sep – Dec 2024; Sep – Nov 2025",
      location: "Bacoor, Philippines",
      bullets: [
        "Encoded CBMS records from survey forms, about 50 households a day, and conducted household, agriculture, and fisheries surveys.",
        "Validated survey records for completeness and accuracy while protecting respondents' confidentiality.",
      ],
    },
  ],
  education: {
    school: "Cavite State University — Imus Campus",
    degree: "Bachelor of Science in Information Technology",
    period: "2022 – 2026",
  },
  skillGroups: [
    {
      name: "Websites",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "React", "Tailwind CSS", "Bootstrap", "PHP", "MySQL"],
    },
    {
      name: "Back end",
      items: ["Node.js (Express)", "Vercel Functions", "Firebase", "Supabase", "OpenAI API", "Google Sheets API"],
    },
    {
      name: "Automation",
      items: ["Zapier (with JavaScript code steps)", "n8n", "GoHighLevel API", "Webhooks", "Gmail, Discord, Google Docs integrations"],
    },
    {
      name: "Quality assurance",
      items: ["Manual software testing", "Bug tracking", "Data validation", "Vitest", "Playwright"],
    },
    {
      name: "AI-assisted development",
      items: ["Claude Code", "Claude", "Codex", "ChatGPT", "Specs and tests first, output reviewed"],
    },
    {
      name: "Tools",
      items: ["Git and GitHub", "Vercel", "Google Workspace", "Figma", "Canva", "Notion", "Obsidian", "ProjectLibre", "Postman", "Google Analytics 4"],
    },
    {
      name: "Also worked with",
      items: ["Java", "Python", "SQLite", "Unity", "C#", "PC assembly", "OS installation", "Hardware troubleshooting"],
    },
  ],
  roles: [
    {
      title: "Full-Stack Web Developer",
      description: "Client websites and web apps, from UI to server routes, serverless functions, and integrations. Next.js, TypeScript, and plain HTML/CSS/JS when that's the better fit.",
      skills: ["Next.js", "TypeScript", "JavaScript", "Node.js", "Vercel"],
    },
    {
      title: "Workflow & AI Automation",
      description: "Zapier and n8n workflows that move data between Gmail, Sheets, Docs, Discord, and CRMs, with AI steps gated and verified instead of trusted blindly.",
      skills: ["Zapier", "n8n", "OpenAI", "GoHighLevel", "Webhooks"],
    },
    {
      title: "QA & Testing",
      description: "Manual testing, bug tracking, and data validation, plus automated unit and browser checks. Currently coordinating QA for a payments pilot.",
      skills: ["Manual testing", "Bug tracking", "Vitest", "Playwright", "Data validation"],
    },
    {
      title: "Project Coordination",
      description: "Keeping developers, QA, and analysts in sync with timelines, dependencies, and work breakdowns.",
      skills: ["ProjectLibre", "Google Sheets", "Notion", "Task breakdown"],
    },
    {
      title: "Unity Game Dev",
      description: "Built Unity scenes for the CARESIM caregiving simulation game, the mobile half of my capstone project.",
      skills: ["Unity", "C#", "Firebase"],
    },
    {
      title: "Hardware & Systems",
      description: "Hands-on with PC assembly, OS installation, and troubleshooting.",
      skills: ["PC Assembly", "OS Installation", "Troubleshooting"],
    },
  ],
  achievements: [
    {
      id: "first-client-launch",
      title: "First Client Launch",
      description: "Shipped the Ethical Capacity Lab and DoGoodie websites to production for a real client.",
      unlocked: true,
    },
    {
      id: "automation-builder",
      title: "Automation Builder",
      description: "Built 13 workflows across Zapier and n8n, two of them for DoGoodie.",
      unlocked: true,
    },
    {
      id: "capstone-shipped",
      title: "Capstone Shipped",
      description: "Delivered CARESIM, a web LMS and Android simulation game, as a BSIT team capstone.",
      unlocked: true,
    },
    {
      id: "psa-field-research",
      title: "PSA Field Research",
      description: "Field data collection and validation for the Philippine Statistics Authority (Sep–Dec 2024, Sep–Nov 2025).",
      unlocked: true,
    },
    {
      id: "hands-on-builder",
      title: "Hands-on System Builder",
      description: "PC assembly, OS setup, and hardware troubleshooting.",
      unlocked: true,
    },
    {
      id: "payments-pilot",
      title: "Payments Pilot",
      description: "Launch the iTip pilot with Payzah payments. In progress.",
      unlocked: false,
    },
  ],
  projects: [...staticProjects, ...extraProjects],
};
