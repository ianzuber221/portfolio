import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supernovaCaseStudy } from "@/lib/case-studies";
import { ArrowUpRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: supernovaCaseStudy.title,
  description: supernovaCaseStudy.summary,
};

export default function SupernovaCaseStudyPage() {
  const study = supernovaCaseStudy;

  return (
    <>
      <Navbar />
      <main id="main" className="container-page py-16 sm:py-20">
        <Link
          href="/#work"
          className="text-sm font-medium muted transition hover:text-[rgb(var(--ring))]"
        >
          ← Back to work
        </Link>
        <p className="eyebrow mt-8">{study.eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg muted">{study.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {study.stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight">Problem</h2>
          <p className="mt-3 leading-relaxed muted">{study.problem}</p>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight">Approach</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed muted">
            {study.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight">Impact</h2>
          <ul className="mt-3 space-y-2 leading-relaxed muted">
            {study.impact.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--ring))]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Link href="/#ai" className="btn-primary mt-12">
          Ask the assistant about this project
          <ArrowUpRightIcon width={16} height={16} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
