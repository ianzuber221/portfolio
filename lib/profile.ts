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

export type Certification = {
  title: string;
  issuer: string;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  githubUsername: string;
  calendly: string;
  about: string[];
  stats: Stat[];
  socials: SocialLink[];
  skillGroups: SkillGroup[];
  education: Education[];
  certifications: Certification[];
};

export const profile: Profile = {
  name: "Ian Zuber",
  initials: "IZ",
  role: "AI Frontend Engineer",
  tagline:
    "AI Frontend Engineer at BNY. I build enterprise Angular apps and the agents, skills, workflows, and MCP servers behind them.",
  location: "Pittsburgh, PA",
  availability: "Open to new opportunities",
  githubUsername: "ianzuber221",
  calendly: "https://calendly.com/ianzuber",
  about: [
    "I'm an AI Frontend Engineer at BNY on the Platform Tools team. I build enterprise Angular apps and the agents, reusable skills, multi-step workflows, and MCP servers that connect internal systems to LLMs.",
    "Before BNY I spent about 2.5 years at Bayer in Pittsburgh leading the PassLink Cloud Web App for medical-device software: architecture, internal integrations, and mentoring offshore developers. I studied Music Technology at Duquesne, took web development at CCAC, and finished Hack Reactor's advanced software engineering program.",
  ],
  stats: [
    { label: "Experience", value: "3+ yrs" },
    { label: "Focus", value: "Angular + AI agents" },
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
      label: "Frontend",
      items: ["Angular", "React", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Agentic AI",
      items: ["AI agents", "Skills & workflows", "MCP servers", "Prompt engineering"],
    },
    {
      label: "Backend & Data",
      items: ["Node.js", "Nest.js", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Languages & Cloud",
      items: ["TypeScript", "JavaScript", "Python", "AWS"],
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
  certifications: [
    { title: "Introduction to Large Language Models", issuer: "LinkedIn Learning" },
    { title: "Prompt Engineering for Generative AI", issuer: "LinkedIn Learning" },
    { title: "Generative AI vs. Traditional AI", issuer: "LinkedIn Learning" },
    { title: "Foundations of Responsible AI", issuer: "LinkedIn Learning" },
    { title: "Ethics in the Age of Generative AI", issuer: "LinkedIn Learning" },
    { title: "Introduction to Artificial Intelligence", issuer: "LinkedIn Learning" },
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
    company: "BNY",
    role: "AI Frontend Engineer",
    period: "Present",
    summary:
      "Build enterprise Angular apps on the Platform Tools team, plus the AI agents and MCP servers around them.",
    highlights: [
      "Build Angular front-ends with AI features in the product.",
      "Design AI agents, reusable skills, and multi-step workflows for internal tooling.",
      "Build MCP (Model Context Protocol) servers that connect internal systems and data to LLMs.",
    ],
    stack: ["Angular", "TypeScript", "AI Agents", "MCP", "OpenAI"],
  },
  {
    company: "Bayer (Radiology)",
    role: "Full-Stack Software Engineer",
    period: "~2.5 yrs",
    summary:
      "Led Bayer's PassLink Cloud Web App for medical-device software.",
    highlights: [
      "Drove architecture for a cloud web app that tied together a lot of internal systems.",
      "Mentored offshore developers and coordinated delivery across time zones.",
      "Integrated the app with internal services and data sources.",
    ],
    stack: ["Angular", "Nest.js", "Node.js", "AWS Lambda", "TypeScript", "PostgreSQL"],
  },
];
