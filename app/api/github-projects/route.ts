import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const githubUsername = "ianzuber221";

// Summarizes a GitHub README into { summary, techStack }
async function summarizeReadme(readmeText: string, repoName: string) {
  const prompt = `Summarize the following GitHub README for a portfolio website.
Keep it concise (1-2 sentences), casual but professional, and do not mention that it's a README.
This description will be displayed in card format so keep it short and engaging.
Return this in the following JSON format with the keys:
- "summary": A short description of the project
- "techStack": A list of the main technologies used (limit to the top 4-6 most relevant technologies the shorter characters the better)

Repo: ${repoName}
README:
${readmeText}`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content?.trim();

  return JSON.parse(content || '{}');
}

export async function GET() {
  const repoRes = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
  const repos = await repoRes.json();

  interface GitHubRepo {
    fork: boolean;
    archived: boolean;
    name: string;
    html_url: string;
    language: string;
  }

  const filteredRepos = repos.filter((repo: GitHubRepo) => !repo.fork && !repo.archived);

  const projects = await Promise.all(
    filteredRepos.map(async (repo: GitHubRepo) => {
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}/readme`, {
          headers: {
            Accept: "application/vnd.github.v3.raw",
          },
        });

        const readmeText = await readmeRes.text();
        const { summary, techStack = [] } = await summarizeReadme(readmeText, repo.name);

        return {
          title: repo.name,
          description: summary || "No summary available.",
          url: repo.html_url,
          language: repo.language,
          techStack,
        };
      } catch (err) {
        console.error(`Error processing repo: ${repo.name}`, err);
        return {
          title: repo.name,
          description: "No summary available.",
          url: repo.html_url,
          language: repo.language,
          techStack: [],
        };
      }
    })
  );

  return NextResponse.json(projects);
}