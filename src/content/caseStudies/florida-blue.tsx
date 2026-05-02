import type { CaseStudy } from './types';

export const floridaBlue: CaseStudy = {
  slug: 'florida-blue',
  name: 'Florida Blue Member Application',
  tag: 'Healthcare · Web + iOS + Android',
  year: '2023 — 2025',
  role: 'Senior React / React Native Developer',
  client: 'Florida Blue / Blue Cross Blue Shield · via SmartInt → Lanco Global → Zia Global',
  dek: '2.5 years on a single member-facing healthcare engagement across three contracting employers — public-facing app on web and React Native covering search, claims, providers, and a tabbed cost / compare / map experience. Every page in production.',
  metrics: [
    { v: '2.5y', l: 'on this engagement' },
    { v: 'Web + RN', l: 'unified UX' },
    { v: 'Prod', l: 'all pages live' },
    { v: '2', l: 'devs mentored' },
  ],
  stack: ['React', 'React Native', 'TypeScript', 'Redux', 'REST APIs'],
  body: (
    <>
      <h2>The engagement, in one sentence</h2>
      <p>
        Florida Blue is the Blue Cross Blue Shield carrier for the state of
        Florida. Their public-facing member application is how millions of
        members search for in-network providers, view their claims, compare
        plan costs, and manage their relationship with the carrier. It runs on
        the web and on React Native for iOS and Android, from a shared design
        language and overlapping codebase patterns.
      </p>
      <p>
        I worked on this application for two and a half years across three
        successive contracting employers — SmartInt, Lanco Global Systems,
        Zia Global. The engagement and the codebase remained continuous; the
        contracting paperwork is what changed. From a recruiter's perspective
        this is one long stable engagement on a high-stakes member app, not
        three short stints.
      </p>

      <h2>What I shipped</h2>
      <p>
        Across the engagement I shipped to production every part of the
        in-network and out-of-network member experience. The high-impact work:
      </p>

      <h3>Out-of-network pages flow</h3>
      <p>
        Started during my CPT period (Jan – Apr 2023). The OON pages were the
        first thing I owned end-to-end — redesigning the entire flow from
        landing through cost estimate. A member who tapped on an out-of-network
        provider used to hit a deadend; the redesign threaded them through
        cost-estimate, claim-projection, and a "switch to in-network" CTA
        without losing context.
      </p>

      <h3>In-network provider search</h3>
      <p>
        The biggest single body of work. Built and grew the in-network search
        across multiple screens — the search itself, the result list, and the
        provider detail pages. Filters span specialty, distance, language,
        accepting-new-patients, and dozens of plan-specific signals. Both the
        web and mobile versions stayed feature-parallel, sharing redux slices
        where possible.
      </p>

      <h3>Provider list pages</h3>
      <p>
        Virtualized list of providers with infinite scroll on web and a
        native FlatList on mobile. Card layouts adapt to screen size — denser
        on web, more visual on mobile. Performance budget: 60fps scroll on
        mid-range Android devices.
      </p>

      <h3>Doctor profile pages</h3>
      <p>
        Per-provider page with credentials, accepted insurances, locations,
        ratings, and a unified "next available appointment" widget that
        federates across multiple scheduling backends.
      </p>

      <h3>Single-claim and multi-claim views</h3>
      <p>
        Claims are messy — one office visit can fan out into a dozen line
        items across providers and procedures. The single-claim view shows a
        normalized, plain-English explanation of what happened. The
        multi-claim view aggregates over a date range and supports filtering,
        sorting, and CSV export.
      </p>

      <h3>The tabbed provider experience</h3>
      <p>
        On a provider detail page, members get a tab strip covering:
      </p>
      <ul>
        <li><b>Cost details</b> — estimated out-of-pocket for the plan they're on, broken out by procedure category.</li>
        <li><b>Compare providers</b> — side-by-side comparison of two or three providers across cost, ratings, distance, accepting-new-patients status.</li>
        <li><b>Select providers</b> — designate a primary care provider, with the workflow that triggers on the carrier's side.</li>
        <li><b>Edit providers</b> — modify the assigned PCP after the fact, including the explanation page that walks through the implications.</li>
        <li><b>Location map</b> — a live map view with markers for every location of the provider, address details, and directions.</li>
      </ul>

      <h2>Cross-cutting work</h2>
      <p>
        Beyond features, two streams of platform-level work ran continuously:
      </p>
      <ul>
        <li>
          <b>React major-version upgrades</b> — drove the codebase through
          successive React upgrades, including the legacy lifecycle methods
          and the deprecated ref patterns. The upgrade path crosses a lot of
          legacy code, especially on the mobile side, and the trick was
          shipping incrementally without breaking other teams.
        </li>
        <li>
          <b>Security-vulnerability remediation</b> — closed out a long
          backlog of CVEs from the dependency tree, including some that
          required upstream fixes or replacement libraries. Sustained feature
          velocity throughout.
        </li>
      </ul>

      <h2>Mentorship</h2>
      <p>
        Across the engagement I mentored two developers as they ramped up.
        Reviewed every one of their pull requests, assigned stories from the
        JIRA backlog at a rate that stretched but didn't drown them, and
        paired daily on the trickier problems — the React Native gesture
        edge cases, the multi-claim aggregation logic, the provider-search
        URL shape. Both landed their first production features cleanly and
        ramped to independent contribution within their first cycle.
      </p>

      <h2>The team</h2>
      <p>
        JIRA-driven, sprint-based, regular production releases, active
        code-review culture. The kind of team where the velocity comes from
        the discipline of the process, not from heroics.
      </p>
    </>
  ),
};
