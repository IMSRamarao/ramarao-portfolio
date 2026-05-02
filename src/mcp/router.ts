import { data } from '../data';

export type ToolCall = { tool: string; args: Record<string, unknown> };
export type Plan = { thought: string; calls: ToolCall[] };

const skillCategories = Object.keys(data.skills);
const projectNames = data.projects.map((p) => p.name);
const companies = data.experience.map((e) => e.company);

function pickSkillCategory(q: string): string | null {
  const ql = q.toLowerCase();
  for (const c of skillCategories) {
    if (ql.includes(c.toLowerCase())) return c;
  }
  if (/\b(mobile|react native|rn|ios|android|expo)\b/.test(ql)) return 'Mobile';
  if (/\b(ai|claude|llm|mcp|agent|copilot)\b/.test(ql)) return 'AI / MCP';
  if (/\b(design system|tokens?|storybook|figma|component library)\b/.test(ql)) return 'Design Systems';
  if (/\b(state|redux|zustand|saga|thunk|query|graphql|trpc|apollo)\b/.test(ql)) return 'State & Data';
  if (/\b(test|jest|vitest|playwright|detox|mocha)\b/.test(ql)) return 'Testing';
  if (/\b(react|frontend|front-end|web|next|vite|tailwind|css)\b/.test(ql)) return 'Frontend';
  return null;
}

function pickProjectName(q: string): string | null {
  const ql = q.toLowerCase();
  for (const name of projectNames) {
    const tokens = name.toLowerCase().split(/\s+/);
    if (tokens.every((t) => ql.includes(t))) return name;
  }
  for (const name of projectNames) {
    const first = name.toLowerCase().split(/\s+/)[0];
    if (first.length >= 4 && ql.includes(first)) return name;
  }
  return null;
}

function pickCompany(q: string): string | null {
  const ql = q.toLowerCase();
  for (const c of companies) {
    const tokens = c.toLowerCase().split(/\s+/);
    if (tokens.every((t) => t.length >= 3 && ql.includes(t))) return c;
  }
  if (/\buwm\b/.test(ql)) return 'United Wholesale Mortgage';
  if (/florida|blue/.test(ql)) return 'Zia Global';
  return null;
}

function pickYear(q: string): string | null {
  const m = q.match(/\b(20\d{2})\b/);
  return m ? m[1] : null;
}

function pickTech(q: string): string | null {
  const ql = q.toLowerCase();
  const techs = [
    'react native',
    'react',
    'typescript',
    'mcp',
    'webgl',
    'reanimated',
    'detox',
    'svg',
    'storybook',
    'figma',
    'redux',
    'next',
    'vite',
  ];
  for (const t of techs) {
    if (ql.includes(t)) return t;
  }
  return null;
}

export function plan(question: string): Plan {
  const q = question.toLowerCase().trim();

  const projName = pickProjectName(q);
  if (projName && /\b(tell|show|details|about|how|what)\b/.test(q)) {
    return {
      thought: `Question references "${projName}". Calling getProject to fetch full details.`,
      calls: [{ tool: 'getProject', args: { name: projName } }],
    };
  }

  if (/\b(contact|email|reach|hire|connect|linkedin|github|phone|how (?:do|can) i (?:get|reach))\b/.test(q)) {
    return {
      thought: 'Intent: contact info. Calling getContact.',
      calls: [{ tool: 'getContact', args: {} }],
    };
  }

  if (/\b(article|writ(?:e|ing|ten)|blog|post|essay|read)\b/.test(q)) {
    let topic: string | undefined;
    if (/\b(mcp|ai|claude)\b/.test(q)) topic = 'AI';
    else if (/\b(design system|tokens?|ds)\b/.test(q)) topic = 'DS';
    else if (/\b(mobile|reanimated|react native)\b/.test(q)) topic = 'Mobile';
    return {
      thought: topic
        ? `Intent: writing on "${topic}". Calling findArticles with that topic.`
        : 'Intent: writing. Calling findArticles to list everything.',
      calls: [{ tool: 'findArticles', args: topic ? { topic } : {} }],
    };
  }

  const company = pickCompany(q);
  const year = pickYear(q);
  if (company || year || /\b(timeline|career|history|experience|when|where (?:did|was|has)|previous|current job)\b/.test(q)) {
    const args: Record<string, unknown> = {};
    if (company) args.company = company;
    if (year) args.year = year;
    return {
      thought: `Intent: career history${company ? ` at ${company}` : ''}${year ? ` in ${year}` : ''}. Calling getTimeline.`,
      calls: [{ tool: 'getTimeline', args }],
    };
  }

  const tech = pickTech(q);
  if (/\b(project|built|ship|case|portfolio|work|app)\b/.test(q)) {
    return {
      thought: tech
        ? `Intent: projects involving "${tech}". Calling listProjects with tech filter.`
        : 'Intent: projects overview. Calling listProjects.',
      calls: [{ tool: 'listProjects', args: tech ? { tech } : {} }],
    };
  }

  const cat = pickSkillCategory(q);
  if (cat || /\b(skill|stack|tech|tool|framework|language|know|use)\b/.test(q)) {
    return {
      thought: cat
        ? `Intent: skills in "${cat}". Calling listSkills with that category.`
        : 'Intent: skills overview. Calling listSkills (no filter).',
      calls: [{ tool: 'listSkills', args: cat ? { category: cat } : {} }],
    };
  }

  if (/\b(who|introduce|about|tell me about (?:you|him|ramarao)|profile)\b/.test(q)) {
    return {
      thought: 'Intent: profile. Calling getProfile.',
      calls: [{ tool: 'getProfile', args: {} }],
    };
  }

  return {
    thought:
      "Question is broad. Starting with getProfile to ground the answer, then I may follow up.",
    calls: [{ tool: 'getProfile', args: {} }],
  };
}

type Parsed =
  | { ok: true; value: unknown }
  | { ok: false; raw: string };

function parse(raw: string): Parsed {
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false, raw };
  }
}

export function compose(question: string, results: { call: ToolCall; raw: string }[]): string {
  if (results.length === 0) return "I couldn't find anything relevant. Try rephrasing.";
  const r = results[0];
  const parsed = parse(r.raw);

  switch (r.call.tool) {
    case 'getProfile': {
      if (!parsed.ok) return parsed.raw;
      const p = parsed.value as {
        name: string;
        role: string;
        currentEmployer: string;
        currentLocation: string;
        availability: string;
        yearsShipping: number;
      };
      return `${p.name} is a ${p.role} based in ${p.currentLocation}, currently at ${p.currentEmployer}. He's been shipping production frontends for ${p.yearsShipping}+ years and is ${p.availability.toLowerCase()}.`;
    }

    case 'listSkills': {
      if (!parsed.ok) return parsed.raw;
      const obj = parsed.value as Record<string, string[]>;
      const cats = Object.entries(obj);
      if (cats.length === 1) {
        const [name, list] = cats[0];
        return `In ${name}, his go-to tools are ${list.join(', ')}.`;
      }
      const lines = cats.map(([n, l]) => `• ${n}: ${l.slice(0, 6).join(', ')}${l.length > 6 ? '…' : ''}`);
      return `Here's the toolkit by category:\n\n${lines.join('\n')}`;
    }

    case 'listProjects': {
      if (!parsed.ok) return parsed.raw;
      const items = parsed.value as { name: string; year: string; tag: string }[];
      if (items.length === 0) return 'No projects matched that filter.';
      const lines = items.map((p) => `• ${p.name} (${p.year}) — ${p.tag}`);
      const filterNote = r.call.args.tech ? ` involving ${r.call.args.tech}` : '';
      return `He's shipped ${items.length} project${items.length === 1 ? '' : 's'}${filterNote}:\n\n${lines.join('\n')}\n\nAsk about any of them by name for the full details.`;
    }

    case 'getProject': {
      if (!parsed.ok) return parsed.raw;
      const p = parsed.value as {
        name: string;
        tag: string;
        year: string;
        summary: string;
        metrics: { v: string; l: string }[];
        stack: string[];
      };
      const m = p.metrics.map((x) => `${x.v} ${x.l}`).join(' · ');
      return `${p.name} (${p.year}, ${p.tag})\n\n${p.summary}\n\nKey numbers: ${m}\nStack: ${p.stack.join(', ')}`;
    }

    case 'getTimeline': {
      if (!parsed.ok) return parsed.raw;
      const items = parsed.value as {
        year: string;
        company: string;
        role: string;
        location: string;
        stack: string[];
      }[];
      if (items.length === 1) {
        const e = items[0];
        return `${e.year} — ${e.role} at ${e.company} (${e.location}). Stack: ${e.stack.join(', ')}.`;
      }
      const lines = items.map((e) => `• ${e.year} — ${e.role} at ${e.company}`);
      return `Timeline:\n\n${lines.join('\n')}`;
    }

    case 'findArticles': {
      if (!parsed.ok) return parsed.raw;
      const items = parsed.value as { title: string; slug: string; readTime: string; date: string; tag: string }[];
      const lines = items.map((a) => `• "${a.title}" — ${a.readTime}, ${a.date} (${a.tag})`);
      return `He's published ${items.length} piece${items.length === 1 ? '' : 's'}:\n\n${lines.join('\n')}\n\nEvery article lives at /writing/{slug} on this site.`;
    }

    case 'getContact': {
      if (!parsed.ok) return parsed.raw;
      const c = parsed.value as {
        email: string;
        location: string;
        linkedin: string;
        github: string;
      };
      return `Best ways to reach Ramarao:\n\n• Email: ${c.email}\n• LinkedIn: ${c.linkedin}\n• GitHub: ${c.github}\n• Based in: ${c.location}`;
    }

    default:
      return parsed.ok ? JSON.stringify(parsed.value) : parsed.raw;
  }
}

export const suggestedQuestions = [
  "What's Ramarao's stack?",
  'Tell me about the Dream Design System project',
  'Where did he work in 2024?',
  'What is he writing about?',
  'How can I reach him?',
  'Show me his React Native projects',
  'What are his AI / MCP skills?',
];
