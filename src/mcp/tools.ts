import { data } from '../data';
import { articles } from '../content/registry';
import type { ToolDef, ToolResult } from './types';

export const toolDefs: ToolDef[] = [
  {
    name: 'getProfile',
    description:
      "Returns Ramarao's profile: name, current role, location, employer, availability.",
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'listSkills',
    description:
      "Returns Ramarao's technical skills, optionally filtered to a single category.",
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: Object.keys(data.skills),
          description: 'Optional category. Omit to get all categories.',
        },
      },
    },
  },
  {
    name: 'listProjects',
    description:
      'Returns project titles with one-line summaries. Optionally filter by a tech in the stack.',
    inputSchema: {
      type: 'object',
      properties: {
        tech: { type: 'string', description: 'Filter by case-insensitive tech name.' },
      },
    },
  },
  {
    name: 'getProject',
    description:
      'Returns full details for a specific project: summary, metrics, stack, year.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Project name (case-insensitive substring match).',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'getTimeline',
    description:
      "Returns Ramarao's career timeline. Optionally filter by company or year.",
    inputSchema: {
      type: 'object',
      properties: {
        company: { type: 'string', description: 'Case-insensitive company substring.' },
        year: { type: 'string', description: 'A 4-digit year, e.g. "2024".' },
      },
    },
  },
  {
    name: 'findArticles',
    description:
      "Returns Ramarao's published writing. Optionally filter by topic keyword.",
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Topic keyword to match in title or tag.' },
      },
    },
  },
  {
    name: 'getContact',
    description:
      'Returns ways to contact Ramarao: email, LinkedIn, GitHub, location.',
    inputSchema: { type: 'object', properties: {} },
  },
];

const text = (s: string): ToolResult => ({ content: [{ type: 'text', text: s }] });
const err = (s: string): ToolResult => ({ content: [{ type: 'text', text: s }], isError: true });

export function execute(name: string, args: Record<string, unknown> = {}): ToolResult {
  switch (name) {
    case 'getProfile':
      return text(
        JSON.stringify(
          {
            name: data.name,
            role: data.role,
            currentEmployer: data.experience[0].company,
            currentLocation: data.location,
            availability: 'Open to senior FE / RN / DS / AI roles',
            yearsShipping: 7,
          },
          null,
          2,
        ),
      );

    case 'listSkills': {
      const cat = (args.category as string | undefined) ?? '';
      if (cat && data.skills[cat]) {
        return text(JSON.stringify({ [cat]: data.skills[cat] }, null, 2));
      }
      return text(JSON.stringify(data.skills, null, 2));
    }

    case 'listProjects': {
      const tech = ((args.tech as string | undefined) ?? '').toLowerCase();
      const items = data.projects
        .filter(
          (p) =>
            !tech ||
            p.stack.some((s) => s.toLowerCase().includes(tech)) ||
            p.tag.toLowerCase().includes(tech) ||
            p.summary.toLowerCase().includes(tech),
        )
        .map((p) => ({ name: p.name, year: p.year, tag: p.tag }));
      if (items.length === 0) return text(`No projects matched "${tech}".`);
      return text(JSON.stringify(items, null, 2));
    }

    case 'getProject': {
      const name = ((args.name as string | undefined) ?? '').toLowerCase();
      if (!name) return err('Missing required argument: name');
      const p = data.projects.find((x) => x.name.toLowerCase().includes(name));
      if (!p) return err(`No project found matching "${args.name}".`);
      return text(JSON.stringify(p, null, 2));
    }

    case 'getTimeline': {
      const company = ((args.company as string | undefined) ?? '').toLowerCase();
      const year = (args.year as string | undefined) ?? '';
      const items = data.experience.filter(
        (e) =>
          (!company || e.company.toLowerCase().includes(company)) &&
          (!year || e.year.includes(year)),
      );
      if (items.length === 0) return text('No timeline entries matched.');
      return text(
        JSON.stringify(
          items.map((e) => ({
            year: e.year,
            company: e.company,
            role: e.role,
            location: e.location,
            stack: e.stack,
          })),
          null,
          2,
        ),
      );
    }

    case 'findArticles': {
      const topic = ((args.topic as string | undefined) ?? '').toLowerCase();
      const items = articles
        .filter(
          (a) =>
            !topic || a.title.toLowerCase().includes(topic) || a.tag.toLowerCase().includes(topic),
        )
        .map((a) => ({
          title: a.title,
          slug: a.slug,
          tag: a.tag,
          readTime: a.readTime,
          date: a.date,
          dek: a.dek,
        }));
      if (items.length === 0) return text(`No articles matched "${topic}".`);
      return text(JSON.stringify(items, null, 2));
    }

    case 'getContact':
      return text(
        JSON.stringify(
          {
            email: data.email,
            location: data.location,
            linkedin: data.links.linkedin,
            github: data.links.github,
          },
          null,
          2,
        ),
      );

    default:
      return err(`Unknown tool: ${name}`);
  }
}
