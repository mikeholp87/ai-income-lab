// Searches what's said in the videos and written in the guides through /api/search. Resolves to rows shaped
// like /search-index.json ([kind, title, url, passage]), [] for short queries, or null if search is down.
// The query is normalized the same way as api/search.js so repeats come from the CDN cache.
const cache = new Map();
export function searchInside(text) {
  const query = text.toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 120);
  if (query.length < 3) return Promise.resolve([]);
  if (!cache.has(query)) {
    cache.set(query, fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(response => response.ok ? response.json() : null)
      .then(rows => Array.isArray(rows) ? rows : null)
      .catch(() => null)
      .then(rows => { if (!rows) cache.delete(query); return rows; }));
  }
  return cache.get(query);
}

// Waits for a pause in typing so each search costs one request, not one per keystroke.
export function afterTyping(callback, wait = 400) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => callback(...args), wait); };
}
