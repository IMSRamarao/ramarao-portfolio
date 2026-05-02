import type { CaseStudy } from './types';

export const baylorScottWhite: CaseStudy = {
  slug: 'baylor-scott-white',
  name: 'Baylor Scott & White',
  tag: 'Healthcare · Mobile · React Native',
  year: '2020 — 2021',
  role: 'React Native Developer',
  client: 'Baylor Scott & White Hospital · via Atos Syntel',
  dek: 'Member-facing mobile app for one of the largest hospital systems in Texas. I built two anchor features: a Virtual Waiting Room with hotspot-driven layered animations, and the Prayer Wall — a community feed with full social CRUD and gesture-driven swipe interactions.',
  metrics: [
    { v: '2', l: 'anchor features' },
    { v: 'Gestures', l: 'native feel' },
    { v: 'CSS', l: 'where I sharpened' },
    { v: '60fps', l: 'animation budget' },
  ],
  stack: ['React Native', 'Redux', 'CSS animations', 'Gesture Handler', 'JavaScript'],
  body: (
    <>
      <h2>The context</h2>
      <p>
        Baylor Scott & White is one of the largest non-profit hospital systems
        in Texas. Their patient-facing mobile application is how members
        check in for visits, view records, manage appointments, and engage
        with the community around their care. I joined the project at Atos
        Syntel after completing the React + React Native training program,
        and worked on two of the app's marquee features.
      </p>

      <h2>Feature 1 — The Virtual Waiting Room</h2>
      <p>
        The waiting room was an attempt to solve a small, real problem:
        patients sit in a clinic for forty minutes wondering what's happening
        behind the scenes. Are they next? What's the doctor doing? Why the
        delay?
      </p>
      <p>
        The Virtual Waiting Room replaced that anxiety with a transparent
        view of the visit workflow. When a patient checked in, the screen
        showed a stylized illustration of the clinic with hotspots — small
        interactive markers placed over key parts of the room. Tap a hotspot
        and a layered animation reveals what's happening at that station: the
        nurse calling the next patient, the doctor reviewing charts, the lab
        running tests.
      </p>
      <p>
        The animation was the trickiest part. Each hotspot triggered a
        sequence of layered SVG and image transformations — a fade, a scale,
        a slide, a stagger — composed into a coherent storyboard. CSS
        keyframes did the heavy lifting; React Native's Animated API handled
        the gesture-driven entry. The performance budget was strict because
        the target devices included mid-range Android phones with limited
        GPU.
      </p>
      <p>
        This is where my CSS animation chops sharpened. I learned what
        actually triggers GPU compositing, what causes layout thrash, and how
        to debug a frame budget on a device three years older than your
        laptop.
      </p>

      <h2>Feature 2 — The Prayer Wall</h2>
      <p>
        The Prayer Wall was a community feed where members could post
        prayers — for themselves, for loved ones, for the staff caring for
        them — and others could read, like, and comment. It's a social
        feature in a healthcare app, which means the bar for trust is high
        and the UI patterns from a regular social app don't always transfer.
      </p>
      <p>
        I built the full social CRUD: post, like, comment, edit, delete.
        The deletion flow was where I sharpened the gesture work.
      </p>

      <h3>Swipe-to-delete</h3>
      <p>
        Members could swipe a prayer card to reveal a delete action. The
        interaction had to feel native — start with the touch, follow the
        finger smoothly, snap to either the open state or the closed state
        based on velocity, and animate the deletion itself with a
        slide-and-fade rather than a hard pop.
      </p>
      <p>
        The implementation used React Native Gesture Handler for the pan,
        Animated for the position interpolation, and the LayoutAnimation API
        for the deletion collapse. Tuning the spring constants took longer
        than writing the code; the difference between "feels right" and
        "feels off" is about ten units of damping that you can only find by
        feeling.
      </p>

      <h3>Other social interactions</h3>
      <p>
        The like animation was a heart that scaled, paused, and settled —
        deliberately referenceable to other social apps because muscle
        memory matters. Comments expanded inline with a height animation
        that respected the keyboard. Editing flipped the card into an
        editable state without remounting the component, preserving cursor
        position and avoiding a jarring transition.
      </p>

      <h2>The lesson I took with me</h2>
      <p>
        Animation, done right, is feedback — not decoration. Every motion in
        a UI is communicating something about the relationship between the
        user's input and the system's response. When the animation is right,
        the UI feels like it understands you. When it's wrong, the UI feels
        broken even if everything works correctly.
      </p>
      <p>
        Five years later, when I'm tuning a Reanimated worklet at UWM, I'm
        still running the same heuristics I learned on Baylor Scott & White.
      </p>
    </>
  ),
};
