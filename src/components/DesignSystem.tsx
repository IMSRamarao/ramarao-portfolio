import { useState } from 'react';
import { SectionLabel } from './SectionLabel';

const swatches: [string, string][] = [
  ['primary.500', '#a78bfa'],
  ['primary.700', '#7c3aed'],
  ['accent.400', '#f0abfc'],
  ['accent.600', '#c026d3'],
  ['neutral.0', '#fefcff'],
  ['neutral.900', '#0c0a18'],
  ['info.500', '#22d3ee'],
  ['success.500', '#34d399'],
];

const spaces = [2, 4, 8, 12, 16, 24, 32, 48];

export function DesignSystem() {
  return (
    <section className="aur-section" id="ds">
      <SectionLabel num="06" title="Dream DS" caption="86 components in production" />
      <div className="aur-ds-grid">
        <div className="aur-glass aur-ds-card aur-ds-tokens">
          <div className="aur-ds-h">Color tokens</div>
          <div className="aur-ds-swatches">
            {swatches.map(([n, c]) => (
              <div key={n} className="aur-swatch">
                <div className="aur-swatch-c" style={{ background: c }} />
                <div className="aur-swatch-n">{n}</div>
                <div className="aur-swatch-h">{c}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="aur-glass aur-ds-card aur-ds-spacing">
          <div className="aur-ds-h">Spacing scale</div>
          <div className="aur-ds-spaces">
            {spaces.map((s) => (
              <div key={s} className="aur-space">
                <div className="aur-space-bar" style={{ width: s * 2 }} />
                <div className="aur-space-l">{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="aur-glass aur-ds-card aur-ds-comps">
          <div className="aur-ds-h">
            Components <span className="aur-ds-count">86</span>
          </div>
          <div className="aur-comp-grid">
            <div className="aur-comp-row">
              <span className="aur-comp-label">Button</span>
              <div className="aur-comp-set">
                <button className="aur-cb aur-cb-pri">Primary</button>
                <button className="aur-cb aur-cb-sec">Secondary</button>
                <button className="aur-cb aur-cb-ghost">Ghost</button>
              </div>
            </div>
            <div className="aur-comp-row">
              <span className="aur-comp-label">Input</span>
              <div className="aur-comp-set">
                <input className="aur-ci" placeholder="email@you.dev" defaultValue="" />
              </div>
            </div>
            <div className="aur-comp-row">
              <span className="aur-comp-label">Toggle</span>
              <div className="aur-comp-set">
                <DSToggle />
                <DSToggle initial />
              </div>
            </div>
            <div className="aur-comp-row">
              <span className="aur-comp-label">Badge</span>
              <div className="aur-comp-set">
                <span className="aur-badge aur-badge-ok">live</span>
                <span className="aur-badge aur-badge-warn">draft</span>
                <span className="aur-badge aur-badge-info">v2.4</span>
              </div>
            </div>
            <div className="aur-comp-row">
              <span className="aur-comp-label">Avatar</span>
              <div className="aur-comp-set aur-avatar-stack">
                <div
                  className="aur-avatar"
                  style={{ background: 'linear-gradient(135deg,#a78bfa,#f0abfc)' }}
                >
                  R
                </div>
                <div
                  className="aur-avatar"
                  style={{ background: 'linear-gradient(135deg,#22d3ee,#a78bfa)' }}
                >
                  K
                </div>
                <div
                  className="aur-avatar"
                  style={{ background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}
                >
                  S
                </div>
                <div className="aur-avatar aur-avatar-more">+5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DSToggle({ initial }: { initial?: boolean }) {
  const [on, setOn] = useState(!!initial);
  return (
    <button
      className={`aur-toggle ${on ? 'aur-toggle-on' : ''}`}
      onClick={() => setOn(!on)}
      data-mag
    >
      <span className="aur-toggle-knob" />
    </button>
  );
}
