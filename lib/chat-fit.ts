export type JobFit = {
  verdict: "strong" | "good" | "stretch";
  matches: string[];
  gaps: string[];
};

const STRENGTHS: Array<{ label: string; pattern: RegExp }> = [
  { label: "Angular", pattern: /\bangular\b/i },
  { label: "TypeScript", pattern: /\btypescript\b/i },
  { label: "React", pattern: /\breact\b/i },
  { label: "Next.js", pattern: /\bnext(?:\.js)?\b/i },
  { label: "MCP", pattern: /\bmcp\b|model context protocol/i },
  { label: "AI agents", pattern: /\bagents?\b|\bagentic\b/i },
  { label: "Node.js", pattern: /\bnode(?:\.js)?\b/i },
  { label: "Nest.js", pattern: /\bnest(?:\.js)?\b/i },
  { label: "PostgreSQL", pattern: /\bpostgres(?:ql)?\b/i },
  { label: "AWS", pattern: /\baws\b|amazon web services/i },
  { label: "frontend", pattern: /\bfront-?end\b/i },
];

const GAPS: Array<{ label: string; pattern: RegExp }> = [
  { label: "Java", pattern: /\bjava\b/i },
  { label: "Kotlin", pattern: /\bkotlin\b/i },
  { label: "Go", pattern: /\bgolang\b|\bgo (developer|engineer|lang)/i },
  { label: "Rust", pattern: /\brust\b/i },
  { label: "Kubernetes", pattern: /\bkubernetes\b|\bk8s\b/i },
  { label: "iOS", pattern: /\bios\b|swiftui|\bswift\b/i },
  { label: "Android", pattern: /\bandroid\b/i },
  { label: "PHP", pattern: /\bphp\b/i },
  { label: "Salesforce", pattern: /\bsalesforce\b/i },
  { label: "Ruby", pattern: /\bruby\b|\brails\b/i },
  { label: "C++", pattern: /\bc\+\+\b/i },
];

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

export function scoreJobFit(jd: string): JobFit {
  const matches = unique(
    STRENGTHS.filter((item) => item.pattern.test(jd)).map((item) => item.label),
  );
  const gaps = unique(
    GAPS.filter((item) => item.pattern.test(jd)).map((item) => item.label),
  );

  let verdict: JobFit["verdict"] = "stretch";
  if (matches.length >= 3 && gaps.length <= 1) verdict = "strong";
  else if (matches.length >= 2) verdict = "good";
  else if (matches.length >= 1 && gaps.length === 0) verdict = "good";

  return { verdict, matches, gaps };
}

export function formatFitMemo(
  fit: JobFit,
  context: { company?: string; calendly: string },
): string {
  const company = context.company?.trim();
  const where = company ? ` at ${company}` : "";
  const matchLine = fit.matches.length
    ? `the JD calls for ${fit.matches.slice(0, 4).join(", ")}. That's Ian's BNY / Bayer work`
    : "Ian is an AI Frontend Engineer (Angular, agents, MCP) with PassLink leadership behind him";
  const verdictLabel =
    fit.verdict === "strong"
      ? "Strong match"
      : fit.verdict === "good"
        ? "Good match"
        : "Stretch, with relevant proof";

  const gap = fit.gaps.length
    ? `Honest gap: the JD also asks for ${fit.gaps.slice(0, 2).join(" and ")}, which is not on his public résumé.`
    : "No obvious public-stack gap jumped out of this JD.";

  return [
    `${verdictLabel}${where}: ${matchLine}.`,
    `Proof: [PassLink](/#work) for production Angular leadership, [Supernova case study](/work/supernova) for a 1,000 req/s systems story, and BNY agents/MCP for applied AI.`,
    gap,
    `Next step: [Book a call](${context.calendly}).`,
  ].join("\n");
}
