# AI Income Lab site audit — 2026-09-23

Scope: homepage, privacy and terms pages, SEO assets, conversion links, analytics, accessibility, and production build. This is a code and publicly accessible page audit. A rendered browser session, live HTTP headers, Core Web Vitals, Search Console, and checkout completion were unavailable, so no Lighthouse score, field metric, or purchase conversion rate is asserted.

## Implementation update

The homepage is now pre-rendered at build time; consent can resume after decline; the video has captions and a transcript; mobile navigation is available; the sitemap includes the legal pages; and key pricing and consent text is larger. A follow-up video review found an obsolete $9 price in both the closing frame and narration. The frame now shows $29, and the outdated spoken price has been removed.

The real member proof section remains unbuilt because no publishable screenshot, member quote, or permission is available. Premium/VIP prices and features still need confirmation in Skool. Live Core Web Vitals, screen reader behavior, and checkout behavior remain unverified without a rendered browser or account access.

## Priority fixes

| Priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| High | The production HTML has an empty `#root`, no `<h1>`, and only the noscript Skool link. All homepage copy and internal links depend on `src/main.jsx` running. The public non-rendered fetch likewise showed only the noscript text. Google can render JavaScript, but this adds a rendering dependency and leaves other crawlers and no-JS visitors without the offer. | Pre-render the stable landing page at build time, then hydrate only the theme, tour, consent, and tracking interactions. Verify the built HTML contains the headline, pricing, FAQ, and outbound links. [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). |
| High | In `src/tracking.js:17-19`, `loadMarketingTracking()` exits once `__marketingTrackingLoaded` is set. Declining later revokes consent (`:49-53`); allowing again calls `loadMarketingTracking()` (`src/main.jsx:68-72`) but does not grant Meta consent again. | Separate script loading from consent state, and grant or revoke on every preference change. Add one test for allow → decline → allow. |
| High | The 14.4-second hero video has an AAC audio stream but no caption track or adjacent transcript (`src/main.jsx:134-147`). | Add accurate captions and a short transcript or equivalent text next to the video. Check playback with sound off and keyboard only. |
| Medium | The public Skool about page confirms $29 and 2.9k members, but did not expose Premium/VIP prices. The pricing cards now link to that about page and no longer imply that a card preselects a plan. | Verify the current Premium/VIP prices and features in Skool whenever they change. [Current public Skool listing](https://www.skool.com/ai-automation-station-7346/about). |
| Medium | GA event calls before consent are dropped by `trackGoogleEvent()` (`src/tracking.js:11-14`), including the initial campaign landing event (`src/main.jsx:201-203`). `Campaign Landing Viewed` is therefore absent from GA for first-time visitors who accept later. | On consent, send a GA page view with the campaign parameters then available. Keep click metrics labeled as outbound visits, not purchases. Reconcile with Skool enrollment data if available. |
| Medium | Mobile CSS hides all section navigation at 680px (`src/styles.css:304`); the remaining top link only goes to pricing. Visitors cannot jump to the tour, FAQ, or audience section from the header. | Keep one compact “Explore” menu or a small set of links, and verify keyboard and touch access. |
| Medium | The page has an illustrated tour (`src/main.jsx:180-189`) and text descriptions, but no actual course view, lesson sample, community discussion, or testimonial. The tour explicitly says it is illustrative. | Add one real, permission-cleared course or community example and a specific creator credential or member outcome with a source. This is likely more persuasive than another generic claim. |
| Low | `public/sitemap.xml` lists only `/`, while `/privacy.html` and `/terms.html` declare themselves indexable and canonical. Its `lastmod` is August 30 despite September homepage commits. | Either include the two indexable legal pages and update `lastmod` when content changes, or set legal pages to `noindex` if they are not meant for search. Do not update `lastmod` on deploys without content changes. |
| Low | Several supporting labels are 8–10px (`src/styles.css:181,192,194,206,265,324-325`), including pricing period and mobile consent copy. Small text may be difficult to read on mobile even when contrast is adequate. | Raise key decision text and consent copy to at least a comfortable mobile size; manually check at 320px and 200% zoom. |

## What is working

- Clear hero promise, $29 entry price, monthly billing, cancellation explanation, and a 30-day disclaimer. The $29 price and 2.9k member count match the [public Skool listing](https://www.skool.com/ai-automation-station-7346/about) reviewed today.
- Semantic sections, one rendered `<h1>`, a skip link, keyboard-aware tabs, native FAQ disclosures, visible focus styles, and reduced-motion handling are present in the source.
- Canonical URL, description, social preview tags, Organization/WebSite/FAQ structured data, robots.txt, and a sitemap are present. The FAQ markup is low priority for search appearance; [Google restricts FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- Google Analytics and Meta scripts are loaded after an explicit choice. The privacy and terms pages explain the Skool handoff. Security headers are configured in `vercel.json`, though live delivery was not verified.
- The production build succeeds at 69.54 kB gzipped JavaScript and 6.11 kB gzipped CSS; the 2.4 MB video is not set to autoplay. Local tests pass.

## Next validation pass

1. Run mobile and desktop PageSpeed Insights on the deployed URL; record LCP, INP, CLS and the element responsible for LCP before making performance claims.
2. Inspect the deployed homepage at 320px, 390px, desktop, dark mode, 200% zoom, keyboard only, and screen reader. Confirm consent does not cover focused controls.
3. Open each Skool pricing CTA and confirm the about-page destination, prices, and features. Complete a test enrollment only with an authorized non-production path.
4. Check Search Console's indexed and rendered HTML, sitemap status, and query data. Review Vercel Analytics outbound clicks alongside actual Skool enrollments to prioritize conversion changes.
