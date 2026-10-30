# Action Plan: www.ai-automation-station.com (2026-10-28)

Health score: **76/100**. Items are ordered by impact within each priority.

## High (fix within 1 week)

1. **Brand entity in the structured data** (`index.html`).
   - Add a square logo PNG (at least 112 px) to `public/`.
   - Add `logo` and `alternateName: ["AI Income Lab"]` to `#org`.
   - Change `WebSite.alternateName` from "Mike Holp" to "AI Income Lab".
   - Add YouTube and `worksFor` to `#mike`, and use `/#about` as the Person `url` everywhere, including `src/archive.js:226`.
2. **Stop watch pages competing with guides** (`src/watch-notes.js`).
   - Retitle `/watch/pMLyxz6Dyt4` (HeyGen), `_8qzOkIWMSk`, `Qb6RG0-8O1k`, `geKngm3sg3w` and `9kHdIiobKMA` as video walkthroughs.
   - Add a test that fails when a watch page title matches a guide title.
3. **YouTube facade on watch pages** (`src/archive.js:261`). Reuse the pattern from `src/main.jsx:268` and preconnect `i.ytimg.com`.
4. **Link watch pages to topic hubs** (`src/archive.js` breadcrumbs, around lines 230 and 259). Use Home › Videos › *Topic* › title, plus an in-body hub link.
5. **Thin watch pages.**
   - Finish the transcript backfill (`scripts/fetch-transcripts.mjs`).
   - Show a summary or the first transcript paragraphs outside `<details>`.
   - Mark pages with neither notes nor a transcript `noindex,follow` and leave them out of `video-sitemap.xml` until they're enriched.
6. **"Earn with AI" cluster.**
   - Add a business topic in `src/topics.js`.
   - Write a pillar guide.
   - Link the five make-money guides to it.
7. **Small-business guide intent.** Retitle `public/guides/ai-automation-services-small-business.html` for the seller query.

## Medium (fix within 1 month)

8. **Create `/about.html`** with a bio, `sameAs` links and the editorial process, using ProfilePage + Person markup. Point bylines and author markup to it.
9. **Make-money guides:** add sources, one real documented case each, and a comparison table. Remove headings stuffed with keywords.
10. **Quick answers:** add a 40–60 word quick-answer opener to the 14 guides that lack one.
11. **Topic hubs** (`src/topics.js`): 55–65 character titles, descriptive H1s and 150–300 word intros.
12. **Guide links:**
    - Link guides and topic hubs to each other.
    - Fix the broad `codex|open code|claude code` routing regex in `src/archive.js`.
    - Link the n8n watch pages to the self-host guide.
13. **Hero alt text:** describe the 9 guide hero diagrams, and add an alt-text check to `src/guide-seo.test.js`.
14. **Community markup:** add Product, Offer and Course structured data for the community (snippet in `findings/schema.md`).
15. **Meta pixel:** load it once the browser is idle (`src/tracking.js`), and consider the Conversions API.
16. **Real-user monitoring:** add Vercel Speed Insights and analytics to every template.
17. **Mobile guide header:** keep it from stacking into three rows (`public/reading.css`).
18. **Email signup:** add it to watch pages, topic hubs and `start-here.html`.

## Low (backlog)

- Generate sitemap `<lastmod>` for `/videos` and the homepage.
- Make the two-hop redirects single hops in `vercel.json`.
- Add a CSP reporting endpoint, then enforce the policy.
- Preload fonts on guide and watch pages.
- Add `fetchpriority="high"` to the first thumbnail on topic pages.
- Lazy-load homepage sections below the fold.
- Lengthen the long-cache headers for versioned CSS and images.
- Fix transcript caption errors.
- Lengthen short watch titles and descriptions.
- Add breadcrumbs to the `/videos` pages.
- Add descriptions to `llms.txt` links.
- Raise the 11 px labels on mobile and pad small tap targets.
- Move the sponsor rate card off the homepage.

## Monitoring

- Add Google Search Console and CrUX credentials to the SEO toolkit (`google_auth.py`).
- Add a Moz or Bing Webmaster key for backlink data.
- Record a drift baseline so the next audit can be compared against this one.
- Re-audit in about 4–6 weeks, after the watch-page and linking changes have been crawled.
