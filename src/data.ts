export type Metric = { value: string; label: string };
export type ProjectMetric = { v: string; l: string };
export type Experience = {
  year: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  stack: string[];
};
export type Project = {
  name: string;
  tag: string;
  year: string;
  summary: string;
  metrics: ProjectMetric[];
  stack: string[];
};
export type MCPTool = { name: string; desc: string };
export type Testimonial = { quote: string; author: string; org: string };
export type Certification = { title: string; issuer: string; year: string; tag: string };

export const data = {
  name: 'Ramarao Iragavarapu',
  shortName: 'Ramarao',
  initials: 'RI',
  role: 'Senior Frontend Developer',
  tagline: 'Mobile · Web · AI · Design Systems',
  location: 'Pontiac, Michigan',
  email: 'imsramarao6669@gmail.com',
  phone: '+1 (214) 837-8395',
  links: {
    github: 'https://github.com/imsramarao',
    linkedin: 'https://www.linkedin.com/in/ramarao-react/',
  },

  story: [
    "My career started in 2018 as an intern at Krify Solutions in Kakinada, India — full MEAN stack, building a real end-to-end project from scratch to prove I'd actually learned the material.",
    "Atos Syntel hired me right out of college in December 2019 and put me through intensive React and React Native training. Two demo projects later — Track-IT and an event management app where I mentored ten juniors through the full Agile loop — they trusted me on Baylor Scott & White Hospital's app: a Virtual Waiting Room with hotspot-driven animations and a Prayer Wall with full social CRUD and gesture-driven motion.",
    "I came to the US in December 2021 for my Master's in Computer & Information Sciences. CPT in early 2023 took me to SmartInt on the Florida Blue / BCBS engagement — public-facing healthcare app, redesigned out-of-network pages flow, new in-network provider search across web and React Native, plus React upgrades and CVE remediation.",
    "Since June 2025 I've been at United Wholesale Mortgage as a Senior Frontend Developer, building the Dream Design System (86 components, 560+ tokens, 607 icons, dual theme palettes) and the Dream MCP server that lets Claude scaffold complete pages from one prompt using only DS primitives. About 20 of the more complex components are mine — gauge, charts, PDF viewer, audio + video players, date-range picker, autocomplete, stepper. The fun part is making them read identically to a model and to a human.",
  ],

  metrics: [
    { value: '7+', label: 'Years shipping' },
    { value: '86', label: 'DS components' },
    { value: '560+', label: 'Design tokens' },
    { value: '20+', label: 'Built from scratch' },
  ] as Metric[],

  skills: {
    Frontend: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'Tailwind', 'MUI', 'CSS animations'],
    Mobile: ['React Native', 'Expo', 'Reanimated', 'Gesture Handler', 'Detox'],
    'AI / MCP': ['Dream MCP', 'Claude', 'MCP Servers', 'Tool calling', 'Codeium', 'Copilot'],
    'Design Systems': ['Tokens', 'Theming', 'Storybook', 'Figma', 'A11y', 'MUI extensions'],
    'State & Data': ['Redux Toolkit', 'Redux Saga', 'Redux Thunk', 'Apollo', 'Context API', 'TanStack Query'],
    Testing: ['Detox', 'Jest', 'Mocha', 'Vitest'],
  } as Record<string, string[]>,

  experience: [
    {
      year: 'Jun 2025 — Now',
      company: 'United Wholesale Mortgage',
      role: 'Senior Frontend Developer',
      location: 'Pontiac, MI',
      summary:
        "Building the Dream Design System and the Dream MCP. 86 components, 560+ tokens, 607 icons, dual theme palettes. I've authored about 20 of the more complex components — gauge, bar/pie charts, PDF viewer, audio and video players, date-range picker, autocomplete, stepper, action icon, time picker, slider — most extended from MUI primitives and re-tuned to our type, color, and motion language. Touched and tweaked virtually every component in the catalog at some point.",
      stack: ['React', 'TypeScript', 'MCP', 'MUI', 'Storybook', 'Figma'],
    },
    {
      year: 'Jan 2023 — Apr 2023',
      company: 'SmartInt Inc',
      role: 'Senior React / React Native Developer',
      location: 'Florida Blue / BCBS (client)',
      summary:
        "Public-facing healthcare member app for Florida Blue, both web and React Native mobile. Redesigned the out-of-network pages flow end to end and built a new in-network provider search experience spanning multiple screens. Drove React version upgrades across the codebase and resolved a long backlog of security vulnerabilities while shipping velocity stayed steady.",
      stack: ['React', 'React Native', 'TypeScript', 'Redux'],
    },
    {
      year: 'Dec 2021 — 2023',
      company: "Master's program",
      role: 'M.S., Computer & Information Sciences',
      location: 'United States',
      summary:
        "Two-year master's covering web architecture, distributed systems, and applied ML — bridging the gap between an engineer who ships and an engineer who can reason about why a system behaves the way it does.",
      stack: ['Coursework', 'Research', 'Software Engineering'],
    },
    {
      year: 'Dec 2019 — Dec 2021',
      company: 'Atos Syntel',
      role: 'React Native Developer',
      location: 'Pune, India',
      summary:
        "Joined right after my Bachelor's and went through intensive React + React Native training. Shipped two internal demo projects — Track-IT (asset management) and an event management system where I mentored a team of ten juniors through the full Agile loop: planning, standups, refinement, retros, demos. Then moved to Baylor Scott & White Hospital's app where I built a Virtual Waiting Room with hotspot-driven animations and the Prayer Wall — post / like / comment / edit / swipe-delete with all the gesture-driven micro-interactions. CSS animation is where I sharpened.",
      stack: ['React Native', 'Redux', 'CSS animations', 'Agile / mentoring'],
    },
    {
      year: '2018 — Mar 2019',
      company: 'Krify Solutions',
      role: 'MEAN Stack Intern → Developer',
      location: 'Kakinada, India',
      summary:
        "My first job. Learned the full MEAN stack — Mongo, Express, Angular, Node — and built an end-to-end project from scratch to test what I'd actually absorbed. Where I learned what 'shipped' means.",
      stack: ['Angular', 'Node.js', 'Express', 'MongoDB'],
    },
  ] as Experience[],

  projects: [
    {
      name: 'Dream Design System',
      tag: 'Design System',
      year: '2025',
      summary:
        "United Wholesale Mortgage's design system: dual theme palettes, 560+ tokens, 607 icons, 86 React components — used across every product in the org. I authored ~20 of the more complex pieces (gauge, bar/pie charts, PDF viewer, audio and video players, date-range picker, autocomplete, stepper, action icon, time picker, slider) — most extended from MUI primitives and re-tuned to our type, color, and motion language. Touched virtually every component in the catalog at some point.",
      metrics: [
        { v: '86', l: 'components' },
        { v: '560+', l: 'tokens' },
        { v: '607', l: 'icons' },
        { v: '~20', l: 'I authored' },
      ],
      stack: ['React', 'TypeScript', 'MUI', 'Storybook', 'Figma'],
    },
    {
      name: 'Dream MCP',
      tag: 'AI · MCP',
      year: '2025',
      summary:
        "An MCP server that exposes the entire Dream DS — every component, every token, every usage guideline — as tools Claude can call. Engineers describe a page in one prompt; Claude scaffolds it end to end using only DS primitives, our spacing scale, our type ramp, and the right semantic colors. The output looks like it was written by a senior on the team.",
      metrics: [
        { v: '1 prompt', l: 'to a full page' },
        { v: '86', l: 'components callable' },
        { v: '0', l: 'off-system colors' },
      ],
      stack: ['MCP', 'TypeScript', 'Claude', 'JSON-RPC'],
    },
    {
      name: 'Florida Blue Member App',
      tag: 'Healthcare · Web + iOS + Android',
      year: '2023',
      summary:
        "Florida Blue's public-facing member application — both web and React Native mobile from a shared design language. Redesigned the out-of-network pages flow end to end and built a new in-network provider search experience spanning multiple screens. Drove React version upgrades across the codebase and resolved a long backlog of security vulnerabilities.",
      metrics: [
        { v: 'Web + RN', l: 'unified flow' },
        { v: 'OON', l: 'pages redesigned' },
        { v: 'CVEs', l: 'cleared' },
      ],
      stack: ['React', 'React Native', 'TypeScript', 'Redux'],
    },
    {
      name: 'Baylor Scott & White',
      tag: 'Healthcare · Mobile',
      year: '2020-2021',
      summary:
        "Member-facing healthcare app for one of the largest hospital systems in Texas. I built two anchor features. The Virtual Waiting Room — tap a hotspot and a layered animation explains what's happening behind the scenes during the visit. The Prayer Wall — a community feed where users post prayers and others can like, comment, edit, or swipe to delete with smooth gesture-driven motion. CSS animation is where I really sharpened.",
      metrics: [
        { v: '2', l: 'anchor features' },
        { v: 'Gestures', l: 'native feel' },
        { v: 'CSS', l: "where I sharpened" },
      ],
      stack: ['React Native', 'CSS animations', 'Redux', 'Gesture Handler'],
    },
    {
      name: 'Track-IT + Event Manager',
      tag: 'Internal · Mentorship',
      year: '2020',
      summary:
        'Two demo projects at Atos — Track-IT (an asset management system) and an event management app — where I mentored a team of ten juniors through the full Agile lifecycle: sprint planning, standups, refinement, demos, retros. The product was secondary; the muscle memory the team built was the real shipped artifact.',
      metrics: [
        { v: '10', l: 'devs mentored' },
        { v: '2', l: 'demo apps shipped' },
        { v: 'Full', l: 'Agile loop' },
      ],
      stack: ['React', 'React Native', 'Redux', 'Agile'],
    },
  ] as Project[],

  mcpTools: [
    { name: 'ds.getComponent', desc: 'Returns props, variants, and example usage for any of the 86 components.' },
    { name: 'ds.searchTokens', desc: 'Fuzzy-search 560+ design tokens by name, value, or category.' },
    { name: 'ds.scaffoldScreen', desc: 'Generate a wired-up screen from a high-level prompt.' },
    { name: 'ds.checkA11y', desc: 'Static analysis of a JSX tree against WCAG rules.' },
    { name: 'ds.getIcon', desc: 'Return SVG and React import for any of the 607 icons.' },
    { name: 'ds.applyTheme', desc: 'Switch a tree between the two theme palettes.' },
  ] as MCPTool[],

  testimonials: [] as Testimonial[],

  certifications: [
    { title: 'Claude 101', issuer: 'Anthropic', year: '2025', tag: 'AI' },
    { title: 'AI Agents — Build & Ship', issuer: 'Course', year: '2025', tag: 'AI' },
    { title: 'Tailwind CSS — Mastery', issuer: 'Course', year: '2024', tag: 'Frontend' },
    { title: 'React — Advanced Concepts', issuer: 'Udemy', year: '2019', tag: 'Frontend' },
    { title: 'React Native — Advanced', issuer: 'Udemy', year: '2019', tag: 'Mobile' },
    { title: 'Flutter — Build iOS & Android', issuer: 'Udemy', year: '2020', tag: 'Mobile' },
  ] as Certification[],
};

export type PortfolioData = typeof data;
