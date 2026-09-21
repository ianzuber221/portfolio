import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { company, style } = await req.json();
  const prompt = `
  A high-resolution background image in a ${style} style, representing the company ${company}.
  The image should be suitable for a portfolio website, with a ${style} aesthetic. The design should be modern and professional, reflecting the values of the company. The background should be visually appealing but not distracting, allowing text to be easily readable over it.
  The image should be in a 16:9 aspect ratio, with a resolution of 1920x1080 pixels. The color palette should be harmonious and consistent with the company's branding.
  A wide, modern abstract background with soft gradients, subtle geometric patterns, and a clean aesthetic. Minimal colors, non-distracting design, perfect as a website background.
  `;

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    }),
  });

  const data = await res.json();
  console.error("OpenAI Error:", data.error);

  const imageUrl = data.data?.[0]?.url;

  return NextResponse.json({ imageUrl });
}