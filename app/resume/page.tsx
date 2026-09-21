import type { Metadata } from "next";
import Link from "next/link";
import { profile, experience } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${profile.name} — ${profile.role}. Résumé and experience.`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      {/* Screen-only action bar */}
      <div className="container-page mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
        >
          ← Back to site
        </Link>
        <PrintButton />
      </div>

      {/* Paper */}
      <article className="resume-paper mx-3 max-w-3xl rounded-xl bg-white p-6 text-slate-900 shadow-sm sm:mx-auto sm:p-12 print:mx-0 print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg text-brand-700">{profile.role}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>{profile.location}</span>
            {profile.socials.map((s) => (
              <a key={s.kind} href={s.href} className="hover:text-brand-700">
                {s.handle}
              </a>
            ))}
          </div>
        </header>

        <section className="mt-6">
          <p className="text-sm leading-relaxed text-slate-700">
            {profile.about[0]}
          </p>
        </section>

        <ResumeSection title="Experience">
          <div className="space-y-5">
            {experience.map((item) => (
              <div key={`${item.company}-${item.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {item.role} · {item.company}
                  </h3>
                  {item.period && (
                    <span className="text-xs text-slate-500">{item.period}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-700">{item.summary}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-slate-500">
                  {item.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Skills">
          <div className="grid gap-2 sm:grid-cols-2">
            {profile.skillGroups.map((g) => (
              <p key={g.label} className="text-sm text-slate-700">
                <span className="font-semibold">{g.label}:</span>{" "}
                {g.items.join(", ")}
              </p>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Selected Projects">
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.slug}>
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-700">{p.summary}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <div className="grid gap-6 sm:grid-cols-2">
          <ResumeSection title="Education">
            <ul className="space-y-2">
              {profile.education.map((e) => (
                <li key={e.school} className="text-sm">
                  <span className="font-semibold">{e.school}</span>
                  <span className="block text-slate-600">{e.credential}</span>
                </li>
              ))}
            </ul>
          </ResumeSection>

          <ResumeSection title="Certifications">
            <ul className="space-y-1 text-sm text-slate-700">
              {profile.certifications.map((c) => (
                <li key={c.title}>{c.title}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              {profile.certifications[0]?.issuer}
            </p>
          </ResumeSection>
        </div>
      </article>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
