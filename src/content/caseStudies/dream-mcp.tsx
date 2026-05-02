import type { CaseStudy } from './types';

export const dreamMcp: CaseStudy = {
  slug: 'dream-mcp',
  name: 'Dream MCP',
  tag: 'AI · MCP · Tool Calling',
  year: '2025 — present',
  role: 'Senior Frontend Developer',
  client: 'United Wholesale Mortgage',
  dek: 'A Model Context Protocol server that exposes the entire Dream Design System as Claude tools — engineers describe a page in one prompt and Claude scaffolds the full implementation using only DS primitives.',
  metrics: [
    { v: '1 prompt', l: 'to a full page' },
    { v: '86', l: 'components callable' },
    { v: '0', l: 'off-system colors' },
    { v: '~12', l: 'tools exposed' },
  ],
  stack: ['MCP', 'TypeScript', 'Claude', 'JSON-RPC', 'Node.js'],
  body: (
    <>
      <h2>The problem we kept hitting</h2>
      <p>
        We had built the Dream Design System and shipped 86 components, 560+
        tokens, and 607 icons. Every team in the org was supposed to consume
        it. And yet — engineers were still reaching for plain divs, raw color
        hex codes, and ad-hoc spacing. Adoption is a function of friction, and
        the friction wasn't the components; it was discovery. Even a great DS
        has a real cost: the time it takes to find the right component, learn
        its props, and remember to grab tokens instead of literals.
      </p>
      <p>
        Around the same time, AI tooling was becoming load-bearing on the
        team. Engineers were prompting Claude for entire pages — and Claude,
        not knowing the DS, was happily generating raw HTML. The DS was
        invisible to the AI layer that the team increasingly relied on.
      </p>
      <p>
        Dream MCP was the answer to both problems at once.
      </p>

      <h2>What MCP gives you</h2>
      <p>
        The Model Context Protocol is a standard way for AI clients (Claude
        Desktop, Claude Code, IDE extensions) to talk to external tools and
        data. A server exposes a list of tools, each with a name, a
        description, and a JSON Schema for inputs. Claude reads the catalog,
        decides which tools to call based on the user's prompt, and your
        server does the work.
      </p>
      <p>
        For Dream MCP, "the work" is answering questions about the design
        system: what's in the catalog, what tokens are available, what props
        does this component take, and — the headline feature — given a page
        description, what does the wired-up implementation look like?
      </p>

      <h2>The tools</h2>
      <p>
        The server exposes about a dozen tools. The ones that get used the
        most:
      </p>
      <ul>
        <li>
          <b>getComponent</b> — given a component name, return its props,
          variants, accessibility notes, and a runnable example. The model
          uses this to verify it's invoking a component correctly.
        </li>
        <li>
          <b>searchTokens</b> — fuzzy-search the 560+ tokens by name, value,
          or category. The model uses this when it needs to translate "the
          brand pink at 50% opacity" into the actual token reference.
        </li>
        <li>
          <b>scaffoldScreen</b> — the marquee tool. Given a high-level page
          description, returns a wired-up scaffold using only DS primitives,
          our spacing scale, our type ramp, and the right semantic colors.
        </li>
        <li>
          <b>getIcon</b> — return the SVG and React import for any of the 607
          icons. Resolves the perpetual "where's the trash icon" lookup.
        </li>
        <li>
          <b>checkA11y</b> — static analysis of a JSX tree against WCAG
          rules. Catches missing alt text, low-contrast color combinations,
          and unreachable focus states before code review even starts.
        </li>
        <li>
          <b>applyTheme</b> — switch a tree between the two theme palettes,
          showing what changes.
        </li>
      </ul>

      <h2>Why this works</h2>
      <p>
        The trick isn't the protocol. The protocol is honestly thin — about
        six message types over JSON-RPC on stdio. The trick is structuring
        the design system's metadata so the model can use it. Component
        descriptions read like documentation a human would write, because
        that's what the model is good at consuming. Prop unions carry JSDoc
        comments that explain the difference between variants. Examples live
        on the components themselves so the model has a concrete reference.
      </p>
      <p>
        We did exactly the work that we should have been doing for human
        engineers anyway. The DS just got dramatically more discoverable in
        the process — and the AI layer became a force multiplier rather than
        a parallel reality.
      </p>

      <h2>What it feels like in practice</h2>
      <p>
        An engineer prompts Claude with "build a settings page with a profile
        section, a billing section, and a danger zone." A few seconds later
        they have a working scaffold using our Stack, our SettingsRow, our
        Heading, our Card, our Button — every spacing value lands on a
        token, every color is semantic, every interactive element is
        keyboard-accessible.
      </p>
      <p>
        It's the most leveraged AI surface my team ships. And it works
        because the design system underneath was already strong; the MCP
        layer just made it Claude-native.
      </p>
    </>
  ),
};
