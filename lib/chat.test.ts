import { describe, expect, it } from "vitest";
import { buildChatKnowledge, buildSystemPrompt, fallbackReply } from "@/lib/chat";

describe("buildChatKnowledge", () => {
  it("includes the facts recruiters actually ask about", () => {
    const brief = buildChatKnowledge();
    expect(brief).toMatch(/BNY/);
    expect(brief).toMatch(/PassLink/);
    expect(brief).toMatch(/1,000/);
    expect(brief).toMatch(/MCP/);
    expect(brief).toMatch(/calendly.com\/ianzuber/);
    expect(brief).toMatch(/do not invent/i);
  });
});

describe("buildSystemPrompt", () => {
  it("names the recruiter company and focus when provided", () => {
    const prompt = buildSystemPrompt({
      company: "Vercel",
      focus: "AI infrastructure",
    });
    expect(prompt).toMatch(/Vercel/);
    expect(prompt).toMatch(/AI infrastructure/);
    expect(prompt).toMatch(/PassLink/);
    expect(prompt).toMatch(/Supernova/);
  });

  it("includes a pasted job description in the brief", () => {
    const prompt = buildSystemPrompt({
      company: "Vercel",
      jd: "Hiring an Angular engineer to build MCP servers.",
    });
    expect(prompt).toMatch(/Pasted job description/);
    expect(prompt).toMatch(/Angular engineer to build MCP/);
    expect(prompt).toMatch(/fit memo/);
  });
});

describe("fallbackReply", () => {
  it("answers AI questions with BNY agent/MCP work", () => {
    const reply = fallbackReply([
      { role: "user", content: "What's his experience with AI?" },
    ]);
    expect(reply).toMatch(/BNY/);
    expect(reply).toMatch(/MCP/);
  });

  it("does not treat 'where did he work' as a location-only question", () => {
    const location = fallbackReply([
      { role: "user", content: "Where is he based?" },
    ]);
    expect(location).toMatch(/Pittsburgh/);

    const work = fallbackReply([
      { role: "user", content: "Where did he work?" },
    ]);
    expect(work).toMatch(/BNY/);
    expect(work).toMatch(/Bayer/);
    expect(work).not.toMatch(/open to conversations about location/);
  });

  it("gives the Supernova and PassLink stories instead of a generic blurb", () => {
    const supernova = fallbackReply([
      { role: "user", content: "Tell me about the Supernova reviews service" },
    ]);
    expect(supernova).toMatch(/1,000/);
    expect(supernova).toMatch(/20ms/);
    expect(supernova).toMatch(/\/work\/supernova/);

    const passlink = fallbackReply([
      { role: "user", content: "Tell me about the Bayer PassLink project." },
    ]);
    expect(passlink).toMatch(/PassLink/);
    expect(passlink).toMatch(/Bayer/);
    expect(passlink).toMatch(/Angular/);
  });

  it("uses recruiter context on a hire question", () => {
    const reply = fallbackReply(
      [{ role: "user", content: "Why should we hire Ian?" }],
      { company: "Vercel", focus: "AI infrastructure" },
    );
    expect(reply).toMatch(/Vercel/);
    expect(reply).toMatch(/AI infrastructure/);
  });

  it("turns a pasted JD into a fit memo with proof links", () => {
    const reply = fallbackReply(
      [{ role: "user", content: "How does Ian fit this role?" }],
      {
        company: "Vercel",
        jd: "We need an Angular and TypeScript engineer who can build MCP servers. Kubernetes is a plus.",
      },
    );
    expect(reply).toMatch(/match at Vercel/i);
    expect(reply).toMatch(/Angular/);
    expect(reply).toMatch(/MCP/);
    expect(reply).toMatch(/Kubernetes/);
    expect(reply).toMatch(/\[Supernova case study\]\(\/work\/supernova\)/);
  });
});
