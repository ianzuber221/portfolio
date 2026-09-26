import Link from "next/link";

// Mobile-only sticky action bar. Hidden at >= sm so desktop is unaffected.
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgb(var(--border)/0.12)] bg-[rgb(var(--background))] sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-3 px-4 py-3">
        <Link href="#ai" className="btn-primary flex-1" aria-label="Ask my AI assistant">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Ask AI
        </Link>
        <Link href="/resume" className="btn-ghost flex-1" aria-label="View résumé">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M9 13h6M9 17h4" />
          </svg>
          Résumé
        </Link>
      </div>
    </div>
  );
}
