export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

type Options = {
  limit?: number;
  windowMs?: number;
};

const buckets = new Map<string, number[]>();

/**
 * Best-effort sliding-window limiter. On Vercel this is per-isolate, so it
 * will not be a global quota — it still stops a naive loop against one
 * instance, which is the usual bot pattern.
 */
export function rateLimit(
  key: string,
  { limit = 12, windowMs = 60_000 }: Options = {},
): RateLimitResult {
  const now = Date.now();
  const stamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (stamps.length >= limit) {
    const oldest = stamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, stamps);
    return { ok: false, retryAfterSec };
  }
  stamps.push(now);
  buckets.set(key, stamps);
  return { ok: true };
}

export function resetRateLimitForTests() {
  buckets.clear();
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
