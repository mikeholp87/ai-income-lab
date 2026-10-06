import assert from 'node:assert/strict';
import test from 'node:test';
import { parseUploads, renderArchive } from './archive.js';

const item = (id, title, published, privacyStatus = 'public') => ({ snippet: { resourceId: { videoId: id }, title, publishedAt: published, description: 'Join\nhttps://example.com\n\nBuild an agent.' }, status: { privacyStatus }, contentDetails: { videoPublishedAt: published } });

test('keeps public uploads, newest first, across pages', () => {
  const pages = [{ items: [item('old', 'Old', '2025-12-31T10:00:00Z'), item('gone', 'Private video', '2026-03-01T10:00:00Z', 'private')] }, { items: [item('new', 'New', '2026-10-05T12:37:47Z')] }];
  assert.deepEqual(parseUploads(pages).map(video => video.id), ['new', 'old']);
  assert.equal(parseUploads(pages)[0].summary, 'Build an agent.');
});

test('renders year groups and escapes titles', () => {
  const html = renderArchive(parseUploads([{ items: [item('a1', 'Claude <Code> & "n8n"', '2026-10-05T12:37:47Z'), item('b2', 'Older', '2025-06-01T00:00:00Z')] }]));
  assert.match(html, /<h2>2026<\/h2>[\s\S]*<h2>2025<\/h2>/);
  assert.match(html, /Claude &lt;Code&gt; &amp; &quot;n8n&quot;/);
  assert.doesNotMatch(html, /<Code>/);
  assert.match(html, /2 long-form builds/);
});
