export type SocialKind = "linkedin" | "github" | "email";

export type SocialLink = {
  label: string;
  href: string;
  kind: SocialKind;
  handle: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Stat = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  about: string[];
  stats: Stat[];
  socials: SocialLink[];
  skillGroups: SkillGroup[];
};

export const profile: Profile = {
  name: "Ian Zuber",
  initials: "IZ",
  role: "Full-Stack & AI Engineer",
  tagline:
    "I design and ship polished web products — increasingly ones with applied AI at their core. I care as much about the empty state as the happy path.",
  location: "United States",
  availability: "Open to new roles",
  about: [
    "I'm a full-stack engineer working at the intersection of clean product design and applied AI. From data model to design system, I like owning a feature end to end and sweating the details that make software feel effortless.",
    "This site is a living résumé, built with Next.js, Tailwind, and OpenAI. It even personalizes itself to the recruiter reading it — try the panel below.",
  ],
  stats: [
    { label: "Years shipping", value: "5+" },
    { label: "Production apps", value: "12+" },
    { label: "Core stack", value: "TS · React · Next" },
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ianzuber/",
      kind: "linkedin",
      handle: "in/ianzuber",
    },
    {
      label: "GitHub",
      href: "https://github.com/ianzuber221",
      kind: "github",
      handle: "@ianzuber221",
    },
    {
      label: "Email",
      href: "mailto:ianzuber321@gmail.com",
      kind: "email",
      handle: "ianzuber321@gmail.com",
    },
  ],
  skillGroups: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      label: "Backend & Data",
      items: ["Node.js", "PostgreSQL", "Prisma", "REST / tRPC"],
    },
    {
      label: "AI & Platform",
      items: ["OpenAI", "Embeddings / RAG", "AWS", "Vercel"],
    },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Stealth Startup",
    role: "Founding Engineer",
    period: "2023 — Present",
    summary:
      "Building the core product from zero to one, owning the full stack from database to design system.",
    highlights: [
      "Shipped the MVP in weeks on Next.js App Router with a serverless backend.",
      "Designed an AI feature pipeline on OpenAI with graceful, cost-aware fallbacks.",
      "Stood up CI/CD and preview deployments so every PR is testable in isolation.",
    ],
    stack: ["Next.js", "TypeScript", "OpenAI", "Postgres"],
  },
  {
    company: "Confidential (NDA)",
    role: "Software Engineer",
    period: "2021 — 2023",
    summary:
      "Delivered customer-facing features for a high-traffic web platform. Details withheld per NDA.",
    highlights: [
      "Cut client bundle size and adopted server components to improve page performance.",
      "Partnered with design to build an accessible, reusable component library.",
      "Mentored two junior engineers through their first production launches.",
    ],
    stack: ["React", "Node.js", "AWS"],
  },
];
