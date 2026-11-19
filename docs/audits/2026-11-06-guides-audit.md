# Guide pages SEO and content audit — 2026-11-06

## Scope and limitations

Reviewed all 41 local `public/guides/*.html` pages and the guide hub, sitemap, robots rules, structured data, and internal links. The local working tree includes uncommitted changes, so these findings do not necessarily describe the deployed site. A limited live search check found existing guides, but direct live requests failed. Current index coverage, rankings, Core Web Vitals, mobile rendering, and the deployment status of new guides could not be established. The Search Console helper lacked its Google OAuth dependencies; the connected treg MCP token was invalid. An older October 27 Search Console report is historical, not current evidence. No overall numerical SEO score is offered without these measurements.

## What works

- All 41 guides appear in the local hub and sitemap. Each has a title, description, self-referencing canonical, one H1, viewport, Open Graph image, byline and publication/update dates.
- Each guide has syntactically parseable Article, BreadcrumbList and FAQPage JSON-LD. The local scan found no missing image alt attributes or dimensions, broken same-page anchors, or obvious missing static internal targets. This is not a Google Rich Results validation.
- Recent guides offer practical exercises and expected outcomes. Most have clear next steps and related resources.

## Prioritized findings

### High: reconcile conflicting Codex access information

`public/guides/codex-on-linux.html` says Codex is included on Free and Go, then later describes those plans as receiving limited trial access. The latter contradicts the current [OpenAI plan guidance](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan): Codex is included with plan-specific limits; Codex Cloud is not included on Free or Go. Update the troubleshooting text and distinguish cloud access from general Codex access. Check other Codex guides for the same stale wording. Verify remaining pricing and availability claims against their primary sources before updating dates.

### High: add verifiable firsthand evidence to newer guides

The newer AI agent, model selection and AI app building guides provide process advice but have limited concrete evidence of a real implementation. The app-building guide has no external source links; the AI agent workflow and model-selection guides each have one. Add a real, attributable example where available: goal, tools and versions, steps, screenshots or outputs, validation, failures and limitations. Link directly to primary documentation for time-sensitive claims. Do not manufacture tests or outcomes. Google emphasizes [firsthand expertise and useful original content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) for readers and [AI search features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

### Medium: make the Linux guide more useful for installation intent

`public/guides/chatgpt-linux.html` links to official requirements but does not list supported distributions or explain installation. Add a dated compatibility summary and tested, version-specific installation steps where appropriate; link the official [release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) and installation instructions. Include known preview limitations and a browser fallback. Verify the current requirements immediately before publication.

### Medium: strengthen contextual links to lightly connected pages

Counting distinct inbound links from other guide files only, `chatgpt-linux.html`, `consent-tracking.html` and `youtube-channel-growth-workflow.html` each have one; `ai-content-creation-workflows.html` and `lovable-vs-base44-vs-replit.html` each have two. All are linked from the hub, so they are not orphaned. Add links where useful in relevant article text, for example Codex on Linux → ChatGPT on Linux and YouTube feed → YouTube growth workflow. Use descriptive anchor text and avoid irrelevant reciprocal links.

### Medium: substantiate search-demand claims and maintain volatile content

`public/guides/claude-models-compared.html` claims a particular query is what people search for most; remove the superlative or support it with a dated, scoped search-data source. Review model names, prices, plan limits and setup steps on a regular cadence, prioritizing pages receiving impressions after Search Console access is restored. Change visible and structured modification dates only after substantive review or updates; ensure sitemap `lastmod` stays accurate. Google says it uses `lastmod` when consistently and verifiably accurate ([sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).

### Low: keep structured-data expectations realistic

Article and breadcrumb markup are present. Validate representative published URLs using Google's Rich Results Test after deployment and check the rendered content matches the markup. FAQPage markup is not a reliable opportunity for this site's Google FAQ rich results: Google limits those results to eligible authoritative government and health sites ([Google announcement](https://developers.google.com/search/blog/2023/08/howto-faq-changes)). Keep useful visible FAQs for readers; do not expect markup alone to improve rankings.

### Performance hypothesis: test hero image loading

All 41 guide hero images have responsive sources and dimensions, but use `loading="lazy"`. If a hero image is actually the largest element in the initial viewport, test eager loading on that template and compare measured LCP before making a change. There is no evidence yet that these images are causing a performance problem.

## Follow-up measurement

### Search Console follow-up — November 6

The existing read-only CLI connection worked. For October 8–November 4, Search Console reported 416 impressions and 1 click for `codex-on-linux.html`, 266 impressions and 0 clicks for `9router-setup.html`, and 185 impressions and 0 clicks for `codex-usage-limits.html`. Average positions were 19.2, 6.5 and 29.9 respectively; these aggregates mix queries, devices and countries and do not identify a cause. The 9Router query breakdown returned only 27 impressions across visible query rows, so the remaining impressions cannot be attributed to specific queries from that report. Prioritize a query-and-intent review of 9Router without inferring that its title alone caused the low CTR. The period ends before the six guides published on November 5.

URL Inspection reported Codex on Linux and 9Router submitted and indexed, with matching Google and declared canonicals. It reported ChatGPT on Linux and AI agent workflow as unknown to Google; their public URLs returned HTTP 200 when checked. These are four snapshots, not a sitewide index census. The submitted sitemap was last downloaded November 4 with zero reported errors or warnings. Its API indexed count is not a substitute for URL Inspection. The local Codex and ChatGPT Linux edits were not present on the public pages when checked, so inspect again after the changes are deployed and Google has recrawled them.

1. Restore the read-only Search Console connection and pull recent page/query clicks, impressions, CTR and positions for `/guides/`; inspect representative URLs and sitemap status. Compare with the October 27 historical baseline rather than treating it as current.
2. Confirm the intended local guide changes are deployed, then check live status, canonical, robots and rendered HTML for the hub and representative old and new pages.
3. Run mobile and desktop Lighthouse on representative guide templates and check CrUX/Search Console field data where available. Test keyboard navigation, focus, contrast, and mobile layout; static image attributes alone cannot establish accessibility or performance.
4. Prioritize updates using actual query intent, impressions and conversion goals. Record baseline dates and remeasure after indexing; sitemap inclusion and search snippets do not prove complete index coverage or guarantee rankings.
