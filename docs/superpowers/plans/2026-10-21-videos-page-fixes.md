# /videos Page Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix findings 1–13 and 15 of the 2026-10-21 `/videos` audit: chapter-list summaries, the reading-page cookie bar, soft thumbnails, missing card data, uneven grid, long pager, no community path, and copy that overclaims.

**Architecture:** The archive is server-rendered by `renderArchive()` in `src/archive.js` (served by `api/videos.js`, which the Vite dev server also mounts) with its own inline `<style>` block. Summaries come from `summarize()` in `src/youtube.js`, shared by the homepage feed, the archive and the watch pages. The cookie bar for all reading pages lives in `public/consent.css` and is created by `src/reading.js`. Tests are Node's built-in runner: `src/archive.test.js` renders HTML strings and asserts on them; `src/youtube.test.js` unit-tests parsers.

**Tech Stack:** Node 24 ESM, plain template-string HTML, inline CSS, Node test runner, ESLint 9, `agent-browser` for screenshots, Vercel (push to `main` deploys).

**Spec:** `docs/audits/2026-10-21-videos-page-audit.md`

## Global Constraints

- Keep URLs and pagination exactly: `/videos`, `/videos/2` … with 15 videos per page (`perPage = 15`), canonical, `rel="prev"`/`rel="next"`, and the CollectionPage/ItemList schema. Sitemaps depend on them.
- Every dynamic string inserted into HTML goes through `escape()`.
- `src/reading.js` contracts must hold: each thumbnail is `<picture data-thumbnail>` whose `<img>` immediately follows a `<source>` (the error fallback removes `previousElementSibling`); the page has a `<footer>` (the "Privacy choices" button is appended there); Skool links may carry `data-placement` for analytics.
- Visual direction stays: `#0a0a0a` background, `#ff6846` orange, Archivo Black headings, DM Mono for labels/meta, pill buttons.
- New-tab marker rule: buttons and standalone links that open a new tab end with ` ↗`.
- Skool plans URL: `https://www.skool.com/ai-automation-station-7346/plans`.
- No new npm dependencies. The only new asset is `public/fonts/instrument-sans.woff2`, copied from the installed `@fontsource-variable/instrument-sans` package.
- Do not touch watch-page markup (`renderWatch`) or the static pages' `<header>` (pinned by `src/guides.test.js`); both are noted as follow-ups.
- Tests: `npm test`. Lint: `rtk proxy npx eslint .` (exit 0 = clean; plain `npm run lint` returns a false exit 2 through the rtk wrapper).
- Commit messages: sentence case, imperative, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Commit only the files a task lists.
- Never stage `src/youtube-snapshot.json`, `src/uploads-snapshot.js`, `src/thumbnail-snapshot.json` or `public/assets/thumbnails/*`. Do not push; the coordinator asks the owner (Task 8).

## Finding → task map

| Finding | Task |
|---|---|
| 1 chapter-list summaries | 1 |
| 3 soft thumbnails, 6 duration and views | 2 |
| 5 font, 8 grid columns, 9 uneven summaries, 15 inline styles | 3 |
| 10 pager | 4 |
| 4 header (for `/videos`), 11 community path, 12 intro copy | 5 |
| 2 cookie bar, 7 "Privacy choices" colour | 6 |
| 13 video counts (owner decision) | 7 |
| verification, record, push question | 8 |
| 14 topic pages | not in this plan |

## Visual check setup

The coordinator runs `npm run dev -- --port 5173 --strictPort`. `/videos` is served live from `api/videos.js` by Vite middleware, and `/assets/reading.js` is rewritten to `src/reading.js`, so the cookie bar appears in dev. Vite loads `api/videos.js` through the config file; before screenshotting, confirm the change is live with `curl -s http://localhost:5173/videos | grep -c '<marker from your task>'`. If the count is 0, stop and report so the coordinator can restart the server.

Screenshots go to `docs/audits/2026-10-21-videos-screenshots/`. Wait 1500ms after `agent-browser open`. To screenshot further down, use `agent-browser eval "window.scrollTo(0, <y>); 1"` and wait 800ms.

---

### Task 1: Summaries skip chapter lists (finding 1)

**Files:**
- Modify: `src/youtube.js:21`
- Test: `src/youtube.test.js`

**Interfaces:**
- Produces: `summarize(description: string): string`, unchanged signature. It now skips chapter-list paragraphs.

- [ ] **Step 1: Write the failing test**

In `src/youtube.test.js`, change the import line

```js
import { formatDuration, longFormPlaylistId, parseApi, parseChannel, parseChapters, parseFeed, validChapters } from './youtube.js';
```

to

```js
import { formatDuration, longFormPlaylistId, parseApi, parseChannel, parseChapters, parseFeed, summarize, validChapters } from './youtube.js';
```

and append:

```js
test('summaries skip chapter lists at the top of a description', () => {
  assert.equal(summarize('⌚ Timestamps:\n00:00 - Intro to Runable AI\n00:48 - AI Business Website Project\n\nBuild an AI website in Runable.'), 'Build an AI website in Runable.');
  assert.equal(summarize('Chapters\n\n00:00 Intro\n01:10 Setup\n\nSet up Codex on Linux.'), 'Set up Codex on Linux.');
  // One time in a sentence is ordinary text, not a chapter list.
  assert.equal(summarize('Watch the 10:30 demo of Claude Code.'), 'Watch the 10:30 demo of Claude Code.');
  assert.equal(summarize('Join\nhttps://example.com\n\nBuild an agent.'), 'Build an agent.');
  assert.equal(summarize('00:00 Intro\n01:00 End'), '');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/youtube.test.js`
Expected: FAIL, with `'⌚ Timestamps:\n00:00 - …' !== 'Build an AI website in Runable.'`.

- [ ] **Step 3: Implement**

In `src/youtube.js`, replace line 21:

```js
export const summarize = description => description.split(/\n\s*\n/).map(part => part.trim()).find(part => part && !/https?:\/\//.test(part)) ?? '';
```

with:

```js
// A chapter list ("⌚ Timestamps:", "00:00 Intro" lines) is navigation, not a summary.
const chapterList = part => /^\W*(?:time ?stamps|chapters)\b/i.test(part) || (part.match(/\b\d{1,2}:\d{2}\b/g) ?? []).length >= 2;
export const summarize = description => description.split(/\n\s*\n/).map(part => part.trim()).find(part => part && !/https?:\/\//.test(part) && !chapterList(part)) ?? '';
```

- [ ] **Step 4: Run all tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass (the full suite covers the archive, watch and feed callers), lint exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/youtube.js src/youtube.test.js
git commit -m "Skip chapter lists when summarizing video descriptions

The newest upload's card and watch-page meta description read '⌚ Timestamps: 00:00 …' because its description opens with chapters.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Production picks this up on the next deploy: the build's `scripts/refresh-videos.js` re-parses every description.

---

### Task 2: Sharp thumbnails, duration and views on cards (findings 3, 6)

**Files:**
- Modify: `src/archive.js:1` (import), `src/archive.js:71-74` (`card`), the `<style>` block (`time` rule and `li` rules, ~lines 130-135)
- Test: `src/archive.test.js` (update the thumbnail assertion at ~line 285, add one test)

**Interfaces:**
- Consumes: `formatDuration(iso: string): string` from `src/youtube.js` (returns `''` for missing or invalid input).
- Produces: summary paragraphs carry `class="summary"`; Task 3 styles `li .summary`.

- [ ] **Step 1: Write the failing test and update the old thumbnail assertion**

In `src/archive.test.js`, replace:

```js
  assert.match(html, /<picture data-thumbnail><source type="image\/webp" srcset="https:\/\/i.ytimg.com\/vi_webp\/a1\/mqdefault.webp"><img src="https:\/\/i.ytimg.com\/vi\/a1\/mqdefault.jpg"/);
```

with:

```js
  assert.match(html, /<picture data-thumbnail><source type="image\/webp" srcset="https:\/\/i.ytimg.com\/vi_webp\/a1\/mqdefault.webp 320w, [^"]+"[^>]*><img src="https:\/\/i.ytimg.com\/vi\/a1\/mqdefault.jpg"/);
```

Append:

```js
test('archive cards show sharp thumbnails, duration and views', () => {
  const video = { id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: 'Build an agent.', duration: 'PT18M3S', views: 1234, embeddable: true };
  const html = renderArchive([video]);
  assert.match(html, /srcset="https:\/\/i.ytimg.com\/vi_webp\/a1b2c3d4e5f\/mqdefault.webp 320w, https:\/\/i.ytimg.com\/vi_webp\/a1b2c3d4e5f\/hqdefault.webp 480w" sizes="/);
  assert.match(html, /<img src="https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/mqdefault.jpg" srcset="https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/mqdefault.jpg 320w, https:\/\/i.ytimg.com\/vi\/a1b2c3d4e5f\/hqdefault.jpg 480w" sizes="/);
  assert.match(html, /<span class="duration">18:03<\/span>/);
  assert.match(html, /<p class="meta"><time datetime="2026-10-20T00:00:00Z">Oct 20, 2026<\/time><span>1,234 views<\/span><\/p>/);
  assert.match(html, /<p class="summary">Build an agent.<\/p>/);
  const bare = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: '' }]);
  assert.doesNotMatch(bare, /class="duration"|views<\/span>/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test src/archive.test.js`
Expected: 2 failures (the updated thumbnail assertion and the new test).

- [ ] **Step 3: Implement the card**

In `src/archive.js` line 1, replace:

```js
import { channelUrl, clock, durationSeconds, longFormPlaylistId, parseChapters, summarize, validChapters } from './youtube.js';
```

with:

```js
import { channelUrl, clock, durationSeconds, formatDuration, longFormPlaylistId, parseChapters, summarize, validChapters } from './youtube.js';
```

Replace the whole `card` constant (lines 71-74):

```js
const card = (video, eager) => `<li><a href="${escape(videoHref(video))}"${video.embeddable ? '' : ' target="_blank" rel="noreferrer"'}>
<picture data-thumbnail><source type="image/webp" srcset="https://i.ytimg.com/vi_webp/${escape(video.id)}/mqdefault.webp"><img src="https://i.ytimg.com/vi/${escape(video.id)}/mqdefault.jpg" alt="" width="320" height="180" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></picture>
<time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>
<h3>${escape(video.title)}</h3>${video.summary || watchNotes[video.id] || videoNotes[video.id] ? `\n<p>${escape(videoDescription(video))}</p>` : ''}</a></li>`;
```

with:

```js
// One column below ~655px, otherwise columns of about 300-360px (see the grid rule in renderArchive).
const thumbSizes = '(max-width: 655px) calc(100vw - 32px), 360px';
const thumbSet = (id, folder, ext) => `https://i.ytimg.com/${folder}/${id}/mqdefault.${ext} 320w, https://i.ytimg.com/${folder}/${id}/hqdefault.${ext} 480w`;
const viewCount = video => Number.isFinite(video.views) ? `<span>${number.format(video.views)} ${video.views === 1 ? 'view' : 'views'}</span>` : '';
const card = (video, eager) => {
  const id = escape(video.id);
  const duration = formatDuration(video.duration);
  return `<li><a href="${escape(videoHref(video))}"${video.embeddable ? '' : ' target="_blank" rel="noreferrer"'}>
<span class="thumb"><picture data-thumbnail><source type="image/webp" srcset="${thumbSet(id, 'vi_webp', 'webp')}" sizes="${thumbSizes}"><img src="https://i.ytimg.com/vi/${id}/mqdefault.jpg" srcset="${thumbSet(id, 'vi', 'jpg')}" sizes="${thumbSizes}" alt="" width="320" height="180" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></picture>${duration ? `<span class="duration">${duration}</span>` : ''}</span>
<p class="meta"><time datetime="${escape(video.published)}">${dateFormat.format(new Date(video.published))}</time>${viewCount(video)}</p>
<h3>${escape(video.title)}</h3>${video.summary || watchNotes[video.id] || videoNotes[video.id] ? `\n<p class="summary">${escape(videoDescription(video))}</p>` : ''}</a></li>`;
};
```

`number` (an `Intl.NumberFormat('en')`) and `videoDescription` are declared further down the file (~lines 163-164). They are only read when `card()` runs, after the module has loaded, so the order is safe.

`hqdefault` is a 4:3 image with letterbox bars. The existing `aspect-ratio: 16 / 9; object-fit: cover` on `li img` crops them.

- [ ] **Step 4: Style the new elements**

In the `<style>` block, replace:

```css
time { color: #8c8c86; font: 400 12px 'DM Mono', monospace; }
```

with:

```css
.meta { display: flex; flex-wrap: wrap; gap: 4px 16px; color: #8c8c86; font: 400 12px 'DM Mono', monospace; }
.thumb { position: relative; display: block; }
.duration { position: absolute; right: 8px; bottom: 8px; padding: 2px 6px; color: #fff; background: rgb(0 0 0 / .8); font: 500 12px/1.4 'DM Mono', monospace; }
```

and replace:

```css
li p { color: #8c8c86; font-size: 14px; }
```

with:

```css
li .summary { color: #8c8c86; font-size: 14px; }
```

- [ ] **Step 5: Run the tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 6: Check visually**

```bash
D=docs/audits/2026-10-21-videos-screenshots; mkdir -p $D
curl -s http://localhost:5173/videos | grep -c 'class="duration"'
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser eval "window.scrollTo(0, 450); 1" && agent-browser wait 800 && agent-browser screenshot $D/t2-desktop-cards.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser eval "window.scrollTo(0, 600); 1" && agent-browser wait 800 && agent-browser screenshot $D/t2-mobile-card.png
agent-browser eval "document.querySelector('main li img').currentSrc"
agent-browser close
```

Expected: the curl count is greater than 0. Each card shows a duration badge at the bottom right of the thumbnail and "date  N views" above the title. On the phone, `currentSrc` ends in `hqdefault.webp` (or `.jpg`) and the thumbnail looks sharp.

- [ ] **Step 7: Commit**

```bash
git add src/archive.js src/archive.test.js
git commit -m "Show sharp thumbnails, duration and views on archive cards

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Homepage type, even three-column grid, no inline styles (findings 5, 8, 9, 15)

**Files:**
- Create: `public/fonts/instrument-sans.woff2` (copy)
- Modify: `src/archive.js` `<style>` block and the "New here?" line (~line 150)
- Test: `src/archive.test.js`

**Interfaces:**
- Consumes: `li .summary` from Task 2.

- [ ] **Step 1: Write the failing test**

In `src/archive.test.js`, after `import test from 'node:test';` add:

```js
import { existsSync } from 'node:fs';
```

Append:

```js
test('archive type and grid match the homepage and keep cards even', () => {
  const html = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: 'Build an agent.' }]);
  assert.ok(existsSync(new URL('../public/fonts/instrument-sans.woff2', import.meta.url)));
  assert.match(html, /@font-face \{ font-family: 'Instrument Sans'; font-weight: 400 700; font-display: swap; src: url\('\/fonts\/instrument-sans.woff2'\) format\('woff2'\); \}/);
  assert.match(html, /body \{[^}]*font: 16px\/1\.6 'Instrument Sans', system-ui, sans-serif;/);
  // 300px minimum gives three columns in the 1120px shell, so 15 cards fill five rows.
  assert.match(html, /grid-template-columns: repeat\(auto-fill, minmax\(300px, 1fr\)\)/);
  assert.match(html, /li \.summary \{[^}]*-webkit-line-clamp: 3;[^}]*line-clamp: 3;/);
  assert.doesNotMatch(html, / style="/);
  assert.match(html, /<p class="start"><a href="\/start-here.html">New here\? Choose your first build<\/a> or <a href="\/guides.html">read the free guides<\/a><\/p>/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/archive.test.js`
Expected: FAIL on the `existsSync` assertion.

- [ ] **Step 3: Add the font file**

```bash
cp node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2 public/fonts/instrument-sans.woff2
```

This is the same variable Latin file the homepage bundles (about 30 KB, OFL licence).

- [ ] **Step 4: Update the style block**

In `src/archive.js`, replace:

```css
@font-face { font-family: 'DM Mono'; font-display: swap; src: url('/fonts/dm-mono.woff2') format('woff2'); }
```

with:

```css
@font-face { font-family: 'DM Mono'; font-display: swap; src: url('/fonts/dm-mono.woff2') format('woff2'); }
@font-face { font-family: 'Instrument Sans'; font-weight: 400 700; font-display: swap; src: url('/fonts/instrument-sans.woff2') format('woff2'); }
```

Replace:

```css
body { margin: 0; background: #0a0a0a; color: #f5f5f0; font: 16px/1.6 system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
```

with:

```css
body { margin: 0; background: #0a0a0a; color: #f5f5f0; font: 16px/1.6 'Instrument Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
```

Replace:

```css
ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 40px 24px; margin: 0; padding: 0; list-style: none; }
```

with:

```css
ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 40px 24px; margin: 0; padding: 0; list-style: none; }
```

Replace:

```css
h3 { font-size: 17px; line-height: 1.3; text-wrap: pretty; }
```

with:

```css
h3 { font-size: 17px; font-weight: 600; line-height: 1.3; text-wrap: pretty; }
```

Replace (from Task 2):

```css
li .summary { color: #8c8c86; font-size: 14px; }
```

with:

```css
/* Three lines keep cards in a row the same height; the full summary is on the watch page. */
li .summary { display: -webkit-box; overflow: hidden; color: #8c8c86; font-size: 14px; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
.start { margin-top: 24px; }
.start a { color: #ff6846; text-decoration: underline; text-underline-offset: 3px; }
```

- [ ] **Step 5: Remove the inline styles**

Replace:

```html
<p style="margin-top:24px"><a href="/start-here.html" style="color:#ff6846;text-decoration:underline">New here? Choose your first build</a> or <a href="/guides.html" style="color:#ff6846;text-decoration:underline">read the free guides</a></p>
```

with:

```html
<p class="start"><a href="/start-here.html">New here? Choose your first build</a> or <a href="/guides.html">read the free guides</a></p>
```

- [ ] **Step 6: Run the tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-videos-screenshots
curl -s http://localhost:5173/videos | grep -c 'minmax(300px'
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t3-desktop-top.png
agent-browser eval "window.scrollTo(0, 1700); 1" && agent-browser wait 800 && agent-browser screenshot $D/t3-desktop-grid-end.png
agent-browser eval "getComputedStyle(document.body).fontFamily + ' | cols=' + getComputedStyle(document.querySelector('main ul')).gridTemplateColumns.split(' ').length"
agent-browser close
```

Expected: the curl count is greater than 0. Three columns, with the last row full (15 = 3 × 5). Summaries are cut to 3 lines with an ellipsis. The body font reports `"Instrument Sans"`. The "New here?" line looks as before.

- [ ] **Step 8: Commit**

```bash
git add public/fonts/instrument-sans.woff2 src/archive.js src/archive.test.js
git commit -m "Use Instrument Sans and an even three-column grid on the archive

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Short page list (finding 10)

**Files:**
- Modify: `src/archive.js:60-66` (`pager`) and the `<style>` block (`.pager` rules)
- Test: `src/archive.test.js`

**Interfaces:**
- Produces: `pager(page, pages)` (module-private) renders first, last, current ±1, the single page in a one-page gap, and `…` for longer gaps.

- [ ] **Step 1: Write the failing test**

Append to `src/archive.test.js`:

```js
test('long archives show first, last and nearby pages only', () => {
  const videos = Array.from({ length: 225 }, (_, index) => ({ id: `v${index}`, title: `Video ${index}`, published: new Date(Date.UTC(2026, 9, 1) - index * 86400000).toISOString(), summary: '' }));
  const pages = page => renderArchive(videos, page).match(/<nav class="pager[^>]*>(.*?)<\/nav>/)[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.equal(pages(1), '1 2 … 15 Older →');
  assert.equal(pages(3), '← Newer 1 2 3 4 … 15 Older →');
  assert.equal(pages(4), '← Newer 1 2 3 4 5 … 15 Older →');
  assert.equal(pages(8), '← Newer 1 … 7 8 9 … 15 Older →');
  assert.equal(pages(15), '← Newer 1 … 14 15');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/archive.test.js`
Expected: FAIL, with the actual value listing all 15 numbers.

- [ ] **Step 3: Implement**

Replace lines 60-66:

```js
// ponytail: every page number is listed; switch to a windowed list if the archive passes ~40 pages.
function pager(page, pages) {
  if (pages === 1) return '';
  const link = (to, label, rel) => `<a href="${pagePath(to)}"${rel ? ` rel="${rel}"` : ''}>${label}</a>`;
  const numbers = Array.from({ length: pages }, (_, index) => index + 1).map(n => n === page ? `<span aria-current="page">${n}</span>` : link(n, n));
  return `<nav class="pager mono" aria-label="Video pages">${page > 1 ? link(page - 1, '← Newer', 'prev') : ''}${numbers.join('')}${page < pages ? link(page + 1, 'Older →', 'next') : ''}</nav>`;
}
```

with:

```js
// First, last and the current page's neighbours; a one-page gap shows that page, longer gaps an ellipsis.
function pager(page, pages) {
  if (pages === 1) return '';
  const link = (to, label, rel) => `<a href="${pagePath(to)}"${rel ? ` rel="${rel}"` : ''}>${label}</a>`;
  const shown = Array.from({ length: pages }, (_, index) => index + 1).filter(n => n === 1 || n === pages || Math.abs(n - page) <= 1);
  const numbers = [];
  let previous = 0;
  for (const n of shown) {
    if (n - previous === 2) numbers.push(link(n - 1, n - 1));
    else if (n - previous > 2) numbers.push('<span class="gap" aria-hidden="true">…</span>');
    numbers.push(n === page ? `<span aria-current="page">${n}</span>` : link(n, n));
    previous = n;
  }
  return `<nav class="pager mono" aria-label="Video pages">${page > 1 ? link(page - 1, '← Newer', 'prev') : ''}${numbers.join('')}${page < pages ? link(page + 1, 'Older →', 'next') : ''}</nav>`;
}
```

In the `<style>` block, after:

```css
.pager [aria-current] { border-color: #ff6846; color: #f5f5f0; }
```

add:

```css
.pager .gap { min-width: 0; padding: 0 4px; border: 0; }
```

- [ ] **Step 4: Run the tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass (the existing 3-page pager test still passes because every page is first, last or a neighbour), lint exit 0.

- [ ] **Step 5: Check visually**

```bash
D=docs/audits/2026-10-21-videos-screenshots
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos/8 && agent-browser wait 1500 && agent-browser eval "document.querySelector('.pager').scrollIntoView({block: 'center'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t4-mobile-pager.png
agent-browser close
```

Expected: one row on the phone: `← Newer 1 … 7 8 9 … 15 Older →`, with 8 outlined in orange.

- [ ] **Step 6: Commit**

```bash
git add src/archive.js src/archive.test.js
git commit -m "Shorten the archive page list to first, last and nearby pages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Header, community path and honest intro (findings 4, 11, 12)

**Files:**
- Modify: `src/archive.js` (header line ~147, intro line ~149, add the CTA before `${pager(page, pages)}`, `<style>` block)
- Test: `src/archive.test.js` (update `2 long-form builds`, add one test)

**Interfaces:**
- Produces: Skool links with `data-placement="video_archive_header"` and `data-placement="video_archive"`, which `src/reading.js` reports as `skool_outbound_clicked` (consent-gated).

Scope: `/videos` gets the same links as the guides pages (Start here, Guides, All videos) plus a Join button, keeping the "Mike Holp" brand those pages use. The static pages and watch pages are not changed (Global Constraints).

- [ ] **Step 1: Write the failing test**

In `src/archive.test.js`, replace:

```js
  assert.match(html, /2 long-form builds/);
```

with:

```js
  assert.match(html, /2 long-form videos/);
```

Append:

```js
test('the archive links the reading pages and offers the community', () => {
  const html = renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: '' }]);
  assert.match(html, /<nav class="mono" aria-label="Site"><a href="\/start-here.html">Start here<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos" aria-current="page">All videos<\/a><\/nav>/);
  assert.match(html, /<a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="video_archive_header">Join AI Income Lab ↗<\/a>/);
  assert.match(html, /<aside class="cta" aria-label="AI Income Lab"><p>[^<]*from \$29\/month\.<\/p><a class="join" [^>]*data-placement="video_archive">Join AI Income Lab ↗<\/a><\/aside>/);
  assert.ok(html.indexOf('class="cta"') > html.lastIndexOf('</ul>'));
  assert.doesNotMatch(html, /builds something real with it/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test src/archive.test.js`
Expected: 2 failures.

- [ ] **Step 3: Replace the header**

Replace:

```html
<header class="shell"><a class="brand" href="/"><span></span>Mike Holp</a><a class="mono" href="${channelUrl}" target="_blank" rel="noreferrer">YouTube ↗</a></header>
```

with:

```html
<header class="shell"><a class="brand" href="/"><span></span>Mike Holp</a><nav class="mono" aria-label="Site"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos" aria-current="page">All videos</a></nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="video_archive_header">Join AI Income Lab ↗</a></header>
```

The YouTube link stays in the footer ("Subscribe on YouTube ↗"). `channelUrl` is still used there and by the 503 message in `api/videos.js`, so the import stays.

- [ ] **Step 4: Rewrite the intro**

Replace:

```
${videos.length} long-form builds, newest first. ${pageNote}Each one takes a new AI model, agent, or automation tool, builds something real with it, and shows what held up and what broke.
```

with:

```
${videos.length} long-form videos, newest first. ${pageNote}Hands-on builds with new AI models, agents and automation tools, plus breakdowns of new releases.
```

- [ ] **Step 5: Add the community block**

Replace:

```
${pager(page, pages)}
</main>
```

with:

```
<aside class="cta" aria-label="AI Income Lab"><p>Build along with AI Income Lab: step-by-step courses, templates and a community of 2,900+ members, from $29/month.</p><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="video_archive">Join AI Income Lab ↗</a></aside>
${pager(page, pages)}
</main>
```

- [ ] **Step 6: Style the header and the block**

In the `<style>` block, replace:

```css
footer a:hover, header a.mono:hover { color: #f5f5f0; }
```

with:

```css
footer a:hover, header nav a:hover, header nav [aria-current] { color: #f5f5f0; }
header { flex-wrap: wrap; }
header nav { display: flex; gap: 24px; margin-left: auto; }
.join { display: inline-flex; align-items: center; min-height: 44px; padding: 0 18px; border-radius: 999px; background: #ff6846; color: #1a0a04; font: 500 12px 'DM Mono', monospace; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }
.join:hover { background: #ff7f62; }
.cta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 32px; margin-top: 64px; padding: 28px 32px; border: 1px solid #333; border-left: 3px solid #ff6846; border-radius: 14px; background: #111; }
.cta p { max-width: 52ch; color: #b3b3ab; }
@media (max-width: 640px) { header nav { order: 3; width: 100%; margin-left: 0; } .cta { padding: 24px 20px; } }
```

- [ ] **Step 7: Run the tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 8: Check visually**

```bash
D=docs/audits/2026-10-21-videos-screenshots
curl -s http://localhost:5173/videos | grep -c 'class="cta"'
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t5-desktop-header.png
agent-browser eval "document.querySelector('.cta').scrollIntoView({block: 'center'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t5-desktop-cta.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t5-mobile-header.png
agent-browser eval "JSON.stringify({sw: document.documentElement.scrollWidth, w: innerWidth})"
agent-browser close
```

Expected: the curl count is 1. Desktop header: brand left, then START HERE / GUIDES / ALL VIDEOS (All videos brighter), then the orange JOIN pill. Phone: brand and JOIN on the first row, nav links on a second row, `sw === w`. The CTA block sits between the grid and the pager with an orange left edge.

- [ ] **Step 9: Commit**

```bash
git add src/archive.js src/archive.test.js
git commit -m "Link the reading pages and AI Income Lab from the video archive

Adds Skool placements video_archive_header and video_archive; intro no longer claims every video is a build.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Cookie bar on one row, quiet "Privacy choices" (findings 2, 7)

**Files:**
- Modify: `public/consent.css` (one minified line; three rule edits)
- Modify: `src/archive.js` `<style>` block (footer button)
- Test: `src/archive.test.js`

**Interfaces:**
- Consumes: the `.reading-consent` banner and the footer `<button>` that `src/reading.js` creates on every reading page.

`consent.css` is shared by `/videos`, the watch pages, the guides and start-here. The desktop fix applies to all of them, which is intended. The footer-button colour is overridden only on `/videos`, because the guides pages style their footer links in orange to match.

- [ ] **Step 1: Write the failing test**

In `src/archive.test.js`, after the `existsSync` import (Task 3), add:

```js
import { readFile } from 'node:fs/promises';
```

Append:

```js
test('reading-page cookie bar sits on one centred row and Privacy choices matches the footer', async () => {
  const css = await readFile(new URL('../public/consent.css', import.meta.url), 'utf8');
  assert.match(css, /\.reading-consent\{position:sticky;bottom:0;z-index:10;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 24px;padding:10px 24px;/);
  assert.match(css, /\.reading-consent p\{margin:0\}/);
  assert.match(css, /\.reading-consent>div\{display:flex;gap:8px\}/);
  assert.match(renderArchive([{ id: 'a1b2c3d4e5f', title: 'Build', published: '2026-10-20T00:00:00Z', summary: '' }]), /footer button \{ min-height: 44px; color: inherit; text-decoration: none; \}/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/archive.test.js`
Expected: FAIL on the first `consent.css` assertion.

- [ ] **Step 3: Edit `public/consent.css`**

The file is one minified line. Make three exact replacements:

1. `.reading-consent{position:sticky;bottom:0;z-index:10;padding:16px 20px;background:#111;border-top:1px solid #333;font-size:14px}`
   → `.reading-consent{position:sticky;bottom:0;z-index:10;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 24px;padding:10px 24px;background:#111;border-top:1px solid #333;font-size:14px}`
2. `.reading-consent p{margin:0 auto 12px}`
   → `.reading-consent p{margin:0}`
3. `.reading-consent>div{display:flex;gap:12px;max-width:760px;margin:auto}`
   → `.reading-consent>div{display:flex;gap:8px}`

The phone rules in the same file's `@media(max-width:640px)` already switch the bar to a grid, and `.reading-consent[hidden]{display:none}` has higher specificity, so hiding still works.

- [ ] **Step 4: Quiet the footer button on `/videos`**

In `src/archive.js`, in the `<style>` block, after:

```css
header a, footer a { display: inline-flex; align-items: center; min-height: 44px; }
```

add:

```css
footer button { min-height: 44px; color: inherit; text-decoration: none; }
footer button:hover { color: #f5f5f0; }
```

This inline `<style>` comes after `<link rel="stylesheet" href="/consent.css">`, so at equal specificity it wins.

- [ ] **Step 5: Run the tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 6: Check visually (clear consent first so the bar shows)**

```bash
D=docs/audits/2026-10-21-videos-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser eval "localStorage.clear(); document.cookie.split(';').forEach(c => document.cookie = c.split('=')[0] + '=;max-age=0;path=/'); 1" && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t6-desktop-consent.png
agent-browser eval "window.scrollTo(0, document.documentElement.scrollHeight); 1" && agent-browser wait 800 && agent-browser screenshot $D/t6-desktop-footer.png
agent-browser open http://localhost:5173/guides.html && agent-browser wait 1500 && agent-browser screenshot $D/t6-desktop-guides-consent.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t6-mobile-consent.png
agent-browser close
```

Expected: on desktop `/videos` and `/guides.html`, the bar is one centred row (question, then Decline / Allow both). On the phone it looks as before (text left, buttons right). The `/videos` footer "Privacy choices" is grey like Home and Privacy, and brightens on hover.

- [ ] **Step 7: Commit**

```bash
git add public/consent.css src/archive.js src/archive.test.js
git commit -m "Put the reading-page cookie bar on one row and quiet Privacy choices on the archive

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Video counts that agree (finding 13) — owner decision required

**Gate:** Ask the owner:

> "The archive says 218 long-form videos; the homepage stat says 345 'videos published' (it counts Shorts). Relabel the homepage stat 'videos incl. Shorts' (recommended), or leave both?"

If the answer is leave both, skip this task and record it in Task 8.

**Files:**
- Modify: `src/main.jsx:91`
- Test: `src/homepage.test.js`

- [ ] **Step 1: Write the failing test**

Append to `src/homepage.test.js`:

```js
test('the homepage video count says it includes Shorts', () => {
  assert.match(jsx, /\['\d+', 'videos incl\. Shorts', 'videos'\]/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL.

- [ ] **Step 3: Implement**

In `src/main.jsx`, replace:

```js
  ['336', 'videos published', 'videos'],
```

with:

```js
  ['336', 'videos incl. Shorts', 'videos'],
```

The number is a fallback; `/api/youtube` replaces it with the live channel count, which includes Shorts.

- [ ] **Step 4: Run the tests and lint, then commit**

```bash
npm test && rtk proxy npx eslint .
git add src/main.jsx src/homepage.test.js
git commit -m "Label the homepage video count as including Shorts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Verify, record, push question

**Files:**
- Modify: `docs/audits/2026-10-21-videos-page-audit.md` (append an Implementation section)
- Add: `docs/audits/2026-10-21-videos-screenshots/*.png`, this plan file

- [ ] **Step 1: Run everything**

```bash
rtk proxy npx eslint . && npm test && npm run build
```

Expected: lint clean, all tests pass, and the build ends without `Pre-rendered page is incomplete`. Then run `git status --short` and leave the snapshot and thumbnail files the build changed unstaged.

- [ ] **Step 2: Final screenshots and heights on the dev server**

```bash
D=docs/audits/2026-10-21-videos-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser wait 2000 && agent-browser eval "document.documentElement.scrollHeight"
for y in 0 900 1800 2700; do agent-browser eval "window.scrollTo(0, $y); 1" && agent-browser wait 700 && agent-browser screenshot $D/final-desktop-$y.png; done
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos && agent-browser wait 2000 && agent-browser eval "JSON.stringify({h: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, w: innerWidth})"
for y in 0 1600 3200 4800 6400; do agent-browser eval "window.scrollTo(0, $y); 1" && agent-browser wait 700 && agent-browser screenshot $D/final-mobile-$y.png; done
agent-browser close
```

Read every screenshot. Check for no overlap, no horizontal scroll, readable buttons, and the cookie bar not covering the CTA permanently. Report any problem; do not fix it.

- [ ] **Step 3: Record**

Append to `docs/audits/2026-10-21-videos-page-audit.md`:

```markdown
## Implementation (2026-10-21)

Plan: `docs/superpowers/plans/2026-10-21-videos-page-fixes.md`.

| | Before | After |
|---|---|---|
| Desktop page height (1440×900) | 2,701px | {measured}px |
| Mobile page height (iPhone 15) | 7,138px | {measured}px |

- Findings 1–12 and 15: done.
- Finding 13 (video counts): {relabelled homepage stat "videos incl. Shorts" | left as is, owner decision}.
- Finding 14 (topic pages): not started; needs its own plan.
- New Skool placements: `video_archive_header`, `video_archive`.
- The cookie-bar change in `public/consent.css` also applies to watch, guides and start-here pages.

Screenshots: `docs/audits/2026-10-21-videos-screenshots/`.
```

Replace both `{measured}` values and the finding 13 line with real values before committing.

- [ ] **Step 4: Commit**

```bash
git add docs/audits/2026-10-21-videos-page-audit.md docs/audits/2026-10-21-videos-screenshots docs/superpowers/plans/2026-10-21-videos-page-fixes.md
git commit -m "Record /videos audit fixes and screenshots

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push question (coordinator)**

Pushing `main` deploys production. After an approved push, check:
- `curl -s https://www.ai-automation-station.com/watch/qQVAnp4-EpI | grep -o '<meta name="description" content="[^"]\{0,80\}'` no longer starts with "⌚ Timestamps".
- `/videos` shows the new header, cards and CTA at 1440px and on iPhone 15.
