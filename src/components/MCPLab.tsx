import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data';
import { SectionLabel } from './SectionLabel';

export function MCPLab() {
  const [pulseKey, setPulseKey] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPulseKey((k) => k + 1);
      setActiveIdx((i) => (i + 1) % data.mcpTools.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="aur-section aur-mcp" id="mcp-lab">
      <SectionLabel num="05" title="MCP Lab" caption="claude · tools · design system" />
      <div className="aur-mcp-grid">
        <div className="aur-glass aur-mcp-stage">
          <MCPDiagram pulseKey={pulseKey} activeIdx={activeIdx} />
        </div>
        <div className="aur-mcp-side">
          <p className="aur-mcp-intro">
            I built an MCP server that turns our 86-component design system into something Claude
            can <em>actually use</em>. Tokens, icons, components, guidelines — all exposed as tools.
            Engineers describe a screen; Claude scaffolds it with our primitives, our spacing, our
            a11y rules baked in.
          </p>
          <div className="aur-mcp-tools">
            {data.mcpTools.map((t, i) => (
              <div
                key={t.name}
                className={`aur-mcp-tool ${i === activeIdx ? 'aur-mcp-tool-on' : ''}`}
              >
                <code className="aur-mcp-name">{t.name}</code>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/demo" className="aur-btn aur-btn-pri" data-mag>
            <span>Try the live demo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function MCPDiagram({ pulseKey, activeIdx }: { pulseKey: number; activeIdx: number }) {
  const W = 640,
    H = 380;
  const client = { x: 60, y: H / 2, label: 'Claude', sub: 'claude-4.6' };
  const server = { x: 240, y: H / 2, label: 'MCP', sub: 'dream-mcp' };
  const tools = data.mcpTools.map((t, i) => ({
    ...t,
    x: 380,
    y: server.y + (i - (data.mcpTools.length - 1) / 2) * 48,
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="aur-mcp-svg">
      <defs>
        <linearGradient id="mcpFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="mcpNode">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
      </defs>
      <line
        x1={client.x}
        y1={client.y}
        x2={server.x}
        y2={server.y}
        className="aur-mcp-trunk"
      />
      <circle r="4" className="aur-mcp-pulse" key={`p${pulseKey}`}>
        <animateMotion
          dur="1.6s"
          repeatCount="1"
          path={`M${client.x},${client.y} L${server.x},${server.y}`}
        />
        <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="1" />
      </circle>
      {tools.map((t, i) => (
        <g key={i}>
          <line
            x1={server.x}
            y1={server.y}
            x2={t.x}
            y2={t.y}
            className={i === activeIdx ? 'aur-mcp-toolline aur-mcp-toolline-on' : 'aur-mcp-toolline'}
          />
          {i === activeIdx && (
            <circle r="3" className="aur-mcp-pulse" key={`tp${pulseKey}-${i}`}>
              <animateMotion
                dur="1s"
                repeatCount="1"
                path={`M${server.x},${server.y} L${t.x},${t.y}`}
              />
            </circle>
          )}
          <g transform={`translate(${t.x}, ${t.y})`}>
            <rect
              x="-8"
              y="-12"
              width="232"
              height="24"
              rx="6"
              className={i === activeIdx ? 'aur-mcp-tool-rect aur-mcp-tool-rect-on' : 'aur-mcp-tool-rect'}
            />
            <text
              x="4"
              y="3"
              className="aur-mcp-tool-text"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              {t.name}
            </text>
          </g>
        </g>
      ))}
      <g>
        <circle cx={client.x} cy={client.y} r="34" className="aur-mcp-halo aur-mcp-halo-client" />
        <circle cx={client.x} cy={client.y} r="22" fill="url(#mcpNode)" opacity="0.92" />
        <text
          x={client.x}
          y={client.y + 4}
          textAnchor="middle"
          fill="#0c1220"
          fontSize="11"
          fontWeight="700"
          fontFamily="ui-sans-serif"
        >
          {client.label}
        </text>
        <text
          x={client.x}
          y={client.y + 56}
          textAnchor="middle"
          className="aur-mcp-node-sub"
          fontSize="10"
          fontFamily="ui-monospace"
        >
          {client.sub}
        </text>
      </g>
      <g>
        <circle cx={server.x} cy={server.y} r="42" className="aur-mcp-halo aur-mcp-halo-server">
          <animate attributeName="r" values="42;46;42" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx={server.x} cy={server.y} r="28" fill="url(#mcpNode)" />
        <text
          x={server.x}
          y={server.y + 4}
          textAnchor="middle"
          fill="#0c1220"
          fontSize="12"
          fontWeight="700"
          fontFamily="ui-sans-serif"
        >
          {server.label}
        </text>
        <text
          x={server.x}
          y={server.y + 60}
          textAnchor="middle"
          className="aur-mcp-node-sub"
          fontSize="10"
          fontFamily="ui-monospace"
        >
          {server.sub}
        </text>
      </g>
    </svg>
  );
}
