# Video search baseline — October 22, 2026

Plan: `docs/superpowers/plans/2026-10-22-video-search-growth.md`.

Implementation branch: `feat/video-search-growth`. This is a pre-deployment baseline, not a report of improvement.

## Account availability

| Source | Observed access | What can be established |
|---|---|---|
| Google Search Console | The property navigation redirected to `/search-console/about`, offering sign-in. | Current indexed status, Google-selected canonical, sitemap last-read dates, video-indexing reasons, queries and search CTR are unavailable. |
| GA4 | Google displayed “Verify it’s you” and required sign-in again. | Event collection, custom dimensions, Google organic website sessions and website outbound rate are unavailable. |
| YouTube Analytics through the connected vidIQ account | The connected channel matched `@ai-automation-station`, ID `UC8_eYAfJcUgI5BV3hg9U2cw`. | Channel-wide traffic and subscriber figures below are measured report values. |

No account settings, credentials, sitemap submissions, custom dimensions, or YouTube metadata were changed. The Search Console and GA4 blockers do not prevent the code fixes or the independently verified summary repair.

## Measured YouTube baseline

Requested window: **September 24–October 21, 2026**, inclusive, the last 28 complete calendar days at collection. YouTube report time zone, latest-day completeness, and later adjustments were not independently verified. Reports cover the channel's content, including Shorts; they are not limited to the website's long-form watch pages.

| Metric | Value |
|---|---:|
| Channel views in window | 48,919 |
| Subscribers gained | 222 |
| Subscribers lost | 46 |
| Net subscribers, calculated as gained minus lost | 176 |
| Views from external URLs (`EXT_URL`) | 5,479 |
| Views attributed to `Google Search` in external-source details | 4,385 |
| Views attributed to the separate `Google` source label | 22 |
| Views from YouTube's own search (`YT_SEARCH`) | 22,940 |

Do not combine Google Search with YouTube search or label any of these figures as website clicks. Google Search views can come directly to YouTube without visiting this website. No website-to-YouTube attribution can be established from this report alone.

The external-source details request returned the top 25 rows, sorted by views. `ai-automation-station.com` was not among those returned rows; that is **not evidence of zero website referrals**. Other displayed sources included YouTube (90), facebook.com (69), Creator Studio (52), dutchstartup.ai (52), skool.com (46), search.brave.com (44), and duckduckgo.com (33).

Collection-time channel counts: **5,210 subscribers, 522,548 lifetime views, 345 public videos**. These are current counts from the channel lookup, not 28-day metrics.

Provenance: `vidiq_user_channels`; `vidiq_channel_analytics` with channel ID above and dates above, once with `traffic_sources` and `views,estimatedMinutesWatched`, once with aggregate `views,subscribersGained,subscribersLost`, and once with dimension `insightTrafficSourceDetail`, filter `insightTrafficSourceType==EXT_URL`, metric `views`, sort `-views`, maxResults `25`.

Prior-period figures: not collected. Website performance exports and a meaningful search-query-based before/after comparison require authenticated Search Console and GA4 access.

## Selected content repair

Only one independently established content gap was selected. Additional pages will be chosen from actual Search Console evidence rather than speculative ranking estimates.

| Field | Evidence or decision |
|---|---|
| URL / video ID | `https://www.ai-automation-station.com/watch/qQVAnp4-EpI` / `qQVAnp4-EpI` |
| Original title | Build An AI-Powered Website Using Runable! |
| Old description | Watch Build An AI-Powered Website Using Runable! by AI Automation Station. |
| Gap | Empty saved summary and no editorial override caused a generic fallback in the watch page and video sitemap, and no archive summary. |
| Search title | Runable tutorial: build an AI Growth Audit website |
| New summary | Research, build and refine an AI Growth Audit website in Runable. Covers the project brief, market research and homepage revisions; Stripe and email delivery remain unfinished. |
| Source | English captions retrieved through `vidiq_video_transcript` for this exact video on October 22, 2026. |
| Verified scope | Master brief, market research, generated website preview and launch checklist, and homepage refinement. Captions explicitly defer Stripe and consultation email delivery. |
| Supplemental notes | Recorded sequence, limits of the prototype, and the caption-review date. No claim of a deployed business or functioning paid audit flow. |
| Internal links added | `/videos/ai-seo` and `/videos/codex-opencode` from the build notes. Existing archive, homepage and related-video discovery remain in use. |
| Current indexing / canonical chosen by Google | Unavailable without Search Console sign-in. |
| Actual search query / impressions / clicks / CTR / position | Unavailable. Title is a factual editorial clarification, not a validated high-volume keyword recommendation. |

Existing guide/topic discovery was inspected. The previously added n8n, Hermes and DataForSEO guides and their topic links already exist in the pre-work commit; this change does not duplicate or republish them. No guide lastmod dates were changed because this work did not materially edit a guide.

## Next authenticated baseline checks

1. Verify both sitemap statuses and last-read dates in the property covering the canonical site; submit only if missing or failing.
2. Inspect `/videos`, `/videos/ai-agents`, `/watch/qQVAnp4-EpI`, `/watch/ys5tJuTFCEo`, and `/watch/geKngm3sg3w`. Record indexed status, last crawl, Google-selected canonical, current rendering, detected video, and video-indexing reason separately.
3. Export Search Console Web and Video performance separately for September 24–October 21 and August 27–September 23. Capture query and page rows for `/watch/` and `/videos`; do not sum overlapping reports.
4. Verify actual GA4 collection and existing custom dimensions, then use session acquisition dimensions for Google organic segmentation. The site's custom `source: direct` fallback is not a valid substitute for session acquisition.
5. Select additional watch-page work from query relevance, impressions/CTR, content gaps and actionable indexing reasons. Use fewer than ten pages if the data supports fewer.

Sources for interpretation: [Google video indexing guidance](https://developers.google.com/search/docs/appearance/video) and [URL Inspection](https://support.google.com/webmasters/answer/12482179?hl=en). Public crawlability checks and successful tests do not prove Google's indexed state.
