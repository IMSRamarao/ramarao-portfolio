import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data';

type Line = { p: string; t: string; d: number };

const lines: Line[] = [
  { p: '$ ', t: 'whoami', d: 80 },
  { p: '→ ', t: 'Ramarao Iragavarapu // senior frontend dev · 7+ yrs', d: 28 },
  { p: '$ ', t: 'currently', d: 60 },
  { p: '→ ', t: 'shipping the Dream DS + Dream MCP at UWM', d: 28 },
  { p: '$ ', t: 'open_to_work', d: 80 },
  { p: '→ ', t: 'yes ✶ react / RN / DS / AI roles ✶ remote or hybrid', d: 28 },
];

const clientLogos = ['UWM', 'Florida Blue', 'BCBS', 'Baylor Scott & White', 'Atos'];

export function Hero() {
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[step];
    const total = line.p.length + line.t.length;
    if (chars >= total) {
      const t = setTimeout(() => {
        setStep((s) => s + 1);
        setChars(0);
      }, 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChars((c) => c + 1), line.d);
    return () => clearTimeout(t);
  }, [step, chars]);

  return (
    <section className="aur-hero" id="hero">
      <div className="aur-hero-grid">
        <div className="aur-hero-left">
          <div className="aur-tag">
            <span className="aur-tag-dot" /> SENIOR FRONTEND · MOBILE · AI / MCP
          </div>

          <h1 className="aur-hero-title">
            <span className="aur-hero-name">{data.name}</span>
            <span className="aur-hero-role">
              {data.role} · <em>7+ years</em> · {data.location.split(',')[0]}
            </span>
          </h1>

          <p className="aur-hero-pitch">
            I build the seam where <em>design systems meet AI tooling</em>. Currently leading
            frontend on the <strong>Dream Design System</strong> (86 components, 560+ tokens) and
            the <strong>Dream MCP</strong> server at UWM — a Claude integration that scaffolds
            full pages from a single prompt using only DS primitives.
          </p>

          <div className="aur-hero-stack">
            {['React', 'React Native', 'TypeScript', 'MCP', 'Design Systems'].map((s) => (
              <span key={s} className="aur-hero-chip">{s}</span>
            ))}
          </div>

          <div className="aur-hero-cta">
            <a
              className="aur-btn aur-btn-pri"
              data-mag
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download résumé</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
            <Link className="aur-btn aur-btn-ghost" data-mag to="/demo">
              <span>Try MCP Live Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="aur-logos">
            <div className="aur-logos-l">Trusted by</div>
            <div className="aur-logos-row">
              {clientLogos.map((c, i) => (
                <span key={c} className="aur-logo-mark">
                  {c}
                  {i < clientLogos.length - 1 && <span className="aur-logo-sep">·</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="aur-hero-stats">
            {data.metrics.map((m) => (
              <div key={m.label} className="aur-stat">
                <div className="aur-stat-v">{m.value}</div>
                <div className="aur-stat-l">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="aur-hero-right">
          <div className="aur-hero-photo">
            <img src="/headshot.jpg" alt={data.name} />
            <div className="aur-photo-glow" />
            <div className="aur-photo-frame" />
            <div className="aur-photo-tag">
              <span className="aur-photo-tag-dot" /> Pontiac, MI · GMT-5
            </div>
          </div>

          <div className="aur-term">
            <div className="aur-term-bar">
              <span className="aur-term-dot" style={{ background: '#ff5f56' }} />
              <span className="aur-term-dot" style={{ background: '#ffbd2e' }} />
              <span className="aur-term-dot" style={{ background: '#27c93f' }} />
              <span className="aur-term-title">~ / ramarao · zsh</span>
              <span className="aur-term-time">11:42</span>
            </div>
            <div className="aur-term-body">
              {lines.slice(0, step + 1).map((l, i) => {
                const isCurrent = i === step;
                const total = l.p.length + l.t.length;
                const shown = isCurrent ? chars : total;
                const ptxt = l.p.slice(0, Math.min(shown, l.p.length));
                const ttxt = l.t.slice(0, Math.max(0, shown - l.p.length));
                const isCmd = l.p.startsWith('$');
                return (
                  <div key={i} className={`aur-term-line ${isCmd ? 'aur-cmd' : 'aur-out'}`}>
                    <span className="aur-term-prompt">{ptxt}</span>
                    <span>{ttxt}</span>
                    {isCurrent && !done && <span className="aur-caret" />}
                  </div>
                );
              })}
              {done && (
                <div className="aur-term-line aur-cmd">
                  <span className="aur-term-prompt">$ </span>
                  <span className="aur-caret" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
