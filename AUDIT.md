# AI Income Lab / ai-automation-station.com: code audit (2026-10-09)

Scope: `mikeholp87/ai-income-lab` at `main` 4626761, plus read-only checks of the live site https://www.ai-automation-station.com.
Method: manual review, plus a second opinion from Codex (`gpt-6.1-sol`, `--sandbox read-only`), gitleaks 8.21 over all 82 commits on every branch, `npm ci` + `npm audit`, `npm test`, an ad-hoc ESLint 9 run, `vite build` + `scripts/prerender.js` with no secrets set, and a crawl of 221 links from 17 live pages (GET/HEAD only).

**Stack note:** this is **not** a Next.js app. It's Vite 8 + React 19, prerendered by `scripts/prerender.js`, with plain Vercel functions in `api/` (`api/o/[token].js` is Edge). There is no `next.config`, no `app/` directory, no tsconfig/TypeScript, and (before this audit) no linter. The Resend webhook on `feat/resend-webhook` lives at `api/resend-webhook.js`, not `app/api/resend-webhook`. That branch was read but not modified.

## Baseline results (main)
| Check | Result |
|---|---|
| `npm audit --omit=dev` / full `npm audit` | 0 vulnerabilities / 0 vulnerabilities |
| `npm test` (node:test) | 55/55 pass |
| tsc | n/a: no TypeScript in the repo |
| ESLint 9 (ad-hoc, recommended + react-hooks) | 6 errors: rules-of-hooks ×2 (`src/main.jsx:241,268`), no-empty ×2, no-self-assign ×1, no-useless-escape ×1 |
| `vite build && node scripts/prerender.js` | OK. Main JS 233 kB (73 kB gzip), CSS 20 kB (5 kB gzip) |
| `npm run build` | **Not run**: `scripts/refresh-videos.js` fetches production `/api/youtube` and rewrites tracked files (`src/youtube-snapshot.json`, `src/uploads-snapshot.js`, thumbnails) |
| Secrets (gitleaks, all history) | **No real secrets found.** 11 hits, all false positives: Airtable *base/table IDs* (`app…`/`tbl…`) in `src/open-pixel.js:12-14` and `api/o/[token].js` history. Those are identifiers, not credentials. No `.env` file was ever committed. |
| Live HTTP | All sitemap pages are 200. `/videos/1` 308s to `/videos`; bad page/watch IDs return 404; apex 308s to www; HSTS present; CSP is Report-Only |

## P0
None. No committed credentials, no exploitable injection/XSS/SSRF, no unauthenticated write path that accepts attacker-chosen data.

## P1
| # | Issue | Evidence | File:line | Fix | Risk | Status |
|---|---|---|---|---|---|---|
| 1 | Open pixel has no abuse controls. Every hit on an existing token does a GET, a POST (new Opens row) and possibly a PATCH to Airtable. There's no rate limit or dedupe, and any HTTP method counts. | `recordOpen` runs for every request. `handleOpenPixel` never checks the method. | `src/open-pixel.js:176-205,216-229` | Defensive: only GET/HEAD record (done). Real rate limiting belongs at the edge: a Vercel WAF rate-limit rule on `/o/*`. Also consider signed tokens and an open-dedupe window | Airtable quota and API rate-limit exhaustion (5 req/s per base), table bloat, inflated open metrics | **Partly fixed** (`codex/aas-security-fixes`). An in-code per-IP limiter was tried and **dropped after review**: Gmail/Apple image proxies and NAT share IPs, so it would lose real opens. WAF, dedupe and signed tokens are for Mike |
| 2 | Pixel logs client IP + full UA to Vercel logs before validation, and Airtable error bodies are logged in full | `console.info('[open-pixel]', hit)` with `ip`. Errors include `response.text()` | `src/open-pixel.js:164-172,155-157` | Drop the IP, cap the UA, keep status only | PII in logs (IP + email token = identifiable). Not stored in Airtable | **Fixed** (`codex/aas-security-fixes`) |
| 3 | `/api/youtube` has no shared in-flight refresh, no failure backoff and no fetch timeouts. Concurrent cold requests each hit Google (up to 3 Data API + 4 RSS calls) | `GET` calls `fetchFeed` per request | `api/youtube.js:12-51` | Shared promise, 5-minute backoff, per-request timeouts (8 s API, 5 s RSS), the pattern `api/videos.js` already uses | YouTube quota burn and slow or hung functions during upstream outages | **Fixed** (`codex/aas-perf`) |
| 4 | No unsubscribe handling exists anywhere in this repo (main or any branch). `feat/resend-webhook` only suppresses bounces/complaints | `rg -i unsub` finds nothing outside docs | n/a | One-click `List-Unsubscribe` endpoint (RFC 8058) writing to the suppression table, once Mike decides where the outreach bots should honour it | Compliance (CAN-SPAM/GDPR, Gmail/Yahoo bulk-sender rules) for the outreach bots that use this pixel | **For Mike**: new feature and changes email semantics |
| 5 | CSP is Report-Only and has no `report-uri`/`report-to`, so it neither blocks nor reports anything. It also allows `'unsafe-inline'` scripts | Header on every response | `vercel.json:11` | Add a report endpoint, watch it, then enforce with hashes for the 2 inline scripts | No defence-in-depth if an XSS ever lands | **For Mike**: enforcing can break GA/Meta/Cal embeds |

## P2
| # | Issue | Evidence | File:line | Fix | Status |
|---|---|---|---|---|---|
| 6 | `/api/*` and `/o/*` were indexable. `/api/videos` serves the full archive HTML at 200 | `curl /api/videos` gives 200 text/html | `vercel.json` | `X-Robots-Tag: noindex` | **Fixed** (security) |
| 7 | `/api/youtube` 502 body echoed upstream statuses/error messages | `Response.json({ error, statuses })` | `api/youtube.js:50` | Log server-side, generic body | **Fixed** (security) |
| 8 | Pixel's 3 s timer was never cleared. The UA stored was up to 100 kB | `setTimeout` inside `Promise.race`. `slice(0, 100000)` | `src/open-pixel.js:193,222` | Clear the timer, 1000-char UA | **Fixed** (security). Aborting Airtable work at the deadline was tried and **dropped after review**: it could leave an Opens row without the Sends `Opened` flag. Use `waitUntil` if Mike wants background completion guaranteed |
| 9 | Non-hashed static files (fonts, images, 2.5 MB hero mp4, CSS) are served `max-age=0, must-revalidate` | Live headers on `/fonts/dm-mono.woff2`, `/hero-video.mp4`, `/mike-holp.jpg`, `/reading.css` | `vercel.json` | Moderate max-age + SWR | **Fixed** (`codex/aas-perf`) |
| 10 | Lint errors: `useJpegThumbnail` is named like a hook but called in `onError`. Also empty catches, a self-assign, a useless escape. No lint script | ESLint output above | `src/main.jsx:216,241,268`, `src/open-pixel.js:117`, `src/tracking.js:8`, `src/reading.js:11`, `scripts/tag-youtube-descriptions.mjs:33` | Rename, comment, add `npm run lint` | **Fixed** (`codex/aas-quality-links`) |
| 11 | Outdated external link (301) in a guide | Claude billing article URL changed | `public/guides/first-api-request.html:11` | Update href | **Fixed** (quality) |
| 12 | Local `npm run build` never sees `YOUTUBE_API_KEY` from `.env.local` (Vite loads env files only later), so local builds silently keep the old uploads snapshot | `refresh-videos.js` reads `process.env` only | `scripts/refresh-videos.js:22`, `package.json:9` | `process.loadEnvFile` when present (no override) | **Fixed** (quality) |
| 13 | Evidence script imports from a machine-specific absolute path, and its `POST` assertion is stale against the current pixel code | `/home/mikeh/Projects/...` | `docs/audits/.../evidence/pixel-check.mjs:3,13` | Treat as historical evidence, or update both | **Left as-is** (historical audit evidence; fixing only the import made it run and fail) |
| 14 | Build depends on production. `refresh-videos.js` fetches the live `/api/youtube` and rewrites tracked source files on every build, so builds aren't reproducible and a bad prod feed can feed the next build | `scripts/refresh-videos.js:8-12` | n/a | Snapshot-refresh as a separate scripted job/PR; build only reads snapshots | **For Mike** (build/deploy behaviour) |
| 15 | Concurrent first opens can overwrite `First Opened At` (read-then-PATCH race across instances) | `src/open-pixel.js:199-210` | n/a | Derive first open from the min Opens timestamp, or make the PATCH conditional | **For Mike** (open semantics) |
| 16 | HEAD requests to the pixel count as opens (link checkers, some scanners) | `handleOpenPixel` records HEAD | `src/open-pixel.js:216` | Don't record HEAD | **For Mike**: deliberately left unchanged because it changes what counts as an open |
| 17 | Homepage feed can link `/watch/<id>` for a brand-new upload before `/api/videos`' daily inventory knows it, so the link 404s for up to a day | `watchUrl` in `src/main.jsx:146` vs memo in `api/videos.js:8,45` | n/a | Use one inventory, or link to YouTube until known | **For Mike** (UX/linking choice) |
| 18 | Pricing-view Meta `ViewContent` is skipped for visitors who grant consent after first seeing pricing (`viewed` latches before the consent check) | `src/main.jsx:376-381` | n/a | Re-arm after consent | **For Mike** (analytics behaviour) |
| 19 | Airtable base/table IDs are hard-coded in a **public** repo | `src/open-pixel.js:12-14` | n/a | Move them to env only (needs the Vercel env set first) | **For Mike** (Vercel env). Not secrets, but they help an attacker who ever gets a PAT |
| 20 | HSTS lacks `includeSubDomains; preload` | Live header `max-age=63072000` | Vercel/DNS | Decide after checking every subdomain is HTTPS | **For Mike** |
| 21 | `/assets/*` immutable cache header also applies to 404s for old hashes | `curl /assets/main-BIRi-krg.js` gives 404 with `immutable` | `vercel.json:15` | Generally harmless; leave | Info |
| 22 | `.htaccess` (Apache SPA fallback) is dead config on Vercel | `.htaccess` | n/a | Remove if no Apache mirror exists | **For Mike** |
| 23 | Clean URLs: `/start-here` 404s, only `/start-here.html` works | live curl | n/a | `cleanUrls` + redirects | **For Mike** (URL/SEO change) |
| 24 | Skool links `…/ai-automation-station-7346` and `/classroom` 307 to `/about` for logged-out users | link crawl | `src/main.jsx:456,594` | Expected for non-members | **For Mike** (offer/copy) |
| 25 | LinkedIn profile link returns 999 to bots | link crawl | `src/main.jsx` | Normal LinkedIn bot block; no action | Info |

### Notes on `feat/resend-webhook` (read only, **not modified**)
- Signature check (Svix HMAC, 5-minute tolerance, timing-safe compare) is sound.
- No idempotency on `svix-id`. Resend retries create duplicate suppression/event rows. Dedupe on `Webhook ID`.
- `from.includes("beremoteconsulting.com")` is a substring match. Match the parsed domain exactly (low risk, since only signed events get here).
- `email.delivered` stores every recipient address in Airtable (PII volume). Make sure that's intended.
- `export const runtime = "nodejs"` is a Next.js convention; harmless in a plain Vercel function.
- A non-JSON body after a valid signature would throw (500, which Resend retries). That's acceptable.

## Secrets to rotate
**None found.** No credential appears in any commit on any branch (gitleaks plus manual pattern scan). The `app…`/`tbl…` Airtable IDs are not credentials.

## Left for Mike (not changed in code)
1. Vercel WAF / rate-limit rule on `/o/*` (and optionally `/api/*`). This is the real fix for P1 #1.
2. Unsubscribe endpoint + `List-Unsubscribe` headers for the outreach bots.
3. Pixel semantics: count HEAD or not, dedupe repeated opens, first-open race, signed tokens.
4. CSP: add reporting, then enforce. HSTS `includeSubDomains; preload`.
5. Move the Airtable IDs to env (Vercel env change).
6. Build reproducibility (`refresh-videos.js` hitting prod during `npm run build`).
7. `/watch` link race for new uploads. Pricing `ViewContent` after late consent (analytics).
8. `cleanUrls`, `.htaccess` removal, Skool link targets.
9. Resend webhook branch: idempotency + exact domain match before merging.
