import { profile, experience } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { supernovaCaseStudy } from "@/lib/case-studies";
import type { ChatContext, ChatMessage } from "@/lib/chat-guard";
import { formatFitMemo, scoreJobFit } from "@/lib/chat-fit";

const email =
  profile.socials.find((social) => social.kind === "email")?.handle ||
  "ianzuber321@gmail.com";

function lastUserText(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "user") return messages[i].content;
  }
  return messages[messages.length - 1]?.content || "";
}

export function buildChatKnowledge(): string {
  const roles = experience
    .map((item) => {
      const period = item.period ? ` (${item.period})` : "";
      return [
        `${item.role} at ${item.company}${period}`,
        item.summary,
        ...item.highlights.map((highlight) => `- ${highlight}`),
        `Stack: ${item.stack.join(", ")}`,
      ].join("\n");
    })
    .join("\n\n");

  const projectLines = projects
    .map((project) => {
      const extra = project.caseStudy
        ? ` Case study: ${project.caseStudy}`
        : "";
      return `- ${project.name}: ${project.summary} Impact: ${project.impact}. Tags: ${project.tags.join(", ")}.${extra}`;
    })
    .join("\n");

  const skills = profile.skillGroups
    .map((group) => `${group.label}: ${group.items.join(", ")}`)
    .join("\n");

  const education = profile.education
    .map((item) => `${item.credential} · ${item.school}`)
    .join("; ");

  const certs = profile.certifications.map((item) => item.title).join("; ");

  return [
    `${profile.name} is an ${profile.role} in ${profile.location}. ${profile.availability}.`,
    profile.tagline,
    ...profile.about,
    "",
    "Experience:",
    roles,
    "",
    "Projects:",
    projectLines,
    "",
    `Supernova case study (${supernovaCaseStudy.title}):`,
    `Summary: ${supernovaCaseStudy.summary}`,
    `Problem: ${supernovaCaseStudy.problem}`,
    `Approach: ${supernovaCaseStudy.approach.join(" ")}`,
    `Impact: ${supernovaCaseStudy.impact.join(" ")}`,
    `Stack: ${supernovaCaseStudy.stack.join(", ")}`,
    "",
    `Skills:\n${skills}`,
    `Education: ${education}.`,
    `Certifications (${profile.certifications[0]?.issuer || "LinkedIn Learning"}): ${certs}.`,
    `Contact: ${email}. Book a call: ${profile.calendly}. LinkedIn: https://www.linkedin.com/in/ianzuber/. GitHub: https://github.com/${profile.githubUsername}.`,
    "Unknowns (do not invent): salary, visa/sponsorship, notice period, exact BNY start date, internal BNY system names, team size, or confidential Bayer/BNY details.",
  ].join("\n");
}

export function buildSystemPrompt(context: ChatContext): string {
  const { company, focus, jd } = context;
  return [
    `You are the on-site assistant for ${profile.name}'s portfolio. The visitor is usually a recruiter or hiring manager. Answer their actual question first, then give one concrete proof point from the brief. Do not open with a biography dump.`,
    company
      ? `They are from ${company}. Tie answers to that company only when it is honest: shared problems, stack, or product shape. Never pretend ${profile.name} already works there.`
      : "They have not named a company yet.",
    focus
      ? `They care most about: ${focus}. Prefer examples that match that focus.`
      : "",
    jd
      ? [
          "They pasted a job description. When they ask about fit, hiring, or this role, write a short fit memo: verdict (strong / good / stretch), 2-3 proof points, one honest gap, and one next step.",
          "Use markdown links only, in the form [label](url), and only these URLs: /#work, /work/supernova, /resume, " +
            `${profile.calendly}, https://www.linkedin.com/in/ianzuber/, https://github.com/${profile.githubUsername}, mailto:${email}.`,
          "Do not invent JD requirements that are not in the pasted text.",
          "",
          "Pasted job description:",
          jd,
        ].join("\n")
      : "",
    "",
    "Rules:",
    "- Stay inside the brief. If something is not there, say you do not have it and point to a related fact or the Calendly link.",
    "- Prefer specifics (PassLink, MCP, 1,000 req/s, Angular at BNY) over adjectives (passionate, rockstar).",
    "- 2-5 sentences by default. Use a short list only if they ask for a walkthrough or a fit memo.",
    "- Vary the angle. Do not repeat the same BNY sentence every turn.",
    "- Link proof: [PassLink](/#work), [Supernova case study](/work/supernova), [Book a call](" +
      `${profile.calendly}).`,
    "- Offer a call only when they ask about next steps, interviews, availability, or after a fit memo.",
    "- Speak in the third person about Ian. No markdown headings. Never use em dashes. Use commas, periods, or parentheses.",
    "",
    `Brief:\n${buildChatKnowledge()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function fallbackReply(
  messages: ChatMessage[],
  context: ChatContext = {},
): string {
  const question = lastUserText(messages).toLowerCase();
  const company = context.company?.trim();
  const focus = context.focus?.trim();
  const jd = context.jd?.trim();
  const forCompany = company ? ` for a team like ${company}` : "";
  const focusNote = focus ? ` That lines up with a focus on ${focus}.` : "";
  const wantsFit =
    /fit|hire|this role|job description|\bjd\b|why should we|stand out|match/.test(
      question,
    );

  if (jd && wantsFit) {
    return formatFitMemo(scoreJobFit(jd), {
      company,
      calendly: profile.calendly,
    });
  }

  if (/supernova|sdc|reviews service|1,?000\s*req|nginx|load.?balanc/.test(question)) {
    return `Supernova is Ian's Hack Reactor system-design capstone: a from-scratch reviews backend. First queries took 3-15 seconds. After indexing PostgreSQL, measuring on AWS EC2, and putting NGINX in front of extra instances, he hit 1,000 req/s with responses under 20ms. Read the [Supernova case study](/work/supernova).`;
  }

  if (/passlink|bayer|medical.?device|radiology/.test(question)) {
    return `At Bayer Radiology, Ian led the PassLink Cloud Web App for medical-device software: architecture, delivery, and mentoring offshore developers across internal systems. The stack was Angular, Nest.js, AWS Lambda, TypeScript, and PostgreSQL. See [PassLink](/#work) on the work section.`;
  }

  if (
    /mcp|agent|llm|openai|prompt|\bai\b|workflow/.test(question) &&
    !/arcade|leetcode|vroom/.test(question)
  ) {
    return `At BNY, Ian is an AI Frontend Engineer on the Platform Tools team: enterprise Angular apps plus the agents, reusable skills, multi-step workflows, and MCP servers that connect internal systems to LLMs.${focusNote}`;
  }

  if (/call|calendly|schedul|book a|interview|meet|contact|email|linkedin/.test(question)) {
    return `The fastest path is to [Book a call](${profile.calendly}) or email ${email}. He's based in Pittsburgh and open to conversations.`;
  }

  if (
    /relocat|remote|pittsburgh|based in|where (is|does) (he|ian)|location\b/.test(
      question,
    )
  ) {
    return `Ian is based in Pittsburgh, PA. He's currently an AI Frontend Engineer at BNY and open to compelling opportunities, including conversations about location.`;
  }

  if (/salary|compensat|how much|pay|band|level/.test(question)) {
    return `He hasn't published compensation here. Best next step is a short call at ${profile.calendly} so you can talk role and range directly.`;
  }

  if (/educat|school|degree|hack reactor|duquesne|ccac|college|certif/.test(question)) {
    return `Ian completed Hack Reactor's advanced software engineering program, web development coursework at CCAC, and a B.S. in Music Technology at Duquesne. The public systems write-up from Hack Reactor is the [Supernova case study](/work/supernova).`;
  }

  if (/arcade|leetcode|vroom|github|side project/.test(question)) {
    return `Alongside BNY and Bayer, Ian's public work includes this Next.js portfolio with a recruiter assistant, Arcade (a 48-hour React/Express game with auth and high scores), a LeetCode practice log, and earlier projects like vROOm. Production work to lead with is PassLink, this site, and the Supernova case study.`;
  }

  if (/hire|why|fit|strength|stand out/.test(question)) {
    return `Good fit${forCompany}: Ian ships enterprise Angular front-ends with AI built in (agents, skills, workflows, MCP), led Bayer's [PassLink](/#work) Cloud Web App, and has a public systems story in [Supernova](/work/supernova) (1,000 req/s under 20ms).${focusNote}`;
  }

  if (
    /experience|background|who('s| is) (he|ian)|about (ian|him)|bny|current role|what does he do|where (did|has) (he|ian) work/.test(
      question,
    )
  ) {
    return `Ian is an AI Frontend Engineer at BNY, building enterprise Angular apps and AI agents, skills, workflows, and MCP servers on the Platform Tools team. Before that he spent about 2.5 years at Bayer Radiology leading PassLink.`;
  }

  if (/project|work you|what has he built|case study/.test(question)) {
    return `Lead with Bayer's [PassLink](/#work) Cloud Web App (Angular/Nest.js, architecture and delivery), then this AI portfolio, then [Supernova](/work/supernova), a reviews service he took from multi-second queries to 1,000 req/s at under 20ms.`;
  }

  return `Ian is an AI Frontend Engineer at BNY (Angular + agents/MCP) and previously led Bayer's PassLink Cloud Web App. Ask about BNY AI work, PassLink, the Supernova scale story, or the best way to get in touch.`;
}
