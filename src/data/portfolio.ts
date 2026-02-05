export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  status: string;
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

export interface Skill {
  name: string;
  percentage: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon?: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    summary: string;
  };
  skills: Skill[];
  techStack: string[];
  achievements: Achievement[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "John Mark C. Dela Cruz",
    title: "IT Student • Frontend / API • Hardware & Systems",
    summary: "Building reliable web interfaces and practical systems — from UI to APIs, databases, and device troubleshooting. Comfortable with real-world setups: OS installs, PC assembly, and hands-on problem solving.",
  },
  skills: [
    { name: "Hardware & OS", percentage: 90 },
    { name: "Frontend (HTML/CSS/JS)", percentage: 88 },
    { name: "Next.js", percentage: 80 },
    { name: "Postman / API Testing", percentage: 78 },
    { name: "Databases (Firebase/MySQL/Supabase/SQLite)", percentage: 75 },
    { name: "Backend APIs", percentage: 72 },
    { name: "Prototyping", percentage: 70 },
    { name: "Unity / C#", percentage: 65 },
  ],
  techStack: [
    "HTML",
    "CSS",
    "JavaScript",
    "Next.js",
    "PHP",
    "Java",
    "Python",
    "Firebase",
    "MySQL",
    "Supabase",
    "SQLite",
    "Postman",
    "GitHub",
    "Unity",
    "C#",
    "PC Assembly",
    "OS Installation",
    "Troubleshooting",
  ],
  achievements: [
    {
      id: "1",
      title: "PSA Field Research",
      description: "Field data collection and validation (Sep–Nov 2025) with focus on accuracy",
      unlocked: true,
    },
    {
      id: "2",
      title: "Data Accuracy Focus",
      description: "Ensured completeness and consistency in data collection processes",
      unlocked: true,
    },
    {
      id: "3",
      title: "Market Analysis",
      description: "Digital trading trend analysis with buy-low/sell-high strategies",
      unlocked: true,
    },
    {
      id: "4",
      title: "Hands-on System Builder",
      description: "PC assembly, OS setup, and comprehensive troubleshooting",
      unlocked: true,
    },
    {
      id: "5",
      title: "Full-Stack Projects",
      description: "Complete web applications from database to frontend",
      unlocked: false,
    },
  ],
  projects: [
    {
      id: "cvsu-imus-alumni-management-system-1770305402008",
      title: "CvSU Imus Alumni Management System",
      subtitle: "Web App / Information System",
      role: "Frontend Developer & UI/UX Designer",
      status: "Completed",
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
      subtitle: "System (Web Application)",
      role: "Frontend Developer • UI Designer • System Prototyping",
      status: "Completed",
      shortDescription: "A desktop-based Pet Shop Management System designed to manage products, users, customers, and billing operations in a single platform.",
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
        "HTML",
        "CSS",
        "Bootstrap",
        "JavaScript",
        "jQuery",
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
    {
      id: "caresim-–-caregiving-education-platform-(web-lms-&-android-simulation-game)-1770309058444",
      title: "CARESIM – Caregiving Education Platform (Web LMS & Android Simulation Game)",
      subtitle: "System / Web App / Mobile App",
      role: "Frontend Developer (Web LMS) / Unity Scene Developer (Mobile Game)",
      status: "Completed",
      shortDescription: "An integrated caregiving education platform combining a web-based Learning Management System and an Android simulation game to support interactive and structured caregiving training.",
      description: "CARESIM is a two-part caregiving education platform developed as an academic capstone project, consisting of a web-based Learning Management System (LMS) and a companion Android simulation game. The system was designed to enhance caregiving education by combining structured online learning with interactive, simulation-based practice.\r\n\r\nThe CARESIM Web LMS serves as the central learning hub, providing caregiving students with access to learning modules, quizzes, and performance tracking. It allows administrators and instructors to manage content, validate user inputs, and monitor student progress through assessments and activities. The LMS complements the mobile game by reinforcing theoretical knowledge alongside practical simulation.\r\n\r\nThe CARESIM Android application focuses on interactive caregiving scenarios built in Unity. The game presents step-by-step caregiving tasks in a guided environment, emphasizing procedural understanding rather than competitive gameplay. Firebase is used to store user authentication data and track basic progress across sessions. Together, the Web LMS and mobile game demonstrate how web and game-based systems can work together to support accessible and interactive healthcare education.",
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
      status: "In Progress",
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
    ...dynamicProjects,
  ],
};
