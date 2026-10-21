# Guides Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix findings 1–12 of the 2026-10-21 guides audit: a `/blog` redirect, the flagship guide's image and contents list, accessible figures, a reading-page look and header that match the homepage, one Skool label, a standard guide ending, a richer hub cross-linked with the video topic pages, and copy buttons for commands.

**Architecture:** The guides are hand-written static HTML in `public/` (`guides.html`, `start-here.html`, `404.html`, `guides/*.html`) styled by the shared one-line `public/reading.css`; watch pages (`renderWatch` in `src/archive.js`) use the same stylesheet and header. `src/reading.js` is the reading pages' only script (consent, analytics, thumbnail fallback). Tests are Node's runner reading files as text (`src/guides.test.js`) or rendering HTML strings (`src/archive.test.js`).

**Tech Stack:** Static HTML, CSS, Node 24 ESM, Node test runner, ESLint 9, `agent-browser`, `sharp` (installed dev dependency) for one WebP image.

**Spec:** `docs/audits/2026-10-21-guides-audit.md`

## Global Constraints

- Keep every guide's words, commands, dates and links unless a step says otherwise. Do not change `datePublished`/`dateModified` or the visible "Updated" dates (layout changes are not content updates).
- Visual direction as on the homepage and `/videos`: `#0a0a0a` background, `#ff6846` orange, Archivo Black for the brand and H1, Instrument Sans for prose, DM Mono for nav and labels, pill buttons. Reading pages stay single-column and calm.
- Skool label rule: links to `https://www.skool.com/ai-automation-station-7346/plans` read **Join AI Income Lab ↗** and open in a new tab (`target="_blank" rel="noreferrer"`). Links to the member classroom read **members’ classroom**.
- `src/reading.js` contracts: the page has a `<footer>`; Skool links may carry `data-placement` (default placement is `written_guide`).
- `scripts/prerender.js` rewrites `src="/src/reading.js"` in `start-here.html`, `guides.html` and `guides/*.html`; keep that tag exactly.
- No new npm dependencies. New files: `src/copy-code.js`, `src/copy-code.test.js`, `public/assets/guides/claude-code-vs-codex.webp`, screenshots.
- Tests: `npm test`. Lint: `rtk proxy npx eslint .` (exit 0 = clean).
- Commits: sentence case, imperative, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; stage only the files a task lists. Never stage `src/*-snapshot.*` or `public/assets/thumbnails/*`. Do not push (Task 7).

## Finding → task map

| Finding | Task |
|---|---|
| 1 `/blog`, 3 duplicate alt text, 7 hub meta brand | 1 |
| 4 phone header wrap, 5 font, colour, header, Join | 2 |
| 6 Skool labels, 11 standard guide ending | 3 |
| 2 flagship image, 10 contents list | 4 |
| 8 hub entries, 9 guides ↔ video topics | 5 |
| 12 copy buttons | 6 |
| verification, record, deploy question | 7 |
| 13 editorial plan | not in this plan |

## Visual check setup

The coordinator runs `npm run dev -- --port 5173 --strictPort`. Static pages are served from `public/` and `/assets/reading.js` is mapped to `src/reading.js`, so changes to HTML, CSS and `reading.js` show on reload. Changes to `src/archive.js` (watch pages) may need a server restart: confirm with the `curl` given in the task, and if it shows old markup, stop and report. Screenshots go to `docs/audits/2026-10-21-guides-screenshots/`. Wait 1500ms after `agent-browser open`; scroll with `agent-browser eval "window.scrollTo(0, <y>); 1"` plus an 800ms wait.

---

### Task 1: `/blog` redirect, hub meta, figure alt text (findings 1, 3, 7)

**Files:**
- Modify: `vercel.json:45`, `public/guides.html` (meta line), `public/guides/{codex-workflow,consent-tracking,first-api-request,make-first-automation,youtube-feed}.html` (figure `alt`)
- Test: `src/guides.test.js`

- [ ] **Step 1: Write the failing tests**

Append to `src/guides.test.js`:

```js
test('/blog sends readers to the guides hub', async () => {
  const { redirects } = JSON.parse(await read('vercel.json'));
  assert.ok(redirects.some(rule => rule.source === '/blog' && rule.destination === '/guides.html' && rule.permanent === true));
});

test('guide figures are described once, by their caption', async () => {
  for (const file of guides) {
    const html = await read(`public/guides/${file}`);
    for (const [, alt, caption] of html.matchAll(/<figure><img [^>]*alt="([^"]*)"[^>]*><figcaption>(.*?)<\/figcaption><\/figure>/g)) {
      assert.notEqual(alt, caption, file);
    }
  }
});

test('the hub byline names one brand', async () => {
  assert.match(await read('public/guides.html'), /<p class="meta">By <a href="\/#about" rel="author">Mike Holp<\/a> · Updated/);
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/guides.test.js`
Expected: 3 failures.

- [ ] **Step 3: Add the redirect**

In `vercel.json`, replace:

```json
    { "source": "/index.html", "destination": "/", "permanent": true },
```

with:

```json
    { "source": "/index.html", "destination": "/", "permanent": true },
    { "source": "/blog", "destination": "/guides.html", "permanent": true },
```

- [ ] **Step 4: Fix the hub meta line**

In `public/guides.html`, replace:

```html
<p class="meta">AI Automation Station · By <a href="/#about" rel="author">Mike Holp</a> · Updated
```

with:

```html
<p class="meta">By <a href="/#about" rel="author">Mike Holp</a> · Updated
```

- [ ] **Step 5: Empty the duplicate alt text**

Each figure's caption already says what the image shows, so the image becomes decorative (`alt=""`). Run:

```bash
for f in codex-workflow consent-tracking first-api-request make-first-automation youtube-feed; do
  sed -i -E "s#(<figure><img src=\"/assets/guides/$f\.webp\") alt=\"[^\"]*\"#\1 alt=\"\"#" public/guides/$f.html
  grep -c "<figure><img src=\"/assets/guides/$f.webp\" alt=\"\"" public/guides/$f.html
done
```

Expected: each `grep -c` prints `1`.

- [ ] **Step 6: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Commit**

```bash
git add vercel.json public/guides.html public/guides/codex-workflow.html public/guides/consent-tracking.html public/guides/first-api-request.html public/guides/make-first-automation.html public/guides/youtube-feed.html src/guides.test.js
git commit -m "Redirect /blog to the guides and stop figures being described twice

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Reading-page look and header (findings 4, 5)

**Files:**
- Modify: `public/reading.css`
- Modify (header markup): `public/start-here.html`, `public/guides.html`, `public/404.html`, `public/guides/*.html` (6 files), `src/archive.js` (watch header and one inline style rule)
- Test: `src/guides.test.js` (header test), `src/archive.test.js` (watch header assertion)

**Interfaces:**
- Produces: `.join` pill class in `reading.css` (Task 3 uses it for guide endings); `header > a:first-child` is the brand; `header nav` holds Start here / Guides / All videos.

- [ ] **Step 1: Update the header tests (they fail until the markup changes)**

In `src/guides.test.js`, replace the regex in the test `static pages share a header that links the guides hub`:

```js
    assert.match(await read(path), /<header><a href="\/">Mike Holp<\/a><a href="\/start-here.html">Start here<\/a><a href="\/guides.html"( aria-current="page")?>Guides<\/a><a href="\/videos">All videos<\/a><\/header>/, path);
```

with:

```js
    assert.match(await read(path), /<header><a href="\/">Mike Holp<\/a><nav aria-label="Site"><a href="\/start-here.html"( aria-current="page")?>Start here<\/a><a href="\/guides.html"( aria-current="page")?>Guides<\/a><a href="\/videos">All videos<\/a><\/nav><a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗<\/a><\/header>/, path);
```

Append to `src/guides.test.js`:

```js
test('reading pages share the homepage type, link colour and header styles', async () => {
  const css = await read('public/reading.css');
  assert.match(css, /font-family:'Instrument Sans';font-weight:400 700;src:url\('\/fonts\/instrument-sans.woff2'\)/);
  assert.match(css, /font-family:'DM Mono';src:url\('\/fonts\/dm-mono.woff2'\)/);
  assert.match(css, /body\{[^}]*font:18px\/1\.7 'Instrument Sans',system-ui,sans-serif\}/);
  assert.match(css, /a\{color:#ff6846;/);
  // The brand is the header's own first link; nav links have their own style.
  assert.match(css, /header>a:first-child\{font-family:Archivo/);
  assert.doesNotMatch(css, /header a:first-child/);
  assert.match(css, /\.join\{[^}]*background:#ff6846;/);
  assert.match(css, /@media\(max-width:640px\)\{header nav\{order:3;width:100%;margin-left:0\}\}/);
});
```

In `src/archive.test.js`, replace:

```js
  assert.match(html, /<header><a href="\/">Mike Holp<\/a><a href="\/start-here.html">Start here<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos">All videos<\/a><\/header>/);
```

with:

```js
  assert.match(html, /<header><a href="\/">Mike Holp<\/a><nav aria-label="Site"><a href="\/start-here.html">Start here<\/a><a href="\/guides.html">Guides<\/a><a href="\/videos">All videos<\/a><\/nav><a class="join" href="https:\/\/www.skool.com\/ai-automation-station-7346\/plans" target="_blank" rel="noreferrer" data-placement="watch_header">Join AI Income Lab ↗<\/a><\/header>/);
  assert.doesNotMatch(html, /header a:first-child/);
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/guides.test.js src/archive.test.js`
Expected: the header test, the new CSS test and the watch-page test fail.

- [ ] **Step 3: Change the static headers (9 files)**

```bash
for f in public/start-here.html public/guides.html public/404.html public/guides/*.html; do
  sed -i 's#<header><a href="/">Mike Holp</a><a href="/start-here.html"#<header><a href="/">Mike Holp</a><nav aria-label="Site"><a href="/start-here.html"#; s#<a href="/videos">All videos</a></header>#<a href="/videos">All videos</a></nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="reading_header">Join AI Income Lab ↗</a></header>#' "$f"
  grep -c 'data-placement="reading_header"' "$f"
done
```

Expected: every `grep -c` prints `1`. Existing `aria-current="page"` attributes stay where they were.

- [ ] **Step 4: Change the watch-page header**

In `src/archive.js`, replace:

```html
<header><a href="/">Mike Holp</a><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a></header>
```

with:

```html
<header><a href="/">Mike Holp</a><nav aria-label="Site"><a href="/start-here.html">Start here</a><a href="/guides.html">Guides</a><a href="/videos">All videos</a></nav><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer" data-placement="watch_header">Join AI Income Lab ↗</a></header>
```

and delete this substring from the watch page's inline `<style>` (it would restyle the first nav link once the nav exists):

```css
header a:first-child{font-family:system-ui,sans-serif;font-weight:700}
```

- [ ] **Step 5: Update `public/reading.css`**

The first line is minified; make these exact substring replacements:

1. `@font-face{font-family:Archivo;src:url('/fonts/archivo-black.woff2') format('woff2');font-display:swap}`
   → `@font-face{font-family:Archivo;src:url('/fonts/archivo-black.woff2') format('woff2');font-display:swap}@font-face{font-family:'Instrument Sans';font-weight:400 700;src:url('/fonts/instrument-sans.woff2') format('woff2');font-display:swap}@font-face{font-family:'DM Mono';src:url('/fonts/dm-mono.woff2') format('woff2');font-display:swap}`
2. `font:18px/1.7 system-ui,sans-serif}` → `font:18px/1.7 'Instrument Sans',system-ui,sans-serif}`
3. `a{color:#ff927b;text-underline-offset:4px}` → `a{color:#ff6846;text-underline-offset:4px}`
4. `header a:first-child{font-family:Archivo,sans-serif;color:#f5f5f0;text-decoration:none}` → `header>a:first-child{font-family:Archivo,sans-serif;color:#f5f5f0;text-decoration:none}`

Then append at the end of the file:

```css
header{align-items:center}header nav{display:flex;flex-wrap:wrap;gap:0 24px;margin-left:auto;font:400 13px 'DM Mono',monospace}header nav a{color:#8c8c86;text-decoration:none}header nav a:hover,header nav [aria-current]{color:#f5f5f0}
.join{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:999px;background:#ff6846;color:#1a0a04;font:500 12px 'DM Mono',monospace;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;white-space:nowrap}.join:hover{background:#ff7f62}
@media(max-width:640px){header nav{order:3;width:100%;margin-left:0}}
```

Contrast check for the new link colour: `#ff6846` on `#0a0a0a` is about 6.6:1, and on the `#111` note background about 6.2:1, both above 4.5:1.

- [ ] **Step 6: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-guides-screenshots; mkdir -p $D
curl -s http://localhost:5173/watch/geKngm3sg3w | grep -c 'data-placement="watch_header"'
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/guides/claude-code-vs-codex.html && agent-browser wait 1500 && agent-browser screenshot $D/t2-desktop-guide.png
agent-browser eval "JSON.stringify({body: getComputedStyle(document.body).fontFamily, nav: getComputedStyle(document.querySelector('header nav a')).fontFamily, link: getComputedStyle(document.querySelector('main a')).color})"
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/guides.html && agent-browser wait 1500 && agent-browser screenshot $D/t2-mobile-hub.png
agent-browser eval "JSON.stringify({sw: document.documentElement.scrollWidth, w: innerWidth, brandTop: document.querySelector('header > a').getBoundingClientRect().top, joinTop: document.querySelector('header .join').getBoundingClientRect().top})"
agent-browser open http://localhost:5173/watch/geKngm3sg3w && agent-browser wait 1500 && agent-browser screenshot $D/t2-mobile-watch.png
agent-browser close
```

Expected:
- The curl prints `1`; if it prints 0, stop and report so the coordinator restarts the server.
- Desktop: brand on the left, grey DM Mono "Start here / Guides / All videos", and the orange JOIN pill on the right. The body is Instrument Sans and links are `rgb(255, 104, 70)`.
- Phone: the brand and JOIN share the first row (`brandTop` ≈ `joinTop`), the nav sits on a second row, and `sw === w`.
- The watch page header matches.

- [ ] **Step 8: Commit**

```bash
git add public/reading.css public/start-here.html public/guides.html public/404.html public/guides/*.html src/archive.js src/guides.test.js src/archive.test.js
git commit -m "Give reading pages the homepage type, colours and a header with Join

Adds Skool placements reading_header and watch_header.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: One Skool label and a standard guide ending (findings 6, 11)

**Files:**
- Modify: `public/guides/*.html` (6 endings), `public/start-here.html` (4 Skool links), `public/reading.css` (one rule)
- Test: `src/guides.test.js`

**Interfaces:**
- Consumes: `.join` from Task 2.

Each guide's last `<aside class="note">…</aside>` is replaced with the standard block below; `NEXT`, `VIDEO` and `COURSE` come from the table. Order follows the hub: Claude Code vs Codex → Codex workflow → Make.com → first API request → YouTube feed → consent tracking → back to the start.

```html
<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: NEXT</li>VIDEO</ul><p>COURSEAI Income Lab adds courses, templates and a community for builds like this one, from $29/month.</p><p><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer">Join AI Income Lab ↗</a></p></aside>
```

| Guide | NEXT | VIDEO | COURSE |
|---|---|---|---|
| `claude-code-vs-codex.html` | `<a href="/guides/codex-workflow.html">Make and verify a code change with Codex</a>` | `<li>Watch: <a href="/watch/ys5tJuTFCEo">How To Connect Claude Code &amp; Codex To GrokBot</a></li>` | `Members get the <strong>Claude Code &amp; Skills</strong> and <strong>Codex Tutorials &amp; Courses</strong> lessons. ` |
| `codex-workflow.html` | `<a href="/guides/make-first-automation.html">Build your first Make.com automation</a>` | `<li>Watch: <a href="/watch/TuVL2x6IfDk">I Used Codex To Fix My SEO Strategy In Minutes!</a></li>` | `Members get the <strong>Claude Code &amp; Skills</strong> and <strong>Codex Tutorials &amp; Courses</strong> lessons. ` |
| `make-first-automation.html` | `<a href="/guides/first-api-request.html">Make your first API request</a>` | `<li>Watch: <a href="/watch/Lifl4PC2_3M">Make.com AI Automations Without Code (Full 1-Hour Course)</a></li>` | `Members get the <strong>Beginner’s Automation Course</strong> for Make.com (level 2 on Standard, immediately on Premium or VIP). ` |
| `first-api-request.html` | `<a href="/guides/youtube-feed.html">Build a YouTube feed in React</a>` | `<li>Watch: <a href="/watch/geKngm3sg3w">How to Use 9Router: Setup, Providers &amp; Fallbacks</a></li>` | empty |
| `youtube-feed.html` | `<a href="/guides/consent-tracking.html">Track clicks only after consent</a>` | empty (no matching video) | empty |
| `consent-tracking.html` | `<a href="/guides/claude-code-vs-codex.html">Claude Code vs Codex: how I use both and route tasks</a>` | empty (no matching video) | empty |

- [ ] **Step 1: Write the failing test**

Append to `src/guides.test.js`:

```js
test('guides end with the standard next steps and every plans link says Join', async () => {
  const order = ['claude-code-vs-codex', 'codex-workflow', 'make-first-automation', 'first-api-request', 'youtube-feed', 'consent-tracking'];
  for (const [index, slug] of order.entries()) {
    const html = await read(`public/guides/${slug}.html`);
    const next = order[(index + 1) % order.length];
    assert.match(html, new RegExp(`<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="/guides/${next}.html">`), slug);
    assert.equal((html.match(/class="note next-steps"/g) || []).length, 1, slug);
  }
  for (const path of ['public/start-here.html', ...guides.map(file => `public/guides/${file}`)]) {
    const html = await read(path);
    for (const [link] of html.matchAll(/<a [^>]*href="https:\/\/www\.skool\.com\/ai-automation-station-7346\/plans"[^>]*>[^<]*<\/a>/g)) {
      assert.match(link, /target="_blank" rel="noreferrer"[^>]*>Join AI Income Lab ↗<\/a>$/, `${path}: ${link}`);
    }
    for (const [link] of html.matchAll(/<a [^>]*href="https:\/\/www\.skool\.com\/ai-automation-station-7346\/classroom"[^>]*>[^<]*<\/a>/g)) {
      assert.match(link, />members’ classroom<\/a>$/, `${path}: ${link}`);
    }
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/guides.test.js`
Expected: FAIL for `claude-code-vs-codex`.

- [ ] **Step 3: Replace the six endings**

For each guide, replace its last `<aside class="note">` element exactly as printed below, with the standard block filled in from the table. The current endings, verbatim:

`claude-code-vs-codex.html`:
```html
<aside class="note"><h2>Get help with your own setup</h2><p>AI Income Lab includes coding tutorials and a community for practical builds. Find <strong>Codex Tutorials &amp; Courses</strong> and <strong>Claude Code &amp; Skills</strong> in the <a href="https://www.skool.com/ai-automation-station-7346/classroom">classroom</a>; <a href="https://www.skool.com/ai-automation-station-7346/plans">check current membership and course access</a>.</p></aside>
```

`codex-workflow.html`:
```html
<aside class="note"><h2>Get help with your next change</h2><p>AI Income Lab includes coding tutorials and a community for practical builds. Find <strong>Codex Tutorials &amp; Courses</strong> and <strong>Claude Code &amp; Skills</strong> in the <a href="https://www.skool.com/ai-automation-station-7346/classroom">classroom</a>; <a href="https://www.skool.com/ai-automation-station-7346/plans">check current membership and course access</a>.</p></aside>
```

`consent-tracking.html`, `first-api-request.html`, `youtube-feed.html` (identical):
```html
<aside class="note"><h2>Get help with your next build</h2><p>AI Income Lab has courses, templates, and a community for practical AI projects. <a href="https://www.skool.com/ai-automation-station-7346/plans">Compare membership options</a> or <a href="/start-here.html">choose your next project</a>.</p></aside>
```

`make-first-automation.html`:
```html
<aside class="note"><h2>Continue the business automation path</h2><p>AI Income Lab’s <strong>Beginner’s Automation Course</strong> covers Make.com business automations. It unlocks at Skool level 2 on Standard, or immediately with Premium or VIP. Check the <a href="https://www.skool.com/ai-automation-station-7346/plans">current plans</a> and <a href="https://www.skool.com/ai-automation-station-7346/classroom">classroom</a>, or choose another <a href="/start-here.html#business-automation">business automation build</a>.</p></aside>
```

For example, `claude-code-vs-codex.html` ends with:

```html
<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="/guides/codex-workflow.html">Make and verify a code change with Codex</a></li><li>Watch: <a href="/watch/ys5tJuTFCEo">How To Connect Claude Code &amp; Codex To GrokBot</a></li></ul><p>Members get the <strong>Claude Code &amp; Skills</strong> and <strong>Codex Tutorials &amp; Courses</strong> lessons. AI Income Lab adds courses, templates and a community for builds like this one, from $29/month.</p><p><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer">Join AI Income Lab ↗</a></p></aside>
```

and `youtube-feed.html` (no video, no course line) ends with:

```html
<aside class="note next-steps" aria-labelledby="keep-going"><h2 id="keep-going">Keep going</h2><ul><li>Next guide: <a href="/guides/consent-tracking.html">Track clicks only after consent</a></li></ul><p>AI Income Lab adds courses, templates and a community for builds like this one, from $29/month.</p><p><a class="join" href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer">Join AI Income Lab ↗</a></p></aside>
```

Do not touch the paragraphs before the aside (for example consent-tracking's "Choose another build or ask a question", or youtube-feed's "Source and next step").

- [ ] **Step 4: Relabel the start-here Skool links**

In `public/start-here.html`:
- Replace all three `<a href="https://www.skool.com/ai-automation-station-7346/classroom">classroom</a>` with `<a href="https://www.skool.com/ai-automation-station-7346/classroom">members’ classroom</a>`.
- Replace `<a href="https://www.skool.com/ai-automation-station-7346/plans">Compare current plans</a>` with `<a href="https://www.skool.com/ai-automation-station-7346/plans" target="_blank" rel="noreferrer">Join AI Income Lab ↗</a>`.

Read the sentences around each link afterwards; if one now reads awkwardly (for example "in the members’ classroom"), report it rather than rewriting the sentence.

- [ ] **Step 5: Style the list in the ending**

Append to `public/reading.css`:

```css
.next-steps ul{margin:0 0 16px;padding-left:20px}.next-steps li{margin:8px 0}
```

- [ ] **Step 6: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-guides-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/guides/claude-code-vs-codex.html && agent-browser wait 1500 && agent-browser eval "document.getElementById('keep-going').scrollIntoView({block: 'center'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t3-desktop-ending.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/guides/youtube-feed.html && agent-browser wait 1500 && agent-browser eval "document.getElementById('keep-going').scrollIntoView({block: 'center'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t3-mobile-ending.png
agent-browser close
```

Expected: a "Keep going" box with the next guide (and the video where there is one), the members line where relevant, and an orange JOIN AI INCOME LAB ↗ pill.

- [ ] **Step 8: Commit**

```bash
git add public/guides/*.html public/start-here.html public/reading.css src/guides.test.js
git commit -m "End every guide with next steps and one Join link

Plans links read 'Join AI Income Lab ↗'; classroom links say they are for members.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Flagship guide image and contents list (findings 2, 10)

**Files:**
- Create: `public/assets/guides/claude-code-vs-codex.webp` (1200×630)
- Modify: `public/guides/claude-code-vs-codex.html`
- Test: `src/guides.test.js`

- [ ] **Step 1: Write the failing test**

Append to `src/guides.test.js`:

```js
test('the Claude Code vs Codex guide has its own image and a contents list', async () => {
  const html = await read('public/guides/claude-code-vs-codex.html');
  const image = 'https://www.ai-automation-station.com/assets/guides/claude-code-vs-codex.webp';
  assert.match(html, new RegExp(`<meta property="og:image" content="${image}">`));
  assert.match(html, new RegExp(`"image":"${image}"`));
  assert.doesNotMatch(html, /og-card\.jpg/);
  assert.match(html, /<figure><img src="\/assets\/guides\/claude-code-vs-codex.webp" alt="" width="1200" height="630"[^>]*><figcaption>[^<]+<\/figcaption><\/figure>/);
  const toc = html.match(/<nav class="toc" aria-label="On this page">([\s\S]*?)<\/nav>/)[1];
  const targets = [...toc.matchAll(/href="#([a-z-]+)"/g)].map(match => match[1]);
  assert.equal(targets.length, 8);
  for (const id of targets) assert.match(html, new RegExp(`<h2 id="${id}">`), id);
  const { size } = await import('node:fs/promises').then(fs => fs.stat(new URL('../public/assets/guides/claude-code-vs-codex.webp', import.meta.url)));
  assert.ok(size > 5000 && size < 60000, `image is ${size} bytes`);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/guides.test.js`
Expected: FAIL on the og:image assertion.

- [ ] **Step 3: Make the image**

The other guide images are HTML cards (orange rule, small eyebrow, white headline, three outlined boxes, a one-line note, a byline). Make this one the same way. Write `card.html` in the scratchpad directory:

```html
<!doctype html><meta charset="utf-8">
<style>
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#0a0a0a;color:#f5f5f0;font-family:'Noto Sans',system-ui,sans-serif;padding:72px 80px}
.eyebrow{display:flex;align-items:center;gap:14px;color:#b3b3ab;font-size:22px;letter-spacing:.06em;text-transform:uppercase}.eyebrow::before{content:'';width:44px;height:5px;background:#ff6846}
h1{margin-top:28px;font-size:60px;line-height:1.1;font-weight:700;max-width:820px}
.row{display:flex;gap:24px;margin-top:48px}.box{flex:1;padding:22px 24px;border:2px solid #333;border-radius:8px;background:#111}
.box b{display:block;color:#ff6846;font-size:20px;letter-spacing:.06em;text-transform:uppercase}.box span{display:block;margin-top:10px;font-size:26px}
.note{margin-top:34px;color:#b3b3ab;font-size:24px}.by{position:absolute;bottom:52px;left:80px;color:#8c8c86;font-size:20px}
</style>
<p class="eyebrow">AI Automation Station · Free build guide</p>
<h1>Route each task to the agent that suits it</h1>
<div class="row"><p class="box"><b>Claude Code</b><span>Research, audits, writing</span></p><p class="box"><b>Codex</b><span>Fixes, features, scripts</span></p><p class="box"><b>Review</b><span>The other tool checks it</span></p></div>
<p class="note">When one hits a usage limit, the other takes the task.</p>
<p class="by">Mike Holp · ai-automation-station.com</p>
```

Render and convert (replace `$SCRATCH` with the scratchpad path):

```bash
agent-browser set viewport 1200 630 && agent-browser open "file://$SCRATCH/card.html" && agent-browser wait 800 && agent-browser screenshot "$SCRATCH/card.png" && agent-browser close
node -e "require('sharp')(process.argv[1]).resize(1200, 630).webp({ quality: 82 }).toFile('public/assets/guides/claude-code-vs-codex.webp').then(info => console.log(info.width, info.height, info.size))" "$SCRATCH/card.png"
```

Open `public/assets/guides/claude-code-vs-codex.webp` with Read and check that nothing is clipped and the text is legible. Expected output from the node line: `1200 630` and a size between 5,000 and 60,000 bytes.

- [ ] **Step 4: Point the page at the image**

In `public/guides/claude-code-vs-codex.html`:
- Replace `<meta property="og:image" content="https://www.ai-automation-station.com/og-card.jpg?v=2">` with `<meta property="og:image" content="https://www.ai-automation-station.com/assets/guides/claude-code-vs-codex.webp">`.
- In the Article JSON-LD, replace `"image":"https://www.ai-automation-station.com/og-card.jpg?v=2"` with `"image":"https://www.ai-automation-station.com/assets/guides/claude-code-vs-codex.webp"`.
- If any other `og-card.jpg` reference remains in the file (for example `twitter:image`), point it at the same WebP.

- [ ] **Step 5: Add the figure and the contents list**

Insert immediately before `<h2>The short comparison</h2>`:

```html
<figure><img src="/assets/guides/claude-code-vs-codex.webp" alt="" width="1200" height="630" loading="lazy"><figcaption>Claude Code takes research, audits and writing; Codex takes fixes, features and scripts; the tool that did not write a change reviews it.</figcaption></figure>
<nav class="toc" aria-label="On this page"><h2>On this page</h2><ul><li><a href="#comparison">The short comparison</a></li><li><a href="#routing">How I route tasks</a></li><li><a href="#safety">Run them safely</a></li><li><a href="#check">A task with a result you can check</a></li><li><a href="#limits">When one runs out</a></li><li><a href="#review">Have the other tool review it</a></li><li><a href="#video">Watch it come together</a></li><li><a href="#limits-of-this-setup">What this is not</a></li></ul></nav>
```

Then add ids to the eight headings (each old string occurs once):

| Old | New |
|---|---|
| `<h2>The short comparison</h2>` | `<h2 id="comparison">The short comparison</h2>` |
| `<h2>How I route tasks</h2>` | `<h2 id="routing">How I route tasks</h2>` |
| `<h2>Run them safely</h2>` | `<h2 id="safety">Run them safely</h2>` |
| `<h2>A task with a result you can check</h2>` | `<h2 id="check">A task with a result you can check</h2>` |
| `<h2>When one runs out</h2>` | `<h2 id="limits">When one runs out</h2>` |
| `<h2>Have the other tool review it</h2>` | `<h2 id="review">Have the other tool review it</h2>` |
| `<h2>Watch it come together</h2>` | `<h2 id="video">Watch it come together</h2>` |
| `<h2>What this is not</h2>` | `<h2 id="limits-of-this-setup">What this is not</h2>` |

Append to `public/reading.css`:

```css
.toc{margin:32px 0;padding:18px 22px;border:1px solid #333}.toc h2{margin:0 0 8px;font-size:18px}.toc ul{margin:0;padding-left:20px}.toc li{margin:6px 0}
h2[id]{scroll-margin-top:24px}
```

- [ ] **Step 6: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-guides-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/guides/claude-code-vs-codex.html && agent-browser wait 1500 && agent-browser eval "document.querySelector('figure').scrollIntoView({block: 'start'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t4-desktop-figure-toc.png
agent-browser set device "iPhone 15" && agent-browser open "http://localhost:5173/guides/claude-code-vs-codex.html#limits" && agent-browser wait 1500 && agent-browser screenshot $D/t4-mobile-anchor.png
agent-browser close
```

Expected: the card image, its caption, then the boxed "On this page" list; the anchor link lands with the "When one runs out" heading visible near the top.

- [ ] **Step 8: Commit**

```bash
git add public/assets/guides/claude-code-vs-codex.webp public/guides/claude-code-vs-codex.html public/reading.css src/guides.test.js
git commit -m "Give the Claude Code vs Codex guide its own image and a contents list

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Richer hub entries and guides ↔ video topics (findings 8, 9)

**Files:**
- Modify: `public/guides.html` (the four topic sections), `public/reading.css`
- Modify: `src/topics.js` (optional `guides` field), `src/archive.js` (topic page line)
- Test: `src/guides.test.js`, `src/archive.test.js`

**Interfaces:**
- Produces: `topics[i].guides?: Array<[href: string, title: string]>`, rendered on topic pages as "Written guide(s): …".

- [ ] **Step 1: Write the failing tests**

Append to `src/guides.test.js`:

```js
test('hub entries show an image, what the guide covers and the matching video', async () => {
  const hub = await read('public/guides.html');
  const entries = [...hub.matchAll(/<li class="guide">([\s\S]*?)<\/li>/g)].map(match => match[1]);
  assert.equal(entries.length, guides.length);
  for (const entry of entries) {
    assert.match(entry, /<img src="\/assets\/guides\/[a-z-]+\.webp" alt="" width="1200" height="630" loading="lazy">/);
    assert.match(entry, /<h3><a href="\/guides\/[a-z-]+\.html">[^<]+<\/a><\/h3>/);
  }
  assert.match(hub, /<a href="\/videos\/claude-code">Claude Code videos<\/a>/);
  assert.match(hub, /<a href="\/videos\/make-com">Make.com videos<\/a>/);
});
```

Append to `src/archive.test.js`:

```js
test('topic pages link the written guides on the same subject', () => {
  const videos = [{ id: 'aaaaaaaaaaa', title: 'Claude Code hooks tutorial', published: '2026-10-02T00:00:00Z', summary: '', embeddable: true }];
  const html = renderArchive(videos, 1, topicBySlug('claude-code'));
  assert.match(html, /<p class="start">Written guides: <a href="\/guides\/claude-code-vs-codex.html">Claude Code vs Codex: how I use both and route tasks<\/a> and <a href="\/guides\/codex-workflow.html">Make and verify a code change with Codex<\/a><\/p>/);
  assert.doesNotMatch(renderArchive(videos, 1, topicBySlug('ai-agents')), /Written guide/);
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test src/guides.test.js src/archive.test.js`
Expected: the two new tests fail.

- [ ] **Step 3: Rebuild the hub's topic sections**

In `public/guides.html`, replace everything from `<h2 id="coding-assistants">Coding assistants</h2>` up to (not including) `<h2 id="next">` with the block below. Each description is the current one word for word, with its first letter capitalised now that it stands as its own sentence.

```html
<h2 id="coding-assistants">Coding assistants</h2>
<ul class="guide-list">
<li class="guide"><img src="/assets/guides/claude-code-vs-codex.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/claude-code-vs-codex.html">Claude Code vs Codex: how I use both and route tasks</a></h3><p>Which terminal coding agent handles which task, how I keep both safe, and what happens when a usage limit hits.</p><p class="meta">Video: <a href="/watch/ys5tJuTFCEo">How To Connect Claude Code &amp; Codex To GrokBot</a></p></div></li>
<li class="guide"><img src="/assets/guides/codex-workflow.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/codex-workflow.html">Make and verify a code change with Codex</a></h3><p>Practice a Codex workflow on a local API example: inspect the code, add a failure check, review the diff, and verify the result without paid API calls.</p><p class="meta">Video: <a href="/watch/TuVL2x6IfDk">I Used Codex To Fix My SEO Strategy In Minutes!</a></p></div></li>
</ul>
<p class="meta">More on video: <a href="/videos/claude-code">Claude Code videos</a> and <a href="/videos/codex-opencode">Codex and OpenCode videos</a>.</p>
<h2 id="automation">Automation</h2>
<ul class="guide-list">
<li class="guide"><img src="/assets/guides/make-first-automation.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/make-first-automation.html">Build your first Make.com automation</a></h3><p>Build a small Make.com scenario with Google Sheets: filter sample requests, map approved rows, and check the output before enabling a schedule.</p><p class="meta">Video: <a href="/watch/Lifl4PC2_3M">Make.com AI Automations Without Code (Full 1-Hour Course)</a></p></div></li>
</ul>
<p class="meta">More on video: <a href="/videos/make-com">Make.com videos</a> and <a href="/videos/n8n">n8n videos</a>.</p>
<h2 id="apis">APIs</h2>
<ul class="guide-list">
<li class="guide"><img src="/assets/guides/first-api-request.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/first-api-request.html">Make your first API request</a></h3><p>Run a free local API example, distinguish keys from subscriptions, and diagnose authentication and model errors before connecting an AI agent.</p><p class="meta">Video: <a href="/watch/geKngm3sg3w">How to Use 9Router: Setup, Providers &amp; Fallbacks</a></p></div></li>
</ul>
<h2 id="creator-websites">Creator websites and tracking</h2>
<ul class="guide-list">
<li class="guide"><img src="/assets/guides/youtube-feed.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/youtube-feed.html">Build a YouTube feed in React</a></h3><p>The YouTube feed used on this site: saved data, server-side API access, accessible cards, and failure checks.</p></div></li>
<li class="guide"><img src="/assets/guides/consent-tracking.webp" alt="" width="1200" height="630" loading="lazy"><div><h3><a href="/guides/consent-tracking.html">Track clicks only after consent</a></h3><p>Implement a clear analytics choice, guard optional events, and test consent changes using the tracking code from AI Automation Station.</p></div></li>
</ul>
```

Leave the `CollectionPage` JSON-LD, the topic buttons and everything from `<h2 id="next">` on unchanged.

Append to `public/reading.css`:

```css
.guide-list{padding:0;list-style:none}.guide{display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:start;margin:0;padding:20px 0;border-top:1px solid #333}.guide img{border:1px solid #333}.guide h3{margin:0 0 8px;font-size:21px}.guide p{margin:0 0 8px}
@media(max-width:640px){.guide{grid-template-columns:1fr;gap:12px}}
```

The images are lazy and 23–28 KB each; the hub stays light.

- [ ] **Step 4: Link guides from topic pages**

In `src/topics.js`, add a `guides` field to three entries (append before each entry's closing `}`):

- `claude-code`: `guides: [['/guides/claude-code-vs-codex.html', 'Claude Code vs Codex: how I use both and route tasks'], ['/guides/codex-workflow.html', 'Make and verify a code change with Codex']]`
- `codex-opencode`: `guides: [['/guides/codex-workflow.html', 'Make and verify a code change with Codex'], ['/guides/claude-code-vs-codex.html', 'Claude Code vs Codex: how I use both and route tasks']]`
- `make-com`: `guides: [['/guides/make-first-automation.html', 'Build your first Make.com automation']]`

In `src/archive.js`, replace:

```
<p class="start"><a href="/start-here.html">New here? Choose your first build</a> or <a href="/guides.html">read the free guides</a></p>
```

with:

```
${topic?.guides ? `<p class="start">Written guide${topic.guides.length > 1 ? 's' : ''}: ${topic.guides.map(([href, title]) => `<a href="${href}">${escape(title)}</a>`).join(' and ')}</p>\n` : ''}<p class="start"><a href="/start-here.html">New here? Choose your first build</a> or <a href="/guides.html">read the free guides</a></p>
```

- [ ] **Step 5: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass (the `topics.test.js` shape checks still pass because `guides` is optional), lint exit 0.

- [ ] **Step 6: Check visually**

```bash
D=docs/audits/2026-10-21-guides-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/guides.html && agent-browser wait 1500 && agent-browser eval "document.getElementById('coding-assistants').scrollIntoView({block: 'start'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t5-desktop-hub.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/guides.html && agent-browser wait 1500 && agent-browser eval "document.getElementById('coding-assistants').scrollIntoView({block: 'start'}); 1" && agent-browser wait 800 && agent-browser screenshot $D/t5-mobile-hub.png
agent-browser eval "JSON.stringify({sw: document.documentElement.scrollWidth, w: innerWidth})"
agent-browser close
curl -s http://localhost:5173/videos/claude-code | grep -c 'Written guides:'
```

Expected: desktop entries show a 200px image beside the title, description and video link, separated by rules; on the phone the image stacks above the text and `sw === w`. The curl prints `1`; if it prints 0, stop and report so the coordinator restarts the server.

- [ ] **Step 7: Commit**

```bash
git add public/guides.html public/reading.css src/topics.js src/archive.js src/guides.test.js src/archive.test.js
git commit -m "Show images and paired videos on the guides hub and link guides from video topics

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Copy buttons for commands (finding 12)

**Files:**
- Create: `src/copy-code.js`, `src/copy-code.test.js`
- Modify: `src/reading.js` (import and one call), `public/reading.css`

**Interfaces:**
- Produces: `addCopyButtons(doc: Document, clipboard: { writeText(text: string): Promise<void> }): void`.

- [ ] **Step 1: Write the failing test**

Create `src/copy-code.test.js`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { addCopyButtons } from './copy-code.js';

const fakeDocument = blocks => ({
  querySelectorAll: selector => selector === 'main pre' ? blocks : [],
  createElement: () => ({ setAttribute(name, value) { this[name] = value; }, addEventListener(type, listener) { this[type] = listener; } }),
});

test('each command block gets a button that copies its text and says so', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const inserted = [];
  const block = { textContent: 'node public/examples/first-api-request.mjs', before: element => inserted.push(element) };
  const copied = [];
  addCopyButtons(fakeDocument([block]), { writeText: async text => { copied.push(text); } });
  const [button] = inserted;
  assert.equal(button.type, 'button');
  assert.equal(button.textContent, 'Copy');
  assert.equal(button['aria-live'], 'polite');
  await button.click();
  assert.deepEqual(copied, ['node public/examples/first-api-request.mjs']);
  assert.equal(button.textContent, 'Copied');
  t.mock.timers.tick(2000);
  assert.equal(button.textContent, 'Copy');
});

test('a blocked clipboard tells the reader to select the text', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const inserted = [];
  addCopyButtons(fakeDocument([{ textContent: 'x', before: element => inserted.push(element) }]), { writeText: async () => { throw new Error('denied'); } });
  await inserted[0].click();
  assert.equal(inserted[0].textContent, 'Copy failed: select the text');
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test src/copy-code.test.js`
Expected: FAIL with `Cannot find module` for `./copy-code.js`.

- [ ] **Step 3: Create `src/copy-code.js`**

```js
// A Copy button above each command block on reading pages. The button's own text reports the result.
export function addCopyButtons(doc, clipboard) {
  for (const block of doc.querySelectorAll('main pre')) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-live', 'polite');
    button.addEventListener('click', async () => {
      try {
        await clipboard.writeText(block.textContent);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Copy failed: select the text';
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
    block.before(button);
  }
}
```

- [ ] **Step 4: Call it from `src/reading.js`**

After the line `import { disableMarketingTracking, getTrackingConsent, loadMarketingTracking, setTrackingConsent, trackGoogleEvent, trackMetaOutbound } from './tracking.js';` add:

```js
import { addCopyButtons } from './copy-code.js';
```

At the end of the file, after `recordView();`, add:

```js
// The Clipboard API needs a secure page; without it the commands stay selectable as before.
if (navigator.clipboard) addCopyButtons(document, navigator.clipboard);
```

`src/reading.test.js` runs under Node, whose `navigator` has no `clipboard`, so its fake document is never asked for `main pre`.

- [ ] **Step 5: Style the button**

Append to `public/reading.css`:

```css
.copy{display:block;min-height:44px;margin:24px 0 -1px auto;padding:0 16px;border:1px solid #333;border-bottom:0;background:#111;color:#f5f5f0;font:400 13px 'DM Mono',monospace;cursor:pointer}.copy:hover{border-color:#8c8c86}.copy:focus-visible{outline:2px solid #ff6846;outline-offset:2px}.copy+pre{margin-top:0}
```

The button sits above the block's top-right corner like a tab, so it never covers the command.

- [ ] **Step 6: Run tests and lint**

Run: `npm test && rtk proxy npx eslint .`
Expected: all pass, lint exit 0.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-guides-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/guides/codex-workflow.html && agent-browser wait 1500 && agent-browser eval "document.querySelector('.copy').scrollIntoView({block: 'center'}); document.querySelectorAll('.copy').length" && agent-browser wait 800 && agent-browser screenshot $D/t6-desktop-copy.png
agent-browser close
```

Expected: the eval prints the number of `<pre>` blocks on the page (4 on this guide), and the screenshot shows a "Copy" tab above the right edge of the first command block. Clicking needs a real clipboard; the unit test covers the behaviour.

- [ ] **Step 8: Commit**

```bash
git add src/copy-code.js src/copy-code.test.js src/reading.js public/reading.css
git commit -m "Add copy buttons to command blocks on reading pages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Verify, record, deploy question

**Files:**
- Modify: `docs/audits/2026-10-21-guides-audit.md` (append an Implementation section)
- Add: `docs/audits/2026-10-21-guides-screenshots/*.png`, this plan file

- [ ] **Step 1: Run everything**

```bash
rtk proxy npx eslint . && npm test && npm run build
grep -c 'src="/assets/reading.js"' dist/guides.html dist/start-here.html dist/guides/*.html
```

Expected: lint clean, all tests pass, the build ends without `Pre-rendered page is incomplete`, and each grep count is `1`. Leave any snapshot files the build changes unstaged.

- [ ] **Step 2: Final screenshots**

```bash
D=docs/audits/2026-10-21-guides-screenshots
agent-browser set viewport 1440 900
for p in guides.html start-here.html guides/claude-code-vs-codex.html guides/make-first-automation.html 404.html; do agent-browser open http://localhost:5173/$p && agent-browser wait 1200 && agent-browser screenshot "$D/final-desktop-$(basename $p .html).png"; done
agent-browser set device "iPhone 15"
for p in guides.html guides/claude-code-vs-codex.html; do agent-browser open http://localhost:5173/$p && agent-browser wait 1200 && agent-browser eval "JSON.stringify({page: '$p', sw: document.documentElement.scrollWidth, w: innerWidth})" && agent-browser screenshot "$D/final-mobile-$(basename $p .html).png"; done
agent-browser close
```

Read every screenshot. Check for no sideways scroll, the header on one row on desktop and two on phones, and readable buttons. Report problems; do not fix them.

- [ ] **Step 3: Record**

Append to `docs/audits/2026-10-21-guides-audit.md` an `## Implementation (2026-10-21)` section listing the commits, `Findings 1–12: done`, `Finding 13: not started (editorial)`, the new Skool placements `reading_header` and `watch_header`, the screenshots folder, and any problems from Step 2. Real values only.

- [ ] **Step 4: Commit**

```bash
git add docs/audits/2026-10-21-guides-audit.md docs/audits/2026-10-21-guides-screenshots docs/superpowers/plans/2026-10-21-guides-fixes.md
git commit -m "Record guides fixes and screenshots

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Deploy question (coordinator)**

Pushes no longer auto-deploy (see memory `vercel-deploy-path`). After the owner approves a push, set up the clean `origin/main` worktree and give the owner the one-line deploy command. After deploy, check `/blog` → 308 to `/guides.html`, the new header on `/guides.html`, and the flagship guide's `og:image`.
