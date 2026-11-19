# Sponsors page conversion improvements

November 10, 2026. Commit d8e0161 on main. Production deployment `dpl_G9ZRv3WeoDthfxdEbQWmXJgYYswp` is READY on https://www.ai-automation-station.com/sponsors.html. GitHub CI passed. Live HTTP and browser checks verified seven sponsored cards, all four new IDs in the runtime feed, clear conditional allocations, the default visible proposal form, and campaign preselection. No document overflow at 390px and no captured browser errors.

## Offer and journey

- Added a product-outcome headline, visible proposal CTA, package jump link, and an evidence-backed brand line.
- Header and footer on the sponsors page request a sponsorship brief. The homepage keeps its community CTA.
- The sponsors page defaults to the proposal form and does not show the unrelated newsletter signup. A free intro call remains available. Existing package buttons preselect the appropriate package.
- Added a three-step brief/scope/publication explanation and the rate card's existing organic-publication and reasonable-revision terms.
- Preserved standalone prices and the published $2,250 campaign. Conditional per-format campaign allocations are $1,350/$350/$250/$300 versus $1,500/$400/$300/$350 standalone. They total $2,250, saving $300 against $2,550 separately. No artificial prior price or expiring sale was introduced; the existing PDF remains accurate.

## Additional sponsored builds

Reviewed all 228 saved transcripts for sponsorship language, then checked the four additional videos' identities/current public metadata using vidIQ. These were public uploads in the saved 227-video long-form inventory. The current paid-promotion checkbox selected only three builds. Four explicit spoken disclosures were missing from that selection:

| Video | Brand | Disclosure evidence in src/transcripts.json |
|---|---|---|
| quDDekuPQNI | BrowserAct | This video is actually sponsored by Browser Act. |
| KLuU0Yxu9g4 | Apify | They're actually a sponsor of this video. |
| IlOJWfmlpGg | Apify | And this video is sponsored by Ampify. |
| mtpX58dNfCE | Apify | This video is actually sponsored by Ampify. |

Ampify is the saved transcript's spelling of Apify; the video title and linked product identify the brand. The explicit non-sponsored vidIQ tutorial remains excluded. Affiliate links, sponsor invitations and demonstrations of outreach tools were not treated as paid collaboration evidence.

The shared sponsoredVideos selector now includes the four reviewed IDs alongside YouTube's paid-promotion flag, while rejecting explicitly private uploads. Both the runtime /api/videos?sponsored feed and the build-time snapshot use that selector. The saved portfolio has seven builds: Treg, DataForSEO, BrowserAct, Bluehost and three Apify demonstrations. No video metadata or paid-promotion settings on YouTube were changed.

## Validation

298 tests pass; ESLint, Vite client build and SSR/prerender pass. New tests cover campaign arithmetic, transcript evidence, public-only selection, negative sponsorship evidence and fallback/API selection consistency. Local browser checks at 1440, 390 and 320 pixels showed no document overflow. All five package actions selected the right form value; the default proposal form is visible and the portfolio renders seven cards.

The mechanical CRO script scored the original HTML 71 and the built page 72. This heuristic is not a measured conversion rate; it does not understand the verified sponsorships or actual viewport placement. Manual visual review and the working request flow drove the changes. Jev Review was attempted twice but is unavailable because JEV_API_KEY is not configured.

No enquiry was submitted, no emails were sent, and no measured conversion lift is claimed. Audience screenshots retain their visible September/October date range. A fully exhaustive review of unpublished videos, unsaved transcripts or private sponsorship agreements was not performed.
