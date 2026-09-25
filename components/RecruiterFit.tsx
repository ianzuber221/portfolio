"use client";

import { useRecruiter } from "@/context/RecruiterContext";

const EXAMPLES = [
  { company: "Vercel", focus: "AI infrastructure" },
  { company: "Linear", focus: "polished product UI" },
  { company: "Stripe", focus: "reliable frontend platforms" },
] as const;

export function RecruiterFit() {
  const { company, focus, hydrated, update, reset } = useRecruiter();
  const active = hydrated && Boolean(company.trim() || focus.trim());
  const label = [company.trim() && `Fits ${company.trim()}`, focus.trim()]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mt-5 animate-fade-in-up">
      <p
        className={`min-h-[1.5rem] text-sm ${
          active ? "font-medium text-[rgb(var(--ring))]" : "muted"
        }`}
        aria-live="polite"
      >
        {hydrated ? (active ? label : "Personalize this page") : null}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {EXAMPLES.map((example) => {
          const selected =
            hydrated &&
            company === example.company &&
            focus === example.focus;
          return (
            <button
              key={example.company}
              type="button"
              aria-label={`Personalize for ${example.company}`}
              onClick={() => update(example)}
              className={`chip transition hover:border-[rgb(var(--ring)/0.5)] hover:text-[rgb(var(--ring))] ${
                selected ? "border-[rgb(var(--ring)/0.6)] text-[rgb(var(--ring))]" : ""
              }`}
            >
              {example.company}
            </button>
          );
        })}
        {active && (
          <button
            type="button"
            onClick={reset}
            className="text-xs muted underline-offset-2 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
