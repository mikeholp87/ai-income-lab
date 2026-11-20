import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { readGuides, strictGuideVideos } from '../scripts/guide-video-map.mjs';
import map from './guide-video-map.json' with { type: 'json' };
import { renderPageSitemap, renderVideoSitemap, renderWatch, videoGuide } from './archive.js';
import { renderFeed } from './feed.js';
import { uploads } from './uploads-snapshot.js';

const site = 'https://www.ai-automation-station.com';
const player = id => `<figure class="video"><a class="player" href="https://www.youtube.com/watch?v=${id}" data-embed="https://www.youtube-nocookie.com/embed/${id}"></a></figure>`;
const page = (title, ...ids) => `<html><body><main><h1>${title}</h1>${ids.map(player).join('\n')}</main></body></html>`;
const canonicalOf = html => html.match(/<link rel="canonical" href="([^"]+)">/)[1];
const mapped = Object.keys(map);
const unmapped = uploads.filter(video => !map[video.id] && video.embeddable !== false).map(video => video.id);

test('the video-to-guide map matches the guides: run node scripts/guide-video-map.mjs after changing a guide player', () => {
  assert.deepEqual(map, strictGuideVideos(readGuides()));
  assert.equal(mapped.length, 153);
});

test('only a guide whose single player is the video, and no other guide embeds it, becomes the canonical page', () => {
  const result = strictGuideVideos([
    ['/guides/one.html', page('One', 'aaaaaaaaaaa')],
    ['/guides/two.html', page('Two', 'bbbbbbbbbbb', 'ccccccccccc')],
    ['/guides/three.html', page('Three', 'ddddddddddd')],
    ['/guides/four.html', page('Four', 'ddddddddddd')],
    // A link or a mention is not an embed.
    ['/guides/five.html', '<h1>Five</h1><p><a href="https://www.youtube.com/watch?v=eeeeeeeeeee">video</a></p>'],
  ]);
  assert.deepEqual(result, { aaaaaaaaaaa: ['/guides/one.html', 'One'] });
  // The two real multi-player guides stay out.
  for (const id of ['XEmJGf5CHwk', 'IIcekvpPuqo', 'vauqktcB6ak', 'uTcTJd5JaZU']) assert.equal(videoGuide(id), undefined, id);
});

test('every mapped guide embeds exactly that video, and the video is in the uploads snapshot', async () => {
  const ids = new Set(uploads.map(video => video.id));
  for (const [id, [path, title]] of Object.entries(map)) {
    assert.ok(ids.has(id), id);
    const html = await readFile(new URL(`../public${path}`, import.meta.url), 'utf8');
    const players = [...html.matchAll(/<figure class="video"><a class="player" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/g)].map(match => match[1]);
    assert.deepEqual(players, [id], path);
    assert.ok(title.length > 10, path);
  }
});

test('a mapped watch page stays indexable, names its guide as canonical, links it first and drops ?t= key moments', () => {
  for (const id of mapped.slice(0, 40)) {
    const video = uploads.find(item => item.id === id);
    const html = renderWatch(video);
    const [path, title] = map[id];
    assert.equal(canonicalOf(html), `${site}${path}`, id);
    assert.ok(html.includes(`<meta property="og:url" content="${site}${path}">`), id);
    assert.match(html, /<meta name="robots" content="index,follow[^"]*">/, id);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, id);
    assert.doesNotMatch(html, /"@type":"Clip"/, id);
    assert.doesNotMatch(html, /\/watch\/[\w-]{11}\?t=/, id);
    assert.doesNotMatch(html, /"@type":"FAQPage"/, id);
    assert.ok(html.includes(`<p class="note watch-guide"><strong>Written guide:</strong> <a href="${path}" data-placement="watch_guide">`), id);
    assert.ok(title, id);
    const video_ = JSON.parse(html.match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"VideoObject".*?)<\/script>/)[1]);
    assert.equal(video_.url, `${site}${path}`, id);
    assert.equal(video_['@id'], `${site}${path}#video`, id);
    // The guide leads the "Keep learning" guide links.
    const links = html.slice(html.indexOf('id="related-guides"')).match(/<a href="(\/guides\/[^"]+)"/);
    if (links) assert.equal(links[1], path, id);
  }
});

test('an unmapped watch page is unchanged: self-canonical with its key moments', () => {
  assert.ok(unmapped.length > 50);
  const withChapters = uploads.find(video => !map[video.id] && video.embeddable !== false && video.chapters?.length >= 3 && video.duration);
  for (const video of [withChapters, ...uploads.filter(item => unmapped.includes(item.id)).slice(0, 20)]) {
    const html = renderWatch(video);
    assert.equal(canonicalOf(html), `${site}/watch/${video.id}`, video.id);
    assert.doesNotMatch(html, /class="note watch-guide"/, video.id);
  }
  assert.match(renderWatch(withChapters), /"@type":"Clip"/);
  // A mapped video rendered without its guide is exactly the old self-canonical page.
  const video = uploads.find(item => item.id === mapped[0]);
  assert.equal(canonicalOf(renderWatch(video, { guide: null })), `${site}/watch/${video.id}`);
});

test('the video sitemap lists each mapped video on its guide, with the same thumbnail, title and description', () => {
  const xml = renderVideoSitemap(uploads);
  const entries = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><video:video>([\s\S]*?)<\/video:video><\/url>/g)];
  assert.equal(entries.length, uploads.filter(video => video.embeddable).length);
  const byPlayer = new Map(entries.map(([, loc, body]) => [body.match(/embed\/([\w-]{11})/)[1], [loc, body]]));
  for (const id of mapped) {
    if (!byPlayer.has(id)) continue;
    const [loc, body] = byPlayer.get(id);
    assert.equal(loc, `${site}${map[id][0]}`, id);
    assert.match(body, /<video:thumbnail_loc>https:\/\/[^<]+<\/video:thumbnail_loc>\n<video:title>[^<]+<\/video:title>\n<video:description>[^<]+<\/video:description>/, id);
  }
  assert.doesNotMatch(xml, new RegExp(`<loc>${site}/watch/(${mapped.join('|')})</loc>`));
  // Each guide carries at most one video, so no URL is listed twice.
  assert.equal(new Set(entries.map(([, loc]) => loc)).size, entries.length);
});

test('the page sitemap never lists a watch page that points at a guide', async () => {
  const base = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const extra = `<url><loc>${site}/watch/${mapped[0]}</loc></url>\n<url><loc>${site}/watch/${unmapped[0]}</loc></url>`;
  const xml = renderPageSitemap(base.replace('</urlset>', `${extra}\n</urlset>`), uploads);
  assert.ok(!xml.includes(`/watch/${mapped[0]}<`));
  assert.ok(xml.includes(`/watch/${unmapped[0]}<`));
  assert.doesNotMatch(renderPageSitemap(base, uploads), new RegExp(`/watch/(${mapped.join('|')})<`));
});

test('the feed lists a mapped video only through its guide', () => {
  const xml = renderFeed([], uploads, 1000);
  for (const id of mapped) assert.ok(!xml.includes(`/watch/${id}<`), id);
  assert.ok(unmapped.some(id => xml.includes(`/watch/${id}<`)));
});
