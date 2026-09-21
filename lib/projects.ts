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

// Curated project data. When an OpenAI key is configured, the recruiter
// summaries elsewhere on the page are regenerated on demand; project copy
// here stays hand-written for accuracy.
export const projects: Project[] = [
  {
    slug: "ai-portfolio",
    name: "AI-Powered Portfolio",
    summary:
      "This site — a Next.js portfolio that personalizes its pitch to each recruiter using OpenAI, with a curated fallback when no key is set.",
    impact: "Personalizes in real time",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
    repo: "https://github.com/ianzuber221/portfolio",
    featured: true,
  },
  {
    slug: "realtime-collab",
    name: "Realtime Collab Board",
    summary:
      "A multiplayer whiteboard with live cursors, presence, and conflict-free syncing built on CRDTs and websocket fan-out.",
    impact: "Sub-100ms sync",
    tags: ["React", "WebSockets", "CRDT", "Node.js"],
    featured: true,
  },
  {
    slug: "semantic-search",
    name: "Semantic Docs Search",
    summary:
      "Retrieval-augmented search over technical docs that chunks content, embeds it into a vector store, and streams cited answers.",
    impact: "Grounded, cited answers",
    tags: ["Python", "Embeddings", "pgvector", "FastAPI"],
  },
  {
    slug: "devops-dashboard",
    name: "Deploy Health Dashboard",
    summary:
      "A single pane of glass that aggregates CI/CD, error rates, and uptime so on-call engineers can spot and roll back bad deploys fast.",
    impact: "Faster incident response",
    tags: ["Next.js", "AWS", "Observability"],
  },
];
