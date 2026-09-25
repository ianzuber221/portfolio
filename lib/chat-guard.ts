export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatContext = { company?: string; focus?: string; jd?: string };

export const MAX_MESSAGES = 12;
export const MAX_CONTENT_CHARS = 1000;
export const MAX_CONTEXT_CHARS = 80;
export const MAX_JD_CHARS = 4_000;
export const MAX_BODY_BYTES = 24_000;

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function sanitizeContext(raw: unknown): ChatContext {
  if (!raw || typeof raw !== "object") return {};
  const obj = raw as Record<string, unknown>;
  const company = clip(obj.company, MAX_CONTEXT_CHARS);
  const focus = clip(obj.focus, MAX_CONTEXT_CHARS);
  const jd = clip(obj.jd, MAX_JD_CHARS);
  return {
    ...(company ? { company } : {}),
    ...(focus ? { focus } : {}),
    ...(jd ? { jd } : {}),
  };
}

export function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const content = clip(record.content, MAX_CONTENT_CHARS);
    if (!content) continue;
    cleaned.push({
      role: record.role === "assistant" ? "assistant" : "user",
      content,
    });
  }
  return cleaned.slice(-MAX_MESSAGES);
}

export function bodyTooLarge(request: Request): boolean {
  const len = Number(request.headers.get("content-length") || 0);
  return Number.isFinite(len) && len > MAX_BODY_BYTES;
}
