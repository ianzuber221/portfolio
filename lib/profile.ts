export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  about: string[];
  socials: SocialLink[];
  skills: string[];
};

export const profile: Profile = {
  name: "Ian Zuber",
  role: "Full-Stack & AI Engineer",
  tagline:
    "I build fast, thoughtful web experiences — and increasingly, ones that think for themselves.",
  location: "United States",
  about: [
    "I'm a full-stack engineer who loves the intersection of clean product design and applied AI. I care about details: the animation curve, the empty state, the error message a user never wants to see.",
    "This site is a living resume — a place to show not just what I've built, but how I think about building it. It's powered by Next.js, Tailwind, and OpenAI, and personalizes itself to whoever is visiting.",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ianzuber/" },
    { label: "GitHub", href: "https://github.com/ianzuber221" },
    { label: "Email", href: "mailto:ianzuber321@gmail.com" },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "OpenAI",
    "PostgreSQL",
    "Python",
    "AWS",
    "Vercel",
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    period: "2023 — Present",
    summary:
      "Building the core product from zero to one, owning the full stack from database to design system.",
    highlights: [
      "Shipped the MVP in weeks using Next.js App Router and a serverless backend.",
      "Designed an AI feature pipeline on top of OpenAI with graceful fallbacks.",
      "Set up CI/CD and preview deployments so every PR is testable in isolation.",
    ],
  },
  {
    company: "Confidential (NDA)",
    role: "Software Engineer",
    period: "2021 — 2023",
    summary:
      "Delivered customer-facing features for a high-traffic web platform. Details withheld per NDA.",
    highlights: [
      "Improved page performance by reducing client bundle size and adopting server components.",
      "Partnered with design to build an accessible, reusable component library.",
      "Mentored two junior engineers through their first production launches.",
    ],
  },
];
