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
    "AI Frontend Engineer at BNY building enterprise Angular web apps — and the agents, skills, workflows, and MCP servers that power them.",
  location: "Pittsburgh, PA",
  availability: "Open to new opportunities",
  githubUsername: "ianzuber221",
  calendly: "https://calendly.com/ianzuber",
  about: [
    "I'm an AI Frontend Engineer at BNY, building enterprise Angular web applications on the Platform Tools team and weaving AI into the experience — designing agents, reusable skills, multi-step workflows, and MCP servers that connect internal systems and data to LLMs.",
    "Before BNY I spent ~2.5 years at Bayer in Pittsburgh, where I led development of the PassLink Cloud Web App for medical-device software — driving architecture, integrating complex internal systems, and mentoring offshore developers. I studied Music Technology at Duquesne University, took web development coursework at CCAC, and completed Hack Reactor's advanced software engineering program.",
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
      "Build enterprise Angular web applications on the Platform Tools team and weave AI into the experience.",
    highlights: [
      "Develop enterprise-scale Angular front-end experiences integrated with AI capabilities.",
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
      "Led development of Bayer's PassLink Cloud Web App, pioneering medical-device software solutions.",
    highlights: [
      "Drove architectural design for a cloud web app spanning complex internal systems.",
      "Mentored offshore developers and coordinated delivery across time zones.",
      "Integrated the app with intricate internal services and data sources.",
    ],
    stack: ["Angular", "Nest.js", "Node.js", "AWS Lambda", "TypeScript", "PostgreSQL"],
  },
];
