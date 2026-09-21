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

// Curated fallback used when the live GitHub API is unavailable (rate limits,
// network, etc.). Kept intentionally short and accurate.
export const projects: Project[] = [
  {
    slug: "ai-portfolio",
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
      "Led development of a cloud web app integrating complex internal systems — architecture, delivery, and mentoring offshore developers.",
    impact: "Led architecture & delivery",
    tags: ["Angular", "Nest.js", "AWS Lambda", "TypeScript"],
  },
];
