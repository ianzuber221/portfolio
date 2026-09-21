"use client";

import { useEffect, useState } from "react";
import { useRecruiter } from "@/context/RecruiterContext";

const EXAMPLES = [
  { company: "Vercel", focus: "AI infrastructure" },
  { company: "Linear", focus: "polished product UI" },
  { company: "Stripe", focus: "reliable backend systems" },
];

export function RecruiterPanel() {
  const { session, hydrated, update, reset } = useRecruiter();
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Seed the inputs from a persisted session once it hydrates.
  useEffect(() => {
    if (!hydrated) return;
    setCompany((prev) => (prev === "" ? session.company : prev));
    setFocus((prev) => (prev === "" ? session.focus : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  async function personalize(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, focus }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      update({
        company,
        focus,
        summary: data.summary,
        summarySource: data.source,
      });
    } catch {
      setError("Couldn't personalize right now — please try again.");
    } finally {
      setLoading(false);
    }
  }

  function applyExample(example: (typeof EXAMPLES)[number]) {
    setCompany(example.company);
    setFocus(example.focus);
  }

  return (
    <section id="recruiter" className="container-page py-8">
      <div className="card relative overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgb(var(--ring)/0.14)] blur-3xl"
        />
        <p className="eyebrow">For recruiters</p>
        <h2 className="section-title mt-2">Personalize this page for your role</h2>
        <p className="mt-3 max-w-2xl muted">
          Tell me who you&apos;re hiring for and I&apos;ll tailor a quick pitch.
          It&apos;s generated with OpenAI when a key is configured, and a curated
          fallback otherwise. Your inputs stay on this device.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs muted">Try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.company}
              type="button"
              onClick={() => applyExample(ex)}
              className="chip transition hover:border-[rgb(var(--ring)/0.5)] hover:text-[rgb(var(--ring))]"
            >
              {ex.company}
            </button>
          ))}
        </div>

        <form
          onSubmit={personalize}
          className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="sr-only" htmlFor="rc-company">
            Company
          </label>
          <input
            id="rc-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (e.g. Vercel)"
            className="rounded-lg border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--background))]/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-[rgb(var(--ring)/0.6)]"
          />
          <label className="sr-only" htmlFor="rc-focus">
            Focus area
          </label>
          <input
            id="rc-focus"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Focus area (e.g. AI infrastructure)"
            className="rounded-lg border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--background))]/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-[rgb(var(--ring)/0.6)]"
          />
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? "Thinking…" : "Personalize"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {session.summary && (
          <div className="mt-6 rounded-xl border border-[rgb(var(--ring)/0.25)] bg-[rgb(var(--ring)/0.08)] p-5">
            <p className="leading-relaxed">{session.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3 text-xs muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--ring))]" />
                {session.summarySource === "openai"
                  ? "Generated with OpenAI"
                  : "Curated fallback — set OPENAI_API_KEY for live generation"}
              </span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setCompany("");
                  setFocus("");
                }}
                className="underline transition hover:text-[rgb(var(--foreground))]"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
