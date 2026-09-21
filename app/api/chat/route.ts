import { NextResponse } from "next/server";
import OpenAI from "openai";
import { profile, experience } from "@/lib/profile";
import {
  sanitizeContext,
  sanitizeMessages,
  bodyTooLarge,
  type ChatMessage,
  type ChatContext,
} from "@/lib/chat-guard";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const CHAT_RATE_LIMIT = Math.max(
  1,
  Number(process.env.CHAT_RATE_LIMIT || 12) || 12,
);

// Build the fact sheet from the single source of truth in lib/profile so the
// assistant stays in sync whenever the profile is updated.
function facts(): string[] {
  const skills = profile.skillGroups
    .map((g) => `${g.label}: ${g.items.join(", ")}`)
    .join("; ");
  const roles = experience.map(
    (e) =>
      `${e.role} at ${e.company}${e.period ? ` (${e.period})` : ""} — ${e.summary} ${e.highlights.join(" ")}`,
  );
  const edu = profile.education
    .map((e) => `${e.credential} — ${e.school}`)
    .join("; ");
  const certs = profile.certifications.map((c) => c.title).join("; ");
  return [
    `${profile.name} is an ${profile.role} based in ${profile.location} (${profile.availability}).`,
    ...roles,
    `Skills — ${skills}.`,
    `Education — ${edu}.`,
    `Certifications (${profile.certifications[0]?.issuer || "LinkedIn Learning"}) — ${certs}.`,
    "On weaknesses: he's always eager to grow and improve.",
    `On availability: he's currently at BNY and open to compelling opportunities. Recruiters can book a call at ${profile.calendly}.`,
  ];
}

function systemPrompt(context: ChatContext): string {
  const { company, focus } = context;
  return [
    `You are the AI assistant for ${profile.name}'s portfolio — a warm, sharp advocate speaking to a recruiter evaluating ${profile.name} for a software / AI engineering role. Help them understand his skills, experience, and personality so they're excited to interview him.`,
    company
      ? `The recruiter is from ${company}. Tailor answers to resonate with their culture and product where you reasonably can.`
      : "",
    focus ? `They especially care about: ${focus}. Emphasize relevant strengths.` : "",
    "",
    `Facts about ${profile.name} (do not contradict these; if you don't know something, say so rather than inventing it):`,
    ...facts().map((f) => `- ${f}`),
    "",
    "Style: confident, warm, and persuasive with a touch of tasteful humor. Keep answers concise (2-4 sentences) unless asked for detail. Never fabricate specifics; if unsure, say so.",
  ]
    .filter(Boolean)
    .join("\n");
}

function fallbackReply(messages: ChatMessage[], context: ChatContext): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || "";
  const forCompany = context.company ? ` for a team like ${context.company}` : "";
  if (/agent|mcp|workflow|skill|ai\b|llm/.test(last)) {
    return `At BNY, Ian builds Angular web apps with AI woven in — designing agents, reusable skills, multi-step workflows, and MCP (Model Context Protocol) servers that connect internal systems and data to LLMs.`;
  }
  if (/call|calendly|schedul|book a|interview|meet|contact|email/.test(last)) {
    return `The fastest path is to book time at ${profile.calendly} — or email ianzuber321@gmail.com. He's based in Pittsburgh and open to conversations.`;
  }
  if (/relocat|location|where|based/.test(last)) {
    return `Ian is based in Pittsburgh, PA. He's currently an AI Frontend Engineer at BNY and open to compelling opportunities.`;
  }
  if (/experience|background|who|about|bny|bayer|current/.test(last)) {
    return `Ian is an AI Frontend Engineer at BNY, building enterprise Angular apps and AI agents/skills/workflows/MCP servers on the Platform Tools team. Previously he led Bayer's PassLink Cloud Web App.`;
  }
  if (/hire|why|fit|strength/.test(last)) {
    return `Great fit${forCompany}: Ian ships enterprise Angular front-ends with AI built in (agents, skills, workflows, MCP servers), previously led Bayer's PassLink Cloud Web App, and pairs strong fundamentals with a real passion for applied AI.`;
  }
  return `Thanks for stopping by! Ian is an AI Frontend Engineer at BNY building Angular apps and AI agents/MCP servers, and previously led Bayer's PassLink Cloud Web App. Ask about his BNY work, the Bayer project, or his AI/agent experience.`;
}

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  const limited = rateLimit(`chat:${clientIp(request)}`, {
    limit: CHAT_RATE_LIMIT,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  if (bodyTooLarge(request)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const messages = sanitizeMessages(payload.messages);
  const context = sanitizeContext(payload.context);

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  // Graceful fallback so the feature still demonstrates without a key.
  if (!process.env.OPENAI_API_KEY) {
    return streamText(fallbackReply(messages, context));
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: MODEL,
      stream: true,
      temperature: 0.7,
      max_tokens: 400,
      messages: [
        { role: "system", content: systemPrompt(context) },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) controller.enqueue(encoder.encode(content));
          }
        } catch {
          controller.enqueue(encoder.encode(" …sorry, the response was cut short."));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return streamText(fallbackReply(messages, context));
  }
}
