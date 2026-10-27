# Guide and article SEO improvements

Date: October 26, 2026. Scope: every HTML article in `public/guides/` (23 pages), the guides hub, shared reading styles, and the page sitemap. Status: implemented and verified locally; not deployed.

## Findings and changes

These counts are measured from the repository before and after the changes, not estimates of rankings or organic traffic.

| Check | Before | After |
| --- | ---: | ---: |
| Articles with breadcrumb structured data | 13/23 | 23/23 |
| Articles with explicit Twitter title, description and image | 14/23 | 23/23 |
| Articles with a contents list | 11/23 | 23/23 |
| Articles with a named, typed publisher in their own schema | 3/23 | 23/23 |
| Articles linked from at least one other article | 18/23 | 23/23 |
| Article sitemap dates agreeing with existing `dateModified` | 12/23 | 23/23 |
| Unique titles and descriptions, self-referencing canonicals, and existing social image files | 23/23 | 23/23 |

Priority fixes completed:

- **P1, shared metadata and structured data:** all articles now identify their author profile, publisher, website, language, publication date and modification date. Breadcrumb schema matches the visible Home → Guides → article trail. Existing FAQ schema was preserved.
- **P1, internal discovery:** added relevant links to Hermes Desktop, 9Router, HeyGen, Vapi and OpenSEO, which previously had no incoming links from another article. Added connections for the DataForSEO, n8n, usage-limit and React feed guides. All 23 articles remain linked from the hub and homepage.
- **P1, search intent:** tightened nine titles, clarified seven H1s, and rewrote four descriptions. DataForSEO now explicitly targets its MCP setup; the n8n title describes both installation options; the Make guide names Make.com and Google Sheets; Hermes Desktop has a shorter title. Fixed the n8n introduction's two-node description to match its three-node exercise.
- **P2, navigation and consistency:** added contents lists to the 12 articles missing them, using stable section IDs. Updated the hub's title, description, collection schema and relevant link labels. Its visible update date and sitemap now agree. Added breadcrumb styling using the existing reading stylesheet.
- **P2, dates:** reconciled 11 stale article sitemap dates with the dates already in their Article schema. Displayed missing or inconsistent article update dates without changing existing publication or technical source-check dates. The hub reflects its October 26 editorial refresh.

No URL changes, redirects, new dependencies or runtime SEO framework were needed. HTML metadata and navigation remain available without JavaScript.

## Keyword evidence

The changes use existing page content and the October 22 DataForSEO research in [the earlier keyword report](2026-10-22-guides-seo-data.md). Target phrases inferred from content are estimates of search intent, not newly measured search demand. No fresh search-volume or ranking numbers are claimed. The connected treg tool inventory returned an expired/invalid sign-in response, so fresh SEO data and Search Console position checks were unavailable.

## Verification

- `npm test`: passed, including new portfolio-wide regression checks for metadata, schema/body agreement, sitemap dates, image files, internal article links, section targets and collection entries.
- `npm run lint`: passed.
- `npx vite build` followed by `node scripts/prerender.js`: passed. Used the saved video snapshots; skipped the unrelated network video refresh in `npm run build`.
- Chromium against the production preview: checked the n8n guide and hub at 390px, the Codex tutorial and hub at 320px, and the Codex tutorial at 1440px. No horizontal overflow on those samples. The new n8n contents link navigated to `#workflow` and placed the heading about 24px from the top. Confirmed the built reading-script URL resolves to `/assets/reading.js`.
- Local HTTP verification checks every built article plus the hub for HTTP 200, complete metadata and structured data, and the production script entry.

## Guidance and limits

Implementation follows Google's guidance on [concise descriptive titles](https://developers.google.com/search/docs/appearance/title-link), [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), and [canonical sitemap URLs and meaningful modification dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Deployment, Search Console submission, Google Rich Results Test validation, indexing and ranking changes were not performed or measured. Existing third-party setup instructions and current product pricing were not revalidated as part of this SEO pass. Ranking improvements require post-deployment observation.
