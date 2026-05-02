import type { CaseStudy } from './types';

export const trackItEventManager: CaseStudy = {
  slug: 'track-it-event-manager',
  name: 'Track-IT + Event Manager',
  tag: 'Internal · Mentorship · Agile',
  year: '2020',
  role: 'React Native Developer',
  client: 'Atos Syntel · Internal training engagements',
  dek: 'Two internal applications I shipped at Atos while mentoring a team of 10 junior developers through the full Agile lifecycle. The product was secondary; the muscle memory the team built was the real shipped artifact.',
  metrics: [
    { v: '10', l: 'devs mentored' },
    { v: '2', l: 'demo apps shipped' },
    { v: 'Full', l: 'Agile loop' },
    { v: '6 mo', l: 'from start to ship' },
  ],
  stack: ['React Native', 'React', 'Redux', 'JIRA', 'Agile / Scrum'],
  body: (
    <>
      <h2>The setup</h2>
      <p>
        I'd just completed Atos Syntel's intensive React + React Native
        training program. The next assignment wasn't a client engagement — it
        was something more interesting. Lead two internal projects, mentor a
        team of ten junior developers fresh out of training, and run the
        whole thing through a real Agile cadence so the team would graduate
        with the muscle memory they'd need on a paying client.
      </p>
      <p>
        I was effectively a player-coach. Built the architecture, wrote the
        hardest parts, and spent the rest of my time making sure ten people
        with three months of React experience could ship clean code on
        deadline.
      </p>

      <h2>Project 1 — Track-IT</h2>
      <p>
        Track-IT was an asset management system. Internal company tool: who
        has the laptop, who has the projector, who has the office chair —
        with a request flow, an admin approval queue, and a locker
        management module. The kind of app every company has and most
        companies hate using.
      </p>
      <p>
        I split the work into vertical slices — request flow, approval flow,
        admin dashboard, locker module. Each junior owned a slice and shipped
        it end-to-end with my review. We used React on web and shared the
        Redux layer with the React Native version, which let the team see
        what code reuse actually looks like in practice rather than in
        theory.
      </p>

      <h2>Project 2 — Event Management</h2>
      <p>
        The second project was an event management application — create
        events, invite attendees, RSVP, send notifications, track attendance.
        Less administrative than Track-IT, more engaging UI work, more state
        to manage. Good vehicle for the team to practice the patterns we'd
        established and stretch a bit.
      </p>

      <h2>How I ran the team</h2>
      <p>
        The whole engagement was the Agile loop in miniature. We did:
      </p>
      <ul>
        <li>
          <b>Sprint planning</b> — broke epics into stories, sized them,
          assigned ownership. I made sure every junior had stretch work but
          not impossible work.
        </li>
        <li>
          <b>Daily standups</b> — fifteen minutes, three questions, no
          status theatre. I taught the team to flag blockers explicitly
          rather than soften them.
        </li>
        <li>
          <b>Backlog refinement</b> — we did this religiously. Half of
          shipping on time is having a backlog that someone else can pick up
          on Monday morning.
        </li>
        <li>
          <b>Sprint demos</b> — every other Friday, the team presented to
          stakeholders. Each junior demoed the work they'd shipped. This was
          the highest-leverage thing I did — making them practice the demo,
          including the parts where you explain a tradeoff to a non-engineer.
        </li>
        <li>
          <b>Retros</b> — what worked, what didn't, what's one thing we'll
          change. The team got better every cycle, which is the whole point
          of a retro.
        </li>
      </ul>

      <h2>What I actually shipped</h2>
      <p>
        Two working applications. But the real artifact was the ten engineers
        who came out of those six months ready to contribute to client work.
        Several of them ended up on my team again on Baylor Scott & White
        later that year. They knew how to write a story, how to estimate it,
        how to ship it, how to demo it, and how to take feedback in a retro
        without taking it personally.
      </p>

      <h2>The lesson I took with me</h2>
      <p>
        Mentoring is a force multiplier. The hours I spent in code review on
        a junior's pull request paid back ten times over when that junior
        shipped their next ten features without needing the same review
        intensity. The patterns you set early in someone's career are the
        ones they carry to every team after.
      </p>
      <p>
        Five years later, when I'm reviewing PRs from two new developers on
        the Florida Blue engagement, I'm still using the playbook from this
        Atos rotation.
      </p>
    </>
  ),
};
