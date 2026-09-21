import { NextResponse } from "next/server";
import OpenAI from "openai";
import { profile } from "@/lib/profile";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatContext = { company?: string; focus?: string };

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_MESSAGES = 12;

function systemPrompt(context: ChatContext): string {
  const { company, focus } = context;
  return [
    `You are the AI assistant for ${profile.name}'s portfolio — a warm, sharp advocate speaking to a recruiter who is evaluating ${profile.name} for a software engineering role. Your goal is to help them understand his skills, experience, and personality so they're excited to interview him.`,
    company
      ? `The recruiter is from ${company}. Tailor answers to resonate with their culture and product where you reasonably can.`
      : "",
    focus
      ? `They especially care about: ${focus}. Emphasize relevant strengths.`
      : "",
    "",
    `Facts about ${profile.name} (do not contradict these; if you don't know something, say so rather than inventing it):`,
    "- Full-stack software engineer with 3 years of professional experience.",
    "- Proficient in Angular, React, Next.js, Nest.js, Node.js, AWS Lambda, and Python.",
    "- Strong in TypeScript, JavaScript, HTML, CSS; experience with PostgreSQL and MongoDB.",
    "- Led development of Bayer's PassLink Cloud Web App: architectural design, mentoring offshore developers, and integrating with complex internal systems.",
    "- Based in Pittsburgh, PA; willing to relocate for the right opportunity; available to start immediately.",
    "- Education: B.S. in Music Technology from Duquesne University; Web Development at CCAC; Advanced Software Engineering certificate from Hack Reactor.",
    "- Seeking a competitive offer that reflects his skills and experience.",
    "- On weaknesses: he's always eager to grow and improve.",
    "",
    "Style: confident, warm, and persuasive with a touch of tasteful humor. Keep answers concise (2-4 sentences) unless asked for detail. Never fabricate specifics; if unsure, say so.",
  ]
    .filter(Boolean)
    .join("\n");
}

function fallbackReply(messages: ChatMessage[], context: ChatContext): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || "";
  const forCompany = context.company ? ` for a team like ${context.company}` : "";
  if (/relocat|location|where/.test(last)) {
    return `Ian is based in Pittsburgh, PA and is happy to relocate for the right opportunity — and he can start immediately.`;
  }
  if (/experience|background|who|about/.test(last)) {
    return `Ian is a full-stack engineer with 3 years of experience across Angular, React, Next.js, Nest.js, Node.js, AWS Lambda, and Python. He most recently led Bayer's PassLink Cloud Web App.`;
  }
  if (/hire|why|fit|strength/.test(last)) {
    return `Great fit${forCompany}: Ian ships full-stack features end to end, led Bayer's PassLink Cloud Web App (architecture, mentoring, tricky integrations), and pairs strong fundamentals with a real passion for applied AI.`;
  }
  return `Thanks for stopping by! Ian is a full-stack software engineer (3 yrs) who led Bayer's PassLink Cloud Web App and loves applied AI. Add an OPENAI_API_KEY to unlock the fully interactive assistant — meanwhile, ask about his experience, the Bayer project, or relocation.`;
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
  let body: { messages?: ChatMessage[]; context?: ChatContext } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  const context = body.context || {};

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
