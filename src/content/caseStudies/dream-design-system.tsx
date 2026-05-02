import type { CaseStudy } from './types';

export const dreamDesignSystem: CaseStudy = {
  slug: 'dream-design-system',
  name: 'Dream Design System',
  tag: 'Design System · React · MUI',
  year: '2025 — present',
  role: 'Senior Frontend Developer',
  client: 'United Wholesale Mortgage',
  dek: 'An 86-component design system with 560+ tokens, 607 icons, dual theme palettes, and a Claude-aware MCP layer — used by every product team in the organization.',
  metrics: [
    { v: '86', l: 'components shipped' },
    { v: '560+', l: 'design tokens' },
    { v: '607', l: 'icons curated' },
    { v: '~20', l: 'I authored' },
  ],
  stack: ['React', 'TypeScript', 'MUI', 'Storybook', 'Figma', 'Reanimated'],
  body: (
    <>
      <h2>The context</h2>
      <p>
        UWM has multiple product teams shipping broker-facing tooling — web,
        iOS, Android — to thousands of mortgage professionals every day. Before
        the Dream Design System, every team built its own buttons, forms,
        spacing decisions, and color palette. The result was the obvious one:
        visual fragmentation, engineering duplication, and a design review
        cycle that scaled with the number of teams instead of the size of the
        product.
      </p>
      <p>
        The mandate was straightforward. Build a single design system any team
        in the org can pull from, with strong type safety, consistent visual
        language, and full coverage across web and mobile.
      </p>

      <h2>The architecture</h2>
      <p>
        The system has three layers that compose into everything else:
      </p>
      <ul>
        <li>
          <b>Tokens</b> — 560+ values for color, spacing, radius, typography,
          motion durations, and breakpoints. Source of truth lives in a typed
          TS object; CSS variables, Figma styles, and platform files are
          generated from it.
        </li>
        <li>
          <b>Primitives</b> — Box, Stack, Text, Icon, Surface. The lego bricks
          every component is built from. Strict variant unions, no escape
          hatches into raw style props.
        </li>
        <li>
          <b>Components</b> — 86 production components covering forms,
          navigation, feedback, data display, layout, and content. Two theme
          palettes ship by default; teams opt into either depending on product
          context.
        </li>
      </ul>

      <h2>The 20+ components I authored</h2>
      <p>
        I wrote roughly twenty of the more complex components from scratch or
        by extending MUI primitives and re-tuning them to our brand's type
        ramp, color semantics, and motion curves. Selected highlights:
      </p>
      <ul>
        <li>
          <b>Gauge</b> — animated SVG arc with configurable threshold ranges
          (good / warning / critical), accessible labels, and theme-aware
          color stops. Used across performance dashboards.
        </li>
        <li>
          <b>Bar Chart and Pie Chart</b> — SVG-based, theme-aware fills,
          keyboard-navigable legends, screen-reader summaries. Built without
          a chart library so the rendering is deterministic.
        </li>
        <li>
          <b>PDF Viewer</b> — embedded preview with scroll, zoom, and
          download; works inline in pages or in an overlay modal.
        </li>
        <li>
          <b>Slider</b> — single and range variants, custom thumb shapes, full
          keyboard support, value bubble that follows the thumb.
        </li>
        <li>
          <b>Autocomplete</b> — async data fetching, virtualized result list,
          full keyboard navigation, multi-select variant.
        </li>
        <li>
          <b>Stepper</b> — horizontal and vertical orientations, branching
          states (active, completed, error), customizable step content.
        </li>
        <li>
          <b>Action Icon</b> — icon + label combo with hover, focus, and
          tooltip states; reusable across toolbars and dense layouts.
        </li>
        <li>
          <b>Time Picker</b> — 12 / 24-hour modes, granularity options
          (5 / 15 / 30 minutes), keyboard-only flow.
        </li>
        <li>
          <b>Date Range Picker</b> — dual-calendar layout, preset ranges
          ("Last 7 days", "This month"), locale-aware formatting.
        </li>
        <li>
          <b>Audio Player and Video Player</b> — custom controls, scrubbing,
          captions, picture-in-picture. Themed to match the rest of the
          system.
        </li>
      </ul>
      <p>
        Each lived in Storybook with documented props, examples, accessibility
        notes, and design-review screenshots. A junior engineer can find the
        right component in seconds; a senior can read its API surface and
        immediately know how it composes.
      </p>

      <h2>How I worked</h2>
      <p>
        Closely partnered with the design team in Figma — every component had
        a synchronized design spec, a Storybook story, and a code
        implementation that all referenced the same tokens. Reviewed PRs from
        every other DS contributor; ran weekly design-engineering syncs to
        flag inconsistencies before they shipped.
      </p>
      <p>
        The bug-fix throughput on the catalog became its own art form. I
        touched and tweaked virtually every component over the year — not
        because they were broken, but because the right answer for a component
        API only emerges when you've watched five product teams try to use
        it.
      </p>

      <h2>The outcome</h2>
      <p>
        Every product team in the organization now consumes Dream DS. Net
        reduction in component duplication. Design review cycles shrank
        because the visual decisions were already made. New product teams
        onboard in days instead of weeks because the patterns are documented
        in code, not a wiki nobody reads.
      </p>
      <p>
        And the system became the foundation for the Dream MCP — which is its
        own story.
      </p>
    </>
  ),
};
