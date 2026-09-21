"use client";

import { useEffect, useRef, useState } from "react";
import { useRecruiter } from "@/context/RecruiterContext";
import { profile } from "@/lib/profile";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Why should we hire Ian?",
  "Tell me about the Bayer PassLink project.",
  "What's his experience with AI?",
  "Is he open to relocating?",
];

export function AiChat() {
  const { company, focus, hydrated, update } = useRecruiter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);
    // Placeholder assistant message we stream into.
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: { company, focus },
        }),
      });
      if (!res.ok || !res.body) {
        throw new Error(res.status === 429 ? "rate-limit" : "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const rateLimited = err instanceof Error && err.message === "rate-limit";
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: rateLimited
            ? "You're sending messages a little fast — wait a few seconds and try again."
            : "Sorry — something went wrong. Please try again.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  const showEmptyState = messages.length === 0;

  return (
    <section id="ai" className="container-page py-8">
      <div className="card relative overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgb(var(--ring)/0.14)] blur-3xl"
        />
        <p className="eyebrow">For recruiters</p>
        <h2 className="section-title mt-2">Chat with my AI</h2>
        <p className="mt-3 max-w-2xl muted">
          Ask anything about {profile.name.split(" ")[0]}&apos;s experience,
          projects, or fit for your role. Add your company and focus for a
          tailored conversation. Powered by OpenAI, with a curated fallback when
          no key is configured.
        </p>

        {/* Optional recruiter context */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <input
            aria-label="Your company"
            value={hydrated ? company : ""}
            onChange={(e) => update({ company: e.target.value })}
            placeholder="Your company (optional)"
            className="rounded-lg border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--background))]/40 px-3.5 py-2.5 text-base sm:text-sm outline-none transition focus:border-[rgb(var(--ring)/0.6)]"
          />
          <input
            aria-label="Role focus"
            value={hydrated ? focus : ""}
            onChange={(e) => update({ focus: e.target.value })}
            placeholder="Role focus (e.g. AI infrastructure)"
            className="rounded-lg border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--background))]/40 px-3.5 py-2.5 text-base sm:text-sm outline-none transition focus:border-[rgb(var(--ring)/0.6)]"
          />
        </div>

        {/* Thread */}
        <div
          ref={threadRef}
          aria-live="polite"
          className="mt-5 h-80 space-y-4 overflow-y-auto rounded-xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--background))]/30 p-4"
        >
          {showEmptyState ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm muted">Try asking:</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="chip transition hover:border-[rgb(var(--ring)/0.5)] hover:text-[rgb(var(--ring))]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    m.role === "assistant"
                      ? "bg-gradient-to-br from-brand-500 to-brand-700 text-white"
                      : "border border-[rgb(var(--border)/0.2)] text-[rgb(var(--muted))]"
                  }`}
                >
                  {m.role === "assistant" ? "AI" : "You"}
                </span>
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "assistant"
                      ? "bg-[rgb(var(--surface))]/70 border border-[rgb(var(--border)/0.12)]"
                      : "bg-brand-600 text-white"
                  }`}
                >
                  {m.content ||
                    (streaming && i === messages.length - 1 ? (
                      <span className="inline-flex gap-1">
                        <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                      </span>
                    ) : (
                      ""
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-4 flex gap-2"
        >
          <label className="sr-only" htmlFor="ai-input">
            Message
          </label>
          <input
            id="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience, projects, availability…"
            className="flex-1 rounded-lg border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--background))]/40 px-3.5 py-2.5 text-base sm:text-sm outline-none transition focus:border-[rgb(var(--ring)/0.6)]"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="btn-primary disabled:opacity-50"
          >
            {streaming ? "…" : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[rgb(var(--muted))]"
      style={{ animationDelay: delay }}
    />
  );
}
