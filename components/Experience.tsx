import { experience } from "@/lib/profile";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-14">
      <h2 className="section-title">Experience</h2>
      <ol className="mt-8 space-y-6 border-l border-slate-200/70 pl-6 dark:border-white/10">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand-500 bg-[rgb(var(--background))]" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {item.role} · <span className="text-brand-500">{item.company}</span>
              </h3>
              <span className="font-mono text-xs muted">{item.period}</span>
            </div>
            <p className="mt-1 text-sm muted">{item.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm muted marker:text-brand-400">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
