import { useState } from 'react';
import { data } from '../data';
import { SectionLabel } from './SectionLabel';

const groups = Object.entries(data.skills);

export function Skills() {
  const [active, setActive] = useState(0);
  return (
    <section className="aur-section" id="skills">
      <SectionLabel num="02" title="Skills" caption="the toolkit, grouped" />
      <div className="aur-skills">
        <div className="aur-skill-tabs">
          {groups.map(([name], i) => (
            <button
              key={name}
              data-mag
              className={`aur-skill-tab ${i === active ? 'aur-skill-tab-on' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="aur-skill-tab-num">0{i + 1}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
        <div className="aur-skill-stage">
          <ConstellationSVG items={groups[active][1]} key={active} />
        </div>
      </div>
    </section>
  );
}

function ConstellationSVG({ items }: { items: string[] }) {
  const W = 720,
    H = 360;
  const cx = W / 2,
    cy = H / 2;
  const a = 280,
    b = 130;
  const pts = items.map((label, i) => {
    const t = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const jitter = (((i * 53) % 17) / 17) * 18 - 9;
    return {
      label,
      x: cx + Math.cos(t) * (a + jitter),
      y: cy + Math.sin(t) * (b + jitter),
      delay: i * 80,
    };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="aur-constellation">
      <defs>
        <radialGradient id="auroraStar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity=".6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {pts.map((p, i) => {
        const next = pts[(i + 1) % pts.length];
        return (
          <line
            key={`l${i}`}
            x1={p.x}
            y1={p.y}
            x2={next.x}
            y2={next.y}
            className="aur-const-line"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        );
      })}
      {pts.map((p, i) => (
        <g key={`g${i}`} className="aur-star" style={{ animationDelay: `${p.delay}ms` }}>
          <circle cx={p.x} cy={p.y} r="22" className="aur-const-halo" />
          <circle cx={p.x} cy={p.y} r="3.5" className="aur-const-dot" />
          <text
            x={p.x}
            y={p.y + 28}
            textAnchor="middle"
            className="aur-constellation-label"
            fontSize="13"
            fontFamily="ui-sans-serif, system-ui"
            fontWeight="500"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
