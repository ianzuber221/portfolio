import { profile } from "@/lib/profile";

const email =
  profile.socials.find((social) => social.kind === "email")?.href ||
  "mailto:ianzuber321@gmail.com";

const ALLOWED_PREFIXES = [
  profile.calendly,
  "https://github.com/ianzuber221",
  "https://www.linkedin.com/in/ianzuber",
  email,
];

export type ChatInline =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export function isSafeChatHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("://")) {
    return true;
  }
  return ALLOWED_PREFIXES.some(
    (allowed) =>
      href === allowed ||
      href.startsWith(`${allowed}/`) ||
      href.startsWith(`${allowed}?`),
  );
}

export function parseChatInline(text: string): ChatInline[] {
  const parts: ChatInline[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      parts.push({ type: "text", value: text.slice(last, match.index) });
    }
    const label = match[1];
    const href = match[2];
    if (isSafeChatHref(href)) {
      parts.push({ type: "link", label, href });
    } else {
      parts.push({ type: "text", value: label });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }
  return parts.length ? parts : [{ type: "text", value: text }];
}
