import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    aiEnabled: Boolean(process.env.OPENAI_API_KEY),
    timestamp: new Date().toISOString(),
  });
}
