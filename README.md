# ai-income-lab
AI Automation Station: Mike Holp’s AI build videos, written guides, and AI Income Lab community.

- [Choose your first build](https://www.ai-automation-station.com/start-here.html)
- [9Router setup notes](https://www.ai-automation-station.com/watch/geKngm3sg3w)
- [Codex on Linux: setup and troubleshooting](https://www.ai-automation-station.com/watch/lbBZ7uLJwbM)
- [Codex internal-linking workflow](https://www.ai-automation-station.com/watch/TuVL2x6IfDk)
- [Build a React YouTube feed](https://www.ai-automation-station.com/guides/youtube-feed.html)
- [Track clicks after consent](https://www.ai-automation-station.com/guides/consent-tracking.html)
- [Run your first local API request](https://www.ai-automation-station.com/guides/first-api-request.html)

## Build and preview

Run `npm ci`, `npm test`, and `npm run build`. Use `npm run preview` to inspect the production build locally.

The build refreshes the saved video feed and generates 480, 768, and 1280 pixel WebP candidates for the featured video using the build-only Sharp dependency. Hashed files in `public/assets/thumbnails/` and `src/thumbnail-snapshot.json` provide an offline fallback. Keep them together when committing a refreshed snapshot. A failed download retains the previous set; a different video arriving through the live feed uses its own YouTube image until the next build. The browser still falls back to YouTube JPEG if an image fails to load.

## Email open pixel

Public path after deploy: `https://www.ai-automation-station.com/o/{token}.gif`

`GET /o/{token}.gif` always returns a 1×1 transparent GIF (`image/gif`, HTTP 200). On each hit it best-effort logs the token, UTC time, User-Agent, IP (when present), and which product prefix matched.

Airtable tenant is chosen by **token prefix**. Shared field names when a route is configured:

- Opens: Open Id, Send Token, Opened At, User Agent, Source `pixel`
- Sends: Send Token; first open sets Opened + First Opened At

Auth (one of these, do not commit secrets):

- `AIRTABLE_API_KEY`
- `AIRTABLE_PAT`

### Prefix routing

| Prefix | Product | Env key | Airtable IDs |
| --- | --- | --- | --- |
| `SKOOL-FT-` | Skool / AI Income Lab free-to-paid | (Skool defaults) | Free Members 3 defaults below |
| `AFF-` | TubeAnalytics Affiliate | `AFF` | set env (no code defaults) |
| `TA-BL-` | TubeAnalytics Backlink | `TA_BL` | set env (no code defaults) |
| `VS-BL-` | VisiScan Backlink | `VS_BL` | set env (no code defaults) |
| `POD-` | Podcast Outreach | `POD` | set env (no code defaults) |
| `JOB-` | Job App Agent | `JOB` | set env (no code defaults) |
| `INV-` | Startup Investor Outreach | `INV` | set env (no code defaults) |

Unknown tokens (for example `test-token`) fall back to the Skool route.

### Skool defaults (also used for unknown tokens)

Override only if you need to move Skool off Free Members 3:

- `AIRTABLE_BASE_ID` — default `appK4Nu5Dy4imXrDp`
- `AIRTABLE_OPENS_TABLE_ID` — default `tblFS59vmxGSrLCPJ`
- `AIRTABLE_SENDS_TABLE_ID` — default `tblsb6CJxqWZ93w74`

### Per-bot env vars (paste IDs here)

For every non-Skool prefix, set all three or that bot logs to console only (GIF still returns 200):

```
AIRTABLE_ROUTE_AFF_BASE_ID=
AIRTABLE_ROUTE_AFF_OPENS_TABLE_ID=
AIRTABLE_ROUTE_AFF_SENDS_TABLE_ID=

AIRTABLE_ROUTE_TA_BL_BASE_ID=
AIRTABLE_ROUTE_TA_BL_OPENS_TABLE_ID=
AIRTABLE_ROUTE_TA_BL_SENDS_TABLE_ID=

AIRTABLE_ROUTE_VS_BL_BASE_ID=
AIRTABLE_ROUTE_VS_BL_OPENS_TABLE_ID=
AIRTABLE_ROUTE_VS_BL_SENDS_TABLE_ID=

AIRTABLE_ROUTE_POD_BASE_ID=
AIRTABLE_ROUTE_POD_OPENS_TABLE_ID=
AIRTABLE_ROUTE_POD_SENDS_TABLE_ID=

AIRTABLE_ROUTE_JOB_BASE_ID=
AIRTABLE_ROUTE_JOB_OPENS_TABLE_ID=
AIRTABLE_ROUTE_JOB_SENDS_TABLE_ID=

AIRTABLE_ROUTE_INV_BASE_ID=
AIRTABLE_ROUTE_INV_OPENS_TABLE_ID=
AIRTABLE_ROUTE_INV_SENDS_TABLE_ID=
```

Optional JSON override (keys are the env keys above, or the raw prefix). A complete entry wins over the per-bot vars:

```
AIRTABLE_PIXEL_ROUTES={"AFF":{"baseId":"appXXX","opensTableId":"tblXXX","sendsTableId":"tblYYY"}}
```

Missing API key, missing route IDs, or Airtable errors never change the GIF response.
