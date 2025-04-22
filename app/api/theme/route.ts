import { generateTheme } from "@/lib/generateTheme";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { company, style } = await req.json();

  if (!company || !style) {
    return NextResponse.json({ error: "Missing company or style" }, { status: 400 });
  }

  const theme = await generateTheme(company, style);
  return NextResponse.json({ theme });
}