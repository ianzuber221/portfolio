import { describe, expect, it, beforeEach } from "vitest";
import { rateLimit, resetRateLimitForTests, clientIp } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    resetRateLimitForTests();
  });

  it("allows requests under the limit", () => {
    for (let i = 0; i < 12; i++) {
      expect(rateLimit("test", { limit: 12, windowMs: 60_000 }).ok).toBe(true);
    }
  });

  it("blocks the next request and reports retry-after", () => {
    for (let i = 0; i < 3; i++) {
      rateLimit("burst", { limit: 3, windowMs: 60_000 });
    }
    const blocked = rateLimit("burst", { limit: 3, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThanOrEqual(1);
      expect(blocked.retryAfterSec).toBeLessThanOrEqual(60);
    }
  });

  it("tracks keys independently", () => {
    for (let i = 0; i < 3; i++) {
      expect(rateLimit("a", { limit: 3 }).ok).toBe(true);
    }
    expect(rateLimit("a", { limit: 3 }).ok).toBe(false);
    expect(rateLimit("b", { limit: 3 }).ok).toBe(true);
  });
});

describe("clientIp", () => {
  it("uses the first x-forwarded-for hop", () => {
    const request = new Request("http://localhost/api/chat", {
      headers: { "x-forwarded-for": "203.0.113.8, 10.0.0.1" },
    });
    expect(clientIp(request)).toBe("203.0.113.8");
  });

  it("falls back to unknown", () => {
    const request = new Request("http://localhost/api/chat");
    expect(clientIp(request)).toBe("unknown");
  });
});
