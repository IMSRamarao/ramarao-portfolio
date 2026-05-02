import { useEffect, useState } from 'react';
import { data } from '../data';

type Line = { p: string; t: string; d: number };

const lines: Line[] = [
  { p: '$ ', t: 'whoami', d: 80 },
  { p: '→ ', t: 'Ramarao Iragavarapu // senior frontend dev · 7+ yrs', d: 28 },
  { p: '$ ', t: 'stack --primary', d: 60 },
  { p: '→ ', t: 'react · react native · typescript · mcp · design systems', d: 22 },
  { p: '$ ', t: 'currently', d: 70 },
  { p: '→ ', t: 'shipping a Claude-powered design system at UWM', d: 28 },
  { p: '$ ', t: 'open_to_work', d: 80 },
  { p: '→ ', t: 'yes ✶ react / RN / DS / AI roles ✶ remote or hybrid', d: 28 },
];

const marqueeText =
  'React · React Native · TypeScript · MCP · Claude · Design Systems · Tokens · A11y · Reanimated · Storybook · Figma API · Next.js · ';

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
            <span className="aur-tag-dot" /> SENIOR FRONTEND · MOBILE · AI
          </div>
          <h1 className="aur-hero-title">
            <span className="aur-line">
              <span className="aur-shimmer">Crafting</span> the quiet
            </span>
            <span className="aur-line">
              space between <em>code</em>
            </span>
            <span className="aur-line">
              and <span className="aur-grad">interface</span>.
            </span>
          </h1>
          <p className="aur-hero-sub">
            I'm Ramarao — a senior frontend developer building React, React Native and AI-augmented
            tooling. Lately I've been wiring our design system into a Claude-aware MCP server. It
            feels a bit like teaching a colleague where everything lives.
          </p>
          <div className="aur-hero-cta">
            <a className="aur-btn aur-btn-pri" data-mag href="#projects">
              <span>See selected work</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="aur-btn aur-btn-ghost" data-mag href="#contact">
              <span>Get in touch</span>
            </a>
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

          <div className="aur-hero-photo">
            <img src="/headshot.jpg" alt={data.name} />
            <div className="aur-photo-glow" />
            <div className="aur-photo-frame" />
            <div className="aur-photo-tag">
              <span className="aur-photo-tag-dot" /> Pontiac, MI · GMT-5
            </div>
          </div>
        </div>
      </div>

      <div className="aur-marquee" aria-hidden>
        <div className="aur-marquee-track">{marqueeText.repeat(6)}</div>
      </div>
    </section>
  );
}
