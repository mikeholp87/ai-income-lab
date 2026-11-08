import assert from 'node:assert/strict';
import test from 'node:test';
import { renderWatch, guides } from './archive.js';
import { uploads } from './uploads-snapshot.js';
import { watchSeo } from './watch-seo.js';
import { videoSummaries } from './video-summaries.js';

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

test('recent watch pages expose useful summaries and correctly attribute their sources', () => {
  const recent = [
    { id: 'IV6q81wRay4', title: 'New HERDR Desktop App Is A Game Changer!' },
    { id: 'V0PoYhOprBI', title: '3 Open Source Projects I Built That You Need to Try!' },
    { id: 'phVQuQMojA8', title: "I Built My Own Task Manager In Claude Code (It's Free!)" },
    { id: '0iTOlQjNdhs', title: 'I Fixed My Android TV With Claude Code + CleanYourTV' },
  ];
  for (const item of recent) {
    const html = renderWatch({ ...item, published: '2026-11-01T00:00:00Z' });
    const brief = videoSummaries[item.id];
    const json = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const title = brief.searchTitle || watchSeo[item.id].title;
    assert.ok(html.includes(`<title>${title}</title>`), item.id);
    assert.ok(html.includes(`<h1>${title}</h1>`), item.id);
    assert.ok(html.includes(`<meta property="og:title" content="${title}">`), item.id);
    assert.equal(json.name, item.title, 'the recording keeps its original identity');
    assert.equal(json.description, brief.summary);
    assert.ok(html.includes(brief.whatYouBuild), item.id);
    assert.ok(html.includes(brief.sourceNote), item.id);
    assert.doesNotMatch(html, /Summary written from the video&#39;s transcript and chapters/);
    assert.match(html, /<a href="\/guides\/[^"]+"><small>Written guide<\/small>/);
  }
});
