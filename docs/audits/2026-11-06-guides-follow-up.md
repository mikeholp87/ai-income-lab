# Guide audit follow-up — November 6, 2026

## Indexing

Search Console URL Inspection still reports `chatgpt-linux.html` and `ai-agent-workflow.html` as unknown to Google. Both pages returned HTTP 200 on the production site. The guide release was deployed earlier the same day, so the result does not establish an indexing defect. Reinspect after Google has had time to crawl; sitemap inclusion and a successful response do not guarantee indexing.

## 9Router search intent

Search Console reported 266 impressions, no clicks and an average position of 6.46 for `9router-setup.html` over October 9–November 5, 2026. The earlier October 8–November 4 query breakdown disclosed 27 of 266 impressions; visible queries include 9Router setup, documentation, updates, proxy and port. Individual query counts are small, and withheld queries prevent attribution of the aggregate to a specific intent. Average position aggregates different searches, locations, devices and search appearances. Do not infer that the title caused the low CTR.

The published page already covers the visible setup, documentation, update, port and proxy intents. Its install command, default port and custom-port flag were checked against the [9Router CLI README](https://github.com/decolua/9router/blob/master/cli/README.md) on November 6. No title change was justified by this data. Compare query and page results after a longer interval and investigate the actual search results before changing the page.

## Page experience

One live Lighthouse run per page on November 6, with Chrome headless; these are lab observations, not field percentiles or repeatable speed comparisons:

| Page and mode | Performance | Accessibility | Best practices | SEO | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ChatGPT Linux, mobile | 100 | 100 | 100 | 100 | 1.7 s | 0 | 0 ms |
| 9Router, desktop | 98 | 100 | 96 | 100 | 1.0 s | 0.001 | 0 ms |

In both runs the LCP element was the lazy-loaded guide image. Lighthouse flagged LCP request discovery; the observed load delay was approximately 174 ms on the mobile sample and 406 ms on the desktop sample. This is an optimization hypothesis, not evidence that changing image loading will improve real-user performance. Desktop best-practices flagged a Chrome DevTools cookie issue for the embedded YouTube player. Investigate the specific browser warning before changing consent or embeds.

At 320, 390 and 1440 CSS pixels, both pages returned 200 and their document widths matched the viewport widths. In each check the first Tab focused a visible “Skip to content” link, and Enter navigated to `#content`. At 390px, Enter opened and closed the first FAQ and opened the mobile navigation on both pages. These checks and automated accessibility scores do not replace a full keyboard, screen-reader or contrast review. A keyless PageSpeed Insights request returned HTTP 429, so current CrUX field data and INP were not obtained.

## Firsthand examples

The app-building guide links to the site’s dated feed case study and public source. That case study is a real project example, not evidence that a coding agent built the site. The AI agent guide links to the site’s consent guard as a deterministic boundary, and the model-selection guide links to an executable local mock; neither is claimed to be a real agent run or model benchmark. Existing linked channel recordings may offer further firsthand evidence, but no transcript or test result reviewed here substantiates a new task-specific agent run or model comparison. Collect a dated prompt, model and version, output, checks, failures and permitted screenshots before adding such claims.

## Historical secret-scan triage

The previous full-history Gitleaks scan reported 15 findings. Source-context review grouped 14 Airtable-rule matches as base/table identifiers (including repeated commits and one test assertion), not Airtable personal access tokens. The remaining generic-key match is the IndexNow site ownership verification key referenced by `scripts/prerender.js` and a hosted key file. [IndexNow's protocol](https://www.indexnow.org/documentation) requires that verification file to be reachable by search engines; the value is not an Airtable or other API credential. It can be used for URL submissions under the protocol, so treat unauthorized submissions as a separate possible abuse risk rather than assuming it has no operational effect. No provider access tokens were identified among these 15 matches; this classification is limited to the flagged lines and does not establish that the rest of the history is free of secrets. No credential was tested, rotated or revoked.
