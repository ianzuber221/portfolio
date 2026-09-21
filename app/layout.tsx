import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { RecruiterProvider } from "@/context/RecruiterContext";
import { profile } from "@/lib/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ianzuber.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    profile.name,
    "Full-Stack Engineer",
    "AI Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: `${profile.name} · Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#040712" },
  ],
};

// Applies the persisted (or system) theme before first paint to avoid a flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

// schema.org Person structured data for richer search results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: "BNY" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pittsburgh",
    addressRegion: "PA",
    addressCountry: "US",
  },
  url: siteUrl,
  sameAs: profile.socials
    .filter((s) => s.kind !== "email")
    .map((s) => s.href),
  alumniOf: profile.education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.school,
  })),
  knowsAbout: profile.skillGroups.flatMap((g) => g.items),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <RecruiterProvider>{children}</RecruiterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
