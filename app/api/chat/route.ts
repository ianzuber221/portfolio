import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  sanitizeContext,
  sanitizeMessages,
  bodyTooLarge,
} from "@/lib/chat-guard";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { buildSystemPrompt, fallbackReply } from "@/lib/chat";

export const runtime = "nodejs";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const CHAT_RATE_LIMIT = Math.max(
  1,
  Number(process.env.CHAT_RATE_LIMIT || 12) || 12,
);

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        await new Promise((r) => setTimeout(r, 12));
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
      temperature: 0.4,
      presence_penalty: 0.25,
      max_tokens: 700,
      messages: [
        { role: "system", content: buildSystemPrompt(context) },
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
          controller.enqueue(
            encoder.encode(" …sorry, the response was cut short."),
          );
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
