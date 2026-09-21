import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-14">
      <div className="flex items-end justify-between">
        <h2 className="section-title">Selected work</h2>
        <p className="hidden text-sm muted sm:block">
          A mix of shipped products and side experiments.
        </p>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
