import { profile } from "@/lib/profile";

export function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <h2 className="section-title">A little about me</h2>
      <div className="mt-6 space-y-4 text-lg leading-relaxed muted">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
