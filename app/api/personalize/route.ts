import { NextResponse } from "next/server";
import { generateRecruiterSummary, isAiEnabled } from "@/lib/ai";

export async function POST(request: Request) {
  let body: { focus?: string; company?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { summary, source } = await generateRecruiterSummary({
    focus: body.focus,
    company: body.company,
  });

  return NextResponse.json({ summary, source, aiEnabled: isAiEnabled() });
}

export async function GET() {
  return NextResponse.json({ aiEnabled: isAiEnabled() });
}
