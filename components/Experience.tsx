import { experience } from "@/lib/profile";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Experience"
        title="Recent roles"
      />
      <ol className="mt-10 space-y-8 border-l border-[rgb(var(--border)/0.14)] pl-6">
        {experience.map((item, i) => (
          <Reveal as="li" key={`${item.company}-${item.period}`} delay={i * 80} className="relative">
            <span className="absolute -left-[1.7rem] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-brand-500 bg-[rgb(var(--background))]">
              <span className="h-1 w-1 rounded-full bg-brand-500" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">
                {item.role} ·{" "}
                <span className="text-[rgb(var(--ring))]">{item.company}</span>
              </h3>
              <span className="font-mono text-xs muted">{item.period}</span>
            </div>
            <p className="mt-2 text-sm muted">{item.summary}</p>
            <ul className="mt-3 space-y-1.5 text-sm muted">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--ring))]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
