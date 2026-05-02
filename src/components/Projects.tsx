import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { data, type Project } from '../data';
import { SectionLabel } from './SectionLabel';

export function Projects() {
  return (
    <section className="aur-section" id="projects">
      <SectionLabel num="04" title="Selected work" caption="case studies · 2020–2025" />
      <div className="aur-proj-grid">
        {data.projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const raf = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const flush = () => {
    raf.current = null;
    const el = ref.current;
    const pos = pending.current;
    if (!el || !pos) return;
    const r = el.getBoundingClientRect();
    const px = (pos.x - r.left) / r.width - 0.5;
    const py = (pos.y - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${py * -6}deg`);
    el.style.setProperty('--ry', `${px * 8}deg`);
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    pending.current = { x: e.clientX, y: e.clientY };
    if (raf.current == null) raf.current = requestAnimationFrame(flush);
  };
  const onLeave = () => {
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <Link
      ref={ref}
      to={`/work/${p.slug}`}
      data-mag
      className={`aur-proj aur-proj-${idx === 0 ? 'wide' : 'reg'}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="aur-proj-glow" />
      <div className="aur-proj-tag">
        <span>{p.tag}</span>
        <span>·</span>
        <span>{p.year}</span>
      </div>
      <h3 className="aur-proj-name">{p.name}</h3>
      <p className="aur-proj-sum">{p.summary}</p>
      <div className="aur-proj-metrics">
        {p.metrics.map((m, j) => (
          <div key={j} className="aur-proj-metric">
            <div className="aur-proj-mv">{m.v}</div>
            <div className="aur-proj-ml">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="aur-proj-stack">
        {p.stack.map((s) => (
          <span key={s} className="aur-chip">
            {s}
          </span>
        ))}
      </div>
      <div className="aur-proj-cta">
        Read case study
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}
