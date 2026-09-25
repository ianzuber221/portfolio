export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  approach: string[];
  impact: string[];
  stack: string[];
};

// Sourced from Ian's Notion "Car/Start Stories" SDC write-up (Hack Reactor
// system-design capstone). Numbers and steps are from that note, not invented.
export const supernovaCaseStudy: CaseStudy = {
  slug: "supernova",
  title: "Supernova Reviews Service",
  eyebrow: "Case study",
  summary:
    "A from-scratch reviews backend for a retail app, taken from multi-second queries to a 1,000 req/s target at under 20ms.",
  problem:
    "Hack Reactor's system-design capstone asked each of us to build one backend service of a commercial retail app from scratch — starting from a couple of CSV files of raw product data, on PostgreSQL, a database I had not used before. The bar was 1,000 requests per second for 30 seconds, under 50ms per request, with under 1% errors. After the first query pass, local responses were 3–15 seconds. That was nowhere near the goal.",
  approach: [
    "Indexed the schema around how the data was actually queried, which dropped local latency from seconds to 5–30ms.",
    "Deployed to AWS EC2 and re-measured: times jumped back to 1–15 seconds.",
    "Used Loader.io to find the bottleneck. Errors were at the server, not the query plan.",
    "Put NGINX in front as a load balancer and added two more EC2 instances, distributing traffic round-robin.",
  ],
  impact: [
    "All responses landed under 20ms — inside the 1,000 req/s / 50ms / <1% error target.",
    "The path was diagnose → index → measure in production → scale the web tier, not guess at caching first.",
  ],
  stack: ["Node.js", "Express", "PostgreSQL", "NGINX", "AWS EC2", "Loader.io"],
};

export const caseStudies: Record<string, CaseStudy> = {
  supernova: supernovaCaseStudy,
};
