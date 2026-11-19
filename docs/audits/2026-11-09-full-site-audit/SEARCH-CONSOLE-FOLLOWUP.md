# Search Console follow-up

Read November 9, 2026, after the owner explicitly approved access to the site's signed-in Search Console data. Property: `https://www.ai-automation-station.com/`. This is a local working report containing private account aggregates; it has not been published or committed. No indexing requests, validation requests, account changes or exports to third parties were made.

## Search baseline

Search type: **Web**. Periods were verified in the date-comparison dialog. Dates below are the Search Console reporting dates, inclusive. The report said its last update was 3.5 hours earlier.

| Metric | October 11–November 7 | September 13–October 10 |
|---|---:|---:|
| Clicks | 9 | 0 |
| Impressions, as displayed | 4.07K | 50 |
| CTR, as displayed | 0.2% | 0% |
| Average position | 23.1 | 16.3 |

The previous period has very little exposure. The lower aggregate average position in the newer period does not establish a matched-query ranking decline: the set of queries and pages changed. These numbers are search exposure and visits, not newsletter subscriptions, memberships or revenue.

[Open the same comparison](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.ai-automation-station.com%2F&num_of_days=28&compare_date=PREV).

### Page sample

The page table showed 135 rows in total. The following are selected rows from the first ten; this is not a full export. Previous-period clicks were zero for each of these pages.

| Page | Clicks | Impressions | Average position |
|---|---:|---:|---:|
| `/guides/9router-setup.html` | 0 | 880 | 7.4 |
| `/guides/opencode-go.html` | 1 | 666 | 9.0 |
| `/guides/codex-on-linux.html` | 2 | 559 | 18.5 |
| `/guides/codex-usage-limits.html` | 0 | 237 | 30.8 |
| `/guides/openseo-review.html` | 1 | 131 | 35.6 |
| `/watch/wzC2r426KWs` | 1 | 34 | 8.6 |
| `/guides/first-api-request.html` | 1 | 23 | 5.9 |

The 9Router guide is the clearest candidate for evaluating search-result relevance because it has exposure at a relatively strong aggregate position and no clicks. Its filtered query table showed 51 rows; selected examples were `9router` (15 impressions, position 15), `9router port` (8, 7.5), `9router update` (8, 8.0), `9router update command` (8, 8.4), and `9router setup` (6, 7.3), all with zero clicks. Do not infer that these visible queries explain all 880 page impressions: Search Console query coverage is incomplete, including privacy filtering.

The current title already mentions setup, port 20128, updates and providers. Keep the recent title/summary changes stable long enough to establish a post-change interval. Compare query/device/country cohorts and the displayed result before making another rewrite. The table does not prove that copy caused the low CTR.

## Indexing baseline

[Page indexing](https://search.google.com/search-console/index?resource_id=https%3A%2F%2Fwww.ai-automation-station.com%2F), **all known pages**, updated **November 6**:

- 232 indexed.
- 81 not indexed: 47 discovered/currently not indexed, 18 crawled/currently not indexed, and 16 alternate pages with proper canonicals.
- A separate redirect row showed zero affected pages.

The existing URL Inspection result for `/guides/codex-seo-workflow.html` said “URL is not on Google” and “Discovered - currently not indexed,” with no last crawl. It identified `sitemap.xml`; no referring page was detected. That field does not prove the live site has no incoming links. The discovered-pages sample also included the Claude models, OpenClaw, Kilo Code, Lovable comparison and OpenRouter guides, plus archive pages `/videos/10` and `/videos/12` through `/videos/15`.

These older all-known-page totals are not the same population as the fresh 323-URL live sitemap crawl. Do not calculate an indexing percentage by dividing 232 by 323. Alternate canonical URLs can be expected exclusions; 81 is not a count of 81 broken pages.

[Video indexing](https://search.google.com/search-console/video-index?resource_id=https%3A%2F%2Fwww.ai-automation-station.com%2F), updated **November 5**, showed **163 video-indexed pages** and **4 without video indexing**. All four examples were written guides: OpenCode Go, 9Router setup, ChatGPT Pro 20x and AI automation. The reason was “Video isn't on a watch page.” Their last crawls ranged from October 27 through November 4.

That finding does not justify turning the written guides into watch pages. Keep dedicated watch URLs as the primary video destination. The report predates the November 8 player changes, so it cannot measure their effect or demonstrate that all 227 current watch pages are video-indexed.

## Field performance

[Core Web Vitals](https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.ai-automation-station.com%2F), updated **November 8**, reports insufficient usage data in the last 90 days for **both mobile and desktop**. Neither field report is available. Retain the earlier lab measurements; do not claim a field CWV pass or invent INP.

## Revised priorities

1. Finish and deploy the tested local fixes as a separately authorized release; keep a dated release baseline.
2. Review the commercially relevant discovered/crawled guide groups after Google has had time to process the recent content and link changes. Use representative URL Inspection evidence to distinguish unvisited pages from crawled pages. Avoid mass indexing requests or noindex/canonical changes based only on these report buckets.
3. Evaluate 9Router first, OpenCode Go second, and Codex on Linux third with matched query/device/country evidence. For Codex on Linux, strengthening useful task coverage and supporting references is more defensible than assuming a title change will move position 18.5.
4. Recheck the separate page-indexing and video-indexing reports after the next update. The four guide-video exclusions do not establish a watch-page defect.
5. Complete paid-outcome reconciliation separately. Search Console cannot establish verified Skool purchases or attribution.

Scope limits: no complete page/query/device/country export, no live URL tests or indexing submissions, no paid membership dataset, and no inference about the causal impact of the still-undeployed fixes. No Google Account email address, credentials or private query strings were copied into this report.
