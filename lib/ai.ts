import OpenAI from "openai";

export type RecruiterFocus = {
  focus?: string;
  company?: string;
};

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export function isAiEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Generate a recruiter-tailored summary. Falls back to a deterministic,
 * hand-written summary whenever the OpenAI key is missing or the call fails,
 * so the site always renders something useful.
 */
export async function generateRecruiterSummary(
  input: RecruiterFocus,
): Promise<{ summary: string; source: "openai" | "fallback" }> {
  const focus = input.focus?.trim();
  const company = input.company?.trim();

  const client = getClient();
  if (!client) {
    return { summary: fallbackSummary(focus, company), source: "fallback" };
  }

  try {
    const prompt = [
      "You are writing a concise, warm 2-3 sentence pitch for Ian Zuber,",
      "a full-stack and AI engineer, aimed at a recruiter.",
      company ? `The recruiter is from ${company}.` : "",
      focus ? `They care most about: ${focus}.` : "",
      "Keep it specific, confident, and free of clichés.",
    ]
      .filter(Boolean)
      .join(" ");

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 160,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();
    if (summary) return { summary, source: "openai" };
  } catch {
    // fall through to deterministic fallback
  }

  return { summary: fallbackSummary(focus, company), source: "fallback" };
}

function fallbackSummary(focus?: string, company?: string): string {
  const lead = company
    ? `For a team like ${company}, Ian Zuber is a strong fit:`
    : "Ian Zuber is a full-stack and AI engineer who ships fast without cutting corners.";
  const focusLine = focus
    ? ` He's especially excited about work involving ${focus}, and pairs product intuition with hands-on delivery.`
    : " He blends product intuition with deep technical delivery across the stack.";
  return `${lead}${focusLine} Recent work spans Next.js apps, applied AI features on OpenAI, and the infrastructure that keeps them reliable.`;
}
