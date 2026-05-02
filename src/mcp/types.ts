export type JsonRpcRequest = {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params?: unknown;
};

export type JsonRpcResponse = {
  jsonrpc: '2.0';
  id: number;
  result?: unknown;
  error?: { code: number; message: string };
};

export type JsonRpcNotification = {
  jsonrpc: '2.0';
  method: string;
  params?: unknown;
};

export type WireMessage = JsonRpcRequest | JsonRpcResponse | JsonRpcNotification;

export type ToolDef = {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties?: Record<string, unknown>;
    required?: string[];
  };
};

export type ContentBlock = { type: 'text'; text: string };
export type ToolResult = { content: ContentBlock[]; isError?: boolean };

export type DemoEvent =
  | { kind: 'thought'; text: string }
  | { kind: 'send'; msg: WireMessage }
  | { kind: 'recv'; msg: WireMessage }
  | { kind: 'answer'; text: string }
  | { kind: 'done' };
