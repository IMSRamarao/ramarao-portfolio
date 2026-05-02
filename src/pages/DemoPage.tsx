import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { McpDemo } from '../components/McpDemo';
import { data } from '../data';

export function DemoPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = `MCP Live Demo — ${data.shortName}`;
    return () => {
      document.title = `${data.name} — ${data.role}`;
    };
  }, []);

  return (
    <div className="aur-demo-page">
      <div className="aur-demo-page-inner">
        <Link to="/" className="aur-back" data-mag>
          ← Back to home
        </Link>

        <header className="aur-demo-page-head">
          <div className="aur-demo-eyebrow">
            <span className="aur-tag-dot" /> LIVE DEMO · INTERACTIVE
          </div>
          <h1 className="aur-demo-page-title">
            Talk to my portfolio over <em>MCP</em>.
          </h1>
          <p className="aur-demo-page-dek">
            A protocol-accurate Model Context Protocol server simulation that exposes my profile,
            projects, timeline, skills, articles, and contact info as seven tools. Ask anything in
            the box below and watch the JSON-RPC traffic stream between Claude and the server.
          </p>

          <div className="aur-demo-page-stats">
            <div>
              <div className="aur-demo-page-statv">7</div>
              <div className="aur-demo-page-statl">Tools exposed</div>
            </div>
            <div>
              <div className="aur-demo-page-statv">2024-11-05</div>
              <div className="aur-demo-page-statl">MCP protocol version</div>
            </div>
            <div>
              <div className="aur-demo-page-statv">stdio</div>
              <div className="aur-demo-page-statl">Transport</div>
            </div>
            <div>
              <div className="aur-demo-page-statv">JSON-RPC 2.0</div>
              <div className="aur-demo-page-statl">Wire format</div>
            </div>
          </div>
        </header>

        <McpDemo />

        <section className="aur-demo-page-tech">
          <h2 className="aur-demo-page-h">How this works</h2>
          <div className="aur-demo-page-tech-grid">
            <div className="aur-glass aur-pad">
              <div className="aur-mini-h">The wire</div>
              <p>
                Every JSON message you see — <code>initialize</code>, <code>tools/list</code>,
                <code>tools/call</code> — has the exact shape of the real MCP protocol. Same
                fields, same id flow, same notification semantics. You could pipe these into a
                live MCP client and they'd parse.
              </p>
            </div>
            <div className="aur-glass aur-pad">
              <div className="aur-mini-h">The brain</div>
              <p>
                Claude's decision-making is the only simulated layer. A small intent classifier
                inspects your question, picks one or two tools, fills in arguments, and runs them
                against the real portfolio data. Deterministic, fast, free.
              </p>
            </div>
            <div className="aur-glass aur-pad">
              <div className="aur-mini-h">The data</div>
              <p>
                Tool handlers query the same TypeScript modules that power this site —{' '}
                <code>data.ts</code> for profile / projects / timeline, and the article registry
                for writing. The answer you get is the actual answer, not a canned response.
              </p>
            </div>
            <div className="aur-glass aur-pad">
              <div className="aur-mini-h">Why a simulator</div>
              <p>
                MCP is a stdio protocol — it can't run in a browser. A real MCP server lives as a
                Node subprocess that Claude Desktop launches. The simulation lets visitors see the
                protocol in motion without spinning up Claude Desktop or paying API costs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
