import assert from 'node:assert/strict';
import test from 'node:test';
import { parseApi, parseFeed } from './youtube.js';

const entry = (id, link, title, description) => `<entry><yt:videoId>${id}</yt:videoId><title>${title}</title><link rel="alternate" href="${link}"/><published>2026-10-05T12:37:47+00:00</published><media:group><media:description>${description}</media:description><media:community><media:statistics views="9191"/></media:community></media:group></entry>`;

test('parses long-form uploads and skips Shorts', () => {
  const xml = `<feed><title>Channel</title>${entry('abc', 'https://www.youtube.com/watch?v=abc', 'Q&amp;A: Claude &#39;5.5&#39;', 'Join us\nhttps://example.com\n\nHow to build an agent &amp; ship it.\n\nLinks: https://x.ai')}${entry('def', 'https://www.youtube.com/shorts/def', 'Short #shorts', '')}</feed>`;
  assert.deepEqual(parseFeed(xml), [{ id: 'abc', title: "Q&A: Claude '5.5'", published: '2026-10-05T12:37:47+00:00', views: 9191, summary: 'How to build an agent & ship it.' }]);
});

test('returns an empty list for an empty feed', () => {
  assert.deepEqual(parseFeed('<feed></feed>'), []);
});

test('joins Data API playlist items with view counts', () => {
  const playlist = { items: [{ snippet: { resourceId: { videoId: 'abc' }, title: 'Claude & Codex', publishedAt: '2026-10-05T12:37:47Z', description: 'Join\nhttps://example.com\n\nBuild an agent.' } }] };
  const stats = { items: [{ id: 'abc', statistics: { viewCount: '9191' } }] };
  assert.deepEqual(parseApi(playlist, stats), [{ id: 'abc', title: 'Claude & Codex', published: '2026-10-05T12:37:47Z', views: 9191, summary: 'Build an agent.' }]);
});
