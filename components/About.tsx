import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="about" className="container-page py-16 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
        <SectionHeading eyebrow="About" title="A little about me" />
        <div className="space-y-4 text-lg leading-relaxed muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
