import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        {project.featured && (
          <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-500">
            Featured
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-slate-200/70 px-2 py-0.5 font-mono text-xs muted dark:border-white/10"
          >
            {tag}
          </li>
        ))}
      </ul>
      {(project.repo || project.demo) && (
        <div className="mt-5 flex gap-4 text-sm">
          {project.repo && (
            <Link
              href={project.repo}
              className="font-medium text-brand-500 transition group-hover:underline"
            >
              Code →
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              className="font-medium text-brand-500 transition group-hover:underline"
            >
              Demo →
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
