import { profile } from "@/lib/profile";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function Education() {
  return (
    <section id="education" className="container-page py-16 sm:py-20">
      <SectionHeading eyebrow="Education & Certifications" title="How I got here" />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {profile.education.map((item, i) => (
          <Reveal key={item.school} delay={i * 70}>
            <div className="card h-full p-5">
              <h3 className="font-semibold leading-snug">{item.school}</h3>
              <p className="mt-2 text-sm muted">{item.credential}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="card p-6">
          <p className="eyebrow">Certifications</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.certifications.map((cert) => (
              <li key={cert.title} className="chip" title={cert.issuer}>
                {cert.title}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs muted">
            {profile.certifications[0]?.issuer}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
