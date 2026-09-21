import { NextResponse } from "next/server";
import { isAiEnabled } from "@/lib/ai";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    aiEnabled: isAiEnabled(),
    timestamp: new Date().toISOString(),
  });
}
