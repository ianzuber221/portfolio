"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/lib/profile";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Ask AI", href: "#ai" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const home = pathname === "/" ? "" : "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-[rgb(var(--border)/0.1)] bg-[rgb(var(--background))]/80 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4">
        <Link
          href={home ? "/" : "#top"}
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-6 text-sm muted sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={`${home}${link.href}`} className="transition hover:text-[rgb(var(--foreground))]">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="rounded-full border border-[rgb(var(--border)/0.18)] px-3 py-1.5 text-[rgb(var(--foreground))] transition hover:border-[rgb(var(--ring)/0.6)] hover:text-[rgb(var(--ring))]"
              >
                Résumé
              </Link>
            </li>
          </ul>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--border)/0.18)] sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[rgb(var(--border)/0.1)] bg-[rgb(var(--background))]/95 backdrop-blur sm:hidden">
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={`${home}${link.href}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-sm transition hover:bg-[rgb(var(--surface))]/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-sm font-medium text-[rgb(var(--ring))] transition hover:bg-[rgb(var(--surface))]/60"
              >
                Résumé
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
