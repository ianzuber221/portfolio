export type Project = {
  slug: string;
  name: string;
  description: string;
  summary: string;
  tags: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

// Curated project data. When an OpenAI key is configured, the summaries are
// regenerated on demand and tailored to the visiting recruiter's focus area.
export const projects: Project[] = [
  {
    slug: "ai-portfolio",
    name: "AI-Powered Portfolio",
    description:
      "This very site — a Next.js 14 portfolio that personalizes its content and theming with OpenAI.",
    summary:
      "A self-aware developer portfolio built with the App Router, Tailwind, and TypeScript. Recruiters can tune the experience to their focus area and the site adapts its summaries in real time.",
    tags: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
    repo: "https://github.com/ianzuber221/portfolio",
    featured: true,
  },
  {
    slug: "realtime-collab",
    name: "Realtime Collab Board",
    description:
      "A multiplayer whiteboard with live cursors, presence, and conflict-free syncing.",
    summary:
      "Explores CRDTs and websocket fan-out to keep dozens of collaborators in sync with sub-100ms updates and offline recovery.",
    tags: ["React", "WebSockets", "CRDT", "Node.js"],
    featured: true,
  },
  {
    slug: "semantic-search",
    name: "Semantic Docs Search",
    description:
      "Embeddings-based search over technical docs with cited, streaming answers.",
    summary:
      "A retrieval-augmented search engine that chunks documentation, embeds it into a vector store, and streams grounded answers with source citations.",
    tags: ["Python", "Embeddings", "pgvector", "FastAPI"],
  },
  {
    slug: "devops-dashboard",
    name: "Deploy Health Dashboard",
    description:
      "A single pane of glass for deploy status, error rates, and rollback controls.",
    summary:
      "Aggregates CI/CD, error tracking, and uptime signals into one dashboard so on-call engineers can spot and roll back bad deploys quickly.",
    tags: ["Next.js", "AWS", "Observability"],
  },
];
