import type { Article } from '../types';

export const designingComponentsClaudeUnderstands: Article = {
  slug: 'designing-components-claude-understands',
  title: 'Designing components Claude actually understands',
  dek: 'Six rules for building a component library that an LLM can use as fluently as your senior engineers do.',
  tag: 'AI · DS',
  readTime: '8 min',
  date: 'April 14, 2026',
  dateISO: '2026-04-14',
  body: (
    <>
      <p>
        Last quarter I watched a junior engineer ask Claude to build a settings
        page using our design system. Claude generated something that looked
        plausible — a page with a header, a list, a few toggles. Every single
        component on it was a raw <code>{'<div>'}</code>. We have eighty-six
        components. None of them showed up.
      </p>
      <p>
        That was the moment I stopped treating our design system docs as
        documentation and started treating them as the system prompt for every
        engineer — human and otherwise — who would ever touch our codebase.
      </p>
      <p>
        Six months later, the same prompt produces a page wired up with our
        Stack, our SettingsRow, our Toggle, our SectionHeader. Every spacing
        value lands on a token. Every label uses our typography scale. Nothing
        in the runtime changed. We changed how the components describe
        themselves.
      </p>

      <h2>1. Names that describe the thing, not the trend</h2>
      <p>
        Our first instinct was clever. We had a <code>{'<VStack>'}</code> and an{' '}
        <code>{'<HStack>'}</code>. They were tight, they were familiar to anyone
        coming from SwiftUI or Chakra, and they read well in JSX. They were
        also a tribal vocabulary. Claude consistently reached for{' '}
        <code>{'<div style={{display:"flex"}}>'}</code> instead because the
        relationship between "I want a vertical stack" and{' '}
        <code>{'<VStack>'}</code> requires a leap that the relationship between
        "vertical stack" and <code>{'<Stack direction="column">'}</code> does
        not.
      </p>
      <p>
        We renamed both to <code>{'<Stack>'}</code> with an explicit{' '}
        <code>direction</code> prop. Claude's hit rate on stack components
        jumped from roughly forty percent to nearly ninety overnight. The
        lesson was not "be verbose." The lesson was that the closer your
        component name reads to the English description of what it does, the
        more likely a model is to pick it.
      </p>
      <p>
        Treat names as a documentation surface. They are the first thing
        anyone reads — the only thing some readers will ever read.
      </p>

      <h2>2. Strict, narrow prop types</h2>
      <p>
        A loose API is a generous API to a human and a hostile API to a
        machine. If your <code>size</code> prop accepts a string, the universe
        of plausible values is infinite. If it accepts a literal union of{' '}
        <code>'sm' | 'md' | 'lg'</code>, the universe is three.
      </p>
      <p>
        Narrow types do three useful things at once:
      </p>
      <ul>
        <li>They give your IDE enough information to autocomplete.</li>
        <li>
          They become the JSON Schema for your MCP server's tool inputs, almost
          for free.
        </li>
        <li>
          They make code review trivial. Either the value is in the union or it
          is not.
        </li>
      </ul>
      <p>
        Pair the union with a JSDoc comment that explains the shape of each
        variant. The comment will surface in editor hovercards, in your
        Storybook autodocs, and — if you wire it up — in the description field
        of every MCP tool you expose.
      </p>

      <pre><code>{`/**
 * Visual prominence of the button.
 *
 * - 'primary'   — the single most important action on the surface
 * - 'secondary' — important but not the focal action
 * - 'ghost'     — minimal chrome, used in dense toolbars
 */
type Variant = 'primary' | 'secondary' | 'ghost';`}</code></pre>

      <h2>3. One variant axis at a time</h2>
      <p>
        I have lost months of my life to component APIs that sprouted three
        variant knobs. <code>intent</code>. <code>tone</code>.{' '}
        <code>appearance</code>. Each one was added in good faith. Together
        they form a combinatorial nightmare with eighteen logically valid
        permutations and four that are visually defensible.
      </p>
      <p>
        A model trying to use such a component does what a junior engineer
        does: picks one knob, leaves the others at their default, ships
        something that looks slightly wrong. The fix is not better
        documentation. The fix is fewer knobs. Pick two axes — usually variant
        and size — and make every other expressive need a different component.
      </p>

      <h2>4. Compose from primitives, do not spawn megacomponents</h2>
      <p>
        The temptation to build a single <code>{'<Card>'}</code> that accepts a{' '}
        <code>header</code>, a <code>footer</code>, an <code>actions</code>{' '}
        slot, a <code>media</code> slot, an <code>orientation</code>, and a{' '}
        <code>density</code> is enormous. Resist it.
      </p>
      <p>
        Give the consumer slots. Let composition do the work:
      </p>

      <pre><code>{`<Card>
  <Card.Media src={image} />
  <Card.Body>
    <Stack gap={2}>
      <Heading level={3}>{title}</Heading>
      <Text muted>{description}</Text>
    </Stack>
  </Card.Body>
  <Card.Actions>
    <Button variant="ghost">Dismiss</Button>
    <Button>Continue</Button>
  </Card.Actions>
</Card>`}</code></pre>

      <p>
        This reads well to a human. It also reads well to a model, because each
        line is a single decision with a single right answer. There is no
        ten-property monolith to misconfigure.
      </p>

      <h2>5. Document with examples that run</h2>
      <p>
        Prose documentation has a half-life of about a quarter. Examples that
        compile do not rot — the first time the build breaks, someone fixes
        them.
      </p>
      <p>
        Put your examples in <code>@example</code> JSDoc blocks on the
        component itself. They will appear in editor hovercards. They will
        appear in your Storybook autodocs. If your MCP server exposes the
        component schema, the examples become the few-shot prompt that ships
        with every tool call. You write the example once and it is consumed in
        five places.
      </p>

      <h2>6. Stable surface across breaking visual changes</h2>
      <p>
        Six months of accumulated AI-generated code is a real artifact. It
        lives in your repo. It lives in PR descriptions. It lives in the
        prompts your engineers have saved. The day you rename{' '}
        <code>variant</code> to <code>style</code> on your most-used component,
        every one of those artifacts becomes a subtle source of bugs.
      </p>
      <p>
        Visual changes are cheap. API changes compound. When you find yourself
        wanting to rename a prop, ask whether the new name is significantly
        clearer to a reader who has never seen either. Most of the time the
        answer is no, and the rename is taste dressed as improvement.
      </p>

      <h2>The point</h2>
      <p>
        A design system is a contract with the engineers who consume it. When
        the consumers were exclusively human, the contract could be loose,
        because humans are good at filling in gaps. The consumers are no
        longer exclusively human. Tightening the contract — clearer names,
        narrower types, fewer knobs, composable primitives, runnable examples,
        stable surface — is the cheapest leverage you have on the quality of
        every UI your team will ship for the next decade.
      </p>
      <p>
        It is also, charmingly, the same set of changes that make the system
        easier for the humans.
      </p>
    </>
  ),
};
