// Best-effort per-IP rate limiter for Vercel serverless functions.
// State lives in the memory of one warm function instance, so it resets on cold starts and is
// not shared across instances or regions. It stops a single client hammering one instance,
// which covers casual abuse of the paid Supermemory and Resend calls. For a hard global limit,
// move the counters to a shared store such as Upstash Redis.
export function clientIp(headers) {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64);
  return (headers.get('x-real-ip') || '').trim().slice(0, 64) || 'unknown';
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5000, now = () => Date.now() }) {
  const hits = new Map();
  return function check(key) {
    const time = now();
    let entry = hits.get(key);
    if (!entry || time >= entry.reset) {
      if (hits.size >= maxKeys) {
        for (const [k, v] of hits) if (time >= v.reset) hits.delete(k);
        if (hits.size >= maxKeys) hits.delete(hits.keys().next().value);
      }
      entry = { count: 0, reset: time + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;
    const retryAfter = Math.max(1, Math.ceil((entry.reset - time) / 1000));
    return { ok: entry.count <= limit, retryAfter };
  };
}

export function tooManyRequests(retryAfter) {
  return Response.json({ error: 'rate_limited' }, {
    status: 429,
    headers: { 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' },
  });
}
