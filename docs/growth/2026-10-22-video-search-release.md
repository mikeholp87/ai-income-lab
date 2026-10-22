# Video search implementation — October 22, 2026

Plan: `docs/superpowers/plans/2026-10-22-video-search-growth.md`.
Baseline: `docs/growth/2026-10-22-video-search-baseline.md`.

**Release status:** implemented and locally verified on `feat/video-search-growth`; not deployed. The production release timestamp and the start of measurement remain unset until an authorized deployment.

## Changes

- Preserve `youtube_outbound_clicked` and `cta_click`, but classify destination intent as `watch_on_youtube`, `subscribe_on_youtube`, or `visit_youtube_channel`. Only video watch links receive a video ID.
- Honor explicit link placements and correctly default archive/topic links to `video_archive`; guide and watch defaults remain `written_guide` and `watch_video`.
- Move the single watch link directly beneath the player and add a secondary channel subscription link, with placements `watch_player` and `watch_subscribe`. Both wrap as whole links on mobile and retain 44px targets. The single player is still present in initial HTML without a click.
- Give Runable a factual search title, summary and caption-reviewed build notes. The same summary reaches the watch page, `VideoObject`, archive card and video sitemap through existing rendering logic. Its notes link to relevant existing topic pages.

Unchanged contracts: existing event names, consent gating, Skool tracking, original recording title in H1 and video metadata, chapter cueing and canonicals, public/embeddable inventory eligibility, cache/failure handling, and JSON/XML escaping. Historical YouTube events labeled channel and subscription links as video watches; compare action-specific reporting only after the production release boundary.

## Verification

The new assertions were run against the old implementation and failed for the expected reasons: all YouTube links were classified as watches, explicit placements were ignored, archive defaults were wrong, actions appeared after the chapters, and Runable used its generic fallback. They passed after implementation.

| Check | Result |
|---|---|
| `rtk proxy node src/reading.test.js` | Passed all four page-path cases: guide, watch, archive page 2, and topic page. Includes video/channel/subscription intent, explicit/default placements, lookalike domain exclusion, consent before/after decline, re-consent and one outbound event per permitted click. |
| `rtk proxy node src/archive.test.js` | Passed all 30 tests, including player/action order with and without chapters, one primary action, summary propagation, escaping, chapter URLs, related links, route statuses and sitemap eligibility. |
| `rtk npm run lint` | Passed. |
| `rtk npm test` | Passed all 16 test files. |
| `rtk npm run build` | Passed client build and SSR prerendering. Network refreshes were unavailable in the build sandbox, so existing valid snapshots/thumbnail fallbacks were used. All three generated snapshot files were compared with pre-build copies and remained unchanged. |
| Local HTTP | 200 for `/videos`, `/videos/2`, `/videos/ai-agents`, Runable, GrokBot, and GrokBot `?t=98`; 404 for malformed watch ID and nonexistent topic. Chapter request retained the base canonical and cued `start=98`. |
| Local video sitemap | Parsed as XML; 218 entries. Sampled watch pages have one player, self-canonicals and valid JSON-LD. |
| Mobile browser | Runable inspected with the 393px viewport override; live layout reported 394px inner width and 378px document scroll width. Both action targets measured 44px tall and wrapped onto separate complete lines. No horizontal overflow. |
| Desktop browser | GrokBot inspected at 1440×900; document scroll width 1425px, actions shared the same row and measured 44px tall. |
| Keyboard and no-chapter page | Tab from the primary action reached `watch_subscribe`. `/watch/0jzTOUv_B04` had no chapter list, one player, one video action, one subscription action and no horizontal overflow. Temporary viewport overrides were reset. |

Browser screenshots were inspected during implementation. Actual GA4 collection and report configuration could not be checked because Google required account re-authentication. Production Rich Results Test, production URL inspection, recrawl requests and post-deployment checks remain pending deployment and account access.

Focused code review completed with no actionable findings: correctness plus an independent in-process adversarial review. Receipt: `/tmp/compound-engineering-1000/ce-code-review/20261022-100600-5ebc51ab/review.json`. The proposed external review export was rejected by automatic approval review because transmission of the private repository diff to that recipient was not specifically authorized; no code was sent, and local independent review covered the change instead. Concurrent baseline/release documentation was checked by the implementing agent against the tool results, outside that code review's scope.

## Reviewable YouTube metadata draft

**Target:** `https://www.youtube.com/watch?v=qQVAnp4-EpI`.

**Proposed title:** Runable Tutorial: Build an AI Growth Audit Website

**Proposed first description paragraph:**

> Build an AI Growth Audit website prototype in Runable, from the project brief and market research to the first website preview and homepage refinements. This recording stops before connecting Stripe payments and consultation email delivery.

Basis: the recording's English captions, reviewed October 22. Keep existing chapters, links and disclosures. The original chapter list already includes ten labeled sections covering the workflow; no replacement timestamps are needed for this fix. No captions or YouTube metadata were edited. A title change is a draft for review, not a claim that it will outperform the current title.

## GA4 setup when account access is restored

Reuse the current property and events; create no new tracker or dashboard application.

1. Check whether event-scoped custom dimensions for `action`, `placement`, and `video_id` already exist; register only missing ones if authorized. Historical custom-dimension reporting may not be available before registration.
2. Use `youtube_outbound_clicked` as the event count and break down by action, placement, page and video ID. Do not add matching `cta_click` events to the count.
3. Filter with GA4's session source/medium (`google / organic`) or session channel grouping, not the custom UTM-default `source` event parameter.
4. For a watch-page outbound session rate, count consenting sessions that visited `/watch/` and the subset with `action=watch_on_youtube`. If the session intersection cannot be built correctly, report event counts rather than dividing unrelated totals.
5. Keep subscription-link clicks labeled as intent. Use YouTube Analytics separately to monitor views and subscribers; neither a clicked link nor loaded embed proves a counted view or subscription.
6. Verify the action/placement payloads in a debug/test session after consent. Verify absence before consent and after decline. Automated tests prove local event behavior; they do not prove live GA4 delivery.

## After deployment

Record the actual production release timestamp as **T0**, then:

- Recheck representative public URLs, one player, canonical URLs, Runable metadata, sitemap consistency and analytics payloads. Allow for existing CDN caching.
- Run Google's Rich Results Test for representative updated watch pages. Distinguish valid markup from actual page/video indexing.
- Inspect a few materially changed URLs in Search Console and request recrawl where appropriate. No recurring requests for unchanged URLs and no Indexing API use for prerecorded videos.
- Record sitemap status and separate page/video indexing results at T0 + 7, 14 and 28 days.
- At T0 + 28 days, compare complete matched reporting windows for query impressions/clicks/CTR, Google organic website visits, consented video outbound sessions, and independently reported Google/external YouTube views. Annotate uploads, metadata changes, account access gaps and small samples. These reviews are a checklist, not scheduled jobs.

## Pending work and limits

Search Console/GA4 baseline exports, query-based selection of additional pages, custom-dimension setup and live collection verification need Google account re-authentication. No rankings, website click rate, indexing success or growth is asserted. No speculative bulk rewrites were made. Publishing YouTube metadata, pushing/deploying the site and post-release follow-up remain outside the local implementation completed here.
