import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
  }

  try {
    const stream = new ReadableStream({
      async start(controller) {
        const chatResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You're a helpful AI assistant designed to explain why Ian Zuber is a strong developer candidate.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          stream: true, // Enable streaming
        });

        for await (const chunk of chatResponse) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }

        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}