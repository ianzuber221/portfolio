import type { Project } from "@/lib/projects";
import { profile } from "@/lib/profile";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  pushed_at: string;
};

function prettify(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function toProject(repo: GitHubRepo): Project {
  const tags = [repo.language, ...(repo.topics || [])]
    .filter((t): t is string => Boolean(t))
    .slice(0, 4);
  return {
    slug: repo.name,
    name: prettify(repo.name),
    summary: repo.description?.trim() || "A project from my GitHub — click through for details.",
    impact:
      repo.stargazers_count > 0
        ? `★ ${repo.stargazers_count} on GitHub`
        : repo.language || "Open source",
    tags,
    repo: repo.html_url,
    demo: repo.homepage ? repo.homepage : undefined,
  };
}

/**
 * Fetch the owner's most notable public repositories and map them to the
 * portfolio's Project shape. Returns null on any failure (rate limit, network,
 * bad payload) so callers can fall back to a curated list.
 */
export async function fetchGitHubProjects(
  limit = 6,
): Promise<Project[] | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;

    const repos: unknown = await res.json();
    if (!Array.isArray(repos)) return null;

    const projects = (repos as GitHubRepo[])
      .filter((r) => r && !r.fork && !r.archived)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .slice(0, limit)
      .map(toProject);

    return projects.length ? projects : null;
  } catch {
    return null;
  }
}
