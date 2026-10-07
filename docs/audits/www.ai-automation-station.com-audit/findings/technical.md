# Technical site audit — October 7, 2026

Site: https://www.ai-automation-station.com
Scope: read-only source inspection and public HTTP checks. No production pixel requests, writes, account actions, dependency installs, or app changes.

## Prioritized findings

### High — Unknown email pixel tokens create Airtable records

`src/open-pixel.js:42-46` routes unknown token prefixes to the Skool fallback. At `src/open-pixel.js:173-189`, any syntactically valid token creates an Opens record before `src/open-pixel.js:191-196` looks for a matching Sends record. This permits fabricated opens, record growth, and quota consumption if Airtable credentials are configured. Production credentials and external rate controls were not inspected.

A fully mocked local check produced POST (token audit-unknown-send), then GET (records:[]), logged=airtable, sendExists=false. No real API calls occurred. Evidence: `/tmp/site-audit-pixel-proof.json`. Runnable reproduction: `rtk proxy node /tmp/site-audit-pixel-check.mjs` (asserts current unsafe behavior; it is an audit reproduction, not a future regression test).

Suggestion: look up and validate the send first; return the GIF without creating records for unknown tokens. Consider signed tokens and/or per-token rate limiting to reduce replay and quota abuse.

### Medium — Homepage latest videos depend entirely on client-side hydration

Live homepage response contains no youtube.com/watch links, while /api/youtube provides seven videos. `src/main.jsx:144-151` initializes videos to null and fetches them in useEffect. `scripts/prerender.js:13` prerenders only the loading placeholders for this section. Other substantive homepage content is successfully prerendered, and /videos has crawlable versions of the videos, so the site is not broadly invisible to crawlers.

Suggestion: provide a cached video snapshot during prerender, then refresh after hydration. This also improves the no-JavaScript experience. Google confirms that prerendering helps users and crawlers and that not all bots execute JavaScript: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

### Opportunity — Publish useful landing pages for selected tutorials

The live archive lists 213 long-form videos over 15 pages. `src/archive.js:33-36` links every card directly to YouTube; no tutorial watch pages live on this domain. The homepage has Person and WebSite JSON-LD; the archive has no structured data.

Suggestion: begin with a handful of high-value tutorials, each with the video, original written steps, transcript/resources, and accurate VideoObject data. This is a content-growth opportunity, not a correctness requirement. Adding video schema to the directory alone does not make it a dedicated watch page. Google guidance: https://developers.google.com/search/docs/appearance/video

### Low — No Content Security Policy

Live homepage response has HSTS, X-Content-Type-Options=nosniff, X-Frame-Options=DENY, Referrer-Policy=strict-origin-when-cross-origin, COOP=same-origin, and restrictive camera/microphone/geolocation policy. No CSP is present in live headers or `vercel.json:2`.

Suggestion: consider a report-only CSP first, accounting for inline scripts, Cal.com, YouTube, Google Analytics, Meta, and Vercel. This is defense in depth; no XSS was found or demonstrated. External archive text is escaped in `src/archive.js:4-5`.

### Low — Generic unknown URLs return the platform error page

GET/HEAD for /audit-nonexistent-20261007 returns a correct 404 but an unbranded 79-byte Vercel response. Suggest a small branded 404 page with Home and Videos links. Invalid archive pages already have a useful archive link.

## Verified passes

- Homepage, /videos, /api/youtube, /privacy.html, /terms.html, /robots.txt, /sitemap.xml, and /llms.txt return 200.
- Apex https://ai-automation-station.com/ redirects 308 to the www canonical host.
- /videos/1 redirects 308 to /videos. /videos/16 and /videos/abc return 404.
- /videos/2 and /videos/15 return 200 with unique page titles and self-canonicals. Full archive crawl is recorded separately in `/tmp/site-audit-crawl.json`.
- Every homepage fragment link points to an existing element ID.
- Homepage HTML includes substantive content, one H1, title/description/canonical, Open Graph and Twitter card metadata, and valid Person/WebSite JSON-LD.
- Archive pagination uses crawlable anchor links and unique canonical URLs. Public video titles and descriptions are HTML-escaped.
- robots.txt allows crawling and points to the correct sitemap. The sitemap parses as XML and lists homepage, archive, privacy, and terms. Archive pages are linked from its pagination; their omission from the sitemap is not treated as a crawlability defect.
- Latest public API feed contains seven videos and current channel counts. The archive correctly describes its count as long-form, whereas the homepage channel count includes all videos.

## Evidence and limitations

Raw homepage: `/tmp/ai-audit-home.html`; archive: `/tmp/ai-audit-videos.html`; feed: `/tmp/ai-audit-youtube.json`. Additional endpoint responses: `/tmp/ai-audit-*.headers` and `/tmp/ai-audit-*.body`. Complete archive crawl: `/tmp/site-audit-crawl.json`; crawler: `/tmp/site-audit-archive-crawl.py` (max concurrency five, one-second spacing between starts).

Private Search Console indexing, private analytics, credentials, deployment firewall settings, actual Airtable data, and external service ownership were not inspected. The pixel finding is verified in source and local mocked execution, not through a production write. Browser rendering/accessibility and Lighthouse results belong to the main audit and are not claimed here.
