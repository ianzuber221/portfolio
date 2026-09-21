import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/lib/profile";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[rgb(var(--background))]/80 backdrop-blur dark:border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-brand-500">{"</"}</span>
          {profile.name.split(" ")[0].toLowerCase()}
          <span className="text-brand-500">{">"}</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm muted sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-brand-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
