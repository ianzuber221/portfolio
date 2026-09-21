import Link from "next/link";
import { profile } from "@/lib/profile";
import { SocialIcon, ArrowUpRightIcon } from "@/components/icons";

export function Footer() {
  const email = profile.socials.find((s) => s.kind === "email");

  return (
    <footer id="contact" className="container-page py-16 sm:py-20">
      <div className="card relative overflow-hidden p-8 sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(30rem 20rem at 80% 0%, rgb(var(--ring)/0.16), transparent 70%)",
          }}
        />
        <p className="eyebrow">Contact</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something great.
        </h2>
        <p className="mt-3 max-w-xl muted">
          Recruiter, engineer, or just curious how this site works? I&apos;m
          always happy to talk about product, AI, and thoughtful engineering.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {email && (
            <Link href={email.href} className="btn-primary">
              Email me
              <ArrowUpRightIcon width={16} height={16} />
            </Link>
          )}
          <Link href="/resume" className="btn-ghost">
            Résumé
          </Link>
          {profile.socials
            .filter((s) => s.kind !== "email")
            .map((social) => (
              <Link
                key={social.kind}
                href={social.href}
                className="btn-ghost"
              >
                <SocialIcon kind={social.kind} width={16} height={16} />
                {social.label}
              </Link>
            ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs muted sm:flex-row">
        <p className="font-mono">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js, Tailwind &amp; OpenAI</p>
      </div>
    </footer>
  );
}
