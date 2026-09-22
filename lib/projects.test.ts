import { describe, expect, it } from "vitest";
import {
  mergePortfolioProjects,
  PINNED_PROJECT_SLUGS,
  projects,
  type Project,
} from "@/lib/projects";
import { DEFAULT_SITE_URL, getSiteUrl } from "@/lib/site";

function project(partial: Partial<Project> & { slug: string; name: string }): Project {
  return {
    summary: "A summary that is definitely long enough.",
    impact: "Shipped",
    tags: ["TypeScript"],
    ...partial,
  };
}

describe("mergePortfolioProjects", () => {
  it("pins PassLink, portfolio, and Supernova even when GitHub is noisy", () => {
    const live = [
      project({ slug: "arcade", name: "Arcade", impact: "stars" }),
      project({ slug: "leetcode", name: "LeetCode Journey" }),
      project({ slug: "portfolio", name: "thin github name", repo: "https://github.com/ianzuber221/portfolio" }),
    ];
    const merged = mergePortfolioProjects(live);
    expect(merged.slice(0, 3).map((p) => p.slug)).toEqual([...PINNED_PROJECT_SLUGS]);
    expect(merged[0]?.name).toMatch(/PassLink/);
    expect(merged[1]?.name).toBe("AI-Powered Portfolio");
    expect(merged[1]?.repo).toBe("https://github.com/ianzuber221/portfolio");
    expect(merged.slice(0, 3).every((p) => p.featured)).toBe(true);
  });

  it("fills remaining slots from GitHub without duplicating pinned slugs", () => {
    const live = [
      project({ slug: "arcade", name: "Arcade" }),
      project({ slug: "vroom", name: "vROOm" }),
      project({ slug: "supernova", name: "supernova-github" }),
    ];
    const merged = mergePortfolioProjects(live, projects, PINNED_PROJECT_SLUGS, 5);
    expect(merged.map((p) => p.slug)).toEqual([
      "passlink",
      "portfolio",
      "supernova",
      "arcade",
      "vroom",
    ]);
  });

  it("still shows pinned work when GitHub is unavailable", () => {
    const merged = mergePortfolioProjects(null);
    expect(merged.map((p) => p.slug).slice(0, 3)).toEqual([...PINNED_PROJECT_SLUGS]);
  });
});

describe("site URL", () => {
  it("defaults to the live Vercel production host", () => {
    expect(DEFAULT_SITE_URL).toBe(
      "https://portfolio-ianzuber221s-projects.vercel.app",
    );
    expect(getSiteUrl()).toMatch(/^https:\/\//);
    expect(getSiteUrl().endsWith("/")).toBe(false);
  });
});
