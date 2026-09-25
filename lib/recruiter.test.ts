import { describe, expect, it } from "vitest";
import { matchesFocus } from "@/lib/recruiter";

describe("matchesFocus", () => {
  it("highlights skills that share a meaningful token with the recruiter focus", () => {
    expect(matchesFocus("AI agents", "AI infrastructure")).toBe(true);
    expect(matchesFocus("MCP servers", "MCP")).toBe(true);
    expect(matchesFocus("Angular", "enterprise Angular platforms")).toBe(true);
  });

  it("does not highlight unrelated skills or empty focus", () => {
    expect(matchesFocus("PostgreSQL", "AI infrastructure")).toBe(false);
    expect(matchesFocus("Tailwind CSS", "AI infrastructure")).toBe(false);
    expect(matchesFocus("Angular", "")).toBe(false);
    expect(matchesFocus("React", "a")).toBe(false);
  });
});
