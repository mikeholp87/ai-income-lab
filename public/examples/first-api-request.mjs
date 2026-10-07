// Local teaching example: no real model, provider credentials, or paid requests.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const server = createServer(async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  const reply = (status, body) => { response.writeHead(status); response.end(JSON.stringify(body)); };
  if (request.method !== 'POST' || request.url !== '/v1/chat/completions') return reply(404, { error: 'Use POST /v1/chat/completions' });
  if (request.headers.authorization !== 'Bearer demo-only') return reply(401, { error: 'Use the demo key' });
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 4096) return reply(413, { error: 'Request too large' });
  }
  try {
    const data = JSON.parse(body);
    if (data?.model !== 'demo-model') return reply(404, { error: 'Unknown demo model' });
    if (!Array.isArray(data.messages) || !data.messages.length || data.messages.some(message => message?.role !== 'user' || typeof message.content !== 'string')) return reply(400, { error: 'Supply user messages' });
    reply(200, { choices: [{ message: { role: 'assistant', content: 'connection-ok (local mock)' } }] });
  } catch { reply(400, { error: 'Invalid JSON' }); }
});

await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
try {
  const endpoint = `http://127.0.0.1:${server.address().port}/v1/chat/completions`;
  for (const [label, key, model, expected] of [
    ['Wrong key', 'wrong-key', 'demo-model', 401],
    ['Wrong model', 'demo-only', 'missing-model', 404],
    ['Valid request', 'demo-only', 'demo-model', 200],
  ]) {
    const response = await fetch(endpoint, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(5000),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role: 'user', content: 'Reply with connection-ok' }], stream: false }),
    });
    assert.equal(response.status, expected);
    const data = await response.json();
    if (expected === 200) assert.equal(data.choices[0].message.content, 'connection-ok (local mock)');
    console.log(`${label}: HTTP ${response.status}`);
  }
  console.log('PASS: local request checks. No provider API was called.');
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
