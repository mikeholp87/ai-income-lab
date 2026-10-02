// Public email open pixel: GET /o/{token}.gif
// Shared by all outreach bots. Airtable tenant is chosen by token prefix.
// Auth: AIRTABLE_API_KEY or AIRTABLE_PAT
// Skool / unknown tokens default to Free Members 3 (overridable):
//   AIRTABLE_BASE_ID=appK4Nu5Dy4imXrDp
//   AIRTABLE_OPENS_TABLE_ID=tblFS59vmxGSrLCPJ
//   AIRTABLE_SENDS_TABLE_ID=tblsb6CJxqWZ93w74
// Other prefixes: AIRTABLE_ROUTE_<KEY>_BASE_ID / _OPENS_TABLE_ID / _SENDS_TABLE_ID
// Optional JSON override: AIRTABLE_PIXEL_ROUTES
// The 1×1 GIF is always returned even when logging is skipped or fails.

export const AIRTABLE_BASE_ID = 'appK4Nu5Dy4imXrDp';
export const SKOOL_OPENS_TABLE_ID = 'tblFS59vmxGSrLCPJ';
export const SKOOL_SENDS_TABLE_ID = 'tblsb6CJxqWZ93w74';

export const PIXEL_ROUTES = [
  { prefix: 'SKOOL-FT-', key: 'SKOOL_FT', product: 'Skool / AI Income Lab free-to-paid', fallback: true },
  { prefix: 'TA-BL-', key: 'TA_BL', product: 'TubeAnalytics Backlink' },
  { prefix: 'VS-BL-', key: 'VS_BL', product: 'VisiScan Backlink' },
  { prefix: 'AFF-', key: 'AFF', product: 'TubeAnalytics Affiliate' },
  { prefix: 'POD-', key: 'POD', product: 'Podcast Outreach' },
  { prefix: 'JOB-', key: 'JOB', product: 'Job App Agent' },
  { prefix: 'INV-', key: 'INV', product: 'Startup Investor Outreach' },
];

export function airtableConfig(env = process.env) {
  return {
    baseId: env.AIRTABLE_BASE_ID || AIRTABLE_BASE_ID,
    opensTableId: env.AIRTABLE_OPENS_TABLE_ID || SKOOL_OPENS_TABLE_ID,
    sendsTableId: env.AIRTABLE_SENDS_TABLE_ID || SKOOL_SENDS_TABLE_ID,
  };
}

export function normalizeRouteKey(value) {
  return String(value || '')
    .trim()
    .toUpperCase()
    .replace(/-+$/g, '')
    .replace(/-/g, '_');
}

export function matchPixelRoute(token) {
  const upper = String(token || '').toUpperCase();
  const ranked = [...PIXEL_ROUTES].sort((a, b) => b.prefix.length - a.prefix.length);
  return ranked.find(route => upper.startsWith(route.prefix))
    || PIXEL_ROUTES.find(route => route.fallback);
}

function parsePixelRoutesJson(env = process.env) {
  const raw = env.AIRTABLE_PIXEL_ROUTES;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).flatMap(([key, value]) => {
      if (!value || typeof value !== 'object') return [];
      const baseId = value.baseId || value.AIRTABLE_BASE_ID || '';
      const opensTableId = value.opensTableId || value.AIRTABLE_OPENS_TABLE_ID || '';
      const sendsTableId = value.sendsTableId || value.AIRTABLE_SENDS_TABLE_ID || '';
      if (!baseId || !opensTableId || !sendsTableId) return [];
      return [[normalizeRouteKey(key), { baseId, opensTableId, sendsTableId }]];
    }));
  } catch (_) {
    return {};
  }
}

function completeRoute(config) {
  return Boolean(config?.baseId && config?.opensTableId && config?.sendsTableId);
}

export function resolveAirtableRoute(token, env = process.env) {
  const route = matchPixelRoute(token);
  const fromJson = parsePixelRoutesJson(env)[route.key];
  if (completeRoute(fromJson)) {
    return { ...fromJson, key: route.key, prefix: route.prefix, product: route.product, configured: true, source: 'json' };
  }

  if (route.fallback) {
    return { ...airtableConfig(env), key: route.key, prefix: route.prefix, product: route.product, configured: true, source: 'skool-default' };
  }

  const fromEnv = {
    baseId: env[`AIRTABLE_ROUTE_${route.key}_BASE_ID`] || '',
    opensTableId: env[`AIRTABLE_ROUTE_${route.key}_OPENS_TABLE_ID`] || '',
    sendsTableId: env[`AIRTABLE_ROUTE_${route.key}_SENDS_TABLE_ID`] || '',
  };
  return {
    ...fromEnv,
    key: route.key,
    prefix: route.prefix,
    product: route.product,
    configured: completeRoute(fromEnv),
    source: completeRoute(fromEnv) ? 'env' : 'unconfigured',
  };
}

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

async function airtableFetch(path, { env, baseId, method = 'GET', body } = {}) {
  const key = airtableKey(env);
  if (!key || !baseId) return null;
  const response = await fetch(`https://api.airtable.com/v0/${baseId}/${path}`, {
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
  const route = resolveAirtableRoute(token, env);
  const hit = {
    token,
    openedAt,
    userAgent,
    ip: ip || undefined,
    route: route.key,
    product: route.product,
  };
  console.info('[open-pixel]', hit);
  if (!token || !airtableKey(env) || !route.configured) return { logged: 'console', hit, route };

  const openId = `opn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  await airtableFetch(route.opensTableId, {
    env,
    baseId: route.baseId,
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
    `${route.sendsTableId}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
    { env, baseId: route.baseId },
  );
  const send = found?.records?.[0];
  if (send && send.fields?.Opened !== true) {
    await airtableFetch(`${route.sendsTableId}/${send.id}`, {
      env,
      baseId: route.baseId,
      method: 'PATCH',
      body: {
        fields: {
          Opened: true,
          'First Opened At': openedAt,
        },
      },
    });
  }

  return { logged: 'airtable', hit, openId, sendId: send?.id, route };
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
