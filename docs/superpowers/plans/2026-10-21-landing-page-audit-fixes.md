# Landing Page Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 24 findings from the 2026-10-21 landing page audit: three layout bugs, repeated copy, competing exits, inconsistent labels, a prose typeface rule, and section order.

**Architecture:** Every change lives in `src/main.jsx` (the single-page React app, prerendered at build) and `src/styles.css`. A new source-level test file, `src/homepage.test.js`, pins each fix with string and regex checks, the same pattern `src/guides.test.js` uses for static pages. `scripts/prerender.js` keeps guarding the rendered output. Visual checks use `agent-browser` against the Vite dev server.

**Tech Stack:** React 19, Vite 8, plain CSS, Node's built-in test runner (`node --test`), ESLint 9, `agent-browser` CLI for screenshots.

**Spec:** `docs/audits/2026-10-21-landing-page-design-audit.md`

## Global Constraints

- Keep the Oct 7 visual direction: neutral black, `#ff6846` signal orange, Archivo Black uppercase headings with the orange closing clause, tracked-caps eyebrow labels, pill buttons, segmented dividers, boxed numbered FAQ, `.reveal` / `.reveal-group` scroll reveals. No palette or heading-style changes.
- Keep every section id: `main-content`, `featured-video`, `community`, `pricing`, `faq`, `latest`, `tools`, `about`, `code`, `work-together`. Static pages link `/#about`; `src/funnel.test.js` uses `/#community`.
- `scripts/prerender.js` must keep finding `<h1`, `id="latest"`, `id="pricing"`, `id="faq"`, `skool.com/ai-automation-station-7346/about`, and `href="/watch/` in the rendered page.
- Prices stay Standard $29, Premium $49, VIP $89 a month. No income promises, invented testimonials or invented numbers.
- Tracking: keep every event name and every `placement` value for CTAs that survive. When a visible label changes, change the `button_text` argument to match (say so in the commit message).
- New-tab marker rule: every `.button` link and standalone text link that opens a new tab ends its label with ` ↗`. Exempt: footer column links, nav lists, repo names, and the booking button (it opens an inline calendar).
- No new dependencies. No new files except `src/homepage.test.js` and screenshots.
- Tasks edit the same two files, so run them in order, one at a time. Do not parallelise.
- Commit messages: sentence case, imperative, matching recent history (e.g. "Fix verified sitemap and mobile image SEO issues"), ending with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- `npm run build` refreshes `src/youtube-snapshot.json`, `src/uploads-snapshot.js`, `src/thumbnail-snapshot.json` and `public/assets/thumbnails/*`. Never stage those in these commits. Three untracked `public/assets/thumbnails/hero-*.webp` files predate this work; leave them alone.
- Do not `git push`. Pushing `main` deploys production on Vercel. Ask the owner first (Task 12).

## Finding → task map

| Finding | Task |
|---|---|
| 1 mobile plan price order, 2 product button alignment, 3 empty About column | 1 |
| 7 "Course access varies", 8 duplicate rule copy, 13 FAQ #8, 16 "press play" note, 24 contact height | 2 |
| 6 classroom list, 9 start-free-build links (part), 11 pricing clutter | 3 |
| 9 (rest), 10 videos section exits, 21 guides box styling | 4 |
| 12 repo list | 5 |
| 5 hero status pill, 14 brand relationship | 6 |
| 15 Skool button labels, 17 ↗ marker | 7 |
| 18 eyebrow labels, 22 nav pricing entry | 8 |
| 23 stats placement | 9 |
| 19 prose typeface rule, 20 DM Mono "ƒ" (owner approval required) | 10 |
| 4 Join destination (owner decision required) | 11 |
| Verification, screenshots, audit record, push question | 12 |

## Visual check setup (used by every task)

Start once, in the background, and leave running:

```bash
npm run dev -- --port 5173 --strictPort
```

Screenshots go to `docs/audits/2026-10-21-implementation-screenshots/` (repo precedent: `docs/audits/2026-10-04-implementation-screenshots/`).

Correction found while running Task 1: the dev server renders the app client-side, so opening `/#section` does not scroll there, and `html { scroll-behavior: smooth }` makes an immediate `scrollBy` read stale positions. Wherever a task below opens `http://localhost:5173/#<id>`, open `http://localhost:5173/`, wait 1500ms, then run `agent-browser eval "document.documentElement.style.scrollBehavior='auto'; document.getElementById('<id>').scrollIntoView(); window.scrollBy(0, <offset>); 1"` and wait 1500ms before the screenshot (the scroll also triggers the reveal fade).

---

### Task 1: Layout bugs (findings 1, 2, 3)

**Files:**
- Create: `src/homepage.test.js`
- Create: `docs/audits/2026-10-21-implementation-screenshots/` (directory)
- Modify: `src/main.jsx:561-562` (product card action)
- Modify: `src/styles.css:173,175` (`.tool ul`, `.tool .button`), `src/styles.css:240` (`.portrait`), `src/styles.css:332` (phone plan rows)

**Interfaces:**
- Produces, in `src/homepage.test.js`: `jsx` (string, contents of `src/main.jsx`), `css` (string, contents of `src/styles.css`), `media(query: string): string` (the full text of the first `@media <query> { … }` block). Later tasks append tests to this file and use these names.

- [ ] **Step 1: Confirm the baseline is green and start the dev server**

```bash
npm test && npm run lint
mkdir -p docs/audits/2026-10-21-implementation-screenshots
npm run dev -- --port 5173 --strictPort   # run in background
```

Expected: all existing tests pass, lint prints nothing.

- [ ] **Step 2: Write the failing tests**

Create `src/homepage.test.js`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Source checks for the landing page; scripts/prerender.js checks the rendered output.
const jsx = await readFile(new URL('./main.jsx', import.meta.url), 'utf8');
const css = await readFile(new URL('./styles.css', import.meta.url), 'utf8');

function media(query) {
  const start = css.indexOf(`@media ${query} {`);
  assert.ok(start >= 0, `missing @media ${query}`);
  let depth = 0;
  for (let index = css.indexOf('{', start); index < css.length; index++) {
    if (css[index] === '{') depth++;
    else if (css[index] === '}' && --depth === 0) return css.slice(start, index + 1);
  }
  assert.fail(`unclosed @media ${query}`);
}

test('phones put each plan price on the plan name row', () => {
  const phone = media('(max-width: 640px)');
  assert.match(phone, /\.plan-list > li > div \{ display: contents; \}/);
  assert.match(phone, /\.plan-list \.plan-price \{ grid-row: 1; grid-column: 2; \}/);
});

test('product card buttons align at the bottom of each card', () => {
  assert.match(jsx, /<div className="tool-action">\s*\{tool\.note && <p className="fine-print">\{tool\.note\}<\/p>\}\s*<a className="button button-primary"/);
  assert.match(css, /\.tool ul \{[^}]*margin: 4px 0 0;/);
  assert.match(css, /\.tool-action \{ margin-top: auto; padding-top: 24px; \}/);
});

test('the portrait stays beside the About copy on desktop', () => {
  assert.match(css, /\.portrait \{[^}]*position: sticky; top: 96px;/);
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node --test src/homepage.test.js`
Expected: 3 failing tests (`The input did not match the regular expression …`).

- [ ] **Step 4: Fix the phone plan rows**

In `src/styles.css`, inside `@media (max-width: 640px)`, replace:

```css
  .plan-list > li { flex-direction: column; gap: 6px; }
```

with:

```css
  /* Phones: plan name and price share the first row; the rest of the plan spans below. */
  .plan-list > li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0 16px; }
  .plan-list > li > div { display: contents; }
  .plan-list > li > div > :not(h3) { grid-column: 1 / -1; }
  .plan-list .plan-price { grid-row: 1; grid-column: 2; }
  .plan-list .plan-link { justify-self: start; }
```

Why this works: `display: contents` lifts the `h3`, fit line, features and link into the `li` grid. The price is placed explicitly at row 1, column 2, so it sits beside the `h3`, and every other child spans both columns below.

- [ ] **Step 5: Align the product card buttons**

In `src/main.jsx`, replace:

```jsx
                  <a className="button button-primary" href={tool.url} target="_blank" rel="noreferrer" onClick={trackClick('tools', tool.cta, tool.url, `visit_${tool.name.toLowerCase()}`)}>{tool.cta}</a>
                  {tool.note && <p className="fine-print">{tool.note}</p>}
```

with:

```jsx
                  <div className="tool-action">
                    {tool.note && <p className="fine-print">{tool.note}</p>}
                    <a className="button button-primary" href={tool.url} target="_blank" rel="noreferrer" onClick={trackClick('tools', tool.cta, tool.url, `visit_${tool.name.toLowerCase()}`)}>{tool.cta}</a>
                  </div>
```

In `src/styles.css`, replace:

```css
.tool ul { width: 100%; margin: 4px 0 auto; border-top: 1px solid var(--line); }
```

with:

```css
.tool ul { width: 100%; margin: 4px 0 0; border-top: 1px solid var(--line); }
```

and replace:

```css
.tool .button { margin-top: 20px; }
```

with:

```css
/* The action block takes the free space, so both cards' buttons land on the same line. */
.tool-action { margin-top: auto; padding-top: 24px; }
.tool-action .fine-print { margin: 0 0 14px; }
```

The trial disclosure now sits directly above "Start a free trial", which also puts it before the click.

- [ ] **Step 6: Make the portrait sticky**

In `src/styles.css`, replace:

```css
.portrait { width: 100%; aspect-ratio: 1; object-fit: cover; border: 1px solid var(--line-strong); border-radius: 14px; }
```

with:

```css
.portrait { position: sticky; top: 96px; width: 100%; aspect-ratio: 1; object-fit: cover; border: 1px solid var(--line-strong); border-radius: 14px; }
```

On phones the grid is one column, the portrait's grid area is its own height, and sticky has no visible effect. No phone override is needed.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: 3 passing tests, lint clean.

- [ ] **Step 8: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/#pricing && agent-browser wait 1500 && agent-browser screenshot $D/t1-mobile-pricing.png
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#tools && agent-browser eval "window.scrollBy(0, 500)" && agent-browser wait 1500 && agent-browser screenshot $D/t1-desktop-tools.png
agent-browser open http://localhost:5173/#about && agent-browser eval "window.scrollBy(0, 600)" && agent-browser wait 1500 && agent-browser screenshot $D/t1-desktop-about.png
```

Expected: "Standard" and "$29 a month" on one row on the phone; both product buttons on the same horizontal line; the portrait still visible beside the timeline after scrolling 600px.

- [ ] **Step 9: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Fix mobile plan price order, product button alignment and About gap

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Remove repeated copy (findings 7, 8, 13, 16, 24)

**Files:**
- Modify: `src/main.jsx` (hero fine print ~line 432, featured video note ~249, `faqs` array ~139, booking note ~607)
- Modify: `src/styles.css` (`.player-note` ~142, `.booking-note` ~251)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `css` from Task 1.
- Produces: `count(text: string, needle: string): number` in `src/homepage.test.js`.

- [ ] **Step 1: Write the failing test**

Append to `src/homepage.test.js`:

```js
const count = (text, needle) => text.split(needle).length - 1;

test('each claim and note appears once at most', () => {
  assert.equal(count(jsx, 'leave the mistakes in'), 1);
  assert.equal(count(jsx, 'Course access varies by plan'), 0);
  assert.doesNotMatch(jsx, /press play\./);
  assert.doesNotMatch(jsx, /Can I try TubeAnalytics or VisiScan for free\?/);
  assert.doesNotMatch(css, /\.booking-note|\.player-note/);
});
```

`"Course access varies by plan"` remains in `src/video-offer.js` as the default access line for watch pages. That file is shared with server-rendered watch pages and stays as is.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL, `2 !== 1` on the first assertion.

- [ ] **Step 3: Edit the copy**

In `src/main.jsx`:

1. Replace `From $29/month. Cancel anytime. Course access varies by plan.` with `From $29/month. Cancel anytime.`
2. Delete the line `        <p className="player-note">YouTube loads only after you press play.</p>`
3. Delete the last `faqs` entry, the whole line beginning `  ['Can I try TubeAnalytics or VisiScan for free?',`. The products section already says both have a free way to try them.
4. Delete the line `          <p className="booking-note">Every video follows the same rule: build something real, leave the mistakes in, and say plainly whether the tool is worth your time.</p>`. This also shortens the contact section (finding 24); no layout change is needed beyond that.

In `src/styles.css`, delete these two lines:

```css
.player-note { color: var(--muted); font-size: 12px; }
```

```css
.booking-note { max-width: 58ch; margin-top: 16px; color: var(--muted); font-size: 13px; }
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 5: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/ && agent-browser wait 1500 && agent-browser screenshot $D/t2-desktop-hero.png
agent-browser open http://localhost:5173/#work-together && agent-browser wait 1500 && agent-browser screenshot $D/t2-desktop-contact.png
```

Expected: the featured video card ends at the date, title and Skool line, with no note; the contact section goes straight from the intro paragraph to "Book a free intro call".

- [ ] **Step 6: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Remove repeated landing page copy and the off-topic FAQ

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Declutter pricing and the classroom list (findings 6, 9, 11)

**Files:**
- Modify: `src/main.jsx` (~lines 479-484 below the plan list, ~490-498 classroom list)
- Modify: `src/styles.css` (`.course-preview a` ~236)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `css` from Task 1.

- [ ] **Step 1: Write the failing tests**

Append to `src/homepage.test.js`:

```js
test('pricing ends with one billing note and one help line', () => {
  assert.doesNotMatch(jsx, /View plans from \$29\/month/);
  assert.doesNotMatch(jsx, /Open the classroom \(member login\)/);
  assert.doesNotMatch(jsx, /Start a free build/);
  assert.match(jsx, /Levels are your Skool community level\./);
});

test('the classroom list names courses without repeating plan access', () => {
  const start = jsx.indexOf('<h3>Inside the classroom</h3>');
  const classroom = jsx.slice(start, jsx.indexOf('</ul>', start));
  assert.ok(start >= 0);
  assert.doesNotMatch(classroom, /level|Premium|VIP|Included with/i);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test src/homepage.test.js`
Expected: 2 new failures.

- [ ] **Step 3: Replace the block under the plan list**

In `src/main.jsx`, replace:

```jsx
            <div className="button-row">
              <a className="button button-primary" href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('community', 'View plans from $29/month', plansUrl)}>View plans from $29/month</a>
            </div>
            <p className="fine-print">Monthly prices shown. Choose your plan and billing period on Skool. Annual billing is available. Cancel anytime from your Skool account.</p>
            <p className="community-help">Want to try a build first? <a href="/start-here.html" onClick={trackClick('community', 'Start a free build', '/start-here.html', 'start_free_build')}>Start a free build — no signup needed</a>.</p>
            <p className="community-help"><a href="https://www.skool.com/ai-automation-station-7346/classroom" target="_blank" rel="noreferrer">Open the classroom (member login)</a>. Comparing plans? <a href="mailto:automojic@proton.me?subject=AI%20Income%20Lab%20plans">Ask which plan fits your project</a>.</p>
```

with:

```jsx
            <p className="fine-print">Monthly prices shown; annual billing is available. Levels are your Skool community level. Choose your plan and billing period on Skool, and cancel anytime from your Skool account.</p>
            <p className="community-help">Comparing plans? <a href="mailto:automojic@proton.me?subject=AI%20Income%20Lab%20plans">Ask which plan fits your project</a>.</p>
```

What moves where: member login stays in the footer ("Member login"). The start-here link comes back once, in the guides list (Task 4), keeping its `start_free_build` action. The `community` placement CTA goes away; the three plan links (placement `pricing`) remain.

- [ ] **Step 4: Trim the classroom list**

In `src/main.jsx`, replace:

```jsx
                <li><strong>Runable Course</strong><span>Available to all members inside the Skool community.</span></li>
                <li><strong>Beginner’s Automation Course</strong><span>Build simple business automations in Make.com. Unlocks at level 2, or immediately with Premium or VIP.</span></li>
                <li><strong>Claude Code &amp; Skills / Codex Tutorials &amp; Courses</strong><span>Follow coding workflows, prompts, and practical lessons.</span></li>
                <li><strong>Complete AI Avatar Video Course</strong><span>Included with Premium and VIP. Create an avatar, generate a voice, and automate the workflow with HeyGen, ElevenLabs, and Make.com.</span></li>
                <li><strong>VAPI AI Voice Agent Course</strong><span>Build a voice agent with VAPI and ElevenLabs. Unlocks at level 4, or immediately with Premium or VIP.</span></li>
                <li><strong>Ultimate N8N Template Library</strong><span>Included with VIP: 6,400+ workflows for marketing, sales, operations, and data processing.</span></li>
              </ul>
              <p className="fine-print">Levels refer to your Skool community level. <a href="mailto:automojic@proton.me?subject=Course%20access">Ask about course access</a>.</p>
```

with:

```jsx
                <li><strong>Runable Course</strong><span>Build and launch an AI-powered business website.</span></li>
                <li><strong>Beginner’s Automation Course</strong><span>Build simple business automations in Make.com.</span></li>
                <li><strong>Claude Code &amp; Skills / Codex Tutorials &amp; Courses</strong><span>Follow coding workflows, prompts, and practical lessons.</span></li>
                <li><strong>Complete AI Avatar Video Course</strong><span>Create an avatar, generate a voice, and automate the workflow with HeyGen, ElevenLabs, and Make.com.</span></li>
                <li><strong>VAPI AI Voice Agent Course</strong><span>Build a voice agent with VAPI and ElevenLabs.</span></li>
                <li><strong>Ultimate N8N Template Library</strong><span>6,400+ workflows for marketing, sales, operations, and data processing.</span></li>
              </ul>
```

Plan access now lives in the plan list (what you get) and FAQ #3 (how unlocks work).

In `src/styles.css`, delete the now-unused rule:

```css
.course-preview a { text-decoration: underline; text-underline-offset: 3px; }
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass. If lint reports `trackClick` unused, it is not: it is still used by the latest section and other CTAs.

- [ ] **Step 6: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#pricing && agent-browser eval "window.scrollBy(0, 500)" && agent-browser wait 1500 && agent-browser screenshot $D/t3-desktop-pricing.png
```

Expected: under VIP, one fine-print paragraph and one "Comparing plans?" line. The right column shows six courses with short descriptions only.

- [ ] **Step 7: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Trim pricing extras and classroom access repeats

Removes the 'View plans from \$29/month' community CTA; plan links keep the pricing placement.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: One path through the videos section (findings 9, 10, 21)

**Files:**
- Modify: `src/main.jsx` (~lines 515-540, the `#latest` section)
- Modify: `src/styles.css:30-35` (`.build-guides` rules) and the `@media (max-width: 640px)` block
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `css`, `media()`, `count()` from Tasks 1 and 2.

- [ ] **Step 1: Write the failing test**

Append to `src/homepage.test.js`:

```js
test('the videos section keeps two buttons, the grid and one guides list', () => {
  assert.equal(count(jsx, 'href="/start-here.html"'), 1);
  assert.doesNotMatch(jsx, /Start your first build|Prefer a recording\?|'video_grid'|Every video on YouTube/);
  // Fixed /watch/ links keep evergreen video pages linked from the homepage for indexing.
  for (const id of ['7v_675nO7nM', 'geKngm3sg3w', 'G8u1-hKEqig']) assert.match(jsx, new RegExp(`href="/watch/${id}"`));
  assert.match(media('(max-width: 640px)'), /\.build-guides ul \{ grid-template-columns: 1fr; \}/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL on the `doesNotMatch` line (input contains "Start your first build"). The start-here count is already 1 after Task 3, from that button; this task moves it into the guides list.

- [ ] **Step 3: Drop the extra button and update the intro line**

In `src/main.jsx`, replace:

```jsx
title="More real" accent="builds.">Watch another build, or choose a starting point for your own project.</SectionHead>
```

with:

```jsx
title="More real" accent="builds.">Watch another build, or follow a written guide for your own project.</SectionHead>
```

and delete the line:

```jsx
                <a className="button button-quiet" href="/start-here.html">Start your first build</a>
```

- [ ] **Step 4: Replace the guides box and remove the trailing exits**

In `src/main.jsx`, replace everything from `          <aside className="build-guides" aria-labelledby="build-guides-title">` through the line `          <a className="text-link" href={channelUrl} target="_blank" rel="noreferrer" onClick={trackClick('latest_posts', 'Every video on YouTube', channelUrl, 'visit_youtube')}>Every video on YouTube ↗</a>` (that is, the aside, the "Build with AI Income Lab" button row, and the YouTube text link) with:

```jsx
          <aside className="build-guides" aria-labelledby="build-guides-title">
            <h3 id="build-guides-title">Guides and walkthroughs</h3>
            <p>Free step-by-step builds with sample inputs, troubleshooting, and a clear finish line.</p>
            <ul>
              <li><a href="/start-here.html" onClick={trackClick('latest', 'Start here: your first build', '/start-here.html', 'start_free_build')}>Start here: your first build</a></li>
              <li><a href="/guides/claude-code-vs-codex.html">Claude Code vs Codex: how I use both</a></li>
              <li><a href="/guides/codex-workflow.html">Use Codex to make and verify a code change</a></li>
              <li><a href="/guides/make-first-automation.html">Route a sample business request with Make.com</a></li>
              <li><a href="/guides/first-api-request.html">Test your first AI API request locally</a></li>
              <li><a href="/guides/youtube-feed.html">Build a resilient YouTube feed in React</a></li>
              <li><a href="/guides/consent-tracking.html">Track clicks only after consent</a></li>
              <li><a href="/watch/7v_675nO7nM">Video: build an OpenCode desktop app</a></li>
              <li><a href="/watch/geKngm3sg3w">Video: set up 9Router</a></li>
              <li><a href="/watch/G8u1-hKEqig">Video: follow the HeyGen avatar workflow</a></li>
            </ul>
            <a className="text-link" href="/guides.html">All guides</a>
          </aside>
```

Kept on purpose: all six guide links and the three fixed `/watch/` links. They are homepage internal links for guides and video pages that Search Console still shows as not indexed. Removed: the `video_grid` placement CTA and the `latest_posts` YouTube link ("Browse every video" and "Subscribe on YouTube" remain).

- [ ] **Step 5: Restyle the guides list to match the repo list**

In `src/styles.css`, replace lines 30-35:

```css
.build-guides { margin: 32px 0; padding: 24px; border: 1px solid var(--line-strong); background: var(--panel); font-family: var(--sans); }
.build-guides h3 { margin-top: 0; color: var(--text); }
.build-guides ul { padding-left: 20px; }
.build-guides li { margin: 8px 0; }
.build-guides a { color: var(--signal-hover); text-decoration: underline; text-underline-offset: 4px; }
.build-guides li a { display: inline-flex; align-items: center; min-height: 44px; }
```

with:

```css
/* Guides under the latest videos: ruled two-column list, same rhythm as the repo list */
.build-guides { margin-top: 96px; }
.build-guides h3 { font: 600 22px/1.25 var(--sans); }
.build-guides > p { margin-top: 8px; color: var(--body); }
.build-guides ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 32px; margin-top: 32px; border-top: 1px solid var(--line); }
.build-guides li a { display: flex; align-items: center; min-height: 56px; border-bottom: 1px solid var(--line); font-size: 14px; transition: color .2s ease; }
.build-guides li a:hover { color: var(--signal); }
```

Inside `@media (max-width: 640px)`, add after the `.video-card .duration` line:

```css
  .build-guides ul { grid-template-columns: 1fr; }
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm test && npm run lint`
Expected: all pass (the full suite confirms `src/guides.test.js` still passes; it checks `public/` only).

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#latest && agent-browser wait 1500 && agent-browser screenshot $D/t4-desktop-latest-top.png
agent-browser eval "window.scrollBy(0, 1100)" && agent-browser wait 1500 && agent-browser screenshot $D/t4-desktop-guides.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/#build-guides-title && agent-browser wait 1500 && agent-browser screenshot $D/t4-mobile-guides.png
```

Expected: two buttons above the grid; a ruled two-column list of ten links with no box, in body colour, orange on hover; one column on the phone.

- [ ] **Step 8: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Cut videos section exits to one guides list

Removes the video_grid Skool CTA and the latest_posts YouTube link; start-here keeps the start_free_build action from the latest placement.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Shorter build list (finding 12)

**Files:**
- Modify: `src/main.jsx` (`repos` array, ~lines 109-115)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `count()`.

Default kept: `solar-business-directory`, `seo-tool`, `ai-income-lab` (the most recent, and the source of this page). Dropped: `trading-app`, and `Swiftris` (the 2014 timeline row already mentions it). If the owner prefers a different three, swap entries; the test only counts.

- [ ] **Step 1: Write the failing test**

```js
test('the build list shows three projects', () => {
  const start = jsx.indexOf('const repos = [');
  assert.equal(count(jsx.slice(start, jsx.indexOf('];', start)), "{ name: '"), 3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL, `5 !== 3`.

- [ ] **Step 3: Delete two entries**

In `src/main.jsx`, delete the lines beginning:

```js
  { name: 'trading-app',
```

```js
  { name: 'Swiftris',
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/homepage.test.js src/main.jsx
git commit -m "Show three projects in the About build list

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Hero: one title, one brand explanation (findings 5, 14)

**Files:**
- Modify: `src/main.jsx` (`.hero-text` paragraph, ~line 424)
- Modify: `src/styles.css` (after the `.hero-status:hover` rule)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `css`.

Note on finding 5: the featured video and the Runable promo overlap only while the newest upload is the Runable video. The feed changes daily, so no promo change is planned. Only the status pill is fixed: it repeats the featured video's title on desktop, where both sit side by side. On phones the video sits below the fold, so the pill stays.

- [ ] **Step 1: Write the failing test**

```js
test('the hero relates the two brands and skips the repeated title on desktop', () => {
  assert.match(jsx, /AI Income Lab is the paid community from the AI Automation Station YouTube channel\./);
  assert.match(css, /@media \(min-width: 961px\) \{ \.hero-status \{ display: none; \} \}/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL on the first assertion.

- [ ] **Step 3: Rewrite the hero sentence**

In `src/main.jsx`, replace:

```jsx
<p className="hero-text"><strong>AI Income Lab, the AI Automation Station community.</strong> Step-by-step courses, reusable templates, and a community of 2,900+ members, hosted by Mike Holp.</p>
```

with:

```jsx
<p className="hero-text"><strong>AI Income Lab is the paid community from the AI Automation Station YouTube channel.</strong> Step-by-step courses, reusable templates, and 2,900+ members, hosted by Mike Holp.</p>
```

- [ ] **Step 4: Hide the pill on desktop**

In `src/styles.css`, after:

```css
.hero-status:hover { border-color: var(--muted); }
```

add:

```css
/* Desktop shows the featured video beside the copy, so the pill would repeat its title. */
@media (min-width: 961px) { .hero-status { display: none; } }
```

961px is the first width above the existing `max-width: 960px` single-column breakpoint.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 6: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/ && agent-browser wait 1500 && agent-browser screenshot $D/t6-desktop-hero.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/ && agent-browser wait 1500 && agent-browser screenshot $D/t6-mobile-hero.png
```

Expected: desktop starts with the H1, with no pill and no awkward gap above it (the copy column is vertically centred); the phone still shows the pill.

- [ ] **Step 7: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Explain the AI Income Lab and AI Automation Station relationship in the hero

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: One Skool label and a consistent ↗ marker (findings 15, 17)

**Files:**
- Modify: `src/main.jsx` (`VideoNextStep` ~line 210, Runable promo button ~451, both "Subscribe on YouTube" buttons, product CTA)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `count()`.

Label rule: general Skool buttons say "Join AI Income Lab"; the plan rows keep "Choose {plan} — ${price}/month". `button_text` in tracking changes with the visible label; `placement` values stay `featured_video` and `runable_course`.

- [ ] **Step 1: Write the failing test**

```js
test('Skool buttons share one label and new-tab buttons end with ↗', () => {
  assert.doesNotMatch(jsx, /Explore plans on Skool|Explore the course on Skool/);
  assert.equal(count(jsx, '>Subscribe on YouTube ↗</a>'), 2);
  assert.match(jsx, />\{tool\.cta\} ↗<\/a>/);
  for (const [link] of jsx.matchAll(/<a className="button.*?<\/a>/g)) {
    // The booking button opens an inline calendar; its new-tab target is only the no-JS fallback.
    if (link.includes('target="_blank"') && !link.includes('onClick={openCalendar}')) assert.match(link, /↗<\/a>$/, link);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL on the first assertion.

- [ ] **Step 3: Change the labels**

In `src/main.jsx`:

1. In `VideoNextStep`, replace
   `onClick={() => trackCommunityVisit('featured_video', 'Explore plans on Skool', url, video.id)}>Explore plans on Skool ↗</a>`
   with
   `onClick={() => trackCommunityVisit('featured_video', 'Join AI Income Lab', url, video.id)}>Join AI Income Lab ↗</a>`
2. In the Runable promo, replace
   `onClick={() => trackCommunityVisit('runable_course', 'Explore the course on Skool', communityUrl)}>Explore the course on Skool ↗</a>`
   with
   `onClick={() => trackCommunityVisit('runable_course', 'Join AI Income Lab', communityUrl)}>Join AI Income Lab ↗</a>`
3. Replace both occurrences (Edit with `replace_all: true`) of
   `>Subscribe on YouTube</a>`
   with
   `>Subscribe on YouTube ↗</a>`
4. In the product card (inside the `tool-action` div from Task 1), replace
   `>{tool.cta}</a>`
   with
   `>{tool.cta} ↗</a>`

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass. If the loop names a link, add ` ↗` to that label or, if it is a documented exemption, extend the condition with a comment saying why.

- [ ] **Step 5: Commit**

```bash
git add src/homepage.test.js src/main.jsx
git commit -m "Use one Join label for Skool buttons and mark every new-tab button

button_text changes for the featured_video and runable_course placements.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Nav and section labels (findings 18, 22)

**Files:**
- Modify: `src/main.jsx` (`navLinks` ~line 171, two `SectionHead` eyebrows)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`.

The `#community` id stays (Global Constraints); only the visible label changes. Scroll-spy keeps working because it keys off the id.

- [ ] **Step 1: Write the failing test**

```js
test('the nav names the plans and section labels say what follows', () => {
  assert.match(jsx, /\['#community', 'Plans'\]/);
  assert.match(jsx, /eyebrow="Plans" title="Your next build,"/);
  assert.match(jsx, /eyebrow="Latest videos"/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL.

- [ ] **Step 3: Edit the labels**

In `src/main.jsx`:

1. Replace `['#community', 'Community']` with `['#community', 'Plans']`.
2. Replace `eyebrow="AI Income Lab" title="Your next build,"` with `eyebrow="Plans" title="Your next build,"`.
3. Replace `eyebrow="Keep exploring"` with `eyebrow="Latest videos"`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 5: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#pricing && agent-browser wait 1500 && agent-browser screenshot $D/t8-desktop-nav.png
```

Expected: nav reads PLANS · VIDEOS · TOOLS · ABOUT · CONTACT, with PLANS underlined in orange while pricing is in view.

- [ ] **Step 6: Commit**

```bash
git add src/homepage.test.js src/main.jsx
git commit -m "Name the plans in the nav and give section labels real content

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Move the numbers next to the plans (finding 23)

**Files:**
- Modify: `src/main.jsx` (`stats` array ~lines 78-83; move the `<section className="stats">` block from after `#latest` to just before `#community`)
- Modify: `src/styles.css` (`.stats dl` ~103, `.stats div` ~104, the `@media (max-width: 640px)` block)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`, `css`, `media()`.

- [ ] **Step 1: Write the failing test**

```js
test('channel and member numbers sit just before the plans', () => {
  assert.ok(jsx.indexOf('<section className="stats"') < jsx.indexOf('id="community"'));
  assert.match(jsx, /\['2,900\+', 'community members'\]/);
  assert.match(css, /\.stats dl \{ display: grid; grid-template-columns: repeat\(4, minmax\(0, 1fr\)\); \}/);
  assert.match(media('(max-width: 640px)'), /\.stats dl \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\); \}/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL on the first assertion.

- [ ] **Step 3: Add the member count**

In `src/main.jsx`, replace:

```js
// Built-in values render first; /api/youtube replaces the keyed ones with live channel counts.
const stats = [
  ['5.1K', 'YouTube subscribers', 'subscribers'],
```

with:

```js
// Built-in values render first; /api/youtube replaces the keyed ones with live channel counts.
// The member count comes from Skool, so it has no key and stays static.
const stats = [
  ['2,900+', 'community members'],
  ['5.1K', 'YouTube subscribers', 'subscribers'],
```

The render already falls back: `channel?.[undefined]` is `undefined`, so `Number.isFinite` is false and the built-in value shows.

- [ ] **Step 4: Move the section**

In `src/main.jsx`, delete this block (and the blank line after it) from below the `#latest` section:

```jsx
      <section className="stats" aria-label="Channel numbers">
        <dl className="shell reveal-group">{stats.map(([value, label, key]) => <div key={label}><dt>{label}</dt><dd>{Number.isFinite(channel?.[key]) ? viewFormat.format(channel[key]) : value}</dd></div>)}</dl>
      </section>
```

Then replace:

```jsx
      <section className="section band" id="community">
```

with:

```jsx
      <section className="stats" aria-label="Community and channel numbers">
        <dl className="shell reveal-group">{stats.map(([value, label, key]) => <div key={label}><dt>{label}</dt><dd>{Number.isFinite(channel?.[key]) ? viewFormat.format(channel[key]) : value}</dd></div>)}</dl>
      </section>

      <section className="section band" id="community">
```

- [ ] **Step 5: Fit four numbers**

In `src/styles.css`, replace:

```css
.stats dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.stats div { display: flex; align-items: baseline; justify-content: center; gap: 14px; padding: 44px 24px; border-left: 1px solid var(--line); }
```

with:

```css
.stats dl { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
/* Four columns are 280px wide in the 1120px shell: stack the number over its label. */
.stats div { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 40px 16px; border-left: 1px solid var(--line); }
```

Inside `@media (max-width: 640px)`, after the `.stats dt` line, add:

```css
  .stats dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stats div:nth-child(3) { border-left: 0; }
  .stats div:nth-child(n + 3) { border-top: 1px solid var(--line); }
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 7: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#community && agent-browser eval "window.scrollBy(0, -220)" && agent-browser wait 1500 && agent-browser screenshot $D/t9-desktop-stats.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/#community && agent-browser eval "window.scrollBy(0, -320)" && agent-browser wait 1500 && agent-browser screenshot $D/t9-mobile-stats.png
```

Expected: four numbers in one row on desktop with no overflow, 2×2 on the phone with clean rules, directly above the Plans section.

- [ ] **Step 8: Commit**

```bash
git add src/homepage.test.js src/main.jsx src/styles.css
git commit -m "Move channel numbers above the plans and add the member count

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Prose typeface rule (findings 19, 20) — owner approval required

**Gate:** The Oct 7 direction made DM Mono the body face on purpose, and changes to the visual direction need the owner's go-ahead. Ask before starting:

> "Set paragraphs in Instrument Sans and keep DM Mono for labels, meta, prices, buttons and FAQ questions?"

If the answer is no, skip this task and record "skipped by owner" in Task 12.

**Files:**
- Modify: `src/styles.css` (after `.fine-print` ~line 223)
- Test: `src/homepage.test.js`
- On approval, update memory note `design-direction` with the new rule.

**Interfaces:**
- Consumes: `css`.

- [ ] **Step 1: Write the failing test**

```js
test('prose uses Instrument Sans while labels keep DM Mono', () => {
  assert.match(css, /\.lede,[^{]*\.fine-print,[^{]*\.faq-list details p,[^{]*\{ font-family: var\(--sans\); \}/);
  assert.match(css, /\.eyebrow, \.nav-links, \.text-link, \.button, \.footer-columns h2, \.stats dt \{ font-family: var\(--mono\);/);
});
```

The second assertion pins the existing mono label rule so a later edit cannot quietly drop it.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL on the first assertion.

- [ ] **Step 3: Add the rule**

In `src/styles.css`, after:

```css
.fine-print { margin-top: 14px; color: var(--muted); font-size: 12px; }
```

add:

```css
/* Prose reads in Instrument Sans; DM Mono stays on labels, meta, prices, buttons, timeline and FAQ questions. */
.lede, .about-copy > p:not(.about-links, .eyebrow), .tool-body > p:not(.tool-tagline), .plan-fit, .plan-features, .fine-print, .community-help, .support-note, .faq-list details p, .members p, .built > p, .repo-list li > p:not(.repo-meta, .repo-links), .build-guides > p, .next-step-access { font-family: var(--sans); }
.lede { font-size: 17px; line-height: 1.6; }
```

Specificity check: these selectors only compete with the inherited `:root { font-family: var(--mono) }`, so any class selector wins. The `.lede` size rule comes after the original `.lede` rule, has the same specificity, and therefore overrides its `line-height: 1.8`. The 17px matches `.course-promo-copy` and `.hero-text` on phones.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 5: Check visually**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/#pricing && agent-browser wait 1500 && agent-browser screenshot $D/t10-desktop-pricing.png
agent-browser open http://localhost:5173/#about && agent-browser wait 1500 && agent-browser screenshot $D/t10-desktop-about.png
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/#faq && agent-browser eval "document.querySelector('#faq details').open = true" && agent-browser wait 1500 && agent-browser screenshot $D/t10-mobile-faq.png
```

Expected: "Best for" lines, features, fine print and About paragraphs in sans (a plain "f" in "from"); headings, labels, buttons, prices, timeline and FAQ questions still mono or Archivo Black.

- [ ] **Step 6: Commit**

```bash
git add src/homepage.test.js src/styles.css
git commit -m "Set prose in Instrument Sans and keep DM Mono for labels and data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Join destination (finding 4) — owner decision required

**Gate:** Nav, hero and footer "Join AI Income Lab" go to the Skool About page; the plan rows go to the plan picker, which `main.jsx:18` says skips the About page's extra Join click. At about 5 signups a month, Skool's dashboard cannot settle which converts better, so this is a judgment call. Ask:

> "Send the three main Join buttons straight to the Skool plan picker (one fewer click), or keep the About page (shows the community description and members first)?"

Keep the About page: skip this task and record the decision in Task 12. Switch: continue.

**Files:**
- Modify: `src/main.jsx` (nav Join ~399, hero Join ~426, footer CTA Join ~620)
- Test: `src/homepage.test.js`

**Interfaces:**
- Consumes: `jsx`.

The footer column link "AI Income Lab" keeps `aboutUrl`, so the prerender check for `skool.com/ai-automation-station-7346/about` still passes.

- [ ] **Step 1: Write the failing test**

```js
test('the main Join buttons open the Skool plan picker', () => {
  for (const placement of ['navigation', 'hero', 'footer']) {
    assert.match(jsx, new RegExp(`href=\\{plansUrl\\}[^\\n]*trackCommunityVisit\\('${placement}', 'Join AI Income Lab', plansUrl\\)`), placement);
  }
  assert.match(jsx, /trackCommunityVisit\('footer', 'AI Income Lab'\)/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test src/homepage.test.js`
Expected: FAIL for `navigation`.

- [ ] **Step 3: Point the three buttons at the plan picker**

In `src/main.jsx`, make these three replacements:

- `href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('navigation', 'Join AI Income Lab', aboutUrl)}`
  → `href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('navigation', 'Join AI Income Lab', plansUrl)}`
- `href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('hero', 'Join AI Income Lab', aboutUrl)}`
  → `href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('hero', 'Join AI Income Lab', plansUrl)}`
- `href={aboutUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('footer', 'Join AI Income Lab', aboutUrl)}`
  → `href={plansUrl} target="_blank" rel="noreferrer" onClick={() => trackCommunityVisit('footer', 'Join AI Income Lab', plansUrl)}`

`aboutUrl` is still used by the footer column link, so lint will not flag it.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test src/homepage.test.js && npm run lint`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/homepage.test.js src/main.jsx
git commit -m "Send the main Join buttons to the Skool plan picker

link_url changes from /about to /plans for the navigation, hero and footer placements.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Full verification, record, and push question

**Files:**
- Modify: `docs/audits/2026-10-21-landing-page-design-audit.md` (append an Implementation section)
- Add: `docs/audits/2026-10-21-implementation-screenshots/*.png`

- [ ] **Step 1: Run everything**

```bash
npm run lint && npm test && npm run build
```

Expected: lint clean, all tests pass, and the build ends without `Pre-rendered page is incomplete`.

- [ ] **Step 2: Leave build snapshot churn unstaged**

```bash
git status --short
```

If `src/youtube-snapshot.json`, `src/uploads-snapshot.js`, `src/thumbnail-snapshot.json` or new `public/assets/thumbnails/*` files appear, do not stage them. Note them in the handoff message.

- [ ] **Step 3: Measure page height and take full-page passes**

```bash
D=docs/audits/2026-10-21-implementation-screenshots
agent-browser set viewport 1440 900 && agent-browser open http://localhost:5173/ && agent-browser wait 2000 && agent-browser eval "document.documentElement.scrollHeight"
for y in 0 900 1800 2700 3600 4500 5400 6300 7200 8100 9000; do agent-browser eval "window.scrollTo({top:$y,behavior:'instant'}); document.querySelectorAll('.reveal,.reveal-group').forEach(e=>e.classList.add('is-visible')); 1" && agent-browser wait 600 && agent-browser screenshot $D/final-desktop-$y.png; done
agent-browser set device "iPhone 15" && agent-browser open http://localhost:5173/ && agent-browser wait 2000 && agent-browser eval "document.documentElement.scrollHeight"
for y in 0 800 1600 2400 3200 4000 4800 5600 6400 7200 8000 8800 9600 10400 11200; do agent-browser eval "window.scrollTo({top:$y,behavior:'instant'}); document.querySelectorAll('.reveal,.reveal-group').forEach(e=>e.classList.add('is-visible')); 1" && agent-browser wait 600 && agent-browser screenshot $D/final-mobile-$y.png; done
agent-browser close
```

Expected: desktop height below the 10,555px baseline, mobile below 14,266px. Read every screenshot: no overlapping text, no horizontal scroll, no empty columns, buttons readable.

- [ ] **Step 4: Record the results in the audit**

Append to `docs/audits/2026-10-21-landing-page-design-audit.md`:

```markdown
## Implementation (YYYY-MM-DD)

Plan: `docs/superpowers/plans/2026-10-21-landing-page-audit-fixes.md`. Source checks: `src/homepage.test.js`.

| | Before | After |
|---|---|---|
| Desktop page height (1440×900) | 10,555px | <measured>px |
| Mobile page height (iPhone 15) | 14,266px | <measured>px |

- Findings 1–3, 5–18, 21–24: done (see commits).
- Finding 19–20 (prose typeface): <done | skipped by owner>.
- Finding 4 (Join destination): <switched to plan picker | kept About page, owner decision>.
- Tracking changes: removed placements `community` (View plans) and `video_grid`; removed `latest_posts` YouTube link; `button_text` now "Join AI Income Lab" for `featured_video` and `runable_course`; `start_free_build` now fires from `latest`.

Screenshots: `docs/audits/2026-10-21-implementation-screenshots/`.
```

Fill the date, both measured heights and the two decisions with the real values before committing. Do not leave the angle-bracket text in the file.

- [ ] **Step 5: Commit**

```bash
git add docs/audits/2026-10-21-landing-page-design-audit.md docs/audits/2026-10-21-implementation-screenshots docs/superpowers/plans/2026-10-21-landing-page-audit-fixes.md
git commit -m "Record landing page audit fixes and screenshots

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 6: Ask before pushing**

Pushing `main` deploys production on Vercel. Report the commit list, both page heights and any unstaged snapshot files, then ask the owner whether to push. After an approved push, check the live page at https://www.ai-automation-station.com/ at 1440px and on iPhone 15, the same way as Step 3.
