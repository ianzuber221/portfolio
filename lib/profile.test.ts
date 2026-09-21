import { describe, expect, it } from "vitest";
import { experience, profile } from "@/lib/profile";
import { projects, projectOverrides } from "@/lib/projects";

describe("profile invariants", () => {
  it("describes the current BNY AI Frontend role", () => {
    expect(profile.name).toBe("Ian Zuber");
    expect(profile.role).toMatch(/AI Frontend Engineer/i);
    expect(profile.location).toMatch(/Pittsburgh/i);
    expect(profile.githubUsername).toBe("ianzuber221");
    expect(profile.calendly).toBe("https://calendly.com/ianzuber");
    expect(experience[0]?.company).toBe("BNY");
    expect(experience.some((e) => /Bayer/i.test(e.company))).toBe(true);
  });

  it("has contact links and education/certifications", () => {
    const kinds = profile.socials.map((s) => s.kind).sort();
    expect(kinds).toEqual(["email", "github", "linkedin"]);
    expect(profile.education.length).toBeGreaterThanOrEqual(3);
    expect(profile.certifications.length).toBeGreaterThanOrEqual(6);
  });

  it("lists agentic-AI skills used in the BNY role", () => {
    const skills = profile.skillGroups.flatMap((g) => g.items).join(" ");
    expect(skills).toMatch(/Angular/i);
    expect(skills).toMatch(/MCP/i);
    expect(skills).toMatch(/agent/i);
  });
});

describe("curated projects", () => {
  it("has unique slugs and required copy", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(2);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it("keeps override keys lowercase and populated", () => {
    for (const [key, override] of Object.entries(projectOverrides)) {
      expect(key).toBe(key.toLowerCase());
      expect(override.name || override.summary).toBeTruthy();
    }
  });
});
