import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { mergePortfolioProjects } from "@/lib/projects";
import { fetchGitHubProjects } from "@/lib/github";

export async function Projects() {
  const live = await fetchGitHubProjects(12);
  const projects = mergePortfolioProjects(live);
  const isLive = Boolean(live && live.length);

  return (
    <section id="work" className="container-page py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've designed and shipped"
          description="Production work first, then selected GitHub projects."
        />
        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border)/0.18)] px-3 py-1 text-xs muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live from GitHub
          </span>
        )}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
