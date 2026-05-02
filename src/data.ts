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
    "I'm a frontend engineer who fell for the craft seven years ago in a small office in Kakinada, India — converting wireframes into interfaces that actually felt good to use.",
    "Since then I've shipped React Native apps for mortgage lenders and healthcare giants, built design systems that 90+ engineers depend on, and most recently been deep in the AI weeds — wiring up MCP servers that turn our component library into something Claude can reason about.",
    'I care about the small stuff. The transition that lasts 240ms instead of 300. The empty state that explains itself. The component API a junior dev gets right on the first try.',
  ],

  metrics: [
    { value: '7+', label: 'Years shipping' },
    { value: '86', label: 'Components in DS' },
    { value: '12', label: 'MCP tools wired' },
    { value: '4', label: 'Apps in stores' },
  ] as Metric[],

  skills: {
    Frontend: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'Tailwind', 'CSS Houdini'],
    Mobile: ['React Native', 'Expo', 'Reanimated', 'Flutter', 'Detox'],
    'AI / MCP': ['MCP Servers', 'Claude 4.6', 'Copilot', 'Codeium', 'RAG', 'Tool calling'],
    'Design Systems': ['Tokens', 'Storybook', 'Figma API', 'A11y', 'Theming', 'Variants'],
    'State & Data': ['Redux Toolkit', 'Redux Saga', 'Redux Thunk', 'Zustand', 'TanStack Query', 'Apollo', 'tRPC'],
    Testing: ['Vitest', 'Jest', 'Playwright', 'Detox', 'Mocha'],
  } as Record<string, string[]>,

  experience: [
    {
      year: 'Jun 2025 — Now',
      company: 'United Wholesale Mortgage',
      role: 'Senior Frontend Developer',
      location: 'Pontiac, MI',
      summary:
        'Leading frontend on broker-facing iOS, Android and web tooling used by thousands of mortgage professionals daily. Building the Dream DS MCP server that turns our 86-component design system into something Claude can scaffold with.',
      stack: ['React', 'React Native', 'TypeScript', 'MCP', 'Reanimated'],
    },
    {
      year: 'Apr 2024 — Jun 2025',
      company: 'Zia Global',
      role: 'React Native Developer',
      location: 'Florida Blue (client)',
      summary:
        'Healthcare member app for Florida Blue — charts, a theming engine (light/dark/high-contrast), and an end-to-end Detox suite that catches regressions before TestFlight. Introduced Codeium across the team to speed up daily work.',
      stack: ['React Native', 'Context', 'SVG Charts', 'Redux-Saga', 'Codeium'],
    },
    {
      year: 'Jul 2023 — Apr 2024',
      company: 'Lanco Global Systems',
      role: 'React Native Developer',
      location: 'Florida Blue (client)',
      summary:
        'Continued the Florida Blue engagement — rich UI mobile work, custom hooks, theming, and Detox + Mocha E2E coverage. JIRA-driven team of 8.',
      stack: ['React Native', 'TypeScript', 'Detox', 'Mocha'],
    },
    {
      year: 'Jan 2023 — Apr 2023',
      company: 'Smart INT',
      role: 'React Developer',
      location: 'Irving, TX',
      summary:
        'Frontline safety detection platform — Spring REST integrations, real-time dashboards, Splunk health overlays for wearables and RTLS data.',
      stack: ['React', 'Redux', 'Spring REST'],
    },
    {
      year: 'Dec 2019 — Dec 2021',
      company: 'Atos',
      role: 'React Native Developer',
      location: 'Pune, India',
      summary:
        'First taste of cross-platform at scale. Built the theming foundation, custom hooks library, and chart primitives the team still uses.',
      stack: ['React Native', 'Redux', 'JSX', 'SVG'],
    },
    {
      year: 'May 2018 — Jun 2019',
      company: 'Krify Software',
      role: 'MEAN Stack Developer',
      location: 'Kakinada, India',
      summary:
        "Where it all started. Wireframes → components → shipped product. Learned what 'reusable' actually means.",
      stack: ['Angular', 'React Native', 'Babel', 'Redux'],
    },
  ] as Experience[],

  projects: [
    {
      name: 'Dream Design System',
      tag: 'Design System · MCP',
      year: '2025',
      summary:
        "An 86-component design system with a Claude-powered MCP server that exposes every component, token, icon, and usage guideline as a tool. Engineers ask 'how do I build a settings page' and get back a wired-up scaffold.",
      metrics: [
        { v: '86', l: 'components' },
        { v: '240', l: 'tokens' },
        { v: '12', l: 'MCP tools' },
        { v: '9', l: 'products consuming' },
      ],
      stack: ['React', 'TypeScript', 'MCP', 'Storybook', 'Figma API'],
    },
    {
      name: 'Sentinel Wearables',
      tag: 'Web + IoT',
      year: '2025',
      summary:
        'Real-time safety dashboard for industrial wearables. Live RTLS map with hundreds of moving entities, alert triage, and a custom WebGL heatmap.',
      metrics: [
        { v: '<60ms', l: 'p95 alert latency' },
        { v: '1.2k', l: 'concurrent devices' },
        { v: '0 jank', l: 'at 60 fps' },
      ],
      stack: ['React', 'WebGL', 'WebSockets', 'TypeScript'],
    },
    {
      name: 'UWM Broker Mobile',
      tag: 'iOS + Android',
      year: '2024',
      summary:
        'Lender-facing React Native app for daily mortgage operations. Re-architected list screens with a virtualization layer; cut TTI by 4x.',
      metrics: [
        { v: '4×', l: 'faster TTI' },
        { v: '4.8', l: 'store rating' },
        { v: '86%', l: 'test coverage' },
      ],
      stack: ['React Native', 'Reanimated', 'Detox', 'TypeScript'],
    },
    {
      name: 'Florida Blue Members',
      tag: 'iOS + Android',
      year: '2023',
      summary:
        'Healthcare member app. Built the theming runtime (light / dark / high-contrast) and SVG-based claims charts. Accessibility-first from day one.',
      metrics: [
        { v: 'AAA', l: 'WCAG contrast' },
        { v: '3', l: 'themes' },
        { v: '62', l: 'screens' },
      ],
      stack: ['React Native', 'Context API', 'SVG', 'Saga'],
    },
    {
      name: 'Track-IT',
      tag: 'Web + Mobile',
      year: '2022',
      summary:
        'Asset management system — request flow, admin approvals, locker management. Same codebase deployed to web and React Native.',
      metrics: [
        { v: '1', l: 'shared codebase' },
        { v: '3', l: 'user roles' },
      ],
      stack: ['React', 'React Native', 'Heroku'],
    },
  ] as Project[],

  mcpTools: [
    { name: 'ds.getComponent', desc: 'Returns props, variants, stories for any of 86 components.' },
    { name: 'ds.searchTokens', desc: 'Fuzzy-search 240+ design tokens by name or value.' },
    { name: 'ds.scaffoldScreen', desc: 'Generate a wired-up screen from a high-level prompt.' },
    { name: 'ds.checkA11y', desc: 'Static analysis of a JSX tree against WCAG rules.' },
    { name: 'ds.getIcon', desc: 'Return SVG and React import for any of 320 icons.' },
    { name: 'ds.diffVersions', desc: 'Compare two DS versions; surface breaking changes.' },
  ] as MCPTool[],

  testimonials: [
    {
      quote:
        'Ramarao rebuilt our most-used screen and cut latency by 75%. The diff was 200 lines — and read like prose.',
      author: 'Engineering Lead',
      org: 'United Wholesale Mortgage',
    },
    {
      quote:
        "He doesn't just ship features — he leaves the codebase better. Our junior devs onboard in days because of the patterns he set.",
      author: 'Staff Engineer',
      org: 'Smart INT',
    },
    {
      quote:
        "The MCP server he built changed how our team thinks about AI in our workflow. It's not a chatbot, it's a teammate.",
      author: 'Design Systems Lead',
      org: 'Dream DS',
    },
  ] as Testimonial[],

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
