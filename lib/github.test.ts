import { describe, expect, it } from "vitest";
import { selectGitHubProjects, toProject, type GitHubRepo } from "@/lib/github";
import { projectOverrides } from "@/lib/projects";

function repo(partial: Partial<GitHubRepo> & { name: string }): GitHubRepo {
  return {
    description: "A repo",
    html_url: `https://github.com/ianzuber221/${partial.name}`,
    homepage: null,
    language: "TypeScript",
    topics: [],
    fork: false,
    archived: false,
    stargazers_count: 0,
    pushed_at: "2024-01-01T00:00:00Z",
    ...partial,
  };
}

describe("toProject", () => {
  it("applies a curated override for known repos", () => {
    const project = toProject(
      repo({ name: "arcade", description: "thin github description" }),
    );
    expect(project.name).toBe(projectOverrides.arcade.name);
    expect(project.summary).toBe(projectOverrides.arcade.summary);
    expect(project.impact).toBe(projectOverrides.arcade.impact);
    expect(project.tags).toEqual(projectOverrides.arcade.tags);
  });

  it("prettifies unknown repo names and uses GitHub metadata", () => {
    const project = toProject(
      repo({
        name: "personal-finance-tracker",
        description: "Track spending",
        language: "Python",
        topics: ["finance", "cli"],
        stargazers_count: 3,
        homepage: "https://example.com",
      }),
    );
    expect(project.name).toBe("Personal Finance Tracker");
    expect(project.summary).toBe("Track spending");
    expect(project.impact).toBe("★ 3 on GitHub");
    expect(project.tags).toEqual(["Python", "finance", "cli"]);
    expect(project.demo).toBe("https://example.com");
  });

  it("falls back when description is missing", () => {
    const project = toProject(repo({ name: "mystery", description: null }));
    expect(project.summary).toMatch(/click through/i);
  });
});

describe("selectGitHubProjects", () => {
  it("drops forks, archived repos, and the profile README repo", () => {
    const projects = selectGitHubProjects(
      [
        repo({ name: "ianzuber221", description: "profile readme" }),
        repo({ name: "forked", fork: true }),
        repo({ name: "old", archived: true }),
        repo({ name: "arcade", stargazers_count: 2 }),
      ],
      6,
      "ianzuber221",
    );
    expect(projects.map((p) => p.slug)).toEqual(["arcade"]);
  });

  it("sorts by stars then recency and respects the limit", () => {
    const projects = selectGitHubProjects(
      [
        repo({
          name: "low-star-old",
          stargazers_count: 1,
          pushed_at: "2020-01-01T00:00:00Z",
        }),
        repo({
          name: "high-star",
          stargazers_count: 10,
          pushed_at: "2021-01-01T00:00:00Z",
        }),
        repo({
          name: "low-star-new",
          stargazers_count: 1,
          pushed_at: "2024-06-01T00:00:00Z",
        }),
      ],
      2,
    );
    expect(projects.map((p) => p.slug)).toEqual(["high-star", "low-star-new"]);
  });
});
