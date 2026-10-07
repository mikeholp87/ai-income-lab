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
  matchPixelRoute,
  pixelResponse,
  recordOpen,
  resolveAirtableRoute,
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

test('routes tokens by prefix and falls unknown tokens back to Skool', () => {
  assert.equal(matchPixelRoute('SKOOL-FT-abc').key, 'SKOOL_FT');
  assert.equal(matchPixelRoute('AFF-9').key, 'AFF');
  assert.equal(matchPixelRoute('TA-BL-link').key, 'TA_BL');
  assert.equal(matchPixelRoute('VS-BL-link').key, 'VS_BL');
  assert.equal(matchPixelRoute('POD-show').key, 'POD');
  assert.equal(matchPixelRoute('JOB-42').key, 'JOB');
  assert.equal(matchPixelRoute('INV-round').key, 'INV');
  assert.equal(matchPixelRoute('test-token').key, 'SKOOL_FT');
  assert.equal(matchPixelRoute('').key, 'SKOOL_FT');
});

test('resolves Skool defaults and non-Skool env routes without inventing IDs', () => {
  const skool = resolveAirtableRoute('SKOOL-FT-1', {});
  assert.equal(skool.configured, true);
  assert.equal(skool.baseId, AIRTABLE_BASE_ID);
  assert.equal(skool.opensTableId, SKOOL_OPENS_TABLE_ID);
  assert.equal(skool.sendsTableId, SKOOL_SENDS_TABLE_ID);

  const unknown = resolveAirtableRoute('test-token', {
    AIRTABLE_BASE_ID: 'appOverrideBase',
    AIRTABLE_OPENS_TABLE_ID: 'tblOverrideOpens',
    AIRTABLE_SENDS_TABLE_ID: 'tblOverrideSends',
  });
  assert.equal(unknown.key, 'SKOOL_FT');
  assert.equal(unknown.baseId, 'appOverrideBase');

  const missingAff = resolveAirtableRoute('AFF-1', { AIRTABLE_API_KEY: 'key' });
  assert.equal(missingAff.key, 'AFF');
  assert.equal(missingAff.configured, false);
  assert.equal(missingAff.baseId, '');

  const aff = resolveAirtableRoute('AFF-1', {
    AIRTABLE_ROUTE_AFF_BASE_ID: 'appAff',
    AIRTABLE_ROUTE_AFF_OPENS_TABLE_ID: 'tblAffOpens',
    AIRTABLE_ROUTE_AFF_SENDS_TABLE_ID: 'tblAffSends',
  });
  assert.deepEqual({ baseId: aff.baseId, opensTableId: aff.opensTableId, sendsTableId: aff.sendsTableId, configured: aff.configured }, {
    baseId: 'appAff',
    opensTableId: 'tblAffOpens',
    sendsTableId: 'tblAffSends',
    configured: true,
  });

  const fromJson = resolveAirtableRoute('TA-BL-1', {
    AIRTABLE_PIXEL_ROUTES: JSON.stringify({
      TA_BL: { baseId: 'appTa', opensTableId: 'tblTaOpens', sendsTableId: 'tblTaSends' },
    }),
  });
  assert.equal(fromJson.source, 'json');
  assert.equal(fromJson.baseId, 'appTa');
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

  assert.equal(calls[1].method, 'POST');
  assert.ok(calls[1].url.includes(`/${AIRTABLE_BASE_ID}/${SKOOL_OPENS_TABLE_ID}`));
  assert.equal(calls[1].body.fields['Send Token'], 'SKOOL-FT-1');
  assert.equal(calls[1].body.fields['Opened At'], '2026-10-02T00:00:00.000Z');
  assert.equal(calls[1].body.fields['User Agent'], 'UA');
  assert.equal(calls[1].body.fields.Source, 'pixel');
  assert.match(calls[1].body.fields['Open Id'], /^opn_/);
  assert.equal(calls[0].method, 'GET');
  assert.ok(calls[0].url.includes(SKOOL_SENDS_TABLE_ID));
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
  assert.equal(calls.length, 1);
  assert.ok(calls[0].url.includes('/appOverrideBase/tblOverrideSends'));
});

test('writes AFF tokens to the AFF Airtable route when configured', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || 'GET', body: init.body ? JSON.parse(init.body) : null });
    if (String(url).includes('tblAffSends') && (init.method || 'GET') === 'GET') {
      return new Response(JSON.stringify({
        records: [{ id: 'recAff1', fields: { 'Send Token': 'AFF-1', Opened: false } }],
      }), { status: 200 });
    }
    return new Response(JSON.stringify({ id: 'recNew' }), { status: 200 });
  };
  try {
    const result = await recordOpen({
      token: 'AFF-1',
      openedAt: '2026-10-02T00:00:00.000Z',
      userAgent: 'UA',
    }, {
      AIRTABLE_API_KEY: 'key',
      AIRTABLE_ROUTE_AFF_BASE_ID: 'appAff',
      AIRTABLE_ROUTE_AFF_OPENS_TABLE_ID: 'tblAffOpens',
      AIRTABLE_ROUTE_AFF_SENDS_TABLE_ID: 'tblAffSends',
    });
    assert.equal(result.logged, 'airtable');
    assert.equal(result.route.key, 'AFF');
  } finally {
    globalThis.fetch = previous;
  }
  assert.ok(calls[1].url.includes('/appAff/tblAffOpens'));
  assert.equal(calls[1].body.fields['Send Token'], 'AFF-1');
  assert.equal(calls[1].body.fields.Source, 'pixel');
  assert.ok(calls[2].url.includes('/appAff/tblAffSends/recAff1'));
  assert.equal(calls[2].body.fields.Opened, true);
});

test('skips Airtable for an unconfigured prefix and still returns the GIF', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || 'GET' });
    return new Response(JSON.stringify({ id: 'recNew' }), { status: 200 });
  };
  try {
    const result = await recordOpen({
      token: 'POD-show-1',
      openedAt: '2026-10-02T00:00:00.000Z',
      userAgent: 'UA',
    }, { AIRTABLE_API_KEY: 'key' });
    assert.equal(result.logged, 'console');
    assert.equal(result.route.configured, false);

    const response = await handleOpenPixel(
      new Request('https://www.ai-automation-station.com/o/POD-show-1.gif'),
      { AIRTABLE_API_KEY: 'key' },
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'image/gif');
  } finally {
    globalThis.fetch = previous;
  }
  assert.equal(calls.length, 0);
});

// No production requests: invented, malformed and mismatched tokens must never write.
test('unknown and mismatched send tokens return a GIF without Airtable writes', async () => {
  const previous = globalThis.fetch;
  try {
    for (const records of [[], [{ id: 'recOther', fields: { 'Send Token': 'different-token' } }]]) {
      const calls = [];
      globalThis.fetch = async (url, init = {}) => {
        calls.push(init.method || 'GET');
        return Response.json({ records });
      };
      const response = await handleOpenPixel(new Request('https://example.com/o/invented-token.gif'), { AIRTABLE_API_KEY: 'mock' });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), 'image/gif');
      assert.deepEqual(calls, ['GET']);
      await recordOpen({ token: "bad'token", openedAt: '2026-10-07T00:00:00Z', userAgent: 'test' }, { AIRTABLE_API_KEY: 'mock' });
      assert.deepEqual(calls, ['GET']);
    }
  } finally { globalThis.fetch = previous; }
});
