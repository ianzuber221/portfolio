import Link from "next/link";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-5xl px-6 py-16">
      <div className="glass-card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-title">Let&apos;s connect</h2>
          <p className="mt-2 muted">
            Recruiter, engineer, or just curious? I&apos;d love to hear from you.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <Link
                href={social.href}
                className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-brand-500 hover:text-brand-500 dark:border-white/15"
              >
                {social.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center font-mono text-xs muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js,
        Tailwind &amp; OpenAI.
      </p>
    </footer>
  );
}
