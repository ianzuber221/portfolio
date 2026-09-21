"use client";

import { useEffect, useState } from "react";
import { useRecruiter } from "@/context/RecruiterContext";

export function RecruiterPanel() {
  const { session, hydrated, update, reset } = useRecruiter();
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Once the persisted session hydrates from localStorage, seed the local
  // inputs so a returning visitor sees their previous company/focus.
  useEffect(() => {
    if (!hydrated) return;
    setCompany((prev) => (prev === "" ? session.company : prev));
    setFocus((prev) => (prev === "" ? session.focus : prev));
    // Only re-run when hydration completes, not on every keystroke.
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

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-10">
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          <h2 className="section-title">Recruiter mode</h2>
        </div>
        <p className="mt-2 max-w-2xl muted">
          Tell me who you are and what you&apos;re hiring for. I&apos;ll tailor a
          quick pitch — powered by OpenAI when configured, with a curated
          fallback otherwise. Your session is remembered on this device.
        </p>

        <form
          onSubmit={personalize}
          className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (e.g. Vercel)"
            className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-white/15"
          />
          <input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Focus area (e.g. AI infrastructure)"
            className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-white/15"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500 disabled:opacity-60"
          >
            {loading ? "Thinking…" : "Personalize"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {session.summary && (
          <div className="mt-6 rounded-xl border border-brand-200/60 bg-brand-50/60 p-4 text-sm dark:border-brand-500/20 dark:bg-brand-500/10">
            <p className="leading-relaxed">{session.summary}</p>
            <div className="mt-3 flex items-center justify-between text-xs muted">
              <span>
                {session.summarySource === "openai"
                  ? "Generated with OpenAI"
                  : "Curated fallback (add OPENAI_API_KEY for live generation)"}
              </span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setCompany("");
                  setFocus("");
                }}
                className="underline transition hover:text-brand-500"
              >
                Clear session
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
