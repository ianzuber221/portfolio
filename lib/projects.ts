export type Project = {
  slug: string;
  name: string;
  summary: string;
  impact: string;
  tags: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

// Hand-written details (sourced from Ian's real project write-ups) keyed by the
// lowercased GitHub repo name. When the live GitHub API returns a matching repo
// with a thin/empty description, these override it so cards read well.
export const projectOverrides: Record<
  string,
  Partial<Pick<Project, "name" | "summary" | "impact" | "tags">>
> = {
  portfolio: {
    name: "AI-Powered Portfolio",
    summary:
      "This site — a Next.js portfolio with an OpenAI assistant that answers recruiter questions, plus projects pulled live from GitHub.",
    impact: "Interactive AI assistant",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
  },
  arcade: {
    name: "Arcade",
    summary:
      "A browser arcade hosting a Chrome-style dinosaur game with authentication and per-user high scores — built solo in a 48-hour constraint.",
    impact: "Built in 48 hours",
    tags: ["React", "Express", "Firebase", "JavaScript"],
  },
  leetcode: {
    name: "LeetCode Journey",
    summary:
      "A running log of my progress conquering data structures and algorithms across LeetCode problems.",
    impact: "DS & algorithms practice",
    tags: ["Algorithms", "TypeScript"],
  },
  vroom: {
    name: "vROOm",
    summary:
      "A mobile-first rideshare app for planning road trips, joining others' trips, and splitting costs to cut congestion, emissions, and price.",
    impact: "Mobile-first rideshare",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  supernova: {
    name: "Supernova Reviews Service",
    summary:
      "Backend for a reviews service scaled to 1,500 req/s at sub-50ms on load-balanced AWS EC2 instances behind NGINX.",
    impact: "1,500 req/s at <50ms",
    tags: ["Node.js", "Express", "PostgreSQL", "AWS"],
  },
};

// Curated fallback used when the live GitHub API is unavailable (rate limits,
// network, etc.). These are real projects with accurate write-ups.
export const projects: Project[] = [
  {
    slug: "portfolio",
    name: "AI-Powered Portfolio",
    summary:
      "This site — a Next.js portfolio with an OpenAI assistant that answers recruiter questions, plus projects pulled live from GitHub.",
    impact: "Interactive AI assistant",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
    repo: "https://github.com/ianzuber221/portfolio",
    featured: true,
  },
  {
    slug: "passlink",
    name: "Bayer PassLink Cloud Web App",
    summary:
      "Led development of a cloud web app for medical-device software — architecture, delivery, and mentoring offshore developers across complex internal systems.",
    impact: "Led architecture & delivery",
    tags: ["Angular", "Nest.js", "AWS Lambda", "TypeScript"],
  },
  {
    slug: "supernova",
    name: "Supernova Reviews Service",
    summary:
      "Backend for a reviews service scaled to 1,500 req/s at sub-50ms on load-balanced AWS EC2 instances behind NGINX.",
    impact: "1,500 req/s at <50ms",
    tags: ["Node.js", "Express", "PostgreSQL", "AWS"],
  },
  {
    slug: "arcade",
    name: "Arcade",
    summary:
      "A browser arcade hosting a Chrome-style dinosaur game with authentication and per-user high scores — built solo in a 48-hour constraint.",
    impact: "Built in 48 hours",
    tags: ["React", "Express", "Firebase"],
  },
];
