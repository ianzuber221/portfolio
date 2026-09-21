import Link from "next/link";
import { profile } from "@/lib/profile";
import { SocialIcon, ArrowUpRightIcon } from "@/components/icons";

export function Hero() {
  const email = profile.socials.find((s) => s.kind === "email");

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)/0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-page pb-16 pt-16 sm:pb-20 sm:pt-24">
        <span className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--surface))]/50 px-3 py-1 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availability} · {profile.location}
        </span>

        <h1 className="mt-6 max-w-3xl animate-fade-in-up text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Hi, I&apos;m {profile.name}.
          <span className="mt-1 block text-gradient bg-[length:200%_auto] animate-gradient-pan">
            {profile.role}.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-in-up text-lg leading-relaxed muted">
          {profile.tagline}
        </p>

        <div className="mt-8 flex animate-fade-in-up flex-wrap items-center gap-3">
          <Link href="#work" className="btn-primary">
            View my work
            <ArrowUpRightIcon width={16} height={16} />
          </Link>
          {email && (
            <Link href={email.href} className="btn-ghost">
              Get in touch
            </Link>
          )}
          <div className="ml-1 flex items-center gap-1">
            {profile.socials.map((social) => (
              <Link
                key={social.kind}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border)/0.18)] text-[rgb(var(--muted))] transition hover:text-[rgb(var(--ring))] hover:border-[rgb(var(--ring)/0.5)]"
              >
                <SocialIcon kind={social.kind} width={17} height={17} />
              </Link>
            ))}
          </div>
        </div>

        <dl className="mt-12 grid max-w-lg animate-fade-in-up grid-cols-3 gap-4 border-t border-[rgb(var(--border)/0.1)] pt-6">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs muted">{stat.label}</dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
