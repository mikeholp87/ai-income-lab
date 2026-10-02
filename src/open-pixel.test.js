import assert from 'node:assert/strict';
import test from 'node:test';
import {
  AIRTABLE_BASE_ID,
  PIXEL_HEADERS,
  SKOOL_OPENS_TABLE_ID,
  SKOOL_SENDS_TABLE_ID,
  TRANSPARENT_GIF,
  airtableConfig,
  extractToken,
  handleOpenPixel,
  pixelResponse,
  recordOpen,
  sanitizeToken,
} from './open-pixel.js';

test('defaults Airtable write-back to Free Members 3 and allows env overrides', () => {
  assert.equal(AIRTABLE_BASE_ID, 'appK4Nu5Dy4imXrDp');
  assert.equal(SKOOL_OPENS_TABLE_ID, 'tblFS59vmxGSrLCPJ');
  assert.equal(SKOOL_SENDS_TABLE_ID, 'tblsb6CJxqWZ93w74');
  assert.deepEqual(airtableConfig({}), {
    baseId: 'appK4Nu5Dy4imXrDp',
    opensTableId: 'tblFS59vmxGSrLCPJ',
    sendsTableId: 'tblsb6CJxqWZ93w74',
  });
  assert.deepEqual(airtableConfig({
    AIRTABLE_BASE_ID: 'appOverrideBase',
    AIRTABLE_OPENS_TABLE_ID: 'tblOverrideOpens',
    AIRTABLE_SENDS_TABLE_ID: 'tblOverrideSends',
  }), {
    baseId: 'appOverrideBase',
    opensTableId: 'tblOverrideOpens',
    sendsTableId: 'tblOverrideSends',
  });
});

test('sanitizes URL-safe tokens and strips .gif', () => {
  assert.equal(sanitizeToken('SKOOL-FT-abc123.gif'), 'SKOOL-FT-abc123');
  assert.equal(sanitizeToken('test-token'), 'test-token');
  assert.equal(extractToken('https://www.ai-automation-station.com/o/test-token.gif'), 'test-token');
  assert.equal(extractToken('https://example.com/api/o/SKOOL-FT-9'), 'SKOOL-FT-9');
  assert.equal(sanitizeToken('../etc/passwd'), '');
  assert.equal(sanitizeToken(''), '');
});

test('pixel response is a cache-busted 1×1 GIF', async () => {
  const response = pixelResponse();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/gif');
  assert.equal(response.headers.get('cache-control'), PIXEL_HEADERS['Cache-Control']);
  assert.equal(response.headers.get('pragma'), 'no-cache');
  assert.equal(response.headers.get('expires'), '0');
  const body = new Uint8Array(await response.arrayBuffer());
  assert.deepEqual([...body], [...TRANSPARENT_GIF]);
  assert.equal(String.fromCharCode(body[0], body[1], body[2]), 'GIF');
});

test('handler returns the GIF when Airtable is unset and when logging throws', async () => {
  const request = new Request('https://www.ai-automation-station.com/o/test-token.gif', {
    headers: { 'user-agent': 'PixelTest/1.0', 'x-forwarded-for': '203.0.113.9, 10.0.0.1' },
  });
  const ok = await handleOpenPixel(request, {});
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get('content-type'), 'image/gif');

  const previous = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('network down'); };
  try {
    const failed = await handleOpenPixel(request, { AIRTABLE_PAT: 'pat-test' });
    assert.equal(failed.status, 200);
    assert.equal(failed.headers.get('content-type'), 'image/gif');
  } finally {
    globalThis.fetch = previous;
  }
});

test('records an Opens row and flips the first send open only', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || 'GET', body: init.body ? JSON.parse(init.body) : null });
    if (String(url).includes(SKOOL_SENDS_TABLE_ID) && !String(url).includes('recSend1') && (init.method || 'GET') === 'GET') {
      return new Response(JSON.stringify({
        records: [{ id: 'recSend1', fields: { 'Send Token': 'SKOOL-FT-1', Opened: false } }],
      }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: 'recNew' }), { status: 200 });
  };
  try {
    await recordOpen({
      token: 'SKOOL-FT-1',
      openedAt: '2026-10-02T00:00:00.000Z',
      userAgent: 'UA',
      ip: '203.0.113.9',
    }, { AIRTABLE_API_KEY: 'key' });
  } finally {
    globalThis.fetch = previous;
  }

  assert.equal(calls[0].method, 'POST');
  assert.ok(calls[0].url.includes(`/${AIRTABLE_BASE_ID}/${SKOOL_OPENS_TABLE_ID}`));
  assert.equal(calls[0].body.fields['Send Token'], 'SKOOL-FT-1');
  assert.equal(calls[0].body.fields['Opened At'], '2026-10-02T00:00:00.000Z');
  assert.equal(calls[0].body.fields['User Agent'], 'UA');
  assert.equal(calls[0].body.fields.Source, 'pixel');
  assert.match(calls[0].body.fields['Open Id'], /^opn_/);
  assert.equal(calls[1].method, 'GET');
  assert.ok(calls[1].url.includes(SKOOL_SENDS_TABLE_ID));
  assert.equal(calls[2].method, 'PATCH');
  assert.ok(calls[2].url.includes(`${SKOOL_SENDS_TABLE_ID}/recSend1`));
  assert.equal(calls[2].body.fields.Opened, true);
  assert.equal(calls[2].body.fields['First Opened At'], '2026-10-02T00:00:00.000Z');
});

test('does not overwrite First Opened At when Opened is already true', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || 'GET' });
    if (String(url).includes(SKOOL_SENDS_TABLE_ID) && (init.method || 'GET') === 'GET') {
      return new Response(JSON.stringify({
        records: [{ id: 'recSend1', fields: { 'Send Token': 'SKOOL-FT-1', Opened: true } }],
      }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: 'recNew' }), { status: 200 });
  };
  try {
    await recordOpen({
      token: 'SKOOL-FT-1',
      openedAt: '2026-10-02T01:00:00.000Z',
      userAgent: 'UA',
    }, { AIRTABLE_PAT: 'pat' });
  } finally {
    globalThis.fetch = previous;
  }
  assert.equal(calls.some(call => call.method === 'PATCH'), false);
});

test('uses AIRTABLE_* env overrides in Airtable URLs', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || 'GET' });
    if (String(url).includes('tblOverrideSends') && (init.method || 'GET') === 'GET') {
      return new Response(JSON.stringify({ records: [] }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: 'recNew' }), { status: 200 });
  };
  try {
    await recordOpen({
      token: 'SKOOL-FT-1',
      openedAt: '2026-10-02T00:00:00.000Z',
      userAgent: 'UA',
    }, {
      AIRTABLE_API_KEY: 'key',
      AIRTABLE_BASE_ID: 'appOverrideBase',
      AIRTABLE_OPENS_TABLE_ID: 'tblOverrideOpens',
      AIRTABLE_SENDS_TABLE_ID: 'tblOverrideSends',
    });
  } finally {
    globalThis.fetch = previous;
  }
  assert.ok(calls[0].url.includes('/appOverrideBase/tblOverrideOpens'));
  assert.ok(calls[1].url.includes('/appOverrideBase/tblOverrideSends'));
});
