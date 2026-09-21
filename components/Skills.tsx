import { profile } from "@/lib/profile";

export function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-6">
      <div className="glass-card p-6">
        <h2 className="font-mono text-xs uppercase tracking-widest muted">
          Toolbox
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {profile.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium dark:bg-white/10"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
