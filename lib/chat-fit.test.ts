import { describe, expect, it } from "vitest";
import { formatFitMemo, scoreJobFit } from "@/lib/chat-fit";
import { isSafeChatHref, parseChatInline } from "@/lib/chat-links";

describe("scoreJobFit", () => {
  it("marks Angular + MCP + TypeScript as a strong match", () => {
    const fit = scoreJobFit(
      "AI Frontend Engineer. Angular, TypeScript, MCP servers, and agents.",
    );
    expect(fit.verdict).toBe("strong");
    expect(fit.matches).toEqual(
      expect.arrayContaining(["Angular", "TypeScript", "MCP", "AI agents"]),
    );
    expect(fit.gaps).toEqual([]);
  });

  it("surfaces an honest gap when the JD asks for Kubernetes", () => {
    const fit = scoreJobFit(
      "Frontend engineer with Angular and Kubernetes experience.",
    );
    expect(fit.matches).toContain("Angular");
    expect(fit.gaps).toContain("Kubernetes");
  });
});

describe("formatFitMemo", () => {
  it("writes a memo with clickable proof links", () => {
    const memo = formatFitMemo(
      { verdict: "strong", matches: ["Angular", "MCP"], gaps: ["Kubernetes"] },
      { company: "Vercel", calendly: "https://calendly.com/ianzuber" },
    );
    expect(memo).toMatch(/Strong match at Vercel/);
    expect(memo).toMatch(/\[PassLink\]\(\/#work\)/);
    expect(memo).toMatch(/\[Supernova case study\]\(\/work\/supernova\)/);
    expect(memo).toMatch(/\[Book a call\]\(https:\/\/calendly.com\/ianzuber\)/);
    expect(memo).toMatch(/Kubernetes/);
  });
});

describe("parseChatInline", () => {
  it("keeps portfolio and Calendly links, drops others", () => {
    expect(isSafeChatHref("/work/supernova")).toBe(true);
    expect(isSafeChatHref("https://evil.example/phish")).toBe(false);
    const parts = parseChatInline(
      "See [Supernova](/work/supernova) or [nope](https://evil.example).",
    );
    expect(parts).toEqual([
      { type: "text", value: "See " },
      { type: "link", label: "Supernova", href: "/work/supernova" },
      { type: "text", value: " or " },
      { type: "text", value: "nope" },
      { type: "text", value: "." },
    ]);
  });
});
