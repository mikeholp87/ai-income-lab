import assert from 'node:assert/strict';
import test from 'node:test';
import { renderWatch, guides } from './archive.js';
import { uploads } from './uploads-snapshot.js';
import { watchSeo } from './watch-seo.js';

test('reviewed watch pages have accurate metadata and accessible chapter navigation', () => {
  for (const [id, seo] of Object.entries(watchSeo)) {
    const video = uploads.find(item => item.id === id);
    assert.ok(video, id);
    const html = renderWatch(video);
    assert.ok(html.includes(`<title>${seo.title}</title>`), id);
    assert.ok(html.includes(seo.summary), id);
    if (video.chapters?.length && html.includes('class="chapters"')) {
      assert.match(html, /href="#chapters"/);
      assert.match(html, /<h2 id="chapters">/);
      assert.match(html, /"@type":"Clip"/);
    }
  }
});

test('video guide links favor directly relevant material', () => {
  const guide = title => guides.find(([pattern]) => pattern.test(title))?.[1];
  assert.equal(guide('OpenCode Go setup'), '/guides/opencode-go.html');
  assert.equal(guide('n8n automation tutorial'), '/guides/what-is-n8n-used-for.html');
});
