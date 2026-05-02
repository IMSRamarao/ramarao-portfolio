import { useEffect, useRef, useState } from 'react';
import { data } from '../data';
import { SectionLabel } from './SectionLabel';

export function About() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.1 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="aur-section aur-about" id="about" ref={ref}>
      <SectionLabel num="01" title="About" caption="story · philosophy" />
      <div className="aur-about-grid">
        <div className="aur-about-copy">
          {data.story.map((p, i) => (
            <p
              key={i}
              className={`aur-prose ${inView ? 'aur-in' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {p}
            </p>
          ))}
        </div>
        <div className="aur-about-side">
          <div className="aur-glass aur-pad">
            <div className="aur-mini-h">Currently</div>
            <div className="aur-mini-list">
              <div>
                <span className="aur-bullet aur-b-em" /> Senior FE @ <strong>UWM</strong>
              </div>
              <div>
                <span className="aur-bullet" /> Building <strong>Dream DS</strong> + Dream MCP
              </div>
              <div>
                <span className="aur-bullet" /> Authored <strong>~20</strong> of 86 components
              </div>
              <div>
                <span className="aur-bullet" /> Open to senior FE / RN / DS / AI roles
              </div>
            </div>
          </div>
          <div className="aur-glass aur-pad">
            <div className="aur-mini-h">Principles</div>
            <ol className="aur-princ">
              <li>
                <b>The boring choice</b> is usually right.
              </li>
              <li>
                <b>API first</b> — the call site is the contract.
              </li>
              <li>
                <b>Animation</b> is feedback, not decoration.
              </li>
              <li>
                <b>Empty states</b> deserve as much love as happy paths.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
