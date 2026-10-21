# Video Topic Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add eight topic pages at `/videos/<slug>` (Claude Code, Codex and OpenCode, n8n, Make.com, AI agents, AI SEO, AI video and YouTube, New AI models), each listing every matching video, linked from a topic row on the archive and listed in the sitemap.

**Architecture:** Topic definitions (slug, name, one-sentence intro, title pattern) live in a new data module `src/topics.js`. `renderArchive(videos, page, topic)` in `src/archive.js` gains an optional `topic`: it filters by title pattern, renders all matches on one page with the topic's title, canonical and intro, and every archive/topic page shows a topic link row. `api/videos.js` already receives `/videos/<anything>` via the existing Vercel rewrite `/videos/:page → /api/videos?page=:page`; it now resolves non-numeric values to a topic or 404. `renderPageSitemap` adds topic URLs.

**Tech Stack:** Node 24 ESM, template-string HTML, inline CSS, Node test runner, ESLint 9, `agent-browser`, Vercel.

**Spec:** finding 14 of `docs/audits/2026-10-21-videos-page-audit.md`, plus the design decisions below.

## Design decisions (from the snapshot of 218 uploads)

| Slug | Name | Videos | Title pattern (case-insensitive) |
|---|---|---|---|
| `claude-code` | Claude Code | 21 | `claude code\|claude (skills?\|design\|routines)` |
| `codex-opencode` | Codex and OpenCode | 13 | `\bcodex\b\|open ?code` |
| `n8n` | n8n | 14 | `\bn8n\b` |
| `make-com` | Make.com | 9 | `make\.com` |
| `ai-agents` | AI agents | 38 | `\bagents?\b\|grok ?bot\|hermes\|openclaw\|second brain\|chief of staff\|personal ai assistant` |
| `ai-seo` | AI SEO | 19 | `\bseo\b\|\baeo\b\|\bgeo\b\|ai (search\|visibility\|answer engines?)\|invisible to ai\|search (visibility\|ranking)` |
| `ai-video` | AI video and YouTube | 33 | `\bvideos?\b\|shorts\|thumbnails?\|youtube\|opusclip\|vidiq\|tube ?analytics\|heygen\|avatar` |
| `new-models` | New AI models | 31 | `claude (opus\|sonnet\|haiku\|fable\|mythos)\|\bgpt[- ]?\d\|chatgpt (\d\|images)\|gemini \d\|grok \d\|deepseek\|\bglm\b\|qwen\|kimi\|llama\|meta muse\|mistral\|openai just released` |

- A video can sit in several topics; 65 of 218 match none and stay only in the full archive.
- URL `/videos/<slug>`: one path segment, so the existing rewrite covers it, and slugs never collide with page numbers (slugs start with a letter).
- A topic page shows all its videos on one page (largest today: 38). The code carries a `ponytail:` note to paginate past ~60.
- A topic with zero matching videos returns 404 and is left out of the sitemap, so no empty pages get indexed.
- Patterns match titles only, because summaries are noisy; new uploads join topics automatically.

## Global Constraints

- Existing URLs keep working exactly: `/videos`, `/videos/2` … `/videos/15`, `/videos/1` → 308 to `/videos`, non-numeric non-topic values → 404.
- Every dynamic string inserted into HTML goes through `escape()`.
- Topic patterns are `RegExp` literals **without** the `g` flag, because `.test()` with `g` is stateful.
- Keep the `src/reading.js` contracts: thumbnail `<picture data-thumbnail>` with `<source>` before `<img>`; a `<footer>` on every page; `data-placement` on Skool links. `/videos/<slug>` paths already report `video_archive_view`.
- Visual direction as on `/videos`: `#0a0a0a`, `#ff6846`, Archivo Black headings, DM Mono labels, pill shapes.
- No new dependencies. New files: `src/topics.js`, `src/topics.test.js`, screenshots.
- Tests: `npm test`. Lint: `rtk proxy npx eslint .` (exit 0 = clean).
- Commits: sentence case, imperative, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; stage only the files a task lists. Never stage `src/*-snapshot.*` or `public/assets/thumbnails/*`. Do not push (Task 4 asks the owner).

## Visual check setup

The coordinator runs `npm run dev -- --port 5173 --strictPort`. Before screenshots, confirm the dev server serves your change with the `curl` given in the task; if it prints 0, stop and report so the coordinator restarts the server. Screenshots go to `docs/audits/2026-10-21-topic-screenshots/`. Wait 1500ms after `agent-browser open`; scroll with `agent-browser eval "window.scrollTo(0, <y>); 1"` plus an 800ms wait.

---

### Task 1: Topic definitions

**Files:**
- Create: `src/topics.js`
- Create: `src/topics.test.js`

**Interfaces:**
- Produces: `topics: Array<{ slug: string, name: string, intro: string, pattern: RegExp }>` in display order, and `topicBySlug(slug: string): topic | undefined`.

- [ ] **Step 1: Write the failing test**

Create `src/topics.test.js`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { topicBySlug, topics } from './topics.js';
import { uploads } from './uploads-snapshot.js';

test('every topic has a readable slug, an intro and enough videos to stand alone', () => {
  assert.equal(topics.length, 8);
  assert.equal(new Set(topics.map(topic => topic.slug)).size, topics.length);
  for (const topic of topics) {
    // Starts with a letter, so it can never be mistaken for an archive page number.
    assert.match(topic.slug, /^[a-z][a-z0-9-]*$/, topic.slug);
    assert.equal(topic.pattern.global, false, topic.slug);
    assert.match(topic.intro, /^[A-Z].*\.$/, topic.slug);
    assert.ok(uploads.filter(video => topic.pattern.test(video.title)).length >= 6, `${topic.slug} has fewer than 6 videos`);
  }
  assert.equal(topicBySlug('claude-code').name, 'Claude Code');
  assert.equal(topicBySlug('2'), undefined);
  assert.equal(topicBySlug('not-a-topic'), undefined);
});

test('topic patterns sort familiar titles', () => {
  const slugs = title => topics.filter(topic => topic.pattern.test(title)).map(topic => topic.slug);
  assert.deepEqual(slugs('This Claude Code Hack Saves Token Usage'), ['claude-code']);
  assert.deepEqual(slugs('Claude Opus 5.5 Is Better And 40% Cheaper!'), ['new-models']);
  assert.deepEqual(slugs('Make.com AI Automations Without Code'), ['make-com']);
  assert.deepEqual(slugs('Here\'s Why I Decided To Escape The Rat Race'), []);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/topics.test.js`
Expected: FAIL with `Cannot find module` for `./topics.js`.

- [ ] **Step 3: Create `src/topics.js`**

```js
// Archive topic pages at /videos/<slug>. A video joins every topic whose pattern matches its title,
// so new uploads are sorted automatically; titles that match nothing stay in the full archive only.
// ponytail: title regexes, tuned on the October 2026 uploads; switch to hand-kept tags if they misfile often.
export const topics = [
  { slug: 'claude-code', name: 'Claude Code', intro: 'Builds, skills and workflows with Anthropic’s Claude Code in the terminal.', pattern: /claude code|claude (skills?|design|routines)/i },
  { slug: 'codex-opencode', name: 'Codex and OpenCode', intro: 'Coding-agent builds with OpenAI Codex and OpenCode, from setup to side-by-side tests.', pattern: /\bcodex\b|open ?code/i },
  { slug: 'n8n', name: 'n8n', intro: 'Workflows and AI automations in n8n, from a first build to self-hosted agents.', pattern: /\bn8n\b/i },
  { slug: 'make-com', name: 'Make.com', intro: 'No-code AI automations built step by step in Make.com.', pattern: /make\.com/i },
  { slug: 'ai-agents', name: 'AI agents', intro: 'Personal assistants, research agents and agent tools tested on real tasks.', pattern: /\bagents?\b|grok ?bot|hermes|openclaw|second brain|chief of staff|personal ai assistant/i },
  { slug: 'ai-seo', name: 'AI SEO', intro: 'Tools and tests for getting a site found in Google and in AI answers.', pattern: /\bseo\b|\baeo\b|\bgeo\b|ai (search|visibility|answer engines?)|invisible to ai|search (visibility|ranking)/i },
  { slug: 'ai-video', name: 'AI video and YouTube', intro: 'AI video editing, Shorts, thumbnails and avatar workflows for creators.', pattern: /\bvideos?\b|shorts|thumbnails?|youtube|opusclip|vidiq|tube ?analytics|heygen|avatar/i },
  { slug: 'new-models', name: 'New AI models', intro: 'Launch breakdowns and first tests of new models from Anthropic, OpenAI, Google, xAI and others.', pattern: /claude (opus|sonnet|haiku|fable|mythos)|\bgpt[- ]?\d|chatgpt (\d|images)|gemini \d|grok \d|deepseek|\bglm\b|qwen|kimi|llama|meta muse|mistral|openai just released/i },
];

export const topicBySlug = slug => topics.find(topic => topic.slug === slug);
```

- [ ] **Step 4: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0. If one topic's count assertion fails, report the counts; do not loosen the floor.

- [ ] **Step 5: Commit**

```bash
git add src/topics.js src/topics.test.js
git commit -m "Define eight video topics matched by title

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Render topic pages and the topic row

**Files:**
- Modify: `src/archive.js` (imports, add `topicNav`, `renderArchive` opening block and template lines, `<style>`)
- Test: `src/archive.test.js`

**Interfaces:**
- Consumes: `topics`, `topicBySlug` from `src/topics.js` (Task 1).
- Produces: `renderArchive(videos: Video[], page = 1, topic: Topic | null = null): string`. With `topic`, `page` is ignored (always 1).

- [ ] **Step 1: Write the failing tests**

In `src/archive.test.js`, after the line `import { videoOffer } from './video-offer.js';` add:

```js
import { topicBySlug, topics } from './topics.js';
```

Append:

```js
test('topic pages list only matching videos on one page with their own canonical', () => {
  const videos = [
    { id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '', embeddable: true },
    { id: 'bbbbbbbbbbb', title: 'n8n agent build', published: '2026-10-01T00:00:00Z', summary: '', embeddable: true },
  ];
  const html = renderArchive(videos, 1, topicBySlug('claude-code'));
  assert.match(html, /<title>Claude Code videos \| Mike Holp<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos\/claude-code">/);
  assert.match(html, /<meta property="og:title" content="Claude Code videos">/);
  assert.match(html, /<h1>Claude Code<\/h1><p>1 videos?, newest first\. Builds, skills and workflows/);
  assert.match(html, /aaaaaaaaaaa/);
  assert.doesNotMatch(html, /bbbbbbbbbbb/);
  assert.doesNotMatch(html, /class="pager/);
  assert.match(html, /<a href="\/videos\/claude-code" aria-current="page">Claude Code<\/a>/);
  // The header's All videos link is not the current page on a topic page.
  assert.match(html, /<a href="\/videos">All videos<\/a><\/nav><a class="join"/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema.name, 'Claude Code videos');
  assert.equal(schema.mainEntity.itemListElement.length, 1);
});

test('the archive shows a topic row with every topic', () => {
  const html = renderArchive([{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '' }]);
  const row = html.match(/<nav class="topics mono" aria-label="Video topics">([\s\S]*?)<\/nav>/)[1];
  assert.match(row, /^<a href="\/videos" aria-current="page">All videos<\/a>/);
  assert.equal((row.match(/<a /g) || []).length, topics.length + 1);
  for (const topic of topics) assert.ok(row.includes(`href="/videos/${topic.slug}"`), topic.slug);
});
```

Step 3 writes "1 video" or "N videos"; the regex `videos?` accepts both.

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/archive.test.js`
Expected: 2 failures (no `<title>Claude Code videos` and no topic row).

- [ ] **Step 3: Implement in `src/archive.js`**

After line 4 (`import { watchNotes } from './watch-notes.js';`) add:

```js
import { topics } from './topics.js';
```

After the `pager` function's closing `}`, add:

```js
// Topic links under the intro; the page being shown is marked.
const topicNav = current => `<nav class="topics mono" aria-label="Video topics"><a href="/videos"${current ? '' : ' aria-current="page"'}>All videos</a>${topics.map(topic => `<a href="/videos/${topic.slug}"${topic === current ? ' aria-current="page"' : ''}>${escape(topic.name)}</a>`).join('')}</nav>`;
```

Replace the opening of `renderArchive`:

```js
// One page of the archive, 15 videos per page. Callers check the page is within pageCount(videos).
export function renderArchive(videos, page = 1) {
  const pages = pageCount(videos);
  const items = videos.slice((page - 1) * perPage, page * perPage);
  const years = Map.groupBy(items, video => video.published.slice(0, 4));
  const pageNote = page > 1 ? `Page ${page} of ${pages}. ` : '';
  const description = `${pageNote}Browse ${videos.length} AI Automation Station tutorials: coding agents, AI tools, and automation workflows tested on real builds.`;
  const url = `${site}${pagePath(page)}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, url,
    name: page > 1 ? `Every video, page ${page} of ${pages}` : 'Every video', description,
```

with:

```js
// One page of the archive, 15 videos per page (callers check the page is within pageCount(videos)),
// or with `topic`, every matching video on a single page at /videos/<slug>.
export function renderArchive(videos, page = 1, topic = null) {
  const list = topic ? videos.filter(video => topic.pattern.test(video.title)) : videos;
  // ponytail: topic pages are unpaginated (largest is 38 videos); add paging if one passes ~60.
  const pages = topic ? 1 : pageCount(list);
  const items = topic ? list : list.slice((page - 1) * perPage, page * perPage);
  const years = Map.groupBy(items, video => video.published.slice(0, 4));
  const pageNote = page > 1 ? `Page ${page} of ${pages}. ` : '';
  const count = `${list.length} ${list.length === 1 ? 'video' : 'videos'}`;
  const description = topic ? `${topic.intro} ${count}, newest first.` : `${pageNote}Browse ${list.length} AI Automation Station tutorials: coding agents, AI tools, and automation workflows tested on real builds.`;
  const url = `${site}${topic ? `/videos/${topic.slug}` : pagePath(page)}`;
  const title = topic ? `${topic.name} videos | Mike Holp` : page > 1 ? `Every video, page ${page} of ${pages} | Mike Holp` : 'Every video: AI tools tested on real builds | Mike Holp';
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url, url,
    name: topic ? `${topic.name} videos` : page > 1 ? `Every video, page ${page} of ${pages}` : 'Every video', description,
```

In the template, replace:

```
<title>${page > 1 ? `Every video, page ${page} of ${pages} | Mike Holp` : 'Every video: AI tools tested on real builds | Mike Holp'}</title>
```

with:

```
<title>${escape(title)}</title>
```

Replace:

```
<meta property="og:title" content="Every video: AI tools tested on real builds">
```

with:

```
<meta property="og:title" content="${escape(topic ? `${topic.name} videos` : 'Every video: AI tools tested on real builds')}">
```

Replace:

```
<a href="/videos" aria-current="page">All videos</a></nav><a class="join"
```

with:

```
<a href="/videos"${topic ? '' : ' aria-current="page"'}>All videos</a></nav><a class="join"
```

Replace the intro line:

```
<div class="intro"><p class="mono path">~/videos</p><h1>Every video</h1><p>${videos.length} long-form videos, newest first. ${pageNote}Hands-on builds with new AI models, agents and automation tools, plus breakdowns of new releases.</p></div>
```

with:

```
<div class="intro"><p class="mono path">~/videos${topic ? `/${topic.slug}` : ''}</p><h1>${escape(topic ? topic.name : 'Every video')}</h1><p>${topic ? `${count}, newest first. ${escape(topic.intro)}` : `${list.length} long-form videos, newest first. ${pageNote}Hands-on builds with new AI models, agents and automation tools, plus breakdowns of new releases.`}</p></div>
${topicNav(topic)}
```

- [ ] **Step 4: Style the topic row**

In the `<style>` block, after:

```css
.start a { color: #ff6846; text-decoration: underline; text-underline-offset: 3px; }
```

add:

```css
.topics { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.topics a { display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border: 1px solid #232323; border-radius: 999px; white-space: nowrap; }
.topics a:hover { border-color: #8c8c86; color: #f5f5f0; }
.topics [aria-current] { border-color: #ff6846; color: #f5f5f0; }
/* Phones: one swipeable row instead of four wrapped rows; it bleeds to the screen edges. */
@media (max-width: 640px) { .topics { flex-wrap: nowrap; overflow-x: auto; margin-inline: -16px; padding-inline: 16px; scrollbar-width: none; } }
```

- [ ] **Step 5: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass (existing archive tests are unchanged because `topic` defaults to `null`), lint exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/archive.js src/archive.test.js
git commit -m "Render video topic pages and a topic row on the archive

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Screenshots wait for Task 3, when the route exists.)

---

### Task 3: Route `/videos/<slug>` and list topics in the sitemap

**Files:**
- Modify: `api/videos.js` (import, routing block, render call)
- Modify: `src/archive.js` (`renderPageSitemap`)
- Test: `src/topics.test.js` (route test: a separate test file gets a fresh `api/videos.js` module, independent of the archive tests' mocked inventory), `src/archive.test.js` (sitemap)

**Interfaces:**
- Consumes: `topicBySlug` (Task 1), `renderArchive(videos, page, topic)` (Task 2).

- [ ] **Step 1: Write the failing tests**

In `src/topics.test.js`, add to the imports:

```js
import { GET } from '../api/videos.js';
```

and append:

```js
test('topic pages are served at /videos/<slug> next to the numbered pages', async () => {
  const get = path => GET(new Request(`https://www.ai-automation-station.com${path}`));
  const topic = await get('/videos/claude-code');
  assert.equal(topic.status, 200);
  assert.match(await topic.text(), /<link rel="canonical" href="https:\/\/www\.ai-automation-station\.com\/videos\/claude-code">/);
  assert.equal((await get('/api/videos?page=n8n')).status, 200);
  assert.equal((await get('/videos/not-a-topic')).status, 404);
  assert.equal((await get('/videos/2')).status, 200);
  assert.equal((await get('/videos/1')).status, 308);
});
```

In `src/archive.test.js`, append:

```js
test('the page sitemap lists topic pages that have videos and drops stale ones', () => {
  const xml = '<urlset><url><loc>https://www.ai-automation-station.com/</loc></url><url><loc>https://www.ai-automation-station.com/videos/old-topic</loc></url></urlset>';
  const sitemap = renderPageSitemap(xml, [{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z' }]);
  assert.match(sitemap, /<loc>https:\/\/www\.ai-automation-station\.com\/videos\/claude-code<\/loc>/);
  assert.doesNotMatch(sitemap, /\/videos\/n8n<|old-topic/);
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/topics.test.js src/archive.test.js`
Expected: the route test fails (`404 !== 200` for `/videos/claude-code`) and the sitemap test fails.

- [ ] **Step 3: Route topics in `api/videos.js`**

After line 3 (`import { channelUrl } from '../src/youtube.js';`) add:

```js
import { topicBySlug } from '../src/topics.js';
```

Replace:

```js
  if (requested !== null && !/^[1-9]\d{0,3}$/.test(requested)) return notFound();
  const page = Number(requested ?? 1);
  if (requested !== null && page === 1) return Response.redirect(`${url.origin}/videos`, 308);
```

with:

```js
  // /videos/<slug> is a topic page; anything else after /videos/ must be a page number.
  const topic = requested === null ? null : topicBySlug(requested) ?? null;
  if (requested !== null && !topic && !/^[1-9]\d{0,3}$/.test(requested)) return notFound();
  const page = topic ? 1 : Number(requested ?? 1);
  if (requested !== null && !topic && page === 1) return Response.redirect(`${url.origin}/videos`, 308);
```

Replace:

```js
  if (page > pageCount(memo.videos)) return notFound();
  return html(renderArchive(memo.videos, page), 200, cache);
```

with:

```js
  // An empty topic would be a thin page; 404 it until a matching video exists.
  if (topic && !memo.videos.some(video => topic.pattern.test(video.title))) return notFound();
  if (page > pageCount(memo.videos)) return notFound();
  return html(renderArchive(memo.videos, page, topic), 200, cache);
```

- [ ] **Step 4: Add topics to the page sitemap**

In `src/archive.js` (which already imports `topics` from Task 2), replace `renderPageSitemap`:

```js
export function renderPageSitemap(xml, videos) {
  const core = xml.replace(/\s*<url><loc>https:\/\/www\.ai-automation-station\.com\/videos(?:\/\d+)?<\/loc>[\s\S]*?<\/url>/g, '');
  const archive = Array.from({ length: pageCount(videos) }, (_, index) => `  <url><loc>${site}${pagePath(index + 1)}</loc></url>`).join('\n');
  return core.replace('</urlset>', `${archive}\n</urlset>`);
}
```

with:

```js
export function renderPageSitemap(xml, videos) {
  // Drop every /videos URL (numbered and topic) from the base file, then list the current ones.
  const core = xml.replace(/\s*<url><loc>https:\/\/www\.ai-automation-station\.com\/videos(?:\/[\w-]+)?<\/loc>[\s\S]*?<\/url>/g, '');
  const archive = Array.from({ length: pageCount(videos) }, (_, index) => `  <url><loc>${site}${pagePath(index + 1)}</loc></url>`);
  const topicPages = topics.filter(topic => videos.some(video => topic.pattern.test(video.title))).map(topic => `  <url><loc>${site}/videos/${topic.slug}</loc></url>`);
  return core.replace('</urlset>', `${[...archive, ...topicPages].join('\n')}\n</urlset>`);
}
```

- [ ] **Step 5: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass (the existing sitemap test with `/videos/15` and the existing bad-path tests `/videos/abc`, `/videos/02`, `/api/videos?page=-1` still pass), lint exit 0.

- [ ] **Step 6: Check visually**

```bash
D=docs/audits/2026-10-21-topic-screenshots; mkdir -p $D
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/videos/claude-code
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/videos && agent-browser wait 1500 && agent-browser screenshot $D/t3-desktop-archive.png
agent-browser open http://localhost:5173/videos/claude-code && agent-browser wait 1500 && agent-browser screenshot $D/t3-desktop-topic.png
agent-browser eval "JSON.stringify({cards: document.querySelectorAll('main li').length, pager: !!document.querySelector('.pager'), current: document.querySelector('.topics [aria-current]').textContent})"
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/videos/ai-seo && agent-browser wait 1500 && agent-browser screenshot $D/t3-mobile-topic.png
agent-browser eval "JSON.stringify({sw: document.documentElement.scrollWidth, w: innerWidth, rowScrolls: document.querySelector('.topics').scrollWidth > document.querySelector('.topics').clientWidth})"
agent-browser close
```

Expected:
- The curl prints `200`.
- Desktop archive: a row of 9 pill links under the intro, with "All videos" outlined in orange.
- Desktop topic page: "~/videos/claude-code", H1 "CLAUDE CODE", "N videos, newest first. Builds, skills…", the "Claude Code" pill marked, only Claude Code cards, no pager, then the Join block.
- Phone: the pill row is one swipeable line (`rowScrolls: true`), and the page does not scroll sideways (`sw === w`).

- [ ] **Step 7: Commit**

```bash
git add api/videos.js src/archive.js src/archive.test.js src/topics.test.js
git commit -m "Serve video topic pages at /videos/<slug> and list them in the sitemap

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Verify, record, push question

**Files:**
- Modify: `docs/audits/2026-10-21-videos-page-audit.md` (append a Topic pages section)
- Add: `docs/audits/2026-10-21-topic-screenshots/*.png`, this plan file

- [ ] **Step 1: Run everything**

```bash
rtk proxy npx eslint . && npm test && npm run build
grep -o '/videos/[a-z][a-z0-9-]*</loc>' dist/sitemap.xml
```

Expected: lint clean, all tests pass, the build ends without `Pre-rendered page is incomplete`, and the grep lists the eight topic URLs. Leave any snapshot files the build changes unstaged.

- [ ] **Step 2: Screenshot every topic page**

```bash
D=docs/audits/2026-10-21-topic-screenshots
agent-browser set viewport 1440 900
for slug in claude-code codex-opencode n8n make-com ai-agents ai-seo ai-video new-models; do agent-browser open http://localhost:5173/videos/$slug && agent-browser wait 1200 && agent-browser eval "'$slug ' + document.querySelectorAll('main li').length" && agent-browser screenshot $D/final-$slug.png; done
agent-browser close
```

Read each screenshot and skim each topic's titles for obvious misfiles (a release video under Make.com, for example). Report misfiles with titles; do not change patterns.

- [ ] **Step 3: Record**

Append to `docs/audits/2026-10-21-videos-page-audit.md`:

```markdown
## Topic pages (finding 14)

Plan: `docs/superpowers/plans/2026-10-21-video-topic-pages.md`. Topics live in `src/topics.js` and match video titles.

| Topic | URL | Videos at build |
|---|---|---|
```

then one row per topic with the counts printed in Step 2, then a line listing any reported misfiles, or "No misfiles spotted.". Write real values only.

- [ ] **Step 4: Commit**

```bash
git add docs/audits/2026-10-21-videos-page-audit.md docs/audits/2026-10-21-topic-screenshots docs/superpowers/plans/2026-10-21-video-topic-pages.md
git commit -m "Record video topic pages and screenshots

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push question (coordinator)**

Pushing `main` deploys production. After an approved push, check that `https://www.ai-automation-station.com/videos/claude-code` returns 200 with its canonical, that `/videos/not-a-topic` returns 404, and that `https://www.ai-automation-station.com/sitemap.xml` lists the topic URLs.
