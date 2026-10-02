// Public email open pixel: GET /o/{token}.gif
// Airtable write-back (optional, never required for the GIF):
//   AIRTABLE_API_KEY or AIRTABLE_PAT
// Base appAJaBlPYSE511IE — Skool Opens tbldz345j99xyS7UP, Skool Campaign Sends tblAy7RIz59OCVYz0

export const AIRTABLE_BASE_ID = 'appAJaBlPYSE511IE';
export const SKOOL_OPENS_TABLE_ID = 'tbldz345j99xyS7UP';
export const SKOOL_SENDS_TABLE_ID = 'tblAy7RIz59OCVYz0';

export const TRANSPARENT_GIF = Uint8Array.from(
  atob('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
  char => char.charCodeAt(0),
);

export const PIXEL_HEADERS = {
  'Content-Type': 'image/gif',
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export function pixelResponse() {
  return new Response(TRANSPARENT_GIF, { status: 200, headers: PIXEL_HEADERS });
}

export function sanitizeToken(raw) {
  if (raw == null) return '';
  let token = String(raw);
  try { token = decodeURIComponent(token); } catch (_) {}
  token = token.replace(/\.gif$/i, '').trim();
  return /^[A-Za-z0-9._-]{1,200}$/.test(token) ? token : '';
}

export function extractToken(url) {
  const parsed = new URL(url, 'https://www.ai-automation-station.com');
  const fromQuery = sanitizeToken(parsed.searchParams.get('token'));
  if (fromQuery) return fromQuery;
  const match = parsed.pathname.match(/\/o\/([^/]+)$/i);
  return sanitizeToken(match?.[1] ?? '');
}

export function clientIp(headers) {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip') || headers.get('cf-connecting-ip') || '';
}

export function airtableKey(env = process.env) {
  return env.AIRTABLE_API_KEY || env.AIRTABLE_PAT || '';
}

function escapeFormulaValue(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function airtableFetch(path, { env, method = 'GET', body } = {}) {
  const key = airtableKey(env);
  if (!key) return null;
  const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Airtable ${method} ${path} ${response.status} ${detail}`.trim());
  }
  return response.json();
}

export async function recordOpen({ token, openedAt, userAgent, ip }, env = process.env) {
  const hit = { token, openedAt, userAgent, ip: ip || undefined };
  console.info('[open-pixel]', hit);
  if (!token || !airtableKey(env)) return { logged: 'console', hit };

  const openId = `opn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  await airtableFetch(SKOOL_OPENS_TABLE_ID, {
    env,
    method: 'POST',
    body: {
      fields: {
        'Open Id': openId,
        'Send Token': token,
        'Opened At': openedAt,
        'User Agent': userAgent.slice(0, 100000),
        Source: 'pixel',
      },
    },
  });

  const formula = `{Send Token}='${escapeFormulaValue(token)}'`;
  const found = await airtableFetch(
    `${SKOOL_SENDS_TABLE_ID}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
    { env },
  );
  const send = found?.records?.[0];
  if (send && send.fields?.Opened !== true) {
    await airtableFetch(`${SKOOL_SENDS_TABLE_ID}/${send.id}`, {
      env,
      method: 'PATCH',
      body: {
        fields: {
          Opened: true,
          'First Opened At': openedAt,
        },
      },
    });
  }

  return { logged: 'airtable', hit, openId, sendId: send?.id };
}

export async function handleOpenPixel(request, env = process.env) {
  const token = extractToken(request.url);
  const openedAt = new Date().toISOString();
  const userAgent = request.headers.get('user-agent') || '';
  const ip = clientIp(request.headers);
  try {
    await Promise.race([
      recordOpen({ token, openedAt, userAgent, ip }, env),
      new Promise((_, reject) => setTimeout(() => reject(new Error('open-pixel log timeout')), 3000)),
    ]);
  } catch (error) {
    console.error('[open-pixel] log failed', error);
  }
  return pixelResponse();
}
