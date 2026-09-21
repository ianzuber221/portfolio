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

export type Education = {
  school: string;
  credential: string;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  githubUsername: string;
  about: string[];
  stats: Stat[];
  socials: SocialLink[];
  skillGroups: SkillGroup[];
  education: Education[];
};

export const profile: Profile = {
  name: "Ian Zuber",
  initials: "IZ",
  role: "Full-Stack Software Engineer",
  tagline:
    "Full-stack software engineer who ships polished, AI-powered web apps end to end — from data model to the last pixel.",
  location: "Pittsburgh, PA",
  availability: "Available immediately · open to relocating",
  githubUsername: "ianzuber221",
  about: [
    "I'm a full-stack software engineer with 3 years of professional experience, based in Pittsburgh, PA and open to relocating. I like owning features end to end — from the data model to the last pixel — and I'm especially drawn to applied AI.",
    "Most recently I led development of Bayer's PassLink Cloud Web App: driving architectural decisions, mentoring offshore developers, and integrating with complex internal systems. I got here through a B.S. in Music Technology from Duquesne University, web development coursework at CCAC, and Hack Reactor's advanced software engineering program.",
  ],
  stats: [
    { label: "Experience", value: "3+ yrs" },
    { label: "Focus", value: "Full-stack + AI" },
    { label: "Based in", value: "Pittsburgh, PA" },
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
      items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Angular", "Tailwind CSS"],
    },
    {
      label: "Backend & Data",
      items: ["Node.js", "Nest.js", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Cloud & AI",
      items: ["AWS Lambda", "OpenAI", "Vercel"],
    },
  ],
  education: [
    {
      school: "Hack Reactor",
      credential: "Advanced Software Engineering Certificate",
    },
    {
      school: "Community College of Allegheny County",
      credential: "Web Development",
    },
    {
      school: "Duquesne University",
      credential: "B.S., Music Technology",
    },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Bayer · PassLink Cloud Web App",
    role: "Full-Stack Software Engineer",
    summary:
      "Led development of Bayer's PassLink Cloud Web App, owning architecture and delivery across the stack.",
    highlights: [
      "Drove architectural design decisions for a cloud web application used across complex internal systems.",
      "Mentored offshore developers and coordinated delivery across time zones.",
      "Integrated the app with intricate internal services and data sources.",
    ],
    stack: ["Angular", "Nest.js", "Node.js", "AWS Lambda", "TypeScript", "PostgreSQL"],
  },
];
