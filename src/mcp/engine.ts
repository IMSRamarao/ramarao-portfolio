import { compose, plan, type ToolCall } from './router';
import { execute, toolDefs } from './tools';
import type { DemoEvent, WireMessage } from './types';

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

let nextId = 0;
const nid = () => ++nextId;

export type EngineConfig = {
  speed: number;
  hasInitialized: boolean;
};

export async function* run(question: string, cfg: EngineConfig): AsyncGenerator<DemoEvent> {
  const s = (n: number) => Math.max(40, Math.round(n * cfg.speed));

  if (!cfg.hasInitialized) {
    yield { kind: 'thought', text: 'Opening connection to portfolio-mcp on stdio…' };
    await wait(s(280));

    const initReq: WireMessage = {
      jsonrpc: '2.0',
      id: nid(),
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        clientInfo: { name: 'claude-desktop', version: '0.9.4' },
        capabilities: {},
      },
    };
    yield { kind: 'send', msg: initReq };
    await wait(s(220));
    yield {
      kind: 'recv',
      msg: {
        jsonrpc: '2.0',
        id: (initReq as { id: number }).id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'portfolio-mcp', version: '0.1.0' },
          capabilities: { tools: {} },
        },
      },
    };
    await wait(s(140));
    yield {
      kind: 'send',
      msg: { jsonrpc: '2.0', method: 'notifications/initialized' },
    };
    await wait(s(180));

    const listReq: WireMessage = {
      jsonrpc: '2.0',
      id: nid(),
      method: 'tools/list',
    };
    yield { kind: 'send', msg: listReq };
    await wait(s(260));
    yield {
      kind: 'recv',
      msg: {
        jsonrpc: '2.0',
        id: (listReq as { id: number }).id,
        result: { tools: toolDefs },
      },
    };
    await wait(s(220));
  }

  const p = plan(question);
  yield { kind: 'thought', text: p.thought };
  await wait(s(360));

  const results: { call: ToolCall; raw: string }[] = [];
  for (const call of p.calls) {
    const req: WireMessage = {
      jsonrpc: '2.0',
      id: nid(),
      method: 'tools/call',
      params: { name: call.tool, arguments: call.args },
    };
    yield { kind: 'send', msg: req };
    await wait(s(320));

    const res = execute(call.tool, call.args);
    yield {
      kind: 'recv',
      msg: {
        jsonrpc: '2.0',
        id: (req as { id: number }).id,
        result: res,
      },
    };
    await wait(s(220));

    const raw = res.content?.[0]?.type === 'text' ? res.content[0].text : '';
    results.push({ call, raw });
  }

  yield { kind: 'thought', text: 'Composing answer from tool results.' };
  await wait(s(280));
  yield { kind: 'answer', text: compose(question, results) };
  yield { kind: 'done' };
}
