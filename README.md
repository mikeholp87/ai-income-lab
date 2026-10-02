# ai-income-lab
Skool Landing Page

## Email open pixel

Public path after deploy: `https://www.ai-automation-station.com/o/{token}.gif`

`GET /o/{token}.gif` always returns a 1×1 transparent GIF (`image/gif`, HTTP 200). On each hit it best-effort logs the token, UTC time, User-Agent, and IP (when present).

For Airtable write-back, set **one** of these on the Vercel project (do not commit secrets):

- `AIRTABLE_API_KEY`
- `AIRTABLE_PAT`

When present, each hit creates a **Skool Opens** row (`tbldz345j99xyS7UP` in Free Members `appAJaBlPYSE511IE`) with Send Token, Opened At, User Agent, and Source `pixel`. If a **Skool Campaign Sends** row (`tblAy7RIz59OCVYz0`) exists for that token and Opened is not yet true, it sets Opened and First Opened At. Missing env vars or Airtable errors never change the GIF response.
