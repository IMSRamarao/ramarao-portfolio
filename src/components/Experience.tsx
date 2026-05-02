import { data } from '../data';
import { SectionLabel } from './SectionLabel';

export function Experience() {
  return (
    <section className="aur-section" id="work">
      <SectionLabel num="03" title="Path" caption="six roles, one through-line" />
      <div className="aur-timeline">
        <div className="aur-tl-rail" />
        {data.experience.map((e, i) => (
          <div key={i} className="aur-tl-row">
            <div className="aur-tl-node" />
            <div className="aur-tl-year">{e.year}</div>
            <div className="aur-glass aur-tl-card" data-mag>
              <div className="aur-tl-head">
                <span className="aur-tl-role">{e.role}</span>
                <span className="aur-tl-co">@ {e.company}</span>
              </div>
              <div className="aur-tl-loc">{e.location}</div>
              <p className="aur-tl-sum">{e.summary}</p>
              <div className="aur-tl-stack">
                {e.stack.map((s) => (
                  <span key={s} className="aur-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
