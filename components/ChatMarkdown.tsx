import Link from "next/link";
import { parseChatInline } from "@/lib/chat-links";

export function ChatMarkdown({ text }: { text: string }) {
  const parts = parseChatInline(text);
  return (
    <>
      {parts.map((part, index) =>
        part.type === "link" ? (
          <Link
            key={`${part.href}-${index}`}
            href={part.href}
            className="font-medium underline decoration-[rgb(var(--ring)/0.5)] underline-offset-2 transition hover:text-[rgb(var(--ring))]"
          >
            {part.label}
          </Link>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </>
  );
}
