import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="work" className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I've designed and shipped"
        description="A mix of production products and side experiments — each one an excuse to sweat the details."
      />
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
