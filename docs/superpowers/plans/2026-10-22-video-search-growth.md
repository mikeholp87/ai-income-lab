# Video Search Growth Implementation Plan

> **For agentic workers:** Implement the checklist task by task, checking the existing code before each edit. Use the available `compound-engineering:ce-work` skill for execution; execute serially unless delegation is separately requested.

**Goal:** Increase qualified Google visits to existing video pages and measurable clicks from those pages to YouTube.

**Architecture:** Keep the existing server-rendered archive, topic pages, watch pages, daily YouTube inventory cache, and generated sitemaps. Improve the shared watch template, extend the existing consent-gated outbound event, and edit selected videos through the existing editorial overrides. Use Search Console, GA4, and YouTube Studio for measurement; build no reporting application.

**Tech stack:** React 19, Vite 8, plain CSS, Vercel functions, YouTube Data API, GA4, Node's built-in test runner.

**Spec:** The user's October 22 request and the recommendations in the preceding conversation: verify indexing, improve individual watch pages, strengthen internal links, make YouTube actions visible, optimize matching YouTube metadata, and measure outcomes. This document makes that scope executable.

## Global constraints

- Planning only is authorized in this turn. Implementation, account changes, publishing, and deployment are future work.
- Add no dependencies, database, dashboard, new routing scheme, or mass-generated articles.
- Preserve canonical URLs, crawlable pagination, the single immediately available player, chapters, escaping, privacy choices, and upstream error handling.
- Track subscription-link clicks as intent, never completed subscriptions. Website clicks, embedded playback, YouTube views, and subscriptions are different measures.
- Keep existing Skool links, access disclosures, events, and placements working.
- Use `rtk` for shell commands. Do not stage unrelated working-tree files or generated snapshot/thumbnail changes without inspecting them.
- Write from the recording or reviewed captions. Verify current setup claims against official documentation; label historical steps and limits. No word-count targets or invented results.
- Do not claim indexing or traffic improvements without authenticated report evidence.

## Verified starting point and scope

Public checks from October 22 and current source inspection establish:

- `/videos`, sampled watch/topic pages, robots.txt, and both sitemaps return 200; sampled HTML has self-canonicals and no blocking robots directives.
- The video sitemap contains 218 watch-page entries. The main sitemap includes numbered archive pages and eight topic pages.
- `renderWatch()` already emits a player in HTML, `VideoObject`, breadcrumbs, chapters, and related videos. `renderVideoSitemap()` and page metadata share `videoDescription()`.
- `src/reading.js` already sends `youtube_outbound_clicked` and `cta_click`, gated by `src/tracking.js`. Every YouTube link currently gets action `watch_on_youtube`, including archive subscription links; archive links also fall back to placement `written_guide`.
- `watchNotes` has 47 overrides. Only `qQVAnp4-EpI` (Runable) lacks a summary across the saved inventory and both editorial maps. Its fallback description is `Watch [title] by AI Automation Station.`
- Topic pages already link selected written guides, and watch pages already have automatic related-video links. Improve missing useful links; do not rebuild discovery.
- Earlier audit artifacts record Search Console submission work. They are historical evidence, not proof of today's submission/indexing status.
- The watch template puts the YouTube link after the description, optional test notes, chapters, and written-guide link. Move that existing action rather than adding a duplicate.

Unrelated untracked work at planning time: three `public/assets/thumbnails/hero-*.webp` files and `public/guides/self-host-n8n.html`. Preserve it. Inspect the working tree again at execution time.

### File map

| File | Responsibility and planned reach |
|---|---|
| `src/reading.js` | Classify existing YouTube click events and honor explicit placements across guides, archive, topics, and watch pages. |
| `src/reading.test.js` | Extend the current browser stubs to cover video/channel/subscription links and consent. |
| `src/archive.js` | Move the existing watch action beneath the player; add a secondary subscribe link. Shared description logic remains the source for cards, schema, and sitemap. |
| `src/archive.test.js` | Verify action order, destinations, one video action, and summary propagation. |
| `src/watch-notes.js` | Store reviewed summaries/search titles/build notes by video ID. |
| `public/guides/*.html` | Add contextual watch-page links only to relevant existing guides. |
| `src/topics.js` | Existing topic-to-guide lists; change only if a relevant published guide is missing. |
| `public/sitemap.xml` | Update an existing guide's lastmod only when that guide changes substantively. |
| `docs/growth/2026-10-22-video-search-baseline.md` | New: dated indexing/traffic baseline, selected URLs, and content briefs. |
| `docs/growth/2026-10-22-video-search-release.md` | New: verification evidence, release date, metadata drafts, and follow-up results. |

Read-only regression surfaces: `api/videos.js`, `src/youtube.js`, `src/video-notes.js`, `src/tracking.js`, `src/funnel.js`, `src/main.jsx`, `scripts/prerender.js`, `scripts/refresh-videos.js`, `vercel.json`, and the existing route/fallback/tracking tests. No new exports or production configuration are required.

## Task 1: Establish actual indexing and traffic status

**Files:** Create `docs/growth/2026-10-22-video-search-baseline.md`.

**Interfaces:** Consumes authenticated Search Console, GA4, and YouTube Studio reports when available. Produces dated evidence and a ranked list of up to ten existing watch URLs for Task 4.

- [ ] Open the Search Console property covering `https://www.ai-automation-station.com/`. Verify both sitemap statuses and last-read dates. Submit a sitemap only if missing or reporting an issue; do not routinely resubmit successful sitemaps.
- [ ] Inspect `/videos`, `/videos/ai-agents`, `/watch/qQVAnp4-EpI`, and two established watch URLs. Record indexed status, last crawl, Google-selected canonical, crawl/index permission, detected video, and video-indexing reason. Use the indexed report for status and Test Live URL for current rendering.
- [ ] Export Video indexing reasons. Investigate page indexing separately from video indexing. For any blocker, record its exact reason and affected URL before specifying a repair; do not infer a site-wide failure from one example.
- [ ] Export the last 28 complete days of Search Console Web performance and Video performance separately, including watch-page and topic-page rows and their query data. Record date range, available impressions/clicks/CTR/position, and the prior comparable period. Do not add overlapping report totals together.
- [ ] Check existing GA4 collection for `video_page_view`, `video_archive_view`, and `youtube_outbound_clicked`. Record the current action/placement values and whether the events actually arrive. Prefer GA4 session acquisition dimensions for Google organic segmentation: `campaignProperties().source === 'direct'` is not reliable evidence of a direct session when no UTM is present.
- [ ] Record YouTube Studio's available Google/external traffic and subscriber baseline for the same period. Mark unavailable source breakdowns explicitly; do not assume a website click produces a counted view.
- [ ] Select up to ten watch pages: first relevant queries with impressions and weak CTR, then useful indexed pages with little traffic, then valuable pages excluded for an actionable reason. Include Runable's verified missing-summary repair independently. If there are fewer than ten evidence-backed candidates, work on fewer.

For each selected URL, write this record with actual values or `Unavailable`:

```text
Watch URL / video ID:
Report window and export location:
Page indexing status / video indexing status:
Actual query and matching user task:
Impressions / clicks / CTR / position:
Current title / proposed title / evidence for the change:
Content gap / recording or caption source / review date:
Relevant existing guide or topic URL:
```

**Acceptance:** Baseline distinguishes measured values from unavailable data. If account access is missing, finish Tasks 2–3 and the verified Runable repair; defer search-based prioritization rather than inventing rankings or demanding access before independent work.

## Task 2: Distinguish YouTube actions in existing analytics

**Files:** Modify `src/reading.js`, `src/reading.test.js`. Keep `src/tracking.js` unchanged.

**Interfaces:** Keep the existing `youtube_outbound_clicked` and `cta_click` event names and existing parameter keys. Extend `action` values; use `data-placement` when supplied. No new event or exported helper is needed.

- [ ] Extend the current link stubs to include the existing video URL, `${channelUrl}?sub_confirmation=1`, and a normal channel URL. Use each stub's own listener map; maintain the existing allow/decline/allow assertions.
- [ ] Add assertions for this exact event contract:

| Destination | `action` | `video_id` |
|---|---|---|
| YouTube `/watch?v=<id>` | `watch_on_youtube` | URL's `v` value |
| Channel URL with `sub_confirmation=1` | `subscribe_on_youtube` | Empty string |
| Other existing YouTube channel link | `visit_youtube_channel` | Empty string |

- [ ] Keep the current trusted origin comparison. In its existing YouTube branch, implement the classification directly:

```js
const videoId = target.pathname === '/watch' ? target.searchParams.get('v') || '' : '';
const action = videoId ? 'watch_on_youtube'
  : target.searchParams.get('sub_confirmation') === '1' ? 'subscribe_on_youtube'
    : 'visit_youtube_channel';
const placement = link.dataset.placement || (viewEvent === 'video_page_view' ? 'watch_video'
  : viewEvent === 'video_archive_view' ? 'video_archive' : 'written_guide');
```

Pass `action`, `placement`, and `video_id: videoId` alongside the existing `properties`, `link_url`, and `button_text` to the two existing events.

- [ ] Assert that an explicit `watch_player` placement wins over defaults; archive/topic pages use `video_archive`; guide links retain `written_guide`. Include `/videos/ai-agents` in the existing path cases.
- [ ] Assert one `youtube_outbound_clicked` per click after consent and none before consent or after decline. Keep Skool behavior and existing view-event deduplication passing. Reject a lookalike domain such as `https://www.youtube.com.example.org/watch?v=Ip8KBwDixJs` from the YouTube event branch.
- [ ] Run `rtk proxy node --test src/reading.test.js src/tracking.test.js`. Verify the new assertions fail before the edit and pass afterward.

**Acceptance:** Reports can distinguish video clicks, channel visits, and subscription intent without counting a subscription as completed. Record the deployment date as the action-classification boundary; historical events labeled all actions as video watches.

## Task 3: Put the YouTube action immediately beneath the player

**Files:** Modify `src/archive.js`, `src/archive.test.js`; use existing `public/reading.css` styles.

**Interfaces:** Keep `renderWatch(video, { videos, start })` unchanged. Reuse imported `channelUrl` and existing `action` styling.

- [ ] Add a rendered-page assertion that the video action occurs after `</iframe>` and before `<p class="meta">By`, with exactly one `Watch on YouTube` link. Check chapter and no-chapter fixtures.
- [ ] Move the current video-action paragraph to directly after the iframe. Add a separate, secondary subscription link in that paragraph:

```html
<p><a class="action" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer" data-placement="watch_player">Watch on YouTube ↗</a> <a href="${channelUrl}?sub_confirmation=1" target="_blank" rel="noreferrer" data-placement="watch_subscribe">Subscribe on YouTube ↗</a></p>
```

The fragment belongs inside the existing template literal. Remove the old action paragraph below the chapters. Keep the player itself and its loading behavior unchanged.

- [ ] Add destination/placement assertions and preserve the tests for one iframe, self-canonical, start offsets, schema, membership CTA, and related links. Test the output, not CSS implementation details.
- [ ] Run `rtk proxy node --test src/archive.test.js src/reading.test.js`.
- [ ] Review a long-chapter page and a no-chapter page at 393px and 1440px. Verify the primary action is visually clear, the secondary link wraps cleanly, all links work by keyboard, and no horizontal overflow appears.

**Acceptance:** Viewers can leave for the matching YouTube video without scrolling through chapters. A crawlable, immediately visible single player remains the page's main content.

## Task 4: Repair verified content gaps and improve selected pages

**Files:** Modify `src/watch-notes.js`; selected existing `public/guides/*.html`, `src/topics.js`, and `public/sitemap.xml` only when needed. Extend `src/archive.test.js` for the Runable override propagation.

**Interfaces:** Reuse `watchNotes[id] = { searchTitle, summary, html }`; `notice` remains optional. Existing precedence is `watchNotes` → `videoNotes` → upload summary → generic fallback. No changes to parser behavior, map structure, or render signatures.

- [ ] Review the Runable recording/captions for `qQVAnp4-EpI`. Write a short factual summary describing the demonstrated website build, its result, and any meaningful limitation. A title alone is insufficient evidence for detailed claims.
- [ ] Add the reviewed summary under the exact quoted key `'qQVAnp4-EpI'` in the existing `watchNotes` object. Use `searchTitle` only if a clearer accurate title is warranted. Do not copy chapter lists into summary text.
- [ ] Add a concise assertion using the existing inventory record:

```js
const video = uploads.find(item => item.id === 'qQVAnp4-EpI');
assert.ok(video);
const summary = watchNotes[video.id]?.summary;
assert.ok(summary && summary !== `Watch ${video.title} by AI Automation Station.`);
const html = renderWatch(video);
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(schema.description, summary);
assert.match(renderArchive([video]), /class="summary"/);
const xml = renderVideoSitemap([video]);
assert.ok(!xml.includes(`Watch ${video.title} by AI Automation Station.`));
```

Retain the existing escaping and sitemap-consistency tests. If inventory has legitimately changed, use an explicit fixture with that same ID instead of making tests depend on a removed upload.

- [ ] For each Task 1 candidate, review current notes first. Change only a demonstrated gap: search-intent mismatch, generic summary, missing prerequisite, omitted command, unexplained failure, or missing relevant next step. Keep the original video title in the H1 and video metadata; use the existing `searchTitle` override for the search-facing HTML title.
- [ ] Put supplemental build notes after the player. Include source/review date, the procedure actually shown, result, and limits where useful. Reuse already reviewed notes; do not duplicate them into another content map or publish a full transcript merely to increase length.
- [ ] Add a contextual link from an existing relevant guide to the improved watch page when absent. Link the watch page back to the relevant published guide or topic page when useful. Avoid duplicate links adjacent to existing next-step blocks. Do not publish the unrelated untracked n8n guide as part of this task.
- [ ] Update a changed guide's existing sitemap lastmod only for substantive changes. Do not stamp all URLs with today's date or equate upload date with editorial modification date.
- [ ] Record a before/after title and summary, source, actual changes, and internal links for every edited video in the baseline document. Run `rtk proxy node --test src/archive.test.js src/guides.test.js src/topics.test.js` and review the changed pages.

**Acceptance:** Runable has a reviewed, non-generic summary across the watch page, schema, archive card, and video sitemap. Every other edited page has a documented reason and evidence; there is no bulk rewrite requirement.

## Task 5: Prepare matching YouTube improvements and reporting

**Files:** Create `docs/growth/2026-10-22-video-search-release.md`. No YouTube API script changes.

- [ ] For selected videos, draft a clear title and first description paragraph that accurately describe the demonstrated task. Preserve existing useful links, disclosures, and chapters. Compare with actual YouTube metadata before proposing a change.
- [ ] Check caption accuracy for product names and commands. Check labeled timestamps against the recording and existing `parseChapters()`/`validChapters()` expectations. Site summaries can improve without changing a YouTube title that already works.
- [ ] Save exact proposed metadata before account edits. This plan is not authorization to update YouTube videos. The existing `scripts/tag-youtube-descriptions.mjs` tags inbound website links; it is not a general metadata publisher and must not be repurposed for these changes.
- [ ] Configure or reuse a GA4 exploration of `youtube_outbound_clicked`, grouped by `action`, `placement`, page, and video ID. Check whether required event-scoped dimensions already exist before registering `action`, `placement`, and `video_id`. Use GA4 session source/medium or channel group for Google organic traffic; do not use the custom default `source: direct` parameter as acquisition truth.
- [ ] Count only `youtube_outbound_clicked` as outbound actions; do not add matching `cta_click` events to the total. For watch-page outbound rate, use consenting sessions visiting `/watch/` as the denominator and the subset with `action=watch_on_youtube` as the numerator. If that session-level report is unavailable, report raw events rather than an invalid conversion rate.

**Acceptance:** Metadata drafts are reviewable; reporting separates subscription intent from video clicks and preserves the consent-related coverage limitation. No new dashboard or analytics provider is introduced.

## Task 6: Verify the release and measure results

**Files:** Update the release document with evidence and follow-up entries.

- [ ] Inspect `rtk git diff --stat` and `rtk git status --short` before checks. Record pre-existing test failures separately; do not silently fix or stage unrelated work.
- [ ] Run these checks sequentially:

```bash
rtk npm run lint
rtk npm test
rtk npm run build
```

The build refreshes snapshots/thumbnails and may need network/API access. Inspect generated differences and preserve the pre-existing working tree; do not blindly restore or stage them. Record whether fresh upstream data or saved snapshots were used.

- [ ] Test via the existing Vite dev routes: `/videos`, `/videos/2`, `/videos/ai-agents`, two edited watch URLs, a `?t=98` chapter URL, a malformed watch ID, a known nonexistent topic, and `/video-sitemap.xml`. Expect normal pages 200, invalid paths 404, chapter playback cued with the base self-canonical, and only public embeddable entries in the video sitemap.
- [ ] Validate representative edited watch URLs with Google's Rich Results Test after they are publicly reachable. Check `VideoObject` metadata against the actual player and visible description. A valid rich-result test establishes eligibility, not indexing.
- [ ] Verify GA4 collection in a test/debug session after granting consent: video click yields `watch_on_youtube/watch_player`; subscribe yields `subscribe_on_youtube/watch_subscribe`. Verify no analytics events before consent or after decline. Exclude test sessions from result interpretation where possible.
- [ ] Before publishing, review the exact changed files, screenshots, metadata drafts, and check results. Production deployment and account writes require their own authorization; this planning request does not supply it. Follow existing repository release instructions at execution time.
- [ ] After an authorized deployment, repeat public status, canonical, player, sitemap, and click-collection checks. Record the release date/time; allow for current CDN caching. Use URL Inspection to request recrawl of a few materially changed URLs. Do not repeatedly submit unchanged URLs or use the Indexing API for ordinary prerecorded videos.
- [ ] At days 7, 14, and 28, record sitemap status, selected URL indexing, video-indexing reasons, and matching query impressions/clicks/CTR. Use comparable complete reporting windows; annotate upload activity, metadata changes, and low sample sizes.
- [ ] At day 28, compare Google organic visits and consented watch-page YouTube actions with the baseline. Check YouTube Studio independently for corresponding external/Google traffic changes. Expand content work only where results or an unresolved indexing reason justify it.

### Definition of done

- Existing search foundations remain intact; a live rendering/indexing baseline is recorded or unavailable access is explicitly documented.
- YouTube action classification and placement work without bypassing consent or disturbing Skool events.
- Watch and subscribe links appear beneath the player; no duplicate primary action is introduced.
- The verified missing summary is repaired from reviewed source material; selected additional pages have evidence-backed improvements and relevant internal links.
- Required tests, build, browser checks, and post-deploy checks have recorded results appropriate to the authorization reached.
- Baseline and release documents define follow-up dates and metrics. Shipping code can complete implementation; a measured-growth claim waits for follow-up evidence.

## Sequence and effort estimate

| Order | Work | Estimated hands-on time |
|---|---|---|
| 1 | Baseline and candidate selection | 45–90 minutes with account access |
| 2 | Event classification and tests | 30–60 minutes |
| 3 | Move actions and inspect layouts | 30–45 minutes |
| 4 | Runable summary repair | 20–45 minutes with recording/captions |
| 5 | Remaining selected pages and metadata drafts | 30–60 minutes per video, only where needed |
| 6 | Release checks and reporting setup | 45–90 minutes |
| Follow-up | Three report reviews | 15–30 minutes each over 28 days |

These are estimates, not measured delivery times. Tasks 2–3 and the verified summary repair can proceed while account-dependent analysis is unavailable.

## References and limits

- [Google video SEO guidance](https://developers.google.com/search/docs/appearance/video): indexed page and indexed video are separate; keep the video central to a watch page.
- [Search Console URL inspection](https://support.google.com/webmasters/answer/12482179?hl=en): inspect indexed status and test current rendering.
- [Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video): metadata, key moments, and validation.
- [Video sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps): describe actual videos hosted on the listed watch pages.
- Existing local evidence: `docs/audits/2026-10-21-videos-page-audit.md`, `docs/audits/2026-10-16-seo-audit.md`, and `docs/growth/2026-10-08-video-indexing.md`.

Skipped: new infrastructure, duplicate sitemap/schema work, bulk transcripts, new topic routes, and speculative ranking fixes. No authenticated Search Console, GA4, or YouTube Studio report was inspected while writing this plan. Google controls indexing and ranking; consented analytics covers only part of the audience, and outbound clicks do not prove views or subscriptions.
