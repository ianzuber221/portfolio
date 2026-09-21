import Link from "next/link";
import type { Project } from "@/lib/projects";
import { GitHubIcon, ArrowUpRightIcon } from "@/components/icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group relative flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgb(var(--ring)/0.4)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        {project.featured && (
          <span className="shrink-0 rounded-full bg-[rgb(var(--ring)/0.12)] px-2.5 py-0.5 text-xs font-medium text-[rgb(var(--ring))]">
            Featured
          </span>
        )}
      </div>

      <p className="mt-1 text-xs font-medium text-[rgb(var(--ring))]">
        {project.impact}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed muted">
        {project.summary}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>

      {(project.repo || project.demo) && (
        <div className="mt-5 flex items-center gap-4 border-t border-[rgb(var(--border)/0.1)] pt-4 text-sm">
          {project.repo && (
            <Link
              href={project.repo}
              className="inline-flex items-center gap-1.5 font-medium transition hover:text-[rgb(var(--ring))]"
            >
              <GitHubIcon width={16} height={16} />
              Code
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              className="inline-flex items-center gap-1.5 font-medium transition hover:text-[rgb(var(--ring))]"
            >
              Live demo
              <ArrowUpRightIcon width={14} height={14} />
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
