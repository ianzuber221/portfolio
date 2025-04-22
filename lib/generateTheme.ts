import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateTheme(company: string, style: string) {
  const prompt = `Generate a simple color theme for a portfolio website where the visitor is a recruiter from ${company}. Style should be described as ${style}. Return JSON with: primaryColor, secondaryColor, backgroundColor, textColor`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  const json = res.choices[0].message.content;

  try {
    return JSON.parse(json || "{}");
  } catch (err) {
    console.error("Failed to parse theme JSON:", err);
    return null;
  }
}