import { useEffect, useRef, useState } from 'react';
import { run } from '../mcp/engine';
import { suggestedQuestions } from '../mcp/router';
import type { DemoEvent, WireMessage } from '../mcp/types';

type LogEntry =
  | { id: number; kind: 'thought'; text: string }
  | { id: number; kind: 'send' | 'recv'; msg: WireMessage };

let entryId = 0;

export function McpDemo() {
  const [input, setInput] = useState('');
  const [running, setRunning] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [speed, setSpeed] = useState(1);
  const cancelRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const ask = async (question: string) => {
    if (running || !question.trim()) return;
    setRunning(true);
    setAnswer('');
    if (!hasInitialized) setLog([]);
    const ctrl = new AbortController();
    cancelRef.current = ctrl;

    const userEntry: LogEntry = {
      id: ++entryId,
      kind: 'thought',
      text: `> ${question}`,
    };
    setLog((l) => [...l, userEntry]);

    try {
      for await (const ev of run(question, { speed, hasInitialized })) {
        if (ctrl.signal.aborted) break;
        applyEvent(ev);
      }
    } finally {
      if (!cancelRef.current?.signal.aborted) setHasInitialized(true);
      setRunning(false);
      cancelRef.current = null;
    }
  };

  const applyEvent = (ev: DemoEvent) => {
    if (ev.kind === 'done') return;
    if (ev.kind === 'answer') {
      setAnswer(ev.text);
      return;
    }
    const id = ++entryId;
    if (ev.kind === 'thought') {
      setLog((l) => [...l, { id, kind: 'thought', text: ev.text }]);
    } else {
      setLog((l) => [...l, { id, kind: ev.kind, msg: ev.msg }]);
    }
  };

  const reset = () => {
    cancelRef.current?.abort();
    setLog([]);
    setAnswer('');
    setHasInitialized(false);
    setRunning(false);
  };

  return (
    <section className="aur-mcp-demo" id="mcp-live">
      <div className="aur-mcp-demo-grid">
        <div className="aur-glass aur-mcp-demo-input">
          <div className="aur-mcp-demo-h">
            Ask the portfolio
            <button
              className="aur-mcp-demo-reset"
              onClick={reset}
              data-mag
              disabled={!log.length && !answer}
            >
              Reset
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
              setInput('');
            }}
          >
            <input
              className="aur-mcp-demo-field"
              placeholder="e.g. tell me about the Dream DS project"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={running}
              data-mag
            />
            <button
              type="submit"
              className="aur-btn aur-btn-pri aur-mcp-demo-go"
              data-mag
              disabled={running || !input.trim()}
            >
              {running ? 'Routing…' : 'Send →'}
            </button>
          </form>

          <div className="aur-mcp-demo-l">Try one</div>
          <div className="aur-mcp-demo-chips">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                className="aur-mcp-demo-chip"
                data-mag
                onClick={() => ask(q)}
                disabled={running}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="aur-mcp-demo-l">Speed</div>
          <div className="aur-mcp-demo-speeds">
            {[
              [2, '0.5×'],
              [1, '1×'],
              [0.4, '2.5×'],
            ].map(([v, label]) => (
              <button
                key={label as string}
                className={`aur-mcp-demo-speed ${speed === v ? 'aur-mcp-demo-speed-on' : ''}`}
                onClick={() => setSpeed(v as number)}
                data-mag
                disabled={running}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="aur-mcp-demo-stream">
          <div className="aur-term-bar">
            <span className="aur-term-dot" style={{ background: '#ff5f56' }} />
            <span className="aur-term-dot" style={{ background: '#ffbd2e' }} />
            <span className="aur-term-dot" style={{ background: '#27c93f' }} />
            <span className="aur-term-title">claude-desktop ⇄ portfolio-mcp · stdio</span>
            <span className={`aur-mcp-demo-status ${running ? 'on' : ''}`}>
              {running ? '● live' : hasInitialized ? '● connected' : '○ idle'}
            </span>
          </div>
          <div className="aur-mcp-demo-log" ref={logRef}>
            {log.length === 0 && (
              <div className="aur-mcp-demo-empty">
                Pick a suggested question, or type one. Protocol traffic will stream here.
              </div>
            )}
            {log.map((e) => (
              <LogLine key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </div>

      {answer && (
        <div className="aur-mcp-demo-answer">
          <div className="aur-mcp-demo-answer-l">
            <span className="aur-tag-dot" /> CLAUDE'S ANSWER
          </div>
          <pre className="aur-mcp-demo-answer-body">{answer}</pre>
        </div>
      )}
    </section>
  );
}

function LogLine({ entry }: { entry: LogEntry }) {
  if (entry.kind === 'thought') {
    return (
      <div className="aur-mcp-demo-thought">
        <span className="aur-mcp-demo-tprefix">··</span>
        {entry.text}
      </div>
    );
  }
  const arrow = entry.kind === 'send' ? '→' : '←';
  const cls = entry.kind === 'send' ? 'aur-mcp-demo-send' : 'aur-mcp-demo-recv';
  return (
    <div className={`aur-mcp-demo-msg ${cls}`}>
      <span className="aur-mcp-demo-arrow">{arrow}</span>
      <span className="aur-mcp-demo-json">{formatJson(entry.msg)}</span>
    </div>
  );
}

function formatJson(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}
