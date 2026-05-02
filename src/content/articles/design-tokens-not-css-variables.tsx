import type { Article } from '../types';

export const designTokensNotCssVariables: Article = {
  slug: 'design-tokens-not-css-variables',
  title: "Why your design tokens shouldn't ship as CSS variables",
  dek: 'CSS variables look like the obvious answer for design tokens. They are not. They are an output, not a source.',
  tag: 'DS',
  readTime: '6 min',
  date: 'February 8, 2026',
  dateISO: '2026-02-08',
  body: (
    <>
      <p>
        Every design system meeting eventually arrives at the same question.
        How do we ship our tokens? Someone in the room — usually the most
        senior engineer present — proposes CSS custom properties. They are
        native to the browser. They are theme-able. They cascade. They cost
        nothing. The room nods. The meeting ends.
      </p>
      <p>
        Six months later the team has rebuilt the same token pipeline three
        times, the React Native app has its own parallel set of constants, and
        nobody can tell which color is the canonical one. I have lived this
        loop twice. The mistake both times was treating CSS variables as a
        source of truth instead of as one possible rendering of a source of
        truth that should live somewhere more typed.
      </p>

      <h2>Tokens are data</h2>
      <p>
        A design token is a piece of data that describes a design decision.{' '}
        <code>color.primary.500 = #7C3AED</code>. <code>spacing.md = 16</code>.{' '}
        <code>motion.duration.short = 180ms</code>. These are facts about your
        product. They predate any rendering of them.
      </p>
      <p>
        CSS variables are a way to expose facts to the browser at runtime. They
        are an output format. Treating an output format as the source of truth
        is the same category of mistake as treating a JSON Schema as the
        source of truth for your API instead of generating the schema from
        your typed handlers. It works until you need a second consumer.
      </p>

      <h2>What you lose when CSS variables are the source</h2>
      <p>
        I'll go through the costs in order of how often they bit me.
      </p>

      <h3>No type safety</h3>
      <p>
        <code>color: var(--color-primary-500)</code> is a string concatenation
        operation that the browser is willing to perform on your behalf. If
        you typo the name, the browser silently substitutes the inherited
        value. Your component renders. It looks subtly wrong. You learn about
        it three sprints later from a designer who screenshots a button on
        Slack.
      </p>
      <p>
        Compare with <code>color: tokens.color.primary[500]</code> in
        TypeScript. The typo is a build error. You never ship the bad button.
      </p>

      <h3>No autocomplete</h3>
      <p>
        Engineers will use the tokens you give them in proportion to how
        easily their editor surfaces those tokens. CSS variables are strings
        from the editor's perspective. They do not autocomplete. A typed
        token object autocompletes the moment you type a dot.
      </p>
      <p>
        The lookup time difference is small. The cumulative effect on adoption
        is enormous, because adoption is a function of friction and friction
        compounds.
      </p>

      <h3>React Native cannot read CSS</h3>
      <p>
        If your design system spans web and mobile — and it almost certainly
        will, eventually — CSS variables are dead weight on the mobile side.
        React Native does not have a CSSOM. Your iOS and Android apps will
        end up with a parallel <code>tokens.ts</code> hand-maintained next to
        the canonical CSS file, and the two will drift the first week.
      </p>
      <p>
        I have done this. I do not recommend it.
      </p>

      <h3>No transformability</h3>
      <p>
        Modern token pipelines emit your tokens in five formats: CSS variables
        for web, JS modules for React, JSON for design tools, native iOS color
        assets, native Android XML. Style Dictionary, Theo, the various
        successors — they all consume structured input and produce platform
        outputs.
      </p>
      <p>
        Structured input means JSON, YAML, or TS. CSS is not structured input.
        It is a target. If your tokens live in CSS, your transform pipeline is
        a series of ad-hoc parsers, each one fragile, each one a place for
        bugs to live.
      </p>

      <h3>Theming gets brittle past color</h3>
      <p>
        The classic argument for CSS variables is theming. Toggle a class on{' '}
        <code>:root</code>, swap the values, every component updates. This
        works beautifully for color. It works passably for typography. It
        breaks down for breakpoints, motion durations, animation curves, and
        every other token category that participates in JavaScript decisions.
      </p>
      <p>
        At some point your animation code wants to read a duration. CSS
        variables can be read from JS, but the syntax is awkward and the
        values come back as strings that you have to parse. A typed token
        object hands you a number.
      </p>

      <h2>The pattern that scales</h2>
      <p>
        Tokens live in a TypeScript file. That file is the source of truth.
        Everything else is generated.
      </p>

      <pre><code>{`// tokens.ts
export const tokens = {
  color: {
    primary: {
      50:  '#F5F3FF',
      500: '#7C3AED',
      900: '#3B1D87',
    },
    accent: {
      400: '#F0ABFC',
    },
  },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 4, md: 8, lg: 16, full: 9999 },
  motion: {
    duration: { fast: 120, base: 180, slow: 240 },
    easing: { standard: [0.2, 0.7, 0.3, 1] },
  },
} as const;

export type Tokens = typeof tokens;`}</code></pre>

      <p>
        The <code>as const</code> is doing real work. It tells TypeScript to
        treat every value as a literal — so <code>tokens.space.md</code> has
        type <code>16</code>, not <code>number</code>. Your components get
        narrow types for free.
      </p>
      <p>
        From this single source you generate everything else. A small build
        script — fewer than fifty lines for the common cases — reads the TS
        object and emits:
      </p>
      <ul>
        <li>
          <code>tokens.css</code> with the same values as CSS custom
          properties, for any consumer (a marketing site, a CMS theme, a
          legacy app) that prefers them.
        </li>
        <li>
          <code>tokens.json</code> for design tools that ingest tokens via the
          W3C draft format.
        </li>
        <li>
          Platform files for iOS and Android if you need them.
        </li>
      </ul>

      <p>
        Components consume the typed object directly:
      </p>

      <pre><code>{`import { tokens } from '@org/tokens';

const styles = {
  padding: tokens.space.md,
  borderRadius: tokens.radius.lg,
  backgroundColor: tokens.color.primary[500],
};`}</code></pre>

      <p>
        Web, mobile, and tooling all consume the same source. Theme switching
        becomes "import a different tokens object" — usually achieved with a
        Provider that hands the tokens down through context. Color is just one
        of many axes that can switch. Spacing scales for density modes,
        motion durations for reduced-motion preferences, breakpoint sets for
        embedded contexts — all become possible because tokens are objects,
        not strings glued into a stylesheet.
      </p>

      <h2>The honest concession</h2>
      <p>
        CSS variables are still useful. They are excellent for runtime theme
        switching when the only thing changing is color and you want to avoid
        re-rendering the React tree. They are excellent for letting end users
        customize a small surface. They are excellent for interop with code
        you do not control.
      </p>
      <p>
        Use them as an output. Generate them from your typed source. Never
        let them be the place where the value is defined.
      </p>

      <h2>Treat tokens like a database schema</h2>
      <p>
        The mental shift that helped me most was treating tokens as
        infrastructure rather than as styling. A token is a contract. A
        contract has a single canonical version, with generated views into the
        languages and platforms that need to consume it. You do not let one
        consumer become the source. You write the schema once, generate the
        views, and let the views go stale only when you regenerate them.
      </p>
      <p>
        Your design system is going to outlast your current framework choices.
        It is going to outlast the engineers who built it. Putting the source
        of truth somewhere typed, transformable, and platform-agnostic is the
        single highest-leverage decision you can make for its longevity.
      </p>
    </>
  ),
};
