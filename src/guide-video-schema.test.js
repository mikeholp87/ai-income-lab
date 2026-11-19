import { test } from 'node:test';
import assert from 'node:assert/strict';
import { patchGuide } from '../scripts/guide-video-schema.mjs';

const site = 'https://www.ai-automation-station.com';
const id = 'fixture0001';
const video = {
  id, title: 'Save $& on <API> keys', summary: 'Costs $1 & <b>less</b>.', published: '2026-11-01T00:00:00Z', duration: 'PT5M0S',
  chapters: [{ seconds: 0, label: 'Intro $1' }, { seconds: 60, label: 'Setup <env>' }, { seconds: 120, label: 'Run' }],
};
const videos = new Map([[id, video]]);
const figure = `<figure class="video"><a class="player" href="https://www.youtube.com/watch?v=${id}"><img alt=""></a></figure>`;
const page = head => `<!doctype html><html><head><title>Guide</title>${head}</head><body>${figure}</body></html>`;
const blocks = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const videoBlocks = html => blocks(html).filter(data => data['@type'] === 'VideoObject' && data['@id'] === `${site}/watch/${id}#video`);

test('rebuilds a reformatted existing VideoObject in place instead of adding a duplicate', () => {
  // Different key order, whitespace and stale values from the generated block.
  const stale = JSON.stringify({ name: 'Old title', '@id': `${site}/watch/${id}#video`, '@type': 'VideoObject', '@context': 'https://schema.org' }, null, 2);
  const other = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Guide"}</script>';
  const html = patchGuide(page(`${other}\n<script type="application/ld+json">\n${stale}\n</script>`), videos);
  const found = videoBlocks(html);
  assert.equal(found.length, 1);
  assert.equal(found[0].name, video.title);
  assert.equal(found[0].duration, 'PT5M0S');
  assert.ok(html.includes(other), 'unrelated JSON-LD is left alone');
  assert.ok(html.indexOf(other) < html.indexOf('"VideoObject"'), 'replaced where it was, not moved before </head>');
});

test('two identical runs produce identical output', () => {
  const once = patchGuide(page(''), videos);
  assert.notEqual(once, page(''));
  assert.equal(patchGuide(once, videos), once);
  assert.equal(patchGuide(page(''), videos), once);
  assert.equal(videoBlocks(once).length, 1);
  assert.equal((once.match(/class="video-chapters"/g) ?? []).length, 1);
});

test('titles and labels containing "$" and "<" survive verbatim and stay escaped', () => {
  const html = patchGuide(page(''), videos);
  const [schema] = videoBlocks(html);
  assert.equal(schema.name, 'Save $& on <API> keys');
  assert.ok(!/<script type="application\/ld\+json">[^]*?<API>[^]*?<\/script>/.test(html), 'no raw < inside JSON-LD');
  assert.ok(html.includes('aria-label="Chapters in Save $&amp; on &lt;API&gt; keys"'));
  assert.ok(html.includes('</a> Intro $1</li>'));
  assert.ok(html.includes('</a> Setup &lt;env&gt;</li>'));
  assert.ok(html.includes(`${figure}\n<ul class="video-chapters"`), 'chapters follow the figure, no "$" pattern expansion');
});
