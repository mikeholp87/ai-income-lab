import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import { renderWatch } from './archive.js';
import { uploads } from './uploads-snapshot.js';
import { watchPageCopy } from './watch-page-copy.js';
import { videoChapters } from './video-chapters.js';
import { durationSeconds, validChapters } from './youtube.js';

const publicVideos = uploads.filter(video => video.public !== false);
const faqQuestions = html => [...html.matchAll(/<details class="faq-item"><summary><h3>(.*?)<\/h3><\/summary>\n<p>(.*?)<\/p>/g)].map(([, q, a]) => ({ q, a }));

test('watch page copy fits search snippets and follows the writing rules', () => {
  const titles = new Set();
  for (const [id, copy] of Object.entries(watchPageCopy)) {
    const video = uploads.find(item => item.id === id);
    assert.ok(video, id);
    assert.deepEqual(Object.keys(copy).filter(key => !['title', 'description', 'disclosure'].includes(key)), [], id);
    for (const text of Object.values(copy)) assert.doesNotMatch(text, /[—;…]/, id);
    if (copy.title) {
      assert.ok(copy.title.length <= 60, `${id} title is ${copy.title.length} characters`);
      assert.ok(!titles.has(copy.title.toLowerCase()), `${id} repeats a title`);
      titles.add(copy.title.toLowerCase());
    }
    if (copy.description) assert.ok(copy.description.length >= 110 && copy.description.length <= 155, `${id} description is ${copy.description.length} characters`);
    const html = renderWatch(video);
    if (copy.title) assert.ok(html.includes(`<h1>${copy.title.replace(/&/g, '&amp;').replace(/'/g, '&#39;')}</h1>`), id);
    if (copy.description) assert.match(html, new RegExp(`<meta name="description" content="${copy.description.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`), id);
    if (copy.disclosure) assert.ok(html.includes(`<p class="meta">${copy.disclosure.replace(/&/g, '&amp;').replace(/'/g, '&#39;')}</p>`), id);
  }
});

test('watch page FAQs ask about the video, not its links, and name Mike', () => {
  for (const video of publicVideos) {
    for (const { q, a } of faqQuestions(renderWatch(video))) {
      assert.doesNotMatch(q, /affiliate|referral|sponsor/i, `${video.id}: ${q}`);
      assert.doesNotMatch(a, /\bthe presenter\b/i, `${video.id}: ${a}`);
    }
  }
});

test('saved chapters are valid for each recording', () => {
  for (const [id, chapters] of Object.entries(videoChapters)) {
    const video = uploads.find(item => item.id === id);
    assert.ok(video, id);
    assert.equal(validChapters(chapters, durationSeconds(video.duration)).length, chapters.length, id);
    assert.match(renderWatch(video), /<h2 id="chapters">/, id);
  }
});

test('every watch page links a related guide', () => {
  for (const video of publicVideos) {
    const links = [...renderWatch(video).matchAll(/href="(\/guides\/[^"#]+)"/g)].map(([, path]) => path);
    assert.ok(links.some(path => existsSync(new URL(`../public${path}`, import.meta.url))), video.id);
  }
});
