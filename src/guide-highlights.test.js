import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { addGuideHighlights, guideHighlights, highlightSection } from './guide-highlights.js';
import map from './guide-video-map.json' with { type: 'json' };
import transcripts from './transcripts.json' with { type: 'json' };
import { fixTerms } from './transcript.js';
import { durationSeconds } from './youtube.js';
import { uploads } from './uploads-snapshot.js';

const norm = text => text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
const grams = (tokens, n) => new Set(tokens.slice(0, tokens.length - n + 1).map((_, i) => tokens.slice(i, i + n).join(' ')));
const filler = new Set(['so', 'and', 'now', 'okay', 'ok', 'um', 'uh', 'but', 'well', 'alright', 'all', 'right', 'yeah', 'then']);
const read = path => readFile(new URL(`../public${path}`, import.meta.url), 'utf8');
const guideWords = html => norm(html.replace(/<head>[\s\S]*?<\/head>/, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'"));
const entries = Object.entries(guideHighlights);

test('highlights exist only for mapped guides, two to four per guide, in time order inside the video', () => {
  assert.ok(entries.length >= 100, `${entries.length} guides with highlights`);
  const byId = new Map(uploads.map(video => [video.id, video]));
  for (const [id, items] of entries) {
    assert.ok(map[id], `${id} is not a mapped video`);
    assert.ok(items.length >= 2 && items.length <= 4, id);
    const length = durationSeconds(byId.get(id).duration);
    items.forEach(({ seconds, quote }, index) => {
      assert.ok(Number.isInteger(seconds) && seconds >= 0 && (!length || seconds < length), `${id} ${seconds}`);
      if (index) assert.ok(seconds > items[index - 1].seconds, id);
      assert.ok(quote.length > 40 && !/[<>]/.test(quote), id);
    });
  }
});

test('each highlight is the watch page transcript, word for word apart from dropped filler words', () => {
  for (const [id, items] of entries) {
    const source = norm(fixTerms(transcripts[id]));
    const text = ` ${source.join(' ')} `;
    for (const { quote } of items) {
      const words = norm(quote);
      // Filler words ("so", "um", ...) may be trimmed, so find the quote's words in order inside a short transcript window.
      const found = source.some((word, start) => {
        if (word !== words[0]) return false;
        let at = start;
        for (const next of words) {
          while (at < source.length && at - start <= words.length + 8 && source[at] !== next) {
            if (!filler.has(source[at])) return false;
            at++;
          }
          if (source[at] !== next) return false;
          at++;
        }
        return true;
      });
      assert.ok(found || text.includes(` ${words.join(' ')} `), `${id}: "${quote}" is not in the transcript`);
    }
  }
});

test('highlights do not repeat the guide: no five-word run of a highlight appears in the guide text', async () => {
  for (const [id, items] of entries) {
    const guide = grams(guideWords(await read(map[id][0])), 5);
    for (const { quote } of items) {
      const shared = [...grams(norm(quote), 5)].filter(gram => guide.has(gram));
      assert.deepEqual(shared, [], `${map[id][0]}: "${quote}"`);
    }
  }
});

test('the section goes right after the guide player and chapters, once, with YouTube timestamp links', async () => {
  const [id, items] = entries.find(([videoId]) => map[videoId]);
  const path = map[id][0];
  const html = await read(path);
  const out = addGuideHighlights(html, path);
  assert.equal(addGuideHighlights(out, path), out);
  assert.equal(out.match(/id="from-the-video"/g).length, 1);
  const at = out.indexOf('<section aria-labelledby="from-the-video">');
  const figure = out.indexOf(`<figure class="video"><a class="player" href="https://www.youtube.com/watch?v=${id}"`);
  assert.ok(figure > -1 && at > figure);
  assert.doesNotMatch(out.slice(figure, at), /<h2/);
  for (const { seconds } of items) assert.ok(out.includes(`<a href="https://www.youtube.com/watch?v=${id}&amp;t=${seconds}s">`));
  assert.ok(out.includes(`<a href="/watch/${id}#transcript">Read the full transcript</a>`));
  // Only the guide body grows: head, title and meta stay as they were.
  assert.equal(out.slice(0, out.indexOf('</head>')), html.slice(0, html.indexOf('</head>')));
  assert.equal(out.replace(/\n<section aria-labelledby="from-the-video">[\s\S]*?<\/section>/, ''), html);
});

test('no section on a guide that is not the video page, has no highlights, or has several players', async () => {
  const [id] = entries[0];
  const path = map[id][0];
  const html = await read(path);
  assert.equal(addGuideHighlights(html, '/guides/other.html'), html);
  const unlisted = Object.keys(map).find(videoId => !guideHighlights[videoId]);
  if (unlisted) assert.equal(addGuideHighlights(await read(map[unlisted][0]), map[unlisted][0]), await read(map[unlisted][0]));
  const multi = await read('/guides/grokbot-vs-dots.html');
  assert.equal(addGuideHighlights(multi, '/guides/grokbot-vs-dots.html'), multi);
  assert.match(highlightSection('aaaaaaaaaaa', [{ seconds: 75, quote: 'Fish & "chips" <b>' }]), /1:15<\/a> <q>Fish &amp; &quot;chips&quot; &lt;b&gt;<\/q>/);
});
