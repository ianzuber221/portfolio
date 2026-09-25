"use client";

import Link from "next/link";
import { useRecruiter } from "@/context/RecruiterContext";
import { ArrowUpRightIcon } from "@/components/icons";

export function RecruiterPreview() {
  const { company, focus, hydrated } = useRecruiter();
  const companyName = hydrated ? company.trim() : "";
  const focusName = hydrated ? focus.trim() : "";
  const prompt = companyName
    ? `Why should we hire Ian for ${companyName}?`
    : "Why should we hire Ian?";
  const reply = companyName
    ? `He's an AI Frontend Engineer at BNY — Angular apps plus agents, skills, workflows & MCP servers${
        focusName ? `, with a sharp fit for ${focusName}` : ""
      }. Previously he led Bayer's PassLink Cloud Web App.`
    : "He's an AI Frontend Engineer at BNY — Angular apps plus AI agents, skills, workflows & MCP servers. He previously led Bayer's PassLink Cloud Web App.";

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 border-b border-[rgb(var(--border)/0.1)] pb-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[10px] font-bold text-white">
          AI
        </span>
        <span className="text-sm font-medium">Ask my AI</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          online
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-brand-600 px-4 py-2.5 text-sm text-white">
            {prompt}
          </div>
        </div>
        <div className="flex gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[10px] font-bold text-white">
            AI
          </span>
          <div className="max-w-[85%] rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--surface))]/70 px-4 py-2.5 text-sm leading-relaxed">
            {reply}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["Bayer PassLink", "AI agents & MCP", "Open to relocating?"].map(
          (chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ),
        )}
      </div>

      <Link
        href="#ai"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--ring))] transition hover:gap-2.5"
      >
        Chat with the assistant
        <ArrowUpRightIcon width={15} height={15} />
      </Link>
    </div>
  );
}
