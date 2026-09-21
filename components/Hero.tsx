import Link from "next/link";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
        <p className="animate-fade-in-up font-mono text-sm text-brand-500">
          {profile.location} · available for new work
        </p>
        <h1 className="mt-4 animate-fade-in-up text-4xl font-bold tracking-tight sm:text-6xl">
          Hi, I&apos;m {profile.name}.
          <span className="block bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan">
            {profile.role}.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-in-up text-lg muted">
          {profile.tagline}
        </p>
        <div className="mt-8 flex animate-fade-in-up flex-wrap gap-3">
          <Link
            href="#projects"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-500"
          >
            View my work
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium transition hover:border-brand-500 hover:text-brand-500 dark:border-white/15"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
