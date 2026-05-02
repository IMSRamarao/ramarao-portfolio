import type { Article } from '../types';

export const mcpFromScratch: Article = {
  slug: 'mcp-from-scratch',
  title: 'MCP from scratch in 200 lines of TypeScript',
  dek: 'You do not need the official SDK to build a Model Context Protocol server. You need a stdio loop, six message types, and a clear head.',
  tag: 'AI',
  readTime: '14 min',
  date: 'January 17, 2026',
  dateISO: '2026-01-17',
  body: (
    <>
      <p>
        I wrote my first MCP server using the official TypeScript SDK. It was
        fine. I shipped it. A month later I needed to debug a particular kind
        of failure where Claude Desktop was sending tool calls my server was
        rejecting, and the SDK abstractions were hiding exactly the layer I
        needed to inspect.
      </p>
      <p>
        I sat down on a Saturday and rewrote the whole thing without the SDK
        to see how thin I could make it. The answer was about two hundred
        lines. The exercise was the most useful thing I did that quarter for
        my understanding of how MCP actually works on the wire.
      </p>
      <p>
        This is that walkthrough. By the end you will have a working MCP server
        that exposes a tiny "design system catalog" with two tools, talking to
        Claude Desktop, with no dependencies beyond the Node standard library.
      </p>

      <h2>What MCP is, in one paragraph</h2>
      <p>
        The Model Context Protocol is a standard for connecting AI clients
        (Claude Desktop, Claude Code, IDE extensions) to external context and
        tools. A client launches your server as a subprocess. They communicate
        over the subprocess's stdin and stdout using JSON-RPC 2.0, one message
        per line. Your server tells the client which tools and resources it
        offers. The client surfaces them to the model. When the model decides
        to use one, the client sends a request to your server, your server
        does the work, your server sends back a response.
      </p>
      <p>
        That's the entire protocol. Everything else is conventions on top of
        those mechanics.
      </p>

      <h2>The wire format</h2>
      <p>
        JSON-RPC 2.0 messages are JSON objects with a small set of required
        fields. A request looks like this:
      </p>

      <pre><code>{`{"jsonrpc":"2.0","id":1,"method":"initialize","params":{...}}`}</code></pre>

      <p>
        A response to that request:
      </p>

      <pre><code>{`{"jsonrpc":"2.0","id":1,"result":{...}}`}</code></pre>

      <p>
        A notification — a fire-and-forget message with no response — omits
        the id:
      </p>

      <pre><code>{`{"jsonrpc":"2.0","method":"notifications/initialized"}`}</code></pre>

      <p>
        Errors take the place of <code>result</code>:
      </p>

      <pre><code>{`{"jsonrpc":"2.0","id":1,"error":{"code":-32601,"message":"Method not found"}}`}</code></pre>

      <p>
        Each message is on its own line. That is the entire framing. There is
        no length-prefixed payload, no chunked encoding, no multipart anything.
        Read a line, parse it as JSON, do work, write a line back.
      </p>

      <h2>The handshake</h2>
      <p>
        When Claude Desktop launches your server, the first message it sends
        is <code>initialize</code>. The server replies with its own capabilities
        and protocol version. The client then sends a notification —{' '}
        <code>notifications/initialized</code> — to indicate that the
        connection is ready for normal traffic. From that point onward, the
        client can call any of the methods the server advertised.
      </p>
      <p>
        Three primary methods matter for a tool-providing server:
      </p>
      <ul>
        <li>
          <code>tools/list</code> — return the catalog of tools you offer, each
          with a name, description, and JSON Schema for inputs.
        </li>
        <li>
          <code>tools/call</code> — execute a tool by name with the supplied
          arguments and return the result.
        </li>
        <li>
          <code>ping</code> — reply with an empty object so the client knows
          you're alive.
        </li>
      </ul>
      <p>
        Resources and prompts have their own pair of list/get methods, with
        the same shape. We'll skip those for the minimal example and add them
        in a footnote at the end.
      </p>

      <h2>The stdio loop</h2>
      <p>
        The skeleton of the server is a loop that reads lines from stdin and
        writes lines to stdout. We use Node's <code>readline</code> for the
        line splitting:
      </p>

      <pre><code>{`import { createInterface } from 'node:readline';
import { stdin, stdout, stderr } from 'node:process';

const rl = createInterface({ input: stdin });

rl.on('line', (line) => {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch (err) {
    stderr.write(\`Failed to parse: \${line}\\n\`);
    return;
  }
  handle(msg).catch((err) => {
    stderr.write(\`Handler error: \${err.message}\\n\`);
  });
});

function send(obj: object) {
  stdout.write(JSON.stringify(obj) + '\\n');
}`}</code></pre>

      <p>
        Two things are easy to get wrong here. First,{' '}
        <strong>stdout is reserved for protocol traffic</strong>. Any{' '}
        <code>console.log</code> in your code will end up in the message
        stream and corrupt it. Use <code>stderr</code> for logging. The client
        captures it for debugging without interpreting it. Second, your{' '}
        <code>send</code> function must terminate every message with a
        newline. Without the newline the client's reader will block waiting
        for one.
      </p>

      <h2>The message dispatcher</h2>
      <p>
        With the loop in place, the rest is dispatch. We pattern-match on{' '}
        <code>msg.method</code> and route to a handler:
      </p>

      <pre><code>{`async function handle(msg: any) {
  if (msg.method === 'initialize') return onInitialize(msg);
  if (msg.method === 'notifications/initialized') return; // no reply needed
  if (msg.method === 'ping') return reply(msg.id, {});
  if (msg.method === 'tools/list') return reply(msg.id, { tools });
  if (msg.method === 'tools/call') return onToolCall(msg);

  if (msg.id !== undefined) {
    send({
      jsonrpc: '2.0',
      id: msg.id,
      error: { code: -32601, message: \`Method not found: \${msg.method}\` },
    });
  }
}

function reply(id: any, result: any) {
  send({ jsonrpc: '2.0', id, result });
}`}</code></pre>

      <p>
        The notification case (<code>notifications/initialized</code>) is
        important: it has no <code>id</code>, so we must not send a reply. The
        unknown-method branch only sends an error if the message had an id;
        otherwise we silently drop it, per the JSON-RPC spec.
      </p>

      <h2>The initialize response</h2>
      <p>
        The client tells us which protocol version it speaks. We echo that
        back along with our capabilities and our identity:
      </p>

      <pre><code>{`function onInitialize(msg: any) {
  reply(msg.id, {
    protocolVersion: msg.params?.protocolVersion ?? '2024-11-05',
    capabilities: { tools: {} },
    serverInfo: { name: 'design-system-mcp', version: '0.1.0' },
  });
}`}</code></pre>

      <p>
        The empty <code>tools: {}</code> capability says "yes, I support tools,
        no extra subfeatures." If we wanted to support resources or prompts
        we'd add them here.
      </p>

      <h2>Defining tools</h2>
      <p>
        A tool is an object with three fields: <code>name</code>,{' '}
        <code>description</code>, and <code>inputSchema</code>. The schema is
        a standard JSON Schema describing the shape of the arguments object
        the model will pass when it calls the tool. The description is what
        the model reads to decide whether the tool is relevant.
      </p>

      <pre><code>{`const components = {
  Button: {
    description: 'A primary action element.',
    props: ['variant: primary | secondary | ghost', 'size: sm | md | lg'],
    example: '<Button variant="primary">Continue</Button>',
  },
  Stack: {
    description: 'A vertical or horizontal layout container.',
    props: ['direction: row | column', 'gap: 0..32'],
    example: '<Stack direction="column" gap={16}>{children}</Stack>',
  },
};

const tools = [
  {
    name: 'listComponents',
    description: 'Returns the names of all components in the design system.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'getComponent',
    description: 'Returns the description, props, and a usage example for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The component name, e.g. "Button".' },
      },
      required: ['name'],
    },
  },
];`}</code></pre>

      <p>
        Notice that the descriptions read like documentation a human would
        write. They are. Claude has no other source of information about your
        tools — give it the same prose you would give a junior dev on their
        first day.
      </p>

      <h2>Handling tool calls</h2>
      <p>
        When the model invokes a tool, the client sends a{' '}
        <code>tools/call</code> request with the tool name and the arguments.
        Your server returns a result object containing a list of content
        blocks — usually a single text block:
      </p>

      <pre><code>{`function onToolCall(msg: any) {
  const { name, arguments: args } = msg.params;

  if (name === 'listComponents') {
    return reply(msg.id, {
      content: [
        { type: 'text', text: Object.keys(components).join(', ') },
      ],
    });
  }

  if (name === 'getComponent') {
    const c = components[args?.name as keyof typeof components];
    if (!c) {
      return reply(msg.id, {
        content: [{ type: 'text', text: \`Unknown component: \${args?.name}\` }],
        isError: true,
      });
    }
    const text = [
      \`# \${args.name}\`,
      '',
      c.description,
      '',
      '## Props',
      ...c.props.map((p: string) => \`- \${p}\`),
      '',
      '## Example',
      '\`\`\`tsx',
      c.example,
      '\`\`\`',
    ].join('\\n');
    return reply(msg.id, { content: [{ type: 'text', text }] });
  }

  reply(msg.id, {
    content: [{ type: 'text', text: \`Unknown tool: \${name}\` }],
    isError: true,
  });
}`}</code></pre>

      <p>
        Two patterns worth noting. First, errors during tool execution are
        returned as a successful response with <code>isError: true</code>{' '}
        rather than as a JSON-RPC error. The model gets to see the message and
        adapt — turning errors into usable feedback rather than opaque
        failures. Second, content blocks support text, images, and embedded
        resources. For most tools, plain text Markdown is the right answer,
        because the model is excellent at consuming it.
      </p>

      <h2>Wiring it to Claude Desktop</h2>
      <p>
        Build the server and find the binary path. Then add it to{' '}
        <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>:
      </p>

      <pre><code>{`{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": ["/absolute/path/to/server.js"]
    }
  }
}`}</code></pre>

      <p>
        Restart Claude Desktop. You'll see the tools appear in the model's
        available toolkit. Ask "what components are in the design system?" and
        watch it call <code>listComponents</code>. Ask "give me an example of
        the Stack component" and watch it call <code>getComponent</code> with
        the right argument.
      </p>

      <h2>Debugging</h2>
      <p>
        Three habits will save you hours.
      </p>
      <p>
        <strong>Log to stderr, not stdout.</strong> Every misbehaving MCP
        server I have debugged was logging to stdout. The first symptom is
        usually "Claude Desktop says my server crashed" — what actually
        happened is that your <code>console.log</code> output landed in the
        protocol stream as malformed JSON and the client severed the
        connection.
      </p>
      <p>
        <strong>Tail the desktop logs.</strong> Claude Desktop writes server
        stderr to a log file at{' '}
        <code>~/Library/Logs/Claude/mcp-server-design-system.log</code>. Tail
        it in a terminal while you test.
      </p>
      <p>
        <strong>Test with a fake client.</strong> You can drive your server
        from another shell session by piping JSON into it:
      </p>

      <pre><code>{`echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | node server.js`}</code></pre>

      <p>
        The response should appear on stdout. This is the fastest way to
        verify the wire format before involving Claude Desktop at all.
      </p>

      <h2>Resources and prompts</h2>
      <p>
        I promised a footnote on the other two surfaces. Resources are
        readable data — files, URLs, blobs of text the model can pull into
        context. They have <code>resources/list</code> and{' '}
        <code>resources/read</code> methods, with the same shape as the tool
        methods. Prompts are pre-baked prompt templates the user can invoke
        from the client UI; they have <code>prompts/list</code> and{' '}
        <code>prompts/get</code>. Add them to your capabilities object and
        wire up the dispatcher.
      </p>
      <p>
        For most use cases tools are enough. Resources are useful when you
        have a stable corpus the model should be able to browse — a knowledge
        base, a file tree. Prompts are useful when you want to expose
        opinionated workflows ("design a settings page") as one-click options
        in the client UI.
      </p>

      <h2>Why this matters</h2>
      <p>
        The official SDK is excellent and you should probably use it for
        production servers. But the SDK hides the protocol, and hiding the
        protocol is fine until something goes wrong. When something goes wrong
        you want to know exactly which JSON message was sent, what shape the
        response had, and where the conversation derailed.
      </p>
      <p>
        Two hundred lines of from-scratch code is a small price for that
        understanding. The next time Claude Desktop misbehaves with one of
        your servers, you will read the log file and immediately know what
        you're looking at. That is worth the Saturday.
      </p>
    </>
  ),
};
